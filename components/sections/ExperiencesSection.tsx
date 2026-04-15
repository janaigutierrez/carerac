'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { useInView } from 'react-intersection-observer'
import { Clock, Users } from 'lucide-react'
import Image from 'next/image'
import { EXPERIENCES } from '@/lib/data/experiences'

export default function ExperiencesSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="experiencies" ref={ref} className="py-20 bg-primary-stone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {t('experiencies.title')}
          </h2>
          <p className={`text-primary-gray font-body text-lg max-w-2xl mx-auto transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            {t('experiencies.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp, index) => {
            const activities = t<string[]>(`experiencies.${exp.id}.activities`)
            return (
              <div
                key={exp.id}
                className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-1000 transform hover:shadow-3xl hover:-translate-y-2 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="absolute inset-0">
                  <Image src={exp.image} alt={t(`experiencies.${exp.id}.title`)} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${exp.color} opacity-85`} />
                </div>

                <div className="relative z-10 flex flex-col min-h-[500px] p-8 lg:p-10">
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-display text-3xl lg:text-4xl font-bold text-primary-white mb-4">
                        {t(`experiencies.${exp.id}.title`)}
                      </h3>
                      <div className="flex items-center text-primary-straw mb-6">
                        <Clock size={20} className="mr-2" />
                        <span className="font-medium">{t(`experiencies.${exp.id}.duration`)}</span>
                      </div>
                      <div className="space-y-3 mb-8">
                        {activities.map((activity, i) => (
                          <div key={i} className="flex items-start text-primary-white/90">
                            <span className="text-primary-straw mr-3 mt-1 text-xl">&bull;</span>
                            <span className="font-body text-base">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-primary-white/20 pt-6">
                      <div className="flex items-center text-primary-white">
                        <Users size={32} className="text-primary-straw mr-3" />
                        <div>
                          <p className="font-medium text-sm">{t('experiencies.experience')}</p>
                          <p className="text-primary-white/80 text-xs">{t('experiencies.personalized')}</p>
                        </div>
                      </div>
                      <button className="bg-primary-straw text-primary-dark px-6 py-3 rounded-lg font-medium hover:bg-primary-white transition-all transform hover:scale-105 shadow-lg">
                        {t('experiencies.moreInfo')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className={`text-center mt-16 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
          <p className="text-primary-dark/80 font-body text-lg mb-6">{t('experiencies.adaptedText')}</p>
          <button
            onClick={() => document.getElementById('reservar')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-primary-brown text-primary-white px-8 py-4 rounded-lg font-medium hover:bg-primary-dark transition-all transform hover:scale-105 shadow-lg"
          >
            {t('experiencies.bookCta')}
          </button>
        </div>
      </div>
    </section>
  )
}
