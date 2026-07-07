type IconProps = { size?: number; className?: string };

export function EagleMark({ size = 28, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 136 110"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* body/tail rendered as a "Z" so the letterform doubles as the bird's silhouette */}
      <path
        d="M55 50 L110 50 L55 100 L110 100"
        stroke="currentColor"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* head + beak */}
      <path d="M110 50 L128 36 L114 58 Z" fill="currentColor" />
      {/* wing, fanned from the shoulder */}
      <path
        d="M55 50 Q26 16 4 22"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M58 58 Q30 36 8 44"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <path
        d="M61 66 Q36 56 16 64"
        stroke="currentColor"
        strokeWidth={4}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function StencilO({ size = 14, className = "" }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14.7 4.5 A8 8 0 0 1 14.7 19.5"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
      <path
        d="M9.3 19.5 A8 8 0 0 1 9.3 4.5"
        stroke="currentColor"
        strokeWidth={2.6}
        strokeLinecap="round"
      />
    </svg>
  );
}

type WordmarkProps = {
  className?: string;
  iconSize?: number;
  textClassName?: string;
};

export function Wordmark({
  className = "",
  iconSize = 26,
  textClassName = "text-xl",
}: WordmarkProps) {
  const oSize = Math.round(iconSize * 0.42);

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span
        className={`font-sans font-bold uppercase leading-none tracking-tighter text-paper ${textClassName}`}
      >
        MONOLYTH{" "}
        <span className="text-cyan">
          Z-R
          <StencilO
            size={oSize}
            className="relative -top-[0.05em] mx-[1px] inline-block align-middle"
          />
        </span>
      </span>
      <span
        aria-hidden="true"
        className="h-[1em] w-px shrink-0 self-stretch bg-fog/40"
      />
      <EagleMark size={iconSize} className="shrink-0 text-cyan" />
    </span>
  );
}
