export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://www.dgmcloud.dev'
) as string;
