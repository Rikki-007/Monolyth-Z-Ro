"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

/**
 * The numbered eyebrow + big display title every page opens with. Pulled
 * out of the individual section components (About/Projects/Lab/Contact)
 * once they became standalone pages, so the "02 / Work" style heading
 * stays visually consistent without four copies of the same markup.
 */
export default function PageHeader({
  index,
  label,
  title,
  description,
  align = "left",
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <motion.span
        variants={fadeUp}
        className="font-mono text-xs uppercase tracking-[0.4em] text-amber"
      >
        {index} / {label}
      </motion.span>
      <motion.h1
        variants={fadeUp}
        className="font-display text-5xl text-paper sm:text-7xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          variants={fadeUp}
          className={`font-sans text-sm text-fog sm:text-base ${
            align === "center" ? "max-w-xl" : "max-w-2xl"
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
