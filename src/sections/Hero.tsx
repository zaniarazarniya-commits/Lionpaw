import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import GoldenCanopy from './GoldenCanopy'
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
      {/* WebGL Shader Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <GoldenCanopy />
      </div>

      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(26,60,52,0.5) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25%',
          background: 'linear-gradient(to bottom, transparent, #4A5D23)',
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
        <div style={{ textAlign: 'center', maxWidth: 800, padding: '0 24px' }}>
          <h1
            ref={titleRef}
            className="text-display"
            style={{
              color: '#F5F1E6',
              textShadow: '0 4px 30px rgba(0,0,0,0.7), 0 0 80px rgba(74,93,35,0.4)',
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
              color: '#C9A227',
              marginTop: 16,
              maxWidth: 600,
              margin: '16px auto 0',
              opacity: 0,
              willChange: 'transform, opacity',
              textShadow: '0 3px 20px rgba(0,0,0,0.6)',
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
          <ChevronDown size={32} color="#C9A227" />
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
