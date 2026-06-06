import mongoose, { Schema, InferSchemaType, Model } from 'mongoose'

const GalleryImageSchema = new Schema(
  {
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    caption: { type: String, default: '' },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
)

export type GalleryImageDoc = InferSchemaType<typeof GalleryImageSchema> & { _id: mongoose.Types.ObjectId }

export const GalleryImage: Model<GalleryImageDoc> =
  (mongoose.models.GalleryImage as Model<GalleryImageDoc>) ||
  mongoose.model<GalleryImageDoc>('GalleryImage', GalleryImageSchema)
