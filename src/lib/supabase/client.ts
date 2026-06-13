import { createBrowserClient } from '@supabase/ssr'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

let _supabase: SupabaseClient | null = null

// Browser client — uses cookies for PKCE verifier storage (required for SSR auth flow)
// Uses a Proxy for lazy initialization to avoid creating the client during module load
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!_supabase) {
      if (!supabaseUrl || !supabaseKey) {
        throw new Error(
          'Missing Supabase environment variables. ' +
          'Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY are set.'
        )
      }
      _supabase = createBrowserClient(supabaseUrl, supabaseKey)
    }
    return (_supabase as unknown as Record<string, unknown>)[prop as string]
  },
})

// Service role client for server-side operations (API routes, admin)
// Singleton per process to avoid creating a new client for every request
let _serverClient: SupabaseClient | null = null

export const createServerClient = () => {
  // Return cached client if already created
  if (_serverClient) return _serverClient

  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error(
      'Missing Supabase server environment variables. ' +
      'Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in Vercel environment variables.'
    )
  }
  _serverClient = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return _serverClient
}
