"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import ParticleLabLoader from "@/components/ParticleLabLoader";

export default function Lab() {
  return (
    <section id="lab" className="section-anchor relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="mb-14"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.4em] text-amber"
          >
            03 / Lab
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-5xl text-paper sm:text-7xl"
          >
            Interactive Sandbox
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-xl font-sans text-sm text-fog sm:text-base"
          >
            A live WebGL particle swarm — pick a formation, drag to orbit it,
            and push its <span className="text-cyan">speed</span>,{" "}
            <span className="text-cyan">concentration</span>,{" "}
            <span className="text-cyan">turbulence</span>, and{" "}
            <span className="text-cyan">spread</span> in real time. Built on{" "}
            <code className="font-mono text-cyan">react-three-fiber</code>.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-premium border-beam overflow-hidden rounded-3xl"
        >
          <ParticleLabLoader />
        </motion.div>
      </div>
    </section>
  );
}
