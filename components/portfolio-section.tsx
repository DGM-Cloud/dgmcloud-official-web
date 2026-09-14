'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/locale-context';

const PROJECT_SLUGS = ['moreCorporation', 'boomTea'] as const;
type ProjectSlug = (typeof PROJECT_SLUGS)[number];

const PROJECT_URL: Record<ProjectSlug, string> = {
  moreCorporation: 'https://morecorporation.pe/',
  boomTea: 'https://boomteaperu.com/wp/',
};

function mshotsThumbnailUrl(siteUrl: string, width = 720) {
  return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(siteUrl)}?w=${width}`;
}

function PortfolioPreview({ siteUrl, alt }: { siteUrl: string; alt: string }) {
  const { t } = useTranslations();
  const hostname = useMemo(() => {
    try {
      return new URL(siteUrl).hostname;
    } catch {
      return siteUrl;
    }
  }, [siteUrl]);

  const thumbSrc = useMemo(() => mshotsThumbnailUrl(siteUrl), [siteUrl]);
  const [broken, setBroken] = useState(false);

  return (
    <div className="border-b border-border bg-muted">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
        {!broken ? (
          <Image
            src={thumbSrc}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 512px"
            unoptimized
            onError={() => setBroken(true)}
          />
        ) : (
          <div className="flex h-full min-h-[168px] flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm font-medium text-foreground">{hostname}</p>
            <p className="max-w-[240px] text-xs leading-snug text-muted-foreground">
              {t('portfolio.previewUnavailable')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const { t } = useTranslations();

  return (
    <section id="portfolio" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="section-kicker mb-3">{t('portfolio.kicker')}</p>
          <h2 className="section-title">{t('portfolio.title')}</h2>
          <p className="section-lede mt-4">{t('portfolio.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {PROJECT_SLUGS.map((slug) => (
            <a
              key={slug}
              href={PROJECT_URL[slug]}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card outline-none transition-colors hover:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <PortfolioPreview
                siteUrl={PROJECT_URL[slug]}
                alt={t(`portfolio.projects.${slug}.title`)}
              />
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="inline-flex w-fit rounded-md bg-accent px-2 py-0.5 text-[11px] font-semibold text-primary">
                  {t('portfolio.badgeWeb')}
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
