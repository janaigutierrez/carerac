'use client'

import { Phone, Mail, Clock } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import type { LucideIcon } from 'lucide-react'

interface ContactCardsProps {
  className?: string
  style?: React.CSSProperties
}

export default function ContactCards({ className = '', style }: ContactCardsProps) {
  const { t } = useLanguage()

  const cards: { icon: LucideIcon; title: string; content: string; subContent?: string }[] = [
    { icon: Phone, title: t('reservar.contact.call'), content: '+34 XXX XXX XXX' },
    { icon: Mail, title: t('reservar.contact.email'), content: 'info@cancarerac.cat' },
    { icon: Clock, title: t('reservar.contact.schedule'), content: t('reservar.contact.scheduleDays'), subContent: t('reservar.contact.scheduleHours') },
  ]

  return (
    <div className={className} style={style}>
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className="bg-primary-stone/20 rounded-xl p-6 text-center">
              <Icon size={32} className="text-primary-brown mx-auto mb-3" />
              <h5 className="font-display font-semibold text-primary-dark mb-2">{card.title}</h5>
              <p className="text-primary-gray">{card.content}</p>
              {card.subContent && <p className="text-primary-gray text-sm">{card.subContent}</p>}
            </div>
          )
        })}
      </div>
      <p className="text-center text-primary-gray text-sm mt-6">{t('reservar.contact.response')}</p>
    </div>
  )
}
