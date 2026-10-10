import type { AreaKey, QuizResults } from '@/types'
export const AREA_NAMES: Record<AreaKey, string> = {mind: 'Mind', body: 'Body', spirit: 'Spirit', relationships: 'Relationships', money: 'Money', direction: 'Direction'}
export function shareSummary(results: QuizResults, includeGrowth = false) {
  const keys = Object.keys(AREA_NAMES) as AreaKey[]
  const high = Math.max(...keys.map(key => results.scores[key]))
  const low = Math.min(...keys.map(key => results.scores[key]))
  const strongest = keys.find(key => results.scores[key] === high)!
  const growth = results.priorities.find(key => results.scores[key] === low) || keys.find(key => results.scores[key] === low)!
  const tied = keys.filter(key => results.scores[key] === high).length > 1
  const growthTied = keys.filter(key => results.scores[key] === low).length > 1
  const strengthLabel = tied ? 'One of my strongest areas' : 'My strongest area'
  const growthLabel = high === low ? 'An area I can keep building on' : growthTied ? 'One area I want to strengthen' : 'An area I want to strengthen'
  const strengthLine = `${strengthLabel} was ${AREA_NAMES[strongest]} at ${high}%.`
  const growthLine = high === low ? `All six areas tied at ${high}%; I can keep growing in each one.` : `${growthLabel} was ${AREA_NAMES[growth]} at ${low}%.`
  const text = `I took the Radiant Life Balance quiz!\n\n${strengthLine}${includeGrowth ? `\n${growthLine}` : ''}\n\nWhat is your strongest area? Take the free quiz:`
  return {strongest, growth, high, low, strengthLabel, growthLabel, strengthLine, growthLine, text}
}
