import { Bell, Search } from 'lucide-react'
import { useState } from 'react'
import { Logo } from './Logo'

type AppHeaderProps = {
  title?: string
  subtitle?: string
  showSearch?: boolean
  searchValue?: string
  onSearchChange?: (value: string) => void
}

const notifications = [
  'Teknisi Andi sedang menuju lokasi.',
  'Garansi servis AC aktif sampai 17 Juni 2026.',
  'Promo cek kulkas hemat tersedia hari ini.',
]

export function AppHeader({ title, subtitle, showSearch = false, searchValue, onSearchChange }: AppHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <header className="app-header">
      <div className="header-topline">
        <div>
          <Logo />
          {title ? <p className="header-title">{title}</p> : null}
          {subtitle ? <p className="header-subtitle">{subtitle}</p> : null}
        </div>
        <button
          className="icon-button inverted"
          type="button"
          aria-label="Notifikasi"
          aria-expanded={notificationsOpen}
          onClick={() => setNotificationsOpen((open) => !open)}
        >
          <Bell size={19} />
        </button>
      </div>

      {notificationsOpen ? (
        <div className="notification-panel" role="status" aria-label="Daftar notifikasi">
          {notifications.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      ) : null}

      {showSearch ? (
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Cari Teknisi AC, Kulkas, Mesin Cuci..."
            value={searchValue ?? ''}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
        </label>
      ) : null}
    </header>
  )
}
