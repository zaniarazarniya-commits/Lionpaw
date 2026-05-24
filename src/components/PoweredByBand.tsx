import { useState } from 'react'

export default function PoweredByBand() {
  const [hovered, setHovered] = useState(false)

  return (
    <a
      href="https://www.infrakust.se"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        width: '100%',
        background: '#000',
        padding: '10px 24px',
        textDecoration: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'background 0.3s ease',
        userSelect: 'none',
      }}
      aria-label="Powered by Infrakust — visit infrakust.se"
    >
      {/* Left decorative line */}
      <span
        style={{
          display: 'block',
          height: 1,
          background: 'rgba(201, 162, 39, 0.35)',
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          width: hovered ? 80 : 32,
          flexShrink: 0,
        }}
      />

      {/* Text group */}
      <span
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 6,
          whiteSpace: 'nowrap',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.65rem',
            fontWeight: 400,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: hovered ? 'rgba(201, 184, 150, 0.75)' : 'rgba(201, 184, 150, 0.4)',
            transition: 'color 0.3s ease',
          }}
        >
          Powered by
        </span>
        <span
          style={{
            fontFamily: "'Playfair Display', Georgia, 'Times New Roman', serif",
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: hovered ? '#F5F1E6' : 'rgba(245, 241, 230, 0.65)',
            transition: 'color 0.3s ease',
          }}
        >
          Infrakust
        </span>
      </span>

      {/* Gold arrow — slides in on hover */}
      <span
        style={{
          fontSize: '0.75rem',
          color: '#C9A227',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          lineHeight: 1,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        →
      </span>

      {/* Right decorative line */}
      <span
        style={{
          display: 'block',
          height: 1,
          background: 'rgba(201, 162, 39, 0.35)',
          transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          width: hovered ? 80 : 32,
          flexShrink: 0,
        }}
      />
    </a>
  )
}
