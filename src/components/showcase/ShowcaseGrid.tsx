"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { showcases, tiers, type Showcase, type Tier } from "@/data/showcases";
import ShowcaseCard from "@/components/showcase/ShowcaseCard";
import PageHeader from "@/components/PageHeader";
import { cinematicEase } from "@/lib/motion";

type Shipped = Showcase & { liveUrl: string };

// Only shipped work is shown: an entry without a live deployment stays out
// of the grid entirely instead of rendering as a placeholder.
const shipped = showcases.filter((s): s is Shipped => Boolean(s.liveUrl));

// Filter options come from the shipped work itself, so a style or tier with
// nothing live behind it never shows up as an empty category.
const styles = [...new Set(shipped.map((s) => s.title))];
const tierOptions = (Object.keys(tiers) as Tier[]).filter((t) =>
  shipped.some((s) => s.tier === t),
);

export default function ShowcaseGrid() {
  const [style, setStyle] = useState<string | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);

  const visible = shipped.filter(
    (s) => (!style || s.title === style) && (!tier || s.tier === tier),
  );

  return (
    <section id="showcase-grid" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <PageHeader
            index="02"
            label="Showcase"
            title="Interactive Showcase Grid"
            description="Seven distinct design languages, one studio behind all of them. Each one shipped as its own standalone, live build."
            as="h2"
            reveal="scroll"
          />
        </div>

        <div className="mb-10 flex flex-col gap-4">
          <FilterGroup
            label="Style"
            options={styles.map((s) => ({ value: s, label: s }))}
            value={style}
            onChange={setStyle}
          />
          <FilterGroup
            label="Tier"
            options={tierOptions.map((t) => ({ value: t, label: tiers[t] }))}
            value={tier}
            onChange={(v) => setTier(v as Tier | null)}
          />
          <p aria-live="polite" className="font-mono text-[11px] uppercase tracking-widest text-fog/70">
            {visible.length} of {shipped.length} builds
          </p>
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((showcase) => (
              <motion.div
                key={showcase.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: cinematicEase }}
              >
                {/* Catalogue number stays fixed while filtering. */}
                <ShowcaseCard showcase={showcase} index={shipped.indexOf(showcase)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {visible.length === 0 && (
          <p className="mt-2 font-sans text-sm text-fog">
            No shipped build matches both filters.{" "}
            <button
              type="button"
              data-cursor-hover
              onClick={() => {
                setStyle(null);
                setTier(null);
              }}
              className="text-cyan underline-offset-4 hover:underline"
            >
              Clear filters
            </button>
          </p>
        )}
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${
      active
        ? "border-cyan/60 text-cyan"
        : "border-concrete-line text-fog hover:border-fog/60 hover:text-paper"
    }`;

  return (
    <div role="group" aria-label={`Filter by ${label.toLowerCase()}`} className="flex flex-wrap items-center gap-2">
      <span className="mr-2 w-12 font-mono text-[11px] uppercase tracking-widest text-amber">{label}</span>
      <button type="button" data-cursor-hover aria-pressed={value === null} onClick={() => onChange(null)} className={chip(value === null)}>
        All
      </button>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          data-cursor-hover
          aria-pressed={value === o.value}
          onClick={() => onChange(value === o.value ? null : o.value)}
          className={chip(value === o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
