import { Link } from '@tanstack/react-router'
import { Home, MessageCircle, ReceiptText, UserRound, X } from 'lucide-react'
import { Logo } from './Logo'

const navItems = [
  { to: '/', label: 'HOME', icon: Home },
  { to: '/pesanan', label: 'PESANAN', icon: ReceiptText },
  { to: '/pesan', label: 'PESAN', icon: MessageCircle },
  { to: '/profil', label: 'PROFIL', icon: UserRound },
] as const

type BottomNavProps = {
  isOpen?: boolean
  onClose?: () => void
}

export function BottomNav({ isOpen = false, onClose }: BottomNavProps) {
  return (
    <nav className={isOpen ? 'bottom-nav open' : 'bottom-nav'} aria-label="Navigasi utama">
      <div className="desktop-sidebar-header">
        <Logo />
        <button className="icon-button" type="button" aria-label="Tutup menu" onClick={onClose}>
          <X size={18} />
        </button>
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
            onClick={onClose}
          >
            <Icon size={21} strokeWidth={2.3} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
