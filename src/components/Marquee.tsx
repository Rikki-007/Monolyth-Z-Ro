"use client";

import { motion } from "framer-motion";

export default function Marquee({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-white/10 bg-navy-deep py-5">
      <motion.div
        className="flex w-max gap-10 whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="font-display text-3xl uppercase tracking-wide text-muted md:text-4xl"
          >
            {item}{" "}
            <span className="text-red">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
