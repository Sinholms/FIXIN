import type { Technician } from './technicians'
import { technicians } from './technicians'

export type ChatPreview = {
  id: string
  technician: Technician
  lastMessage: string
  time: string
  unread: number
  thread: { from: 'user' | 'technician'; text: string; time: string }[]
}

export const messages: ChatPreview[] = [
  {
    id: 'chat-andi',
    technician: technicians[0],
    lastMessage: 'Saya menuju lokasi, estimasi 18 menit lagi.',
    time: '13.22',
    unread: 2,
    thread: [
      { from: 'technician', text: 'Halo, saya Andi dari FIXIN.', time: '13.05' },
      { from: 'user', text: 'Baik Pak, alamat sesuai aplikasi ya.', time: '13.08' },
      { from: 'technician', text: 'Saya menuju lokasi, estimasi 18 menit lagi.', time: '13.22' },
    ],
  },
  {
    id: 'chat-siti',
    technician: technicians[1],
    lastMessage: 'Boleh siapkan foto bagian belakang kulkas?',
    time: 'Kemarin',
    unread: 0,
    thread: [
      { from: 'user', text: 'Kulkas saya tidak dingin sejak semalam.', time: '19.10' },
      { from: 'technician', text: 'Boleh siapkan foto bagian belakang kulkas?', time: '19.12' },
    ],
  },
  {
    id: 'chat-maya',
    technician: technicians[3],
    lastMessage: 'Saya sudah kirim ringkasan hasil pengecekan.',
    time: 'Senin',
    unread: 0,
    thread: [
      { from: 'technician', text: 'Saya sudah kirim ringkasan hasil pengecekan.', time: '10.40' },
      { from: 'user', text: 'Terima kasih, laporannya jelas.', time: '10.45' },
    ],
  },
]
