import { useEffect, useRef, useState } from 'react'

interface HeroBackgroundProps {
  imageSrc?: string
  videoSrc?: string
}

export default function HeroBackground({
  imageSrc = '/images/aerial-coast-1.jpg',
  videoSrc,
}: HeroBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {
        setVideoError(true)
      })
    }
  }, [videoSrc])

  // JS-driven Ken Burns animation — 100% reliable
  useEffect(() => {
    if (videoSrc && !videoError) return
    const el = bgRef.current
    if (!el) return

    const duration = 25000 // 25s per direction
    let startTime = Date.now()
    let direction = 1 // 1 = forward, -1 = backward

    const easeInOut = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    }

    const animate = () => {
      const now = Date.now()
      let progress = ((now - startTime) % duration) / duration

      if (direction === -1) {
        progress = 1 - progress
      }

      const eased = easeInOut(progress)
      const scale = 1 + eased * 0.25 // 1.0 → 1.25
      const tx = eased * -4 // 0% → -4%
      const ty = eased * -2 // 0% → -2%

      el.style.transform = `scale(${scale}) translate(${tx}%, ${ty}%)`

      // Check if we need to reverse direction
      if ((now - startTime) >= duration) {
        startTime = now
        direction *= -1
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [videoSrc, videoError])

  if (videoSrc && !videoError) {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setVideoError(true)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            transform: 'translate(-50%, -50%)',
            objectFit: 'cover',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(60,40,15,0.15) 0%, rgba(92,58,30,0.25) 100%)',
            mixBlendMode: 'multiply',
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(60,40,15,0.15) 0%, rgba(92,58,30,0.25) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
    </div>
  )
}
