'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { EXPERIENCES } from '@/lib/data/experiences'

interface ExperienceSelectorProps {
  selectedExperience: string
  onSelectExperience: (id: string) => void
}

export default function ExperienceSelector({ selectedExperience, onSelectExperience }: ExperienceSelectorProps) {
  const { t } = useLanguage()

  return (
    <div>
      <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">
        {t('reservar.experienceSelector.title')}
      </h4>
      <div className="grid grid-cols-2 gap-3">
        {EXPERIENCES.map(exp => {
          const Icon = exp.icon
          const isSelected = selectedExperience === exp.id
          return (
            <button
              key={exp.id}
              onClick={() => onSelectExperience(exp.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                isSelected
                  ? 'border-primary-brown bg-primary-brown/10 shadow-lg scale-105'
                  : 'border-primary-gray/20 bg-white hover:border-primary-brown/50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${exp.color}`}>
                  <Icon size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-display font-semibold text-primary-dark text-sm leading-tight">
                    {t(`experiencies.${exp.id}.title`)}
                  </p>
                  {isSelected && <p className="text-xs text-primary-brown mt-1">✓</p>}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
