'use client'

import { useEffect } from 'react'
import { X, Clock, Users } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'
import type { ExperienceId } from '@/lib/data/experiences'

interface ExperienceModalProps {
  open: boolean
  experienceId: ExperienceId | null
  image: string
  onClose: () => void
}

export default function ExperienceModal({ open, experienceId, image, onClose }: ExperienceModalProps) {
  const { t } = useLanguage()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  if (!experienceId) return null

  const title = t(`experiencies.${experienceId}.title`)
  const duration = t(`experiencies.${experienceId}.duration`)
  const description = t(`experienceDetails.${experienceId}.description`)
  const activities = t<string[]>(`experiencies.${experienceId}.activities`)

  const handleBook = () => {
    onClose()
    setTimeout(() => {
      document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })
    }, 200)
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 py-8 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`absolute inset-0 bg-primary-dark/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
      />

      <div
        onClick={e => e.stopPropagation()}
        className={`relative bg-primary-white w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl rounded-sm transition-all duration-500 transform ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
      >
        <button
          onClick={onClose}
          aria-label={t('experienceDetails.close')}
          className="absolute top-4 right-4 z-30 bg-primary-white/90 hover:bg-primary-white text-primary-dark p-2 rounded-full shadow-lg transition-colors"
        >
          <X size={22} />
        </button>

        <div className="relative h-56 lg:h-72 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 768px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-primary-white">
            <h3 className="font-display text-3xl lg:text-4xl font-semibold mb-2">{title}</h3>
            <div className="flex items-center gap-2 text-primary-stone">
              <Clock size={18} />
              <span className="font-body text-sm">{duration}</span>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8 overflow-y-auto max-h-[calc(90vh-18rem)]">
          <p className="text-primary-dark/90 font-body text-base leading-relaxed mb-6">
            {description}
          </p>

          <ul className="space-y-2 mb-8">
            {activities.map((activity, i) => (
              <li key={i} className="flex items-start gap-3 text-primary-dark/80">
                <span className="text-primary-brown mt-1 flex-shrink-0">&bull;</span>
                <span className="font-body text-sm leading-relaxed">{activity}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-6 border-t border-primary-stone">
            <div className="flex items-center gap-2 text-primary-gray text-xs">
              <Users size={16} />
              <span>{t('experiencies.personalized')}</span>
            </div>
            <button
              onClick={handleBook}
              className="bg-primary-brown text-primary-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors font-medium text-sm"
            >
              {t('experienceDetails.bookNow')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
