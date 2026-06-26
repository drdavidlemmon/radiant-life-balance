import { QuizQuestion } from '@/types'

// Scoring: False=1 | Mostly False=2 | Neutral=3 | Mostly True=4 | True=5
// Original questionnaire by Dr. David Lemmon, ND — ReviveFamilyHealingCenter.com
// Each area: 5 questions × 5 max = 25 points → converted to 0–100%

const OPTS = [
  { value: 1, label: 'False — this does not describe me at all' },
  { value: 2, label: 'Mostly False — rarely true for me' },
  { value: 3, label: 'Neutral — sometimes true, sometimes not' },
  { value: 4, label: 'Mostly True — this is generally true for me' },
  { value: 5, label: 'True — this describes me very well' },
]

export const quizQuestions: QuizQuestion[] = [
  // ─── BODY ───────────────────────────────────────────────────────────────
  {
    id: 'body_1', area: 'body', subcategory: 'energy',
    question: 'I have great energy levels, and my body feels good most of the time.',
    options: OPTS,
  },
  {
    id: 'body_2', area: 'body', subcategory: 'exercise',
    question: 'I enjoy a physically active lifestyle — exercising, dancing, play, work, and movement.',
    options: OPTS,
  },
  {
    id: 'body_3', area: 'body', subcategory: 'nutrition',
    question: 'I almost always eat foods that I know build, fuel, and rejuvenate my body.',
    options: OPTS,
  },
  {
    id: 'body_4', area: 'body', subcategory: 'sleep',
    question: 'I get 7–8 hours of quality sleep nearly every night.',
    options: OPTS,
  },
  {
    id: 'body_5', area: 'body', subcategory: 'specific-conditions',
    question: 'I am happy with my body fat percentage and physical appearance.',
    options: OPTS,
  },

  // ─── MIND ───────────────────────────────────────────────────────────────
  {
    id: 'mind_1', area: 'mind', subcategory: 'learning',
    question: 'I love to learn through reading, listening to, and watching quality media.',
    options: OPTS,
  },
  {
    id: 'mind_2', area: 'mind', subcategory: 'memory',
    question: 'My memory is clear, and I can recall any important information at will.',
    options: OPTS,
  },
  {
    id: 'mind_3', area: 'mind', subcategory: 'focus',
    question: 'I manage life\'s stresses with breathing, meditation, massage, exercise, or other healthy tools.',
    options: OPTS,
  },
  {
    id: 'mind_4', area: 'mind', subcategory: 'focus',
    question: 'My thoughts are positive, optimistic, and empowering most of the time.',
    options: OPTS,
  },
  {
    id: 'mind_5', area: 'mind', subcategory: 'creativity',
    question: 'My mind can generate creative ideas at will.',
    options: OPTS,
  },

  // ─── SPIRIT ─────────────────────────────────────────────────────────────
  {
    id: 'spirit_1', area: 'spirit', subcategory: 'gratitude',
    question: 'I feel and express gratitude daily.',
    options: OPTS,
  },
  {
    id: 'spirit_2', area: 'spirit', subcategory: 'happiness',
    question: 'I take time to study and ponder faith-promoting literature.',
    options: OPTS,
  },
  {
    id: 'spirit_3', area: 'spirit', subcategory: 'meditation',
    question: 'I pray or meditate regularly as a way to commune with The Divine.',
    options: OPTS,
  },
  {
    id: 'spirit_4', area: 'spirit', subcategory: 'forgiveness',
    question: 'I love and easily forgive others.',
    options: OPTS,
  },
  {
    id: 'spirit_5', area: 'spirit', subcategory: 'service',
    question: 'I donate a part of my time and/or money to worthwhile causes I believe in.',
    options: OPTS,
  },

  // ─── DIRECTION ──────────────────────────────────────────────────────────
  {
    id: 'direction_1', area: 'direction', subcategory: 'life-vision',
    question: 'I have a strong sense of my purpose for being on the earth.',
    options: OPTS,
  },
  {
    id: 'direction_2', area: 'direction', subcategory: 'life-vision',
    question: 'I live my life by a set of self-chosen values.',
    options: OPTS,
  },
  {
    id: 'direction_3', area: 'direction', subcategory: 'time-management',
    question: 'I plan and organize my time in a way that works for me.',
    options: OPTS,
  },
  {
    id: 'direction_4', area: 'direction', subcategory: 'goal-setting',
    question: 'I have a written set of goals that are important to me.',
    options: OPTS,
  },
  {
    id: 'direction_5', area: 'direction', subcategory: 'habits',
    question: 'I spend most of my time on my life\'s highest priorities.',
    options: OPTS,
  },

  // ─── RELATIONSHIPS ───────────────────────────────────────────────────────
  {
    id: 'relationships_1', area: 'relationships', subcategory: 'communication',
    question: 'I see my relationships as a place to give and share, as well as receive.',
    options: OPTS,
  },
  {
    id: 'relationships_2', area: 'relationships', subcategory: 'family',
    question: 'I love and honor my family members.',
    options: OPTS,
  },
  {
    id: 'relationships_3', area: 'relationships', subcategory: 'communication',
    question: 'I am a good listener, and I seek to understand others first.',
    options: OPTS,
  },
  {
    id: 'relationships_4', area: 'relationships', subcategory: 'romantic',
    question: 'I am happy with my current level of sexual intimacy, or the absence thereof.',
    options: OPTS,
  },
  {
    id: 'relationships_5', area: 'relationships', subcategory: 'networking',
    question: 'I get along well with nearly everyone I live and work with.',
    options: OPTS,
  },

  // ─── MONEY ──────────────────────────────────────────────────────────────
  {
    id: 'money_1', area: 'money', subcategory: 'budgeting',
    question: 'I spend less money than I earn.',
    options: OPTS,
  },
  {
    id: 'money_2', area: 'money', subcategory: 'budgeting',
    question: 'I am debt free, or I have an active debt-reduction plan.',
    options: OPTS,
  },
  {
    id: 'money_3', area: 'money', subcategory: 'investing',
    question: 'I am building sources of passive income through investments or businesses.',
    options: OPTS,
  },
  {
    id: 'money_4', area: 'money', subcategory: 'wealth-mindset',
    question: 'I have healthy beliefs about the value of money.',
    options: OPTS,
  },
  {
    id: 'money_5', area: 'money', subcategory: 'budgeting',
    question: 'I have a regular savings plan to provide for future contingencies.',
    options: OPTS,
  },
]
