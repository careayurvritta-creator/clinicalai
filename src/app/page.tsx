'use client'

import { useState, useEffect } from 'react'
import { ChatPanel } from '@/components/ChatPanel'
import { CanvasPanel } from '@/components/CanvasPanel'
import { ResizableLayout } from '@/components/ResizableLayout'
import { ModuleSidebar } from '@/components/ModuleSidebar'
import { useChatStore } from '@/lib/store'

const MODULE_TITLES: Record<string, string> = {
  chat: 'Ayurveda Clinical AI',
  intake: 'Case Collector',
  'treatment-protocol': 'Treatment Protocol',
  'patient-portal': 'Patient Portal',
  'diet-chart': 'Diet Chart',
  'lifestyle-advice': 'Lifestyle Advice',
}

export default function Home() {
  const activeModule = useChatStore((s) => s.activeModule)
  const setActiveModule = useChatStore((s) => s.setActiveModule)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setSidebarOpen(false) // Close sidebar on desktop
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleModuleSelect = (module: string) => {
    setActiveModule(module)
    if (isMobile) setSidebarOpen(false) // Auto-close on mobile
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-background overflow-hidden safe-top">
      {/* Header */}
      <header className="flex items-center justify-between px-3 md:px-4 py-2.5 border-b border-border bg-panel-header flex-shrink-0">
        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1.5 -ml-1 rounded-md hover:bg-secondary transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          )}
          <h1 className="text-base md:text-lg font-semibold text-foreground truncate">
            {MODULE_TITLES[activeModule] || 'Ayurveda Clinical AI'}
          </h1>
          {!isMobile && activeModule !== 'chat' && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
              {activeModule}
            </span>
          )}
        </div>

        {/* Desktop module quick switcher */}
        {!isMobile && (
          <div className="flex gap-1">
            {Object.keys(MODULE_TITLES).filter(m => m !== 'chat').map(mod => (
              <button
                key={mod}
                onClick={() => handleModuleSelect(mod)}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  activeModule === mod
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                {MODULE_TITLES[mod]}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="flex flex-1 min-h-0 relative">
        {/* Mobile sidebar overlay */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 top-[41px]"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            isMobile
              ? `fixed left-0 top-[41px] bottom-0 z-50 w-72 transform transition-transform duration-300 ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`
              : 'w-64 flex-shrink-0 border-r border-border'
          }`}
        >
          <ModuleSidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {activeModule === 'chat' || activeModule === 'intake' || activeModule === 'treatment-protocol' ? (
            <ResizableLayout
              chatPanel={<ChatPanel key={activeModule} />}
              canvasPanel={<CanvasPanel />}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground p-4 text-center">
              <div>
                <p className="text-lg font-medium mb-2">{MODULE_TITLES[activeModule]}</p>
                <p className="text-sm">This module is coming soon. Switch to Chat or Case Collector to get started.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <nav className="flex border-t border-border bg-panel-header flex-shrink-0">
          {(['chat', 'intake', 'treatment-protocol'] as const).map(mod => (
            <button
              key={mod}
              onClick={() => handleModuleSelect(mod)}
              className={`flex-1 py-2 text-xs font-medium text-center transition-colors ${
                activeModule === mod
                  ? 'text-primary border-t-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              {mod === 'chat' ? 'Chat' : mod === 'intake' ? 'Intake' : 'Protocol'}
            </button>
          ))}
        </nav>
      )}
    </div>
  )
}
