'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import type { ContentBlock } from '@/lib/data/contentBlocks'

export default function SobreNosaltresPage() {
  const { t, currentLanguage } = useLanguage()
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/content?key=sobre-nosaltres')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data?.content?.blocks)) setBlocks(data.content.blocks)
      })
      .catch(() => setBlocks([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-primary-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-brown hover:text-primary-dark transition-colors text-sm mb-8">
          <ArrowLeft size={16} />
          {t('common.backToHome')}
        </Link>

        <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-10">
          {t('sobreNosaltres.title')}
        </h1>

        {loading ? (
          <p className="text-primary-gray italic">{t('common.loading')}</p>
        ) : blocks.length === 0 ? (
          <p className="text-primary-gray italic">{t('sobreNosaltres.placeholder')}</p>
        ) : (
          <article className="space-y-8">
            {blocks.map(block => (
              <BlockRenderer key={block.id} block={block} lang={currentLanguage} />
            ))}
          </article>
        )}
      </div>
    </div>
  )
}

function BlockRenderer({ block, lang }: { block: ContentBlock; lang: 'ca' | 'es' | 'en' }) {
  if (block.type === 'heading') {
    const text = block[lang] || block.ca || block.es || block.en
    if (!text.trim()) return null
    return <h2 className="font-display text-2xl lg:text-3xl font-semibold text-primary-dark mt-6">{text}</h2>
  }
  if (block.type === 'paragraph') {
    const text = block[lang] || block.ca || block.es || block.en
    if (!text.trim()) return null
    return (
      <p className="text-primary-dark/90 font-body text-base lg:text-lg leading-relaxed whitespace-pre-line">
        {text}
      </p>
    )
  }
  if (block.type === 'image') {
    if (!block.url) return null
    const captionKey = lang === 'ca' ? 'captionCa' : lang === 'es' ? 'captionEs' : 'captionEn'
    const caption = block[captionKey]
    return (
      <figure className="my-2">
        <div className="relative aspect-[16/9] overflow-hidden rounded">
          <Image src={block.url} alt={caption || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" unoptimized />
        </div>
        {caption && (
          <figcaption className="text-center text-primary-gray text-sm mt-2 italic">{caption}</figcaption>
        )}
      </figure>
    )
  }
  if (block.type === 'video') {
    if (!block.youtubeId || !/^[a-zA-Z0-9_-]{11}$/.test(block.youtubeId)) return null
    const titleKey = lang === 'ca' ? 'titleCa' : lang === 'es' ? 'titleEs' : 'titleEn'
    const title = block[titleKey]
    return (
      <figure className="my-2">
        <div className="relative aspect-video overflow-hidden rounded bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${block.youtubeId}`}
            title={title || 'Vídeo'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        {title && <figcaption className="text-center text-primary-gray text-sm mt-2 italic">{title}</figcaption>}
      </figure>
    )
  }
  return null
}
