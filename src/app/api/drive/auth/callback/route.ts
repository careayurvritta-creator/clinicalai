// Google Drive OAuth Callback — Handle OAuth redirect

import { NextRequest, NextResponse } from 'next/server'
import { getOAuthTokens } from '@/lib/google-drive/client'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    return NextResponse.redirect(
      new URL(`/documents?drive_error=${encodeURIComponent(error)}`, request.url)
    )
  }

  if (!code) {
    return NextResponse.redirect(
      new URL('/documents?drive_error=no_code', request.url)
    )
  }

  try {
    const tokens = await getOAuthTokens(code)

    // In production, store tokens in Supabase user_drive_tokens table
    // For now, redirect with tokens in a cookie (httponly, secure)
    const response = NextResponse.redirect(
      new URL('/documents?drive_connected=true', request.url)
    )

    // Store tokens in secure cookies (temporary — should be in DB)
    response.cookies.set('drive_access_token', tokens.access_token ?? '', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 3600, // 1 hour
      path: '/',
    })

    if (tokens.refresh_token) {
      response.cookies.set('drive_refresh_token', tokens.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 30 * 24 * 3600, // 30 days
        path: '/',
      })
    }

    return response
  } catch (err) {
    console.error('Drive OAuth callback error:', err)
    return NextResponse.redirect(
      new URL(`/documents?drive_error=${encodeURIComponent('token_exchange_failed')}`, request.url)
    )
  }
}
