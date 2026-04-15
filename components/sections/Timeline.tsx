'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import type { TimelineEvent } from '@/lib/data/locales/types'

const TIMELINE_IMAGES = [
  '/images/gallery/timeline-fundacio.webp',
  '/images/gallery/timeline-primers-anys.webp',
  '/images/gallery/timeline-renovacio.webp',
  '/images/gallery/timeline-obertura.webp',
  '/images/gallery/timeline-expansio.webp',
  '/images/gallery/timeline-actualitat.webp',
]

export default function TimelineSection() {
  const { t } = useLanguage()
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false })

  const timelineData = t<TimelineEvent[]>('timeline.events')
  const timelineEvents = timelineData.map((event, index) => ({
    ...event,
    id: index + 1,
    image: TIMELINE_IMAGES[index],
    side: index % 2 === 0 ? 'left' as const : 'right' as const,
    isPresent: index === timelineData.length - 1,
  }))

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const wh = window.innerHeight
      if (rect.bottom < 0 || rect.top > wh) return
      setScrollProgress(Math.min(1, Math.max(0, (wh - rect.top) / (rect.height + wh))))
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const lineHeight = scrollProgress * 100

  return (
    <section
      id="timeline"
      ref={(el) => {
        // Merge refs
        (ref as (node: HTMLElement | null) => void)(el)
        ;(sectionRef as React.MutableRefObject<HTMLElement | null>).current = el
      }}
      className="relative py-20 bg-gradient-to-b from-primary-white to-primary-stone/30 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4">{t('timeline.title')}</h2>
          <p className="text-primary-gray font-body text-lg max-w-2xl mx-auto">{t('timeline.subtitle')}</p>
        </div>

        <div className="relative">
          {/* Central line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 bg-primary-brown/30 z-0" style={{ height: '100%' }}>
            <div
              className="w-full bg-gradient-to-b from-primary-brown via-primary-forest to-primary-terracotta transition-all duration-300 ease-out relative shadow-md"
              style={{ height: `${Math.min(lineHeight, 100)}%` }}
            >
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary-terracotta rounded-full animate-pulse shadow-xl border-4 border-white" />
            </div>
          </div>

          {/* Events */}
          <div className="relative z-20 space-y-32">
            {timelineEvents.map((event, index) => {
              const isLeft = event.side === 'left'
              return (
                <div key={event.id} className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>
                  {/* Branch line */}
                  <div
                    className="absolute top-1/2 w-20 h-1 z-10 transition-all duration-1000 transform scale-x-100 opacity-100"
                    style={{
                      [isLeft ? 'right' : 'left']: '50%',
                      transitionDelay: `${index * 200}ms`,
                      background: isLeft
                        ? 'linear-gradient(to left, #8B6F47, rgba(139, 111, 71, 0.3))'
                        : 'linear-gradient(to right, #8B6F47, rgba(139, 111, 71, 0.3))',
                    }}
                  />

                  {/* Year badge */}
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 scale-100 opacity-100"
                    style={{ transitionDelay: `${index * 200 + 300}ms` }}
                  >
                    <div className={`absolute inset-0 rounded-full ${event.isPresent ? 'bg-primary-terracotta' : 'bg-primary-brown'} opacity-20 scale-150`} />
                    <div className={`relative px-5 py-2.5 rounded-full text-base font-bold text-primary-white shadow-2xl border-4 border-white ${event.isPresent ? 'bg-primary-terracotta animate-pulse' : 'bg-primary-brown'}`}>
                      {event.year}
                    </div>
                  </div>

                  {/* Event card */}
                  <div
                    className={`max-w-md w-full z-20 ${isLeft ? 'mr-24' : 'ml-24'} transition-all duration-800 transform translate-y-0 opacity-100`}
                    style={{ transitionDelay: `${index * 200 + 500}ms` }}
                  >
                    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${event.isPresent ? 'ring-4 ring-primary-terracotta ring-opacity-50' : ''}`}>
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                          sizes="(max-width: 768px) 100vw, 448px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
                        {event.isPresent && (
                          <div className="absolute top-4 right-4 bg-primary-terracotta text-white px-4 py-1.5 rounded-full text-sm font-bold animate-pulse shadow-lg">
                            {t('timeline.today')}
                          </div>
                        )}
                      </div>
                      <div className="p-7">
                        <h3 className="font-display text-2xl font-semibold text-primary-dark mb-3">{event.title}</h3>
                        <p className="text-primary-gray font-body text-base leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-24 transition-all duration-1000 ${scrollProgress > 0.8 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-primary-dark font-body text-lg mb-6">{t('timeline.finalText')}</p>
          <button
            onClick={() => document.getElementById('experiencies')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-brown text-primary-white px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors transform hover:scale-105 shadow-lg"
          >
            {t('timeline.cta')}
          </button>
        </div>
      </div>
    </section>
  )
}
