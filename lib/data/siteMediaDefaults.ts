export const DEFAULT_MEDIA: Record<string, string> = {
  'history-passat': '/images/gallery/timeline-fundacio.webp',
  'history-present': '/images/gallery/timeline-actualitat.webp',
}

export const ALLOWED_MEDIA_KEYS = Object.keys(DEFAULT_MEDIA)

export function isAllowedMediaKey(k: unknown): k is keyof typeof DEFAULT_MEDIA {
  return typeof k === 'string' && ALLOWED_MEDIA_KEYS.includes(k)
}
