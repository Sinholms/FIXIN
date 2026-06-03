import { ArrowLeft, SendHorizontal } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { messages } from '../data/messages'
import type { ChatPreview } from '../data/messages'
import { usePageMeta } from './meta'

export function MessagesPage() {
  const [activeChat, setActiveChat] = useState<ChatPreview | null>(null)
  const [draft, setDraft] = useState('')
  const [sentMessages, setSentMessages] = useState<Record<string, ChatPreview['thread']>>({})

  usePageMeta(
    'Pesan - FIXIN',
    'Chat mock dengan teknisi FIXIN untuk koordinasi jadwal dan status perbaikan.',
  )

  if (activeChat) {
    const thread = [...activeChat.thread, ...(sentMessages[activeChat.id] ?? [])]

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault()
      const text = draft.trim()

      if (!text || !activeChat) {
        return
      }

      setSentMessages((current) => ({
        ...current,
        [activeChat.id]: [...(current[activeChat.id] ?? []), { from: 'user', text, time: 'Baru saja' }],
      }))
      setDraft('')
    }

    return (
      <div className="chat-view">
        <header className="chat-header">
          <button className="icon-button" type="button" aria-label="Kembali" onClick={() => setActiveChat(null)}>
            <ArrowLeft size={20} />
          </button>
          <img src={activeChat.technician.photo} alt={`Foto ${activeChat.technician.name}`} />
          <div>
            <strong>{activeChat.technician.name}</strong>
            <span>Online - respon cepat</span>
          </div>
        </header>

        <section className="message-thread" aria-label="Percakapan">
          {thread.map((message, index) => (
            <div className={`bubble ${message.from}`} key={`${message.time}-${index}`}>
              <p>{message.text}</p>
              <span>{message.time}</span>
            </div>
          ))}
        </section>

        <form className="chat-composer" onSubmit={handleSubmit}>
          <input
            placeholder="Tulis pesan..."
            aria-label="Tulis pesan"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
          <button className="icon-button send" type="submit" aria-label="Kirim pesan" disabled={!draft.trim()}>
            <SendHorizontal size={19} />
          </button>
        </form>
      </div>
    )
  }

  return (
    <>
      <AppHeader title="Pesan" subtitle="Koordinasi langsung dengan teknisi." />

      <section className="content-section chat-list" aria-label="Daftar chat">
        {messages.map((chat) => (
          <button className="chat-row" type="button" key={chat.id} onClick={() => setActiveChat(chat)}>
            <img src={chat.technician.photo} alt={`Foto ${chat.technician.name}`} />
            <div>
              <strong>{chat.technician.name}</strong>
              <span>{chat.lastMessage}</span>
            </div>
            <aside>
              <time>{chat.time}</time>
              {chat.unread ? <b>{chat.unread}</b> : null}
            </aside>
          </button>
        ))}
      </section>
    </>
  )
}
