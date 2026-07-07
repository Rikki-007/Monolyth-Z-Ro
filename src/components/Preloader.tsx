"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { cinematicEase } from "@/lib/motion";

const words = ["DESIGNER", "ENGINEER"];

const lineVariants: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: (i: number) => ({
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.9, ease: cinematicEase, delay: 0.15 + i * 0.22 },
  }),
  exit: {
    clipPath: "inset(0 100% 0 0)",
    transition: { duration: 0.7, ease: cinematicEase },
  },
};

const counterVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: cinematicEase } },
};

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    const duration = 1800;
    let raf: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setPercent(Math.round(progress * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        const exitTimer = setTimeout(() => setDone(true), 500);
        return () => clearTimeout(exitTimer);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, 900);
    return () => clearTimeout(timer);
  }, [done, onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-obsidian"
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: cinematicEase, delay: 0.3 },
          }}
        >
          <div className="grid-overlay" aria-hidden="true" />

          <div className="relative flex flex-col items-center gap-2">
            {words.map((word, i) => (
              <div key={word} className="overflow-hidden">
                <motion.h1
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className={`font-display text-[13vw] leading-[0.85] tracking-wide sm:text-[9vw] ${
                    i === 0 ? "text-glow-crimson text-crimson" : "text-glow-cyan text-cyan"
                  }`}
                >
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          <motion.div
            variants={counterVariants}
            initial="hidden"
            animate="show"
            className="absolute bottom-10 flex w-full items-center justify-between px-8 font-mono text-xs text-fog sm:px-14"
          >
            <span>MONOLYTH Z-RO</span>
            <span className="text-amber">{percent.toString().padStart(3, "0")}%</span>
            <span>SYSTEM.INIT</span>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan via-amber to-crimson glow-cyan"
            style={{ width: `${percent}%` }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
