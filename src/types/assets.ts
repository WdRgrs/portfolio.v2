export interface BaseAsset {
  id: string
  path: string
  alt: string
  title?: string
  description?: string
  date?: string | Date
  tags?: string[]
}

export interface ImageAsset extends BaseAsset {
  type: 'image'
  width?: number
  height?: number
  placeholder?: string
}

export interface VideoAsset extends BaseAsset {
  type: 'video'
  poster?: string
  duration?: number
  width?: number
  height?: number
}

export type Asset = ImageAsset | VideoAsset

export interface AssetCollection {
  section: 'software' | 'welding' | 'photography'
  images: ImageAsset[]
  videos: VideoAsset[]
}