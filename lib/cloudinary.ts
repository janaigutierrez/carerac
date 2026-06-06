import { v2 as cloudinary } from 'cloudinary'

let configured = false

export function getCloudinary() {
  if (!configured) {
    const cloud_name = process.env.CLOUDINARY_CLOUD_NAME
    const api_key = process.env.CLOUDINARY_API_KEY
    const api_secret = process.env.CLOUDINARY_API_SECRET
    if (!cloud_name || !api_key || !api_secret) {
      throw new Error('Cloudinary env vars missing (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)')
    }
    cloudinary.config({ cloud_name, api_key, api_secret })
    configured = true
  }
  return cloudinary
}

export function buildCloudinaryUrl(publicId: string, opts: { width?: number; height?: number; quality?: string } = {}) {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  if (!cloud) return ''
  const transforms: string[] = ['f_auto', `q_${opts.quality || 'auto'}`]
  if (opts.width) transforms.push(`w_${opts.width}`)
  if (opts.height) transforms.push(`h_${opts.height}`)
  if (opts.width || opts.height) transforms.push('c_fill')
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms.join(',')}/${publicId}`
}
