import { NextRequest, NextResponse } from 'next/server'
import { connectMongo } from '@/lib/mongo'
import { Booking } from '@/lib/models/Booking'
import { checkRateLimit } from '@/lib/rate-limit'

interface BookingRequest {
  name: string
  email: string
  phone: string
  date: string
  guests: number
  experience: string
  comments?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const { allowed, retryAfterSec } = checkRateLimit(`booking:${ip}`)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': String(retryAfterSec) } }
      )
    }

    const body: BookingRequest = await request.json()

    if (!body.name || !body.email || !body.phone || !body.date || !body.experience || !body.guests) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    if (!['gastronomica', 'cultural'].includes(body.experience)) {
      return NextResponse.json({ error: 'Invalid experience' }, { status: 400 })
    }

    const date = new Date(body.date)
    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 })
    }

    await connectMongo()

    await Booking.create({
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone.trim(),
      date,
      guests: body.guests,
      experience: body.experience,
      comments: body.comments?.trim() || '',
      status: 'pending',
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
