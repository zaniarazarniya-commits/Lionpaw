import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLang } from '../lib/i18n'

export default function MarqueeDivider() {
  const { t } = useLang()
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const items = track.querySelectorAll('.marquee-item')
    const totalWidth = Array.from(items).reduce((acc, item) => acc + (item as HTMLElement).offsetWidth, 0) / 2

    gsap.to(track, {
      x: -totalWidth,
      duration: 30,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    })
  }, [])

  const text = t.marquee
  const items = Array(6).fill(text)

  return (
    <section
      style={{
        position: 'relative',
        height: 280,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Roots background image — scrolls with section, no fixed leak */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/process-roots.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0,
        }}
      />

      {/* Strong dark overlay for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(21, 27, 14, 0.75), rgba(21, 27, 14, 0.6), rgba(21, 27, 14, 0.75))',
          zIndex: 1,
        }}
      />

      {/* Marquee text */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            whiteSpace: 'nowrap',
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {items.map((t, i) => (
            <span
              key={i}
              className="marquee-item"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 600,
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: '2px #F5F1E6',
                display: 'inline-block',
                paddingRight: '0.5em',
                flexShrink: 0,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
