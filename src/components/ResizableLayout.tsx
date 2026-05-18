'use client'

import { ReactNode, useState, useRef, useCallback } from 'react'

interface ResizableLayoutProps {
  chatPanel: ReactNode
  canvasPanel: ReactNode
}

export function ResizableLayout({ chatPanel, canvasPanel }: ResizableLayoutProps) {
  const [chatWidth, setChatWidth] = useState(380)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    isDragging.current = true
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const newWidth = Math.max(300, Math.min(600, e.clientX - rect.left))
      setChatWidth(newWidth)
    }

    const handleMouseUp = () => {
      isDragging.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div ref={containerRef} className="flex h-full w-full">
      {chatPanel}

      <div
        className="w-1 bg-border hover:bg-primary/50 transition-colors cursor-col-resize flex-shrink-0 relative group"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-y-0 -left-1.5 -right-1.5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-10 bg-muted-foreground/20 rounded-full group-hover:bg-primary/50 transition-colors" />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {canvasPanel}
      </div>
    </div>
  )
}
