'use client';

import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n/dictionaries';
import { LocaleProvider } from '@/lib/i18n/locale-context';

export function AppProviders({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
