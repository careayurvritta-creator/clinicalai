'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => {
      router.replace('/chat')
    }, 100)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center">
      <div className="animate-pulse">
        <p className="text-lg font-medium mb-2">Loading Clinical AI...</p>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    </div>
  )
}
