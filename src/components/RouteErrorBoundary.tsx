"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import RouteErrorFallback from "@/components/RouteErrorFallback";

type Props = { children: ReactNode };
type State = { error: Error | null };

/**
 * Catches render errors from the currently mounted page so a single broken
 * view can't leave the content slot empty. Mounted by RouteTransition with
 * `key={pathname}`, so it resets automatically on every navigation; "Try
 * again" re-renders the same page in place, no window reload needed.
 *
 * Error boundaries have to be class components — there's no hook version.
 */
export default class RouteErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page failed to render:", error, info.componentStack);
  }

  private retry = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return <RouteErrorFallback onRetry={this.retry} />;
    }
    return this.props.children;
  }
}
