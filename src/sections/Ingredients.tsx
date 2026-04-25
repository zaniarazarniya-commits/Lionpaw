import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Ingredients() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Heading fade in
      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        )
      }

      // Cards stagger reveal
      const cards = gridRef.current?.querySelectorAll('.root-card')
      if (cards) {
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
          }
        )
      }

      // Feature image reveal
      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { y: 40, opacity: 0, scale: 0.98 },
          {
            y: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: imageRef.current, start: 'top 85%' },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const roots = t.ingredients.roots

  return (
    <section
      id="ingredients"
      ref={sectionRef}
      className="section-padding"
      style={{
        background: '#F5F1E6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 64, opacity: 0 }}>
          <span
            className="text-label"
            style={{
              color: '#4A5D23',
              display: 'block',
              marginBottom: 20,
              letterSpacing: '0.2em',
            }}
          >
            {t.ingredients.label}
          </span>
          <h2 className="font-display" style={{ lineHeight: 1, marginBottom: 16 }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 700,
              color: '#6B4423',
              letterSpacing: '-0.02em',
            }}>
              {t.ingredients.headingLine1}
            </span>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              fontWeight: 700,
              color: '#4A5D23',
              letterSpacing: '-0.02em',
            }}>
              {t.ingredients.headingLine2}
            </span>
          </h2>
          <p
            className="text-body"
            style={{
              color: 'rgba(107, 68, 35, 0.7)',
              maxWidth: 520,
              margin: '0 auto',
              fontSize: '1rem',
            }}
          >
            {t.ingredients.subheading}
          </p>
        </div>

        {/* Roots grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 0,
            marginBottom: 64,
          }}
        >
          {roots.map((root, i) => (
            <div
              key={i}
              className="root-card"
              style={{
                padding: '32px 24px',
                borderTop: '1px solid rgba(107, 68, 35, 0.15)',
                opacity: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  color: 'rgba(107, 68, 35, 0.4)',
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                {root.num}
              </span>
              <h3
                className="font-display"
                style={{
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
                  fontWeight: 700,
                  color: '#6B4423',
                  letterSpacing: '0.02em',
                  marginBottom: 6,
                }}
              >
                {root.name}
              </h3>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.15em',
                  color: 'rgba(107, 68, 35, 0.5)',
                  display: 'block',
                  marginBottom: 14,
                }}
              >
                {root.latin}
              </span>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: 'rgba(107, 68, 35, 0.7)',
                  maxWidth: 320,
                }}
              >
                {root.benefit}
              </p>
            </div>
          ))}
        </div>

        {/* Feature image */}
        <div
          ref={imageRef}
          style={{
            maxWidth: 900,
            margin: '0 auto',
            borderRadius: 8,
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          <img
            src="/images/process-roots.jpg"
            alt={t.ingredients.featureCaption}
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '55vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>
    </section>
  )
}
