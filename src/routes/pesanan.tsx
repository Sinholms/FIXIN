import { Link } from '@tanstack/react-router'
import { CalendarDays, Check, ChevronRight, Clock3, MapPin, MessageCircle, ReceiptText, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { useModalDialog } from '../components/useModalDialog'
import { orders } from '../data/orders'
import type { Order } from '../data/orders'
import { usePageMeta } from './meta'

export function OrdersPage() {
  const [tab, setTab] = useState<'active' | 'history'>('active')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const filteredOrders = orders.filter((order) => order.type === tab)
  useModalDialog(Boolean(selectedOrder), () => setSelectedOrder(null), dialogRef, closeButtonRef)

  usePageMeta(
    'Pesanan - FIXIN',
    'Pantau status pesanan aktif dan riwayat perbaikan pelanggan FIXIN.',
  )

  return (
    <>
      <AppHeader title="Pesanan Saya" subtitle="Pantau teknisi dan riwayat servis." />

      <section className="content-section">
        <div className="segmented-control" role="tablist" aria-label="Filter pesanan">
          <button
            className={tab === 'active' ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={tab === 'active'}
            onClick={() => setTab('active')}
          >
            Aktif <span>{orders.filter((order) => order.type === 'active').length}</span>
          </button>
          <button
            className={tab === 'history' ? 'active' : ''}
            type="button"
            role="tab"
            aria-selected={tab === 'history'}
            onClick={() => setTab('history')}
          >
            Selesai <span>{orders.filter((order) => order.type === 'history').length}</span>
          </button>
        </div>
      </section>

      <section className="content-section order-stack" aria-label="Daftar pesanan">
        {filteredOrders.map((order) => (
          <button className="order-card" type="button" key={order.id} onClick={() => setSelectedOrder(order)}>
            <div className="order-head">
              <div className="order-icon">
                <ReceiptText size={22} />
              </div>
              <div>
                <strong>{order.service}</strong>
                <span>{order.id}</span>
              </div>
              <ChevronRight size={18} />
            </div>
            <div className="order-info">
              <span className={`status-pill ${order.status === 'Dalam perjalanan' ? 'moving' : order.status === 'Selesai' ? 'done' : ''}`}>
                <Clock3 size={15} />
                {order.status}
              </span>
              <span>
                <CalendarDays size={15} />
                {order.schedule}
              </span>
            </div>
            <div className="order-footer">
              <span>Teknisi · {order.technician}</span>
              <strong>{order.total}</strong>
            </div>
            <p><MapPin size={14} /> {order.address}</p>
          </button>
        ))}
      </section>

      {selectedOrder ? (
        <div
          className="sheet-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedOrder(null)
          }}
        >
          <div ref={dialogRef} className="booking-sheet" role="dialog" aria-modal="true" aria-label="Detail pesanan">
            <div className="sheet-header">
              <div>
                <span>{selectedOrder.id}</span>
                <strong>{selectedOrder.service}</strong>
              </div>
              <button ref={closeButtonRef} className="icon-button" type="button" aria-label="Tutup" onClick={() => setSelectedOrder(null)}>
                <X size={18} />
              </button>
            </div>
            <div className="price-list order-detail-list">
              <div>
                <span>Status</span>
                <strong>{selectedOrder.status}</strong>
              </div>
              <div>
                <span>Teknisi</span>
                <strong>{selectedOrder.technician}</strong>
              </div>
              <div>
                <span>Jadwal</span>
                <strong>{selectedOrder.schedule}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>{selectedOrder.total}</strong>
              </div>
            </div>
            <div className="order-progress" aria-label={`Status pesanan: ${selectedOrder.status}`}>
              {['Pesanan dibuat', 'Teknisi dikonfirmasi', 'Dalam perjalanan', 'Selesai'].map((step, index) => {
                const currentIndex =
                  selectedOrder.status === 'Selesai' ? 3 : selectedOrder.status === 'Dalam perjalanan' ? 2 : 1
                return (
                  <div className={index <= currentIndex ? 'complete' : ''} key={step}>
                    <span>{index <= currentIndex ? <Check size={13} /> : index + 1}</span>
                    <small>{step}</small>
                  </div>
                )
              })}
            </div>
            <p className="address-panel"><MapPin size={18} /> {selectedOrder.address}</p>
            <div className="dialog-actions">
              <button className="secondary-button" type="button" onClick={() => setSelectedOrder(null)}>
                Tutup
              </button>
              {selectedOrder.type === 'active' ? (
                <Link className="primary-button" to="/pesan">
                  <MessageCircle size={17} /> Hubungi teknisi
                </Link>
              ) : (
                <Link className="primary-button" to="/">
                  Pesan lagi
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
