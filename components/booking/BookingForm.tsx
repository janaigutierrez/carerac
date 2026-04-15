'use client'

import { AlertCircle } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export interface FormData {
  name: string
  lastname: string
  email: string
  phone: string
  comments: string
}

interface BookingFormProps {
  formData: FormData
  onInputChange: (name: string, value: string) => void
  onSubmit: () => void
  isSubmitting: boolean
  submitError: string | null
  isFormValid: boolean
}

export default function BookingForm({ formData, onInputChange, onSubmit, isSubmitting, submitError, isFormValid }: BookingFormProps) {
  const { t } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onInputChange(e.target.name, e.target.value)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h4 className="font-display text-lg font-semibold text-primary-dark mb-4">{t('reservar.form.title')}</h4>

      {submitError && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
          <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-primary-dark mb-1">{t('reservar.form.name')} *</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder={t('reservar.form.namePlaceholder')}
              className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all" />
          </div>
          <div>
            <label className="block text-xs font-medium text-primary-dark mb-1">{t('reservar.form.lastname')}</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} placeholder={t('reservar.form.lastnamePlaceholder')}
              className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-primary-dark mb-1">{t('reservar.form.email')} *</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={t('reservar.form.emailPlaceholder')}
            className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all" />
        </div>

        <div>
          <label className="block text-xs font-medium text-primary-dark mb-1">{t('reservar.form.phone')} *</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={t('reservar.form.phonePlaceholder')}
            className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all" />
        </div>

        <div>
          <label className="block text-xs font-medium text-primary-dark mb-1">{t('reservar.form.comments')}</label>
          <textarea name="comments" value={formData.comments} onChange={handleChange} placeholder={t('reservar.form.commentsPlaceholder')} rows={3}
            className="w-full px-3 py-2 text-sm border border-primary-gray/20 rounded-lg focus:ring-2 focus:ring-primary-brown focus:border-transparent transition-all resize-none" />
        </div>

        <button
          onClick={onSubmit}
          disabled={!isFormValid || isSubmitting}
          className="w-full bg-primary-brown text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center space-x-2"
        >
          {isSubmitting ? (
            <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" /><span>{t('reservar.form.sending')}</span></>
          ) : (
            <span>{t('reservar.form.submit')}</span>
          )}
        </button>

        <p className="text-center text-xs text-primary-gray">{t('reservar.form.required')}</p>
      </div>
    </div>
  )
}
