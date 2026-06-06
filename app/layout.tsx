import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { LanguageProvider } from '@/hooks/useLanguage'
import CookieBanner from '@/components/CookieBanner'
import './globals.css'

const playfair = localFont({
  variable: '--font-playfair',
  display: 'swap',
  src: [
    { path: '../public/fonts/PlayfairDisplay-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../public/fonts/PlayfairDisplay-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../public/fonts/PlayfairDisplay-Bold.ttf', weight: '700', style: 'normal' },
  ],
})

const monument = localFont({
  variable: '--font-inter',
  display: 'swap',
  src: [
    { path: '../public/fonts/ABCMonumentGrotesk-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/ABCMonumentGrotesk-Medium.woff', weight: '500', style: 'normal' },
    { path: '../public/fonts/ABCMonumentGrotesk-Bold.woff', weight: '700', style: 'normal' },
  ],
})

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
    <html lang="ca" className={`${playfair.variable} ${monument.variable}`}>
      <head>
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
