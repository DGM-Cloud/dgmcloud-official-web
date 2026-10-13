'use client';

import Image from 'next/image';

export const BRAND_LOGO_LIGHT = '/logo.webp';
export const BRAND_LOGO_DARK = '/logo-dark.webp';

type BrandLogoImgProps = {
  className?: string;
  /** Alt vacío cuando el enlace padre ya tiene aria-label (evita duplicar lectura). */
  alt?: string;
  priority?: boolean;
};

export function BrandLogoImg({
  className = '',
  alt = '',
  priority = false,
}: BrandLogoImgProps) {
  const imageClass = `h-9 w-[7.5rem] object-contain object-left md:h-11 md:w-[9.5rem] ${className}`;
  return (
    <>
      <Image
        src={BRAND_LOGO_LIGHT}
        alt={alt}
        width={180}
        height={112}
        sizes="(max-width: 768px) 140px, 176px"
        className={`${imageClass} dark:hidden`}
        priority={priority}
      />
      <Image
        src={BRAND_LOGO_DARK}
        alt={alt}
        width={180}
        height={112}
        sizes="(max-width: 768px) 140px, 176px"
        className={`${imageClass} hidden dark:block`}
      />
    </>
  );
}
