'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowRight } from 'lucide-react'

interface Chapter {
  tag: string
  title: string
  paragraph: string
  image: string
}

function ChapterBlock({ chapter, reverse, delay }: { chapter: Chapter; reverse: boolean; delay: number }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })
  const isExternal = chapter.image.startsWith('http')

  return (
    <div
      ref={ref}
      className={`grid lg:grid-cols-2 gap-10 items-center ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}
    >
      <div
        className={`relative aspect-[4/3] overflow-hidden shadow-xl transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        <Image
          src={chapter.image}
          alt={chapter.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          unoptimized={isExternal}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
      </div>

      <div
        className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        style={{ transitionDelay: `${delay + 150}ms` }}
      >
        <span className="inline-block text-xs tracking-[0.2em] uppercase text-primary-brown font-medium mb-3">
          {chapter.tag}
        </span>
        <h3 className="font-display text-3xl lg:text-4xl font-semibold text-primary-dark mb-5 leading-tight">
          {chapter.title}
        </h3>
        <p className="text-primary-gray font-body text-base lg:text-lg leading-relaxed">
          {chapter.paragraph}
        </p>
      </div>
    </div>
  )
}

export default function TimelineSection() {
  const { t } = useLanguage()
  const passat = t<Chapter>('history.passat')
  const present = t<Chapter>('history.present')
  const [mediaOverrides, setMediaOverrides] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/site-media?keys=history-passat,history-present')
      .then(r => r.json())
      .then(data => setMediaOverrides(data.media || {}))
      .catch(() => {})
  }, [])

  const passatChapter: Chapter = { ...passat, image: mediaOverrides['history-passat'] || passat.image }
  const presentChapter: Chapter = { ...present, image: mediaOverrides['history-present'] || present.image }

  return (
    <section id="timeline" className="relative py-24 lg:py-32 bg-primary-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            {t('history.label')}
          </h2>
          <p className="text-primary-gray font-body text-lg max-w-2xl mx-auto">
            {t('history.subtitle')}
          </p>
        </div>

        <div className="space-y-24 lg:space-y-32">
          <ChapterBlock chapter={passatChapter} reverse={false} delay={0} />
          <ChapterBlock chapter={presentChapter} reverse={true} delay={100} />
        </div>

        <div className="text-center mt-20">
          <Link
            href="/sobre-nosaltres"
            className="inline-flex items-center gap-2 text-primary-brown hover:text-primary-dark transition-colors font-medium border-b border-primary-brown/40 hover:border-primary-dark pb-1"
          >
            {t('history.moreCta')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
