'use client';

import { useEffect, useRef } from 'react';

type SnowFieldProps = {
  className?: string;
  /** Copos por cada 10.000 px² de superficie. */
  density?: number;
  /** Canal RGB del copo, p. ej. "255,255,255". */
  color?: string;
  maxParticles?: number;
};

type Flake = {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
  sway: number;
  alpha: number;
};

/**
 * Nevada ligera en canvas. Se detiene fuera de pantalla y con la pestaña oculta,
 * y se reduce a un cuadro estático si el usuario prefiere menos movimiento.
 */
export function SnowField({
  className = 'xm-snow-layer',
  density = 0.9,
  color = '255,255,255',
  maxParticles = 90,
}: SnowFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let frame = 0;
    let running = false;
    let visible = true;
    let last = 0;

    const seed = (spread: boolean): Flake => {
      const depth = Math.random();
      return {
        x: Math.random() * width,
        y: spread ? Math.random() * height : -10,
        r: 0.7 + depth * 2.1,
        speed: 14 + depth * 34,
        phase: Math.random() * Math.PI * 2,
        sway: 6 + Math.random() * 16,
        alpha: 0.28 + depth * 0.55,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const f of flakes) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color},${f.alpha})`;
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(maxParticles, Math.round((width * height * density) / 10000));
      flakes = Array.from({ length: count }, () => seed(true));
      draw();
    };

    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      for (const f of flakes) {
        f.y += f.speed * dt;
        f.phase += dt * 0.8;
        f.x += Math.sin(f.phase) * f.sway * dt;
        if (f.y > height + 10) Object.assign(f, seed(false));
        if (f.x < -10) f.x = width + 10;
        if (f.x > width + 10) f.x = -10;
      }
      draw();
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [color, density, maxParticles]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
