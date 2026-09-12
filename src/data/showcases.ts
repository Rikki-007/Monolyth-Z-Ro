export type Showcase = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  /** Set once each showcase ships its own deployment — the card renders a
   * "Visit Showcase" link when present, and an honest "In Development"
   * state when it isn't. Never point this at a placeholder/dead URL. */
  liveUrl?: string;
  githubUrl?: string;
};

// Seven interaction languages, each meant to eventually ship as its own
// live, standalone build under this same studio. Cards render fully
// designed regardless of `liveUrl` — the link just activates once a given
// showcase is actually deployed.
export const showcases: Showcase[] = [
  {
    id: "neumorphism",
    title: "Neumorphism",
    tagline: "Soft extrusion, tactile depth",
    description:
      "Interfaces that read as physical, not printed — dual-shadow surfaces that push and pull light from a single source, so every button looks pressable before it's touched. Best for calm, single-purpose tools: settings panels, controllers, dashboards that should feel quiet.",
    stack: ["Tailwind CSS", "CSS Custom Props", "Framer Motion"],
  },
  {
    id: "glassmorphism",
    title: "Glassmorphism",
    tagline: "Frosted depth, layered light",
    description:
      "Translucent panels over a moving, colorful backdrop — the same language this studio already builds in daily. Layered blur and thin light borders give hierarchy without hard edges, ideal for dashboards and product UI that need to feel premium without feeling heavy.",
    stack: ["Tailwind CSS", "backdrop-filter", "Framer Motion"],
  },
  {
    id: "minimalism",
    title: "Minimalism",
    tagline: "Restraint as the whole argument",
    description:
      "One typeface, one accent, and enough negative space that every remaining mark has to earn its place. Built for editorial sites, portfolios, and product pages where the content — not the chrome — is the entire pitch.",
    stack: ["Next.js", "Tailwind CSS", "Variable Fonts"],
  },
  {
    id: "maximalism",
    title: "Maximalism",
    tagline: "Deliberate, layered excess",
    description:
      "Clashing color, overlapping type, and pattern stacked on pattern — chaotic only until you notice everything is on a grid. Built for brands, drops, and campaigns that need to feel loud, current, and impossible to scroll past.",
    stack: ["Tailwind CSS", "GSAP", "SVG Filters"],
  },
  {
    id: "neo-brutalism",
    title: "Neo-Brutalism",
    tagline: "Raw structure, zero apology",
    description:
      "Hard edges, stacked monospace type, and shadows with no blur — structure exposed instead of styled over. Best for developer tools, manifestos, and portfolios that want to read as unmistakably handmade and confident.",
    stack: ["HTML/CSS", "JetBrains Mono", "Vanilla JS"],
  },
  {
    id: "liquid-glass",
    title: "Liquid Glass",
    tagline: "Fluid refraction, specular motion",
    description:
      "A living surface — blurred glass that bends light and reshapes itself around content, closer to a material than a panel. Built for flagship product launches and app showcases that want to feel a full generation ahead.",
    stack: ["Three.js", "GLSL Shaders", "Framer Motion"],
  },
  {
    id: "spatial-ui",
    title: "Spatial UI",
    tagline: "Depth you can reach into",
    description:
      "Panels held at real depth instead of stacked in z-index — parallax and perspective doing the work flat layout can't. Built for showcase sites and spatial-computing-adjacent products where depth is the actual feature.",
    stack: ["React Three Fiber", "WebGL", "Framer Motion"],
  },
];
