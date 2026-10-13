'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { dictionaries, type Locale } from '@/lib/i18n/dictionaries';

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

type LocaleContextValue = {
  locale: Locale;
  t: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = useCallback(
    (path: string) => readMessage(dictionaries[locale], path),
    [locale],
  );

  const value = useMemo(() => ({ locale, t }), [locale, t]);

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
