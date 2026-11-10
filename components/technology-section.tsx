'use client';

import { useTranslations } from '@/lib/i18n/locale-context';

const TECHNOLOGIES = [
  { name: 'React', icon: '/technology/react.svg' },
  { name: 'Next.js', icon: '/technology/nextjs.svg' },
  { name: 'Angular', icon: '/technology/angular.svg' },
  { name: 'TypeScript', icon: '/technology/typescript.svg' },
  { name: 'Java', icon: '/technology/java.svg' },
  { name: 'Spring', icon: '/technology/spring.svg' },
  { name: 'Flutter', icon: '/technology/flutter.svg' },
  { name: 'Swift', icon: '/technology/swift.svg' },
  { name: 'PostgreSQL', icon: '/technology/postgresql.svg' },
  { name: 'Node.js', icon: '/technology/nodejs.svg' },
] as const;

const MARQUEE_TECHNOLOGIES = [...TECHNOLOGIES, ...TECHNOLOGIES];

export function TechnologySection() {
  const { t } = useTranslations();

  return (
    <section id="technology" className="overflow-hidden border-b border-line bg-card py-16 md:py-24">
      <div className="section-shell flex flex-col items-center text-center">
        <p className="xm-eyebrow mb-5">{t('technology.kicker')}</p>
        <h2 className="xm-display mx-auto max-w-3xl text-[clamp(2.1rem,8vw,3.9rem)] text-ink">{t('technology.title')}</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-ink-soft md:text-base md:leading-7">{t('technology.subtitle')}</p>
        <div className="xm-rule mt-9 w-40 sm:w-56" aria-hidden>
          <span className="xm-sparkle size-3" />
        </div>
      </div>

      <div className="tech-marquee-mask mt-9 border-y border-gold-deep/25 bg-cream py-5 sm:mt-12 sm:py-6" role="region" aria-label={t('technology.stackAria')}>
        <ul className="tech-marquee-track flex w-max items-center">
          {MARQUEE_TECHNOLOGIES.map((technology, index) => (
            <li key={`${technology.name}-${index}`} className="flex min-w-[9.5rem] shrink-0 items-center gap-2.5 px-5 sm:min-w-[11rem] sm:gap-3 sm:px-7 md:min-w-[13rem] md:px-9" aria-hidden={index >= TECHNOLOGIES.length}>
              <img src={technology.icon} alt="" width="42" height="42" loading="lazy" className="size-9 object-contain md:size-11" />
              <span className="text-base font-semibold tracking-[-0.02em] text-ink md:text-lg">{technology.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-7 flex items-center justify-center gap-3 px-5 text-center text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-gold-deep">
        <span className="xm-sparkle size-2" aria-hidden />
        {t('technology.note')}
        <span className="xm-sparkle size-2" aria-hidden />
      </p>
    </section>
  );
}
