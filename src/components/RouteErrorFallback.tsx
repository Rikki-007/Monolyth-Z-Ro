"use client";

import Link from "next/link";

/**
 * Shared fallback UI for a page that failed to render — used both by the
 * client-side RouteErrorBoundary and by the App Router's own `app/error.tsx`.
 * Deliberately plain (no framer-motion, no opacity-0 initial state) so the
 * fallback itself can never be the thing that renders invisibly.
 */
export default function RouteErrorFallback({ onRetry }: { onRetry: () => void }) {
  return (
    <section
      role="alert"
      className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 pt-40 pb-32 text-center"
    >
      <span className="font-mono text-xs uppercase tracking-[0.4em] text-amber">
        Error / Render
      </span>
      <h1 className="font-display text-5xl text-paper sm:text-7xl">
        This view didn&apos;t load.
      </h1>
      <p className="max-w-md font-sans text-sm text-fog sm:text-base">
        Something went wrong while rendering this page. Try again, or head
        back to the homepage.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest">
        <button
          type="button"
          data-cursor-hover
          onClick={onRetry}
          className="rounded-full bg-cyan px-5 py-2 text-obsidian"
        >
          Try again
        </button>
        <Link
          href="/"
          data-cursor-hover
          className="rounded-full border border-fog/30 px-5 py-2 text-fog transition-colors hover:text-paper"
        >
          Home
        </Link>
      </div>
    </section>
  );
}
