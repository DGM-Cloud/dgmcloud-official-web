'use client';

import { useTranslations } from '@/lib/i18n/locale-context';

export function Hero() {
  const { t } = useTranslations();

  return (
    <section id="top" className="scroll-mt-24">
      <div className="hero-shell flex min-h-[58vh] flex-col items-start justify-center py-20 md:min-h-[64vh] md:py-24 lg:min-h-[68vh] lg:py-28">
        <p className="section-kicker mb-5">{t('hero.eyebrow')}</p>
        <h1 className="max-w-5xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-[3.5rem] md:leading-[1.12] lg:text-[3.75rem]">
          {t('hero.title')}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:max-w-4xl md:text-lg lg:text-xl lg:leading-relaxed">
          {t('hero.subtitle')}
        </p>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a href="#contact" className="btn-primary">
            {t('hero.ctaPrimary')}
          </a>
          <a href="#about" className="btn-secondary">
            {t('hero.ctaSecondary')}
          </a>
        </div>
      </div>
    </section>
  );
}
