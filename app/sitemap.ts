import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { localePath, locales } from '@/lib/i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    locales.map((l) => [l, new URL(localePath(l), SITE_URL).toString()]),
  );

  return locales.map((locale) => ({
    url: languages[locale],
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 1,
    alternates: { languages },
  }));
}
