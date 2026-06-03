import { Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BottomNav } from '../components/BottomNav'
import { Logo } from '../components/Logo'
import { hasDemoUser } from './authStorage'

export function RootLayout() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isAuthPage = pathname === '/login' || pathname === '/register'

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 2400)

    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isAuthPage && !hasDemoUser()) {
      navigate({ to: '/login', replace: true })
    }
  }, [isAuthPage, navigate, pathname])

  return (
    <div className="page-backdrop">
      <div className={isAuthPage ? 'phone-shell auth-shell' : 'phone-shell'} aria-label="FIXIN mobile app preview">
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
        {!isAuthPage ? (
          <>
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
              <button
                className="sidebar-scrim"
                type="button"
                aria-label="Tutup menu"
                onClick={() => setSidebarOpen(false)}
              />
            ) : null}
            <BottomNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          </>
        ) : null}
        <main className="app-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
