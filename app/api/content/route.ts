import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { SiteContent } from '@/lib/models/SiteContent'
import { DEFAULT_CONTENT } from '@/lib/data/siteContentDefaults'

export const dynamic = 'force-dynamic'

const ALLOWED_KEYS = Object.keys(DEFAULT_CONTENT)

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get('key')
  if (!key || !ALLOWED_KEYS.includes(key)) {
    return NextResponse.json({ error: 'Invalid key' }, { status: 400 })
  }

  const fallback = DEFAULT_CONTENT[key]

  try {
    await connectMongo()
    const doc = await SiteContent.findOne({ key }).lean()
    const ca = doc?.ca || fallback.ca
    const es = doc?.es || fallback.es
    const en = doc?.en || fallback.en
    return NextResponse.json({ content: { key, ca, es, en } })
  } catch (error) {
    console.error('Public content fetch error:', error)
    return NextResponse.json({ content: { key, ...fallback } }, { status: 200 })
  }
}
