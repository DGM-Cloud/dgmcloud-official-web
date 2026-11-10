type ChristmasTreeProps = {
  className?: string;
};

type Tier = { apexY: number; baseY: number; halfWidth: number };

const TIERS: Tier[] = [
  { apexY: 78, baseY: 196, halfWidth: 78 },
  { apexY: 138, baseY: 306, halfWidth: 114 },
  { apexY: 214, baseY: 428, halfWidth: 150 },
];

/** Posiciones [tier, avance vertical 0-1, desplazamiento horizontal -1..1, color]. */
const LIGHTS: ReadonlyArray<readonly [number, number, number, string]> = [
  [0, 0.42, -0.2, '#ecd9a8'],
  [0, 0.72, 0.38, '#fbf7ef'],
  [0, 0.9, -0.55, '#c9a45c'],
  [1, 0.3, 0.1, '#fbf7ef'],
  [1, 0.5, -0.45, '#ecd9a8'],
  [1, 0.62, 0.52, '#c9a45c'],
  [1, 0.86, -0.1, '#e0a3ad'],
  [2, 0.24, -0.15, '#ecd9a8'],
  [2, 0.42, 0.45, '#fbf7ef'],
  [2, 0.5, -0.55, '#c9a45c'],
  [2, 0.7, 0.1, '#e0a3ad'],
  [2, 0.8, 0.62, '#ecd9a8'],
  [2, 0.9, -0.3, '#fbf7ef'],
];

function lightPosition(tier: Tier, v: number, h: number) {
  const y = tier.apexY + (tier.baseY - tier.apexY) * v;
  const spread = tier.halfWidth * v * 0.86;
  return { x: 200 + spread * h, y };
}

/**
 * Árbol de línea fina en oro, pensado como pieza focal sobria. Decorativo.
 */
export function ChristmasTree({ className = '' }: ChristmasTreeProps) {
  return (
    <svg viewBox="0 0 400 520" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id="xm-tree-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4e4b4" />
          <stop offset="100%" stopColor="#b88f3e" />
        </linearGradient>
        <linearGradient id="xm-tree-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#17503f" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0e3a30" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="xm-tree-halo" cx="50%" cy="30%" r="52%">
          <stop offset="0%" stopColor="#c9a45c" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#c9a45c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="xm-tree-light">
          <stop offset="0%" stopColor="#fff6d6" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#c9a45c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="400" height="520" fill="url(#xm-tree-halo)" />

      {/* Tronco */}
      <rect x="187" y="428" width="26" height="46" rx="2" fill="none" stroke="url(#xm-tree-stroke)" strokeWidth="1.2" />

      {/* Niveles */}
      {TIERS.map((tier, i) => {
        const left = 200 - tier.halfWidth;
        const right = 200 + tier.halfWidth;
        const sag = 22 + i * 4;
        return (
          <g key={tier.apexY}>
            <path
              d={`M200 ${tier.apexY} L${left} ${tier.baseY} Q200 ${tier.baseY + sag} ${right} ${tier.baseY} Z`}
              fill="url(#xm-tree-fill)"
              stroke="url(#xm-tree-stroke)"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
            <path
              d={`M${200 - tier.halfWidth * 0.62} ${tier.apexY + (tier.baseY - tier.apexY) * 0.62} Q200 ${
                tier.apexY + (tier.baseY - tier.apexY) * 0.62 + sag * 0.9
              } ${200 + tier.halfWidth * 0.62} ${tier.apexY + (tier.baseY - tier.apexY) * 0.62}`}
              fill="none"
              stroke="#ecd9a8"
              strokeOpacity="0.4"
              strokeWidth="0.9"
              strokeDasharray="2 5"
              strokeLinecap="round"
            />
          </g>
        );
      })}

      {/* Luces */}
      {LIGHTS.map(([tierIndex, v, h, color], i) => {
        const { x, y } = lightPosition(TIERS[tierIndex], v, h);
        return (
          <g key={`${tierIndex}-${v}-${h}`} className="xm-twinkle" style={{ animationDelay: `${(i % 6) * 0.55}s` }}>
            <circle cx={x} cy={y} r="11" fill="url(#xm-tree-light)" opacity="0.55" />
            <circle cx={x} cy={y} r="3.2" fill={color} />
          </g>
        );
      })}

      {/* Estrella */}
      <g className="xm-twinkle" style={{ animationDuration: '4.6s' }}>
        <circle cx="200" cy="50" r="30" fill="url(#xm-tree-light)" opacity="0.7" />
        <path
          d="M200 22 L206 44 L228 50 L206 56 L200 78 L194 56 L172 50 L194 44 Z"
          fill="#f4e4b4"
          stroke="#c9a45c"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
