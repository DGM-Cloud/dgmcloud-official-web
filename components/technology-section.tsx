'use client';

import { useTranslations } from '@/lib/i18n/locale-context';

const TECHNOLOGIES = [
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
  { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
  { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg' },
  { name: 'Swift', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swift/swift-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
] as const;

const MARQUEE_TECHNOLOGIES = [...TECHNOLOGIES, ...TECHNOLOGIES];

export function TechnologySection() {
  const { t } = useTranslations();

  return (
    <section id="technology" className="overflow-hidden border-y border-[#0a2044]/10 bg-white py-16 md:py-20">
      <div className="section-shell text-center">
        <p className="section-kicker mb-3">{t('technology.kicker')}</p>
        <h2 className="mx-auto max-w-3xl text-3xl font-semibold tracking-[-0.045em] text-[#071a38] md:text-5xl">{t('technology.title')}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#52657c] md:text-base">{t('technology.subtitle')}</p>
      </div>

      <div className="tech-marquee-mask mt-12 border-y border-[#0a2044]/10 py-6" role="region" aria-label={t('technology.stackAria')}>
        <ul className="tech-marquee-track flex w-max items-center">
          {MARQUEE_TECHNOLOGIES.map((technology, index) => (
            <li key={`${technology.name}-${index}`} className="flex min-w-[11rem] shrink-0 items-center gap-3 px-7 md:min-w-[13rem] md:px-9" aria-hidden={index >= TECHNOLOGIES.length}>
              <img src={technology.icon} alt="" width="42" height="42" loading="lazy" className="size-9 object-contain md:size-11" />
              <span className="text-base font-semibold tracking-[-0.02em] text-[#17304f] md:text-lg">{technology.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-center text-[0.64rem] font-semibold uppercase tracking-[0.15em] text-[#718197]">{t('technology.note')}</p>
    </section>
  );
}
