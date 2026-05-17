'use client'

import { Panel, Group, Separator } from 'react-resizable-panels'
import { ReactNode } from 'react'

interface ResizableLayoutProps {
  chatPanel: ReactNode
  canvasPanel: ReactNode
}

export function ResizableLayout({ chatPanel, canvasPanel }: ResizableLayoutProps) {
  return (
    <Group orientation="horizontal" className="h-full">
      <Panel defaultSize={35} minSize={25} maxSize={50} className="flex flex-col">
        {chatPanel}
      </Panel>
      <Separator
        className="w-1 bg-border hover:bg-primary/50 transition-colors cursor-col-resize relative group"
      >
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-primary/10 transition-colors" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 bg-muted-foreground/30 rounded-full group-hover:bg-primary/50 transition-colors" />
      </Separator>
      <Panel defaultSize={65} minSize={40} className="flex flex-col">
        {canvasPanel}
      </Panel>
    </Group>
  )
}
