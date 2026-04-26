import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Instagram, Facebook, Phone } from 'lucide-react'
import { useLang } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Footer() {
  const { t } = useLang()
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const cols = footerRef.current?.querySelectorAll('.footer-col')
    if (!cols) return

    gsap.fromTo(cols,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      }
    )
  }, [])

  const handleNav = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const FOOTER_NAV = [
    { label: t.nav.story, href: '#welcome' },
    { label: t.nav.tonics, href: '#tonics' },
    { label: t.nav.ingredients, href: '#ingredients' },
    { label: t.footer.wholesale, href: '#footer' },
    { label: t.nav.contact, href: '#footer' },
  ]

  return (
    <footer
      id="footer"
      ref={footerRef}
      style={{
        background: '#2A2010',
        padding: '80px 0 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/images/footer-bg.jpg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: 0.15,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(42, 32, 16, 0.6), rgba(42, 32, 16, 0.9))',
          }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
        }}
      >
        {/* Row 1 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 'clamp(32px, 5vw, 60px)',
            marginBottom: 48,
          }}
        >
          {/* Left - Brand */}
          <div className="footer-col">
            <h3
              className="font-display"
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: '#F5F1E6',
                lineHeight: 1,
                marginBottom: 8,
              }}
            >
              Lion Paw
            </h3>
            <p
              className="font-display"
              style={{
                fontSize: '1.2rem',
                fontWeight: 600,
                fontStyle: 'italic',
                color: '#C9B896',
                marginBottom: 12,
              }}
            >
              {t.footer.tagline}
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                color: 'rgba(201, 184, 150, 0.7)',
                maxWidth: 280,
                lineHeight: 1.6,
              }}
            >
              {t.footer.description}
            </p>
          </div>

          {/* Center - Nav */}
          <div className="footer-col">
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {FOOTER_NAV.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link.href) }}
                  className="transition-colors duration-300 hover:text-lion-ivory"
                  style={{
                    color: '#C9B896',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.85rem',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right - Social */}
          <div className="footer-col">
            <span
              className="text-label"
              style={{ color: '#C9A227', display: 'block', marginBottom: 16 }}
            >
              {t.footer.follow}
            </span>
            <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
              <a
                href="https://www.instagram.com/lion_paw.se/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-300 hover:text-lion-gold"
                style={{ color: '#A3B899' }}
              >
                <Instagram size={24} />
              </a>
              <a
                href="#"
                className="transition-colors duration-300 hover:text-lion-gold"
                style={{ color: '#A3B899' }}
              >
                <Facebook size={24} />
              </a>
            </div>
            <a
              href="tel:+467351498244"
              className="transition-colors duration-300 hover:text-lion-gold"
              style={{
                color: '#C9B896',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
              }}
            >
              <Phone size={14} />
              +46 735 1498 244
            </a>
          </div>
        </div>

        {/* Rasta stripe */}
        <div style={{ display: 'flex', marginBottom: 24 }}>
          <div style={{ height: 2, flex: 1, background: '#4A5D23' }} />
          <div style={{ height: 2, flex: 1, background: '#C9A227' }} />
          <div style={{ height: 2, flex: 1, background: '#9B2335' }} />
        </div>

        {/* Copyright */}
        <p
          className="text-label"
          style={{
            color: 'rgba(163, 184, 153, 0.5)',
            textAlign: 'center',
          }}
        >
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  )
}
