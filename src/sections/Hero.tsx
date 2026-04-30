import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import HeroBackground from './HeroBackground'
import { useLang } from '../lib/i18n'

export default function Hero() {
  const { t } = useLang()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const chevronRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })
    if (titleRef.current) {
      tl.fromTo(titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' },
        0
      )
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0.6
      )
    }
    if (chevronRef.current) {
      tl.fromTo(chevronRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        1.2
      )
    }
    return () => { tl.kill() }
  }, [])

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background: drone video */}
      <HeroBackground videoSrc="/videos/hero-drone.mp4" />

      {/* Vignette overlay — warm, not cold green */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(60, 45, 20, 0.35) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Mobile text readability overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse at 50% 45%, rgba(40, 30, 15, 0.25) 0%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom gradient — warm sand instead of jungle green */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25%',
          background: 'linear-gradient(to bottom, transparent, rgba(92, 58, 30, 0.3))',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          paddingTop: '0',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: 900, padding: '0 24px' }}>
          <h1
            ref={titleRef}
            className="text-display"
            style={{
              color: '#F5F1E6',
              textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(0,0,0,0.3), 0 0 80px rgba(92,58,30,0.4)',
              opacity: 0,
              willChange: 'transform, opacity',
            }}
          >
            {t.hero.title}
          </h1>
          <p
            ref={subtitleRef}
            className="text-sub-heading"
            style={{
              color: '#E8D4A0',
              marginTop: 20,
              maxWidth: 700,
              margin: '20px auto 0',
              opacity: 0,
              willChange: 'transform, opacity',
              textShadow: '0 2px 10px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)',
              fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
              lineHeight: 1.5,
              fontWeight: 400,
            }}
          >
            {t.hero.subtitle}
          </p>
        </div>

        {/* Chevron */}
        <div
          ref={chevronRef}
          style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: 0,
            animation: 'float 1.5s ease-in-out infinite',
            willChange: 'opacity',
          }}
        >
          <ChevronDown size={32} color="#E8D4A0" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(10px); }
        }
      `}</style>
    </section>
  )
}
