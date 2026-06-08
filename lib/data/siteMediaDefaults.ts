export const DEFAULT_MEDIA: Record<string, string[]> = {
  'history-passat': ['/images/gallery/timeline-fundacio.webp'],
  'history-present': ['/images/gallery/timeline-actualitat.webp'],
}

export const ALLOWED_MEDIA_SLOTS = Object.keys(DEFAULT_MEDIA)

export function isAllowedSlot(s: unknown): s is keyof typeof DEFAULT_MEDIA {
  return typeof s === 'string' && ALLOWED_MEDIA_SLOTS.includes(s)
}
