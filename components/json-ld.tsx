import { SITE_CONTACT_EMAIL } from '@/lib/contact-config';
import { SITE_URL } from '@/lib/site';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'DGM Cloud',
  url: SITE_URL,
  email: SITE_CONTACT_EMAIL,
  description:
    'DGM Cloud hace que la tecnología trabaje para tu negocio. Transformación digital, automatización y soluciones a medida.',
  sameAs: [
    'https://www.instagram.com/dgmcloud/',
    'https://www.tiktok.com/@dgm.cloud',
    'https://github.com/DGM-Cloud',
    'https://www.linkedin.com/company/dgmcloud',
  ],
};

export function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
