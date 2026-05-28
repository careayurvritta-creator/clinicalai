import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const errorParam = searchParams.get('error')
  const errorDescription = searchParams.get('error_description')
  const next = searchParams.get('next') ?? '/'

  // If OAuth provider returned an error
  if (errorParam) {
    console.error('[Auth Callback] OAuth error:', errorParam, errorDescription)
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  if (code) {
    const cookieStore = await cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set({ name, value, ...options })
          })
        },
      },
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
    console.error('[Auth Callback] Code exchange error:', error.message)
    return NextResponse.redirect(
      `${origin}/login?error=exchange_failed&msg=${encodeURIComponent(error.message)}`
    )
  }

  // No code parameter — redirect with diagnostic info
  console.error('[Auth Callback] No code parameter in URL. Full URL:', request.url)
  return NextResponse.redirect(`${origin}/login?error=no_code`)
}
