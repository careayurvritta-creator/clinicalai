'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChatPanel } from '@/components/ChatPanel'
import { CanvasPanel } from '@/components/CanvasPanel'
import { ResizableLayout } from '@/components/ResizableLayout'
import { useChatStore } from '@/lib/store'

export default function Home() {
  const activeModule = useChatStore((s: ReturnType<typeof useChatStore.getState>) => s.activeModule)
  const setActiveModule = useChatStore((s: ReturnType<typeof useChatStore.getState>) => s.setActiveModule)
  const searchParams = useSearchParams()

  // Sync activeModule from URL ?module= param
  useEffect(() => {
    const moduleParam = searchParams.get('module')
    if (moduleParam && moduleParam !== activeModule) {
      setActiveModule(moduleParam)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  // Chat-based modules: render ResizableLayout (chat + canvas panels)
  if (activeModule === 'chat' || activeModule === 'documents' || activeModule === 'treatment-protocol') {
    return (
      <ResizableLayout
        chatPanel={<ChatPanel key={activeModule} />}
        canvasPanel={<CanvasPanel />}
      />
    )
  }

  // Fallback for unknown module
  return (
    <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center">
      <div>
        <p className="text-lg font-medium mb-2">Welcome to AyurVritta Clinical AI</p>
        <p className="text-sm">Select a module from the sidebar or bottom navigation to get started.</p>
      </div>
    </div>
  )
}
