export type Project = {
  title: string;
  category: "Web" | "Software" | "App" | "Design";
  description: string;
  year: string;
  href: string;
};

// Edit this list freely — swap placeholders for your real work.
export const projects: Project[] = [
  {
    title: "Aspect Plumbing",
    category: "Web",
    description: "Next.js marketing site for a Dublin-area plumbing business.",
    year: "2026",
    href: "#",
  },
  {
    title: "Electricians 24/7",
    category: "Web",
    description: "Static site for a Dublin 24-hour electrician, built for speed.",
    year: "2026",
    href: "#",
  },
  {
    title: "// EDIT ME — App project",
    category: "App",
    description: "Swap in a mobile app you've shipped or prototyped.",
    year: "2026",
    href: "#",
  },
  {
    title: "// EDIT ME — Software project",
    category: "Software",
    description: "Swap in a tool, CLI, or backend system you've built.",
    year: "2026",
    href: "#",
  },
  {
    title: "// EDIT ME — Design project",
    category: "Design",
    description: "Swap in a brand, poster, or graphic identity project.",
    year: "2026",
    href: "#",
  },
];
