const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 10

const buckets = new Map<string, number[]>()

export function checkRateLimit(key: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now()
  const timestamps = (buckets.get(key) || []).filter(t => now - t < WINDOW_MS)

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = timestamps[0]
    const retryAfterSec = Math.ceil((WINDOW_MS - (now - oldest)) / 1000)
    return { allowed: false, retryAfterSec }
  }

  timestamps.push(now)
  buckets.set(key, timestamps)

  if (buckets.size > 1000) {
    for (const [k, arr] of buckets) {
      if (arr.every(t => now - t >= WINDOW_MS)) buckets.delete(k)
    }
  }

  return { allowed: true, retryAfterSec: 0 }
}
