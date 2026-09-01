"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import type { ProjectEntry } from "@/data/projects";
import { categoryAccent } from "@/data/projects";
import { cinematicEase } from "@/lib/motion";

const accentClasses: Record<string, { text: string }> = {
  cyan: { text: "text-cyan" },
  crimson: { text: "text-crimson" },
  amber: { text: "text-amber" },
};

const cardMotion = {
  layout: true,
  initial: { opacity: 0, y: 32, scale: 0.96 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: {
    opacity: 0,
    scale: 0.94,
    transition: { duration: 0.35, ease: cinematicEase },
  },
  transition: { duration: 0.7, ease: cinematicEase },
} as const;

export default function ProjectCard({
  project,
  tall = false,
}: {
  project: ProjectEntry;
  tall?: boolean;
}) {
  const accent = accentClasses[categoryAccent[project.category]];
  const sizeClass = tall ? "row-span-2 min-h-[22rem]" : "min-h-[16rem]";

  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 220, damping: 22 });
  const springRotateY = useSpring(rotateY, { stiffness: 220, damping: 22 });

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 7);
    rotateX.set(-py * 7);
  };

  const handleTiltLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  if (project.comingSoon) {
    return (
      <motion.div
        {...cardMotion}
        className={`glass relative flex flex-col justify-between overflow-hidden rounded-3xl border border-dashed border-concrete-line p-6 ${sizeClass}`}
      >
        <div className="flex items-start justify-between">
          <span
            className={`font-mono text-[11px] uppercase tracking-widest ${accent.text}`}
          >
            {project.category}
          </span>
          <Clock size={18} className="text-fog" />
        </div>

        <div>
          <h3 className="font-display text-2xl text-fog sm:text-3xl">
            More on the way
          </h3>
          <p className="mt-3 font-sans text-sm leading-relaxed text-fog/70">
            Working on a {project.category.toLowerCase()} project to show
            here next.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...cardMotion}
      ref={cardRef}
      onMouseMove={handleTiltMove}
      onMouseLeave={handleTiltLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
      }}
      className={`group border-beam glass-premium relative flex flex-col justify-between overflow-hidden rounded-3xl p-6 transition-colors duration-300 hover:bg-concrete-light/40 ${sizeClass}`}
    >
      <div className="flex items-start justify-between">
        <span
          className={`font-mono text-[11px] uppercase tracking-widest ${accent.text}`}
        >
          {project.category}
        </span>
        <span className="font-mono text-xs text-fog/70">{project.year}</span>
      </div>

      <div>
        <h3 className="font-display text-2xl text-paper sm:text-3xl">
          {project.title}
        </h3>
        <p className="mt-3 font-sans text-sm leading-relaxed text-fog">
          {project.description}
        </p>

        <div className="mt-5 flex items-center gap-5 font-mono text-xs uppercase tracking-widest">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-1.5 text-cyan transition-colors duration-300 hover:text-paper"
          >
            Visit Site
            <ArrowUpRight size={14} />
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-1.5 text-fog transition-colors duration-300 hover:text-paper"
          >
            <GithubIcon size={14} />
            Code
          </a>
        </div>
      </div>
    </motion.div>
  );
}
