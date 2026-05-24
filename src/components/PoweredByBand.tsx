import { useEffect } from 'react'

// Injected once into <head> — pure CSS :hover means zero React re-renders,
// transitions start instantly at the browser compositor level.
const STYLES = `
  .ib-band {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    background: #000;
    padding: 10px 24px;
    text-decoration: none;
    cursor: pointer;
    overflow: hidden;
    user-select: none;
    box-sizing: border-box;
  }

  /* Lines use scaleX instead of width — no layout reflow, GPU composited */
  .ib-line-left,
  .ib-line-right {
    display: block;
    height: 1px;
    width: 52px;
    flex-shrink: 0;
    background: rgba(201, 162, 39, 0.35);
    will-change: transform;
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ib-line-left  { transform-origin: right center; }
  .ib-line-right { transform-origin: left center; }

  .ib-band:hover .ib-line-left,
  .ib-band:hover .ib-line-right {
    transform: scaleX(1.75);
  }

  .ib-powered {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(201, 184, 150, 0.4);
    will-change: color;
    transition: color 0.22s ease;
  }
  .ib-band:hover .ib-powered {
    color: rgba(201, 184, 150, 0.78);
  }

  .ib-name {
    font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: rgba(245, 241, 230, 0.62);
    will-change: color;
    transition: color 0.22s ease;
  }
  .ib-band:hover .ib-name {
    color: #F5F1E6;
  }

  .ib-arrow {
    font-size: 0.75rem;
    color: #C9A227;
    line-height: 1;
    flex-shrink: 0;
    opacity: 0;
    will-change: opacity, transform;
    transform: translateX(-7px);
    transition: opacity 0.22s ease, transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ib-band:hover .ib-arrow {
    opacity: 1;
    transform: translateX(0);
  }
`

export default function PoweredByBand() {
  useEffect(() => {
    if (document.getElementById('ib-styles')) return
    const el = document.createElement('style')
    el.id = 'ib-styles'
    el.textContent = STYLES
    document.head.appendChild(el)
  }, [])

  return (
    <a
      href="https://www.infrakust.se"
      target="_blank"
      rel="noopener noreferrer"
      className="ib-band"
      aria-label="Powered by Infrakust — visit infrakust.se"
    >
      <span className="ib-line-left" />

      <span style={{ display: 'flex', alignItems: 'baseline', gap: 6, whiteSpace: 'nowrap' }}>
        <span className="ib-powered">Powered by</span>
        <span className="ib-name">Infrakust</span>
      </span>

      <span className="ib-arrow" aria-hidden="true">→</span>

      <span className="ib-line-right" />
    </a>
  )
}
