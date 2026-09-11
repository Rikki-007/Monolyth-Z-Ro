export type Category = "Web" | "Software" | "App" | "Design";

export type Project = {
  comingSoon?: false;
  title: string;
  category: Category;
  description: string;
  year: string;
  liveUrl: string;
  /** Omitted when the repo isn't public yet — the card just skips the "Code" link. */
  githubUrl?: string;
};

export type ComingSoonEntry = {
  comingSoon: true;
  category: Category;
};

export type ProjectEntry = Project | ComingSoonEntry;

export const categoryAccent: Record<Category, string> = {
  Web: "cyan",
  Software: "amber",
  App: "cyan",
  Design: "crimson",
};

// Every entry below maps 1:1 to a real, currently-live GitHub repo under
// github.com/Rikki-007 — verified via `gh repo list` + Pages deployment status.
// Categories with no shipped repo yet get a comingSoon placeholder instead
// of invented project data.
export const projects: ProjectEntry[] = [
  {
    title: "Aspect Plumbing & Heating",
    category: "Web",
    description:
      "Next.js marketing site for a Dublin-area plumbing & heating business.",
    year: "2026",
    liveUrl: "https://rikki-007.github.io/aspect-plumbing-heating/",
    githubUrl: "https://github.com/Rikki-007/aspect-plumbing-heating",
  },
  {
    title: "Electricians 24/7",
    category: "Web",
    description:
      "Static, zero-dependency site for a Dublin 24-hour electrician, built for fast loads on mobile connections.",
    year: "2026",
    liveUrl: "https://rikki-007.github.io/electricians-24-7/",
    githubUrl: "https://github.com/Rikki-007/electricians-24-7",
  },
  {
    title: "F1 Records 007",
    category: "Web",
    description:
      "Tracks every F1 driver's points and season performance from the first 1950 season through the latest race.",
    year: "2026",
    liveUrl: "https://rikki-007.github.io/F1-Records-007/",
    githubUrl: "https://github.com/Rikki-007/F1-Records-007",
  },
  {
    title: "Formula1 Records",
    category: "Web",
    description: "An archive of Formula 1 records, kept up to date with the latest results.",
    year: "2026",
    liveUrl: "https://rikki-007.github.io/Formula1-Records/",
    githubUrl: "https://github.com/Rikki-007/Formula1-Records",
  },
  {
    title: "Void Arcade",
    category: "App",
    description:
      "A scroll-driven, WebGL-backed arcade: six fully playable browser games behind a persistent, cursor- and scroll-reactive Three.js background.",
    year: "2026",
    liveUrl: "https://game-web-two-snowy.vercel.app/",
    githubUrl: "https://github.com/Rikki-007/game-web",
  },
  {
    title: "Meridian",
    category: "Software",
    description:
      "A simulated paper-trading terminal — live order book, portfolio, and trade execution UI over a cursor- and scroll-reactive 3D instrument background.",
    year: "2026",
    liveUrl: "https://my-trading-platform-2.vercel.app/",
  },
  { comingSoon: true, category: "Design" },
];
