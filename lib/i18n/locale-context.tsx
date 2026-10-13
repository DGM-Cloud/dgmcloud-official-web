'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { dictionaries, type Locale } from '@/lib/i18n/dictionaries';
import { localePath } from '@/lib/i18n/routing';

function readMessage(root: unknown, path: string): string {
  const parts = path.split('.');
  let cur: unknown = root;
  for (const p of parts) {
    if (cur !== null && typeof cur === 'object' && p in cur) {
      cur = (cur as Record<string, unknown>)[p];
    } else {
      return path;
    }
  }
  return typeof cur === 'string' ? cur : path;
}

type ScrollAnchor = { element: Element; top: number };

/** First section still visible below the sticky header, used to keep the reader in place. */
function findScrollAnchor(): ScrollAnchor | null {
  const headerBottom = document.querySelector('header')?.getBoundingClientRect().bottom ?? 0;
  for (const element of document.querySelectorAll('main section, footer')) {
    const rect = element.getBoundingClientRect();
    if (rect.bottom > headerBottom) return { element, top: rect.top };
  }
  return null;
}

function applyDocumentLocale(locale: Locale) {
  const { title, description } = dictionaries[locale].seo;
  document.documentElement.lang = locale;
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
}

type LocaleContextValue = {
  locale: Locale;
  t: (path: string) => string;
  /** Switches language in place: no reload, same scroll position, URL updated. */
  switchLocale: (next: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale: initialLocale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocale] = useState(initialLocale);
  const anchorRef = useRef<ScrollAnchor | null>(null);

  useEffect(() => setLocale(initialLocale), [initialLocale]);

  const switchLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      anchorRef.current = findScrollAnchor();
      setLocale(next);
      window.history.replaceState(window.history.state, '', localePath(next));
    },
    [locale],
  );

  useLayoutEffect(() => {
    applyDocumentLocale(locale);
    const anchor = anchorRef.current;
    anchorRef.current = null;
    if (anchor?.element.isConnected) {
      window.scrollTo({
        top: window.scrollY + anchor.element.getBoundingClientRect().top - anchor.top,
        behavior: 'instant',
      });
    }
  }, [locale]);

  const t = useCallback(
    (path: string) => readMessage(dictionaries[locale], path),
    [locale],
  );

  const value = useMemo(() => ({ locale, t, switchLocale }), [locale, t, switchLocale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useTranslations() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useTranslations debe usarse dentro de LocaleProvider');
  }
  return ctx;
}

export type { Locale };
