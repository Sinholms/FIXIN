import fixinLogo from '../assets/fixin-logo.png'
import fixinLogoLight from '../assets/fixin-logo-light.png'

type LogoProps = {
  variant?: 'dark' | 'light'
}

export function Logo({ variant = 'dark' }: LogoProps) {
  return (
    <div className={`brand-logo ${variant === 'light' ? 'light' : 'dark'}`} aria-label="FIXIN">
      <img src={variant === 'light' ? fixinLogoLight : fixinLogo} alt="FIXIN" />
    </div>
  )
}
