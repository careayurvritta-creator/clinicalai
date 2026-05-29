// Google Drive OAuth — Start auth flow and handle callback
import { NextRequest, NextResponse } from 'next/server'
import { getOAuthUrl, getOAuthTokens } from '@/lib/google-drive/client'

export const dynamic = 'force-dynamic'

// GET /api/drive/auth — Start OAuth flow or handle callback
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    // Callback with auth code
    try {
      const tokens = await getOAuthTokens(code)
      return NextResponse.json({
        success: true,
        tokens: {
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token,
          expiry_date: tokens.expiry_date,
        },
      })
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
