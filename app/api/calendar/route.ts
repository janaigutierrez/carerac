import { NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { Booking } from '@/lib/models/Booking'
import { BlockedDate } from '@/lib/models/BlockedDate'

export const dynamic = 'force-dynamic'

function toISODate(d: Date): string {
  return d.toISOString().split('T')[0]
}

export async function GET() {
  try {
    await connectMongo()

    const now = new Date()
    now.setHours(0, 0, 0, 0)
    const oneYearAhead = new Date(now)
    oneYearAhead.setFullYear(oneYearAhead.getFullYear() + 1)

    const [approved, blocked] = await Promise.all([
      Booking.find(
        { status: 'approved', date: { $gte: now, $lte: oneYearAhead } },
        { date: 1 }
      ).lean(),
      BlockedDate.find({ date: { $gte: now, $lte: oneYearAhead } }, { date: 1 }).lean(),
    ])

    const dates = new Set<string>()
    for (const b of approved) dates.add(toISODate(b.date as Date))
    for (const b of blocked) dates.add(toISODate(b.date as Date))

    return NextResponse.json({ occupiedDates: Array.from(dates) })
  } catch (error) {
    console.error('Calendar fetch error:', error)
    return NextResponse.json({ occupiedDates: [] }, { status: 200 })
  }
}
