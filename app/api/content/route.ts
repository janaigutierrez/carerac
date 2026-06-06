import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { SiteContent } from '@/lib/models/SiteContent'

export const dynamic = 'force-dynamic'

const ALLOWED_KEYS = ['sobre-nosaltres']

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')
  if (!key || !ALLOWED_KEYS.includes(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 })
  }

  try {
    await connectMongo()
    const doc = await SiteContent.findOne({ key }).lean()
    return NextResponse.json({
      content: doc
        ? { key, ca: doc.ca, es: doc.es, en: doc.en }
        : { key, ca: '', es: '', en: '' },
    })
  } catch (error) {
    console.error('Public content fetch error:', error)
    return NextResponse.json({ content: { key, ca: '', es: '', en: '' } }, { status: 200 })
  }
}
