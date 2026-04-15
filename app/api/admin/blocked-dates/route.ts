import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { BlockedDate } from '@/lib/models/BlockedDate'
import { requireAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectMongo()
    const blocked = await BlockedDate.find().sort({ date: 1 }).lean()
    return NextResponse.json({ blocked })
  } catch (error) {
    console.error('Blocked dates list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const { date, reason } = await request.json()
    if (!date) return NextResponse.json({ error: 'Date required' }, { status: 400 })

    const parsed = new Date(date)
    if (isNaN(parsed.getTime())) return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    parsed.setUTCHours(0, 0, 0, 0)

    await connectMongo()
    const doc = await BlockedDate.findOneAndUpdate(
      { date: parsed },
      { date: parsed, reason: reason || '' },
      { upsert: true, new: true }
    ).lean()

    return NextResponse.json({ blocked: doc })
  } catch (error) {
    console.error('Block date error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
