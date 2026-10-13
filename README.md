# DGM Cloud — sitio oficial

Landing page de [dgm.cloud](https://dgm.cloud): transformación digital, automatización y soluciones a medida.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS 4, Framer Motion, Radix Select, lucide-react
- Formulario de contacto: `app/api/contact` con Zod + [Resend](https://resend.com)
- Vercel Analytics (solo en producción)

## Desarrollo

Se usa **pnpm** (no mezclar con npm/yarn).

```bash
pnpm install
cp .env.example .env.local   # completar RESEND_API_KEY
pnpm dev
```

| Variable | Uso |
| --- | --- |
| `RESEND_API_KEY` | Clave de Resend para enviar el formulario |
| `CONTACT_TO_EMAIL` | Destinatario (por defecto `contact@dgm.cloud`) |
| `CONTACT_FROM_EMAIL` | Remitente verificado en Resend |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (por defecto `https://dgm.cloud`) |

## Estructura

```
app/
  [lang]/layout.tsx           Layout raíz por idioma + metadata (canonical, hreflang, OG)
  [lang]/page.tsx             Página única con todas las secciones
  [lang]/opengraph-image.tsx  Imagen para redes sociales por idioma
  api/contact/route.ts        Envío del formulario (honeypot + límite por IP)
  sitemap.ts, robots.ts
components/                   Secciones de la landing (hero, servicios, portafolio, equipo…)
lib/i18n/                     Diccionarios es/en, contexto y rutas por idioma
lib/team.ts                   Datos del equipo (fotos en public/team/*.webp)
```

## Idiomas

- Español en `/`, inglés en `/en`. `/es` redirige a `/` y `/` se reescribe internamente a `/es` (`next.config.mjs`).
- Los textos viven en `lib/i18n/dictionaries.ts`; en componentes cliente se usan con `useTranslations().t('clave')`.
- Para añadir un idioma: agregarlo al tipo `Locale`, a `dictionaries` y a `locales` en `lib/i18n/routing.ts`.

## Imágenes

Las imágenes se sirven tal cual (`images.unoptimized`), así que deben subirse ya optimizadas: WebP, ~800 px de ancho para retratos y menos de 200 KB.

## Seguridad

`next.config.mjs` define CSP, HSTS, `X-Frame-Options`, `Referrer-Policy` y `Permissions-Policy`. Si se añade un script o imagen de otro dominio, hay que incluirlo en la CSP.
