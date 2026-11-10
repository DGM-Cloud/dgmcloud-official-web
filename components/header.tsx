'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandLogoImg } from '@/components/brand-logo';
import { useTranslations } from '@/lib/i18n/locale-context';
import { localePath } from '@/lib/i18n/routing';

const SECTION_IDS = ['portfolio', 'services', 'about', 'team'] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { t, locale, switchLocale } = useTranslations();

  const navItems = [
    { labelKey: 'nav.portfolio' as const, href: '#portfolio', id: 'portfolio' },
    { labelKey: 'nav.services' as const, href: '#services', id: 'services' },
    { labelKey: 'nav.about' as const, href: '#about', id: 'about' },
    { labelKey: 'nav.team' as const, href: '#team', id: 'team' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.15, 0.35, 0.55],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const LangToggle = ({ className = '' }: { className?: string }) => (
    <div
      className={`inline-flex items-center rounded-full border border-line bg-cream-2/70 p-0.5 ${className}`}
      role="group"
      aria-label={t('nav.langAria')}
    >
      {(['en', 'es'] as const).map((code) => {
        const active = locale === code;
        return (
          <a
            key={code}
            href={localePath(code)}
            hrefLang={code}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
              event.preventDefault();
              setIsOpen(false);
              switchLocale(code);
            }}
            aria-current={active ? 'page' : undefined}
            className={`inline-flex min-h-8 items-center rounded-full px-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep ${
              active
                ? 'bg-night text-gold-light shadow-sm'
                : 'text-ink-soft hover:text-ink'
            }`}
          >
            {code === 'en' ? t('nav.langEn') : t('nav.langEs')}
          </a>
        );
      })}
    </div>
  );

  const linkClass = (id: string) =>
    `relative text-[13px] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep ${
      activeId === id
        ? 'text-ink'
        : 'text-ink-soft hover:text-ink'
    }`;

  return (
    <>
      <div className="relative z-40 bg-night text-gold-light" role="note">
        <div className="hero-shell flex min-h-8 items-center justify-center gap-3 py-1.5 text-center text-[0.62rem] font-semibold uppercase leading-4 tracking-[0.22em] sm:text-[0.66rem]">
          <span className="xm-sparkle text-gold" aria-hidden />
          <span>{t('season.greeting')}</span>
          <span className="hidden text-gold/60 sm:inline" aria-hidden>
            ·
          </span>
          <span className="hidden text-cream/70 sm:inline">DGM Cloud</span>
          <span className="xm-sparkle text-gold" aria-hidden />
        </div>
      </div>
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] ${
        scrolled
          ? 'border-gold/40 bg-cream/90 shadow-[0_12px_30px_rgba(6,20,42,0.08)] backdrop-blur-xl'
          : 'border-line bg-cream'
      }`}
    >
      <div className="hero-shell grid min-h-[4.25rem] grid-cols-[1fr_auto] items-center gap-2 py-2.5 md:min-h-[4.75rem] md:gap-3 md:py-3 lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          className="flex shrink-0 items-center justify-self-start outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
          aria-label={t('nav.logoAria')}
          onClick={() => setIsOpen(false)}
        >
          <BrandLogoImg priority alt="" variant="light" className="h-8 w-[6.75rem] md:h-10 md:w-[9.5rem]" />
        </a>

        <nav className="hidden items-center justify-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.labelKey}
              href={item.href}
              className={`${linkClass(item.id)} rounded-md px-3 py-2`}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              {t(item.labelKey)}
              <span
                aria-hidden
                className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold-deep transition-transform duration-300 ${
                  activeId === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-self-end gap-3 lg:flex">
          <LangToggle />
          <a href="#contact" className="xm-btn xm-btn-night min-h-10! px-5! text-[0.82rem]!">
            {t('nav.cta')}
            <ArrowUpRight className="size-3.5 text-gold" aria-hidden />
          </a>
        </div>

        <div className="flex items-center justify-self-end gap-2 lg:hidden">
          <a href="#contact" className="xm-btn xm-btn-night hidden min-h-10! px-3.5! text-[0.78rem]! min-[360px]:inline-flex">
            {t('nav.cta')}
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-cream-2/60 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={t('nav.menu')}
          >
            {isOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-line bg-cream lg:hidden ${isOpen ? '' : 'hidden'}`}
      >
        <nav className="section-shell space-y-1 py-4" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.labelKey}
              href={item.href}
              className={`block rounded-lg px-3 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-deep ${
                activeId === item.id
                  ? 'bg-cream-2 text-ink'
                  : 'text-ink-soft hover:bg-cream-2 hover:text-ink'
              }`}
              aria-current={activeId === item.id ? 'true' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {t(item.labelKey)}
            </a>
          ))}
          <div className="border-t border-line px-1 pt-4">
            <div className="flex items-center justify-between gap-3">
              <LangToggle />
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="xm-btn xm-btn-night min-h-10! px-4! text-sm!"
              >
                {t('nav.cta')}
                <ArrowUpRight className="size-3.5 text-gold" aria-hidden />
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
    </>
  );
}
