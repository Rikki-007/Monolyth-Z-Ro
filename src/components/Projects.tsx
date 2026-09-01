"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Category } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { fadeUp, staggerContainer } from "@/lib/motion";

const filters: Array<Category | "All"> = [
  "All",
  "Web",
  "App",
  "Software",
  "Design",
];

export default function Projects() {
  const [active, setActive] = useState<Category | "All">("All");

  const filtered = useMemo(
    () =>
      active === "All"
        // The default view only shows shipped work — "coming soon"
        // placeholders stay tucked behind their category filter below.
        ? projects.filter((project) => !project.comingSoon)
        : projects.filter((project) => project.category === active),
    [active]
  );

  return (
    <section id="projects" className="section-anchor relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.span
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.4em] text-amber"
            >
              02 / Work
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-5xl text-paper sm:text-7xl"
            >
              Selected Projects
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                data-cursor-hover
                onClick={() => setActive(filter)}
                className={`relative rounded-full px-4 py-2 transition-colors duration-300 ${
                  active === filter
                    ? "text-obsidian"
                    : "text-fog hover:text-paper"
                }`}
              >
                {active === filter && (
                  <motion.span
                    layoutId="filter-pill"
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 rounded-full bg-cyan glow-cyan"
                  />
                )}
                <span className="relative">{filter}</span>
              </button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          layout
          className="grid auto-rows-[16rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.comingSoon ? `soon-${project.category}` : project.title}
                project={project}
                tall={i % 5 === 0}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
