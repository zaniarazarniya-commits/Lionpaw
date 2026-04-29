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
        style={{
          position: 'absolute',
          inset: '-5%',
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          animation: 'heroKenBurns 60s ease-in-out infinite alternate',
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
      <style>{`
        @keyframes heroKenBurns {
          0% {
            transform: scale(1.04) translate(0%, 0%);
          }
          25% {
            transform: scale(1.06) translate(-0.5%, -0.3%);
          }
          50% {
            transform: scale(1.08) translate(-1%, -0.5%);
          }
          75% {
            transform: scale(1.10) translate(-1.5%, -0.3%);
          }
          100% {
            transform: scale(1.12) translate(-2%, 0%);
          }
        }
      `}</style>
    </div>
  )
}
