'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, AlertCircle, RotateCcw } from 'lucide-react'
import { compressImage } from '@/lib/imageCompress'

type MediaKey = 'history-passat' | 'history-present'

const SLOTS: { key: MediaKey; label: string; defaultUrl: string }[] = [
  { key: 'history-passat', label: 'Passat', defaultUrl: '/images/gallery/timeline-fundacio.webp' },
  { key: 'history-present', label: 'Present', defaultUrl: '/images/gallery/timeline-actualitat.webp' },
]

export default function HistoryMediaManager() {
  const [media, setMedia] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [uploadingKey, setUploadingKey] = useState<MediaKey | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/site-media')
      const data = await res.json()
      const m: Record<string, string> = {}
      for (const d of data.media || []) m[d.key] = d.url
      setMedia(m)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: MediaKey) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingKey(key)
    setError(null)

    try {
      const signRes = await fetch('/api/admin/gallery/sign?folder=carerac/site-media', { method: 'POST' })
      if (!signRes.ok) throw new Error('No s\'ha pogut obtenir la signatura')
      const { timestamp, folder, signature, apiKey, cloudName } = await signRes.json()

      const compressed = await compressImage(file)
      const form = new FormData()
      form.append('file', compressed)
      form.append('api_key', apiKey)
      form.append('timestamp', String(timestamp))
      form.append('signature', signature)
      form.append('folder', folder)

      const upRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: form,
      })
      if (!upRes.ok) {
        const txt = await upRes.text().catch(() => '')
        throw new Error(`Cloudinary: ${upRes.status} ${txt.slice(0, 120)}`)
      }
      const result = await upRes.json()

      const saveRes = await fetch('/api/admin/site-media', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, publicId: result.public_id, url: result.secure_url }),
      })
      if (!saveRes.ok) throw new Error('No s\'ha pogut guardar la imatge')

      setMedia(prev => ({ ...prev, [key]: result.secure_url }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error pujant la imatge')
    } finally {
      setUploadingKey(null)
      const input = inputRefs.current[key]
      if (input) input.value = ''
    }
  }

  const restoreDefault = async (key: MediaKey) => {
    if (!confirm('Tornar a la imatge per defecte?')) return
    try {
      const res = await fetch(`/api/admin/site-media?key=${key}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete failed')
      setMedia(prev => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    } catch {
      setError('No s\'ha pogut restablir la imatge')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold text-primary-dark">Imatges de la secció Història</h3>
        <p className="text-xs text-primary-gray">Aquestes imatges apareixen a la landing, a la secció Història (Passat i Present).</p>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
          <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {loading ? (
        <p className="text-primary-gray">Carregant...</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {SLOTS.map(({ key, label, defaultUrl }) => {
            const url = media[key] || defaultUrl
            const isCustom = !!media[key]
            return (
              <div key={key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary-dark">{label}</span>
                  {isCustom && (
                    <button
                      onClick={() => restoreDefault(key)}
                      className="flex items-center gap-1 text-xs text-primary-gray hover:text-primary-dark"
                      title="Restablir imatge per defecte"
                    >
                      <RotateCcw size={12} /> Per defecte
                    </button>
                  )}
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded border border-primary-stone">
                  <Image
                    src={url}
                    alt={label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    unoptimized={isCustom}
                  />
                </div>
                <label className="flex items-center justify-center gap-2 bg-primary-brown text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary-dark cursor-pointer">
                  <Upload size={14} />
                  {uploadingKey === key ? 'Pujant...' : 'Canviar imatge'}
                  <input
                    ref={el => { inputRefs.current[key] = el }}
                    type="file"
                    accept="image/*"
                    onChange={e => handleUpload(e, key)}
                    disabled={uploadingKey !== null}
                    className="hidden"
                  />
                </label>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
