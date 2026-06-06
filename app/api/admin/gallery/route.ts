import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { GalleryImage } from '@/lib/models/GalleryImage'
import { getCloudinary } from '@/lib/cloudinary'
import { requireAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'

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
    const form = await request.formData()
    const file = form.get('file')
    const caption = (form.get('caption') as string | null) || ''
    if (!(file instanceof File)) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const bytes = Buffer.from(await file.arrayBuffer())
    const cloud = getCloudinary()

    const upload = await new Promise<{ public_id: string; secure_url: string; width: number; height: number }>((resolve, reject) => {
      const stream = cloud.uploader.upload_stream(
        { folder: 'carerac/gallery', resource_type: 'image' },
        (err, res) => {
          if (err || !res) return reject(err || new Error('upload failed'))
          resolve({ public_id: res.public_id, secure_url: res.secure_url, width: res.width, height: res.height })
        }
      )
      stream.end(bytes)
    })

    await connectMongo()
    const last = await GalleryImage.findOne().sort({ order: -1 }).lean()
    const order = (last?.order ?? 0) + 1

    const doc = await GalleryImage.create({
      publicId: upload.public_id,
      url: upload.secure_url,
      width: upload.width,
      height: upload.height,
      caption,
      order,
    })

    return NextResponse.json({ image: doc })
  } catch (error) {
    console.error('Gallery upload error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
