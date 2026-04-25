import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

export default function Welcome() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const stripeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
          }
        )
      }

      if (headingRef.current) {
        gsap.fromTo(headingRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
          }
        )
      }

      if (bodyRef.current) {
        const lines = bodyRef.current.querySelectorAll('p')
        gsap.fromTo(lines,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: bodyRef.current, start: 'top 80%' },
          }
        )
      }

      if (stripeRef.current) {
        gsap.fromTo(stripeRef.current,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: stripeRef.current, start: 'top 90%' },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="welcome"
      ref={sectionRef}
      className="section-padding"
      style={{
        background: '#F5F1E6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parchment texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/parchment-texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.06,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center', padding: '0 24px' }}>
        <span
          ref={labelRef}
          className="text-label"
          style={{ color: '#C9A227', display: 'block', marginBottom: 24, opacity: 0, willChange: 'transform, opacity' }}
        >
          {t.welcome.label}
        </span>

        <h2
          ref={headingRef}
          className="text-section-heading"
          style={{ color: '#6B4423', marginBottom: 32, opacity: 0, willChange: 'transform, opacity' }}
        >
          {t.welcome.heading}
        </h2>

        <div ref={bodyRef} style={{ opacity: 0 }}>
          <p className="text-body" style={{ color: 'rgba(107, 68, 35, 0.8)', maxWidth: 640, margin: '0 auto 24px', willChange: 'transform, opacity' }}>
            {t.welcome.body}
          </p>
        </div>

        {/* Rasta stripe */}
        <div
          ref={stripeRef}
          className="rasta-stripe"
          style={{ margin: '24px auto 0', alignItems: 'center', opacity: 0, transformOrigin: 'center', willChange: 'transform, opacity' }}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  )
}
