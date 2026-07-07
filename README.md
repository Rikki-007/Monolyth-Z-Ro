# Portfolio

Personal portfolio for Priyanshu Malik — software, web and app engineering, and graphic design.

**Live site:** https://Rikki-007.github.io/Monolyth-Z-Ro/

Built with Next.js (static export), Tailwind CSS, and Framer Motion.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

- Projects: [`src/data/projects.ts`](src/data/projects.ts)
- Contact / social links: [`src/components/Contact.tsx`](src/components/Contact.tsx)

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds a static export (`next build` with `output: "export"`) and publishes it to GitHub Pages automatically.
