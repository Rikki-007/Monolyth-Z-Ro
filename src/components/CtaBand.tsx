"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import MagneticButton from "@/components/MagneticButton";

export default function CtaBand() {
  return (
    <section className="relative px-6 pb-32 pt-8">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="glass-premium border-beam relative mx-auto flex max-w-6xl flex-col items-center gap-6 overflow-hidden rounded-[2.5rem] px-8 py-20 text-center sm:px-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/20 blur-[100px]"
        />

        <motion.span
          variants={fadeUp}
          className="relative font-mono text-xs uppercase tracking-[0.4em] text-amber"
        >
          05 / Next
        </motion.span>
        <motion.h2
          variants={fadeUp}
          className="relative font-display text-4xl text-paper sm:text-6xl"
        >
          Have something to build?
        </motion.h2>
        <motion.p
          variants={fadeUp}
          className="relative max-w-md font-sans text-sm text-fog sm:text-base"
        >
          Open to freelance work, collaborations, and full-time roles
          spanning design and engineering.
        </motion.p>
        <motion.div variants={fadeUp} className="relative mt-2">
          <MagneticButton
            href="/contact"
            className="glass flex items-center gap-2 rounded-full border border-concrete-line px-8 py-4 font-mono text-sm uppercase tracking-widest text-cyan transition-all duration-300 hover:border-cyan/50 hover:glow-cyan"
          >
            Start a conversation
            <ArrowUpRight size={16} />
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
