import { Link } from '@tanstack/react-router'
import { Home, MessageCircle, ReceiptText, UserRound } from 'lucide-react'
import { Logo } from './Logo'

const navItems = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/pesanan', label: 'Pesanan', icon: ReceiptText },
  { to: '/pesan', label: 'Pesan', icon: MessageCircle },
  { to: '/profil', label: 'Profil', icon: UserRound },
] as const

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      <div className="desktop-sidebar-header">
        <Logo />
        <span>Perbaikan rumah, tanpa khawatir.</span>
      </div>
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.to}
            to={item.to}
            activeOptions={{ exact: item.to === '/' }}
            className="tab-item"
            activeProps={{ className: 'tab-item active' }}
            inactiveProps={{ className: 'tab-item' }}
          >
            <Icon size={21} strokeWidth={2.3} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
