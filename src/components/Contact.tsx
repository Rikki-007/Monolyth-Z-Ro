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
    <section className="relative px-6 pt-40 pb-32">
      <div className="mx-auto max-w-4xl text-center">
        {/* animate, not whileInView: this whole page is short enough to
            sit fully in the initial viewport on load — nothing to scroll
            past to trigger a scroll-based reveal. */}
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={fadeUp}>
            <Wordmark iconSize={34} textClassName="text-xl sm:text-2xl" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass inline-flex items-center gap-2 rounded-full border border-concrete-line px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-fog">
              Available for new projects
            </span>
          </motion.div>

          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.4em] text-amber"
          >
            04 / Contact
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="font-display text-5xl text-paper sm:text-7xl"
          >
            Let&apos;s build
            <br />
            <span className="text-glow-cyan text-cyan">something real.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-md font-sans text-sm text-fog sm:text-base"
          >
            Open to freelance work, collaborations, and full-time roles
            spanning design and engineering. Typically replies within 24
            hours.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6">
            <MagneticButton
              href={`mailto:${email}`}
              onClick={handleEmailClick}
              aria-label={`Send an email to ${email}`}
              className="border-beam glass-premium flex items-center gap-3 rounded-full px-8 py-4 font-mono text-sm tracking-widest text-cyan transition-all duration-300 hover:border-violet/40 hover:glow-violet"
            >
              {copied ? <Check size={18} /> : <Mail size={18} />}
              {copied ? "Copied — paste into your mail app" : email}
            </MagneticButton>
          </motion.div>

          {/* Secondary channels grouped into one bordered panel, visually
              subordinate to the primary email CTA above — a phone number
              and five social links reading as a flat row of equal-weight
              buttons was competing with the actual conversion action. */}
          <motion.div
            variants={fadeUp}
            className="glass mt-4 flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border border-concrete-line px-6 py-6"
          >
            <MagneticButton
              href="tel:+353896139970"
              aria-label="Call +353 0896139970"
              className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-paper transition-colors duration-300 hover:text-cyan"
            >
              <Phone size={16} />
              +353 0896139970
            </MagneticButton>

            <div className="h-px w-full bg-concrete-line" />

            <div className="flex gap-4">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (opens in a new tab)`}
                  title={label}
                  data-cursor-hover
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-concrete-line text-fog transition-all duration-300 hover:border-cyan/50 hover:text-cyan hover:glow-cyan"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
