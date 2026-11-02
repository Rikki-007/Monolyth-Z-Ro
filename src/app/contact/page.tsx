import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact — MONOLYTH Z-RO",
  description:
    "Start a project with MONOLYTH Z-RO — email hello@monolythzro.com or call +353 89 613 9970.",
};

export default function ContactPage() {
  return <Contact />;
}
