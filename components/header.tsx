'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BrandLogoImg } from '@/components/brand-logo';
import { useTranslations } from '@/lib/i18n/locale-context';

const SECTION_IDS = ['services', 'portfolio', 'about', 'team'] as const;

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { t, locale, setLocale } = useTranslations();

  const navItems = [
    { labelKey: 'nav.services' as const, href: '#services', id: 'services' },
    { labelKey: 'nav.portfolio' as const, href: '#portfolio', id: 'portfolio' },
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
      className={`inline-flex items-center rounded-lg border border-border bg-background p-0.5 ${className}`}
      role="group"
      aria-label={t('nav.langAria')}
    >
      {(['en', 'es'] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`min-h-8 rounded-md px-2.5 text-xs font-semibold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active
                ? 'bg-accent text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {code === 'en' ? t('nav.langEn') : t('nav.langEs')}
          </button>
        );
      })}
    </div>
  );

  const linkClass = (id: string) =>
    `relative text-[13px] font-medium tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
      activeId === id
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground'
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-[background-color,border-color,box-shadow] ${
        scrolled
          ? 'border-border bg-background/90 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-md'
          : 'border-border/70 bg-background/95 backdrop-blur-sm'
      }`}
    >
      <div className="section-shell grid min-h-[4.25rem] grid-cols-[1fr_auto] items-center gap-3 py-3 md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          className="flex shrink-0 items-center justify-self-start outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={t('nav.logoAria')}
          onClick={() => setIsOpen(false)}
        >
          <BrandLogoImg priority alt="" />
        </a>

        <nav className="hidden items-center justify-center gap-1 md:flex" aria-label="Primary">
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
                className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-200 ${
                  activeId === item.id ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center justify-self-end gap-3 md:flex">
          <LangToggle />
          <a href="#contact" className="btn-primary min-h-10 px-4 text-sm">
            {t('nav.cta')}
          </a>
        </div>

        <div className="flex items-center justify-self-end gap-2 md:hidden">
          <a href="#contact" className="btn-primary min-h-10 px-3.5 text-sm">
            {t('nav.cta')}
          </a>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
        className={`border-t border-border bg-background md:hidden ${isOpen ? '' : 'hidden'}`}
      >
        <nav className="section-shell space-y-1 py-4" aria-label="Mobile">
          {navItems.map((item) => (
            <a
              key={item.labelKey}
              href={item.href}
              className={`block rounded-lg px-3 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                activeId === item.id
                  ? 'bg-accent text-primary'
                  : 'text-foreground hover:bg-muted'
              }`}
              aria-current={activeId === item.id ? 'true' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {t(item.labelKey)}
            </a>
          ))}
          <div className="border-t border-border px-1 pt-4">
            <LangToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
