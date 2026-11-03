import { useEffect } from 'react'
import { useLang } from '../lib/i18n'

// Bandet längst ned i Infrakusts nya stil (infrakust.se, 3 nov 2026):
// Schibsted Grotesk, vanliga bokstäver, I-märket som ikon, inget guld, inga linjer.
// Typsnittet ligger i public/fonts (SIL Open Font License, se OFL.txt där).
const STYLES = `
  @font-face {
    font-family: 'Schibsted Grotesk';
    src: url('/fonts/schibsted-grotesk.woff2') format('woff2');
    font-weight: 400 700;
    font-style: normal;
    font-display: swap;
  }

  .ib-band {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    min-height: 48px;
    background: #15181A;
    padding: 12px 24px;
    text-decoration: none;
    box-sizing: border-box;
    font-family: 'Schibsted Grotesk', system-ui, -apple-system, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
  }
  .ib-band:focus-visible {
    outline: 2px solid #FFFFFF;
    outline-offset: -4px;
  }

  .ib-mark {
    display: block;
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .ib-by {
    font-weight: 400;
    color: rgba(255, 255, 255, 0.62);
    transition: color 0.2s ease;
  }
  .ib-name {
    font-weight: 700;
    color: #FFFFFF;
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
    transition: text-decoration-color 0.2s ease;
  }
  .ib-band:hover .ib-by { color: rgba(255, 255, 255, 0.85); }
  .ib-band:hover .ib-name { text-decoration-color: rgba(255, 255, 255, 0.6); }
`

/** I-märket från infrakust.se: ett I i Schibsted Grotesk Bold, här mörkt på vitt mot det mörka bandet. */
function InfrakustMark() {
  return (
    <svg className="ib-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect width="32" height="32" rx="7" fill="#FFFFFF" />
      <path
        transform="translate(10.241 25.500) scale(0.013194 -0.013194)"
        fill="#15181A"
        d="M82.68 0V254.8H282.08V1185.2H82.68V1440H790.28V1185.2H590.88V254.8H790.28V0Z"
      />
    </svg>
  )
}

export default function PoweredByBand() {
  const { lang } = useLang()
  const by = lang === 'en' ? 'Built by' : 'Byggd av'

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
      aria-label={lang === 'en' ? 'Built by Infrakust, visit infrakust.se (opens in a new tab)' : 'Byggd av Infrakust, besök infrakust.se (öppnas i ny flik)'}
    >
      <InfrakustMark />
      <span>
        <span className="ib-by">{by}</span> <span className="ib-name">Infrakust</span>
      </span>
    </a>
  )
}
