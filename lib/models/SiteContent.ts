import mongoose, { Schema, InferSchemaType, Model } from 'mongoose'

const BlockSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, required: true },
    ca: { type: String, default: '' },
    es: { type: String, default: '' },
    en: { type: String, default: '' },
    publicId: { type: String, default: '' },
    url: { type: String, default: '' },
    youtubeId: { type: String, default: '' },
    captionCa: { type: String, default: '' },
    captionEs: { type: String, default: '' },
    captionEn: { type: String, default: '' },
    titleCa: { type: String, default: '' },
    titleEs: { type: String, default: '' },
    titleEn: { type: String, default: '' },
  },
  { _id: false }
)

const SiteContentSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, index: true },
    ca: { type: String, default: '' },
    es: { type: String, default: '' },
    en: { type: String, default: '' },
    blocks: { type: [BlockSchema], default: [] },
  },
  { timestamps: true }
)

export type SiteContentDoc = InferSchemaType<typeof SiteContentSchema> & { _id: mongoose.Types.ObjectId }

export const SiteContent: Model<SiteContentDoc> =
  (mongoose.models.SiteContent as Model<SiteContentDoc>) ||
  mongoose.model<SiteContentDoc>('SiteContent', SiteContentSchema)
