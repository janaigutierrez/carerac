'use client'

import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const scrollToNext = () => {
    document.getElementById('arcades')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/hero.webp"
          alt="Can Carerac - Masia historica"
          fill
          className="object-cover"
          style={{ filter: 'brightness(1.2) blur(1px)' }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1
          className={`mb-6 flex justify-center transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="sr-only">{t('hero.title')}</span>
          <Image
            src="/images/logo/logo-hero.png"
            alt={t('hero.title')}
            width={900}
            height={220}
            priority
            className="w-[280px] sm:w-[400px] lg:w-[560px] h-auto"
            style={{ filter: 'brightness(0) invert(1) drop-shadow(0 4px 16px rgba(0,0,0,0.35))' }}
          />
        </h1>

        <p
          className={`font-body text-lg sm:text-xl text-primary-white/90 mb-8 max-w-2xl mx-auto transition-all duration-1000 transform delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t('hero.subtitle')}
        </p>

        <button
          onClick={scrollToNext}
          className={`inline-flex items-center px-8 py-4 bg-primary-brown text-primary-white font-medium rounded-full hover:bg-primary-dark transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {t('hero.cta')}
        </button>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary-white/80 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center space-y-2 hover:text-primary-straw transition-colors group"
        >
          <span className="text-sm font-body">{t('hero.scroll')}</span>
          <ChevronDown size={20} className="animate-bounce group-hover:animate-none" />
        </button>
      </div>
    </section>
  )
}
