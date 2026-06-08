import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { SiteMedia } from '@/lib/models/SiteMedia'
import { requireAdmin } from '@/lib/session'
import { isAllowedSlot, ALLOWED_MEDIA_SLOTS } from '@/lib/data/siteMediaDefaults'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectMongo()
    const docs = await SiteMedia.find({ slot: { $in: ALLOWED_MEDIA_SLOTS } }).sort({ slot: 1, order: 1, createdAt: 1 }).lean()
    const bySlot: Record<string, { _id: string; publicId: string; url: string; order: number }[]> = {}
    for (const s of ALLOWED_MEDIA_SLOTS) bySlot[s] = []
    for (const d of docs) {
      bySlot[d.slot].push({ _id: String(d._id), publicId: d.publicId, url: d.url, order: d.order })
    }
    return NextResponse.json({ media: bySlot })
  } catch (error) {
    console.error('Site media list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { slot, publicId, url } = await request.json()
    if (!isAllowedSlot(slot)) return NextResponse.json({ error: 'Invalid slot' }, { status: 400 })
    if (!publicId || !url) return NextResponse.json({ error: 'Missing publicId or url' }, { status: 400 })

    await connectMongo()
    const last = await SiteMedia.findOne({ slot }).sort({ order: -1 }).lean()
    const order = (last?.order ?? -1) + 1

    const doc = await SiteMedia.create({ slot, publicId, url, order })
    return NextResponse.json({
      image: { _id: String(doc._id), publicId: doc.publicId, url: doc.url, order: doc.order },
    })
  } catch (error) {
    console.error('Site media add error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
