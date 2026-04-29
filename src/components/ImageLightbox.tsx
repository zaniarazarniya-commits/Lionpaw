import { useEffect, useState } from 'react'

interface ImageLightboxProps {
  src: string
  alt: string
  open: boolean
  onClose: () => void
}

export default function ImageLightbox({ src, alt, open, onClose }: ImageLightboxProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      // small delay to trigger CSS transition
      requestAnimationFrame(() => setVisible(true))
      document.body.style.overflow = 'hidden'
    } else {
      setVisible(false)
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: visible ? 'rgba(20, 12, 5, 0.92)' : 'rgba(20, 12, 5, 0)',
        transition: 'background-color 0.35s ease',
        cursor: 'pointer',
        padding: 'clamp(16px, 4vw, 48px)',
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: 'absolute',
          top: 20,
          right: 24,
          background: 'none',
          border: 'none',
          color: '#F5F1E6',
          fontSize: 36,
          lineHeight: 1,
          cursor: 'pointer',
          opacity: visible ? 0.8 : 0,
          transition: 'opacity 0.35s ease 0.1s',
          fontFamily: 'DM Sans, sans-serif',
          fontWeight: 300,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.8')}
      >
        ×
      </button>

      {/* Image */}
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '100%',
          maxHeight: '85vh',
          objectFit: 'contain',
          borderRadius: 8,
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.92)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
          cursor: 'default',
        }}
      />
    </div>
  )
}
