"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

// Edit these to point at your real accounts.
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/" },
  { label: "LinkedIn", href: "https://linkedin.com/" },
  { label: "Instagram", href: "https://instagram.com/" },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="section-anchor relative overflow-hidden py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red/15 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <span className="font-display text-sm uppercase tracking-[0.35em] text-yellow">
            03 — Contact
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-tight md:text-[7vw]">
            Let&apos;s build
            <br />
            something<span className="text-red">.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <motion.a
            href="mailto:malikpriyanshu2502@gmail.com"
            whileHover={{ scale: 1.03 }}
            className="mt-10 inline-block border-b-2 border-yellow font-sans text-xl text-paper transition-colors hover:text-yellow md:text-2xl"
          >
            malikpriyanshu2502@gmail.com
          </motion.a>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 flex justify-center gap-8 font-display text-sm uppercase tracking-widest text-muted">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-paper"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
