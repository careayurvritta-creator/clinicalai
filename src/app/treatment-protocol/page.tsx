'use client'

import { CaseCollectorChat } from '@/components/CaseCollectorChat'
import { CanvasPanel } from '@/components/CanvasPanel'
import { ResizableLayout } from '@/components/ResizableLayout'
import { useProtocolStore } from '@/lib/stores/protocol-store'

export default function TreatmentProtocolPage() {
  const canvasContent = useProtocolStore((state) => state.canvasContent)
  return (
    <ResizableLayout
      chatPanel={<CaseCollectorChat />}
      canvasPanel={<CanvasPanel />}
      canvasContent={canvasContent}
    />
  )
}
