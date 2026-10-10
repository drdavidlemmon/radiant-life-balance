import type {AreaKey} from '@/types'
export type BrandPhoto = {src: string; alt: string; credit?: string}
// Add user-approved, locally hosted photographs here after consent/rights are confirmed.
export const creatorPortrait: BrandPhoto | null = null
export const areaPhotographs: Partial<Record<AreaKey, BrandPhoto>> = {}
