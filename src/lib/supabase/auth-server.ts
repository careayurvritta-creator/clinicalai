import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

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
      set(name: string, value: string, options: Record<string, unknown>) {
        try { cookieStore.set({ name, value, ...options }) } catch { /* called from RSC, ignore */ }
      },
      remove(name: string, options: Record<string, unknown>) {
        try { cookieStore.set({ name, value: '', ...options }) } catch { /* called from RSC, ignore */ }
      },
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
      set(name: string, value: string, options: Record<string, unknown>) {
        try { cookieStore.set({ name, value, ...options }) } catch { /* called from RSC, ignore */ }
      },
      remove(name: string, options: Record<string, unknown>) {
        try { cookieStore.set({ name, value: '', ...options }) } catch { /* called from RSC, ignore */ }
      },
    },
  })

  const { data: { user }, error } = await supabaseServer.auth.getUser()
  if (error || !user) return null
  return user
}

export async function getUserProfile(userId: string) {
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
