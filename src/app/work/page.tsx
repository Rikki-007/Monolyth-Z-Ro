import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Work — MONOLYTH Z-RO",
  description: "Selected projects — MONOLYTH Z-RO.",
};

export default function WorkPage() {
  return <Projects />;
}
