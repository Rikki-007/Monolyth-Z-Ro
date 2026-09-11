"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import { fadeUp } from "@/lib/motion";
import PageHeader from "@/components/PageHeader";

// Most recent three shipped projects — currently a client site plus the two
// self-directed apps (Void Arcade, Meridian), which read strongest as a
// homepage teaser. The full set (including the earlier client work) lives
// on /work.
const featured = projects.filter((p) => !p.comingSoon).slice(-3);

export default function FeaturedWork() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <PageHeader index="02" label="Work" title="Selected Projects" />
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
