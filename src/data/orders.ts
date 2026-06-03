export type Order = {
  id: string
  service: string
  technician: string
  schedule: string
  address: string
  total: string
  status: 'Menunggu teknisi' | 'Dalam perjalanan' | 'Selesai'
  type: 'active' | 'history'
}

export const orders: Order[] = [
  {
    id: 'FXN-24061',
    service: 'Cuci AC 1 PK',
    technician: 'Andi Saputra',
    schedule: 'Hari ini, 14.00',
    address: 'Jl. Melati No. 18, Jakarta Selatan',
    total: 'Rp85.000',
    status: 'Dalam perjalanan',
    type: 'active',
  },
  {
    id: 'FXN-24052',
    service: 'Cek kulkas tidak dingin',
    technician: 'Siti Nurhaliza',
    schedule: 'Besok, 09.30',
    address: 'Jl. Anggrek No. 7, Jakarta Timur',
    total: 'Rp95.000',
    status: 'Menunggu teknisi',
    type: 'active',
  },
  {
    id: 'FXN-23877',
    service: 'Perbaikan drainase mesin cuci',
    technician: 'Budi Setiawan',
    schedule: '28 Mei 2026, 16.00',
    address: 'Jl. Kenanga No. 4, Jakarta Pusat',
    total: 'Rp180.000',
    status: 'Selesai',
    type: 'history',
  },
]
