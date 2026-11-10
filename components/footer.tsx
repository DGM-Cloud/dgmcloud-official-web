'use client';

import { BrandLogoImg } from '@/components/brand-logo';
import { useTranslations } from '@/lib/i18n/locale-context';
import { Ornament } from '@/components/xmas/ornament';
import { SnowField } from '@/components/xmas/snow-field';

const headingClass =
  'mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-light';

export function Footer() {
  const { t } = useTranslations();

  const quickLinks = [
    { labelKey: 'nav.services' as const, href: '#services' },
    { labelKey: 'nav.portfolio' as const, href: '#portfolio' },
    { labelKey: 'nav.about' as const, href: '#about' },
    { labelKey: 'nav.team' as const, href: '#team' },
    { labelKey: 'footer.contact' as const, href: '#contact' },
  ];

  const serviceLinks = [
    { labelKey: 'footer.svcDigital' as const, href: '#services' },
    { labelKey: 'footer.svcAutomation' as const, href: '#services' },
    { labelKey: 'footer.svcCustom' as const, href: '#services' },
    { labelKey: 'footer.svcConsulting' as const, href: '#services' },
  ];

  const social = [
    {
      labelKey: 'footer.socialInstagram' as const,
      href: 'https://www.instagram.com/dgmcloud/',
    },
    {
      labelKey: 'footer.socialTiktok' as const,
      href: 'https://www.tiktok.com/@dgm.cloud',
    },
    {
      labelKey: 'footer.socialGithub' as const,
      href: 'https://github.com/DGM-Cloud',
    },
    {
      labelKey: 'footer.socialLinkedin' as const,
      href: 'https://www.linkedin.com/company/dgmcloud',
    },
  ];

  const linkClass =
    'block text-sm leading-relaxed text-cream/68 transition-colors hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-pine';

  return (
    <footer className="xm-pine-surface overflow-hidden border-t border-gold/35">
      <SnowField density={0.5} maxParticles={45} color="236,217,168" />

      {/* Adornos colgantes del cierre. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto hidden h-full max-w-6xl md:block" aria-hidden>
        <Ornament tone="gold" size={30} thread={46} className="xm-sway absolute left-[6%] top-0 opacity-90" style={{ animationDelay: '-2s' }} />
        <Ornament tone="cream" size={22} thread={86} className="xm-sway absolute left-[10%] top-0 opacity-80" style={{ animationDelay: '-4s' }} />
        <Ornament tone="night" size={34} thread={58} className="xm-sway absolute right-[8%] top-0 opacity-95" style={{ animationDelay: '-1s' }} />
        <Ornament tone="gold" size={20} thread={96} className="xm-sway absolute right-[13%] top-0 opacity-80" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="section-shell relative py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="xm-eyebrow xm-eyebrow-light justify-center">{t('season.badge')}</p>
          <p className="xm-display mt-5 text-[clamp(2.6rem,9vw,4.8rem)] text-cream">
            <em className="xm-gold-text pr-[0.06em]">{t('season.greeting')}</em>
          </p>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-cream/72 md:text-base">{t('season.closing')}</p>
        </div>

        <div className="xm-rule my-12 md:my-16" aria-hidden>
          <span className="xm-sparkle size-3.5" />
        </div>

        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-2 md:text-left lg:grid-cols-4">
          <div>
            <a
              href="#top"
              className="mb-4 inline-flex outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-pine"
              aria-label={t('nav.logoAria')}
            >
              <BrandLogoImg alt="" variant="dark" className="max-md:object-center" />
            </a>
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-cream/80 md:mx-0">{t('footer.tagline')}</p>
            <p className="mx-auto mt-2 max-w-xs text-xs leading-relaxed text-cream/55 md:mx-0">{t('footer.descriptor')}</p>
          </div>

          <nav aria-label={t('footer.quickLinks')}>
            <p className={headingClass}>{t('footer.quickLinks')}</p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.labelKey}>
                  <a href={link.href} className={linkClass}>
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.servicesTitle')}>
            <p className={headingClass}>{t('footer.servicesTitle')}</p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map((link) => (
                <li key={link.labelKey}>
                  <a href={link.href} className={linkClass}>
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t('footer.follow')}>
            <p className={headingClass}>{t('footer.follow')}</p>
            <ul className="flex flex-col gap-2.5">
              {social.map((link) => (
                <li key={link.labelKey}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="xm-hairline mt-12" aria-hidden />
        <p className="mt-6 text-center text-xs tracking-wide text-cream/55 md:text-left">{t('footer.rights')}</p>
      </div>
    </footer>
  );
}
