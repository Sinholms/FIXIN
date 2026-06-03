import { Outlet } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BottomNav } from '../components/BottomNav'
import { Logo } from '../components/Logo'

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2400)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="page-backdrop">
      <div className="phone-shell" aria-label="FIXIN mobile app preview">
        {isLoading ? (
          <div className="app-splash" role="status" aria-label="Memuat FIXIN">
            <div className="splash-logo-wrap">
              <Logo variant="light" />
            </div>
            <div className="splash-loader" aria-hidden="true">
              <span />
            </div>
          </div>
        ) : null}
        <button
          className="sidebar-toggle"
          type="button"
          aria-label="Buka menu"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={22} />
        </button>
        {sidebarOpen ? (
          <button className="sidebar-scrim" type="button" aria-label="Tutup menu" onClick={() => setSidebarOpen(false)} />
        ) : null}
        <BottomNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
