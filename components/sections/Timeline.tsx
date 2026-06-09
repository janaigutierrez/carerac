'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

interface Chapter {
  tag: string
  title: string
  paragraph: string
  image: string
}

function ChapterCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const count = images.length
  const prev = () => setIndex(i => (i - 1 + count) % count)
  const next = () => setIndex(i => (i + 1) % count)
  const current = images[index]
  const isExternal = current.startsWith('http')

  return (
    <>
      {images.map((img, i) => (
        <Image
          key={img + i}
          src={img}
          alt={alt}
          fill
          className={`object-cover transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0'}`}
          sizes="(max-width: 1024px) 100vw, 1280px"
          unoptimized={isExternal}
          priority={i === 0}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent pointer-events-none" />

      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imatge anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-primary-white/80 hover:bg-primary-white text-primary-dark w-10 h-10 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity z-20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Imatge següent"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary-white/80 hover:bg-primary-white text-primary-dark w-10 h-10 rounded-full flex items-center justify-center shadow opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity z-20"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Imatge ${i + 1}`}
                className={`transition-all ${i === index ? 'w-6 h-1.5 bg-primary-white' : 'w-1.5 h-1.5 bg-primary-white/60 hover:bg-primary-white/80'} rounded-full`}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <>
      <span className="inline-block text-xs tracking-[0.2em] uppercase text-primary-brown font-medium mb-3">
        {chapter.tag}
      </span>
      <h3 className="font-display text-2xl lg:text-3xl font-semibold text-primary-dark mb-4 leading-tight">
        {chapter.title}
      </h3>
      <p className="text-primary-dark/80 font-body text-sm lg:text-base leading-relaxed">
        {chapter.paragraph}
      </p>
    </>
  )
}

function ChapterBlock({ chapter, images, reverse, delay }: { chapter: Chapter; images: string[]; reverse: boolean; delay: number }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })

  const desktopCardPos = reverse
    ? 'lg:right-8 xl:right-12'
    : 'lg:left-8 xl:left-12'

  return (
    <div
      ref={ref}
      className={`relative transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative aspect-[16/10] lg:aspect-[16/9] overflow-hidden shadow-2xl group">
        <ChapterCarousel images={images} alt={chapter.title} />

        <div
          className={`hidden lg:block absolute bottom-8 ${desktopCardPos} max-w-md bg-primary-white/85 backdrop-blur-md shadow-2xl p-8 xl:p-10 z-10`}
        >
          <ChapterCard chapter={chapter} />
        </div>
      </div>

      <div className="lg:hidden bg-primary-white/95 backdrop-blur-md shadow-xl p-6 sm:p-8 -mt-10 mx-4 sm:mx-8 relative z-10">
        <ChapterCard chapter={chapter} />
      </div>
    </div>
  )
}

export default function TimelineSection() {
  const { t } = useLanguage()
  const passat = t<Chapter>('history.passat')
  const present = t<Chapter>('history.present')
  const [mediaOverrides, setMediaOverrides] = useState<Record<string, string[]>>({})

  useEffect(() => {
    fetch('/api/site-media?slots=history-passat,history-present')
      .then(r => r.json())
      .then(data => setMediaOverrides(data.media || {}))
      .catch(() => {})
  }, [])

  const passatImages = mediaOverrides['history-passat']?.length ? mediaOverrides['history-passat'] : [passat.image]
  const presentImages = mediaOverrides['history-present']?.length ? mediaOverrides['history-present'] : [present.image]

  return (
    <section id="timeline" className="relative py-16 lg:py-24 bg-primary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            {t('history.label')}
          </h2>
          <p className="text-primary-gray font-body text-lg max-w-2xl mx-auto">
            {t('history.subtitle')}
          </p>
        </div>

        <div className="space-y-16 lg:space-y-20">
          <ChapterBlock chapter={passat} images={passatImages} reverse={false} delay={0} />
          <ChapterBlock chapter={present} images={presentImages} reverse={true} delay={100} />
        </div>

        <div className="text-center mt-16 lg:mt-20">
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
