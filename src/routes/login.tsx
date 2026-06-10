import { Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
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
  const [notice, setNotice] = useState('')

  usePageMeta('Masuk - FIXIN', 'Masuk ke akun FIXIN untuk memesan teknisi perbaikan rumah.')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setNotice('')

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

        <div className="demo-account-note">
          <strong>Akun demo</strong>
          <span>Email: raka.pratama@email.com</span>
          <span>Password: fixin123</span>
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
              onChange={(event) => {
                setEmail(event.target.value)
                setError('')
              }}
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
              onChange={(event) => {
                setPassword(event.target.value)
                setError('')
              }}
            />
            <button
              className="field-icon-button"
              type="button"
              aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              onClick={() => setShowPassword((show) => !show)}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </label>

        {error ? <p className="auth-error">{error}</p> : null}
        {notice ? <p className="auth-notice">{notice}</p> : null}

        <div className="auth-options">
          <label><input type="checkbox" defaultChecked /> Ingat saya</label>
          <button
            type="button"
            onClick={() => {
              setError('')
              setNotice('Tautan reset demo telah disiapkan. Pada aplikasi produksi, tautan akan dikirim ke emailmu.')
            }}
          >
            Lupa password?
          </button>
        </div>

        <button className="primary-button full-width" type="submit">
          Masuk ke akun
        </button>

        <p className="auth-switch">
          Belum punya akun? <Link to="/register">Daftar sekarang</Link>
        </p>
        <p className="auth-security"><ShieldCheck size={14} /> Data akun dan aktivitas layanan dilindungi FIXIN.</p>
      </form>
    </section>
  )
}
