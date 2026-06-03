import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft, BadgeCheck, CalendarClock, MapPin, MessageCircle, ShieldCheck, Star, X } from 'lucide-react'
import { useState } from 'react'
import { getTechnicianById, technicians } from '../data/technicians'
import { usePageMeta } from './meta'

export function TechnicianDetailPage() {
  const params = useParams({ strict: false }) as { id?: string }
  const technician = getTechnicianById(params.id) ?? technicians[0]
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

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
            Chat
          </Link>
          <button
            className="primary-button"
            type="button"
            onClick={() => {
              setBookingConfirmed(false)
              setBookingOpen(true)
            }}
          >
            PILIH TEKNISI
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
                <ShieldCheck size={28} />
                <strong>Pesanan berhasil dibuat</strong>
                <span>Teknisi akan menghubungi sebelum berangkat.</span>
              </div>
            ) : (
              <>
                <div className="info-tile">
                  <CalendarClock size={22} />
                  <div>
                    <strong>Hari ini, {technician.eta}</strong>
                    <span>Teknisi akan menghubungi sebelum berangkat.</span>
                  </div>
                </div>
                <div className="info-tile">
                  <MapPin size={22} />
                  <div>
                    <strong>Alamat rumah utama</strong>
                    <span>Jl. Melati No. 18, Jakarta Selatan</span>
                  </div>
                </div>
              </>
            )}
            <button
              className="primary-button full-width"
              type="button"
              onClick={() => (bookingConfirmed ? setBookingOpen(false) : setBookingConfirmed(true))}
            >
              {bookingConfirmed ? 'TUTUP' : 'PESAN SEKARANG'}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
