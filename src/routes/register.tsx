import { Link, useNavigate } from '@tanstack/react-router'
import { LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Logo } from '../components/Logo'
import { saveDemoUser } from './authStorage'
import { usePageMeta } from './meta'

export function RegisterPage() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  usePageMeta('Daftar - FIXIN', 'Daftar akun FIXIN untuk mulai memesan teknisi perbaikan rumah.')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (name.trim().length < 3 || !email.includes('@') || password.trim().length < 6) {
      setError('Lengkapi nama, email valid, dan password minimal 6 karakter.')
      return
    }

    saveDemoUser({
      name: name.trim(),
      email,
    })
    navigate({ to: '/' })
  }

  return (
    <section className="auth-page">
      <div className="auth-hero">
        <Logo variant="light" />
        <div>
          <h1>Buat akun FIXIN</h1>
          <p>Simpan alamat, lihat riwayat servis, dan hubungi teknisi lebih cepat.</p>
        </div>
      </div>

      <form className="auth-panel register-panel" onSubmit={handleSubmit}>
        <label className="auth-field">
          <span>Nama lengkap</span>
          <div>
            <UserRound size={18} />
            <input value={name} autoComplete="name" placeholder="Nama pelanggan" onChange={(event) => setName(event.target.value)} />
          </div>
        </label>

        <label className="auth-field">
          <span>Nomor HP</span>
          <div>
            <Phone size={18} />
            <input value={phone} autoComplete="tel" placeholder="08xxxxxxxxxx" onChange={(event) => setPhone(event.target.value)} />
          </div>
        </label>

        <label className="auth-field">
          <span>Email</span>
          <div>
            <Mail size={18} />
            <input type="email" value={email} autoComplete="email" placeholder="nama@email.com" onChange={(event) => setEmail(event.target.value)} />
          </div>
        </label>

        <label className="auth-field">
          <span>Password</span>
          <div>
            <LockKeyhole size={18} />
            <input
              type="password"
              value={password}
              autoComplete="new-password"
              placeholder="Minimal 6 karakter"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </label>

        {error ? <p className="auth-error">{error}</p> : null}

        <button className="primary-button full-width" type="submit">
          DAFTAR
        </button>

        <p className="auth-switch">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>
      </form>
    </section>
  )
}
