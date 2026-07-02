import Reveal from "./Reveal";
import Marquee from "./Marquee";

const SKILLS = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "React Native",
  "Figma",
  "Adobe Illustrator",
  "Tailwind CSS",
  "Framer Motion",
  "PostgreSQL",
];

const STATS = [
  { value: "4", label: "Disciplines\n(Web / Software / App / Design)" },
  { value: "01", label: "Approach:\nDesign & build, one person" },
  { value: "∞", label: "Iterations until\nit feels right" },
];

export default function About() {
  return (
    <section id="about" className="section-anchor relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <span className="font-display text-sm uppercase tracking-[0.35em] text-red">
            01 — About
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold uppercase leading-tight tracking-tight md:text-6xl">
            Full-stack engineer with a{" "}
            <span className="text-yellow">designer&apos;s eye</span> — I take
            products from idea to interface to shipped code.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg text-muted">
            I work across the whole stack: web apps, backend systems, mobile
            builds, and the graphic identity that ties them together. That
            means fewer handoffs, faster iteration, and products that look as
            considered as they perform.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3">
          {STATS.map((stat, i) => (
            <Reveal key={stat.value} delay={0.1 * i}>
              <div className="border-t border-white/10 pt-6">
                <div className="font-display text-5xl font-bold text-red">
                  {stat.value}
                </div>
                <p className="mt-3 whitespace-pre-line text-sm uppercase tracking-widest text-muted">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <Marquee items={SKILLS} />
      </div>
    </section>
  );
}
