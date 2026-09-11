"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cinematicEase } from "@/lib/motion";
import { useLenis } from "@/components/SmoothScroll";

const pageVariants = {
  initial: { opacity: 0, y: 24, clipPath: "inset(0 0 6% 0)" },
  enter: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.7, ease: cinematicEase },
  },
  exit: {
    opacity: 0,
    y: -16,
    transition: { duration: 0.35, ease: cinematicEase },
  },
};

/**
 * Cinematic cross-fade between routes, persisted chrome (Navbar, 3D
 * background, cursor) untouched around it. Scroll resets to the top of the
 * new page on every navigation — otherwise a deep scroll position on the
 * previous page would carry straight over and land the visitor mid-air on
 * the next one.
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
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
