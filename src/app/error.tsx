"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";
import RouteErrorFallback from "@/components/RouteErrorFallback";

/**
 * App Router error boundary for every route segment under the root layout.
 * Sits inside the layout, so the nav, footer and WebGL background stay up
 * and the visitor can retry or navigate away without a full reload.
 */
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error("Route segment error:", error);
  }, [error]);

  return <RouteErrorFallback onRetry={() => unstable_retry()} />;
}
