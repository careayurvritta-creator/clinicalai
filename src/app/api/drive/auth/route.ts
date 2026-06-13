// Google Drive OAuth — Start auth flow and handle callback
import { NextRequest, NextResponse } from 'next/server'
import { getOAuthUrl, getOAuthTokens } from '@/lib/google-drive/client'

export const dynamic = 'force-dynamic'

// GET /api/drive/auth — Start OAuth flow or handle callback
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    // Callback with auth code — store tokens in httpOnly cookies, don't expose in response
    try {
      const tokens = await getOAuthTokens(code)
      const response = NextResponse.json({ success: true, drive_connected: true })
      response.cookies.set('drive_access_token', tokens.access_token!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 3600, // 1 hour
      })
      if (tokens.refresh_token) {
        response.cookies.set('drive_refresh_token', tokens.refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 30, // 30 days
        })
      }
      return response
    } catch (error) {
      console.error('Drive auth error:', error)
      return NextResponse.json(
        { error: 'Failed to exchange auth code' },
        { status: 400 }
      )
    }
  }

  // No code — start OAuth flow
  try {
    const authUrl = getOAuthUrl()
    return NextResponse.json({ authUrl })
  } catch (error) {
    console.error('Drive auth error:', error)
    return NextResponse.json(
      { error: 'Google Drive not configured' },
      { status: 500 }
    )
  }
}
