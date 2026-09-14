'use client';

import { useTranslations } from '@/lib/i18n/locale-context';

const STEPS = ['p1', 'p2', 'p3', 'p4', 'p5'] as const;

export function ProcessSection() {
  const { t } = useTranslations();

  return (
    <section id="process" className="scroll-mt-24 border-b border-border py-20 md:py-28">
      <div className="section-shell">
        <div className="mb-12 max-w-2xl md:mb-16">
          <p className="section-kicker mb-3">{t('process.kicker')}</p>
          <h2 className="section-title">{t('process.title')}</h2>
          <p className="section-lede mt-4">{t('process.subtitle')}</p>
        </div>

        <ol className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {STEPS.map((step, i) => (
            <li key={step} className="border-t border-border pt-5">
              <p className="mb-2 font-mono text-xs font-medium text-primary">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mb-2 text-sm font-semibold tracking-tight text-foreground">
                {t(`process.${step}.title`)}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(`process.${step}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
