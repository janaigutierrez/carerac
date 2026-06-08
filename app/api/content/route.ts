import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { SiteContent } from '@/lib/models/SiteContent'
import { DEFAULT_CONTENT } from '@/lib/data/siteContentDefaults'
import { textsToParagraphBlocks, type ContentBlock } from '@/lib/data/contentBlocks'

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
    let blocks: ContentBlock[] = (doc?.blocks as unknown as ContentBlock[]) ?? []
    if (blocks.length === 0) {
      blocks = textsToParagraphBlocks({ ca, es, en })
    }
    return NextResponse.json({ content: { key, ca, es, en, blocks } })
  } catch (error) {
    console.error('Public content fetch error:', error)
    const blocks = textsToParagraphBlocks(fallback)
    return NextResponse.json({ content: { key, ...fallback, blocks } }, { status: 200 })
  }
}
