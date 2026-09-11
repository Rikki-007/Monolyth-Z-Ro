"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  PenTool,
  Layers,
  Palette,
  Code2,
  Terminal,
  Cpu,
  Compass,
  Repeat,
  Target,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import PageHeader from "@/components/PageHeader";

const designSkills = [
  { icon: Palette, label: "Brand & Identity" },
  { icon: Layers, label: "Layout & Editorial" },
  { icon: PenTool, label: "2D Illustration" },
];

const engineeringSkills = [
  { icon: Code2, label: "Web Architecture" },
  { icon: Terminal, label: "Systems & Tooling" },
  { icon: Cpu, label: "App Engineering" },
];

const principles = [
  {
    icon: Compass,
    title: "Direction first",
    body: "Every project starts with what it needs to communicate, not what it should look like. The visual language follows from there.",
  },
  {
    icon: Repeat,
    title: "Iterate in the open",
    body: "Design and build happen in the same loop — a layout gets stress-tested against real code and real content early, not bolted together at the end.",
  },
  {
    icon: Target,
    title: "Ship the whole thing",
    body: "Polish isn't a separate pass. Performance, accessibility, and motion detail are part of the build from the first commit.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orbY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const designX = useTransform(scrollYProgress, [0, 0.5], [-40, 0]);
  const engineerX = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-6 pt-40 pb-32">
      {/* blur-[80px], not the original 140px: this glow moves continuously
          via scroll-linked `y` for the whole time this section is in view,
          so the browser has to keep a much larger filtered/composited
          buffer around than the element's own footprint (roughly
          proportional to the blur radius) alive and repositioned on every
          scroll tick. At 10% opacity the softer blur reads the same. */}
      <motion.div
        style={{ y: orbY }}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-cyan/10 blur-[80px] [transform:translateZ(0)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="mb-20">
          <PageHeader
            index="01"
            label="About"
            title={
              <>
                Two disciplines.
                <br />
                <span className="text-outline">One process.</span>
              </>
            }
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            style={{ x: designX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 1 } }}
            viewport={{ once: true, amount: 0.3 }}
            className="glass-premium border-beam rounded-3xl p-8 [transform:translateZ(0)]"
          >
            <h3 className="font-display text-3xl text-crimson text-glow-crimson">
              Designer
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-fog sm:text-base">
              I start every build with the eye of a designer — grid, contrast,
              rhythm, restraint. Visuals are engineered as carefully as code:
              every spacing value and color decision earns its place.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {designSkills.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-paper"
                >
                  <Icon size={16} className="text-crimson" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            style={{ x: engineerX }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, transition: { duration: 1 } }}
            viewport={{ once: true, amount: 0.3 }}
            className="glass-premium border-beam rounded-3xl p-8 [transform:translateZ(0)]"
          >
            <h3 className="font-display text-3xl text-cyan text-glow-cyan">
              Engineer
            </h3>
            <p className="mt-4 font-sans text-sm leading-relaxed text-fog sm:text-base">
              Then I build the machine underneath — clean architecture,
              typed and tested, tuned for performance. The interface never
              outpaces the system that has to run it.
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {engineeringSkills.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-paper"
                >
                  <Icon size={16} className="text-cyan" />
                  {label}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-8 grid gap-5 sm:grid-cols-3"
        >
          {principles.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="glass rounded-3xl p-6"
            >
              <Icon size={20} className="text-amber" />
              <h4 className="mt-4 font-display text-xl text-paper">{title}</h4>
              <p className="mt-2 font-sans text-sm leading-relaxed text-fog">
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
