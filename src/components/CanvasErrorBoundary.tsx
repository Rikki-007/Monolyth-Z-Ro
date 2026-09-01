"use client";

import { Component, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Shown in place of children if something inside throws. Defaults to
   * rendering nothing, so a WebGL/R3F failure can't take the rest of the
   * page down with it — error boundaries can only be class components,
   * there's no hook equivalent. */
  fallback?: ReactNode;
};

type State = { hasError: boolean };

export default class CanvasErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("3D canvas failed to render:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
