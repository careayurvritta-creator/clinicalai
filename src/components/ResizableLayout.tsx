'use client'

import { ReactNode, useState, useRef, useCallback, useEffect } from 'react'
import { useChatStore } from '@/lib/store'

interface ResizableLayoutProps {
  chatPanel: ReactNode
  canvasPanel: ReactNode
}

export function ResizableLayout({ chatPanel, canvasPanel }: ResizableLayoutProps) {
  const [chatWidth, setChatWidth] = useState(() => {
    if (typeof window === 'undefined') return 450
    return Math.min(450, Math.floor(window.innerWidth * 0.45))
  })
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState<'chat' | 'canvas'>('chat')
  const prevCanvasLength = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const listenersRef = useRef<{ move: ((e: MouseEvent) => void) | null; up: (() => void) | null }>({ move: null, up: null })

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-switch to canvas tab on mobile when new artifact content arrives
  const canvasContent = useChatStore((state) => state.canvasContent)
  useEffect(() => {
    if (isMobile && canvasContent.length > 0 && prevCanvasLength.current === 0) {
      setActiveTab('canvas')
    }
    prevCanvasLength.current = canvasContent.length
  }, [canvasContent, isMobile])

  // Listen for back-to-chat event from CanvasPanel mobile button
  useEffect(() => {
    const handleBack = () => setActiveTab('chat')
    window.addEventListener('canvas:back-to-chat', handleBack)
    return () => window.removeEventListener('canvas:back-to-chat', handleBack)
  }, [])

  // Cleanup lingering listeners on unmount
  useEffect(() => {
    return () => {
      if (listenersRef.current.move) {
        document.removeEventListener('mousemove', listenersRef.current.move)
      }
      if (listenersRef.current.up) {
        document.removeEventListener('mouseup', listenersRef.current.up)
      }
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newWidth = Math.max(300, Math.min(700, e.clientX - rect.left))
      setChatWidth(newWidth)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      listenersRef.current = { move: null, up: null }
    }

    listenersRef.current = { move: handleMouseMove, up: handleMouseUp }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [])

  // Touch event support for mobile resize
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    isDragging.current = true
    document.body.style.userSelect = 'none'

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const touch = e.touches[0]
      const rect = containerRef.current.getBoundingClientRect()
      const newWidth = Math.max(300, Math.min(700, touch.clientX - rect.left))
      setChatWidth(newWidth)
    }

    const handleTouchEnd = () => {
      isDragging.current = false
      document.body.style.userSelect = ''
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
      listenersRef.current = { move: null, up: null }
    }

    listenersRef.current = { move: handleTouchMove as unknown as (e: MouseEvent) => void, up: handleTouchEnd }
    document.addEventListener('touchmove', handleTouchMove, { passive: false })
    document.addEventListener('touchend', handleTouchEnd)
  }, [])

  // Mobile: stacked layout with tab bar
  if (isMobile) {
    return (
      <div className="flex flex-col flex-1 min-h-0 h-full">
        {/* Mobile tab bar — replaces ChatPanel header on mobile */}
        <div className="flex border-b border-border bg-panel-chat flex-shrink-0">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
              activeTab === 'chat'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('canvas')}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors ${
              activeTab === 'canvas'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground'
            }`}
          >
            Output
          </button>
        </div>

        {/* Panel content */}
        <div className="flex-1 min-h-0 overflow-hidden">
          {activeTab === 'chat' ? chatPanel : canvasPanel}
        </div>
      </div>
    )
  }

  // Desktop: resizable side-by-side layout
  return (
    <div ref={containerRef} className="flex flex-1 min-h-0 h-full w-full">
      <div
        className="flex flex-col flex-shrink-0 border-r border-border bg-panel-chat min-h-0"
        style={{ width: chatWidth, minWidth: 300, maxWidth: 700 }}
      >
        {chatPanel}
      </div>

      <div
        className="w-1 bg-border hover:bg-primary/50 transition-colors cursor-col-resize flex-shrink-0 relative group"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-y-0 -left-1.5 -right-1.5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-10 bg-muted-foreground/20 rounded-full group-hover:bg-primary/50 transition-colors" />
      </div>

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {canvasPanel}
      </div>
    </div>
  )
}
