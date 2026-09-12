"use client";

import { showcases } from "@/data/showcases";
import ShowcaseCard from "@/components/showcase/ShowcaseCard";
import PageHeader from "@/components/PageHeader";

export default function ShowcaseGrid() {
  return (
    <section id="showcase-grid" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <PageHeader
            index="02"
            label="Showcase"
            title="Interactive Showcase Grid"
            description="Seven distinct design languages, one studio behind all of them. Each card below is headed for its own standalone build and live deployment."
            reveal="scroll"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {showcases.map((showcase, i) => (
            <ShowcaseCard key={showcase.id} showcase={showcase} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
