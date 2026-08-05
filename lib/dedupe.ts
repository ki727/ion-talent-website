/**
 * Best-effort duplicate-submission guard for serverless route handlers.
 *
 * This is a per-instance in-memory cache, not a persistent store — on Vercel
 * a cold start or a request routed to a different instance won't see prior
 * entries. It exists purely to catch the common case (a user double-clicking
 * submit, or a client retry firing twice in quick succession), not to act as
 * a hardened anti-abuse layer. The primary duplicate-submission protection is
 * client-side (the submit button disables itself immediately).
 */

const WINDOW_MS = 30_000
const recentSubmissions = new Map<string, number>()

export function isDuplicateSubmission(key: string): boolean {
  const now = Date.now()

  for (const [existingKey, timestamp] of recentSubmissions) {
    if (now - timestamp > WINDOW_MS) recentSubmissions.delete(existingKey)
  }

  if (recentSubmissions.has(key)) return true

  recentSubmissions.set(key, now)
  return false
}
