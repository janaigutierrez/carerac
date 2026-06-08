export type BlockLang = 'ca' | 'es' | 'en'

export type ContentBlock =
  | { id: string; type: 'heading'; ca: string; es: string; en: string }
  | { id: string; type: 'paragraph'; ca: string; es: string; en: string }
  | { id: string; type: 'image'; publicId: string; url: string; captionCa?: string; captionEs?: string; captionEn?: string }
  | { id: string; type: 'video'; youtubeId: string; titleCa?: string; titleEs?: string; titleEn?: string }

export function newBlockId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `b_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export function parseYouTubeId(input: string): string | null {
  const cleaned = input.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleaned)) return cleaned
  const patterns = [
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const p of patterns) {
    const m = cleaned.match(p)
    if (m) return m[1]
  }
  return null
}

export function textToParagraphBlocks(text: string): ContentBlock[] {
  return text
    .split(/\n\s*\n/)
    .map(p => p.trim())
    .filter(Boolean)
    .map(p => ({ id: newBlockId(), type: 'paragraph' as const, ca: p, es: p, en: p }))
}

export function isValidBlock(b: unknown): b is ContentBlock {
  if (!b || typeof b !== 'object') return false
  const obj = b as Record<string, unknown>
  if (typeof obj.id !== 'string' || !obj.id) return false
  if (obj.type === 'heading' || obj.type === 'paragraph') {
    return typeof obj.ca === 'string' && typeof obj.es === 'string' && typeof obj.en === 'string'
  }
  if (obj.type === 'image') return typeof obj.publicId === 'string' && typeof obj.url === 'string'
  if (obj.type === 'video') return typeof obj.youtubeId === 'string'
  return false
}
