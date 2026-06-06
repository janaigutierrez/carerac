import { NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { GalleryImage } from '@/lib/models/GalleryImage'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    await connectMongo()
    const images = await GalleryImage.find().sort({ order: 1, createdAt: -1 }).lean()
    return NextResponse.json({
      images: images.map(i => ({
        _id: i._id,
        publicId: i.publicId,
        url: i.url,
        width: i.width,
        height: i.height,
        caption: i.caption,
      })),
    })
  } catch (error) {
    console.error('Public gallery fetch error:', error)
    return NextResponse.json({ images: [] }, { status: 200 })
  }
}
