import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Newsletter() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    gsap.fromTo(el.querySelectorAll('.animate-in'),
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      }
    )
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <section
      ref={sectionRef}
      style={{ background: '#C9A227', padding: '60px 24px' }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <h2
          className="animate-in text-section-heading"
          style={{ color: '#4A5D23', fontSize: '2.5rem', marginBottom: 16 }}
        >
          {t.newsletter.heading}
        </h2>
        <p
          className="animate-in text-body"
          style={{ color: 'rgba(74, 93, 35, 0.8)', marginBottom: 32 }}
        >
          {t.newsletter.body}
        </p>

        {!submitted ? (
          <form
            onSubmit={handleSubmit}
            className="animate-in"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.newsletter.placeholder}
              required
              style={{
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid #4A5D23',
                padding: '12px 0',
                width: 260,
                color: '#4A5D23',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '1rem',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="transition-all duration-300"
              style={{
                background: '#4A5D23',
                color: '#C9A227',
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '0.08em',
                height: 44,
                padding: '0 24px',
                borderRadius: 22,
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#1A3C34' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#4A5D23' }}
            >
              {t.newsletter.button}
            </button>
          </form>
        ) : (
          <p className="animate-in" style={{ color: '#4A5D23', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
            {t.newsletter.thanks}
          </p>
        )}
      </div>
    </section>
  )
}
