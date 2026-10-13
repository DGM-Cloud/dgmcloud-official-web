import { defaultLocale, type Locale } from '@/lib/i18n/dictionaries';

export const locales = ['es', 'en'] as const satisfies readonly Locale[];

/** Open Graph locale por idioma. */
export const ogLocales: Record<Locale, string> = {
  es: 'es_PE',
  en: 'en_US',
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Ruta pública de cada idioma. El idioma por defecto vive en `/` (reescrito
 * internamente a `/es` en `next.config.mjs`), el resto con prefijo.
 */
export function localePath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}`;
}
