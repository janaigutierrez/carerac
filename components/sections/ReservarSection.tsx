'use client'

import { useState, useCallback, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { useInView } from 'react-intersection-observer'
import { AlertCircle } from 'lucide-react'
import { format } from 'date-fns'
import { parseISO, isSameDay } from 'date-fns'
import emailjs from '@emailjs/browser'

import BookingCalendar from '../booking/BookingCalendar'
import ExperienceSelector from '../booking/ExperienceSelector'
import GuestCounter from '../booking/GuestCounter'
import BookingForm from '../booking/BookingForm'
import type { FormData } from '../booking/BookingForm'
import BookingConfirmation from '../booking/BookingConfirmation'
import ContactCards from '../booking/ContactCards'

export default function ReservarSection() {
  const { t } = useLanguage()
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  // Form state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState(2)
  const [selectedExperience, setSelectedExperience] = useState('')
  const [formData, setFormData] = useState<FormData>({ name: '', lastname: '', email: '', phone: '', comments: '' })

  // Submit state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Calendar state
  const [occupiedDates, setOccupiedDates] = useState<Date[]>([])
  const [calendarLoading, setCalendarLoading] = useState(true)
  const [calendarError, setCalendarError] = useState<string | null>(null)

  // Fetch calendar availability from our API route (keys are server-side)
  useEffect(() => {
    async function fetchCalendar() {
      try {
        setCalendarLoading(true)
        const res = await fetch('/api/calendar')
        if (!res.ok) throw new Error('Calendar fetch failed')
        const data = await res.json()
        setOccupiedDates((data.occupiedDates || []).map((d: string) => parseISO(d)))
      } catch {
        setCalendarError(t('reservar.calendar.error'))
      } finally {
        setCalendarLoading(false)
      }
    }
    fetchCalendar()
  }, [t])

  const isDateOccupied = useCallback((date: Date) => {
    return occupiedDates.some(d => isSameDay(d, date))
  }, [occupiedDates])

  const isFormValid = !!(selectedDate && selectedExperience && formData.name && formData.email && formData.phone)

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!isFormValid || !selectedDate) {
      setSubmitError(t('reservar.form.requiredFields'))
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitError(t('reservar.form.invalidEmail'))
      return
    }
    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (phoneDigits.length < 6) {
      setSubmitError(t('reservar.form.invalidPhone'))
      return
    }
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name + (formData.lastname ? ' ' + formData.lastname : ''),
          email: formData.email,
          phone: formData.phone,
          date: format(selectedDate, 'yyyy-MM-dd'),
          guests,
          experience: selectedExperience,
          comments: formData.comments,
        }),
      })

      if (!res.ok) throw new Error('Booking failed')

      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

      if (serviceId && templateId && publicKey) {
        try {
          await emailjs.send(
            serviceId,
            templateId,
            {
              name: formData.name + (formData.lastname ? ' ' + formData.lastname : ''),
              email: formData.email,
              phone: formData.phone,
              checkIn: format(selectedDate, 'dd/MM/yyyy'),
              checkOut: format(selectedDate, 'dd/MM/yyyy'),
              guests: String(guests),
              message: `Experiencia: ${selectedExperience}\n\nComentaris: ${formData.comments || 'Cap'}`,
            },
            { publicKey }
          )
        } catch (emailErr) {
          console.error('EmailJS notification failed:', emailErr)
        }
      }

      setSubmitSuccess(true)
    } catch {
      setSubmitError(t('reservar.form.errorMessage'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewReservation = () => {
    setSubmitSuccess(false)
    setSelectedDate(null)
    setGuests(2)
    setSelectedExperience('')
    setFormData({ name: '', lastname: '', email: '', phone: '', comments: '' })
    setSubmitError(null)
  }

  if (submitSuccess && selectedDate) {
    return (
      <BookingConfirmation
        selectedDate={selectedDate}
        guests={guests}
        experienceTitle={t(`experiencies.${selectedExperience}.title`)}
        onNewReservation={handleNewReservation}
      />
    )
  }

  return (
    <section id="reservar" ref={ref} className="py-20 bg-primary-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-4 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {t('reservar.title')}
          </h2>
          <p className="text-primary-gray font-body text-lg max-w-2xl mx-auto">{t('reservar.subtitle')}</p>
        </div>

        {calendarError && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start space-x-3">
            <AlertCircle size={20} className="text-yellow-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">{calendarError}</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className={`transition-all duration-1000 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <BookingCalendar selectedDate={selectedDate} onSelectDate={setSelectedDate} isDateOccupied={isDateOccupied} isLoading={calendarLoading} />
          </div>

          <div className={`space-y-6 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: '200ms' }}>
            <ExperienceSelector selectedExperience={selectedExperience} onSelectExperience={setSelectedExperience} />
            <GuestCounter guests={guests} onGuestsChange={setGuests} />
            <BookingForm formData={formData} onInputChange={handleInputChange} onSubmit={handleSubmit} isSubmitting={isSubmitting} submitError={submitError} isFormValid={isFormValid} />
          </div>
        </div>

        <ContactCards
          className={`mt-12 transition-all duration-1000 transform ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        />
      </div>
    </section>
  )
}
