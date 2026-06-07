import type { Metadata } from 'next'
import { LanguageProvider } from '@/hooks/useLanguage'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

export const metadata: Metadata = {
  title: 'Carerac - Experiencies Autentiques a Catalunya Rural',
  description: 'Descobreix Carerac, una masia historica catalana on viure experiencies gastronomiques i culturals uniques. Forn de llenya, hort ecologic i tradicions autentiques.',
  keywords: 'masia catalunya, experiencies gastronomiques, turisme rural catalunya, forn llenya, hort ecologic',
  authors: [{ name: 'Carerac' }],
  openGraph: {
    title: 'Carerac - Experiencies Autentiques a Catalunya Rural',
    description: 'Descobreix Carerac, una masia historica catalana on viure experiencies gastronomiques i culturals uniques.',
    url: 'https://carerac.life',
    siteName: 'Carerac',
    locale: 'ca_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carerac - Experiencies Autentiques a Catalunya Rural',
    description: 'Descobreix Carerac, una masia historica catalana on viure experiencies gastronomiques i culturals uniques.',
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
