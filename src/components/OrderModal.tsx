import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { useLang } from '../lib/i18n'

interface OrderModalProps {
  open: boolean
  onClose: () => void
}

const PHONE_TEL = '+46735149824'
const PHONE_DISPLAY = '+46 73 514 98 24'

export default function OrderModal({ open, onClose }: OrderModalProps) {
  const { t } = useLang()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(open))
    if (open) document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(raf)
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.order.heading}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: visible ? 'rgba(20, 12, 5, 0.85)' : 'rgba(20, 12, 5, 0)',
        transition: 'background-color 0.35s ease',
        padding: 'clamp(16px, 4vw, 48px)',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#F5F1E6',
          borderRadius: 16,
          padding: 'clamp(32px, 6vw, 48px)',
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.92)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 12,
            right: 16,
            background: 'none',
            border: 'none',
            color: '#4A5D23',
            fontSize: 28,
            lineHeight: 1,
            cursor: 'pointer',
            opacity: 0.6,
            fontFamily: 'DM Sans, sans-serif',
            fontWeight: 300,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.6')}
        >
          ×
        </button>

        {/* Rasta stripe */}
        <div style={{ display: 'flex', width: 64, margin: '0 auto 20px', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: 3, flex: 1, background: '#4A5D23' }} />
          <div style={{ height: 3, flex: 1, background: '#C9A227' }} />
          <div style={{ height: 3, flex: 1, background: '#9B2335' }} />
        </div>

        <h3
          className="font-display"
          style={{
            color: '#4A5D23',
            fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          {t.order.heading}
        </h3>

        <p
          style={{
            color: '#6B5D4A',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.9rem',
            lineHeight: 1.6,
            marginBottom: 24,
          }}
        >
          {t.order.body}
        </p>

        <a
          href={`tel:${PHONE_TEL}`}
          className="transition-all duration-300 hover:scale-105"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            background: '#C9A227',
            color: '#4A5D23',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: '1.05rem',
            letterSpacing: '0.02em',
            padding: '14px 28px',
            borderRadius: 28,
            textDecoration: 'none',
          }}
        >
          <Phone size={18} />
          {PHONE_DISPLAY}
        </a>

        <p
          style={{
            color: 'rgba(107, 93, 74, 0.7)',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem',
            marginTop: 16,
            marginBottom: 0,
          }}
        >
          {t.order.hint}
        </p>
      </div>
    </div>
  )
}
