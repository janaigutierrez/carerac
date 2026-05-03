'use client'

import { useEffect, useState, useCallback, useMemo } from 'react'
import { Check, X, Trash2, Plus, Mail, Phone, ChevronLeft, ChevronRight, RefreshCw, Clock, MessageCircle } from 'lucide-react'
import { formatDistanceToNow, format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isBefore, startOfDay } from 'date-fns'
import { ca } from 'date-fns/locale'
import emailjs from '@emailjs/browser'

interface Booking {
  _id: string
  name: string
  email: string
  phone: string
  date: string
  guests: number
  experience: string
  comments: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

interface BlockedDate {
  _id: string
  date: string
  reason: string
}

type Tab = 'pending' | 'approved' | 'rejected' | 'blocked'

const EXPERIENCE_LABEL: Record<string, string> = {
  gastronomica: 'Gastronòmica',
  cultural: 'Cultural',
}

const STATUS_BADGE: Record<Booking['status'], string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
}

function fmtFull(iso: string) {
  return format(new Date(iso), "EEEE d 'de' MMMM yyyy", { locale: ca })
}

function mailtoLink(b: Booking) {
  const subject = encodeURIComponent(`Can Carerac · Reserva ${fmtFull(b.date)}`)
  const body = encodeURIComponent(
    `Hola ${b.name},\n\nGràcies per la teva reserva a Can Carerac.\n\nData: ${fmtFull(b.date)}\nPersones: ${b.guests}\nExperiència: ${EXPERIENCE_LABEL[b.experience] || b.experience}\n\n— Can Carerac`
  )
  return `mailto:${b.email}?subject=${subject}&body=${body}`
}

function whatsappLink(b: Booking) {
  let digits = b.phone.replace(/\D/g, '')
  if (digits.length === 9) digits = '34' + digits
  const text = encodeURIComponent(
    `Hola ${b.name}, sóc de Can Carerac. Sobre la teva reserva del ${fmtFull(b.date)} per ${b.guests} persones...`
  )
  return `https://wa.me/${digits}?text=${text}`
}

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)
  const [tab, setTab] = useState<Tab>('pending')
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [blocked, setBlocked] = useState<BlockedDate[]>([])
  const [loading, setLoading] = useState(true)
  const [newBlockedDate, setNewBlockedDate] = useState('')
  const [newBlockedReason, setNewBlockedReason] = useState('')
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date(2026, 0, 1))

  useEffect(() => {
    setCalendarMonth(new Date())
    setMounted(true)
  }, [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    const [bookingsRes, blockedRes] = await Promise.all([
      fetch('/api/admin/bookings'),
      fetch('/api/admin/blocked-dates'),
    ])
    const bookingsData = await bookingsRes.json()
    const blockedData = await blockedRes.json()
    setAllBookings(bookingsData.bookings || [])
    setBlocked(blockedData.blocked || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    loadAll()
  }, [loadAll])

  const counts = useMemo(() => {
    const pending = allBookings.filter(b => b.status === 'pending').length
    const approved = allBookings.filter(b => b.status === 'approved').length
    const rejected = allBookings.filter(b => b.status === 'rejected').length
    const today = startOfDay(new Date())
    const next30 = new Date(today)
    next30.setDate(next30.getDate() + 30)
    const upcoming = allBookings.filter(
      b => b.status === 'approved' && new Date(b.date) >= today && new Date(b.date) <= next30
    ).length
    return { pending, approved, rejected, blocked: blocked.length, upcoming }
  }, [allBookings, blocked])

  const tabBookings = useMemo(() => {
    if (tab === 'blocked') return []
    const today = startOfDay(new Date())
    return allBookings
      .filter(b => b.status === tab)
      .sort((a, b) => {
        const da = new Date(a.date).getTime()
        const db = new Date(b.date).getTime()
        const aPast = isBefore(new Date(a.date), today)
        const bPast = isBefore(new Date(b.date), today)
        if (aPast !== bPast) return aPast ? 1 : -1
        return da - db
      })
  }, [allBookings, tab])

  const calendarDays = useMemo(() => {
    const start = startOfMonth(calendarMonth)
    const end = endOfMonth(calendarMonth)
    const days = eachDayOfInterval({ start, end })
    const approvedDates = allBookings.filter(b => b.status === 'approved').map(b => new Date(b.date))
    const blockedDates = blocked.map(b => new Date(b.date))
    return days.map(day => ({
      day,
      approved: approvedDates.some(d => isSameDay(d, day)),
      blocked: blockedDates.some(d => isSameDay(d, day)),
    }))
  }, [calendarMonth, allBookings, blocked])

  async function sendConfirmationEmail(b: Booking) {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_CONFIRMATION_TEMPLATE_ID
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    if (!serviceId || !templateId || !publicKey) return

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: b.name,
          email: b.email,
          phone: b.phone,
          checkIn: fmtFull(b.date),
          guests: String(b.guests),
          experience: EXPERIENCE_LABEL[b.experience] || b.experience,
        },
        { publicKey }
      )
    } catch (err) {
      console.error('Confirmation email failed:', err)
      alert('La reserva s\'ha aprovat però l\'email de confirmació no s\'ha pogut enviar. Contacta el client manualment.')
    }
  }

  async function updateStatus(booking: Booking, status: Booking['status']) {
    const res = await fetch(`/api/admin/bookings/${booking._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok && status === 'approved') {
      await sendConfirmationEmail(booking)
    }
    await loadAll()
  }

  async function deleteBooking(id: string) {
    if (!confirm('Eliminar aquesta reserva?')) return
    await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE' })
    await loadAll()
  }

  async function addBlockedDate(e: React.FormEvent) {
    e.preventDefault()
    if (!newBlockedDate) return
    await fetch('/api/admin/blocked-dates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date: newBlockedDate, reason: newBlockedReason }),
    })
    setNewBlockedDate('')
    setNewBlockedReason('')
    await loadAll()
  }

  async function deleteBlocked(id: string) {
    if (!confirm('Desbloquejar aquesta data?')) return
    await fetch(`/api/admin/blocked-dates/${id}`, { method: 'DELETE' })
    await loadAll()
  }

  const firstDayOfWeek = (startOfMonth(calendarMonth).getDay() + 6) % 7
  const weekdays = ['Dl', 'Dm', 'Dc', 'Dj', 'Dv', 'Ds', 'Dg']

  if (!mounted) {
    return <p className="text-primary-gray">Carregant...</p>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Pendents" value={counts.pending} color="bg-yellow-500" />
        <StatCard label="Pròximes 30 dies" value={counts.upcoming} color="bg-green-600" />
        <StatCard label="Aprovades totals" value={counts.approved} color="bg-primary-brown" />
        <StatCard label="Dates bloquejades" value={counts.blocked} color="bg-primary-gray" />
      </div>

      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-primary-dark">
            {format(calendarMonth, 'LLLL yyyy', { locale: ca })}
          </h2>
          <div className="flex items-center gap-1">
            <button onClick={() => setCalendarMonth(subMonths(calendarMonth, 1))} className="p-1.5 hover:bg-primary-stone rounded">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setCalendarMonth(new Date())} className="text-xs text-primary-gray hover:text-primary-dark px-2">
              Avui
            </button>
            <button onClick={() => setCalendarMonth(addMonths(calendarMonth, 1))} className="p-1.5 hover:bg-primary-stone rounded">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-primary-gray mb-1">
          {weekdays.map(w => <div key={w} className="py-1">{w}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`e${i}`} />)}
          {calendarDays.map(({ day, approved, blocked }) => {
            const bg = approved
              ? 'bg-green-500 text-white'
              : blocked
              ? 'bg-primary-gray text-white'
              : 'bg-primary-stone/30 text-primary-dark'
            return (
              <div
                key={day.toISOString()}
                className={`aspect-square flex items-center justify-center rounded text-sm ${bg}`}
                title={approved ? 'Reserva aprovada' : blocked ? 'Bloquejada' : ''}
              >
                {day.getDate()}
              </div>
            )
          })}
        </div>
        <div className="flex items-center gap-4 mt-3 text-xs text-primary-gray">
          <LegendDot color="bg-green-500" label="Reserva aprovada" />
          <LegendDot color="bg-primary-gray" label="Bloquejada" />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-wrap border-b border-primary-gray/20 flex-1">
          {(['pending', 'approved', 'rejected', 'blocked'] as Tab[]).map(t => {
            const count = t === 'pending' ? counts.pending : t === 'approved' ? counts.approved : t === 'rejected' ? counts.rejected : counts.blocked
            const label = t === 'pending' ? 'Pendents' : t === 'approved' ? 'Aprovades' : t === 'rejected' ? 'Rebutjades' : 'Bloquejades'
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  tab === t
                    ? 'text-primary-brown border-b-2 border-primary-brown -mb-px'
                    : 'text-primary-gray hover:text-primary-dark'
                }`}
              >
                {label}
                {count > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tab === t ? 'bg-primary-brown text-white' : 'bg-primary-gray/20 text-primary-dark'}`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <button onClick={loadAll} disabled={loading} className="ml-2 p-2 text-primary-gray hover:text-primary-dark disabled:opacity-50">
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {loading && <p className="text-primary-gray">Carregant...</p>}

      {!loading && tab !== 'blocked' && (
        <div className="space-y-3">
          {tabBookings.length === 0 && (
            <p className="text-primary-gray italic">No hi ha reserves en aquest estat.</p>
          )}
          {tabBookings.map(b => {
            const isPast = isBefore(new Date(b.date), startOfDay(new Date()))
            return (
              <div key={b._id} className={`bg-white rounded-lg shadow p-5 ${isPast ? 'opacity-60' : ''}`}>
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-[240px]">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display text-lg font-semibold text-primary-dark">{b.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${STATUS_BADGE[b.status]}`}>
                        {b.status}
                      </span>
                      {isPast && <span className="text-xs px-2 py-1 rounded-full bg-primary-gray/20 text-primary-gray">passada</span>}
                    </div>
                    <p className="text-sm font-medium text-primary-dark mb-1">
                      📅 {fmtFull(b.date)}
                    </p>
                    <p className="text-sm text-primary-gray">
                      {b.guests} {b.guests === 1 ? 'persona' : 'persones'} · {EXPERIENCE_LABEL[b.experience] || b.experience}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-primary-dark flex-wrap">
                      <a href={`mailto:${b.email}`} className="flex items-center gap-1 hover:text-primary-brown">
                        <Mail size={14} /> {b.email}
                      </a>
                      <a href={`tel:${b.phone}`} className="flex items-center gap-1 hover:text-primary-brown">
                        <Phone size={14} /> {b.phone}
                      </a>
                    </div>
                    {b.comments && (
                      <p className="text-sm text-primary-dark mt-2 bg-primary-stone/50 rounded p-2">
                        {b.comments}
                      </p>
                    )}
                    <p className="text-xs text-primary-gray mt-2 flex items-center gap-1">
                      <Clock size={12} /> Rebuda fa {formatDistanceToNow(new Date(b.createdAt), { locale: ca })}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {b.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(b, 'approved')}
                        className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded text-sm hover:bg-green-700"
                      >
                        <Check size={14} /> Aprovar
                      </button>
                    )}
                    {b.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(b, 'rejected')}
                        className="flex items-center gap-1 bg-red-600 text-white px-3 py-1.5 rounded text-sm hover:bg-red-700"
                      >
                        <X size={14} /> Rebutjar
                      </button>
                    )}
                    <a
                      href={mailtoLink(b)}
                      title={`Email: ${b.email}`}
                      className="flex items-center justify-center bg-primary-brown text-white w-9 h-9 rounded text-sm hover:bg-primary-dark"
                    >
                      <Mail size={16} />
                    </a>
                    <a
                      href={whatsappLink(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`WhatsApp: ${b.phone}`}
                      className="flex items-center justify-center bg-[#25D366] text-white w-9 h-9 rounded text-sm hover:bg-[#1DA851]"
                    >
                      <MessageCircle size={16} />
                    </a>
                    <button
                      onClick={() => deleteBooking(b._id)}
                      className="flex items-center gap-1 bg-primary-gray/20 text-primary-dark px-3 py-1.5 rounded text-sm hover:bg-primary-gray/30"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!loading && tab === 'blocked' && (
        <div className="space-y-5">
          <form onSubmit={addBlockedDate} className="bg-white rounded-lg shadow p-5 flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-sm font-medium text-primary-dark mb-1">Data</label>
              <input
                type="date"
                value={newBlockedDate}
                onChange={e => setNewBlockedDate(e.target.value)}
                required
                className="px-3 py-2 border border-primary-gray/30 rounded"
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-primary-dark mb-1">Motiu (opcional)</label>
              <input
                type="text"
                value={newBlockedReason}
                onChange={e => setNewBlockedReason(e.target.value)}
                placeholder="Ex: Vacances, manteniment..."
                className="w-full px-3 py-2 border border-primary-gray/30 rounded"
              />
            </div>
            <button
              type="submit"
              className="flex items-center gap-1 bg-primary-brown text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
              <Plus size={16} /> Bloquejar data
            </button>
          </form>

          <div className="space-y-2">
            {blocked.length === 0 && (
              <p className="text-primary-gray italic">No hi ha dates bloquejades.</p>
            )}
            {blocked
              .slice()
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(b => (
                <div key={b._id} className="bg-white rounded-lg shadow p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-primary-dark">{fmtFull(b.date)}</p>
                    {b.reason && <p className="text-sm text-primary-gray">{b.reason}</p>}
                  </div>
                  <button
                    onClick={() => deleteBlocked(b._id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center text-white font-bold text-lg`}>
        {value}
      </div>
      <p className="text-sm text-primary-dark font-medium">{label}</p>
    </div>
  )
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`w-3 h-3 rounded ${color}`} />
      <span>{label}</span>
    </div>
  )
}
