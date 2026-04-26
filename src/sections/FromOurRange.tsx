import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const IMAGES = [
  '/images/product-damiana-tonic.jpg',
  '/images/product-fermentina.jpg',
  '/images/product-molundo.jpg',
  '/images/product-africana.jpg',
  '/images/product-seamoss-gel.jpg',
  '/images/product-ringblomssalva.jpg',
]

const CATEGORIES_SV = ['Tonic', 'Tonic', 'Kosttillskott', 'Kosttillskott', 'Havsprodukt', 'Hudvård']
const CATEGORIES_EN = ['Tonic', 'Tonic', 'Supplement', 'Supplement', 'Sea Product', 'Skincare']

export default function FromOurRange() {
  const { t, lang } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const categories = lang === 'sv' ? CATEGORIES_SV : CATEGORIES_EN

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
      style={{ background: '#F0E8D8' }}
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(20px, 3vw, 40px)',
          }}
        >
          {t.range.products.map((product, i) => (
            <div
              key={i}
              className="product-card group"
              style={{
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
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(92, 58, 30, 0.15)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                  const img = e.currentTarget.querySelector('img') as HTMLElement
                  if (img) img.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                  e.currentTarget.style.transform = 'scale(1)'
                  const img = e.currentTarget.querySelector('img') as HTMLElement
                  if (img) img.style.transform = 'scale(1)'
                }}
              >
                <img
                  src={IMAGES[i]}
                  alt={product.name}
                  style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.6s ease',
                  }}
                />
                {/* Gold border on hover */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    border: '2px solid transparent',
                    borderRadius: 8,
                    transition: 'border-color 0.4s ease',
                    pointerEvents: 'none',
                  }}
                  className="hover-border"
                />
              </div>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#C9A227',
                  display: 'block',
                  marginBottom: 6,
                }}
              >
                {categories[i]}
              </span>
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
        .product-card:hover .hover-border {
          border-color: #C9A227 !important;
        }
      `}</style>
    </section>
  )
}
