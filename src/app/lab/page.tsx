import type { Metadata } from "next";
import Lab from "@/components/Lab";

export const metadata: Metadata = {
  title: "Lab — MONOLYTH Z-RO",
  description: "An interactive WebGL particle sandbox — MONOLYTH Z-RO.",
};

export default function LabPage() {
  return <Lab />;
}
