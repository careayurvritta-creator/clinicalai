'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (signInError) throw signInError
      const next = searchParams.get('next') || '/'
      router.replace(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed')
      setLoading(false)
    }
  }

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      })
      if (signUpError) throw signUpError
      setSuccess('Account created! You can now sign in.')
      setMode('signin')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
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
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.6" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.5" transform="rotate(-25 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.4" transform="rotate(-50 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.3" transform="rotate(-75 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.5" transform="rotate(25 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.4" transform="rotate(50 40 32)" />
            <ellipse cx="40" cy="32" rx="6" ry="18" fill="currentColor" opacity="0.3" transform="rotate(75 40 32)" />
            <circle cx="40" cy="32" r="4" fill="currentColor" opacity="0.8" />
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

        {/* Login form */}
        <div className="w-full max-w-xs space-y-4">
          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2 text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-lg px-3 py-2 text-center">
              {success}
            </div>
          )}

          {/* Mode toggle */}
          <div className="flex rounded-lg bg-muted border border-border overflow-hidden">
            <button
              onClick={() => { setMode('signin'); setError(null); setSuccess(null) }}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${mode === 'signin' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setMode('signup'); setError(null); setSuccess(null) }}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${mode === 'signup' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={mode === 'signin' ? handleEmailSignIn : handleEmailSignUp} className="space-y-3">
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2.5 bg-muted border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading
                ? mode === 'signin' ? 'Signing in...' : 'Creating account...'
                : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#080c0a] px-2 text-muted-foreground">or</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-2.5 bg-muted border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted/80 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>

        {/* Tagline */}
        <p className="text-[11px] text-muted-foreground/50 tracking-wider uppercase">
          Clinical-grade Ayurvedic intelligence
        </p>
      </div>
    </div>
  )
}
