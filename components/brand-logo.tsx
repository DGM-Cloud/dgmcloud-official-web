'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const BRAND_LOGO_DARK = '/logo1.png';
export const BRAND_LOGO_LIGHT = '/logo2.png';

/** @deprecated Use BRAND_LOGO_DARK */
export const BRAND_LOGO_PATH = BRAND_LOGO_DARK;

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
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const src =
    mounted && resolvedTheme === 'light' ? BRAND_LOGO_LIGHT : BRAND_LOGO_DARK;

  return (
    <Image
      src={src}
      alt={alt}
      width={320}
      height={86}
      sizes="(max-width: 768px) 220px, 280px"
      className={`object-contain object-left ${className}`}
      priority={priority}
    />
  );
}
