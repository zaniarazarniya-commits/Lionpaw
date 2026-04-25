import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function TheCraft() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
          }
        )
      }

      if (imageRef.current) {
        gsap.fromTo(imageRef.current,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.out',
            scrollTrigger: { trigger: imageRef.current, start: 'top 75%' },
          }
        )
      }

      const steps = stepsRef.current?.querySelectorAll('.process-step')
      if (steps) {
        gsap.fromTo(steps,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
            scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const steps = t.craft.steps

  return (
    <section
      id="craft"
      ref={sectionRef}
      className="section-padding"
      style={{ background: '#F5F1E6' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: 56, opacity: 0 }}>
          <span
            className="text-label"
            style={{
              color: '#4A5D23',
              display: 'block',
              marginBottom: 20,
              letterSpacing: '0.2em',
            }}
          >
            {t.craft.label}
          </span>
          <h2 className="font-display" style={{ lineHeight: 1, marginBottom: 16 }}>
            <span style={{
              display: 'block',
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: 700,
              color: '#6B4423',
              letterSpacing: '-0.02em',
            }}>
              {t.craft.heading}
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
            {t.craft.subheading}
          </p>
        </div>

        {/* Feature image */}
        <div
          ref={imageRef}
          style={{
            maxWidth: 1000,
            margin: '0 auto 72px',
            borderRadius: 8,
            overflow: 'hidden',
            clipPath: 'inset(0 100% 0 0)',
          }}
        >
          <img
            src="/images/craft-herbs.jpg"
            alt=""
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '50vh',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Process steps */}
        <div
          ref={stepsRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(32px, 4vw, 48px)',
            position: 'relative',
          }}
        >
          {/* Vertical dividers on desktop */}
          <style>{`
            @media (min-width: 769px) {
              #craft .process-step:not(:last-child)::after {
                content: '';
                position: absolute;
                right: 0;
                top: 10%;
                height: 80%;
                width: 1px;
                background: rgba(107, 68, 35, 0.12);
              }
            }
          `}</style>

          {steps.map((step, i) => (
            <div
              key={i}
              className="process-step"
              style={{
                position: 'relative',
                padding: '0 16px',
                opacity: 0,
              }}
            >
              {/* Large background number */}
              <span
                style={{
                  position: 'absolute',
                  top: -20,
                  left: 8,
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(4rem, 8vw, 6rem)',
                  fontWeight: 700,
                  color: 'rgba(74, 93, 35, 0.08)',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {step.num}
              </span>

              {/* Green dot marker */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#4A5D23',
                    marginTop: 8,
                    flexShrink: 0,
                  }}
                />
                <h3
                  className="font-display"
                  style={{
                    fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                    fontWeight: 700,
                    color: '#6B4423',
                    letterSpacing: '0.01em',
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>
              </div>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.9rem',
                  lineHeight: 1.7,
                  color: 'rgba(107, 68, 35, 0.7)',
                  paddingLeft: 20,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
