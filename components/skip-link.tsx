'use client';

import { useTranslations } from '@/lib/i18n/locale-context';

export function SkipLink() {
  const { t } = useTranslations();

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
    >
      {t('nav.skipToContent')}
    </a>
  );
}
