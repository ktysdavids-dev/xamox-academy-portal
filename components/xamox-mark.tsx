/** Marca X — cian · magenta · núcleo luminoso · punta dorada (Xamox Academy) */

export function XamoxMark({
  className = "",
  size = 44,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="xa-stroke-cyan" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#5EE9FF" />
          <stop offset="1" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id="xa-stroke-magenta" x1="1" y1="0" x2="0" y2="1">
          <stop stopColor="#FB7185" />
          <stop offset="1" stopColor="#BE185D" />
        </linearGradient>
        <radialGradient id="xa-core-glow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.45" stopColor="#2DD4FF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#D6336C" stopOpacity="0.25" />
        </radialGradient>
        <filter id="xa-soft-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Brazo \ — cian */}
      <path
        d="M14 14 L50 50"
        stroke="url(#xa-stroke-cyan)"
        strokeWidth="11"
        strokeLinecap="square"
        filter="url(#xa-soft-glow)"
      />
      {/* Brazo / — magenta */}
      <path
        d="M50 14 L14 50"
        stroke="url(#xa-stroke-magenta)"
        strokeWidth="11"
        strokeLinecap="square"
        filter="url(#xa-soft-glow)"
      />

      {/* Punta dorada (subida / flecha) */}
      <path
        d="M49 11 L56 8 L53 17 Z"
        fill="#F4C430"
        stroke="#D4AF37"
        strokeWidth={0.4}
      />

      {/* Núcleo red — red digital */}
      <circle cx="32" cy="32" r="8" fill="url(#xa-core-glow)" />
      <circle
        cx="32"
        cy="32"
        r="10"
        stroke="rgba(212,175,55,0.45)"
        strokeWidth={0.75}
        fill="none"
      />
    </svg>
  );
}
