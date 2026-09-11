"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Code2, Boxes } from "lucide-react";
import Link from "next/link";
import { fadeUp, staggerContainer } from "@/lib/motion";
import PageHeader from "@/components/PageHeader";

const pillars = [
  {
    icon: Palette,
    accent: "text-crimson",
    glow: "text-glow-crimson",
    title: "Design",
    body: "Brand systems, editorial layout, and interfaces built on grid, contrast, and restraint before a single line of code.",
    span: "sm:row-span-2",
  },
  {
    icon: Code2,
    accent: "text-cyan",
    glow: "text-glow-cyan",
    title: "Engineering",
    body: "Typed, tested, performance-tuned front ends — the interface never outpaces the system running it.",
    span: "",
  },
  {
    icon: Boxes,
    accent: "text-amber",
    glow: "text-glow-amber",
    title: "Software",
    body: "Full products end to end: data models, interaction states, and the plumbing in between.",
    span: "",
  },
];

/**
 * Home-page teaser bento for the three disciplines — a condensed version of
 * the full /about breakdown, with a direct link through to it.
 */
export default function Capabilities() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <PageHeader
            index="01"
            label="Capabilities"
            title="One studio, three disciplines."
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <Link
              href="/about"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-fog transition-colors duration-300 hover:text-cyan"
            >
              More about the process
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-5 sm:grid-cols-2 sm:grid-rows-2"
        >
          {pillars.map(({ icon: Icon, accent, glow, title, body, span }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className={`glass-premium border-beam flex flex-col justify-between gap-8 rounded-3xl p-8 [transform:translateZ(0)] ${span}`}
            >
              <Icon size={28} className={accent} />
              <div>
                <h3 className={`font-display text-2xl sm:text-3xl ${accent} ${glow}`}>
                  {title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-fog">
                  {body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
