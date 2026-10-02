import { deepDiveQuestions } from '@/lib/deep-dive-data'
import type { AreaKey, QuizResults } from '@/types'

export const intakeFields = [
  { key: 'goal', label: 'What would you most like to improve in the next 30 days?', required: true },
  { key: 'obstacle', label: 'What is getting in the way right now?', required: true },
  { key: 'tried', label: 'What have you already tried, and what helped or did not help?', required: false },
  { key: 'time', label: 'How much time could you realistically devote each week?', required: true },
  { key: 'strengths', label: 'Which of your strengths do you feel you can rely on?', required: false },
  { key: 'help', label: 'What kind of help would you actually use?', required: true },
  { key: 'budget', label: 'What budget, if any, are you comfortable spending on recommended resources?', required: true },
  { key: 'avoid', label: 'Is there anything you want the report to avoid assuming about your circumstances?', required: false },
] as const

export type IntakeKey = typeof intakeFields[number]['key']
export type ReportIntake = Record<IntakeKey, string>
export type DeepDiveReportInput = { answers: Record<string, number>; completedAt: string }
export type ReportOrderInput = {
  results: QuizResults
  answers: Record<string, number>
  intake: ReportIntake
  deepDives: Partial<Record<AreaKey, DeepDiveReportInput>>
}

export function isReportIntake(value: unknown): value is ReportIntake {
  if (!value || typeof value !== 'object') return false
  const fields = value as Record<string, unknown>
  return Object.keys(fields).length === intakeFields.length && intakeFields.every(({ key, required }) => {
    const answer = fields[key]
    return typeof answer === 'string' && answer.length <= 600 && (!required || answer.trim().length > 0)
  })
}

export function isDeepDiveInput(value: unknown, area: AreaKey): value is DeepDiveReportInput {
  if (!value || typeof value !== 'object') return false
  const dive = value as Partial<DeepDiveReportInput>
  const questions = deepDiveQuestions[area]
  return Boolean(dive.answers && typeof dive.answers === 'object' &&
    Object.keys(dive.answers).length === questions.length &&
    questions.every(q => Number.isInteger(dive.answers?.[q.id]) &&
      Number(dive.answers?.[q.id]) >= 1 && Number(dive.answers?.[q.id]) <= 5) &&
    typeof dive.completedAt === 'string' && !Number.isNaN(Date.parse(dive.completedAt)))
}
