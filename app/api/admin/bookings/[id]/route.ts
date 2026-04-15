import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectMongo } from '@/lib/mongo'
import { Booking } from '@/lib/models/Booking'
import { requireAdmin } from '@/lib/session'

const VALID_STATUSES = ['pending', 'approved', 'rejected'] as const

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  try {
    const { status } = await request.json()
    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    await connectMongo()
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true }).lean()
    if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    return NextResponse.json({ booking })
  } catch (error) {
    console.error('Admin booking update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  try {
    await connectMongo()
    const result = await Booking.findByIdAndDelete(id).lean()
    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin booking delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
