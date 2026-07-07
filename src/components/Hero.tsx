"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { fadeUp, staggerContainer, cinematicEase } from "@/lib/motion";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const designX = useSpring(useTransform(mouseX, [-1, 1], [-24, 24]), {
    stiffness: 60,
    damping: 20,
  });
  const designY = useSpring(useTransform(mouseY, [-1, 1], [-14, 14]), {
    stiffness: 60,
    damping: 20,
  });
  const engineerX = useSpring(useTransform(mouseX, [-1, 1], [24, -24]), {
    stiffness: 60,
    damping: 20,
  });
  const engineerY = useSpring(useTransform(mouseY, [-1, 1], [14, -14]), {
    stiffness: 60,
    damping: 20,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  return (
    <section
      id="top"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="section-anchor relative flex h-screen items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="relative flex w-full max-w-6xl flex-col items-center px-6 [transform:translateZ(0)]"
      >
        <motion.div
          variants={staggerContainer(0.15, 0.1)}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-3 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.4em] text-fog"
          >
            DESIGN | ENGINEERING | SOFTWARE
          </motion.span>

          <div className="relative flex flex-col items-center leading-none">
            <motion.h1
              variants={fadeUp}
              style={{ x: designX, y: designY }}
              className="font-display text-[15vw] text-glow-crimson text-crimson sm:text-[10vw]"
            >
              DESIGN
            </motion.h1>
            <motion.h1
              variants={fadeUp}
              style={{ x: engineerX, y: engineerY }}
              className="font-display -mt-[3vw] text-[15vw] text-glow-cyan text-cyan sm:-mt-[2vw] sm:text-[10vw]"
            >
              ENGINEER
            </motion.h1>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-balance font-sans text-sm text-fog sm:text-base"
          >
            MONOLYTH Z-RO — building interfaces and the systems underneath
            them. Graphic design instincts, software engineering discipline.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-4 flex gap-4">
            <a
              href="#projects"
              data-cursor-hover
              className="border-beam rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-amber"
            >
              View Work
            </a>
            <a
              href="#contact"
              data-cursor-hover
              className="glass rounded-full px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 1.4, duration: 1, ease: cinematicEase } }}
        className="absolute bottom-10 flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-fog"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: cinematicEase }}
          className="block h-8 w-px bg-gradient-to-b from-cyan to-transparent"
        />
      </motion.div>
    </section>
  );
}
