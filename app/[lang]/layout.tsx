import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ScrollProgressBar } from '@/components/ui/scroll-progress'
import { AppProviders } from '@/components/app-providers'
import { JsonLd } from '@/components/json-ld'
import { SITE_URL } from '@/lib/site'
import { dictionaries } from '@/lib/i18n/dictionaries'
import { isLocale, localePath, locales, ogLocales } from '@/lib/i18n/routing'
import '../globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
}

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

type LangParams = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const { lang } = await params
  if (!isLocale(lang)) return {}

  const { title, description } = dictionaries[lang].seo
  const path = localePath(lang)

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    applicationName: 'DGM Cloud',
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, localePath(l)])),
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'website',
      locale: ogLocales[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocales[l]),
      url: path,
      siteName: 'DGM Cloud',
      title,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
}> &
  LangParams) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans min-h-[100dvh] bg-background antialiased text-foreground">
        <AppProviders locale={lang}>
          <JsonLd locale={lang} />
          <ScrollProgressBar />
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AppProviders>
      </body>
    </html>
  )
}
