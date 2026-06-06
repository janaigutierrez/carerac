import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectMongo } from '@/lib/mongo'
import { GalleryImage } from '@/lib/models/GalleryImage'
import { getCloudinary } from '@/lib/cloudinary'
import { requireAdmin } from '@/lib/session'

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 })

  try {
    await connectMongo()
    const image = await GalleryImage.findById(id)
    if (!image) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    try {
      const cloud = getCloudinary()
      await cloud.uploader.destroy(image.publicId)
    } catch (err) {
      console.error('Cloudinary delete failed (continuing):', err)
    }

    await image.deleteOne()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Gallery delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
