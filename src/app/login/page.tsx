'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(() => {
    if (!errorParam) return null
    if (errorParam === 'exchange_failed')
      return `Code exchange failed: ${searchParams.get('msg') || 'unknown error'}`
    if (errorParam === 'no_code') return 'No auth code received from Supabase. Check redirect URL config.'
    return 'Authentication failed. Please try again.'
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // If already logged in, redirect
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.replace('/')
    })
  }, [router])

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })
      if (signInError) throw signInError
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
      setLoading(false)
    }
  }

  return (
    <div className="relative flex items-center justify-center min-h-[100dvh] overflow-hidden bg-[#080c0a]">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1210] via-[#080c0a] to-[#0d0a14]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(260_84%_68%_/_0.06)_0%,_transparent_70%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_hsl(150_60%_25%_/_0.08)_0%,_transparent_60%)]" />

      {/* Decorative dots */}
      <div className="absolute top-8 left-8 w-1 h-1 rounded-full bg-primary/20" />
      <div className="absolute top-12 right-12 w-1.5 h-1.5 rounded-full bg-emerald-500/15" />
      <div className="absolute bottom-16 left-16 w-1 h-1 rounded-full bg-primary/15" />
      <div className="absolute bottom-8 right-8 w-2 h-2 rounded-full bg-emerald-500/10" />

      {/* Main content */}
      <div
        className={`relative z-10 flex flex-col items-center gap-8 px-6 transition-all duration-700 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {/* Lotus icon */}
        <div className="relative">
          <div className="absolute inset-0 blur-2xl bg-primary/10 rounded-full scale-150" />
          <svg
            className="relative w-20 h-20 text-primary/80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Center petal */}
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.6" />
            {/* Left petals */}
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.5" transform="rotate(-25 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.4" transform="rotate(-50 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.3" transform="rotate(-75 40 32)" />
            {/* Right petals */}
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.5" transform="rotate(25 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.4" transform="rotate(50 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.3" transform="rotate(75 40 32)" />
            {/* Center circle */}
            <circle cx="40" cy="32" r="4" fill="currentColor" opacity="0.8" />
            {/* Base curve */}
            <path d="M20 55 Q30 48 40 50 Q50 48 60 55" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
            <path d="M16 60 Q28 52 40 54 Q52 52 64 60" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.25" />
          </svg>
        </div>

        {/* Brand text */}
        <div className="text-center space-y-1.5">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Ayurved AI
          </h1>
          <p className="text-sm text-muted-foreground tracking-wide">
            Clinical Intelligence
          </p>
        </div>

        {/* Sign in button */}
        <div className="w-full max-w-xs space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-xl
              bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/[0.12]
              text-foreground text-sm font-medium
              transition-all duration-200 ease-out
              disabled:opacity-50 disabled:cursor-not-allowed
              active:scale-[0.98]"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            )}
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {/* Tagline */}
        <p className="text-[11px] text-muted-foreground/50 tracking-wider uppercase">
          Clinical-grade Ayurvedic intelligence
        </p>
      </div>
    </div>
  )
}
