import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — MONOLYTH Z-RO",
  description: "Get in touch — MONOLYTH Z-RO.",
};

export default function ContactPage() {
  return <Contact />;
}
