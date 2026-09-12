"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import MagneticButton from "@/components/MagneticButton";

export default function ShowcaseHero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-32 pb-20 text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-violet/10 blur-[100px] [transform:translateZ(0)]"
      />

      {/* animate, not whileInView — this is the first thing on the page,
          already on screen at load. See PageHeader's note on the same
          gotcha: a scroll-triggered reveal has nothing to scroll past
          here. */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        initial="hidden"
        animate="show"
        className="relative flex max-w-3xl flex-col items-center gap-6"
      >
        <motion.span
          variants={fadeUp}
          className="font-mono text-xs uppercase tracking-[0.4em] text-amber"
        >
          Capabilities · Showcase
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="font-display text-5xl text-paper sm:text-7xl"
        >
          We don&apos;t have one style.
          <br />
          <span className="text-outline">We have seven.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-xl text-balance font-sans text-sm text-fog sm:text-base"
        >
          MONOLYTH Z-RO is built to move fluently between aesthetics — from
          soft neumorphic calm to raw brutalist noise — without losing
          performance, accessibility, or craft along the way. Below: seven
          interaction languages, each headed for its own live showcase.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-2 flex flex-wrap justify-center gap-4">
          <a
            href="#showcase-grid"
            data-cursor-hover
            className="border-beam inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-cyan transition-colors duration-300 hover:text-paper"
          >
            See the Showcase
            <ArrowDown size={14} />
          </a>
          <MagneticButton
            href="/contact"
            className="glass-premium flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-colors duration-300 hover:text-violet"
          >
            Start a Project
            <ArrowUpRight size={14} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
