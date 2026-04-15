'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import type { LanguageCode } from '@/lib/data/locales/types'
import Logo from '../Logo'

const languages: { code: LanguageCode; label: string }[] = [
  { code: 'ca', label: 'CAT' },
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { currentLanguage, changeLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'espai', label: t('nav.espai') },
    { id: 'timeline', label: t('nav.timeline') },
    { id: 'experiencies', label: t('nav.experiencies') },
    { id: 'ubicacio', label: t('nav.ubicacio') },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all-smooth ${
        isScrolled ? 'bg-primary-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="flex-shrink-0 hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-primary-brown focus:ring-opacity-50 rounded-lg p-1"
          >
            <Logo variant="full" size="xl" className="drop-shadow-lg" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-primary-dark hover:text-primary-brown transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('reservar')}
              className="bg-primary-brown text-primary-white px-6 py-2 rounded-full hover:bg-primary-dark transition-colors font-medium"
            >
              {t('nav.reservar')}
            </button>
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex space-x-2">
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
              className="lg:hidden p-2 text-primary-dark hover:text-primary-brown transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-primary-white/95 backdrop-blur-md border-t border-primary-stone">
            <div className="px-4 py-6 space-y-4">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left text-primary-dark hover:text-primary-brown transition-colors font-medium py-2"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('reservar')}
                className="block w-full text-left bg-primary-brown text-primary-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors font-medium mt-4"
              >
                {t('nav.reservar')}
              </button>

              <div className="flex space-x-2 pt-4 border-t border-primary-stone">
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
