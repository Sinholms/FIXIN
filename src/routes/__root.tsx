import { Outlet } from '@tanstack/react-router'
import { BottomNav } from '../components/BottomNav'

export function RootLayout() {
  return (
    <div className="page-backdrop">
      <div className="phone-shell" aria-label="FIXIN mobile app preview">
        <main className="app-scroll">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
