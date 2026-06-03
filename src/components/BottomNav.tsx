import { Link } from '@tanstack/react-router'
import { Home, MessageCircle, ReceiptText, UserRound } from 'lucide-react'

const navItems = [
  { to: '/', label: 'HOME', icon: Home },
  { to: '/pesanan', label: 'PESANAN', icon: ReceiptText },
  { to: '/pesan', label: 'PESAN', icon: MessageCircle },
  { to: '/profil', label: 'PROFIL', icon: UserRound },
] as const

export function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
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
