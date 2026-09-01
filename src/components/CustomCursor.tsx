"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

function subscribePointerFine(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePointerFine() {
  return useSyncExternalStore(
    subscribePointerFine,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
}

export default function CustomCursor() {
  const enabled = usePointerFine();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 420, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    document.body.classList.add("custom-cursor-active");

    // Scrolling moves page content under a stationary cursor, which fires
    // real `mouseover`/`mouseout` events for every element boundary that
    // sweeps past it — with nothing to do with the user actually pointing
    // at something. Each one that flips hover state re-triggers the scale
    // spring below, so a fast scroll over a content-dense section could
    // thrash that animation many times in a row. Track "is a scroll in
    // progress" and skip hover updates while it's true.
    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };

    const over = (e: MouseEvent) => {
      if (isScrolling) return;
      const target = e.target as HTMLElement;
      setHovering(Boolean(target.closest("a, button, [data-cursor-hover]")));
    };

    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("mouseleave", leave);
      clearTimeout(scrollTimeout);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[70] pointer-events-none mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
      }}
      animate={{ scale: hovering ? 2.4 : 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="w-4 h-4 rounded-full bg-cyan glow-cyan" />
    </motion.div>
  );
}
