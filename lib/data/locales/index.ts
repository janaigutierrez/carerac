import { ca } from './ca'
import { es } from './es'
import { en } from './en'
import type { Locale, LanguageCode } from './types'

export type { Locale, LanguageCode }
export { ca, es, en }

export const content: Record<LanguageCode, Locale> = { ca, es, en }
