'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Logo from './Logo'

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const { t } = useLanguage()

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1.5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const opacity = progress > 90 ? (100 - progress) / 10 : 1

  return (
    <div
      className="fixed inset-0 bg-primary-white z-50 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity }}
    >
      {/* Logo Container */}
      <div className="relative mb-8">
        <div
          className="absolute inset-0 bg-primary-straw/10 rounded-full blur-xl scale-150 animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="relative opacity-0"
          style={{ animation: 'loadingFadeIn 0.8s ease-out 0.5s forwards' }}
        >
          <Logo variant="icon" size="xxl" />
        </div>
      </div>

      {/* Typing animation */}
      <div
        className="mb-4 opacity-0"
        style={{ animation: 'loadingFadeIn 0.8s ease-out 1.2s forwards' }}
      >
        <h1
          className="font-display text-3xl lg:text-4xl font-bold text-primary-dark text-center"
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '0',
            borderRight: '3px solid #8B6F47',
            animation: 'typing 2.5s steps(12, end) 1.5s forwards, blink 1s step-end infinite 1.5s',
          }}
        >
          Can Carerac
        </h1>
      </div>

      {/* Subtitle - now i18n */}
      <p
        className="text-primary-gray font-body text-sm mb-8 opacity-0"
        style={{ animation: 'loadingFadeIn 0.8s ease-out 4.5s forwards' }}
      >
        {t('loading.subtitle')}
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-1 bg-primary-stone/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-brown to-primary-terracotta transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-primary-gray font-body text-xs mt-3 tabular-nums">
        {Math.round(progress)}%
      </span>
    </div>
  )
}
