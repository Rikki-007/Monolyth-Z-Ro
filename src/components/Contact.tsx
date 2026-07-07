"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "@/components/icons/BrandIcons";
import { fadeUp, staggerContainer } from "@/lib/motion";

const socials = [
  { icon: GithubIcon, label: "GitHub", href: "https://github.com/Rikki-007" },
  { icon: LinkedinIcon, label: "LinkedIn", href: "https://linkedin.com/" },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/monolyth_zro?igsh=d2NocDhsdXhiYTZ1&utm_source=qr",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/share/19567ukrr5/?mibextid=wwXIfr",
  },
  {
    icon: WhatsappIcon,
    label: "WhatsApp",
    href: "https://wa.me/353899698237",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-anchor relative py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.4em] text-amber"
          >
            04 / Contact
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="font-display text-5xl text-paper sm:text-7xl"
          >
            Let&apos;s build
            <br />
            <span className="text-glow-cyan text-cyan">something real.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="max-w-md font-sans text-sm text-fog sm:text-base"
          >
            Open to freelance work, collaborations, and full-time roles
            spanning design and engineering.
          </motion.p>

          <motion.a
            variants={fadeUp}
            data-cursor-hover
            href="mailto:malikpriyanshu250208@gmail.com"
            className="border-beam glow-cyan mt-4 flex items-center gap-3 rounded-full px-8 py-4 font-mono text-sm uppercase tracking-widest text-cyan"
          >
            <Mail size={18} />
            malikpriyanshu250208@gmail.com
          </motion.a>

          <motion.a
            variants={fadeUp}
            data-cursor-hover
            href="tel:+353896139970"
            className="border-beam glow-cyan flex items-center gap-3 rounded-full px-8 py-4 font-mono text-sm uppercase tracking-widest text-cyan"
          >
            <Phone size={18} />
            +353 0896139970
          </motion.a>

          <motion.div variants={fadeUp} className="mt-8 flex gap-6">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                data-cursor-hover
                className="glass flex h-11 w-11 items-center justify-center rounded-full text-fog transition-colors duration-300 hover:text-cyan"
              >
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
