'use client';

import { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from '@/lib/i18n/locale-context';
import { THEME_STORAGE_KEY } from '@/lib/theme';

function readStoredTheme(): string | null {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { t } = useTranslations();

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) return;
      document.documentElement.classList.toggle('dark', event.matches);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    try {
      localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t('nav.themeAria')}
      title={t('nav.themeAria')}
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${className}`}
    >
      <Moon className="size-[1.1rem] dark:hidden" aria-hidden />
      <Sun className="hidden size-[1.1rem] dark:block" aria-hidden />
    </button>
  );
}
