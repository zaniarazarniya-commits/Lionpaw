import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import gsap from 'gsap'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './lib/i18n.tsx'

// Disable lag smoothing so animations don't "catch up" after frame drops
// This makes animations feel much smoother on lower-end devices
gsap.ticker.lagSmoothing(0)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </BrowserRouter>,
)
