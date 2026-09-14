'use client';

import Image from 'next/image';

export const BRAND_LOGO_LIGHT = '/logo.png';
export const BRAND_LOGO_DARK = '/logo1.png';

/** @deprecated Light-only site — use BRAND_LOGO_LIGHT */
export const BRAND_LOGO_PATH = BRAND_LOGO_LIGHT;

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
  return (
    <Image
      src={BRAND_LOGO_LIGHT}
      alt={alt}
      width={180}
      height={112}
      sizes="(max-width: 768px) 140px, 176px"
      className={`h-9 w-[7.5rem] object-contain object-left md:h-11 md:w-[9.5rem] ${className}`}
      priority={priority}
    />
  );
}
