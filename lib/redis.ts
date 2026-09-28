const url = process.env.UPSTASH_REDIS_REST_URL
const token = process.env.UPSTASH_REDIS_REST_TOKEN

export function redisReady() { return Boolean(url && token) }

export async function redisCommand<T>(...parts: (string | number)[]): Promise<T> {
  if (!url || !token) throw new Error('Report storage is not configured')
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(parts),
    cache: 'no-store',
  })
  if (!response.ok) {
    const error = new Error('Report storage request failed')
    error.name = `UpstashHTTP${response.status}`
    throw error
  }
  const data = await response.json() as { result: T; error?: string }
  if (data.error) {
    const error = new Error('Report storage command failed')
    error.name = 'UpstashCommandError'
    throw error
  }
  return data.result
}
