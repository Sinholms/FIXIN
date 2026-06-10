import { Bell, MapPin, Search, X } from 'lucide-react'
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
  { title: 'Teknisi sedang menuju lokasi', detail: 'Andi tiba sekitar 18 menit lagi.', time: '2 menit' },
  { title: 'Garansi servis aktif', detail: 'Servis AC terlindungi sampai 17 Juni 2026.', time: '1 jam' },
  { title: 'Jadwal besok dikonfirmasi', detail: 'Siti akan datang pukul 09.30.', time: 'Kemarin' },
]

export function AppHeader({ title, subtitle, showSearch = false, searchValue, onSearchChange }: AppHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  return (
    <header className="app-header">
      <div className="header-topline">
        <div>
          <Logo variant="light" />
          {title ? <p className="header-title">{title}</p> : null}
          {subtitle ? <p className="header-subtitle">{subtitle}</p> : null}
        </div>
        <button
          className="icon-button inverted"
          type="button"
          aria-label={`${notifications.length} notifikasi`}
          aria-expanded={notificationsOpen}
          onClick={() => setNotificationsOpen((open) => !open)}
        >
          <Bell size={19} />
          <span className="notification-dot">{notifications.length}</span>
        </button>
      </div>

      <button className="location-chip" type="button" aria-label="Lokasi layanan saat ini">
        <MapPin size={15} />
        <span>Rumah · Jakarta Selatan</span>
      </button>

      {notificationsOpen ? (
        <div className="notification-panel" aria-label="Daftar notifikasi">
          <div className="notification-heading">
            <strong>Notifikasi</strong>
            <button type="button" onClick={() => setNotificationsOpen(false)} aria-label="Tutup notifikasi">
              <X size={16} />
            </button>
          </div>
          {notifications.map((item) => (
            <div className="notification-item" key={item.title}>
              <span />
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
              <time>{item.time}</time>
            </div>
          ))}
        </div>
      ) : null}

      {showSearch ? (
        <label className="search-box">
          <Search size={18} aria-hidden="true" />
          <input
            type="search"
            placeholder="Cari layanan atau teknisi"
            value={searchValue ?? ''}
            onChange={(event) => onSearchChange?.(event.target.value)}
          />
          {searchValue ? (
            <button type="button" aria-label="Hapus pencarian" onClick={() => onSearchChange?.('')}>
              <X size={17} />
            </button>
          ) : null}
        </label>
      ) : null}
    </header>
  )
}
