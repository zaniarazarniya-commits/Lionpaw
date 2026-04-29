import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { MapPin } from 'lucide-react'
import { useLang } from '../lib/i18n'

export default function IngredientExplorer() {
  const { t } = useLang()
  const roots = t.ingredients.roots
  const [activeIndex, setActiveIndex] = useState(0)
  const detailRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<HTMLDivElement>(null)

  const active = roots[activeIndex]

  useEffect(() => {
    // Animate content change
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [activeIndex])

  useEffect(() => {
    // Entrance animation
    if (detailRef.current) {
      gsap.fromTo(
        detailRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: detailRef.current, start: 'top 80%' },
        }
      )
    }
    if (nodesRef.current) {
      const nodes = nodesRef.current.querySelectorAll('.ing-node')
      gsap.fromTo(
        nodes,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: nodesRef.current, start: 'top 85%' },
        }
      )
    }
  }, [])

  return (
    <section
      id="ingredients"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: '#1e1a14',
        overflow: 'hidden',
      }}
    >
      {/* Warm texture background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, #2a2218 0%, #1e1a14 40%, #2d1f14 70%, #1a1610 100%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 40%, rgba(201, 169, 110, 0.06) 0%, transparent 60%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 70% 60%, rgba(74, 93, 35, 0.05) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(60px, 10vh, 120px) clamp(24px, 5vw, 80px)',
          maxWidth: 1100,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Section label */}
        <span
          className="text-label"
          style={{
            color: 'rgba(201, 169, 110, 0.6)',
            letterSpacing: '0.2em',
            marginBottom: 32,
            textAlign: 'center',
          }}
        >
          {t.ingredients.label}
        </span>

        {/* Active ingredient detail */}
        <div ref={detailRef} style={{ textAlign: 'center', marginBottom: 64 }}>
          <div ref={contentRef} key={activeIndex}>
            {/* Number */}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: 'rgba(201, 169, 110, 0.5)',
                display: 'block',
                marginBottom: 16,
              }}
            >
              {active.num}
            </span>

            {/* Name */}
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 700,
                color: '#F5F1E6',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              {active.name}
            </h2>

            {/* Latin */}
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                color: 'rgba(201, 169, 110, 0.6)',
                display: 'block',
                marginBottom: 32,
              }}
            >
              {active.latin}
            </span>

            {/* Origin */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 20px',
                borderRadius: 100,
                background: 'rgba(201, 169, 110, 0.1)',
                border: '1px solid rgba(201, 169, 110, 0.2)',
                marginBottom: 32,
              }}
            >
              <MapPin size={14} color="#c9a96e" />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  color: '#c9a96e',
                }}
              >
                {active.origin}
              </span>
            </div>

            {/* Benefit */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                lineHeight: 1.7,
                color: 'rgba(245, 241, 230, 0.7)',
                maxWidth: 560,
                margin: '0 auto',
              }}
            >
              {active.benefit}
            </p>
          </div>
        </div>

        {/* Ingredient selector nodes */}
        <div
          ref={nodesRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
            padding: '0 16px',
          }}
        >
          {roots.map((root, i) => {
            const isActive = i === activeIndex
            return (
              <button
                key={i}
                className="ing-node"
                onClick={() => setActiveIndex(i)}
                style={{
                  position: 'relative',
                  padding: '14px 20px',
                  borderRadius: 100,
                  border: `1px solid ${isActive ? 'rgba(201, 169, 110, 0.5)' : 'rgba(245, 241, 230, 0.12)'}`,
                  background: isActive
                    ? 'rgba(201, 169, 110, 0.12)'
                    : 'rgba(245, 241, 230, 0.03)',
                  color: isActive ? '#F5F1E6' : 'rgba(245, 241, 230, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  backdropFilter: 'blur(8px)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(245, 241, 230, 0.07)'
                    e.currentTarget.style.borderColor = 'rgba(245, 241, 230, 0.2)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(245, 241, 230, 0.03)'
                    e.currentTarget.style.borderColor = 'rgba(245, 241, 230, 0.12)'
                  }
                }}
              >
                {root.name}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -6,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: '#c9a96e',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Scroll hint */}
        <p
          style={{
            textAlign: 'center',
            marginTop: 32,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.75rem',
            color: 'rgba(245, 241, 230, 0.25)',
            letterSpacing: '0.1em',
          }}
        >
          {t.ingredients.featureCaption}
        </p>
      </div>
    </section>
  )
}
