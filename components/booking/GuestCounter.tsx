'use client'

import { useLanguage } from '@/hooks/useLanguage'

interface GuestCounterProps {
  guests: number
  onGuestsChange: (n: number) => void
  min?: number
  max?: number
}

export default function GuestCounter({ guests, onGuestsChange, min = 1, max = 10 }: GuestCounterProps) {
  const { t } = useLanguage()

  return (
    <div>
      <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
        {t('reservar.guests.title')}
      </h4>
      <div className="bg-white rounded-xl p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-primary-dark">{t('reservar.guests.label')}</p>
            <p className="text-sm text-primary-gray">{t('reservar.guests.max')}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onGuestsChange(Math.max(min, guests - 1))}
              className="w-10 h-10 bg-primary-brown text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors font-bold"
            >
              −
            </button>
            <span className="font-display text-2xl font-semibold text-primary-dark w-10 text-center">
              {guests}
            </span>
            <button
              onClick={() => onGuestsChange(Math.min(max, guests + 1))}
              className="w-10 h-10 bg-primary-brown text-white rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors font-bold"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
