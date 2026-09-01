"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Mail, Phone } from "lucide-react";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  FacebookIcon,
  WhatsappIcon,
} from "@/components/icons/BrandIcons";
import { Wordmark } from "@/components/icons/MonolythMark";
import { fadeUp, staggerContainer } from "@/lib/motion";
import MagneticButton from "@/components/MagneticButton";

const email = "monolythzro@gmail.com";

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
  const [copied, setCopied] = useState(false);

  const handleEmailClick = () => {
    // mailto: only does something visible if the visitor has a default mail
    // app configured — plenty of people don't, and then the button looks
    // completely dead. Copy the address as a fallback + give on-screen
    // confirmation either way, without blocking the normal mailto: handoff.
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

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
          <motion.div variants={fadeUp}>
            <Wordmark iconSize={34} textClassName="text-xl sm:text-2xl" />
          </motion.div>

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

          <motion.div variants={fadeUp} className="mt-4">
            <MagneticButton
              href={`mailto:${email}`}
              onClick={handleEmailClick}
              aria-label={`Send an email to ${email}`}
              className="glass-premium flex items-center gap-3 rounded-full px-8 py-4 font-mono text-sm tracking-widest text-cyan transition-all duration-300 hover:border-violet/40 hover:glow-violet"
            >
              {copied ? <Check size={18} /> : <Mail size={18} />}
              {copied ? "Copied — paste into your mail app" : email}
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp}>
            <MagneticButton
              href="tel:+353896139970"
              aria-label="Call +353 0896139970"
              className="glass flex items-center gap-3 rounded-full border border-concrete-line px-8 py-4 font-mono text-sm uppercase tracking-widest text-cyan transition-all duration-300 hover:border-cyan/50 hover:glow-cyan"
            >
              <Phone size={18} />
              +353 0896139970
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex gap-6">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                title={label}
                data-cursor-hover
                className="glass flex h-11 w-11 items-center justify-center rounded-full border border-concrete-line text-fog transition-all duration-300 hover:border-cyan/50 hover:text-cyan hover:glow-cyan"
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
