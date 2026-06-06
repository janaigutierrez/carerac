'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import Logo from './Logo'

interface LoadingScreenProps {
  onComplete?: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    let target = 30
    let raf: number | null = null
    let done = false

    const finish = () => {
      if (done) return
      done = true
      target = 100
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    const fallback = setTimeout(finish, 2500)

    const tick = () => {
      setProgress(prev => {
        const next = prev + Math.max(0.4, (target - prev) * 0.06)
        if (next >= 100) {
          setFading(true)
          setTimeout(() => onComplete?.(), 500)
          return 100
        }
        if (!done && target < 90) target = Math.min(90, target + 0.3)
        return next
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      clearTimeout(fallback)
      window.removeEventListener('load', finish)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 bg-primary-white z-50 flex flex-col items-center justify-center transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <div className="relative mb-8">
        <div
          className="absolute inset-0 bg-primary-stone/30 rounded-full blur-xl scale-150 animate-pulse"
          style={{ animationDuration: '3s' }}
        />
        <div
          className="relative opacity-0"
          style={{ animation: 'loadingFadeIn 0.6s ease-out 0.2s forwards' }}
        >
          <Logo variant="icon" size="xxl" />
        </div>
      </div>

      <div
        className="mb-4 opacity-0"
        style={{ animation: 'loadingFadeIn 0.6s ease-out 0.6s forwards' }}
      >
        <h1
          className="font-display text-3xl lg:text-4xl font-bold text-primary-dark text-center"
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            width: '0',
            borderRight: '3px solid #8B6F47',
            animation: 'typing 1.2s steps(7, end) 0.8s forwards, blink 1s step-end infinite 0.8s',
          }}
        >
          Carerac
        </h1>
      </div>

      <p
        className="text-primary-gray font-body text-sm mb-8 opacity-0"
        style={{ animation: 'loadingFadeIn 0.6s ease-out 2s forwards' }}
      >
        {t('loading.subtitle')}
      </p>

      <div className="w-64 h-1 bg-primary-stone/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-brown to-primary-terracotta transition-all duration-200 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      <span className="text-primary-gray font-body text-xs mt-3 tabular-nums">
        {Math.round(progress)}%
      </span>
    </div>
  )
}
