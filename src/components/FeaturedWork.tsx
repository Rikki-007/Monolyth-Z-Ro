"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { fadeUp } from "@/lib/motion";
import PageHeader from "@/components/PageHeader";

// Curated by hand rather than derived (e.g. "last N shipped") so the
// homepage teaser is a deliberate pick, not whatever happens to be newest —
// two live client sites plus the two self-directed apps. The full set lives
// on /work.
const FEATURED_TITLES = [
  "Aspect Plumbing & Heating",
  "Electricians 24/7",
  "Void Arcade",
  "Meridian",
];

const featured = FEATURED_TITLES.map((title) =>
  projects.find((p): p is Project => !p.comingSoon && p.title === title)
).filter((p): p is Project => Boolean(p));

export default function FeaturedWork() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <PageHeader
            index="03"
            label="Work"
            title="Selected Projects"
            reveal="scroll"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <Link
              href="/work"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-fog transition-colors duration-300 hover:text-cyan"
            >
              View all work
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>
        </div>

        <div className="grid auto-rows-[16rem] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              tall={i === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
