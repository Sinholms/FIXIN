import { ArrowLeft, CalendarClock, Search, SendHorizontal, ShieldCheck } from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'
import { AppHeader } from '../components/AppHeader'
import { messages } from '../data/messages'
import type { ChatPreview } from '../data/messages'
import { usePageMeta } from './meta'

export function MessagesPage() {
  const [activeChat, setActiveChat] = useState<ChatPreview | null>(null)
  const [draft, setDraft] = useState('')
  const [query, setQuery] = useState('')
  const [sentMessages, setSentMessages] = useState<Record<string, ChatPreview['thread']>>({})
  const filteredMessages = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return messages

    return messages.filter((chat) =>
      [chat.technician.name, chat.technician.specialty, chat.lastMessage].join(' ').toLowerCase().includes(keyword),
    )
  }, [query])

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
          <div className="chat-context-card">
            <CalendarClock size={19} />
            <div>
              <strong>Servis terjadwal hari ini</strong>
              <span>Andi menuju lokasi · estimasi tiba 18 menit</span>
            </div>
          </div>
          {thread.map((message, index) => (
            <div className={`bubble ${message.from}`} key={`${message.time}-${index}`}>
              <p>{message.text}</p>
              <span>{message.time}</span>
            </div>
          ))}
        </section>

        <div className="quick-replies" aria-label="Balasan cepat">
          {['Baik, saya tunggu', 'Tolong kabari saat tiba', 'Alamat sudah sesuai'].map((reply) => (
            <button type="button" key={reply} onClick={() => setDraft(reply)}>
              {reply}
            </button>
          ))}
        </div>
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

      <section className="content-section">
        <label className="in-page-search">
          <Search size={18} />
          <input
            type="search"
            value={query}
            placeholder="Cari teknisi atau percakapan"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </section>

      <section className="content-section secure-message">
        <ShieldCheck size={19} />
        <span>Chat tersimpan bersama detail pesanan untuk perlindungan pelanggan.</span>
      </section>

      <section className="content-section chat-list" aria-label="Daftar chat">
        {filteredMessages.map((chat) => (
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
        {filteredMessages.length === 0 ? (
          <div className="empty-state">
            <strong>Percakapan tidak ditemukan</strong>
            <span>Coba cari dengan nama teknisi atau jenis layanan.</span>
          </div>
        ) : null}
      </section>
    </>
  )
}
