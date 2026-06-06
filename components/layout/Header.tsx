'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import type { LanguageCode } from '@/lib/data/locales/types'
import Logo from '../Logo'

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'ca', label: 'CAT' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

type NavItem = { id: string; label: string; type: 'scroll' | 'route' }

export default function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentLanguage, changeLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (item: NavItem) => {
    setIsMobileMenuOpen(false)
    if (item.type === 'route') {
      router.push(`/${item.id}`)
    } else {
      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const leftItems: NavItem[] = [
    { id: 'espai', label: t('nav.espai'), type: 'scroll' },
    { id: 'timeline', label: t('nav.timeline'), type: 'scroll' },
    { id: 'galeria', label: t('nav.galeria'), type: 'route' },
  ]
  const rightItems: NavItem[] = [
    { id: 'experiencies', label: t('nav.experiencies'), type: 'scroll' },
    { id: 'ubicacio', label: t('nav.ubicacio'), type: 'scroll' },
    { id: 'reservar', label: t('nav.reservar'), type: 'scroll' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-primary-white/95 backdrop-blur-md shadow-md'
          : 'bg-primary-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16 lg:h-20 gap-4">
          <nav className="hidden lg:flex justify-end items-center gap-7">
            {leftItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="text-primary-dark hover:text-primary-brown transition-colors font-medium text-sm tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleNavClick({ id: 'hero', label: '', type: 'scroll' })}
            className="flex-shrink-0 hover:scale-105 transition-transform duration-300 focus:outline-none rounded-lg p-1 mx-auto"
            aria-label="Carerac"
          >
            <Logo variant="full" size="lg" />
          </button>

          <div className="hidden lg:flex justify-start items-center gap-7">
            <nav className="flex items-center gap-7">
              {rightItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="text-primary-dark hover:text-primary-brown transition-colors font-medium text-sm tracking-wide"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="ml-auto flex gap-1">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-1.5 py-0.5 text-[10px] font-medium rounded transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-primary-brown text-primary-white'
                      : 'text-primary-gray hover:text-primary-dark'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:hidden col-start-3 flex justify-end items-center gap-3">
            <div className="hidden sm:flex gap-1">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                    currentLanguage === lang.code
                      ? 'bg-primary-brown text-primary-white'
                      : 'text-primary-gray hover:text-primary-dark'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-primary-dark hover:text-primary-brown transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-primary-white/95 backdrop-blur-md border-t border-primary-stone">
            <div className="px-4 py-6 space-y-3">
              {[...leftItems, ...rightItems].map(item => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className="block w-full text-left text-primary-dark hover:text-primary-brown transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-2 pt-4 border-t border-primary-stone">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-3 py-1 text-sm font-medium rounded transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-primary-brown text-primary-white'
                        : 'text-primary-gray hover:text-primary-dark'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
