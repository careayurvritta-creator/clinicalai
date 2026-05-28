'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Auth disabled — redirect straight to app
    router.replace('/')
  }, [router])

  // TODO: Re-enable Google OAuth once PKCE cookie flow is working
  // const handleGoogleSignIn = async () => {
  //   setLoading(true)
  //   setError(null)
  //   try {
  //     const { error: signInError } = await supabase.auth.signInWithOAuth({
  //       provider: 'google',
  //       options: {
  //         redirectTo: `${window.location.origin}/auth/callback`,
  //         queryParams: { access_type: 'offline', prompt: 'consent' },
  //       },
  //     })
  //     if (signInError) throw signInError
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : 'Sign in failed')
  //     setLoading(false)
  //   }
  // }

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

        {/* Redirecting message */}
        <div className="w-full max-w-xs space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <div className="w-4 h-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
            Redirecting...
          </div>
        </div>

        {/* Tagline */}
        <p className="text-[11px] text-muted-foreground/50 tracking-wider uppercase">
          Clinical-grade Ayurvedic intelligence
        </p>
      </div>
    </div>
  )
}
