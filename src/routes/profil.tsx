import { useNavigate } from '@tanstack/react-router'
import {
  BellRing,
  Check,
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  Mail,
  MapPinned,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'
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
  const [orderNotifications, setOrderNotifications] = useState(true)
  const [promoNotifications, setPromoNotifications] = useState(false)

  usePageMeta(
    'Profil - FIXIN',
    'Kelola akun, alamat, pembayaran, bantuan, dan preferensi pelanggan FIXIN.',
  )

  function renderProfileDetail() {
    if (selectedMenu === 'Data akun') {
      return (
        <>
          <div className="detail-row"><UserRound size={18} /><span><small>Nama lengkap</small><strong>{user.name}</strong></span></div>
          <div className="detail-row"><Mail size={18} /><span><small>Email</small><strong>{user.email}</strong></span></div>
          <div className="detail-row"><Phone size={18} /><span><small>Nomor HP</small><strong>0812 3456 7890</strong></span></div>
          <button className="secondary-button full-width" type="button">Ubah data akun</button>
        </>
      )
    }

    if (selectedMenu === 'Alamat tersimpan') {
      return (
        <>
          <div className="saved-item selected">
            <span><Check size={15} /></span>
            <div><strong>Rumah</strong><small>Jl. Melati No. 18, Jakarta Selatan</small></div>
          </div>
          <div className="saved-item">
            <span>K</span>
            <div><strong>Kantor</strong><small>Jl. Jenderal Sudirman Kav. 12</small></div>
          </div>
          <button className="secondary-button full-width" type="button">Tambah alamat</button>
        </>
      )
    }

    if (selectedMenu === 'Metode pembayaran') {
      return (
        <>
          <div className="saved-item selected">
            <span><Check size={15} /></span>
            <div><strong>Bayar setelah servis</strong><small>Tunai atau QRIS kepada teknisi</small></div>
          </div>
          <div className="saved-item">
            <span>••</span>
            <div><strong>Kartu debit</strong><small>Belum ada kartu tersimpan</small></div>
          </div>
          <button className="secondary-button full-width" type="button">Tambah metode pembayaran</button>
        </>
      )
    }

    if (selectedMenu === 'Notifikasi') {
      return (
        <>
          <button className="setting-toggle" type="button" onClick={() => setOrderNotifications((value) => !value)}>
            <span><strong>Status pesanan</strong><small>Perjalanan, kedatangan, dan garansi</small></span>
            <b className={orderNotifications ? 'on' : ''} aria-label={orderNotifications ? 'Aktif' : 'Nonaktif'} />
          </button>
          <button className="setting-toggle" type="button" onClick={() => setPromoNotifications((value) => !value)}>
            <span><strong>Promo dan rekomendasi</strong><small>Penawaran layanan yang relevan</small></span>
            <b className={promoNotifications ? 'on' : ''} aria-label={promoNotifications ? 'Aktif' : 'Nonaktif'} />
          </button>
        </>
      )
    }

    return (
      <>
        <div className="help-card">
          <HelpCircle size={24} />
          <div><strong>Butuh bantuan?</strong><small>Tim FIXIN tersedia setiap hari, 07.00–22.00 WIB.</small></div>
        </div>
        <button className="primary-button full-width" type="button">Hubungi pusat bantuan</button>
        <button className="secondary-button full-width" type="button">Lihat pertanyaan umum</button>
      </>
    )
  }

  return (
    <>
      <AppHeader title="Profil" subtitle="Atur akun dan preferensi layanan." />

      <section className="content-section">
        <div className="profile-card">
          <div className="avatar">
            {user.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
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
          <div className="profile-detail-heading">
            <strong>{selectedMenu}</strong>
            <span>Kelola informasi yang digunakan saat memesan layanan.</span>
          </div>
          {renderProfileDetail()}
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
