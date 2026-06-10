import { Bot, Grip, RotateCcw, SendHorizontal, Sparkles, X } from 'lucide-react'
import { FormEvent, PointerEvent as ReactPointerEvent, useEffect, useLayoutEffect, useRef, useState } from 'react'
import assistantLogo from '../assets/fixin-ai-assistant.png'
import { createFixinReply } from '../data/fixinKnowledge'

type ChatMessage = {
  id: number
  from: 'assistant' | 'user'
  text: string
}

type Position = {
  x: number
  y: number
}

type LauncherSide = 'left' | 'right'

type StoredPosition = Position & {
  side?: LauncherSide
}

const POSITION_KEY = 'fixin-ai-launcher-position'
const VIEWPORT_GAP = 14
const MOBILE_BREAKPOINT = 520
const DESKTOP_LAUNCHER_SIZE = 68
const MOBILE_LAUNCHER_SIZE = 62
const MOBILE_NAV_CLEARANCE = 118

function isStoredPosition(value: unknown): value is StoredPosition {
  if (!value || typeof value !== 'object') return false
  const candidate = value as Partial<StoredPosition>
  return Number.isFinite(candidate.x) && Number.isFinite(candidate.y)
}

const initialMessages: ChatMessage[] = [
  {
    id: 1,
    from: 'assistant',
    text: 'Halo, saya FIXIN AI. Tanyakan masalah AC, kulkas, mesin cuci, estimasi layanan, atau cara menggunakan aplikasi.',
  },
]

const quickPrompts = [
  'Harga layanan FIXIN',
  'Teknisi yang tersedia',
  'Area dan jam layanan',
]

function getLauncherSize() {
  return window.innerWidth <= MOBILE_BREAKPOINT
    ? MOBILE_LAUNCHER_SIZE
    : DESKTOP_LAUNCHER_SIZE
}

function getPositionBounds() {
  const launcherSize = getLauncherSize()
  const bottomGap = window.innerWidth <= MOBILE_BREAKPOINT
    ? MOBILE_NAV_CLEARANCE
    : VIEWPORT_GAP

  return {
    minX: VIEWPORT_GAP,
    maxX: Math.max(VIEWPORT_GAP, window.innerWidth - launcherSize - VIEWPORT_GAP),
    minY: VIEWPORT_GAP,
    maxY: Math.max(VIEWPORT_GAP, window.innerHeight - launcherSize - bottomGap),
  }
}

function clampPosition(position: Position): Position {
  const bounds = getPositionBounds()

  return {
    x: Math.min(Math.max(position.x, bounds.minX), bounds.maxX),
    y: Math.min(Math.max(position.y, bounds.minY), bounds.maxY),
  }
}

function getNearestSide(position: Position): LauncherSide {
  const bounds = getPositionBounds()
  const midpoint = (bounds.minX + bounds.maxX) / 2
  return position.x <= midpoint ? 'left' : 'right'
}

function snapPosition(position: Position, side = getNearestSide(position)): Position {
  const clamped = clampPosition(position)
  const bounds = getPositionBounds()

  return {
    x: side === 'left' ? bounds.minX : bounds.maxX,
    y: clamped.y,
  }
}

function getDefaultPosition(): Position {
  const bounds = getPositionBounds()

  return {
    x: bounds.maxX,
    y: bounds.maxY,
  }
}

type AiChatbotProps = {
  isSuppressed?: boolean
}

export function AiChatbot({ isSuppressed = false }: AiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<Position | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)
  const [draft, setDraft] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const positionRef = useRef<Position | null>(null)
  const sideRef = useRef<LauncherSide>('right')
  const inputRef = useRef<HTMLInputElement>(null)
  const threadRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({
    pointerId: 0,
    startPointerX: 0,
    startPointerY: 0,
    startX: 0,
    startY: 0,
    moved: false,
  })
  const suppressClickRef = useRef(false)
  const replyTimerRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    try {
      const saved = window.localStorage.getItem(POSITION_KEY)
      const parsed: unknown = saved ? JSON.parse(saved) : null
      const stored = isStoredPosition(parsed) ? parsed : null
      const savedSide = stored?.side === 'left' || stored?.side === 'right'
        ? stored.side
        : stored
          ? getNearestSide(stored)
          : 'right'
      const next = stored ? snapPosition(stored, savedSide) : getDefaultPosition()
      sideRef.current = savedSide
      positionRef.current = next
      setPosition(next)
    } catch {
      const next = getDefaultPosition()
      positionRef.current = next
      setPosition(next)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setPosition((current) => {
        if (!current) return getDefaultPosition()
        const next = snapPosition(current, sideRef.current)
        positionRef.current = next
        window.localStorage.setItem(
          POSITION_KEY,
          JSON.stringify({ ...next, side: sideRef.current }),
        )
        return next
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isOpen) {
      window.requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        window.requestAnimationFrame(() => launcherRef.current?.focus())
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isSuppressed) {
      setIsOpen(false)
    }
  }, [isSuppressed])

  useEffect(() => {
    threadRef.current?.scrollTo({
      top: threadRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, isTyping])

  useEffect(() => {
    return () => {
      if (replyTimerRef.current) {
        window.clearTimeout(replyTimerRef.current)
      }
    }
  }, [])

  function handlePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!position || event.button !== 0) return

    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
    dragRef.current = {
      pointerId: event.pointerId,
      startPointerX: event.clientX,
      startPointerY: event.clientY,
      startX: position.x,
      startY: position.y,
      moved: false,
    }
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current
    if (!position || drag.pointerId !== event.pointerId) return

    const deltaX = event.clientX - drag.startPointerX
    const deltaY = event.clientY - drag.startPointerY

    if (!drag.moved && Math.hypot(deltaX, deltaY) > 5) {
      drag.moved = true
    }

    if (drag.moved) {
      const next = clampPosition({
        x: drag.startX + deltaX,
        y: drag.startY + deltaY,
      })
      positionRef.current = next
      setPosition(next)
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = dragRef.current
    if (drag.pointerId !== event.pointerId) return

    suppressClickRef.current = drag.moved
    drag.pointerId = 0
    setIsDragging(false)

    if (positionRef.current && drag.moved) {
      const side = getNearestSide(positionRef.current)
      const next = snapPosition(positionRef.current, side)
      sideRef.current = side
      positionRef.current = next
      setPosition(next)
      window.localStorage.setItem(POSITION_KEY, JSON.stringify({ ...next, side }))
    }
  }

  function toggleChat() {
    if (suppressClickRef.current) {
      suppressClickRef.current = false
      return
    }

    setIsOpen((open) => !open)
  }

  function sendMessage(text: string) {
    const cleanText = text.trim()
    if (!cleanText || isTyping) return

    const userMessage: ChatMessage = {
      id: Date.now(),
      from: 'user',
      text: cleanText,
    }

    setMessages((current) => [...current, userMessage])
    setDraft('')
    setIsTyping(true)

    replyTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          from: 'assistant',
          text: createFixinReply(cleanText),
        },
      ])
      setIsTyping(false)
    }, 650)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sendMessage(draft)
  }

  const panelWidth = Math.min(380, window.innerWidth - 24)
  const panelHeight = Math.min(580, window.innerHeight - 24)
  const launcherSize = getLauncherSize()
  const panelPosition = position
    ? {
        left: Math.min(
          Math.max(position.x + launcherSize - panelWidth, 12),
          window.innerWidth - panelWidth - 12,
        ),
        top: Math.min(
          Math.max(position.y - panelHeight - 12, 12),
          window.innerHeight - panelHeight - 12,
        ),
      }
    : { left: 12, top: 12 }

  if (!position || isSuppressed) return null

  return (
    <>
      {isOpen ? (
        <section
          className="ai-chat-panel"
          style={panelPosition}
          role="dialog"
          aria-label="FIXIN AI Assistant"
        >
          <header className="ai-chat-header">
            <img src={assistantLogo} alt="" />
            <div>
              <strong>FIXIN AI</strong>
              <span><i /> Asisten virtual · Data FIXIN</span>
            </div>
            <button
              type="button"
              aria-label="Mulai percakapan baru"
              title="Mulai percakapan baru"
              onClick={() => {
                setMessages(initialMessages)
                setDraft('')
                setIsTyping(false)
                if (replyTimerRef.current) window.clearTimeout(replyTimerRef.current)
              }}
            >
              <RotateCcw size={17} />
            </button>
            <button type="button" aria-label="Tutup chatbot" onClick={() => setIsOpen(false)}>
              <X size={19} />
            </button>
          </header>

          <div className="ai-chat-intro">
            <Sparkles size={16} />
            Diagnosis awal bukan pengganti pemeriksaan langsung teknisi.
          </div>

          <div ref={threadRef} className="ai-chat-thread" aria-live="polite">
            {messages.map((message) => (
              <div className={`ai-message ${message.from}`} key={message.id}>
                {message.from === 'assistant' ? (
                  <span className="ai-message-avatar"><Bot size={15} /></span>
                ) : null}
                <p>{message.text}</p>
              </div>
            ))}
            {isTyping ? (
              <div className="ai-message assistant">
                <span className="ai-message-avatar"><Bot size={15} /></span>
                <span className="ai-typing" aria-label="FIXIN AI sedang mengetik">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            ) : null}
          </div>

          {messages.length === 1 ? (
            <div className="ai-quick-prompts" aria-label="Pertanyaan cepat">
              {quickPrompts.map((prompt) => (
                <button type="button" key={prompt} onClick={() => sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          <form className="ai-chat-composer" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={draft}
              placeholder="Tanyakan sesuatu..."
              aria-label="Pesan untuk FIXIN AI"
              onChange={(event) => setDraft(event.target.value)}
            />
            <button type="submit" aria-label="Kirim pesan" disabled={!draft.trim() || isTyping}>
              <SendHorizontal size={18} />
            </button>
          </form>
        </section>
      ) : null}

      <button
        ref={launcherRef}
        className={[
          'ai-chat-launcher',
          isOpen ? 'active' : '',
          isDragging ? 'dragging' : '',
        ].filter(Boolean).join(' ')}
        style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
        type="button"
        aria-label={isOpen ? 'Tutup FIXIN AI' : 'Buka FIXIN AI. Tombol dapat digeser'}
        aria-expanded={isOpen}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onClick={toggleChat}
      >
        <img src={assistantLogo} alt="" draggable={false} />
        <span className="ai-launcher-status" />
        <span className="ai-drag-hint"><Grip size={12} /> Geser</span>
      </button>
    </>
  )
}
