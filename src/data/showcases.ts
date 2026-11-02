// Build tiers, by what a build is allowed to ship (see the agency template
// registry): T1 is static + CSS motion, T2 adds a scroll-story stack
// (Lenis/GSAP/Framer Motion), T3 adds WebGL.
export const tiers = {
  T1: "T1 Editorial",
  T2: "T2 Scroll Story",
  T3: "T3 Flagship 3D",
} as const;
export type Tier = keyof typeof tiers;

export type Showcase = {
  id: string;
  title: string;
  /** Assigned from the build's actual dependencies, not its look. */
  tier: Tier;
  tagline: string;
  description: string;
  stack: string[];
  /** The shipped build this style was proven on. */
  project?: string;
  /** Live deployment. Entries without one are unfinished and are never
   * rendered — the grid only shows shipped work. Never point this at a
   * placeholder or dead URL. */
  liveUrl?: string;
  githubUrl?: string;
};

// Seven interaction languages, each shipped as its own live, standalone
// build under this same studio. `stack` lists only what each build really
// uses (checked against its repo), never aspirational tech.
export const showcases: Showcase[] = [
  {
    id: "neumorphism",
    tier: "T1",
    project: "AuraFit",
    liveUrl: "https://rikki-007.github.io/aurafit-neumorphism-showcase/",
    githubUrl: "https://github.com/Rikki-007/aurafit-neumorphism-showcase",
    title: "Neumorphism",
    tagline: "Soft extrusion, tactile depth",
    description:
      "Interfaces that read as physical, not printed — dual-shadow surfaces that push and pull light from a single source, so every button looks pressable before it's touched. Best for calm, single-purpose tools: settings panels, controllers, dashboards that should feel quiet.",
    stack: ["HTML/CSS", "CSS Custom Props", "Vanilla JS"],
  },
  {
    id: "glassmorphism",
    tier: "T1",
    project: "NeroCloud",
    liveUrl: "https://rikki-007.github.io/nerocloud-glassmorphism-showcase/",
    githubUrl: "https://github.com/Rikki-007/nerocloud-glassmorphism-showcase",
    title: "Glassmorphism",
    tagline: "Frosted depth, layered light",
    description:
      "Translucent panels over a moving, colorful backdrop — the same language this studio already builds in daily. Layered blur and thin light borders give hierarchy without hard edges, ideal for dashboards and product UI that need to feel premium without feeling heavy.",
    stack: ["Tailwind CSS", "backdrop-filter", "Canvas 2D"],
  },
  {
    id: "minimalism",
    tier: "T1",
    project: "Atelier Noir",
    liveUrl: "https://rikki-007.github.io/ateliernoir-minimalism-showcase/",
    githubUrl: "https://github.com/Rikki-007/ateliernoir-minimalism-showcase",
    title: "Minimalism",
    tagline: "Restraint as the whole argument",
    description:
      "One typeface, one accent, and enough negative space that every remaining mark has to earn its place. Built for editorial sites, portfolios, and product pages where the content — not the chrome — is the entire pitch.",
    stack: ["HTML/CSS", "Vanilla JS", "Variable Fonts"],
  },
  {
    id: "maximalism",
    tier: "T2",
    project: "SONICWAVE",
    liveUrl: "https://rikki-007.github.io/sonicwave-maximalism-showcase/",
    githubUrl: "https://github.com/Rikki-007/sonicwave-maximalism-showcase",
    title: "Maximalism",
    tagline: "Deliberate, layered excess",
    description:
      "Clashing color, overlapping type, and pattern stacked on pattern — chaotic only until you notice everything is on a grid. Built for brands, drops, and campaigns that need to feel loud, current, and impossible to scroll past.",
    stack: ["GSAP ScrollTrigger", "Vanilla JS", "HTML/CSS"],
  },
  {
    id: "neo-brutalism",
    tier: "T1",
    project: "HackerByte",
    liveUrl: "https://rikki-007.github.io/hackerbyte-brutalism-showcase/",
    githubUrl: "https://github.com/Rikki-007/hackerbyte-brutalism-showcase",
    title: "Neo-Brutalism",
    tagline: "Raw structure, zero apology",
    description:
      "Hard edges, stacked monospace type, and shadows with no blur — structure exposed instead of styled over. Best for developer tools, manifestos, and portfolios that want to read as unmistakably handmade and confident.",
    stack: ["React", "Vite", "Tailwind CSS"],
  },
  {
    id: "liquid-glass",
    tier: "T1",
    project: "PrismOS",
    liveUrl: "https://rikki-007.github.io/prismos-liquidglass-showcase/",
    githubUrl: "https://github.com/Rikki-007/prismos-liquidglass-showcase",
    title: "Liquid Glass",
    tagline: "Fluid refraction, specular motion",
    description:
      "A living surface — blurred glass that bends light and reshapes itself around content, closer to a material than a panel. Built for flagship product launches and app showcases that want to feel a full generation ahead.",
    stack: ["React", "SVG Filters", "backdrop-filter"],
  },
  {
    id: "spatial-ui",
    tier: "T1",
    project: "AetherSpace",
    liveUrl: "https://rikki-007.github.io/aetherspace-spatialui-showcase/",
    githubUrl: "https://github.com/Rikki-007/aetherspace-spatialui-showcase",
    title: "Spatial UI",
    tagline: "Depth you can reach into",
    description:
      "Panels held at real depth instead of stacked in z-index — parallax and perspective doing the work flat layout can't. Built for showcase sites and spatial-computing-adjacent products where depth is the actual feature.",
    stack: ["HTML/CSS", "CSS 3D Transforms", "Vanilla JS"],
  },
];
