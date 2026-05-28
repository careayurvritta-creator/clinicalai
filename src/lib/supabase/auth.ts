import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from './client'

// ─── Client-side auth ─────────────────────────────────────

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export function onAuthStateChange(callback: (session: unknown) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
}

// ─── Server-side auth (for API routes & server components) ─

export async function getServerSession() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

  const supabaseServer = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set() {},
      remove() {},
    },
  })

  const { data: { session } } = await supabaseServer.auth.getSession()
  return session
}

export async function getAuthUser() {
  const cookieStore = await cookies()
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

  const supabaseServer = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set() {},
      remove() {},
    },
  })

  const { data: { user }, error } = await supabaseServer.auth.getUser()
  if (error || !user) return null
  return user
}

export async function getUserProfile(userId: string) {
  // Use service role client (no cookie dependency — safe in fire-and-forget)
  const { createServerClient: createServiceClient } = await import('@/lib/supabase/client')
  const supabase = createServiceClient()

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('auth_user_id', userId)
    .single()

  return data
}

// ─── API route auth guard ──────────────────────────────────

export async function requireAuth(): Promise<
  | { user: NonNullable<Awaited<ReturnType<typeof getAuthUser>>>; error?: never }
  | { user?: never; error: NextResponse }
> {
  const user = await getAuthUser()
  if (!user) {
    return {
      error: NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      ),
    }
  }
  return { user }
}
