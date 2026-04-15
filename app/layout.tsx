import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { LanguageProvider } from '@/hooks/useLanguage'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Can Carerac - Experiencies Autentiques a Catalunya Rural',
  description: 'Descobreix Can Carerac, una masia historica catalana on viure experiencies gastronomiques i culturals uniques. Forn de llenya, hort ecologic i tradicions autentiques.',
  keywords: 'masia catalunya, experiencies gastronomiques, turisme rural catalunya, forn llenya, hort ecologic',
  authors: [{ name: 'Can Carerac' }],
  openGraph: {
    title: 'Can Carerac - Experiencies Autentiques a Catalunya Rural',
    description: 'Descobreix Can Carerac, una masia historica catalana on viure experiencies gastronomiques i culturals uniques.',
    url: 'https://cancarerac.cat',
    siteName: 'Can Carerac',
    locale: 'ca_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can Carerac - Experiencies Autentiques a Catalunya Rural',
    description: 'Descobreix Can Carerac, una masia historica catalana on viure experiencies gastronomiques i culturals uniques.',
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
    <html lang="ca" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TouristAttraction',
              name: 'Can Carerac',
              description: 'Masia historica catalana amb experiencies gastronomiques i culturals uniques.',
              url: 'https://cancarerac.cat',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Caldes de Montbui',
                addressRegion: 'Catalonia',
                addressCountry: 'ES',
              },
              provider: {
                '@type': 'Organization',
                name: 'Can Carerac',
                url: 'https://cancarerac.cat',
              },
            }),
          }}
        />
      </head>
      <body className="font-body">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
