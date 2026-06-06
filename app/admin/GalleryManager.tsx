'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Upload, Trash2, AlertCircle } from 'lucide-react'

interface GalleryImage {
  _id: string
  publicId: string
  url: string
  width: number
  height: number
  caption: string
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/gallery')
      const data = await res.json()
      setImages(data.images || [])
    } catch {
      setError('No s\'han pogut carregar les imatges')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    setUploading(true)
    setError(null)

    try {
      for (const file of Array.from(files)) {
        const form = new FormData()
        form.append('file', file)
        const res = await fetch('/api/admin/gallery', { method: 'POST', body: form })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || 'Upload failed')
        }
      }
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error pujant la imatge')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm('Eliminar aquesta imatge?')) return
    try {
      const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete failed')
      setImages(prev => prev.filter(i => i._id !== id))
    } catch {
      setError('No s\'ha pogut eliminar la imatge')
    }
  }

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-primary-dark">Galeria</h3>
            <p className="text-xs text-primary-gray">Pagina publica: /galeria. Les imatges s'optimitzen automaticament al Cloudinary.</p>
          </div>
          <label className="flex items-center gap-2 bg-primary-brown text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary-dark cursor-pointer">
            <Upload size={14} />
            {uploading ? 'Pujant...' : 'Pujar imatges'}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
            <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        {loading ? (
          <p className="text-primary-gray">Carregant...</p>
        ) : images.length === 0 ? (
          <p className="text-primary-gray italic">Encara no hi ha cap imatge pujada.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {images.map(img => (
              <div key={img._id} className="relative group aspect-square overflow-hidden rounded">
                <Image
                  src={img.url}
                  alt={img.caption || 'Imatge galeria'}
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
          </div>
        )}
      </div>
    </div>
  )
}
