import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { SiteMedia } from '@/lib/models/SiteMedia'
import { DEFAULT_MEDIA, ALLOWED_MEDIA_SLOTS } from '@/lib/data/siteMediaDefaults'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const keysParam = request.nextUrl.searchParams.get('slots') || request.nextUrl.searchParams.get('keys')
  const requestedSlots = keysParam
    ? keysParam.split(',').map(k => k.trim()).filter(k => ALLOWED_MEDIA_SLOTS.includes(k))
    : ALLOWED_MEDIA_SLOTS

  const result: Record<string, string[]> = {}
  for (const s of requestedSlots) result[s] = []

  try {
    await connectMongo()
    const docs = await SiteMedia.find({ slot: { $in: requestedSlots } }).sort({ slot: 1, order: 1, createdAt: 1 }).lean()
    for (const d of docs) {
      if (!result[d.slot]) result[d.slot] = []
      result[d.slot].push(d.url)
    }
  } catch (error) {
    console.error('Public site media fetch error (will use defaults):', error)
  }

  for (const s of requestedSlots) {
    if (result[s].length === 0) result[s] = [...DEFAULT_MEDIA[s]]
  }

  return NextResponse.json({ media: result })
}
