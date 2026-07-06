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
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    if (!videoSrc) return
    // A rejected play() (autoplay policy, background tab) is not fatal —
    // the image fallback stays visible and we retry when the tab is shown.
    const tryPlay = () => videoRef.current?.play().catch(() => {})
    tryPlay()
    const onVisible = () => {
      if (!document.hidden) tryPlay()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [videoSrc])

  const showVideo = videoSrc && !videoError

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* Image shown immediately; stays as fallback until the video can play */}
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

      {showVideo && (
        <>
          <video
            ref={videoRef}
            autoPlay muted loop playsInline
            preload="auto"
            poster={imageSrc}
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoError(true)}
            style={{
              position: 'absolute', top: '50%', left: '50%',
              minWidth: '100%', minHeight: '100%',
              width: 'auto', height: 'auto',
              transform: 'translate(-50%, -50%)', objectFit: 'cover',
              opacity: videoReady ? 1 : 0,
              transition: 'opacity 0.8s ease',
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(60,40,15,0.15), rgba(92,58,30,0.25))',
            mixBlendMode: 'multiply',
            opacity: videoReady ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }} />
        </>
      )}

      {/* Darken slightly for text contrast */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(60,30,10,0.1), rgba(80,40,15,0.25))',
        mixBlendMode: 'multiply',
      }} />
    </div>
  )
}
