import { SITE_CONTACT_EMAIL, SITE_WHATSAPP_NUMBER } from '@/lib/contact-config';
import { dictionaries, type Locale } from '@/lib/i18n/dictionaries';
import { localePath } from '@/lib/i18n/routing';
import { SITE_URL } from '@/lib/site';

export function JsonLd({ locale }: { locale: Locale }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'DGM Cloud',
    url: new URL(localePath(locale), SITE_URL).toString(),
    email: SITE_CONTACT_EMAIL,
    telephone: `+${SITE_WHATSAPP_NUMBER}`,
    inLanguage: locale,
    description: dictionaries[locale].seo.description,
    sameAs: [
      'https://www.instagram.com/dgmcloud/',
      'https://www.tiktok.com/@dgm.cloud',
      'https://github.com/DGM-Cloud',
      'https://www.linkedin.com/company/dgmcloud',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
