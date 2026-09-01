"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

type MagneticButtonProps = HTMLMotionProps<"a"> & {
  /** Max pull toward the cursor, in px. Keep small — this is a hint, not a lurch. */
  strength?: number;
};

/**
 * A CTA anchor that leans a few px toward the cursor while hovered, then
 * springs back on leave. Pure transform-based (GPU-friendly), and backs off
 * to a plain static link when the visitor has requested reduced motion.
 */
export default function MagneticButton({
  strength = 10,
  className,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!prefersReducedMotion && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      x.set(((e.clientX - rect.left) / rect.width - 0.5) * strength);
      y.set(((e.clientY - rect.top) / rect.height - 0.5) * strength);
    }
    onMouseMove?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    x.set(0);
    y.set(0);
    onMouseLeave?.(e);
  };

  return (
    <motion.a
      ref={ref}
      data-cursor-hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  );
}
