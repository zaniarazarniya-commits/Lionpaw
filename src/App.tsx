import { memo } from 'react'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import Welcome from './sections/Welcome'
import TonicsCarousel from './sections/TonicsCarousel'
import TheCraft from './sections/TheCraft'
import MarqueeDivider from './sections/MarqueeDivider'
import FromOurRange from './sections/FromOurRange'
import Ingredients from './sections/Ingredients'
import Newsletter from './sections/Newsletter'
import Footer from './sections/Footer'

const MemoizedNavigation = memo(Navigation)
const MemoizedHero = memo(Hero)
const MemoizedWelcome = memo(Welcome)
const MemoizedTonicsCarousel = memo(TonicsCarousel)
const MemoizedTheCraft = memo(TheCraft)
const MemoizedMarqueeDivider = memo(MarqueeDivider)
const MemoizedFromOurRange = memo(FromOurRange)
const MemoizedIngredients = memo(Ingredients)
const MemoizedNewsletter = memo(Newsletter)
const MemoizedFooter = memo(Footer)

export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <MemoizedNavigation />
      <main>
        <MemoizedHero />
        <MemoizedWelcome />
        <MemoizedTonicsCarousel />
        <MemoizedTheCraft />
        <MemoizedMarqueeDivider />
        <MemoizedFromOurRange />
        <MemoizedIngredients />
        <MemoizedNewsletter />
      </main>
      <MemoizedFooter />
    </div>
  )
}
