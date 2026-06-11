import { RefObject, useEffect, useRef } from 'react'

export function useModalDialog(
  isOpen: boolean,
  onClose: () => void,
  dialogRef: RefObject<HTMLElement | null>,
  initialFocusRef?: RefObject<HTMLElement | null>,
) {
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    const appScroll = document.querySelector<HTMLElement>('.app-scroll')
    const previousOverflow = appScroll?.style.overflow ?? ''
    const previouslyFocused = document.activeElement as HTMLElement | null

    if (appScroll) {
      appScroll.style.overflow = 'hidden'
    }

    window.requestAnimationFrame(() => {
      initialFocusRef?.current?.focus()
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeRef.current()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )

      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      if (appScroll) {
        appScroll.style.overflow = previousOverflow
      }
      window.removeEventListener('keydown', handleKeyDown)
      window.requestAnimationFrame(() => previouslyFocused?.focus())
    }
  }, [dialogRef, initialFocusRef, isOpen])
}
