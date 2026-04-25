import { useState, useRef, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLang } from '../lib/i18n'

gsap.registerPlugin(ScrollTrigger)

const TONICS = [
  { name: 'Damiana Roots', image: '/images/tonic-damiana.jpg' },
  { name: 'Fermenta Femina', image: '/images/tonic-femina.jpg' },
  { name: 'Burdock Bitters', image: '/images/tonic-burdock.jpg' },
  { name: 'Ginger Fire', image: '/images/tonic-ginger.jpg' },
  { name: 'Soursop Leaf', image: '/images/tonic-soursop.jpg' },
]

export default function TonicsCarousel() {
  const { t } = useLang()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set())
  const manualAngleRef = useRef(0)
  const isManualRef = useRef(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0)
    const onResize = () => setIsMobile(window.innerWidth < 768 || navigator.maxTouchPoints > 0)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const updateCarousel = useCallback((index: number) => {
    const section = sectionRef.current
    if (!section) return
    const cards = section.querySelectorAll('.tonic-card') as NodeListOf<HTMLElement>
    const carousel = section.querySelector('.carousel-ring') as HTMLElement

    const angle = index * (360 / TONICS.length)
    manualAngleRef.current = angle
    if (carousel) {
      carousel.style.transform = `translateZ(-400px) rotateY(${-angle}deg)`
    }

    cards.forEach((el, i) => {
      const distance = Math.abs(i - index)
      const wrappedDistance = Math.min(distance, TONICS.length - distance)
      const scale = wrappedDistance === 0 ? 1.15 : Math.max(0.7, 1 - wrappedDistance * 0.15)
      const opacity = wrappedDistance === 0 ? 1 : Math.max(0.3, 1 - wrappedDistance * 0.25)
      el.style.transform = `rotateY(${i * (360 / TONICS.length)}deg) translateZ(400px) scale(${scale})`
      el.style.opacity = String(opacity)
      el.style.zIndex = wrappedDistance === 0 ? '10' : String(5 - wrappedDistance)
    })
  }, [])

  const goNext = useCallback(() => {
    isManualRef.current = true
    const next = (activeIndex + 1) % TONICS.length
    setActiveIndex(next)
    updateCarousel(next)
  }, [activeIndex, updateCarousel])

  const goPrev = useCallback(() => {
    isManualRef.current = true
    const prev = (activeIndex - 1 + TONICS.length) % TONICS.length
    setActiveIndex(prev)
    updateCarousel(prev)
  }, [activeIndex, updateCarousel])

  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    if (!section) return

    // Initialize positions
    updateCarousel(0)

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        if (isManualRef.current) return // skip scroll updates if user clicked arrows
        const progress = self.progress
        const newIndex = Math.round(progress * (TONICS.length - 1))
        setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev))
        updateCarousel(newIndex)
      },
    })

    return () => { st.kill() }
  }, [isMobile, updateCarousel])

  const handleImageLoad = (i: number) => {
    setLoadedImages((prev) => new Set(prev).add(i))
  }

  // Mobile: horizontal scroll
  if (isMobile) {
    return (
      <section
        id="tonics"
        style={{
          position: 'relative',
          padding: '80px 0',
          overflow: 'hidden',
        }}
      >
        {/* Jungle background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}
        >
          <img
            src="/images/hero-bg.jpg"
            alt=""
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'blur(2px) brightness(0.6)',
              transform: 'scale(1.05)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(21, 27, 14, 0.55)',
            }}
          />
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2
            className="text-section-heading"
            style={{ color: '#F5F1E6', textAlign: 'center', marginBottom: 40 }}
          >
            {t.tonics.label}
          </h2>
          <div
            style={{
              display: 'flex',
              gap: 16,
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              padding: '0 24px',
              scrollbarWidth: 'none',
            }}
          >
            {TONICS.map((tonic, i) => (
              <div
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  scrollSnapAlign: 'center',
                  flex: '0 0 70vw',
                  textAlign: 'center',
                }}
              >
                <img
                  src={tonic.image}
                  alt={tonic.name}
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    objectFit: 'cover',
                    borderRadius: 8,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                  }}
                />
                <p className="text-sub-heading" style={{ color: '#F5F1E6', marginTop: 12, fontSize: '1.2rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  {tonic.name}
                </p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 24 }}>
            <button
              onClick={() => setActiveIndex((prev) => (prev - 1 + TONICS.length) % TONICS.length)}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(245,241,230,0.3)',
                background: 'rgba(245,241,230,0.1)', color: '#F5F1E6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backdropFilter: 'blur(4px)',
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-label" style={{ color: '#A3B899' }}>
              {t.tonics.count(activeIndex + 1, TONICS.length)}
            </span>
            <button
              onClick={() => setActiveIndex((prev) => (prev + 1) % TONICS.length)}
              style={{
                width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(245,241,230,0.3)',
                background: 'rgba(245,241,230,0.1)', color: '#F5F1E6', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', backdropFilter: 'blur(4px)',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="tonics"
      ref={sectionRef}
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1000px',
      }}
    >
      {/* Jungle background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/images/hero-bg.jpg"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'blur(2px) brightness(0.55)',
            transform: 'scale(1.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(21,27,14,0.5), rgba(21,27,14,0.65))',
          }}
        />
      </div>

      <h2
        className="text-section-heading"
        style={{
          color: '#F5F1E6',
          position: 'absolute',
          top: 48,
          left: 'clamp(24px, 5vw, 80px)',
          zIndex: 10,
          textShadow: '0 2px 20px rgba(0,0,0,0.5)',
        }}
      >
        {t.tonics.label}
      </h2>

      {/* Left arrow */}
      <button
        onClick={goPrev}
        style={{
          position: 'absolute',
          left: 'clamp(16px, 3vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: '1px solid rgba(245,241,230,0.25)',
          background: 'rgba(245,241,230,0.08)',
          color: '#F5F1E6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(245,241,230,0.2)'
          e.currentTarget.style.borderColor = 'rgba(245,241,230,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(245,241,230,0.08)'
          e.currentTarget.style.borderColor = 'rgba(245,241,230,0.25)'
        }}
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right arrow */}
      <button
        onClick={goNext}
        style={{
          position: 'absolute',
          right: 'clamp(16px, 3vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: 52,
          height: 52,
          borderRadius: '50%',
          border: '1px solid rgba(245,241,230,0.25)',
          background: 'rgba(245,241,230,0.08)',
          color: '#F5F1E6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(245,241,230,0.2)'
          e.currentTarget.style.borderColor = 'rgba(245,241,230,0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(245,241,230,0.08)'
          e.currentTarget.style.borderColor = 'rgba(245,241,230,0.25)'
        }}
      >
        <ChevronRight size={24} />
      </button>

      {/* 3D CSS Carousel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transformStyle: 'preserve-3d',
          zIndex: 5,
        }}
      >
        <div
          className="carousel-ring"
          style={{
            position: 'relative',
            width: 280,
            height: 380,
            transformStyle: 'preserve-3d',
            transform: 'translateZ(-400px) rotateY(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {TONICS.map((tonic, i) => {
            const angle = i * (360 / TONICS.length)
            return (
              <div
                key={i}
                className="tonic-card"
                style={{
                  position: 'absolute',
                  width: 280,
                  height: 380,
                  transform: `rotateY(${angle}deg) translateZ(400px) scale(${i === 0 ? 1.15 : 0.85})`,
                  transformStyle: 'preserve-3d',
                  opacity: i === 0 ? 1 : 0.7,
                  transition: 'opacity 0.3s ease',
                  zIndex: i === 0 ? 10 : 5,
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 25px 70px rgba(0,0,0,0.6)',
                  background: '#1a1a1a',
                }}
              >
                <img
                  src={tonic.image}
                  alt={tonic.name}
                  loading="eager"
                  onLoad={() => handleImageLoad(i)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    opacity: loadedImages.has(i) ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />
                {/* Card label */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '20px 16px',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: '#F5F1E6',
                      textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                    }}
                  >
                    {tonic.name}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Index indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <span className="text-label" style={{ color: '#A3B899' }}>
          {t.tonics.count(activeIndex + 1, TONICS.length)}
        </span>
      </div>
    </section>
  )
}
