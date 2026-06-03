type SectionLabelProps = {
  title: string
  action?: string
  onAction?: () => void
}

export function SectionLabel({ title, action, onAction }: SectionLabelProps) {
  return (
    <div className="section-label">
      <h2>{title}</h2>
      {action ? (
        <button type="button" onClick={onAction} disabled={!onAction}>
          {action}
        </button>
      ) : null}
    </div>
  )
}
