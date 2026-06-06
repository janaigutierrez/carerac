'use client'

import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { useInView } from 'react-intersection-observer'
import { Clock, Plus } from 'lucide-react'
import Image from 'next/image'
import { EXPERIENCES } from '@/lib/data/experiences'
import type { ExperienceId, ExperienceConfig } from '@/lib/data/experiences'
import ExperienceModal from '../experiences/ExperienceModal'

export default function ExperiencesSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const [openId, setOpenId] = useState<ExperienceId | null>(null)

  const openExperience = (exp: ExperienceConfig) => setOpenId(exp.id)
  const close = () => setOpenId(null)
  const openExperienceConfig = openId ? EXPERIENCES.find(e => e.id === openId) : null

  return (
    <section id="experiencies" ref={ref} className="py-24 bg-primary-stone/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {t('experiencies.title')}
          </h2>
          <p className={`text-primary-gray font-body text-lg max-w-2xl mx-auto transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            {t('experiencies.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {EXPERIENCES.map((exp, index) => {
            const title = t(`experiencies.${exp.id}.title`)
            const duration = t(`experiencies.${exp.id}.duration`)
            return (
              <button
                key={exp.id}
                onClick={() => openExperience(exp)}
                className={`group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 text-left ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="relative aspect-[4/5] lg:aspect-[3/4]">
                  <Image
                    src={exp.image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/30 to-transparent" />
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10 text-primary-white">
                  <h3 className="font-display text-3xl lg:text-4xl font-semibold mb-3 leading-tight">
                    {title}
                  </h3>
                  <div className="flex items-center gap-2 text-primary-stone mb-6">
                    <Clock size={18} />
                    <span className="font-body text-sm">{duration}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 bg-primary-white/10 backdrop-blur-sm border border-primary-white/30 px-5 py-2.5 rounded-full text-sm font-medium w-fit group-hover:bg-primary-white group-hover:text-primary-dark transition-all">
                    <Plus size={16} />
                    <span>{t('experiencies.moreInfo')}</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-primary-dark/80 font-body text-base mb-6">{t('experiencies.adaptedText')}</p>
          <button
            onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-brown text-primary-white px-8 py-4 rounded-full font-medium hover:bg-primary-dark transition-all shadow-lg"
          >
            {t('experiencies.bookCta')}
          </button>
        </div>
      </div>

      <ExperienceModal
        open={openId !== null}
        experienceId={openId}
        image={openExperienceConfig?.image || ''}
        onClose={close}
      />
    </section>
  )
}
