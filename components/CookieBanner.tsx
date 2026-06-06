'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'

const STORAGE_KEY = 'carerac-cookies-accepted'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-50 bg-primary-white shadow-2xl border border-primary-stone rounded-lg p-5">
      <p className="text-sm text-primary-dark font-body leading-relaxed mb-4">
        {t('cookies.message')}{' '}
        <Link href="/cookies" className="text-primary-brown underline hover:text-primary-dark">
          {t('cookies.linkLabel')}
        </Link>
        .
      </p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={accept}
          className="bg-primary-brown text-primary-white px-5 py-2 rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          {t('cookies.accept')}
        </button>
      </div>
    </div>
  )
}
