import { AirVent, ArrowRight, CircleCheckBig, Refrigerator, ShieldCheck, Sparkles, WashingMachine } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { CategoryCard } from '../components/CategoryCard'
import { SectionLabel } from '../components/SectionLabel'
import { TechnicianCard } from '../components/TechnicianCard'
import { technicians } from '../data/technicians'
import { usePageMeta } from './meta'

const categories = [
  { label: 'PERBAIKAN AC', value: 'AC', caption: 'Cuci, freon, bocor', icon: AirVent },
  { label: 'PERBAIKAN KULKAS', value: 'Kulkas', caption: 'Tidak dingin, freezer', icon: Refrigerator },
  { label: 'MESIN CUCI', value: 'Mesin Cuci', caption: 'Tidak berputar, error', icon: WashingMachine },
]

export function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  usePageMeta(
    'FIXIN - Teknisi Perbaikan Terverifikasi',
    'Cari teknisi AC, kulkas, dan mesin cuci terdekat dengan harga transparan dan garansi perbaikan.',
  )

  const visibleTechnicians = useMemo(() => {
    const query = search.trim().toLowerCase()

    return technicians.filter((technician) => {
      const matchesCategory = selectedCategory ? technician.categories.includes(selectedCategory) : true
      const matchesSearch = query
        ? [technician.name, technician.specialty, technician.categories.join(' ')]
            .join(' ')
            .toLowerCase()
            .includes(query)
        : true

      return matchesCategory && matchesSearch
    })
  }, [search, selectedCategory])

  return (
    <>
      <AppHeader
        title="Apa yang perlu diperbaiki?"
        subtitle="Pilih kebutuhanmu dan lihat teknisi terbaik di sekitar."
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
      />

      <section className="content-section section-intro">
        <div>
          <span className="eyebrow">Layanan populer</span>
          <h2>Pilih jenis perangkat</h2>
        </div>
        <span>Harga diperiksa sebelum pekerjaan dimulai</span>
      </section>

      <section className="content-section category-grid" aria-label="Kategori layanan">
        {categories.map((category) => (
          <CategoryCard
            key={category.label}
            {...category}
            selected={selectedCategory === category.value}
            onSelect={() => setSelectedCategory((current) => (current === category.value ? null : category.value))}
          />
        ))}
      </section>

      <section className="content-section">
        <div className="guarantee-banner">
          <ShieldCheck size={27} />
          <div>
            <span>FIXIN PROTECTION</span>
            <strong>Harga transparan dan bergaransi</strong>
            <small>Konfirmasi estimasi biaya sebelum teknisi bekerja.</small>
          </div>
          <ArrowRight size={20} />
        </div>
      </section>

      <section className="content-section">
        <SectionLabel
          title={selectedCategory ? `Teknisi ${selectedCategory}` : 'Teknisi rekomendasi'}
          action={selectedCategory || search ? 'Reset filter' : undefined}
          onAction={() => {
            setSelectedCategory(null)
            setSearch('')
          }}
        />
        <p className="result-summary">
          {visibleTechnicians.length} teknisi tersedia
          {search ? ` untuk "${search}"` : ' di sekitar lokasimu'}
        </p>
        <div className="horizontal-cards" aria-label="Daftar teknisi">
          {visibleTechnicians.map((technician) => (
            <TechnicianCard key={technician.id} technician={technician} />
          ))}
        </div>
        {visibleTechnicians.length === 0 ? (
          <div className="empty-state">
            <Sparkles size={24} />
            <strong>Belum ada hasil yang cocok</strong>
            <span>Coba kata kunci yang lebih umum atau hapus filter kategori.</span>
            <button
              className="secondary-button"
              type="button"
              onClick={() => {
                setSelectedCategory(null)
                setSearch('')
              }}
            >
              Tampilkan semua teknisi
            </button>
          </div>
        ) : null}
      </section>

      <section className="content-section trust-strip" aria-label="Keunggulan layanan">
        <span><CircleCheckBig size={16} /> Identitas terverifikasi</span>
        <span><CircleCheckBig size={16} /> Biaya disetujui di awal</span>
        <span><CircleCheckBig size={16} /> Garansi tercatat digital</span>
      </section>
    </>
  )
}
