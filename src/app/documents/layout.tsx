'use client'

import { ModeSwitcher } from '@/components/shared/ModeSwitcher'
import { MobileModeNav } from '@/components/shared/MobileModeNav'
import { ToastContainer } from '@/components/Toast'
import { useState } from 'react'

export default function DocumentsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="flex app-height w-screen overflow-hidden bg-background">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      <aside
        className={`hidden md:flex flex-col bg-panel-sidebar border-r border-border flex-shrink-0 transition-all duration-200 ${
          sidebarCollapsed ? 'w-16' : 'w-[260px]'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          {!sidebarCollapsed && (
            <span className="text-sm font-semibold text-foreground">AyurVritta AI</span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d={
                  sidebarCollapsed
                    ? 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12'
                    : 'M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5'
                }
              />
            </svg>
          </button>
        </div>

        {!sidebarCollapsed && <ModeSwitcher />}

        {!sidebarCollapsed && (
          <div className="flex-1 flex items-center justify-center px-4">
            <p className="text-xs text-muted-foreground text-center">
              Connect Google Drive to manage patient documents
            </p>
          </div>
        )}

        {sidebarCollapsed && (
          <div className="flex flex-col items-center gap-2 mt-4">
            <ModeSwitcher />
          </div>
        )}

        {!sidebarCollapsed && (
          <div className="px-4 py-3 border-t border-border mt-auto">
            <div className="text-[10px] text-muted-foreground text-center">
              AyurVritta Ayurveda
            </div>
          </div>
        )}
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <main
          id="main-content"
          className="flex-1 min-h-0 flex flex-col overflow-hidden"
          role="main"
        >
          {children}
        </main>
        <MobileModeNav />
      </div>

      <ToastContainer />
    </div>
  )
}
