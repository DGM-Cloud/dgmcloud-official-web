'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useTranslations } from '@/lib/i18n/locale-context';

const PROJECT_SLUGS = ['moreCorporation', 'boomTea', 'peludito', 'chelero', 'fiadito', 'maja'] as const;
type ProjectSlug = (typeof PROJECT_SLUGS)[number];

const PROJECT_URL: Record<ProjectSlug, string> = {
  moreCorporation: 'https://morecorporation.pe/',
  boomTea: 'https://boomteaperu.com/wp/',
  peludito: 'https://dgm-cloud.github.io/peludito/dashboard/',
  chelero: 'https://dgm-cloud.github.io/chelero/',
  fiadito: 'https://dgm-cloud.github.io/fiadito/',
  maja: 'https://diegohlz.github.io/maja-calzados/',
};

/** Capturas en /public/portfolio (WebP, ~1024 px de ancho). */
const PROJECT_IMAGE: Record<ProjectSlug, string> = {
  moreCorporation: '/portfolio/morecorporation.webp',
  boomTea: '/portfolio/boomtea.webp',
  peludito: '/portfolio/peludito.webp',
  chelero: '/portfolio/chelero.webp',
  fiadito: '/portfolio/fiadito.webp',
  maja: '/portfolio/maja.webp',
};

const PROJECT_BADGE: Record<ProjectSlug, string> = {
  moreCorporation: 'portfolio.badgeWeb',
  boomTea: 'portfolio.badgeWeb',
  peludito: 'portfolio.badgeSystem',
  chelero: 'portfolio.badgeSystem',
  fiadito: 'portfolio.badgeSystem',
  maja: 'portfolio.badgeWeb',
};

const AUTOPLAY_MS = 5000;

/**
 * El bucle infinito necesita al menos 5 posiciones (centro, dos laterales y
 * dos ocultas) para que la tarjeta que da la vuelta cruce siempre invisible.
 */
const SLIDES: ProjectSlug[] = (() => {
  const slides: ProjectSlug[] = [...PROJECT_SLUGS];
  while (slides.length < 5) slides.push(...PROJECT_SLUGS);
  return slides;
})();

/** Distancia circular más corta de `index` a `active`, en el rango (-n/2, n/2]. */
function circularOffset(index: number, active: number, total: number) {
  const raw = (((index - active) % total) + total) % total;
  return raw > total / 2 ? raw - total : raw;
}

function slideStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset);
  const visible = distance <= 1;
  return {
    transform: `translateX(calc(${offset} * var(--slide-shift))) scale(${distance === 0 ? 1 : visible ? 0.86 : 0.72})`,
    opacity: distance === 0 ? 1 : visible ? 0.45 : 0,
    filter: distance === 0 ? 'none' : `blur(${visible ? 2 : 6}px) saturate(0.7)`,
    zIndex: 10 - distance,
  };
}

function PortfolioPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="border-b border-border bg-muted">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 85vw, 512px"
        />
      </div>
    </div>
  );
}

const arrowClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';

export function PortfolioSection() {
  const { t } = useTranslations();
  const reduceMotion = useReducedMotion();
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);

  const total = SLIDES.length;
  const go = useCallback(
    (next: number) => setActive(((next % total) + total) % total),
    [total],
  );

  useEffect(() => {
    const node = carouselRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const autoplay = !reduceMotion;
  const paused = hovered || focused || !inView;
  const activeSlug = SLIDES[active];

  const goToProject = (projectIndex: number) => {
    const current = active % PROJECT_SLUGS.length;
    let delta = projectIndex - current;
    if (delta > PROJECT_SLUGS.length / 2) delta -= PROJECT_SLUGS.length;
    if (delta < -PROJECT_SLUGS.length / 2) delta += PROJECT_SLUGS.length;
    go(active + delta);
  };

  return (
    <section
      id="portfolio"
      className="scroll-mt-24 overflow-hidden border-b border-border py-20 md:py-28"
      aria-roledescription="carousel"
    >
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker mb-3">{t('portfolio.kicker')}</p>
            <h2 className="section-title">{t('portfolio.title')}</h2>
            <p className="section-lede mt-4">{t('portfolio.subtitle')}</p>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => go(active - 1)}
              className={arrowClass}
              aria-label={t('portfolio.prev')}
              aria-controls="portfolio-track"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(active + 1)}
              className={arrowClass}
              aria-label={t('portfolio.next')}
              aria-controls="portfolio-track"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="[mask-image:linear-gradient(to_right,transparent,black_3%,black_97%,transparent)] md:[mask-image:linear-gradient(to_right,transparent,black_14%,black_86%,transparent)]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
        }}
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) > 40) go(active + (dx < 0 ? 1 : -1));
        }}
      >
        <div className="section-shell">
          <div
            id="portfolio-track"
            aria-live={autoplay && !paused ? 'off' : 'polite'}
            className="grid [--slide-shift:88%] [--slide-width:84%] md:[--slide-shift:80%] md:[--slide-width:calc((100%_-_1.5rem)/2)]"
          >
            {SLIDES.map((slug, index) => {
              const offset = circularOffset(index, active, total);
              const isActive = offset === 0;
              const isSide = Math.abs(offset) === 1;
              return (
                <a
                  key={`${slug}-${index}`}
                  href={PROJECT_URL[slug]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={(e) => {
                    if (isActive) return;
                    e.preventDefault();
                    go(index);
                  }}
                  style={slideStyle(offset)}
                  className={`group flex w-[var(--slide-width)] flex-col justify-self-center overflow-hidden rounded-xl border border-border bg-card outline-none [grid-area:1/1] focus-visible:ring-2 focus-visible:ring-primary motion-safe:transition-[transform,opacity,filter,box-shadow] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isActive
                      ? 'hover:shadow-[0_18px_40px_-18px_rgba(15,23,42,0.35)]'
                      : isSide
                        ? 'cursor-pointer'
                        : 'pointer-events-none'
                  }`}
                >
                  <PortfolioPreview
                    src={PROJECT_IMAGE[slug]}
                    alt={t(`portfolio.projects.${slug}.title`)}
                  />
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="inline-flex w-fit rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-primary">
                      {t(PROJECT_BADGE[slug])}
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">
                      {t(`portfolio.projects.${slug}.title`)}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {t(`portfolio.projects.${slug}.description`)}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary">
                      {t('portfolio.visitSite')}
                      <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="section-shell">
        <div className="mt-8 flex items-center justify-center gap-2" role="group" aria-label={t('portfolio.kicker')}>
          {PROJECT_SLUGS.map((slug, projectIndex) => {
            const current = slug === activeSlug;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => goToProject(projectIndex)}
                aria-label={t(`portfolio.projects.${slug}.title`)}
                aria-current={current ? 'true' : undefined}
                className={`relative h-1.5 overflow-hidden rounded-full bg-border transition-[width] duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  current ? 'w-10' : 'w-4 hover:bg-muted-foreground/40'
                }`}
              >
                {current && autoplay ? (
                  <span
                    key={active}
                    aria-hidden
                    onAnimationEnd={() => go(active + 1)}
                    className="absolute inset-0 origin-left rounded-full bg-primary"
                    style={{
                      animation: `carousel-progress ${AUTOPLAY_MS}ms linear forwards`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                ) : current ? (
                  <span aria-hidden className="absolute inset-0 rounded-full bg-primary" />
                ) : null}
              </button>
            );
          })}
        </div>

        <p className="mt-10 flex flex-col items-start gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-3">
          <span>{t('portfolio.footnote')}</span>
          <a href="#contact" className="font-semibold text-primary hover:underline">
            {t('portfolio.footnoteCta')}
          </a>
        </p>
      </div>
    </section>
  );
}
