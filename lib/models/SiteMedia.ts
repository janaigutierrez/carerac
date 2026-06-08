import mongoose, { Schema, InferSchemaType, Model } from 'mongoose'

const SiteMediaSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    publicId: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
)

export type SiteMediaDoc = InferSchemaType<typeof SiteMediaSchema> & { _id: mongoose.Types.ObjectId }

export const SiteMedia: Model<SiteMediaDoc> =
  (mongoose.models.SiteMedia as Model<SiteMediaDoc>) ||
  mongoose.model<SiteMediaDoc>('SiteMedia', SiteMediaSchema)
