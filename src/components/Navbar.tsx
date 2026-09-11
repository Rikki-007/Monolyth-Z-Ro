"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cinematicEase } from "@/lib/motion";
import { Wordmark } from "@/components/icons/MonolythMark";
import MagneticButton from "@/components/MagneticButton";

const links = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Lab", href: "/lab" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <nav className="glass-premium mx-auto mt-4 flex w-[92%] max-w-6xl items-center justify-between rounded-full px-6 py-3 sm:w-[88%]">
        <Link href="/" data-cursor-hover aria-label="MONOLYTH Z-RO — home">
          <Wordmark iconSize={24} textClassName="text-base sm:text-lg" />
        </Link>

        <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-fog md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  data-cursor-hover
                  className={`relative transition-colors duration-300 hover:text-cyan ${
                    active ? "text-cyan" : ""
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      transition={{ duration: 0.5, ease: cinematicEase }}
                      className="absolute -bottom-1.5 left-0 right-0 h-px bg-cyan glow-cyan"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <MagneticButton
          href="/contact"
          strength={7}
          className="border-beam hidden rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest text-cyan md:block"
        >
          Let&apos;s Talk
        </MagneticButton>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
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
            {links.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    ease: cinematicEase,
                    delay: 0.05 + i * 0.06,
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-xl px-4 py-3 font-mono text-sm uppercase tracking-widest transition-colors hover:bg-concrete-light hover:text-cyan ${
                      active ? "text-cyan" : "text-fog"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
