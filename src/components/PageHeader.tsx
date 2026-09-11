"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * The numbered eyebrow + big display title every page opens with. Pulled
 * out of the individual section components (About/Projects/Lab/Contact)
 * once they became standalone pages, so the "02 / Work" style heading
 * stays visually consistent without four copies of the same markup.
 *
 * `reveal="mount"` (the default) plays the entrance animation as soon as
 * the component mounts, rather than waiting for an IntersectionObserver
 * hit via `whileInView`. That matters here specifically because this is
 * used as the very first thing on a standalone page (About/Work/Lab/
 * Contact) — already in the viewport with nothing to scroll past to reach
 * it. `whileInView`'s observer callback is inherently async and can race
 * fonts/layout/the preloader's own scroll lock on first paint; when it
 * loses that race the content just sits at its hidden (opacity: 0) state
 * until an actual scroll event nudges the observer to recheck — which,
 * for content already fully on screen, may never happen. Pass
 * `reveal="scroll"` for placements genuinely below the fold (e.g. the
 * homepage's Capabilities/FeaturedWork sections beneath the full-height
 * Hero), where that scroll event is guaranteed.
 */
export default function PageHeader({
  index,
  label,
  title,
  description,
  align = "left",
  reveal = "mount",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  reveal?: "mount" | "scroll";
}) {
  const revealProps =
    reveal === "mount"
      ? { initial: "hidden" as const, animate: "show" as const }
      : {
          initial: "hidden" as const,
          whileInView: "show" as const,
          viewport: { once: true, amount: 0.4 },
        };

  return (
    <motion.div
      variants={staggerContainer()}
      {...revealProps}
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs uppercase tracking-[0.4em] text-amber"
      >
        {index} / {label}
      </motion.span>
      <motion.h1
        variants={fadeUp}
        className="font-display text-5xl text-paper sm:text-7xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          variants={fadeUp}
          className={`font-sans text-sm text-fog sm:text-base ${
            align === "center" ? "max-w-xl" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
