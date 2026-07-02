"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
    <section id="work" className="section-anchor relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-display text-sm uppercase tracking-[0.35em] text-red">
            02 — Selected work
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-4xl font-semibold uppercase tracking-tight md:text-6xl">
            Projects
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-white/10">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={0.05 * i}>
              <a
                href={project.href}
                className="group relative grid grid-cols-[auto_1fr] items-center gap-6 border-b border-white/10 py-8 transition-colors md:grid-cols-[80px_1fr_auto_auto]"
              >
                <span className="font-display text-sm text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="font-display text-2xl uppercase tracking-tight text-paper transition-colors group-hover:text-yellow md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mt-1 max-w-md text-sm text-muted md:hidden">
                    {project.description}
                  </p>
                </div>

                <p className="hidden max-w-xs text-sm text-muted md:block">
                  {project.description}
                </p>

                <div className="hidden items-center gap-6 md:flex">
                  <span className="rounded-full border border-red/40 px-4 py-1 font-display text-xs uppercase tracking-widest text-red">
                    {project.category}
                  </span>
                  <span className="font-display text-sm text-muted">
                    {project.year}
                  </span>
                  <motion.span
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-lg"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </motion.span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
