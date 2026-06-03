import { AirVent, Refrigerator, ShieldCheck, WashingMachine } from 'lucide-react'
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
        title="Butuh bantuan hari ini?"
        subtitle="Teknisi terverifikasi siap datang ke rumah."
        showSearch
        searchValue={search}
        onSearchChange={setSearch}
      />

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
            <span>HARGA TRANSPARAN</span>
            <strong>JAMINAN GARANSI PERBAIKAN 100%</strong>
          </div>
        </div>
      </section>

      <section className="content-section">
        <SectionLabel
          title={selectedCategory ? `TEKNISI ${selectedCategory.toUpperCase()}` : 'TEKNISI TERDEKAT & TERVERIFIKASI'}
          action="Lihat semua"
          onAction={() => {
            setSelectedCategory(null)
            setSearch('')
          }}
        />
        <div className="horizontal-cards" aria-label="Daftar teknisi">
          {visibleTechnicians.map((technician) => (
            <TechnicianCard key={technician.id} technician={technician} />
          ))}
        </div>
        {visibleTechnicians.length === 0 ? (
          <p className="empty-state">Tidak ada teknisi yang cocok. Coba kategori atau kata kunci lain.</p>
        ) : null}
      </section>

      <section className="content-section trust-strip" aria-label="Keunggulan layanan">
        <span>Harga Transparan</span>
        <span>Jaminan Garansi</span>
        <span>Teknisi Tersertifikasi</span>
      </section>
    </>
  )
}
