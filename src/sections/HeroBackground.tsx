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
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {
        setVideoError(true)
      })
    }
  }, [videoSrc])

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
      <div
        className="hero-bg-animated"
        style={{
          position: 'absolute',
          inset: '-15%',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform',
        }}
      />
      {/* Warm sunset glow from bottom */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(200,100,30,0.35) 0%, rgba(180,80,20,0.15) 35%, transparent 65%)',
        mixBlendMode: 'overlay',
      }} />
      {/* Amber/orange tint across image */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(255,160,60,0.12) 0%, rgba(220,90,40,0.18) 50%, rgba(180,60,30,0.22) 100%)',
        mixBlendMode: 'soft-light',
      }} />
      {/* Darken slightly for text contrast */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(60,30,10,0.1), rgba(80,40,15,0.25))',
        mixBlendMode: 'multiply',
      }} />
    </div>
  )
}
