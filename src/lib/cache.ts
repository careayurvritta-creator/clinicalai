/**
 * In-memory LRU cache for API responses
 * Used to cache RAG search results, knowledge base lookups, etc.
 */

interface CacheEntry<T> {
  value: T
  timestamp: number
  hits: number
}

class LRUCache<T> {
  private cache: Map<string, CacheEntry<T>>
  private maxSize: number
  private ttl: number

  constructor(maxSize: number = 1000, ttlMs: number = 5 * 60 * 1000) {
    this.cache = new Map()
    this.maxSize = maxSize
    this.ttl = ttlMs
  }

  get(key: string): T | undefined {
    const entry = this.cache.get(key)
    if (!entry) return undefined

    // Check TTL
    if (Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key)
      return undefined
    }

    // Move to end (most recently used)
    this.cache.delete(key)
    entry.hits++
    this.cache.set(key, entry)

    return entry.value
  }

  set(key: string, value: T): void {
    // Remove oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      hits: 0,
    })
  }

  has(key: string): boolean {
    return this.get(key) !== undefined
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

// Global cache instances
export const ragSearchCache = new LRUCache<string>(500, 5 * 60 * 1000) // 5 min TTL
export const knowledgeCache = new LRUCache<unknown>(1000, 10 * 60 * 1000) // 10 min TTL
export const embeddingCache = new LRUCache<number[]>(2000, 30 * 60 * 1000) // 30 min TTL

/**
 * Generate cache key from search parameters
 */
export function generateCacheKey(...parts: (string | number | boolean | undefined)[]): string {
  return parts
    .filter(p => p !== undefined)
    .map(p => String(p))
    .join(':')
}

/**
 * Stale-while-revalidate pattern
 * Returns cached value immediately, but triggers background refresh if stale
 */
export function staleWhileRevalidate<T>(
  cache: LRUCache<T>,
  key: string,
  fetcher: () => Promise<T>,
  staleTime: number = 2 * 60 * 1000 // 2 min
): { value: T | undefined; refresh: () => Promise<T> } {
  const cached = cache.get(key)

  if (cached) {
    return {
      value: cached,
      refresh: async () => {
        const fresh = await fetcher()
        cache.set(key, fresh)
        return fresh
      },
    }
  }

  return {
    value: undefined,
    refresh: async () => {
      const fresh = await fetcher()
      cache.set(key, fresh)
      return fresh
    },
  }
}
