import { NextResponse } from 'next/server'
import { getCloudinary } from '@/lib/cloudinary'
import { requireAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'

export async function POST() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const cloud = getCloudinary()
    const timestamp = Math.round(Date.now() / 1000)
    const folder = 'carerac/gallery'

    const signature = cloud.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET as string
    )

    return NextResponse.json({
      timestamp,
      folder,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    })
  } catch (error) {
    console.error('Gallery sign error:', error)
    const message = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
