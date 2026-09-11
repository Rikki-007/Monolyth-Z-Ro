"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Category } from "@/data/projects";
import ProjectCard from "./ProjectCard";
import { fadeUp } from "@/lib/motion";
import PageHeader from "@/components/PageHeader";

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
    <section className="relative px-6 pt-40 pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <PageHeader
            index="02"
            label="Work"
            title="Selected Projects"
            description="A mix of shipped client sites and self-directed builds — spanning marketing sites, data-driven tools, and full product interfaces."
          />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                data-cursor-hover
                aria-pressed={active === filter}
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
        </div>

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
