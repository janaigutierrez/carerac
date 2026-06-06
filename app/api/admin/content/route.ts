import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { SiteContent } from '@/lib/models/SiteContent'
import { requireAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'

const ALLOWED_KEYS = ['sobre-nosaltres'] as const
type AllowedKey = typeof ALLOWED_KEYS[number]

function isAllowedKey(k: unknown): k is AllowedKey {
  return typeof k === 'string' && (ALLOWED_KEYS as readonly string[]).includes(k)
}

export async function GET(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const key = request.nextUrl.searchParams.get('key')
  if (!isAllowedKey(key)) return NextResponse.json({ error: 'Invalid key' }, { status: 400 })

  try {
    await connectMongo()
    const doc = await SiteContent.findOne({ key }).lean()
    return NextResponse.json({ content: doc ?? { key, ca: '', es: '', en: '' } })
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { key, ca, es, en } = await request.json()
    if (!isAllowedKey(key)) return NextResponse.json({ error: 'Invalid key' }, { status: 400 })

    await connectMongo()
    const doc = await SiteContent.findOneAndUpdate(
      { key },
      { key, ca: ca || '', es: es || '', en: en || '' },
      { upsert: true, new: true }
    ).lean()

    return NextResponse.json({ content: doc })
  } catch (error) {
    console.error('Content save error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
