import { technicians } from './technicians'

const SUPPORT_HOURS = 'setiap hari, 07.00-22.00 WIB'
const DEMO_SERVICE_AREA = 'area Jakarta yang terjangkau oleh teknisi di sekitar alamat pengguna'

function normalize(text: string) {
  return text.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ')
}

function includesAny(query: string, keywords: string[]) {
  return keywords.some((keyword) => query.includes(keyword))
}

function formatTechnician(technician: (typeof technicians)[number]) {
  return `${technician.name} - ${technician.specialty}, ${technician.distance}, estimasi tiba ${technician.eta}, rating ${technician.rating}, ${technician.warranty}.`
}

function formatPrices(category: string) {
  return technicians
    .filter((technician) =>
      technician.categories.some((item) => item.toLowerCase().includes(category)),
    )
    .flatMap((technician) =>
      technician.priceDetails.map((service) => `${service.label}: ${service.price}`),
    )
    .join('\n')
}

function findTechnician(query: string) {
  return technicians.find((technician) =>
    query.includes(technician.name.toLowerCase().split(' ')[0]),
  )
}

export const fixinKnowledgeSummary = {
  services: ['AC', 'kulkas dan freezer', 'mesin cuci', 'kelistrikan rumah tangga'],
  supportHours: SUPPORT_HOURS,
  serviceArea: DEMO_SERVICE_AREA,
  payment: 'Pembayaran setelah servis melalui tunai atau QRIS kepada teknisi.',
  pricing: 'Harga pada aplikasi adalah estimasi. Biaya final wajib dikonfirmasi sebelum pekerjaan dimulai.',
  warranty: 'Garansi tercatat digital dan durasinya mengikuti teknisi serta jenis layanan yang dipilih.',
}

export function createFixinReply(question: string) {
  const query = normalize(question)
  const namedTechnician = findTechnician(query)

  if (namedTechnician) {
    const prices = namedTechnician.priceDetails
      .map((service) => `${service.label}: ${service.price}`)
      .join('\n')

    return `${formatTechnician(namedTechnician)}\n\nEstimasi layanan:\n${prices}\n\nBiaya final dikonfirmasi sebelum pekerjaan dimulai.`
  }

  if (includesAny(query, ['darurat', 'korslet', 'kebakaran', 'asap', 'bau terbakar', 'kesetrum'])) {
    return 'Demi keselamatan, matikan perangkat dan putuskan listrik dari sumber utama hanya jika aman. Jangan menyentuh perangkat yang basah, berasap, atau berbau terbakar. Hubungi layanan darurat atau teknisi listrik profesional; jangan mencoba membongkar perangkat sendiri.'
  }

  if (includesAny(query, ['layanan apa', 'bisa apa', 'service apa', 'servis apa'])) {
    return `FIXIN menyediakan bantuan untuk ${fixinKnowledgeSummary.services.join(', ')}. Data demo saat ini menampilkan teknisi terverifikasi, estimasi harga, jadwal, pemesanan, pesan, status pesanan, pembayaran, dan garansi digital.`
  }

  if (
    includesAny(query, [
      'teknisi yang tersedia',
      'daftar teknisi',
      'siapa yang tersedia',
      'rekomendasi teknisi',
      'pilihan teknisi',
    ])
  ) {
    return `Teknisi yang tersedia pada data FIXIN:\n${technicians.map(formatTechnician).join('\n')}\n\nJarak dan waktu tiba merupakan data demo dan dapat berubah mengikuti lokasi serta ketersediaan.`
  }

  if (includesAny(query, ['harga', 'biaya', 'tarif'])) {
    if (query.includes('ac')) {
      return `Estimasi layanan AC:\n${formatPrices('ac')}\n\nHarga final mengikuti hasil diagnosis dan harus disetujui sebelum pengerjaan.`
    }

    if (includesAny(query, ['kulkas', 'freezer'])) {
      return `Estimasi layanan kulkas dan freezer:\n${formatPrices('kulkas')}\n\nHarga final mengikuti hasil diagnosis dan harus disetujui sebelum pengerjaan.`
    }

    if (includesAny(query, ['mesin cuci', 'drainase', 'kapasitor'])) {
      return `Estimasi layanan mesin cuci:\n${formatPrices('mesin cuci')}\n\nHarga final mengikuti hasil diagnosis dan harus disetujui sebelum pengerjaan.`
    }

    return 'Estimasi awal FIXIN: cuci AC Rp85.000; cek kulkas Rp95.000; cek mesin cuci Rp90.000; dan diagnosis umum Rp100.000. Perbaikan serta suku cadang dihitung setelah diagnosis. Biaya final wajib dikonfirmasi sebelum pekerjaan dimulai.'
  }

  if (includesAny(query, ['garansi', 'jaminan'])) {
    const warranties = technicians.map((technician) => `${technician.name}: ${technician.warranty}`)
    return `Garansi pada data FIXIN berkisar 14-30 hari:\n${warranties.join('\n')}\n\nGaransi aktif setelah pekerjaan selesai dan laporan servis dikirim. Ketentuan mengikuti layanan serta teknisi yang dipilih.`
  }

  if (includesAny(query, ['bayar', 'pembayaran', 'qris', 'tunai', 'cash'])) {
    return `${fixinKnowledgeSummary.payment} Estimasi biaya diperiksa lebih dahulu, dan tambahan pekerjaan tidak boleh dilakukan tanpa persetujuan pelanggan.`
  }

  if (
    includesAny(query, ['jam', 'buka', 'operasional']) &&
    includesAny(query, ['lokasi', 'area', 'wilayah', 'jangkauan', 'layanan'])
  ) {
    return `Pusat bantuan FIXIN tersedia ${SUPPORT_HOURS}. Cakupan aplikasi demo adalah ${DEMO_SERVICE_AREA}. Jadwal, jarak, dan estimasi tiba teknisi mengikuti alamat serta ketersediaan.`
  }

  if (includesAny(query, ['jam', 'buka', 'operasional', 'customer service', 'pusat bantuan'])) {
    return `Pusat bantuan FIXIN tersedia ${SUPPORT_HOURS}. Jadwal kunjungan teknisi tetap mengikuti slot yang tersedia pada profil teknisi.`
  }

  if (includesAny(query, ['lokasi', 'area', 'wilayah', 'jakarta', 'jangkauan'])) {
    return `Cakupan pada aplikasi demo adalah ${DEMO_SERVICE_AREA}. Masukkan alamat layanan untuk melihat teknisi terdekat; jarak, estimasi tiba, dan ketersediaan dapat berbeda untuk setiap lokasi.`
  }

  if (query.includes('ac') && includesAny(query, ['tidak dingin', 'panas', 'kurang dingin'])) {
    return 'AC tidak dingin biasanya disebabkan filter kotor, freon berkurang akibat kebocoran, evaporator membeku, atau kompresor bermasalah. Matikan AC sekitar 15 menit dan bersihkan filter bila aman. Jika tetap tidak dingin, pesan pemeriksaan teknisi. Jangan menambah freon tanpa pengecekan kebocoran.'
  }

  if (query.includes('ac') && includesAny(query, ['bocor', 'menetes', 'air'])) {
    return 'AC menetes dapat disebabkan saluran pembuangan tersumbat, filter kotor, atau evaporator membeku. Matikan unit jika air mendekati stopkontak atau perangkat elektronik. Hindari menusuk saluran sendiri dan minta teknisi memeriksa drainase serta kondisi evaporator.'
  }

  if (query.includes('kulkas') && includesAny(query, ['berisik', 'bunyi'])) {
    return 'Suara kulkas dapat berasal dari kipas yang menyentuh bunga es, posisi kulkas tidak rata, atau kompresor bekerja terlalu berat. Beri jarak dari dinding dan pastikan lantai rata. Jika bunyi keras terus-menerus atau kulkas tidak dingin, lakukan pemeriksaan teknisi.'
  }

  if (includesAny(query, ['kulkas', 'freezer']) && includesAny(query, ['tidak dingin', 'bunga es'])) {
    return 'Periksa apakah pintu menutup rapat, ventilasi tidak tertutup makanan, dan pengaturan suhu sesuai. Bunga es tebal dapat mengganggu aliran udara. Jangan mencungkil es dengan benda tajam; lakukan pencairan sesuai petunjuk perangkat atau pesan teknisi.'
  }

  if (query.includes('mesin cuci')) {
    return 'Periksa suplai listrik, aliran air, posisi selang pembuangan, dan muatan tabung. Jika muncul kode error, catat kode, merek, tipe mesin, dan gejalanya agar diagnosis lebih tepat. Hentikan penggunaan bila tercium bau terbakar atau terjadi kebocoran listrik.'
  }

  if (includesAny(query, ['pesan', 'booking', 'cara order', 'buat order'])) {
    return 'Cara memesan: pilih kategori di Beranda, buka profil teknisi, periksa harga dan garansi, tekan Pesan teknisi, pilih layanan serta jadwal, lalu konfirmasi alamat. Status pesanan dapat dipantau melalui menu Pesanan dan komunikasi dilakukan melalui menu Pesan.'
  }

  if (includesAny(query, ['status', 'lacak', 'pesanan saya'])) {
    return 'Buka menu Pesanan untuk melihat status Menunggu teknisi, Dalam perjalanan, atau Selesai. Untuk konfirmasi kedatangan dan detail pekerjaan, gunakan menu Pesan pada percakapan teknisi terkait.'
  }

  if (includesAny(query, ['halo', 'hai', 'selamat', 'siapa kamu'])) {
    return 'Halo! Saya FIXIN AI, asisten virtual untuk diagnosis awal perangkat rumah serta informasi teknisi, estimasi harga, area layanan, pemesanan, pembayaran, dan garansi.'
  }

  return 'Saya dapat membantu tentang AC, kulkas, freezer, mesin cuci, kelistrikan ringan, teknisi, estimasi harga, area layanan, pemesanan, pembayaran, dan garansi. Untuk diagnosis awal, sebutkan perangkat, gejala, merek atau kode error, dan sejak kapan masalah terjadi.'
}
