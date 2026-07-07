"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cinematicEase } from "@/lib/motion";
import { Wordmark } from "@/components/icons/MonolythMark";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Lab", href: "#lab" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="glass mx-auto mt-4 flex w-[92%] max-w-6xl items-center justify-between rounded-full px-6 py-3 sm:w-[88%]">
        <a href="#top" data-cursor-hover aria-label="MONOLYTH Z-RO — home">
          <Wordmark iconSize={24} textClassName="text-base sm:text-lg" />
        </a>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-fog md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                data-cursor-hover
                className="transition-colors duration-300 hover:text-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          data-cursor-hover
          className="border-beam hidden rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest text-cyan md:block"
        >
          Let&apos;s Talk
        </a>

        <button
          type="button"
          aria-label="Toggle menu"
          data-cursor-hover
          onClick={() => setOpen((v) => !v)}
          className="text-paper md:hidden"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: cinematicEase }}
            className="glass mx-auto mt-3 flex w-[92%] flex-col gap-1 rounded-3xl p-4 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-widest text-fog transition-colors hover:bg-concrete-light hover:text-cyan"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
