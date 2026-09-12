"use client";

import { motion } from "framer-motion";
import {
  LayoutGrid,
  Orbit,
  MousePointerClick,
  Sparkles,
  Component,
  Gauge,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import PageHeader from "@/components/PageHeader";

const capabilities = [
  {
    icon: LayoutGrid,
    title: "Custom Web Applications",
    description:
      "Full-stack, typed, production-grade builds — dashboards, client portals, and internal tools built to be maintained, not just shipped.",
    example: "e.g. a paper-trading terminal with live order books and portfolio state",
  },
  {
    icon: Orbit,
    title: "3D & WebGL Experiences",
    description:
      "Three.js and React Three Fiber scenes — particle fields, shader work, and real-time interactivity that stays smooth under real traffic.",
    example: "e.g. a persistent, cursor-reactive background running behind live UI",
  },
  {
    icon: MousePointerClick,
    title: "Scroll-Driven Storytelling",
    description:
      "Scroll-linked motion, parallax, and pinned sequences that turn a static page into a sequence the visitor drives themselves.",
    example: "e.g. camera dolly and depth-of-field tied directly to scroll progress",
  },
  {
    icon: Sparkles,
    title: "Motion & Micro-interactions",
    description:
      "Framer Motion detail work — hover states, transitions, and feedback tuned until the interface feels alive instead of decorated.",
    example: "e.g. magnetic CTAs, shared-layout filters, cinematic route transitions",
  },
  {
    icon: Component,
    title: "Design Systems & UI Architecture",
    description:
      "Tokens, component libraries, and layout patterns built to scale past a single page without the visual language drifting.",
    example: "e.g. one token set driving color, type, and motion across every route",
  },
  {
    icon: Gauge,
    title: "Performance Engineering",
    description:
      "Render-cost audits, animation profiling, and Core Web Vitals treated as a first-class deliverable — not a post-launch afterthought.",
    example: "e.g. tracing a scroll-time stutter to one repainting CSS property",
  },
];

export default function ServicesMatrix() {
  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <PageHeader
            index="01"
            label="Capabilities"
            title="Services Matrix"
            description="What this studio actually builds, end to end — not a menu of buzzwords, a map of the work itself."
            reveal="scroll"
          />
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {capabilities.map(({ icon: Icon, title, description, example }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group glass-premium border-beam relative flex flex-col gap-4 overflow-hidden rounded-3xl p-6"
            >
              <Icon size={24} className="text-cyan" />
              <h3 className="font-display text-xl text-paper sm:text-2xl">
                {title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-fog">
                {description}
              </p>
              <p className="max-h-0 overflow-hidden font-mono text-[11px] leading-relaxed text-violet opacity-0 transition-all duration-500 ease-out group-hover:max-h-16 group-hover:opacity-100">
                {example}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
