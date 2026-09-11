"use client";

import { motion } from "framer-motion";
import ParticleLabLoader from "@/components/ParticleLabLoader";
import PageHeader from "@/components/PageHeader";

export default function Lab() {
  return (
    <section className="relative px-6 pt-40 pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <PageHeader
            index="03"
            label="Lab"
            title="Interactive Sandbox"
            description={
              <>
                A live WebGL particle swarm — pick a formation, drag to orbit
                it, and push its <span className="text-cyan">speed</span>,{" "}
                <span className="text-cyan">concentration</span>,{" "}
                <span className="text-cyan">turbulence</span>, and{" "}
                <span className="text-cyan">spread</span> in real time. Built
                on <code className="font-mono text-cyan">react-three-fiber</code>.
              </>
            }
          />
        </div>

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
