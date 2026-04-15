'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-primary-dark text-primary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-bold mb-4">Can Carerac</h3>
            <p className="text-primary-white/80 font-body mb-6 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-primary-white/10 p-2 rounded-full hover:bg-primary-brown transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-primary-white/10 p-2 rounded-full hover:bg-primary-brown transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="mailto:info@cancarerac.cat" className="bg-primary-white/10 p-2 rounded-full hover:bg-primary-brown transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t('footer.sections.experiences.title')}
            </h4>
            <ul className="space-y-2">
              {(['gastronomic', 'cultural', 'space', 'location'] as const).map(link => (
                <li key={link}>
                  <button
                    onClick={() => scrollToSection(link === 'space' ? 'espai' : link === 'location' ? 'ubicacio' : 'experiencies')}
                    className="text-primary-white/80 hover:text-primary-straw transition-colors font-body"
                  >
                    {t(`footer.sections.experiences.links.${link}`)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t('footer.sections.information.title')}
            </h4>
            <ul className="space-y-2">
              {(['about', 'faq', 'blog'] as const).map(link => (
                <li key={link}>
                  <a href="#" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body">
                    {t(`footer.sections.information.links.${link}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              {t('footer.sections.contact.title')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-primary-straw mt-1 flex-shrink-0" />
                <span className="text-primary-white/80 font-body text-sm whitespace-pre-line">
                  {t('footer.sections.contact.address')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-primary-straw flex-shrink-0" />
                <a href="tel:+34XXXXXXXXX" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body text-sm">
                  {t('footer.sections.contact.phone')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-primary-straw flex-shrink-0" />
                <a href="mailto:info@cancarerac.cat" className="text-primary-white/80 hover:text-primary-straw transition-colors font-body text-sm">
                  {t('footer.sections.contact.email')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-white/60 font-body text-sm">
              {t('footer.copyright')}
            </p>
            <div className="flex space-x-6">
              {(['legal', 'privacy', 'cookies', 'terms'] as const).map(link => (
                <a key={link} href="#" className="text-primary-white/60 hover:text-primary-straw transition-colors font-body text-sm">
                  {t(`footer.sections.legal.${link}`)}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
