import { createBrowserClient } from '@supabase/ssr'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

let _supabase: SupabaseClient | null = null

// Browser client — uses cookies for PKCE verifier storage (required for SSR auth flow)
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables')
      }
      _supabase = createBrowserClient(supabaseUrl, supabaseKey)
    }
    return (_supabase as unknown as Record<string, unknown>)[prop as string]
  },
})

// Service role client for server-side operations (API routes, admin)
export const createServerClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY - ensure it is set in Vercel environment variables')
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}
