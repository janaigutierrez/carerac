import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { requireAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'

export async function POST() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME

  if (!apiKey || !apiSecret || !cloudName) {
    console.error('Cloudinary env vars missing on function runtime:', {
      hasKey: !!apiKey,
      hasSecret: !!apiSecret,
      hasCloud: !!cloudName,
    })
    return NextResponse.json(
      { error: 'Cloudinary credentials not configured on server' },
      { status: 500 }
    )
  }

  try {
    const timestamp = Math.round(Date.now() / 1000)
    const folder = 'carerac/gallery'

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      apiSecret
    )

    return NextResponse.json({ timestamp, folder, signature, apiKey, cloudName })
  } catch (error) {
    console.error('Sign generation failed:', error)
    const message = error instanceof Error ? error.message : 'Sign error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
