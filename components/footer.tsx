'use client';

import { BrandLogoImg } from '@/components/brand-logo';
import { useTranslations } from '@/lib/i18n/locale-context';

const headingClass =
  'mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground';

export function Footer() {
  const { t } = useTranslations();

  const quickLinks = [
    { labelKey: 'nav.services' as const, href: '#services' },
    { labelKey: 'nav.portfolio' as const, href: '#portfolio' },
    { labelKey: 'nav.about' as const, href: '#about' },
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
    'block text-sm leading-relaxed text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2';

  return (
    <footer className="border-t border-border bg-muted">
      <div className="section-shell py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="#top"
              className="mb-4 inline-flex outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={t('nav.logoAria')}
            >
              <BrandLogoImg alt="" />
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t('footer.tagline')}
            </p>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted-foreground">
              {t('footer.descriptor')}
            </p>
          </div>

          <nav aria-label={t('footer.quickLinks')}>
            <p className={headingClass}>{t('footer.quickLinks')}</p>
            <ul className="flex flex-col gap-2">
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
            <ul className="flex flex-col gap-2">
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
            <ul className="flex flex-col gap-2">
              {social.map((link) => (
                <li key={link.labelKey}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">{t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
