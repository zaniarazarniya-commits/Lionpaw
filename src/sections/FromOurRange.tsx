import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  '/images/range-damiana.jpg',
  '/images/range-femina.jpg',
  '/images/range-seamoss.jpg',
]

export default function FromOurRange() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll('.product-card')
    if (!cards) return

    gsap.fromTo(cards,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      }
    )
  }, [])

  return (
    <section
      id="range"
      ref={sectionRef}
      className="section-padding"
      style={{ background: '#F5F1E6' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <span className="text-label" style={{ color: '#C9A227', display: 'block', textAlign: 'center', marginBottom: 12 }}>
          {t.range.label}
        </span>
        <h2
          className="text-section-heading"
          style={{ color: '#6B4423', textAlign: 'center', marginBottom: 60 }}
        >
          {t.range.heading}
        </h2>

        <div
          ref={cardsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(20px, 3vw, 40px)',
          }}
        >
          {t.range.products.map((product, i) => (
            <div
              key={i}
              className="product-card group"
              style={{
                opacity: 0,
                cursor: 'pointer',
              }}
            >
              <div
                className="shimmer-hover"
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 20,
                  transition: 'box-shadow 0.4s ease, transform 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <img
                  src={IMAGES[i]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                />
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: '#6B4423',
                  marginBottom: 8,
                }}
              >
                {product.name}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  color: 'rgba(107, 68, 35, 0.7)',
                  lineHeight: 1.6,
                }}
              >
                {product.desc}
              </p>
              {/* Rasta stripe on hover */}
              <div
                className="rasta-stripe"
                style={{
                  marginTop: 12,
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <span />
                <span />
                <span />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .product-card:hover .rasta-stripe {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  )
}
