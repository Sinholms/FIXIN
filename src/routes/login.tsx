import { Link, useNavigate } from '@tanstack/react-router'
import { Eye, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Logo } from '../components/Logo'
import { saveDemoUser } from './authStorage'
import { usePageMeta } from './meta'

export function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('raka.pratama@email.com')
  const [password, setPassword] = useState('fixin123')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  usePageMeta('Masuk - FIXIN', 'Masuk ke akun FIXIN untuk memesan teknisi perbaikan rumah.')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.includes('@') || password.trim().length < 6) {
      setError('Masukkan email valid dan password minimal 6 karakter.')
      return
    }

    saveDemoUser({
      name: 'Raka Pratama',
      email,
    })
    navigate({ to: '/' })
  }

  return (
    <section className="auth-page">
      <div className="auth-hero">
        <Logo variant="light" />
        <div>
          <h1>Masuk ke FIXIN</h1>
          <p>Pesan teknisi terverifikasi, pantau pesanan, dan lanjutkan chat dari satu aplikasi.</p>
        </div>
      </div>

      <form className="auth-panel" onSubmit={handleSubmit}>
        <div className="auth-panel-head">
          <ShieldCheck size={24} />
          <div>
            <strong>Selamat datang kembali</strong>
            <span>Gunakan akun demo atau email lain untuk masuk.</span>
          </div>
        </div>

        <label className="auth-field">
          <span>Email</span>
          <div>
            <Mail size={18} />
            <input
              type="email"
              value={email}
              autoComplete="email"
              placeholder="nama@email.com"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </label>

        <label className="auth-field">
          <span>Password</span>
          <div>
            <LockKeyhole size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              autoComplete="current-password"
              placeholder="Minimal 6 karakter"
              onChange={(event) => setPassword(event.target.value)}
            />
            <button className="field-icon-button" type="button" onClick={() => setShowPassword((show) => !show)}>
              <Eye size={17} />
            </button>
          </div>
        </label>

        {error ? <p className="auth-error">{error}</p> : null}

        <button className="primary-button full-width" type="submit">
          MASUK
        </button>

        <p className="auth-switch">
          Belum punya akun? <Link to="/register">Daftar sekarang</Link>
        </p>
      </form>
    </section>
  )
}
