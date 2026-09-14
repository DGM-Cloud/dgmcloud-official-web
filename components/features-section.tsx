'use client';

import { useTranslations } from '@/lib/i18n/locale-context';

const FEATURE_IDS = ['f1', 'f2', 'f3', 'f4'] as const;

export function FeaturesSection() {
  const { t } = useTranslations();

  return (
    <section id="about" className="scroll-mt-24 border-b border-border bg-muted/40 py-20 md:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker mb-3">{t('features.kicker')}</p>
            <h2 className="section-title">{t('features.title')}</h2>
            <p className="mt-4 hidden text-sm leading-relaxed text-muted-foreground lg:block">
              {t('features.ctaHint')}
            </p>
            <a href="#contact" className="btn-primary mt-6 hidden lg:inline-flex">
              {t('features.cta')}
            </a>
          </div>

          <ol className="space-y-0 border-t border-border">
            {FEATURE_IDS.map((fid, i) => (
              <li
                key={fid}
                className="grid gap-3 border-b border-border py-7 sm:grid-cols-[3.25rem_minmax(0,1fr)] sm:gap-6 sm:py-8"
              >
                <span className="font-mono text-sm font-semibold tabular-nums text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {t(`features.${fid}.title`)}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium text-primary/90">
                    {t(`features.${fid}.subtitle`)}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {t(`features.${fid}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 lg:hidden">
          <a href="#contact" className="btn-primary w-full sm:w-auto">
            {t('features.cta')}
          </a>
          <p className="text-sm text-muted-foreground">{t('features.ctaHint')}</p>
        </div>
      </div>
    </section>
  );
}
