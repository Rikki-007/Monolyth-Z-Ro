"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const line = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function AnimatedLine({
  text,
  className,
  outline = false,
}: {
  text: string;
  className?: string;
  outline?: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        variants={line}
        className={`block ${outline ? "text-outline" : ""} ${className ?? ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="section-anchor relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-red/25 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[380px] w-[380px] rounded-full bg-yellow/15 blur-[140px]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--navy-deep)_0%,var(--ink)_75%)]" />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6 font-display text-sm uppercase tracking-[0.35em] text-muted"
      >
        Portfolio — 2026 / Based in India
      </motion.p>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="font-display font-bold uppercase leading-[0.9] tracking-tight text-paper"
      >
        <div className="text-[16vw] md:text-[9vw]">
          <AnimatedLine text="Priyanshu" />
        </div>
        <div className="text-[16vw] md:text-[9vw]">
          <AnimatedLine text="Malik" className="text-red" />
        </div>
        <div className="mt-2 text-[10vw] md:text-[5.5vw]">
          <AnimatedLine text="Engineer / Designer" outline />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
      >
        <p className="max-w-md text-lg text-muted">
          I build software, web and mobile products end to end — and design
          the visual identity that ships with them.
        </p>

        <a
          href="#work"
          className="group flex items-center gap-3 font-display text-sm uppercase tracking-widest text-yellow"
        >
          Scroll to explore
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow/40 transition-transform group-hover:translate-y-1">
            ↓
          </span>
        </a>
      </motion.div>
    </section>
  );
}
