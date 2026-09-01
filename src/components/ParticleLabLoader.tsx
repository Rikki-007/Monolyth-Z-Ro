"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Gauge, Atom, Waves, Maximize2 } from "lucide-react";
import { particlePresets, type ParticleParams } from "@/lib/particlePresets";

// Same reasoning as Background3DLoader: keep the three.js/R3F bundle out of
// the initial page load and off the server render entirely.
const ParticleLab = dynamic(() => import("./ParticleLab"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-fog">
      Loading particle field…
    </div>
  ),
});

const DEFAULT_PARAMS: ParticleParams = {
  speed: 1,
  concentration: 0.5,
  turbulence: 0.4,
  spread: 1,
};

const sliders: Array<{
  key: keyof ParticleParams;
  label: string;
  icon: typeof Gauge;
  min: number;
  max: number;
  step: number;
}> = [
  { key: "speed", label: "Speed", icon: Gauge, min: 0.1, max: 2.5, step: 0.05 },
  { key: "concentration", label: "Concentration", icon: Atom, min: 0, max: 1, step: 0.02 },
  { key: "turbulence", label: "Turbulence", icon: Waves, min: 0, max: 2, step: 0.05 },
  { key: "spread", label: "Spread", icon: Maximize2, min: 0.4, max: 2, step: 0.05 },
];

export default function ParticleLabLoader() {
  const [presetId, setPresetId] = useState(particlePresets[0].id);
  const [params, setParams] = useState<ParticleParams>(DEFAULT_PARAMS);

  const activePreset =
    particlePresets.find((preset) => preset.id === presetId) ?? particlePresets[0];

  return (
    <div className="flex flex-col">
      <div className="relative h-[420px] w-full [transform:translateZ(0)]">
        <ParticleLab presetId={presetId} params={params} />
      </div>

      <div className="border-t border-concrete-line p-6">
        <div className="mb-5 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-widest">
          {particlePresets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              data-cursor-hover
              onClick={() => setPresetId(preset.id)}
              className={`relative rounded-full px-4 py-2 transition-colors duration-300 ${
                presetId === preset.id ? "text-obsidian" : "text-fog hover:text-paper"
              }`}
            >
              {presetId === preset.id && (
                <motion.span
                  layoutId="particle-preset-pill"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-full bg-cyan glow-cyan"
                />
              )}
              <span className="relative">{preset.name}</span>
            </button>
          ))}
        </div>

        <p className="mb-6 max-w-2xl font-sans text-sm leading-relaxed text-fog">
          {activePreset.description}
        </p>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {sliders.map(({ key, label, icon: Icon, min, max, step }) => (
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
                value={params[key]}
                onChange={(e) =>
                  setParams((p) => ({ ...p, [key]: Number(e.target.value) }))
                }
                className="accent-cyan"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
