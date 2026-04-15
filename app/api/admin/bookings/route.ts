import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { Booking } from '@/lib/models/Booking'
import { requireAdmin } from '@/lib/session'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    await connectMongo()
    const status = request.nextUrl.searchParams.get('status')
    const query = status && ['pending', 'approved', 'rejected'].includes(status) ? { status } : {}

    const bookings = await Booking.find(query).sort({ createdAt: -1 }).lean()
    return NextResponse.json({ bookings })
  } catch (error) {
    console.error('Admin bookings list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
