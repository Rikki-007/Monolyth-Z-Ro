"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";

const MotionLink = motion.create(Link);

type MagneticButtonProps = HTMLMotionProps<"a"> & {
  /** Max pull toward the cursor, in px. Keep small — this is a hint, not a lurch. */
  strength?: number;
  href: string;
};

/**
 * A CTA anchor that leans a few px toward the cursor while hovered, then
 * springs back on leave. Pure transform-based (GPU-friendly), and backs off
 * to a plain static link when the visitor has requested reduced motion.
 *
 * Internal routes (`href` starting with "/") render through next/link so
 * navigation stays client-side and plays the route transition; anything
 * else (mailto:, tel:, http(s):, #hash) renders as a plain anchor.
 */
export default function MagneticButton({
  strength = 10,
  className,
  children,
  href,
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

  const isInternal = href.startsWith("/");
  const Component = isInternal ? MotionLink : motion.a;

  return (
    <Component
      ref={ref}
      href={href}
      data-cursor-hover
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
