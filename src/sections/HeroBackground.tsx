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
  const imgRef = useRef<HTMLImageElement>(null)
  const rafRef = useRef<number>(0)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {
        setVideoError(true)
      })
    }
  }, [videoSrc])

  useEffect(() => {
    const img = imgRef.current
    if (!img) return

    const duration = 30000
    let start = performance.now()
    let forward = true

    const ease = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

    const loop = (now: number) => {
      const elapsed = now - start
      let t = (elapsed % duration) / duration
      if (!forward) t = 1 - t
      const e = ease(t)

      const s = 1 + e * 0.3
      const x = e * -6
      const y = e * -3
      img.style.transform = `scale(${s}) translate3d(${x}%, ${y}%, 0)`

      if (elapsed >= duration) {
        start = now
        forward = !forward
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(rafRef.current)
  }, [imageSrc])

  if (videoSrc && !videoError) {
    return (
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          onError={() => setVideoError(true)}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            minWidth: '100%', minHeight: '100%',
            width: 'auto', height: 'auto',
            transform: 'translate(-50%, -50%)', objectFit: 'cover',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(60,40,15,0.15), rgba(92,58,30,0.25))',
          mixBlendMode: 'multiply',
        }} />
      </div>
    )
  }

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt=""
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-15%',
          width: '130%',
          height: '130%',
          objectFit: 'cover',
          willChange: 'transform',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(60,40,15,0.15), rgba(92,58,30,0.25))',
        mixBlendMode: 'multiply',
      }} />
    </div>
  )
}
