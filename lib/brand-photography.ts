import type {AreaKey} from '@/types'
export type BrandPhoto = {src: string; alt: string; credit?: string}
// User-selected AI-generated photographs, optimized and hosted with the site.
export const creatorPortrait: BrandPhoto | null = null
export const areaPhotographs: Partial<Record<AreaKey, BrandPhoto>> = {
  mind: {src: '/photos/mind.webp', alt: 'A man studying and writing in a notebook at a bright desk'},
  body: {src: '/photos/body.webp', alt: 'A man preparing fresh vegetables in a sunlit kitchen'},
  spirit: {src: '/photos/spirit.webp', alt: 'An older man taking a quiet reflective pause beside a tree'},
  relationships: {src: '/photos/relationships.webp', alt: 'A multigenerational family sharing a conversation around a kitchen table'},
  money: {src: '/photos/money.webp', alt: 'A couple reviewing their household budget together'},
  direction: {src: '/photos/direction.webp', alt: 'A woman looking toward the horizon from a hillside path'},
}
