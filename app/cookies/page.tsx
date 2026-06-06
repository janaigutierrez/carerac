'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export default function CookiesPage() {
  const { t } = useLanguage()
  const sections = t<{ title: string; body: string }[]>('cookiesPage.sections')

  return (
    <div className="min-h-screen bg-primary-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-brown hover:text-primary-dark transition-colors text-sm mb-8">
          <ArrowLeft size={16} />
          {t('cookiesPage.back')}
        </Link>

        <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
          {t('cookiesPage.title')}
        </h1>
        <p className="text-primary-gray font-body text-base mb-12">
          {t('cookiesPage.updated')}
        </p>

        <div className="space-y-10">
          {sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-display text-2xl font-semibold text-primary-dark mb-3">{section.title}</h2>
              <p className="text-primary-dark/85 font-body leading-relaxed whitespace-pre-line">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
