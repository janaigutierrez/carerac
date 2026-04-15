import { NextRequest, NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectMongo } from '@/lib/mongo'
import { BlockedDate } from '@/lib/models/BlockedDate'
import { requireAdmin } from '@/lib/session'

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  try {
    await connectMongo()
    const result = await BlockedDate.findByIdAndDelete(id).lean()
    if (!result) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Blocked date delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
