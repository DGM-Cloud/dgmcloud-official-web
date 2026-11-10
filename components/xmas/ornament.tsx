import type { CSSProperties } from 'react';

type OrnamentProps = {
  className?: string;
  /** Largo del hilo, en px del viewBox. */
  thread?: number;
  /** Tamaño del adorno (diámetro) en px del viewBox. */
  size?: number;
  tone?: 'gold' | 'night' | 'pine' | 'cream';
  style?: CSSProperties;
};

const TONES = {
  gold: { from: '#f1dfaa', to: '#b88f3e', ring: '#8a6a24' },
  night: { from: '#2a5088', to: '#071b38', ring: '#ecd9a8' },
  pine: { from: '#2f7a62', to: '#0a2a24', ring: '#ecd9a8' },
  cream: { from: '#ffffff', to: '#e2d4b4', ring: '#b88f3e' },
} as const;

/** Esfera navideña de línea limpia, colgada de un hilo fino. Decorativa. */
export function Ornament({ className = '', thread = 60, size = 44, tone = 'gold', style }: OrnamentProps) {
  const c = TONES[tone];
  const id = `xm-orn-${tone}`;
  const cx = size / 2;
  const capH = 7;
  const bodyY = thread + capH + size / 2;
  const height = thread + capH + size + 4;

  return (
    <svg
      viewBox={`0 0 ${size} ${height}`}
      width={size}
      height={height}
      className={className}
      style={{ transformOrigin: `50% 0`, ...style }}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor={c.from} />
          <stop offset="100%" stopColor={c.to} />
        </radialGradient>
      </defs>
      <line x1={cx} y1="0" x2={cx} y2={thread} stroke={c.ring} strokeOpacity="0.55" strokeWidth="1" />
      <rect x={cx - 5} y={thread} width="10" height={capH} rx="1.6" fill={c.ring} />
      <circle cx={cx} cy={bodyY} r={size / 2 - 1} fill={`url(#${id})`} />
      <circle cx={cx} cy={bodyY} r={size / 2 - 1} fill="none" stroke={c.ring} strokeOpacity="0.5" strokeWidth="0.8" />
      <path
        d={`M${cx - size * 0.28} ${bodyY - size * 0.08} a${size * 0.3} ${size * 0.3} 0 0 1 ${size * 0.2} -${size * 0.2}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
