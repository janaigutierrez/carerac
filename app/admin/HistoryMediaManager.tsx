'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, AlertCircle, Trash2 } from 'lucide-react'
import { compressImage } from '@/lib/imageCompress'

type Slot = 'history-passat' | 'history-present'

const SLOTS: { slot: Slot; label: string; defaultUrl: string }[] = [
  { slot: 'history-passat', label: 'Passat', defaultUrl: '/images/gallery/timeline-fundacio.webp' },
  { slot: 'history-present', label: 'Present', defaultUrl: '/images/gallery/timeline-actualitat.webp' },
]

interface MediaImage { _id: string; publicId: string; url: string; order: number }

export default function HistoryMediaManager() {
  const [media, setMedia] = useState<Record<string, MediaImage[]>>({})
  const [loading, setLoading] = useState(true)
  const [uploadingSlot, setUploadingSlot] = useState<Slot | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/site-media')
      const data = await res.json()
      setMedia(data.media || {})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, slot: Slot) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploadingSlot(slot)
    setError(null)

    try {
      const signRes = await fetch('/api/admin/gallery/sign?folder=carerac/site-media', { method: 'POST' })
      if (!signRes.ok) throw new Error('No s\'ha pogut obtenir la signatura')
      const { timestamp, folder, signature, apiKey, cloudName } = await signRes.json()

      for (const original of Array.from(files)) {
        const file = await compressImage(original)
        const form = new FormData()
        form.append('file', file)
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
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slot, publicId: result.public_id, url: result.secure_url }),
        })
        if (!saveRes.ok) throw new Error('No s\'ha pogut guardar la imatge')
      }
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error pujant la imatge')
    } finally {
      setUploadingSlot(null)
      const input = inputRefs.current[slot]
      if (input) input.value = ''
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Eliminar aquesta imatge?')) return
    try {
      const res = await fetch(`/api/admin/site-media/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete failed')
      setMedia(prev => {
        const next: Record<string, MediaImage[]> = {}
        for (const k of Object.keys(prev)) next[k] = prev[k].filter(i => i._id !== id)
        return next
      })
    } catch {
      setError('No s\'ha pogut eliminar la imatge')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="mb-4">
        <h3 className="font-display text-lg font-semibold text-primary-dark">Imatges de la secció Història</h3>
        <p className="text-xs text-primary-gray">Pots pujar diverses imatges per al Passat i el Present. A la landing apareixen com a carrusel.</p>
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
        <div className="space-y-6">
          {SLOTS.map(({ slot, label, defaultUrl }) => {
            const images = media[slot] || []
            const hasCustom = images.length > 0
            return (
              <div key={slot} className="border border-primary-stone rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-primary-dark">{label}</span>
                  <span className="text-xs text-primary-gray">
                    {hasCustom ? `${images.length} ${images.length === 1 ? 'imatge' : 'imatges'}` : 'Imatge per defecte'}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {!hasCustom && (
                    <div className="relative aspect-square overflow-hidden rounded border border-primary-stone opacity-70">
                      <Image
                        src={defaultUrl}
                        alt={`${label} (per defecte)`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />
                      <span className="absolute bottom-1 left-1 text-[10px] bg-primary-white/90 text-primary-dark px-1.5 py-0.5 rounded">Per defecte</span>
                    </div>
                  )}
                  {images.map(img => (
                    <div key={img._id} className="relative group aspect-square overflow-hidden rounded">
                      <Image
                        src={img.url}
                        alt={label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 25vw"
                        unoptimized
                      />
                      <button
                        onClick={() => deleteImage(img._id)}
                        className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  <label className="flex flex-col items-center justify-center gap-1 aspect-square border-2 border-dashed border-primary-stone rounded text-primary-gray hover:border-primary-brown hover:text-primary-brown cursor-pointer transition-colors">
                    <Upload size={20} />
                    <span className="text-xs">{uploadingSlot === slot ? 'Pujant...' : 'Afegir'}</span>
                    <input
                      ref={el => { inputRefs.current[slot] = el }}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={e => handleUpload(e, slot)}
                      disabled={uploadingSlot !== null}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
