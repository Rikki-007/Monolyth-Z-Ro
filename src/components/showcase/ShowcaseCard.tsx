"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import type { Showcase } from "@/data/showcases";
import { cinematicEase } from "@/lib/motion";
import ShowcaseSwatch from "@/components/showcase/ShowcaseSwatch";

export default function ShowcaseCard({
  showcase,
  index,
}: {
  showcase: Showcase;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: cinematicEase, delay: index * 0.06 },
      }}
      className="border-beam group flex flex-col overflow-hidden rounded-3xl transition-transform duration-500 hover:-translate-y-1.5"
    >
      <div className="relative h-44 overflow-hidden sm:h-48">
        <ShowcaseSwatch id={showcase.id} />
        {/* Diagonal light sweep on hover — cheap, transform-only micro-interaction */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      </div>

      <div className="glass-premium flex flex-1 flex-col gap-4 p-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-amber">
            0{index + 1} — {showcase.tagline}
          </span>
          <h3 className="mt-2 font-display text-2xl text-paper sm:text-3xl">
            {showcase.title}
          </h3>
        </div>

        <p className="font-sans text-sm leading-relaxed text-fog">
          {showcase.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {showcase.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-concrete-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-fog"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-5 pt-2 font-mono text-xs uppercase tracking-widest">
          {showcase.liveUrl ? (
            <a
              href={showcase.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-cyan transition-colors duration-300 hover:text-paper"
            >
              Visit Showcase
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 text-fog/60"
              title="This showcase hasn't shipped its own deployment yet"
            >
              <Clock size={13} />
              In Development
            </span>
          )}
          {showcase.githubUrl && (
            <a
              href={showcase.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-fog transition-colors duration-300 hover:text-paper"
            >
              <GithubIcon size={14} />
              Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
