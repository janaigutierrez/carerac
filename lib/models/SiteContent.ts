import mongoose, { Schema, InferSchemaType, Model } from 'mongoose'

const SiteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    ca: { type: String, default: '' },
    es: { type: String, default: '' },
    en: { type: String, default: '' },
  },
  { timestamps: true }
)

export type SiteContentDoc = InferSchemaType<typeof SiteContentSchema> & { _id: mongoose.Types.ObjectId }

export const SiteContent: Model<SiteContentDoc> =
  (mongoose.models.SiteContent as Model<SiteContentDoc>) ||
  mongoose.model<SiteContentDoc>('SiteContent', SiteContentSchema)
