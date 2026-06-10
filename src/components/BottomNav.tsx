import { Link } from '@tanstack/react-router'
import { ChevronRight, Home, MessageCircle, ReceiptText, ShieldCheck, UserRound, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { readDemoUser } from '../routes/authStorage'
import { Logo } from './Logo'

const navItems = [
  { to: '/', label: 'Beranda', icon: Home },
  { to: '/pesanan', label: 'Pesanan', icon: ReceiptText },
  { to: '/pesan', label: 'Pesan', icon: MessageCircle },
  { to: '/profil', label: 'Profil', icon: UserRound },
] as const

type BottomNavProps = {
  isDesktop: boolean
  isOpen: boolean
  onClose: () => void
}

export function BottomNav({ isDesktop, isOpen, onClose }: BottomNavProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const user = readDemoUser()
  const initials = user.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  useEffect(() => {
    if (isDesktop && isOpen) {
      window.requestAnimationFrame(() => closeButtonRef.current?.focus())
    }
  }, [isDesktop, isOpen])

  return (
    <nav
      id="main-navigation"
      className={isOpen ? 'bottom-nav open' : 'bottom-nav'}
      aria-label="Navigasi utama"
      aria-hidden={isDesktop ? !isOpen : undefined}
    >
      <div className="desktop-sidebar-header">
        <Logo variant="light" />
        <button
          ref={closeButtonRef}
          className="sidebar-close"
          type="button"
          aria-label="Tutup menu navigasi"
          tabIndex={isDesktop && !isOpen ? -1 : undefined}
          onClick={onClose}
        >
          <X size={19} />
        </button>
      </div>
      <div className="sidebar-intro">
        <span>Navigasi</span>
        <strong>Menu utama</strong>
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
            tabIndex={isDesktop && !isOpen ? -1 : undefined}
            onClick={() => {
              if (isDesktop) {
                onClose()
              }
            }}
          >
            <Icon size={21} strokeWidth={2.3} aria-hidden="true" />
            <span>{item.label}</span>
          </Link>
        )
      })}
      <div className="sidebar-footer">
        <div className="sidebar-trust">
          <ShieldCheck size={21} />
          <div>
            <strong>Layanan terlindungi</strong>
            <span>Harga transparan dan garansi tercatat.</span>
          </div>
        </div>
        <Link
          className="sidebar-profile"
          to="/profil"
          tabIndex={isDesktop && !isOpen ? -1 : undefined}
          onClick={() => {
            if (isDesktop) {
              onClose()
            }
          }}
        >
          <span className="sidebar-avatar">{initials}</span>
          <span className="sidebar-profile-copy">
            <strong>{user.name}</strong>
            <small>{user.email}</small>
          </span>
          <ChevronRight size={18} />
        </Link>
      </div>
    </nav>
  )
}
