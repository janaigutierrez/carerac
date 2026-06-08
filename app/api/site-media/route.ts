import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { SiteMedia } from '@/lib/models/SiteMedia'
import { DEFAULT_MEDIA, ALLOWED_MEDIA_KEYS } from '@/lib/data/siteMediaDefaults'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const keysParam = request.nextUrl.searchParams.get('keys')
  const requestedKeys = keysParam
    ? keysParam.split(',').map(k => k.trim()).filter(k => ALLOWED_MEDIA_KEYS.includes(k))
    : ALLOWED_MEDIA_KEYS

  const result: Record<string, string> = {}
  for (const k of requestedKeys) result[k] = DEFAULT_MEDIA[k]

  try {
    await connectMongo()
    const docs = await SiteMedia.find({ key: { $in: requestedKeys } }).lean()
    for (const d of docs) result[d.key] = d.url
  } catch (error) {
    console.error('Public site media fetch error (returning defaults):', error)
  }

  return NextResponse.json({ media: result })
}
