import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { SiteMedia } from '@/lib/models/SiteMedia'
import { getCloudinary } from '@/lib/cloudinary'
import { requireAdmin } from '@/lib/session'
import { isAllowedMediaKey } from '@/lib/data/siteMediaDefaults'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectMongo()
    const docs = await SiteMedia.find().lean()
    return NextResponse.json({ media: docs })
  } catch (error) {
    console.error('Site media list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { key, publicId, url } = await request.json()
    if (!isAllowedMediaKey(key)) return NextResponse.json({ error: 'Invalid key' }, { status: 400 })
    if (!publicId || !url) return NextResponse.json({ error: 'Missing publicId or url' }, { status: 400 })

    await connectMongo()

    const existing = await SiteMedia.findOne({ key })
    if (existing && existing.publicId !== publicId) {
      try {
        const cloud = getCloudinary()
        await cloud.uploader.destroy(existing.publicId)
      } catch (err) {
        console.error('Old cloudinary asset cleanup failed:', err)
      }
    }

    const doc = await SiteMedia.findOneAndUpdate(
      { key },
      { key, publicId, url },
      { upsert: true, new: true }
    ).lean()

    return NextResponse.json({ media: doc })
  } catch (error) {
    console.error('Site media save error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const key = request.nextUrl.searchParams.get('key')
  if (!isAllowedMediaKey(key)) return NextResponse.json({ error: 'Invalid key' }, { status: 400 })

  try {
    await connectMongo()
    const doc = await SiteMedia.findOne({ key })
    if (doc) {
      try {
        const cloud = getCloudinary()
        await cloud.uploader.destroy(doc.publicId)
      } catch (err) {
        console.error('Cloudinary delete failed:', err)
      }
      await doc.deleteOne()
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Site media delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
