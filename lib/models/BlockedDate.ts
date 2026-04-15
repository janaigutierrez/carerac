import mongoose, { Schema, InferSchemaType, Model } from 'mongoose'

const BlockedDateSchema = new Schema(
  {
    date: { type: Date, required: true, unique: true, index: true },
    reason: { type: String, default: '' },
  },
  { timestamps: true }
)

export type BlockedDateDoc = InferSchemaType<typeof BlockedDateSchema> & { _id: mongoose.Types.ObjectId }

export const BlockedDate: Model<BlockedDateDoc> =
  (mongoose.models.BlockedDate as Model<BlockedDateDoc>) ||
  mongoose.model<BlockedDateDoc>('BlockedDate', BlockedDateSchema)
