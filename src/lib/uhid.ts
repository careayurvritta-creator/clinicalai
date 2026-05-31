import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/**
 * Generate a unique UHID in format UHID-YYMMNNN
 * e.g., UHID-2605001 for the first patient created in May 2026
 */
export async function generateUHID(): Promise<string> {
  const now = new Date()
  const yy = String(now.getFullYear()).slice(-2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const prefix = `UHID-${yy}${mm}`

  // Count patients created this month
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1).toISOString()

  const { count, error } = await supabase
    .from('patients')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfMonth)
    .lt('created_at', startOfNextMonth)

  if (error) {
    console.error('UHID generation error:', error)
    // Fallback: use timestamp-based suffix
    const fallback = String(Date.now()).slice(-3)
    return `${prefix}${fallback}`
  }

  const sequence = String((count || 0) + 1).padStart(3, '0')
  return `${prefix}${sequence}`
}
