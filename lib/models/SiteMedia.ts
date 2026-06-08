import mongoose, { Schema, InferSchemaType, Model } from 'mongoose'

const SiteMediaSchema = new Schema(
  {
    slot: { type: String, required: true, index: true },
    publicId: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

SiteMediaSchema.index({ slot: 1, order: 1 })

export type SiteMediaDoc = InferSchemaType<typeof SiteMediaSchema> & { _id: mongoose.Types.ObjectId }

export const SiteMedia: Model<SiteMediaDoc> =
  (mongoose.models.SiteMedia as Model<SiteMediaDoc>) ||
  mongoose.model<SiteMediaDoc>('SiteMedia', SiteMediaSchema)
