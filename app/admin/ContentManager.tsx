'use client'

import { useEffect, useState } from 'react'
import { Save, Check } from 'lucide-react'

type Lang = 'ca' | 'es' | 'en'
const LANGS: { code: Lang; label: string }[] = [
  { code: 'ca', label: 'Catala' },
  { code: 'es', label: 'Espanyol' },
  { code: 'en', label: 'Angles' },
]

interface ContentState { ca: string; es: string; en: string }

export default function ContentManager() {
  const [lang, setLang] = useState<Lang>('ca')
  const [content, setContent] = useState<ContentState>({ ca: '', es: '', en: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/admin/content?key=sobre-nosaltres')
      .then(r => r.json())
      .then(data => {
        if (data?.content) {
          setContent({ ca: data.content.ca || '', es: data.content.es || '', en: data.content.en || '' })
        }
      })
      .catch(() => setError('No s\'ha pogut carregar el contingut'))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (value: string) => setContent(prev => ({ ...prev, [lang]: value }))

  const save = async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'sobre-nosaltres', ...content }),
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

  if (loading) return <p className="text-primary-gray">Carregant contingut...</p>

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-lg shadow p-5">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-primary-dark">Sobre nosaltres</h3>
            <p className="text-xs text-primary-gray">Pagina publica: /sobre-nosaltres. Separa parrafs amb una linia en blanc.</p>
          </div>
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
        </div>

        <textarea
          value={content[lang]}
          onChange={e => handleChange(e.target.value)}
          rows={16}
          placeholder="Escriu aqui la historia llarga de Carerac per l'idioma seleccionat..."
          className="w-full px-4 py-3 border border-primary-stone rounded-lg focus:outline-none focus:border-primary-brown font-body text-sm leading-relaxed"
        />

        <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
          <div className="text-xs text-primary-gray">
            {content[lang].length} caracters
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-sm text-red-600">{error}</span>}
            {savedAt && (
              <span className="flex items-center gap-1 text-sm text-green-700">
                <Check size={14} /> Guardat
              </span>
            )}
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
      </div>
    </div>
  )
}
