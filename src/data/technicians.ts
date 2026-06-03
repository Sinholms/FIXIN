import andiPhoto from '../assets/andi-saputra.png'
import sitiPhoto from '../assets/siti-nurhaliza.png'
import budiPhoto from '../assets/budi-setiawan.png'
import mayaPhoto from '../assets/maya-pratiwi.png'

export type Technician = {
  id: string
  name: string
  specialty: string
  categories: string[]
  rating: number
  reviews: number
  completedJobs: number
  distance: string
  eta: string
  priceRange: string
  responseTime: string
  warranty: string
  bio: string
  photo: string
  badges: string[]
  priceDetails: { label: string; price: string }[]
  reviewList: { user: string; text: string; rating: number }[]
}

export const technicians: Technician[] = [
  {
    id: 'andi-saputra',
    name: 'Andi Saputra',
    specialty: 'Spesialis AC Split & Inverter',
    categories: ['AC', 'Freon', 'Cuci AC'],
    rating: 4.9,
    reviews: 184,
    completedJobs: 612,
    distance: '1.2 km',
    eta: '18 menit',
    priceRange: 'Mulai Rp85.000',
    responseTime: '< 5 menit',
    warranty: 'Garansi 14 hari',
    bio: 'Berpengalaman menangani servis AC rumah, kantor kecil, pengisian freon, dan perbaikan AC inverter.',
    photo: andiPhoto,
    badges: ['KTP terverifikasi', 'Harga transparan', 'Peralatan lengkap'],
    priceDetails: [
      { label: 'Cuci AC standar', price: 'Rp85.000' },
      { label: 'Tambah freon', price: 'Rp150.000' },
      { label: 'Perbaikan bocor', price: 'Mulai Rp225.000' },
    ],
    reviewList: [
      { user: 'Rani', text: 'Datang tepat waktu, AC jadi dingin lagi dan area kerja rapi.', rating: 5 },
      { user: 'Dimas', text: 'Jelas saat menjelaskan biaya. Tidak ada tambahan mendadak.', rating: 5 },
    ],
  },
  {
    id: 'siti-nurhaliza',
    name: 'Siti Nurhaliza',
    specialty: 'Spesialis Kulkas & Freezer',
    categories: ['Kulkas', 'Freezer', 'Kompresor'],
    rating: 4.8,
    reviews: 142,
    completedJobs: 489,
    distance: '2.0 km',
    eta: '25 menit',
    priceRange: 'Mulai Rp95.000',
    responseTime: '< 8 menit',
    warranty: 'Garansi 21 hari',
    bio: 'Fokus pada diagnosis kulkas tidak dingin, freezer bunga es, penggantian relay, dan perbaikan kebocoran ringan.',
    photo: sitiPhoto,
    badges: ['Spare part resmi', 'Diagnosis cepat', 'Ramah keluarga'],
    priceDetails: [
      { label: 'Cek kulkas', price: 'Rp95.000' },
      { label: 'Ganti relay', price: 'Mulai Rp175.000' },
      { label: 'Servis freezer', price: 'Mulai Rp210.000' },
    ],
    reviewList: [
      { user: 'Ayu', text: 'Kulkas kembali normal. Penjelasan kerusakan mudah dipahami.', rating: 5 },
      { user: 'Fajar', text: 'Biaya sesuai estimasi aplikasi dan garansi dicatat jelas.', rating: 4 },
    ],
  },
  {
    id: 'budi-setiawan',
    name: 'Budi Setiawan',
    specialty: 'Spesialis Mesin Cuci',
    categories: ['Mesin Cuci', 'Dinamo', 'Drainase'],
    rating: 4.7,
    reviews: 121,
    completedJobs: 374,
    distance: '2.7 km',
    eta: '32 menit',
    priceRange: 'Mulai Rp90.000',
    responseTime: '< 10 menit',
    warranty: 'Garansi 14 hari',
    bio: 'Menangani mesin cuci tidak berputar, air tidak keluar, error panel, dan servis berkala.',
    photo: budiPhoto,
    badges: ['Jam malam tersedia', 'Cek menyeluruh', 'Pembayaran digital'],
    priceDetails: [
      { label: 'Cek mesin cuci', price: 'Rp90.000' },
      { label: 'Perbaikan drainase', price: 'Mulai Rp160.000' },
      { label: 'Ganti kapasitor', price: 'Mulai Rp185.000' },
    ],
    reviewList: [
      { user: 'Nadia', text: 'Mesin cuci langsung bisa dipakai lagi setelah diperbaiki.', rating: 5 },
      { user: 'Yoga', text: 'Teknisi sopan dan memberi tips perawatan sederhana.', rating: 4 },
    ],
  },
  {
    id: 'maya-pratiwi',
    name: 'Maya Pratiwi',
    specialty: 'Elektronik Rumah Tangga',
    categories: ['AC', 'Kulkas', 'Kelistrikan'],
    rating: 4.9,
    reviews: 166,
    completedJobs: 531,
    distance: '3.1 km',
    eta: '36 menit',
    priceRange: 'Mulai Rp100.000',
    responseTime: '< 6 menit',
    warranty: 'Garansi 30 hari',
    bio: 'Ahli diagnosis peralatan rumah tangga, pengecekan arus listrik, dan perbaikan komponen ringan.',
    photo: mayaPhoto,
    badges: ['Rating tinggi', 'Garansi panjang', 'Laporan digital'],
    priceDetails: [
      { label: 'Diagnosis umum', price: 'Rp100.000' },
      { label: 'Perbaikan komponen', price: 'Mulai Rp195.000' },
      { label: 'Pengecekan kelistrikan', price: 'Mulai Rp150.000' },
    ],
    reviewList: [
      { user: 'Indra', text: 'Masalah cepat ditemukan dan semua opsi biaya dijelaskan dulu.', rating: 5 },
      { user: 'Laras', text: 'Rapi, komunikatif, dan hasil servis memuaskan.', rating: 5 },
    ],
  },
]

export function getTechnicianById(id: string | undefined) {
  return technicians.find((technician) => technician.id === id)
}
