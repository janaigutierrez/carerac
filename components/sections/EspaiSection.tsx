'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import { useInView } from 'react-intersection-observer'

export default function EspaiSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollY, setScrollY] = useState(0)
  const { t } = useLanguage()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const parallaxOffset = scrollY * 0.3

  const spaces = [
    { id: 'hort', title: t('espai.spaces.hort.title'), description: t('espai.spaces.hort.description'), image: '/images/gallery/hort.webp' },
    { id: 'piscina', title: t('espai.spaces.piscina.title'), description: t('espai.spaces.piscina.description'), image: '/images/gallery/piscina.webp' },
    { id: 'cuina', title: t('espai.spaces.cuina.title'), description: t('espai.spaces.cuina.description'), image: '/images/gallery/cuina.webp' },
    { id: 'figuera', title: t('espai.spaces.figuera.title'), description: t('espai.spaces.figuera.description'), image: '/images/gallery/figuera.webp' },
  ]

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % spaces.length)
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + spaces.length) % spaces.length)

  const getVisibleCards = () => {
    const cards = []
    for (let i = -1; i <= 1; i++) {
      const index = (currentSlide + i + spaces.length) % spaces.length
      cards.push({ ...spaces[index], position: i, index })
    }
    return cards
  }

  return (
    <section
      id="espai"
      ref={ref}
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(rgba(250,250,250,0.90), rgba(250,250,250,0.92)), url('/images/gallery/espais.webp')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Arcades Transition */}
      <div id="arcades" className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[120%]"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1566479179817-5c3a8e494f2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Arcades SVG mask */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <mask id="arcades-mask">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                <ellipse cx="16.66" cy="100" rx="14" ry="25" fill="black" />
                <ellipse cx="50" cy="100" rx="14" ry="25" fill="black" />
                <ellipse cx="83.33" cy="100" rx="14" ry="25" fill="black" />
              </mask>
            </defs>
            <rect x="0" y="0" width="100" height="100" fill="#FAFAF7" mask="url(#arcades-mask)" />
          </svg>
        </div>

        {/* Text overlay */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="text-center text-primary-dark px-4">
            <p className="text-sm font-body tracking-wider uppercase mb-4 text-primary-brown">
              {t('arcades.title')}
            </p>
            <h2 className="font-display text-3xl lg:text-5xl font-light leading-tight">
              {t('arcades.subtitle')}
            </h2>
          </div>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {t('espai.title')}
            </h2>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="flex items-center justify-center min-h-[560px] relative px-2 sm:px-8">
              {getVisibleCards().map((space, idx) => {
                const isCenter = space.position === 0
                let transform = 'translateX(0px) scale(1)'
                let opacity = 1
                let zIndex = 10

                if (space.position === -1) {
                  transform = 'translateX(-420px) scale(0.78)'; opacity = 0.35; zIndex = 5
                } else if (space.position === 1) {
                  transform = 'translateX(420px) scale(0.78)'; opacity = 0.35; zIndex = 5
                } else {
                  zIndex = 20
                }

                return (
                  <div
                    key={`${space.id}-${idx}`}
                    className={`absolute w-full max-w-2xl transition-all duration-500 ease-out ${!isCenter ? 'pointer-events-none' : 'cursor-pointer'}`}
                    style={{ transform, opacity, zIndex }}
                  >
                    <div className="bg-white shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={space.image}
                          alt={space.title}
                          fill
                          className={`object-cover transition-all duration-500 ${isCenter ? 'scale-100' : 'scale-110 blur-sm'}`}
                          sizes="(max-width: 768px) 100vw, 700px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 via-transparent to-transparent" />
                      </div>
                      <div className="p-8">
                        <h3 className="font-display text-2xl font-semibold text-primary-dark mb-3">{space.title}</h3>
                        <p className={`text-primary-gray font-body text-sm leading-relaxed transition-opacity duration-300 ${isCenter ? 'opacity-100' : 'opacity-60'}`}>
                          {space.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              aria-label="Previous"
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-primary-dark/70 hover:text-primary-brown transition-colors z-30 p-2"
            >
              <ChevronLeft size={36} strokeWidth={1.5} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next"
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-primary-dark/70 hover:text-primary-brown transition-colors z-30 p-2"
            >
              <ChevronRight size={36} strokeWidth={1.5} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-12 space-x-3">
            {spaces.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${currentSlide === index ? 'w-8 h-3 bg-primary-brown rounded-full' : 'w-3 h-3 bg-primary-gray/40 rounded-full hover:bg-primary-brown/50'}`}
              />
            ))}
          </div>

          <div className={`text-center mt-12 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            <p className="text-primary-gray font-body max-w-2xl mx-auto">{t('espai.subtitle')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
