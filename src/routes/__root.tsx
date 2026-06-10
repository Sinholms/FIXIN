import { Outlet, useRouterState } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BottomNav } from '../components/BottomNav'

export function RootLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isAuthPage = pathname === '/login' || pathname === '/register'
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia('(min-width: 900px)').matches)
  const sidebarToggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)')
    const updateViewport = () => {
      setIsDesktop(media.matches)
      if (!media.matches) {
        setSidebarOpen(false)
      }
    }

    media.addEventListener('change', updateViewport)
    return () => media.removeEventListener('change', updateViewport)
  }, [])

  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!isDesktop || !sidebarOpen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSidebarOpen(false)
        window.requestAnimationFrame(() => sidebarToggleRef.current?.focus())
        return
      }

      if (event.key === 'Tab') {
        const navigation = document.getElementById('main-navigation')
        const focusableElements = navigation?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        )

        if (!focusableElements?.length) {
          return
        }

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDesktop, sidebarOpen])

  function closeSidebar(restoreFocus = false) {
    setSidebarOpen(false)
    if (restoreFocus) {
      window.requestAnimationFrame(() => sidebarToggleRef.current?.focus())
    }
  }

  return (
    <div className="page-backdrop">
      <div className={isAuthPage ? 'phone-shell auth-shell' : 'phone-shell'} aria-label="FIXIN mobile app preview">
        {!isAuthPage ? (
          <>
            <button
              ref={sidebarToggleRef}
              className="sidebar-toggle"
              type="button"
              aria-label="Buka menu navigasi"
              aria-controls="main-navigation"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={21} />
            </button>
            {isDesktop && sidebarOpen ? (
              <button
                className="sidebar-scrim"
                type="button"
                aria-label="Tutup menu navigasi"
                onClick={() => closeSidebar(true)}
              />
            ) : null}
            <BottomNav
              isDesktop={isDesktop}
              isOpen={sidebarOpen}
              onClose={() => closeSidebar(true)}
            />
          </>
        ) : null}
        <main className="app-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
