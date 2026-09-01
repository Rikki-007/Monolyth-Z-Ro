import type { NextConfig } from "next";

// Served from the custom domain root (www.monolythzro.com) via GitHub Pages,
// so assets must NOT be prefixed with the repo name. (Previously this used
// "/Monolyth-Z-Ro" as a base path for the old github.io/<repo> URL, which
// broke every asset request once a custom domain was added — that's what
// caused the blank white page.)
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
