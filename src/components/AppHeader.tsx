import { Bell, MapPin, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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

const savedLocations = [
  { label: 'Rumah', address: 'Jakarta Selatan' },
  { label: 'Kantor', address: 'Jakarta Pusat' },
]

export function AppHeader({ title, subtitle, showSearch = false, searchValue, onSearchChange }: AppHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [locationOpen, setLocationOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(savedLocations[0])
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!notificationsOpen && !locationOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setNotificationsOpen(false)
        setLocationOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setNotificationsOpen(false)
        setLocationOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [locationOpen, notificationsOpen])

  return (
    <header ref={headerRef} className="app-header">
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
          onClick={() => {
            setLocationOpen(false)
            setNotificationsOpen((open) => !open)
          }}
        >
          <Bell size={19} />
          <span className="notification-dot">{notifications.length}</span>
        </button>
      </div>

      <button
        className="location-chip"
        type="button"
        aria-label="Pilih lokasi layanan"
        aria-expanded={locationOpen}
        aria-controls="location-options"
        onClick={() => {
          setNotificationsOpen(false)
          setLocationOpen((open) => !open)
        }}
      >
        <MapPin size={15} />
        <span>{selectedLocation.label} · {selectedLocation.address}</span>
      </button>

      {locationOpen ? (
        <div className="location-panel" id="location-options" aria-label="Lokasi tersimpan">
          <strong>Pilih lokasi layanan</strong>
          {savedLocations.map((location) => (
            <button
              className={selectedLocation.label === location.label ? 'selected' : ''}
              type="button"
              key={location.label}
              onClick={() => {
                setSelectedLocation(location)
                setLocationOpen(false)
              }}
            >
              <MapPin size={16} />
              <span>
                <b>{location.label}</b>
                <small>{location.address}</small>
              </span>
            </button>
          ))}
        </div>
      ) : null}

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
