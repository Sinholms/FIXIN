import { Outlet, useRouterState } from '@tanstack/react-router'
import { BottomNav } from '../components/BottomNav'

export function RootLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const isAuthPage = pathname === '/login' || pathname === '/register'

  return (
    <div className="page-backdrop">
      <div className={isAuthPage ? 'phone-shell auth-shell' : 'phone-shell'} aria-label="FIXIN mobile app preview">
        {!isAuthPage ? <BottomNav /> : null}
        <main className="app-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
