import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  alternates: { canonical: "/work" },
  title: "Work — MONOLYTH Z-RO",
  description: "Selected projects — MONOLYTH Z-RO.",
};

export default function WorkPage() {
  return <Projects />;
}
