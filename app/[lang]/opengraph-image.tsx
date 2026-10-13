import { ImageResponse } from 'next/og';
import { dictionaries, defaultLocale } from '@/lib/i18n/dictionaries';
import { isLocale, locales } from '@/lib/i18n/routing';
import { SITE_BRAND_HEX } from '@/lib/site-brand';

export const alt = 'DGM Cloud';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = dictionaries[isLocale(lang) ? lang : defaultLocale];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#ffffff',
          color: '#0f172a',
          borderTop: `16px solid ${SITE_BRAND_HEX}`,
        }}
      >
        <div style={{ display: 'flex', fontSize: 40, fontWeight: 700, color: SITE_BRAND_HEX }}>
          DGM Cloud
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -2 }}>
            {dict.hero.title}
          </div>
          <div style={{ display: 'flex', fontSize: 30, color: '#475569' }}>{dict.hero.eyebrow}</div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#64748b' }}>dgm.cloud</div>
      </div>
    ),
    size,
  );
}
