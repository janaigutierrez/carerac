import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { GalleryImage } from '@/lib/models/GalleryImage'
import { requireAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'

interface RegisterBody {
  publicId?: string
  url?: string
  width?: number
  height?: number
  caption?: string
}

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectMongo()
    const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json({ images })
  } catch (error) {
    console.error('Gallery list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body: RegisterBody = await request.json()
    if (!body.publicId || !body.url) {
      return NextResponse.json({ error: 'Missing publicId or url' }, { status: 400 })
    }

    await connectMongo()
    const last = await GalleryImage.findOne().sort({ order: -1 }).lean()
    const order = (last?.order ?? 0) + 1

    const doc = await GalleryImage.create({
      publicId: body.publicId,
      url: body.url,
      width: body.width ?? 0,
      height: body.height ?? 0,
      caption: body.caption ?? '',
      order,
    })

    return NextResponse.json({ image: doc })
  } catch (error) {
    console.error('Gallery register error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
