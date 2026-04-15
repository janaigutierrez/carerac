'use client'

import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { content } from '@/lib/data/locales'
import type { Locale, LanguageCode } from '@/lib/data/locales/types'

interface LanguageContextValue {
  currentLanguage: LanguageCode
  changeLanguage: (lang: LanguageCode) => void
  t: <T = string>(key: string) => T
  locale: Locale
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

const STORAGE_KEY = 'carerac-language'
const VALID_LANGS: LanguageCode[] = ['ca', 'es', 'en']

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('ca')

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    if (saved && VALID_LANGS.includes(saved)) {
      setCurrentLanguage(saved)
    }
  }, [])

  const changeLanguage = useCallback((lang: LanguageCode) => {
    if (VALID_LANGS.includes(lang)) {
      setCurrentLanguage(lang)
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }, [])

  const t = useCallback(<T = string,>(key: string): T => {
    const keys = key.split('.')
    let result: unknown = content[currentLanguage]

    for (const k of keys) {
      if (result && typeof result === 'object') {
        result = (result as Record<string, unknown>)[k]
      } else {
        return key as unknown as T
      }
    }

    return (result ?? key) as T
  }, [currentLanguage])

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      locale: content[currentLanguage],
    }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
