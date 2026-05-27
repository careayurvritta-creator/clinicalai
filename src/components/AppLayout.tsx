'use client'

import { useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { MobileNav } from './MobileNav'
import { DesktopSidebar } from './DesktopSidebar'
import { HeaderBar } from './HeaderBar'
import { ToastContainer } from './Toast'

export function AppLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const activeModule = searchParams.get('module') || ''
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close mobile menu on route change
  const pathname = usePathname()
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname, activeModule])

  // Suppress unused warning - mobileMenuOpen state is for future overlay use
  void mobileMenuOpen

  return (
    <div className="flex app-height w-screen overflow-hidden bg-background">
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <DesktopSidebar />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <HeaderBar
          showMenuButton
          onMenuToggle={() => setMobileMenuOpen((prev) => !prev)}
        />

        {/* Content area */}
        <main
          id="main-content"
          className="flex-1 min-h-0 flex flex-col overflow-hidden"
          role="main"
        >
          {children}
        </main>

        {/* Mobile bottom nav */}
        <MobileNav activeModule={activeModule} />
      </div>

      {/* Toast notifications */}
      <ToastContainer />
    </div>
  )
}
