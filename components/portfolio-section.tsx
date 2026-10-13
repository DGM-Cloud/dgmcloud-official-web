'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/locale-context';

const PROJECT_SLUGS = ['moreCorporation', 'boomTea', 'peludito'] as const;
type ProjectSlug = (typeof PROJECT_SLUGS)[number];

const PROJECT_URL: Record<ProjectSlug, string> = {
  moreCorporation: 'https://morecorporation.pe/',
  boomTea: 'https://boomteaperu.com/wp/',
  peludito: 'https://dgm-cloud.github.io/peludito/dashboard/',
};

/** Capturas en /public/portfolio (WebP, ~1024 px de ancho). */
const PROJECT_IMAGE: Record<ProjectSlug, string> = {
  moreCorporation: '/portfolio/morecorporation.webp',
  boomTea: '/portfolio/boomtea.webp',
  peludito: '/portfolio/peludito.webp',
};

const PROJECT_BADGE: Record<ProjectSlug, string> = {
  moreCorporation: 'portfolio.badgeWeb',
  boomTea: 'portfolio.badgeWeb',
  peludito: 'portfolio.badgeSystem',
};

function PortfolioPreview({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="border-b border-border bg-muted">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 512px"
        />
      </div>
    </div>
  );
}

const arrowClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:border-primary/40 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-40';

export function PortfolioSection() {
  const { t } = useTranslations();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    updateArrows();
    track.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      track.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>('[data-card]');
    if (!track || !card) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reduce ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="portfolio" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-kicker mb-3">{t('portfolio.kicker')}</p>
            <h2 className="section-title">{t('portfolio.title')}</h2>
            <p className="section-lede mt-4">{t('portfolio.subtitle')}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canPrev}
              className={arrowClass}
              aria-label={t('portfolio.prev')}
              aria-controls="portfolio-track"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canNext}
              className={arrowClass}
              aria-label={t('portfolio.next')}
              aria-controls="portfolio-track"
            >
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        <div
          id="portfolio-track"
          ref={trackRef}
          className="-m-1 flex snap-x snap-mandatory scroll-px-1 gap-6 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {PROJECT_SLUGS.map((slug) => (
            <a
              key={slug}
              data-card
              href={PROJECT_URL[slug]}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex shrink-0 basis-full snap-start flex-col overflow-hidden rounded-xl border border-border bg-card outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary md:basis-[calc((100%-1.5rem)/2)]"
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
                  <ArrowUpRight className="size-4" aria-hidden />
                </span>
              </div>
            </a>
          ))}
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
