import type { CSSProperties } from 'react';

type GarlandProps = {
  className?: string;
  /** "dark": sobre fondos oscuros (cable claro). "light": sobre fondos claros. */
  tone?: 'dark' | 'light';
};

const SPAN = 180;
const SPANS = 10;
const TOP = 4;
const SAG = 30;
const BULB_COLORS = ['#ecd9a8', '#c9a45c', '#fbf7ef', '#d9b574'] as const;

/** Punto de una curva cuadrática, determinista para evitar diferencias de hidratación. */
function curve(x0: number, t: number) {
  const p1x = x0 + SPAN / 2;
  const p1y = TOP + SAG * 2;
  const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * p1x + t ** 2 * (x0 + SPAN);
  const y = (1 - t) ** 2 * TOP + 2 * (1 - t) * t * p1y + t ** 2 * TOP;
  return { x, y };
}

const WIRE = Array.from({ length: SPANS }, (_, i) => {
  const x0 = i * SPAN;
  return `M${x0} ${TOP} Q${x0 + SPAN / 2} ${TOP + SAG * 2} ${x0 + SPAN} ${TOP}`;
}).join(' ');

const BULBS = Array.from({ length: SPANS }, (_, i) =>
  [0.22, 0.5, 0.78].map((t, j) => {
    const { x, y } = curve(i * SPAN, t);
    return {
      x,
      y,
      color: BULB_COLORS[(i * 3 + j) % BULB_COLORS.length],
      delay: ((i * 3 + j) % 7) * 0.45,
    };
  }),
).flat();

/**
 * Guirnalda de luces cálidas. Sutil, decorativa y sin texto: no aporta
 * información, por lo que se oculta a lectores de pantalla.
 */
export function Garland({ className = '', tone = 'dark' }: GarlandProps) {
  const wire = tone === 'dark' ? 'rgba(236,217,168,0.38)' : 'rgba(138,106,36,0.42)';

  return (
    <svg
      viewBox={`0 0 ${SPAN * SPANS} ${TOP + SAG + 22}`}
      preserveAspectRatio="xMidYMin slice"
      className={className}
      aria-hidden
      focusable="false"
    >
      <defs>
        <radialGradient id={`xm-glow-${tone}`}>
          <stop offset="0%" stopColor="#f4e4b4" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c9a45c" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={WIRE} fill="none" stroke={wire} strokeWidth="1.1" strokeLinecap="round" />
      {BULBS.map((bulb) => (
        <g
          key={`${bulb.x}-${bulb.y}`}
          className="xm-twinkle"
          style={{ animationDelay: `${bulb.delay}s` } as CSSProperties}
        >
          <circle cx={bulb.x} cy={bulb.y + 9} r="12" fill={`url(#xm-glow-${tone})`} opacity="0.55" />
          <rect x={bulb.x - 1.6} y={bulb.y - 0.5} width="3.2" height="4" rx="0.8" fill={wire} />
          <path
            d={`M${bulb.x - 3.4} ${bulb.y + 3.4} h6.8 c0 4.6 -1.6 8.2 -3.4 8.2 s-3.4 -3.6 -3.4 -8.2 z`}
            fill={bulb.color}
          />
        </g>
      ))}
    </svg>
  );
}
