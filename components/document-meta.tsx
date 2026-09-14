'use client';

import { useEffect } from 'react';
import { useTranslations } from '@/lib/i18n/locale-context';

function applyDocumentMeta(title: string, description: string, locale: string) {
  if (document.title !== title) {
    document.title = title;
  }
  document.documentElement.lang = locale;

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    document.head.appendChild(meta);
  }
  if (meta.getAttribute('content') !== description) {
    meta.setAttribute('content', description);
  }
}

export function DocumentMeta() {
  const { t, locale } = useTranslations();

  useEffect(() => {
    const title = t('seo.title');
    const description = t('seo.description');
    applyDocumentMeta(title, description, locale);

    const observer = new MutationObserver(() => {
      applyDocumentMeta(title, description, locale);
    });
    const titleEl = document.querySelector('title');
    if (titleEl) {
      observer.observe(titleEl, { childList: true, characterData: true, subtree: true });
    }

    return () => observer.disconnect();
  }, [locale, t]);

  return null;
}
