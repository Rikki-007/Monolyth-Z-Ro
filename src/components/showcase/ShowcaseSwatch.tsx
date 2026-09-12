/**
 * A small, self-contained CSS preview of each design style — enough to
 * sell the aesthetic on the card without needing the real showcase build
 * (or any image asset) to exist yet. Deliberately breaks from the site's
 * own dark palette per-swatch: each one gets its own authentic micro-world
 * instead of being forced into the studio's obsidian/cyan system, since
 * half of these styles (minimalism, neumorphism, brutalism) simply don't
 * read as themselves on a dark ground.
 */
export default function ShowcaseSwatch({ id }: { id: string }) {
  switch (id) {
    case "neumorphism":
      return (
        <div className="swatch-neu relative flex h-full w-full items-center justify-center gap-6">
          <div className="neu-surface flex h-16 w-16 items-center justify-center rounded-2xl">
            <div className="neu-surface-inset h-6 w-6 rounded-full" />
          </div>
          <div className="neu-surface-inset flex h-8 w-20 items-center rounded-full p-1">
            <div className="neu-surface h-6 w-6 rounded-full" />
          </div>
        </div>
      );

    case "glassmorphism":
      return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_30%,#00f3ff33,transparent_55%),radial-gradient(circle_at_70%_70%,#8b5cf655,transparent_55%),linear-gradient(135deg,#0a0a12,#1b1230)]">
          <div className="glass absolute h-24 w-32 -translate-x-6 -translate-y-3 -rotate-6 rounded-2xl" />
          <div className="glass-premium relative h-20 w-28 translate-x-4 translate-y-4 rotate-3 rounded-2xl" />
        </div>
      );

    case "minimalism":
      return (
        <div className="relative flex h-full w-full flex-col justify-between bg-[#f5f4f1] p-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-black/50">
            No.01
          </span>
          <div className="flex items-end gap-3">
            <div className="h-2 w-2 bg-black" />
            <div className="h-px flex-1 bg-black/70" />
          </div>
        </div>
      );

    case "maximalism":
      return (
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#0d0714]">
          <div className="absolute -left-6 -top-6 h-28 w-28 rotate-12 rounded-[2rem] bg-gradient-to-br from-crimson to-amber opacity-90 mix-blend-screen" />
          <div className="absolute -bottom-8 -right-4 h-28 w-28 -rotate-12 rounded-full bg-gradient-to-br from-cyan to-violet opacity-80 mix-blend-screen" />
          <div className="absolute h-20 w-20 rotate-45 bg-amber/70 mix-blend-screen" />
          <span className="font-display relative rotate-3 text-4xl tracking-wide text-paper text-glow-violet">
            MORE
          </span>
        </div>
      );

    case "neo-brutalism":
      return (
        <div className="swatch-brutal relative flex h-full w-full flex-col justify-between p-5">
          <div className="brutal-block flex w-fit items-center border-2 border-black bg-[#ff3b30] px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-black">
            Raw.
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 border-2 border-black bg-black" />
            <div className="h-2 flex-1 border-y-2 border-black" />
            <div className="h-3 w-3 border-2 border-black bg-[#ffd400]" />
          </div>
        </div>
      );

    case "liquid-glass":
      return (
        <div className="swatch-liquid relative flex h-full w-full items-center justify-center overflow-hidden">
          <div className="liquid-blob relative h-28 w-36">
            <div className="absolute left-3 top-2 h-6 w-16 -rotate-12 rounded-full bg-white/40 blur-[2px]" />
          </div>
        </div>
      );

    case "spatial-ui":
      return (
        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#0a0a0d,#16161d)]"
        >
          {/* Three panels fanned by size/blur/shadow instead of a true 3D
              transform — at this small a scale, an actual perspective/
              translateZ rig reads as barely-there; an exaggerated depth
              fan (far = small, dim, soft; near = big, sharp, heavy shadow)
              sells "layered space" far more legibly. */}
          <div className="absolute h-12 w-20 -translate-x-9 -translate-y-7 rotate-[-10deg] rounded-xl border border-white/5 bg-white/[0.03] blur-[0.5px]" />
          <div className="absolute h-14 w-24 translate-x-1 -translate-y-1 rotate-[5deg] rounded-xl border border-white/10 bg-white/[0.05] shadow-lg shadow-black/40" />
          <div className="glass-premium relative h-20 w-28 translate-x-8 translate-y-6 -rotate-3 rounded-xl border border-cyan/20 shadow-2xl shadow-black/60" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 opacity-50 [background:repeating-linear-gradient(100deg,rgba(0,243,255,0.3)_0,rgba(0,243,255,0.3)_1px,transparent_1px,transparent_16px)] [mask-image:linear-gradient(to_top,black,transparent)]"
          />
        </div>
      );

    default:
      return null;
  }
}
