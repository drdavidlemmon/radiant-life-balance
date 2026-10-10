import {redisCommand} from '@/lib/redis'
const COUNT_ONCE = `
if redis.call('SET', KEYS[1], '1', 'NX', 'EX', 34560000) then
  redis.call('INCR', KEYS[2])
  if ARGV[1] ~= '' then redis.call('INCR', KEYS[3]) end
  if tonumber(ARGV[2]) > 0 then
    redis.call('INCRBY', KEYS[4], ARGV[2])
    if ARGV[1] ~= '' then redis.call('INCRBY', KEYS[5], ARGV[2]) end
  end
  return 1
end
return 0`
export async function recordReportMetric(event: 'report_purchase' | 'report_ready', token: string, live: boolean, ref = '', cents = 0) {
  if (!live) return
  const slug = /^[a-zA-Z0-9_-]{1,40}$/.test(ref) ? ref : ''
  const day = new Date().toISOString().slice(0,10)
  try {
    await redisCommand('EVAL', COUNT_ONCE, 5, `metrics:dedupe:${event}:${token}`,
      `metrics:${day}:${event}`, `metrics:${day}:${event}:ref:${slug}`,
      `metrics:${day}:report_revenue_cents`, `metrics:${day}:report_revenue_cents:ref:${slug}`, slug, cents)
  } catch {console.error('Report metrics unavailable', {event})}
}
