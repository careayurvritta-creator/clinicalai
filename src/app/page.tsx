'use client'

import { ChatPanel } from '@/components/ChatPanel'
import { CanvasPanel } from '@/components/CanvasPanel'
import { ResizableLayout } from '@/components/ResizableLayout'
import { useChatStore } from '@/lib/store'
import { useEffect, useState } from 'react'

export default function Home() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
  }, [])

  if (!hydrated) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading Clinical AI...</span>
        </div>
      </div>
    )
  }

  return (
    <main className="h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Clinical AI</h1>
            <p className="text-[10px] text-muted-foreground">AyurVritta Ayurveda</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-muted/50 rounded-lg">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">NVIDIA NIM</span>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <ResizableLayout
          chatPanel={<ChatPanel />}
          canvasPanel={<CanvasPanel />}
        />
      </div>
    </main>
  )
}
