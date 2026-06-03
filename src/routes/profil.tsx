import { useNavigate } from '@tanstack/react-router'
import { BellRing, ChevronRight, CreditCard, HelpCircle, LogOut, MapPinned, ShieldCheck, UserRound } from 'lucide-react'
import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { clearDemoUser, readDemoUser } from './authStorage'
import { usePageMeta } from './meta'

const menu = [
  { label: 'Data akun', caption: 'Nama, nomor HP, email', icon: UserRound },
  { label: 'Alamat tersimpan', caption: 'Rumah dan kantor', icon: MapPinned },
  { label: 'Metode pembayaran', caption: 'Tunai, QRIS, kartu', icon: CreditCard },
  { label: 'Notifikasi', caption: 'Status pesanan dan promo', icon: BellRing },
  { label: 'Bantuan', caption: 'Pusat bantuan pelanggan', icon: HelpCircle },
]

export function ProfilePage() {
  const navigate = useNavigate()
  const user = readDemoUser()
  const [selectedMenu, setSelectedMenu] = useState('Data akun')
  const [logoutOpen, setLogoutOpen] = useState(false)

  usePageMeta(
    'Profil - FIXIN',
    'Kelola akun, alamat, pembayaran, bantuan, dan preferensi pelanggan FIXIN.',
  )

  return (
    <>
      <AppHeader title="Profil" subtitle="Atur akun dan preferensi layanan." />

      <section className="content-section">
        <div className="profile-card">
          <div className="avatar">
            <UserRound size={34} />
          </div>
          <div>
            <h1>{user.name}</h1>
            <span>{user.email}</span>
            <p>
              <ShieldCheck size={15} />
              Akun pelanggan terverifikasi
            </p>
          </div>
        </div>
      </section>

      <section className="content-section menu-stack" aria-label="Menu profil">
        {menu.map((item) => {
          const Icon = item.icon
          return (
            <button
              className={selectedMenu === item.label ? 'menu-row active' : 'menu-row'}
              type="button"
              key={item.label}
              onClick={() => setSelectedMenu(item.label)}
            >
              <span className="menu-icon">
                <Icon size={21} />
              </span>
              <span>
                <strong>{item.label}</strong>
                <small>{item.caption}</small>
              </span>
              <ChevronRight size={18} />
            </button>
          )
        })}

        <button className="menu-row danger" type="button" onClick={() => setLogoutOpen(true)}>
          <span className="menu-icon">
            <LogOut size={21} />
          </span>
          <span>
            <strong>Keluar</strong>
            <small>Akhiri sesi dari perangkat ini</small>
          </span>
        </button>
      </section>

      <section className="content-section">
        <div className="profile-detail-panel">
          <strong>{selectedMenu}</strong>
          <span>Pengaturan {selectedMenu.toLowerCase()} sedang dipilih. Data ini mock untuk prototype frontend.</span>
        </div>
      </section>

      {logoutOpen ? (
        <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label="Konfirmasi keluar">
          <div className="booking-sheet">
            <div className="sheet-header">
              <div>
                <span>Konfirmasi</span>
                <strong>Keluar dari akun?</strong>
              </div>
            </div>
            <p className="body-copy">Kamu akan kembali ke halaman masuk. Data demo dapat dibuat lagi kapan saja.</p>
            <div className="dialog-actions">
              <button className="secondary-button" type="button" onClick={() => setLogoutOpen(false)}>
                Batal
              </button>
              <button
                className="primary-button"
                type="button"
                onClick={() => {
                  clearDemoUser()
                  setLogoutOpen(false)
                  navigate({ to: '/login' })
                }}
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
