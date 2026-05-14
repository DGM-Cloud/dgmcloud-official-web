'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { Renderer, Program, Mesh, Color, Triangle } from 'ogl';
import {
  SITE_BRAND_AURORA_HEX,
  SITE_BRAND_RGB,
} from '@/lib/site-brand';

const VERT = /* glsl */ `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ), 
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                            \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                    \
     bool isInBetween = currentColor.position <= factor;    \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                         \
  ColorStop currentColor = colors[index];                   \
  ColorStop nextColor = colors[index + 1];                  \
  float range = nextColor.position - currentColor.position; \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  
  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);
  
  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);
  
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);
  float intensity = 0.6 * height;
  
  float midPoint = 0.20;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);
  
  vec3 auroraColor = intensity * rampColor;
  
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

export interface AuroraProps {
  colorStops?: readonly string[];
  amplitude?: number;
  blend?: number;
  /** Tiempo absoluto opcional (segundos); si no se pasa, usa el reloj del RAF. */
  time?: number;
  speed?: number;
  className?: string;
}

const DEFAULT_STOPS = ['#051428', SITE_BRAND_AURORA_HEX, '#080a18'];

/** Ramp → azul noche → haz marca → casi negro. */
export const LANDING_AURORA_STOPS: readonly string[] = [
  '#061a32',
  SITE_BRAND_AURORA_HEX,
  '#090816',
];

/** Modo claro: cielo azul vibrante — más contraste y profundidad que el fondo blanco. */
export const LIGHT_AURORA_STOPS: readonly string[] = [
  '#6ab4fa',
  SITE_BRAND_AURORA_HEX,
  '#c8e8ff',
];

/** Halo de acento (modo oscuro — sync lib/site-brand). */
const SITE_BRAND_RADIAL = `rgba(${SITE_BRAND_RGB[0]}, ${SITE_BRAND_RGB[1]}, ${SITE_BRAND_RGB[2]}, 0.085)`;
const LIGHT_BRAND_RADIAL = `rgba(${SITE_BRAND_RGB[0]}, ${SITE_BRAND_RGB[1]}, ${SITE_BRAND_RGB[2]}, 0.065)`;

function AuroraInner(props: AuroraProps) {
  const {
    colorStops = DEFAULT_STOPS,
    amplitude = 1.0,
    blend = 0.5,
    className,
  } = props;

  const propsRef = useRef<AuroraProps>(props);
  propsRef.current = props;

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const narrowViewport =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 767px)').matches;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: !narrowViewport,
      powerPreference: narrowViewport ? 'low-power' : 'high-performance',
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.cssText =
      'position:absolute;inset:0;display:block;width:100%;height:100%;background-color:transparent;' +
      'transform:translateZ(0);-webkit-backface-visibility:hidden;backface-visibility:hidden';

    let program: InstanceType<typeof Program> | undefined;

    let lastAppliedW = 0;
    let lastAppliedH = 0;

    /** En móvil la barra de URL cambia altura/visual viewport sin que el contenido cambie realmente → WebGL resize en bucle causa parpadeo. Solo aplicamos tamaño estable. */
    const resize = () => {
      const width = Math.max(1, ctn.offsetWidth);
      const height = Math.max(1, ctn.offsetHeight);

      const wSame = Math.abs(width - lastAppliedW) < 1;
      const hDiff = Math.abs(height - lastAppliedH);
      if (
        lastAppliedW > 0 &&
        wSame &&
        hDiff > 0 &&
        hDiff < 112
      ) {
        return;
      }

      lastAppliedW = width;
      lastAppliedH = height;

      renderer.setSize(width, height);
      if (program) {
        program.uniforms.uResolution.value = [width, height];
      }
    };

    const geometry = new Triangle(gl);
    const geom = geometry as { attributes?: Record<string, unknown> };
    if (geom.attributes?.uv) {
      delete geom.attributes.uv;
    }

    const stopsArr = (propsRef.current.colorStops ?? DEFAULT_STOPS).map((hex) => {
      const c = new Color(hex);
      return [c.r, c.g, c.b];
    });

    program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uAmplitude: { value: propsRef.current.amplitude ?? 1.0 },
        uColorStops: { value: stopsArr },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uBlend: { value: propsRef.current.blend ?? 0.5 },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });
    ctn.appendChild(canvas);

    const ro = new ResizeObserver(resize);
    ro.observe(ctn);
    resize();

    const startedAt = performance.now();

    let animateId = 0;
    const update = () => {
      animateId = requestAnimationFrame(update);
      if (!program) return;

      const p = propsRef.current;
      const speed = p.speed ?? 1;
      const explicitTime = p.time;
      /** Segundos desde el montaje (o tiempo fijado por prop). El shader ya escala uTime ×0.1 / ×0.25. */
      const elapsedSec =
        reducedMotion ? 0 : explicitTime ?? (performance.now() - startedAt) * 0.001;
      program.uniforms.uTime.value = elapsedSec * speed * 0.75;
      program.uniforms.uAmplitude.value = p.amplitude ?? 1.0;
      program.uniforms.uBlend.value = p.blend ?? 0.5;

      const stops = p.colorStops ?? DEFAULT_STOPS;
      program.uniforms.uColorStops.value = stops.map((hex: string) => {
        const c = new Color(hex);
        return [c.r, c.g, c.b];
      });

      renderer.render({ scene: mesh });
    };

    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      ro.disconnect();
      if (ctn.contains(canvas)) {
        ctn.removeChild(canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <div
      ref={ctnDom}
      className={className ?? 'relative h-full min-h-[100dvh] w-full'}
    />
  );
}

/** Aurora para usar solo como fondo full-screen */
export function Aurora(props: AuroraProps) {
  return <AuroraInner {...props} />;
}

/** Misma pila que PlasmaBackground: base + efecto + grano + viñeta — sólo cambia paleta por tema. */
export const AuroraBackground = memo(function AuroraBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  /** Hasta hidratar usar dark (coincide con defaultTheme); evita parpadeo y doble-init WebGL. */
  const isLight = mounted && resolvedTheme === 'light';

  const baseBackground = isLight
    ? `
            radial-gradient(ellipse 160% 65% at 20% 0%, rgba(147,197,253,0.55), transparent 52%),
            radial-gradient(ellipse 130% 60% at 85% 5%, rgba(186,220,255,0.45), transparent 50%),
            radial-gradient(ellipse 100% 55% at 50% 100%, rgba(219,234,254,0.40), transparent 55%),
            radial-gradient(ellipse 80% 45% at 10% 60%, rgba(167,210,255,0.25), transparent 50%),
            linear-gradient(175deg, #dbeafe 0%, #eff6ff 30%, #f5f9ff 60%, #ffffff 100%)
          `
    : `
            radial-gradient(ellipse 110% 60% at 50% -18%, ${SITE_BRAND_RADIAL}, transparent 55%),
            radial-gradient(ellipse 70% 45% at 92% 92%, rgba(193, 21, 106, 0.06), transparent 50%),
            #050505
          `;

  const vignette =
    isLight
      ? 'radial-gradient(ellipse 100% 85% at 50% 45%, transparent 0%, transparent 50%, rgba(200,220,245,0.12) 80%, rgba(240,248,255,0.70) 100%)'
      : 'radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, transparent 36%, rgba(4,14,18,0.45) 74%, rgba(0,0,0,0.84) 100%)';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 min-h-[100lvh] w-full isolate"
      style={{ WebkitTransform: 'translateZ(0)' }}
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: baseBackground }} />

      {!isLight && (
        <div className="absolute inset-0 min-h-[100lvh]">
          <AuroraInner
            colorStops={LANDING_AURORA_STOPS}
            blend={0.52}
            amplitude={0.92}
            speed={2.4}
            className="absolute inset-0 h-full min-h-[100lvh] w-full"
          />
        </div>
      )}

      <div
        className={`absolute inset-0 ${isLight ? 'opacity-[0.028]' : 'opacity-[0.035]'}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />

      <div className="absolute inset-0 z-[1]" style={{ background: vignette }} />
    </div>
  );
});

export default Aurora;
