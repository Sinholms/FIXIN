import { Link, useNavigate } from '@tanstack/react-router'
import { Eye, EyeOff, LockKeyhole, Mail, Phone, ShieldCheck, UserRound } from 'lucide-react'
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
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  usePageMeta('Daftar - FIXIN', 'Daftar akun FIXIN untuk mulai memesan teknisi perbaikan rumah.')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (name.trim().length < 3 || phone.replace(/\D/g, '').length < 10 || !email.includes('@') || password.trim().length < 6) {
      setError('Lengkapi nama, nomor HP aktif, email valid, dan password minimal 6 karakter.')
      return
    }

    if (!agreed) {
      setError('Setujui syarat layanan dan kebijakan privasi untuk melanjutkan.')
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
        <div className="auth-panel-head">
          <ShieldCheck size={24} />
          <div>
            <strong>Daftar dalam satu menit</strong>
            <span>Data ini dipakai untuk konfirmasi pesanan dan garansi layanan.</span>
          </div>
        </div>
        <label className="auth-field">
          <span>Nama lengkap</span>
          <div>
            <UserRound size={18} />
            <input value={name} autoComplete="name" placeholder="Nama sesuai identitas" onChange={(event) => { setName(event.target.value); setError('') }} />
          </div>
        </label>

        <label className="auth-field">
          <span>Nomor HP</span>
          <div>
            <Phone size={18} />
            <input value={phone} inputMode="tel" autoComplete="tel" placeholder="08xxxxxxxxxx" onChange={(event) => { setPhone(event.target.value); setError('') }} />
          </div>
        </label>

        <label className="auth-field">
          <span>Email</span>
          <div>
            <Mail size={18} />
            <input type="email" value={email} autoComplete="email" placeholder="nama@email.com" onChange={(event) => { setEmail(event.target.value); setError('') }} />
          </div>
        </label>

        <label className="auth-field">
          <span>Password</span>
          <div>
            <LockKeyhole size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              autoComplete="new-password"
              placeholder="Minimal 6 karakter"
              onChange={(event) => { setPassword(event.target.value); setError('') }}
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
          <small className="field-hint">Gunakan minimal 6 karakter.</small>
        </label>

        <label className="terms-check">
          <input type="checkbox" checked={agreed} onChange={(event) => { setAgreed(event.target.checked); setError('') }} />
          <span>Saya menyetujui syarat layanan dan kebijakan privasi FIXIN.</span>
        </label>

        {error ? <p className="auth-error">{error}</p> : null}

        <button className="primary-button full-width" type="submit">
          Buat akun
        </button>

        <p className="auth-switch">
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>
      </form>
    </section>
  )
}
