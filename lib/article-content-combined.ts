// Combined article content — all 6 life areas
// Merges: Body+Mind (article-content.ts), Spirit, Relationships, Money, Direction

import { ARTICLE_CONTENT as BODY_MIND_CONTENT } from './article-content'
import { SPIRIT_CONTENT } from './article-content-spirit'
import { RELATIONSHIPS_CONTENT } from './article-content-relationships'
import { MONEY_CONTENT } from './article-content-money'
import { DIRECTION_CONTENT } from './article-content-direction'

export const ALL_ARTICLE_CONTENT: Record<string, string> = {
  ...BODY_MIND_CONTENT,
  ...SPIRIT_CONTENT,
  ...RELATIONSHIPS_CONTENT,
  ...MONEY_CONTENT,
  ...DIRECTION_CONTENT,
}
