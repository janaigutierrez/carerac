import type { Metadata } from 'next'
import { LanguageProvider } from '@/hooks/useLanguage'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

const SITE_URL = 'https://cancarerac.netlify.app'
const OG_TITLE = 'Carerac · Experiències autèntiques a la Catalunya rural'
const OG_DESCRIPTION = 'Una masia familiar on viure experiències gastronòmiques i creatives connectades amb la natura.'
const OG_IMAGE = `${SITE_URL}/images/gallery/hero.webp`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: OG_TITLE,
  description: OG_DESCRIPTION,
  keywords: 'masia catalunya, experiencies gastronomiques, turisme rural catalunya, forn llenya, hort ecologic, caldes de montbui',
  authors: [{ name: 'Carerac' }],
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: 'Carerac',
    locale: 'ca_ES',
    type: 'website',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Carerac · masia historica a Caldes de Montbui',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
  other: {
    'theme-color': '#8B6F47',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ca">
      <head>
        <link rel="preload" href="/fonts/ABCMonumentGrotesk-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PlayfairDisplay-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TouristAttraction',
              name: 'Carerac',
              description: 'Masia historica catalana amb experiencies gastronomiques i culturals uniques.',
              url: 'https://carerac.life',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Caldes de Montbui',
                addressRegion: 'Catalonia',
                addressCountry: 'ES',
              },
              provider: {
                '@type': 'Organization',
                name: 'Carerac',
                url: 'https://carerac.life',
              },
            }),
          }}
        />
      </head>
      <body className="font-body">
        <LanguageProvider>
          {children}
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  )
}
