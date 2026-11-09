"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "@/components/SmoothScroll";
import RouteErrorBoundary from "@/components/RouteErrorBoundary";

/**
 * Route-change entrance for whatever page is mounted, with the persisted
 * chrome (Navbar, 3D background, cursor) untouched around it.
 *
 * Why this is NOT framer-motion's `<AnimatePresence mode="wait">` any more:
 * under the App Router, `children` is the router's live slot, not a frozen
 * snapshot. On a client-side navigation the router swaps the *new* page into
 * the *outgoing* keyed <main> while AnimatePresence is still playing that
 * element's exit. The exit finished at opacity 0, but AnimatePresence
 * intermittently never completed the hand-off to the new keyed <main> — so
 * the visitor was left with the new page's markup sitting inside an
 * invisible (opacity: 0, translateY(-16px)) wrapper: a blank screen over the
 * WebGL background until a full reload. Verified in headless Chrome on the
 * live site: Work/About/Lab/Contact/Home stuck at opacity 0, while
 * Showcase happened to win the race.
 *
 * The fix removes the exit state machine entirely. The <main> is remounted
 * per pathname (`key`), and the entrance is a pure CSS keyframe
 * (`.route-enter` in globals.css) with `animation-fill-mode: both`. A CSS
 * animation has no JS completion callback to lose, always ends at its final
 * (visible) frame, and is skipped outright under prefers-reduced-motion — so
 * the content slot can't get trapped in a hidden state.
 *
 * Each page is also wrapped in a RouteErrorBoundary keyed by pathname: if a
 * page throws while rendering, the visitor gets a recoverable fallback
 * instead of an empty slot, and navigating anywhere else clears it.
 *
 * Scroll resets to the top of the new page on every navigation — otherwise
 * a deep scroll position on the previous page would carry straight over and
 * land the visitor mid-air on the next one.
 */
export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenis = useLenis();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, lenis]);

  return (
    <main key={pathname} className="route-enter flex-1">
      <RouteErrorBoundary key={pathname}>{children}</RouteErrorBoundary>
    </main>
  );
}
