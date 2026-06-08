'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface DayObj {
  day: number
  month: number
  year: number
  isCurrentMonth: boolean
  isDisabled: boolean
  isOccupied?: boolean
  isSelected?: boolean
}

interface BookingCalendarProps {
  selectedDate: Date | null
  onSelectDate: (date: Date) => void
  isDateOccupied: (date: Date) => boolean
  isLoading: boolean
}

export default function BookingCalendar({ selectedDate, onSelectDate, isDateOccupied, isLoading }: BookingCalendarProps) {
  const { t, currentLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(0)
  const [currentYear, setCurrentYear] = useState(2026)

  useEffect(() => {
    const now = new Date()
    setCurrentMonth(now.getMonth())
    setCurrentYear(now.getFullYear())
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="bg-white rounded-xl p-6 shadow-xl min-h-[400px] h-full" />
  }

  const months = t<string[]>('reservar.calendar.months')
  const weekDays = t<string[]>('reservar.calendar.weekDays')

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate()
  const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay()

  const generateCalendarDays = (): DayObj[] => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const startDay = firstDay === 0 ? 6 : firstDay - 1
    const days: DayObj[] = []

    for (let i = startDay - 1; i >= 0; i--) {
      const pm = currentMonth === 0 ? 11 : currentMonth - 1
      const py = currentMonth === 0 ? currentYear - 1 : currentYear
      days.push({ day: getDaysInMonth(pm, py) - i, month: pm, year: py, isCurrentMonth: false, isDisabled: true })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const isPast = date < today
      const isOccupied = isDateOccupied(date)

      days.push({
        day, month: currentMonth, year: currentYear, isCurrentMonth: true,
        isDisabled: isPast || isOccupied, isOccupied,
        isSelected: selectedDate ? selectedDate.getDate() === day && selectedDate.getMonth() === currentMonth && selectedDate.getFullYear() === currentYear : false,
      })
    }

    const remaining = 42 - days.length
    for (let day = 1; day <= remaining; day++) {
      const nm = currentMonth === 11 ? 0 : currentMonth + 1
      const ny = currentMonth === 11 ? currentYear + 1 : currentYear
      days.push({ day, month: nm, year: ny, isCurrentMonth: false, isDisabled: true })
    }
    return days
  }

  const navigateMonth = (dir: 'prev' | 'next') => {
    if (dir === 'prev') {
      if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
      else setCurrentMonth(m => m - 1)
    } else {
      if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
      else setCurrentMonth(m => m + 1)
    }
  }

  const handleSelectDate = (d: DayObj) => {
    if (!d.isDisabled && d.isCurrentMonth) onSelectDate(new Date(d.year, d.month, d.day))
  }

  const locale = currentLanguage === 'ca' ? 'ca-ES' : currentLanguage === 'es' ? 'es-ES' : 'en-US'

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => navigateMonth('prev')} className="p-2 hover:bg-primary-stone/30 rounded-lg transition-colors">
          <ChevronLeft size={20} className="text-primary-dark" />
        </button>
        <h3 className="font-display text-xl font-semibold text-primary-dark">{months[currentMonth]} {currentYear}</h3>
        <button onClick={() => navigateMonth('next')} className="p-2 hover:bg-primary-stone/30 rounded-lg transition-colors">
          <ChevronRight size={20} className="text-primary-dark" />
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-xl mb-6 relative flex-grow flex flex-col">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-brown mx-auto mb-3" />
              <p className="text-sm text-primary-gray">{t('reservar.calendar.loading')}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-7 gap-1 mb-4">
          {weekDays.map((day, i) => (
            <div key={`${currentLanguage}-${day}-${i}`} className="text-center text-sm font-medium text-primary-gray py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays().map((d, i) => (
            <button
              key={i}
              onClick={() => handleSelectDate(d)}
              disabled={d.isDisabled}
              className={`w-full aspect-square text-sm font-medium rounded-lg transition-all duration-200 ${
                d.isCurrentMonth
                  ? d.isDisabled
                    ? d.isOccupied ? 'bg-red-100 text-red-400 cursor-not-allowed line-through' : 'text-primary-gray/30 cursor-not-allowed'
                    : d.isSelected ? 'bg-primary-brown text-white shadow-md' : 'text-primary-dark hover:bg-primary-straw/30'
                  : 'text-primary-gray/20 cursor-not-allowed'
              }`}
            >
              {d.day}
            </button>
          ))}
        </div>

        <div className="flex-grow" />

        <div className="flex items-center justify-center space-x-6 mt-6 text-xs">
          <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-primary-gray/30 rounded" /><span className="text-primary-gray">{t('reservar.calendar.legend.past')}</span></div>
          <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-red-100 rounded" /><span className="text-primary-gray">{t('reservar.calendar.legend.unavailable')}</span></div>
          <div className="flex items-center space-x-2"><div className="w-3 h-3 bg-primary-brown rounded" /><span className="text-primary-gray">{t('reservar.calendar.legend.selected')}</span></div>
        </div>
      </div>

      {selectedDate && (
        <div className="p-4 bg-primary-straw/20 rounded-xl">
          <p className="font-medium text-primary-dark">
            📅 {t('reservar.calendar.selectedDate')}{' '}
            {selectedDate.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  )
}
