import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About — MONOLYTH Z-RO",
  description: "Design and engineering, one process — MONOLYTH Z-RO.",
};

export default function AboutPage() {
  return <About />;
}
