"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

const LenisContext = createContext<{ current: Lenis | null }>({
  current: null,
});

/** Read the live Lenis instance (null while unmounted or reduced-motion). */
export function useLenis() {
  return useContext(LenisContext).current;
}

/**
 * Drives the whole site's scroll through one Lenis instance instead of raw
 * browser scroll. Lenis still scrolls the real document (it's not a
 * virtualized/transform-based scroller), so every existing framer-motion
 * `useScroll` hook keeps working unmodified — this only changes *how*
 * `scrollTop` gets from A to B (eased over a few frames instead of jumping),
 * which is what actually reads as "smooth" rather than "stuttery" on a wheel
 * flick or trackpad swipe.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect the OS preference outright: eased/inertial scroll is exactly
    // the kind of motion "reduce motion" is asking us to skip.
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      // Touch already has good native momentum scrolling on every mobile
      // browser that matters; smoothing it further tends to fight the
      // platform rather than help, so this leaves touch alone and only
      // takes over wheel/trackpad input.
      syncTouch: false,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // In-page anchors (e.g. the hero's own #top) ease through Lenis instead
    // of snapping via native scroll-behavior.
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a[href^='#']");
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -96 });
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  );
}
