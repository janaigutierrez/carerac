import mongoose, { Schema, InferSchemaType, Model } from 'mongoose'

const BookingSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    date: { type: Date, required: true, index: true },
    guests: { type: Number, required: true, min: 1 },
    experience: { type: String, required: true, enum: ['gastronomica', 'cultural'] },
    comments: { type: String, default: '' },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
      index: true,
    },
  },
  { timestamps: true }
)

export type BookingDoc = InferSchemaType<typeof BookingSchema> & { _id: mongoose.Types.ObjectId }

export const Booking: Model<BookingDoc> =
  (mongoose.models.Booking as Model<BookingDoc>) ||
  mongoose.model<BookingDoc>('Booking', BookingSchema)
