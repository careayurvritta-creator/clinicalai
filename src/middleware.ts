import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// ─── Rate limiting ────────────────────────────────────────

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000
const RATE_LIMITS: Record<string, number> = {
  '/api/chat': 20,
  '/api/intake': 30,
  '/api/treatment-protocol': 10,
  '/api/vision': 10,
  '/api/pdf': 15,
  '/api/analyze-investigation': 15,
}

function getRateLimit(pathname: string): number {
  for (const [path, limit] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(path)) return limit
  }
  return 60
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function checkRateLimit(key: string, limit: number): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(key)
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetTime) rateLimitMap.delete(key)
  }
}, 60 * 1000)

// ─── Route classification ─────────────────────────────────

const PROTECTED_ROUTES = ['/', '/cases', '/patients', '/admin']
const AUTH_ROUTES = ['/login']
const PUBLIC_ROUTES = ['/auth/callback', '/auth/auth-code-error']

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => pathname === route || pathname.startsWith(route + '/'))
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
}

// ─── Middleware ────────────────────────────────────────────

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {
    const clientIP = getClientIP(request)
    const limit = getRateLimit(pathname)
    const rateLimitKey = `${clientIP}:${pathname.split('/').slice(0, 3).join('/')}`

    if (!checkRateLimit(rateLimitKey, limit)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.', code: 'RATE_LIMITED' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      )
    }
  }

  // CORS preflight
  if (pathname.startsWith('/api/') && request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://clinicalai.ayurvrittaayurveda.in',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    })
  }

  // Static files and public routes — skip auth
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname === '/manifest.json' ||
    pathname === '/sw.js' ||
    pathname === '/icon-192.svg' ||
    pathname.startsWith('/icons/') ||
    isPublicRoute(pathname)
  ) {
    const response = NextResponse.next()
    addSecurityHeaders(response, pathname)
    return response
  }

  // TODO: Re-enable auth once PKCE cookie flow is fixed
  // Auth check temporarily disabled — Google OAuth PKCE flow needs
  // createBrowserClient on client + createServerClient on server
  // both using @supabase/ssr cookie storage for code verifier.
  const supabaseResponse = NextResponse.next({ request })
  addSecurityHeaders(supabaseResponse, pathname)
  return supabaseResponse

  // ─── Auth check (disabled) ───────────────────────────────
  // let supabaseResponse = NextResponse.next({ request })
  //
  // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  // const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  //
  // if (!supabaseUrl || !supabaseKey) {
  //   addSecurityHeaders(supabaseResponse, pathname)
  //   return supabaseResponse
  // }
  //
  // const supabase = createServerClient(supabaseUrl, supabaseKey, {
  //   cookies: {
  //     getAll() { return request.cookies.getAll() },
  //     setAll(cookiesToSet) {
  //       cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
  //       supabaseResponse = NextResponse.next({ request })
  //       cookiesToSet.forEach(({ name, value, options }) =>
  //         supabaseResponse.cookies.set(name, value, options))
  //     },
  //   },
  // })
  //
  // const { data: { user } } = await supabase.auth.getUser()
  //
  // if (isProtectedRoute(pathname) && !user) {
  //   const loginUrl = new URL('/login', request.url)
  //   loginUrl.searchParams.set('next', pathname + request.nextUrl.search)
  //   return NextResponse.redirect(loginUrl)
  // }
  //
  // if (isAuthRoute(pathname) && user) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
  //
  // if (pathname.startsWith('/admin') && user) {
  //   const { data: profile } = await supabase
  //     .from('profiles').select('role').eq('id', user.id).single()
  //   if (!profile || profile.role !== 'admin') {
  //     return NextResponse.redirect(new URL('/', request.url))
  //   }
  // }
  //
  // addSecurityHeaders(supabaseResponse, pathname)
  // return supabaseResponse
}

function addSecurityHeaders(response: NextResponse, pathname: string) {
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Origin', 'https://clinicalai.ayurvrittaayurveda.in')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|sw.js|icon-192.svg|icons/).*)',
  ],
}
