'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface Content { ca: string; es: string; en: string }

export default function SobreNosaltresPage() {
  const { t, currentLanguage } = useLanguage()
  const [content, setContent] = useState<Content | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content?key=sobre-nosaltres')
      .then(r => r.json())
      .then(data => setContent(data.content || null))
      .catch(() => setContent(null))
      .finally(() => setLoading(false))
  }, [])

  const text = content ? content[currentLanguage] : ''
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0)

  return (
    <div className="min-h-screen bg-primary-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-brown hover:text-primary-dark transition-colors text-sm mb-8">
          <ArrowLeft size={16} />
          Tornar a l&apos;inici
        </Link>

        <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-10">
          {t('sobreNosaltres.title')}
        </h1>

        {loading ? (
          <p className="text-primary-gray italic">Carregant...</p>
        ) : paragraphs.length === 0 ? (
          <p className="text-primary-gray italic">{t('sobreNosaltres.placeholder')}</p>
        ) : (
          <article className="space-y-6 text-primary-dark/90 font-body text-base lg:text-lg leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>
        )}
      </div>
    </div>
  )
}
