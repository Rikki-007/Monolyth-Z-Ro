export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 font-display text-xs uppercase tracking-widest text-muted md:flex-row">
        <span>© {new Date().getFullYear()} Priyanshu Malik</span>
        <a href="#top" className="transition-colors hover:text-paper">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
