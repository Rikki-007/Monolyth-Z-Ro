import type { Metadata } from "next";
import ShowcaseHero from "@/components/showcase/ShowcaseHero";
import ServicesMatrix from "@/components/showcase/ServicesMatrix";
import ShowcaseGrid from "@/components/showcase/ShowcaseGrid";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Showcase — MONOLYTH Z-RO",
  description:
    "Capabilities and services matrix, plus seven interaction-language showcases — MONOLYTH Z-RO.",
};

export default function ShowcasePage() {
  return (
    <>
      <ShowcaseHero />
      <ServicesMatrix />
      <ShowcaseGrid />
      <CtaBand />
    </>
  );
}
