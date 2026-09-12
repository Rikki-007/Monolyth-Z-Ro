import Hero from "@/components/Hero";
import ServicesMatrix from "@/components/showcase/ServicesMatrix";
import ShowcaseGrid from "@/components/showcase/ShowcaseGrid";
import FeaturedWork from "@/components/FeaturedWork";
import CtaBand from "@/components/CtaBand";

// Home is the zero-click entry point: capabilities, the full showcase grid,
// and selected real work all live directly on this page so a first-time
// visitor never has to click through to see the scope of what this studio
// builds. /showcase and /work still exist as their own routes (linked from
// nav) for anyone who wants a focused, shareable link to either.
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesMatrix />
      <ShowcaseGrid />
      <FeaturedWork />
      <CtaBand />
    </>
  );
}
