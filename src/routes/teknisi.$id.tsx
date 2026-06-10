import { Link, useParams } from '@tanstack/react-router'
import {
  ArrowLeft,
  BadgeCheck,
  CalendarClock,
  Check,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { getTechnicianById, technicians } from '../data/technicians'
import { usePageMeta } from './meta'

export function TechnicianDetailPage() {
  const params = useParams({ strict: false }) as { id?: string }
  const technician = getTechnicianById(params.id) ?? technicians[0]
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)
  const [selectedService, setSelectedService] = useState(technician.priceDetails[0].label)
  const [selectedSchedule, setSelectedSchedule] = useState('Hari ini · 14.00–16.00')

  usePageMeta(
    `${technician.name} - Detail Teknisi FIXIN`,
    `Lihat profil, harga, ulasan, dan jadwal booking ${technician.name} di FIXIN.`,
  )

  return (
    <div className="detail-page">
      <div className="detail-left-column">
        <div className="detail-hero">
          <Link className="icon-button back-button" to="/" aria-label="Kembali ke home">
            <ArrowLeft size={20} />
          </Link>
          <img src={technician.photo} alt={`Foto ${technician.name}`} />
        </div>

        <section className="detail-summary">
          <div className="detail-name-row">
            <div>
              <p className="verified-line">
                <BadgeCheck size={16} />
                Teknisi terverifikasi
              </p>
              <h1>{technician.name}</h1>
              <span>{technician.specialty}</span>
            </div>
            <div className="score-box">
              <Star size={17} fill="currentColor" />
              <strong>{technician.rating}</strong>
              <small>{technician.reviews} ulasan</small>
            </div>
          </div>

          <div className="metric-grid">
            <div>
              <strong>{technician.completedJobs}+</strong>
              <span>Pekerjaan</span>
            </div>
            <div>
              <strong>{technician.distance}</strong>
              <span>Jarak</span>
            </div>
            <div>
              <strong>{technician.responseTime}</strong>
              <span>Respon</span>
            </div>
          </div>
        </section>
      </div>

      <div className="detail-right-column">
        <section className="content-section">
          <h2 className="compact-title">Keahlian</h2>
          <div className="chip-row">
            {technician.categories.map((category) => (
              <span className="service-chip" key={category}>
                {category}
              </span>
            ))}
          </div>
          <p className="body-copy">{technician.bio}</p>
        </section>

        <section className="content-section">
          <h2 className="compact-title">Estimasi Harga</h2>
          <p className="section-helper">Pilih layanan saat membuat pesanan. Biaya final selalu dikonfirmasi lebih dulu.</p>
          <div className="price-list">
            {technician.priceDetails.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="content-section">
          <h2 className="compact-title">Jaminan Layanan</h2>
          <div className="info-tile">
            <ShieldCheck size={22} />
            <div>
              <strong>{technician.warranty}</strong>
              <span>Garansi aktif setelah teknisi menyelesaikan pekerjaan dan laporan dikirim.</span>
            </div>
          </div>
        </section>

        <section className="content-section">
          <h2 className="compact-title">Ulasan Pelanggan</h2>
          <div className="review-stack">
            {technician.reviewList.map((review) => (
              <article key={review.user} className="review-card">
                <div>
                  <strong>{review.user}</strong>
                  <span>
                    <Star size={13} fill="currentColor" />
                    {review.rating}
                  </span>
                </div>
                <p>{review.text}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="sticky-cta">
          <Link className="secondary-button" to="/pesan">
            <MessageCircle size={18} />
            Tanya dulu
          </Link>
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              setBookingConfirmed(false)
              setBookingOpen(true)
            }}
          >
            Pesan teknisi
          </button>
        </div>
      </div>

      {bookingOpen ? (
        <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label="Konfirmasi booking">
          <div className="booking-sheet">
            <div className="sheet-header">
              <div>
                <span>Konfirmasi Booking</span>
                <strong>{technician.name}</strong>
              </div>
              <button className="icon-button" type="button" aria-label="Tutup" onClick={() => setBookingOpen(false)}>
                <X size={18} />
              </button>
            </div>
            {bookingConfirmed ? (
              <div className="success-panel">
                <span className="success-icon"><Check size={28} /></span>
                <strong>Pesanan berhasil dibuat</strong>
                <span>Nomor pesanan FXN-24072. Teknisi akan menghubungi sebelum berangkat.</span>
                <div className="booking-summary">
                  <span>{selectedService}</span>
                  <span>{selectedSchedule}</span>
                </div>
              </div>
            ) : (
              <>
                <fieldset className="booking-options">
                  <legend>Pilih layanan</legend>
                  {technician.priceDetails.map((service) => (
                    <label key={service.label} className={selectedService === service.label ? 'option-card selected' : 'option-card'}>
                      <input
                        type="radio"
                        name="service"
                        value={service.label}
                        checked={selectedService === service.label}
                        onChange={() => setSelectedService(service.label)}
                      />
                      <span>
                        <strong>{service.label}</strong>
                        <small>{service.price}</small>
                      </span>
                      <Check size={17} />
                    </label>
                  ))}
                </fieldset>
                <fieldset className="booking-options">
                  <legend>Pilih jadwal</legend>
                  {['Hari ini · 14.00–16.00', 'Hari ini · 18.00–20.00', 'Besok · 09.00–11.00'].map((schedule) => (
                    <label key={schedule} className={selectedSchedule === schedule ? 'option-card selected' : 'option-card'}>
                      <input
                        type="radio"
                        name="schedule"
                        value={schedule}
                        checked={selectedSchedule === schedule}
                        onChange={() => setSelectedSchedule(schedule)}
                      />
                      <CalendarClock size={18} />
                      <span><strong>{schedule}</strong></span>
                      <Check size={17} />
                    </label>
                  ))}
                </fieldset>
                <div className="info-tile">
                  <MapPin size={22} />
                  <div>
                    <strong>Alamat rumah utama</strong>
                    <span>Jl. Melati No. 18, Jakarta Selatan</span>
                  </div>
                  <button className="text-button" type="button">Ubah</button>
                </div>
              </>
            )}
            {bookingConfirmed ? (
              <div className="dialog-actions">
                <button className="secondary-button" type="button" onClick={() => setBookingOpen(false)}>
                  Tutup
                </button>
                <Link className="primary-button" to="/pesanan">
                  Lihat pesanan
                </Link>
              </div>
            ) : (
              <button className="primary-button full-width" type="button" onClick={() => setBookingConfirmed(true)}>
                Konfirmasi pesanan
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
