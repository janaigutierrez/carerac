'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, X } from 'lucide-react'

interface GalleryImage {
  _id: string
  publicId: string
  url: string
  width: number
  height: number
  caption: string
}

export default function GaleriaPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/gallery')
      .then(r => r.json())
      .then(data => setImages(data.images || []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null)
      if (e.key === 'ArrowRight') setActiveIndex(i => (i === null ? null : (i + 1) % images.length))
      if (e.key === 'ArrowLeft') setActiveIndex(i => (i === null ? null : (i - 1 + images.length) % images.length))
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [activeIndex, images.length])

  const active = activeIndex !== null ? images[activeIndex] : null

  return (
    <div className="min-h-screen bg-primary-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-primary-brown hover:text-primary-dark transition-colors text-sm mb-8">
          <ArrowLeft size={16} />
          Tornar a l&apos;inici
        </Link>

        <h1 className="font-display text-4xl lg:text-5xl font-bold text-primary-dark mb-10">
          Galeria
        </h1>

        {loading ? (
          <p className="text-primary-gray italic">Carregant...</p>
        ) : images.length === 0 ? (
          <p className="text-primary-gray italic">Aviat aqui podras veure les imatges de Carerac.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {images.map((img, i) => (
              <button
                key={img._id}
                onClick={() => setActiveIndex(i)}
                className="relative aspect-square overflow-hidden group focus:outline-none"
              >
                <Image
                  src={img.url}
                  alt={img.caption || 'Carerac'}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-primary-dark/0 group-hover:bg-primary-dark/20 transition-colors" />
              </button>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 bg-primary-dark/95 flex items-center justify-center p-4"
          onClick={() => setActiveIndex(null)}
        >
          <button
            onClick={() => setActiveIndex(null)}
            aria-label="Tancar"
            className="absolute top-6 right-6 text-primary-white/90 hover:text-primary-white"
          >
            <X size={32} />
          </button>
          <div className="relative max-w-5xl w-full h-[80vh]" onClick={e => e.stopPropagation()}>
            <Image
              src={active.url}
              alt={active.caption || 'Carerac'}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
            />
            {active.caption && (
              <p className="absolute bottom-4 left-0 right-0 text-center text-primary-white/90 font-body text-sm">
                {active.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
