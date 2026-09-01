"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Gauge, Sparkles, Waves, Palette } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
};

type Params = {
  count: number;
  speed: number;
  chaos: number;
  hue: number;
};

const DEFAULTS: Params = { count: 90, speed: 1, chaos: 1, hue: 190 };

function makeParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    radius: 1 + Math.random() * 2.2,
  };
}

export default function Lab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const paramsRef = useRef<Params>({ ...DEFAULTS });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particlesRef.current = Array.from({ length: DEFAULTS.count }, () =>
      makeParticle(canvas.width, canvas.height)
    );

    const step = () => {
      const { speed, chaos, hue, count } = paramsRef.current;
      const particles = particlesRef.current;

      while (particles.length < count) {
        particles.push(makeParticle(canvas.width, canvas.height));
      }
      if (particles.length > count) {
        particles.length = count;
      }

      ctx.fillStyle = "rgba(6, 6, 8, 0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.vx += (Math.random() - 0.5) * 0.05 * chaos;
        p.vy += (Math.random() - 0.5) * 0.05 * chaos;
        p.vx = Math.max(-2, Math.min(2, p.vx));
        p.vy = Math.max(-2, Math.min(2, p.vy));

        p.x += p.vx * speed;
        p.y += p.vy * speed;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.shadowColor = `hsl(${hue}, 100%, 55%)`;
        ctx.shadowBlur = 12;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(step);
    };

    frameRef.current = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const controls: Array<{
    key: keyof Params;
    label: string;
    icon: typeof Gauge;
    min: number;
    max: number;
    step: number;
  }> = [
    { key: "count", label: "Particles", icon: Sparkles, min: 10, max: 300, step: 1 },
    { key: "speed", label: "Velocity", icon: Gauge, min: 0.1, max: 4, step: 0.1 },
    { key: "chaos", label: "Turbulence", icon: Waves, min: 0, max: 4, step: 0.1 },
    { key: "hue", label: "Spectrum", icon: Palette, min: 0, max: 360, step: 1 },
  ];

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
            A live particle field rendered on canvas — drag the sliders to
            push it in real time. No frameworks, just{" "}
            <code className="font-mono text-cyan">requestAnimationFrame</code>{" "}
            and refs, tuned to stay smooth at 60fps.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          viewport={{ once: true, amount: 0.2 }}
          className="glass-premium border-beam overflow-hidden rounded-3xl"
        >
          <div className="relative h-[420px] w-full [transform:translateZ(0)]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          </div>

          <div className="grid grid-cols-2 gap-6 border-t border-concrete-line p-6 sm:grid-cols-4">
            {controls.map(({ key, label, icon: Icon, min, max, step }) => (
              <label key={key} className="flex flex-col gap-2">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fog">
                  <Icon size={14} className="text-cyan" />
                  {label}
                </span>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  defaultValue={DEFAULTS[key]}
                  onChange={(e) => {
                    paramsRef.current[key] = Number(e.target.value);
                  }}
                  className="accent-cyan"
                />
              </label>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
