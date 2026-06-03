import { CalendarDays, ChevronRight, Clock3, ReceiptText, X } from 'lucide-react'
import { useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { orders } from '../data/orders'
import type { Order } from '../data/orders'
import { usePageMeta } from './meta'

export function OrdersPage() {
  const [tab, setTab] = useState<'active' | 'history'>('active')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const filteredOrders = orders.filter((order) => order.type === tab)

  usePageMeta(
    'Pesanan - FIXIN',
    'Pantau status pesanan aktif dan riwayat perbaikan pelanggan FIXIN.',
  )

  return (
    <>
      <AppHeader title="Pesanan Saya" subtitle="Pantau teknisi dan riwayat servis." />

      <section className="content-section">
        <div className="segmented-control" role="tablist" aria-label="Filter pesanan">
          <button className={tab === 'active' ? 'active' : ''} type="button" onClick={() => setTab('active')}>
            Aktif
          </button>
          <button className={tab === 'history' ? 'active' : ''} type="button" onClick={() => setTab('history')}>
            Selesai
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
              <span>
                <Clock3 size={15} />
                {order.status}
              </span>
              <span>
                <CalendarDays size={15} />
                {order.schedule}
              </span>
            </div>
            <div className="order-footer">
              <span>{order.technician}</span>
              <strong>{order.total}</strong>
            </div>
            <p>{order.address}</p>
          </button>
        ))}
      </section>

      {selectedOrder ? (
        <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-label="Detail pesanan">
          <div className="booking-sheet">
            <div className="sheet-header">
              <div>
                <span>{selectedOrder.id}</span>
                <strong>{selectedOrder.service}</strong>
              </div>
              <button className="icon-button" type="button" aria-label="Tutup" onClick={() => setSelectedOrder(null)}>
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
            <p className="body-copy">{selectedOrder.address}</p>
          </div>
        </div>
      ) : null}
    </>
  )
}
