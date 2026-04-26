import { useEffect, useRef, useState, useCallback } from 'react'
import { Menu, X, Instagram, Phone } from 'lucide-react'
import { useLang } from '../lib/i18n'

export default function Navigation() {
  const { t, lang, setLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const rafRef = useRef<number>(0)
  const lastScrollY = useRef(0)

  const NAV_LINKS = [
    { label: t.nav.story, href: '#welcome' },
    { label: t.nav.tonics, href: '#tonics' },
    { label: t.nav.ingredients, href: '#ingredients' },
    { label: t.nav.contact, href: '#footer' },
  ]

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY === lastScrollY.current) return
      lastScrollY.current = currentY
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(currentY > 100)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const handleNav = useCallback((href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(74, 93, 35, 0.95)' : 'rgba(74, 93, 35, 0.7)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        height: 64,
      }}
    >
      {/* Rasta stripe */}
      <div
        className="absolute bottom-0 left-0 right-0 flex transition-all duration-500"
        style={{
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? 'translateY(0)' : 'translateY(-4px)',
        }}
      >
        <div style={{ height: 2, flex: 1, background: '#4A5D23' }} />
        <div style={{ height: 2, flex: 1, background: '#C9A227' }} />
        <div style={{ height: 2, flex: 1, background: '#9B2335' }} />
      </div>

      <div
        className="flex items-center justify-between h-full"
        style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2"
        >
          <img
            src="/images/logo.png"
            alt="Lion Paw"
            style={{ height: 36 }}
          />
          <span
            className="font-display font-bold hidden sm:block"
            style={{ color: '#F5F1E6', fontSize: '1.1rem', letterSpacing: '-0.01em' }}
          >
            Lion Paw
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
              className="transition-colors duration-300 hover:text-lion-gold"
              style={{
                color: '#F5F1E6',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA + Language + Social */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.instagram.com/lion_paw.se/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-300 hover:text-lion-gold"
            style={{ color: '#A3B899' }}
          >
            <Instagram size={18} />
          </a>
          <a
            href="tel:+467351498244"
            className="transition-colors duration-300 hover:text-lion-gold"
            style={{ color: '#A3B899' }}
          >
            <Phone size={18} />
          </a>

          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === 'sv' ? 'en' : 'sv')}
            style={{
              color: '#A3B899',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.75rem',
              letterSpacing: '0.08em',
              background: 'none',
              border: '1px solid rgba(163, 184, 153, 0.3)',
              borderRadius: 12,
              padding: '4px 10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(163, 184, 153, 0.7)'
              e.currentTarget.style.color = '#F5F1E6'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(163, 184, 153, 0.3)'
              e.currentTarget.style.color = '#A3B899'
            }}
          >
            {lang === 'sv' ? 'SV' : 'EN'}
          </button>

          <button
            onClick={() => handleNav('#range')}
            className="transition-all duration-300 hover:scale-105"
            style={{
              background: '#C9A227',
              color: '#4A5D23',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              height: 40,
              padding: '0 20px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
            }}
          >
            {t.nav.shop}
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ color: '#F5F1E6', background: 'none', border: 'none' }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden absolute top-16 left-0 right-0 p-6 flex flex-col gap-4"
          style={{ background: 'rgba(60, 45, 20, 0.98)', backdropFilter: 'blur(12px)' }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
              style={{ color: '#F5F1E6', fontFamily: "'DM Sans', sans-serif", fontSize: '1rem' }}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-2">
            <a href="https://www.instagram.com/lion_paw.se/" target="_blank" rel="noopener noreferrer" style={{ color: '#A3B899' }}>
              <Instagram size={20} />
            </a>
            <a href="tel:+467351498244" style={{ color: '#A3B899' }}>
              <Phone size={20} />
            </a>
            <button
              onClick={() => setLang(lang === 'sv' ? 'en' : 'sv')}
              style={{
                color: '#A3B899',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.8rem',
                background: 'none',
                border: '1px solid rgba(163, 184, 153, 0.3)',
                borderRadius: 12,
                padding: '4px 12px',
              }}
            >
              {lang === 'sv' ? 'SV' : 'EN'}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
