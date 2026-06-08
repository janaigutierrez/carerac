'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Save, Check, Plus, Trash2, ArrowUp, ArrowDown,
  Type, Heading2, Image as ImageIcon, Youtube, AlertCircle, Upload, RotateCcw,
} from 'lucide-react'
import { type ContentBlock, type BlockLang, newBlockId, parseYouTubeId } from '@/lib/data/contentBlocks'
import { compressImage } from '@/lib/imageCompress'

const LANGS: { code: BlockLang; label: string }[] = [
  { code: 'ca', label: 'Català' },
  { code: 'es', label: 'Espanyol' },
  { code: 'en', label: 'Anglès' },
]

export default function ContentBlocksEditor() {
  const [lang, setLang] = useState<BlockLang>('ca')
  const [blocks, setBlocks] = useState<ContentBlock[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadingId, setUploadingId] = useState<string | null>(null)
  const [showAddMenu, setShowAddMenu] = useState(false)
  const addMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch('/api/admin/content?key=sobre-nosaltres')
      .then(r => r.json())
      .then(data => {
        const list = data?.content?.blocks
        if (Array.isArray(list)) setBlocks(list)
      })
      .catch(() => setError('No s\'ha pogut carregar el contingut'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!showAddMenu) return
    const onClick = (e: MouseEvent) => {
      if (!addMenuRef.current?.contains(e.target as Node)) setShowAddMenu(false)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [showAddMenu])

  const updateBlock = (id: string, updater: (b: ContentBlock) => ContentBlock) => {
    setBlocks(prev => prev.map(b => (b.id === id ? updater(b) : b)))
  }

  const moveBlock = (id: string, dir: -1 | 1) => {
    setBlocks(prev => {
      const idx = prev.findIndex(b => b.id === id)
      if (idx < 0) return prev
      const target = idx + dir
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      ;[next[idx], next[target]] = [next[target], next[idx]]
      return next
    })
  }

  const removeBlock = (id: string) => {
    if (!confirm('Eliminar aquest bloc?')) return
    setBlocks(prev => prev.filter(b => b.id !== id))
  }

  const addBlock = (type: ContentBlock['type']) => {
    let newBlock: ContentBlock
    if (type === 'heading') newBlock = { id: newBlockId(), type: 'heading', ca: '', es: '', en: '' }
    else if (type === 'paragraph') newBlock = { id: newBlockId(), type: 'paragraph', ca: '', es: '', en: '' }
    else if (type === 'image') newBlock = { id: newBlockId(), type: 'image', publicId: '', url: '' }
    else newBlock = { id: newBlockId(), type: 'video', youtubeId: '' }
    setBlocks(prev => [...prev, newBlock])
    setShowAddMenu(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, blockId: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingId(blockId)
    setError(null)
    try {
      const signRes = await fetch('/api/admin/gallery/sign?folder=carerac/content', { method: 'POST' })
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
      if (!upRes.ok) throw new Error('Cloudinary upload error')
      const result = await upRes.json()

      updateBlock(blockId, b => (b.type === 'image' ? { ...b, publicId: result.public_id, url: result.secure_url } : b))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error pujant la imatge')
    } finally {
      setUploadingId(null)
      e.target.value = ''
    }
  }

  const save = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'sobre-nosaltres', ca: '', es: '', en: '', blocks }),
      })
      if (!res.ok) throw new Error('save failed')
      setSavedAt(Date.now())
      setTimeout(() => setSavedAt(null), 2500)
    } catch {
      setError('No s\'ha pogut guardar')
    } finally {
      setSaving(false)
    }
  }

  const restoreDefaults = async () => {
    if (!confirm('Vols substituir tots els blocs actuals pels textos per defecte? Aquesta acció no es pot desfer.')) return
    setSaving(true)
    setError(null)
    try {
      const saveRes = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'sobre-nosaltres', ca: '', es: '', en: '', blocks: [] }),
      })
      if (!saveRes.ok) throw new Error('reset failed')
      const reloadRes = await fetch('/api/admin/content?key=sobre-nosaltres')
      const data = await reloadRes.json()
      const list = data?.content?.blocks
      if (Array.isArray(list)) setBlocks(list)
      setSavedAt(Date.now())
      setTimeout(() => setSavedAt(null), 2500)
    } catch {
      setError('No s\'ha pogut restablir')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <p className="text-primary-gray">Carregant editor...</p>

  return (
    <div className="bg-white rounded-lg shadow p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3 sticky top-0 bg-white pt-1 pb-3 -mt-1 z-10 border-b border-primary-stone">
        <div>
          <h3 className="font-display text-lg font-semibold text-primary-dark">Sobre nosaltres — Editor</h3>
          <p className="text-xs text-primary-gray">Construeix la pàgina amb blocs: textos, imatges i vídeos.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 border border-primary-stone rounded-full p-1">
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                  lang === l.code ? 'bg-primary-brown text-white' : 'text-primary-dark hover:bg-primary-stone'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
          {error && <span className="text-sm text-red-600">{error}</span>}
          {savedAt && (
            <span className="flex items-center gap-1 text-sm text-green-700">
              <Check size={14} /> Guardat
            </span>
          )}
          <button
            onClick={restoreDefaults}
            disabled={saving}
            title="Substituir tots els blocs pels textos per defecte"
            className="flex items-center gap-2 text-primary-gray hover:text-primary-dark text-sm disabled:opacity-50"
          >
            <RotateCcw size={14} /> Restablir
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 bg-primary-brown text-white px-4 py-2 rounded text-sm font-medium hover:bg-primary-dark disabled:opacity-50"
          >
            <Save size={14} />
            {saving ? 'Guardant...' : 'Guardar'}
          </button>
        </div>
      </div>

      {blocks.length === 0 ? (
        <p className="text-primary-gray italic text-sm py-8 text-center">
          Encara no hi ha cap bloc. Afegeix el primer amb el botó de baix.
        </p>
      ) : (
        <div className="space-y-3">
          {blocks.map((block, index) => (
            <BlockCard
              key={block.id}
              block={block}
              lang={lang}
              isFirst={index === 0}
              isLast={index === blocks.length - 1}
              uploadingId={uploadingId}
              onMoveUp={() => moveBlock(block.id, -1)}
              onMoveDown={() => moveBlock(block.id, 1)}
              onRemove={() => removeBlock(block.id)}
              onUpdate={updater => updateBlock(block.id, updater)}
              onImageUpload={e => handleImageUpload(e, block.id)}
            />
          ))}
        </div>
      )}

      <div className="relative inline-block" ref={addMenuRef}>
        <button
          onClick={() => setShowAddMenu(v => !v)}
          className="flex items-center gap-2 bg-primary-stone/40 text-primary-dark px-4 py-2 rounded text-sm font-medium hover:bg-primary-stone"
        >
          <Plus size={14} /> Afegir bloc
        </button>
        {showAddMenu && (
          <div className="absolute left-0 top-full mt-1 bg-white border border-primary-stone rounded shadow-lg z-20 min-w-[200px]">
            <MenuItem icon={Heading2} label="Encapçalament" onClick={() => addBlock('heading')} />
            <MenuItem icon={Type} label="Paràgraf" onClick={() => addBlock('paragraph')} />
            <MenuItem icon={ImageIcon} label="Imatge" onClick={() => addBlock('image')} />
            <MenuItem icon={Youtube} label="Vídeo YouTube" onClick={() => addBlock('video')} />
          </div>
        )}
      </div>
    </div>
  )
}

function MenuItem({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ size?: number }>; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-primary-dark hover:bg-primary-stone/40 text-left"
    >
      <Icon size={14} /> {label}
    </button>
  )
}

interface BlockCardProps {
  block: ContentBlock
  lang: BlockLang
  isFirst: boolean
  isLast: boolean
  uploadingId: string | null
  onMoveUp: () => void
  onMoveDown: () => void
  onRemove: () => void
  onUpdate: (updater: (b: ContentBlock) => ContentBlock) => void
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function BlockCard(p: BlockCardProps) {
  const { block, lang, isFirst, isLast } = p
  const typeLabel: Record<ContentBlock['type'], string> = {
    heading: 'Encapçalament',
    paragraph: 'Paràgraf',
    image: 'Imatge',
    video: 'Vídeo',
  }

  return (
    <div className="border border-primary-stone rounded-lg p-4 bg-primary-white/40">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-primary-brown uppercase tracking-wide">{typeLabel[block.type]}</span>
        <div className="flex items-center gap-1">
          <button onClick={p.onMoveUp} disabled={isFirst} aria-label="Pujar" className="p-1 hover:bg-primary-stone rounded disabled:opacity-30 disabled:cursor-not-allowed">
            <ArrowUp size={14} />
          </button>
          <button onClick={p.onMoveDown} disabled={isLast} aria-label="Baixar" className="p-1 hover:bg-primary-stone rounded disabled:opacity-30 disabled:cursor-not-allowed">
            <ArrowDown size={14} />
          </button>
          <button onClick={p.onRemove} aria-label="Eliminar" className="p-1 hover:bg-red-100 text-red-600 rounded">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {(block.type === 'heading' || block.type === 'paragraph') && (
        <>
          {block.type === 'heading' ? (
            <input
              type="text"
              value={block[lang]}
              onChange={e => p.onUpdate(b => b.type === 'heading' ? { ...b, [lang]: e.target.value } : b)}
              placeholder={`Encapçalament en ${lang.toUpperCase()}`}
              className="w-full px-3 py-2 border border-primary-stone rounded font-display text-xl focus:outline-none focus:border-primary-brown"
            />
          ) : (
            <textarea
              value={block[lang]}
              onChange={e => p.onUpdate(b => b.type === 'paragraph' ? { ...b, [lang]: e.target.value } : b)}
              placeholder={`Paràgraf en ${lang.toUpperCase()}`}
              rows={4}
              className="w-full px-3 py-2 border border-primary-stone rounded text-sm leading-relaxed focus:outline-none focus:border-primary-brown"
            />
          )}
          <p className="text-[10px] text-primary-gray mt-1">Edita en cada idioma per separat amb el selector de dalt.</p>
        </>
      )}

      {block.type === 'image' && (
        <div className="space-y-3">
          {block.url ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded">
              <Image src={block.url} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 700px" unoptimized />
            </div>
          ) : (
            <div className="aspect-[16/9] flex items-center justify-center border-2 border-dashed border-primary-stone rounded text-primary-gray text-sm">
              Cap imatge encara
            </div>
          )}
          <label className="inline-flex items-center gap-2 bg-primary-brown text-white px-3 py-1.5 rounded text-sm font-medium hover:bg-primary-dark cursor-pointer">
            <Upload size={14} />
            {p.uploadingId === block.id ? 'Pujant...' : block.url ? 'Canviar imatge' : 'Pujar imatge'}
            <input type="file" accept="image/*" onChange={p.onImageUpload} disabled={p.uploadingId !== null} className="hidden" />
          </label>
          <CaptionInput
            value={(block as Extract<ContentBlock, { type: 'image' }>)[`caption${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as 'captionCa' | 'captionEs' | 'captionEn'] || ''}
            onChange={v => p.onUpdate(b => {
              if (b.type !== 'image') return b
              const key = `caption${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as 'captionCa' | 'captionEs' | 'captionEn'
              return { ...b, [key]: v }
            })}
            placeholder={`Peu d'imatge (${lang.toUpperCase()}, opcional)`}
          />
        </div>
      )}

      {block.type === 'video' && (
        <div className="space-y-3">
          <input
            type="text"
            value={block.youtubeId}
            onChange={e => {
              const parsed = parseYouTubeId(e.target.value)
              p.onUpdate(b => b.type === 'video' ? { ...b, youtubeId: parsed || e.target.value } : b)
            }}
            placeholder="https://www.youtube.com/watch?v=... o ID del vídeo"
            className="w-full px-3 py-2 border border-primary-stone rounded text-sm focus:outline-none focus:border-primary-brown"
          />
          {block.youtubeId && /^[a-zA-Z0-9_-]{11}$/.test(block.youtubeId) ? (
            <div className="relative aspect-video overflow-hidden rounded bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${block.youtubeId}`}
                title="YouTube preview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : block.youtubeId ? (
            <p className="text-xs text-red-600 flex items-center gap-1"><AlertCircle size={12} /> URL no reconeguda</p>
          ) : null}
          <CaptionInput
            value={(block as Extract<ContentBlock, { type: 'video' }>)[`title${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as 'titleCa' | 'titleEs' | 'titleEn'] || ''}
            onChange={v => p.onUpdate(b => {
              if (b.type !== 'video') return b
              const key = `title${lang.charAt(0).toUpperCase()}${lang.slice(1)}` as 'titleCa' | 'titleEs' | 'titleEn'
              return { ...b, [key]: v }
            })}
            placeholder={`Títol del vídeo (${lang.toUpperCase()}, opcional)`}
          />
        </div>
      )}
    </div>
  )
}

function CaptionInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-1.5 border border-primary-stone rounded text-xs focus:outline-none focus:border-primary-brown"
    />
  )
}
