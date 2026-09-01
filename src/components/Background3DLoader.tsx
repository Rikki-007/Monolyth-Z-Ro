"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "framer-motion";
import CanvasErrorBoundary from "@/components/CanvasErrorBoundary";

// ssr:false keeps the three.js/R3F bundle out of the server-rendered HTML
// and off the critical path entirely — it's fetched and mounted only after
// the rest of the page is already interactive.
const Background3D = dynamic(() => import("./Background3D"), { ssr: false });

export default function Background3DLoader() {
  const prefersReducedMotion = useReducedMotion();
  // Respect the OS-level preference outright rather than offering a
  // "reduced" version of a live, constantly-drifting particle field.
  if (prefersReducedMotion) return null;
  // Purely decorative — if WebGL init throws (unsupported browser, context
  // limit, driver crash), the fallback is simply no background at all.
  return (
    <CanvasErrorBoundary>
      <Background3D />
    </CanvasErrorBoundary>
  );
}
