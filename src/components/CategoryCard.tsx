import type { ComponentType } from 'react'
import type { LucideProps } from 'lucide-react'

type CategoryCardProps = {
  label: string
  caption: string
  icon: ComponentType<LucideProps>
  selected?: boolean
  onSelect?: () => void
}

export function CategoryCard({ label, caption, icon: Icon, selected = false, onSelect }: CategoryCardProps) {
  return (
    <button
      className={selected ? 'category-card selected' : 'category-card'}
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
    >
      <span className="category-icon">
        <Icon size={29} strokeWidth={2.2} />
      </span>
      <span className="category-label">{label}</span>
      <span className="category-caption">{caption}</span>
    </button>
  )
}
