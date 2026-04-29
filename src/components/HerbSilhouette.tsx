interface HerbSilhouetteProps {
  herb: 'damiana' | 'calendula' | 'seamoss' | 'molundo' | 'fermented' | 'african'
  className?: string
  style?: React.CSSProperties
}

export default function HerbSilhouette({ herb, style }: HerbSilhouetteProps) {
  const common = {
    fill: 'currentColor',
    style: { ...style },
    viewBox: '0 0 200 200',
  }

  switch (herb) {
    case 'damiana':
      return (
        <svg {...common}>
          {/* Central stem */}
          <path d="M100 180 Q100 120 100 80" stroke="currentColor" strokeWidth="2.5" fill="none" />
          {/* Left leaves */}
          <ellipse cx="75" cy="140" rx="18" ry="10" transform="rotate(-30 75 140)" />
          <ellipse cx="70" cy="110" rx="16" ry="9" transform="rotate(-25 70 110)" />
          <ellipse cx="78" cy="85" rx="14" ry="8" transform="rotate(-35 78 85)" />
          {/* Right leaves */}
          <ellipse cx="125" cy="135" rx="18" ry="10" transform="rotate(30 125 135)" />
          <ellipse cx="130" cy="105" rx="16" ry="9" transform="rotate(25 130 105)" />
          <ellipse cx="122" cy="80" rx="14" ry="8" transform="rotate(35 122 80)" />
          {/* Top leaves */}
          <ellipse cx="90" cy="65" rx="12" ry="7" transform="rotate(-20 90 65)" />
          <ellipse cx="110" cy="62" rx="12" ry="7" transform="rotate(20 110 62)" />
          <ellipse cx="100" cy="50" rx="10" ry="6" />
        </svg>
      )

    case 'calendula':
      return (
        <svg {...common}>
          {/* Stem */}
          <path d="M100 180 Q102 140 100 100" stroke="currentColor" strokeWidth="2.5" fill="none" />
          {/* Leaf */}
          <ellipse cx="80" cy="145" rx="16" ry="8" transform="rotate(-35 80 145)" />
          {/* Flower center */}
          <circle cx="100" cy="85" r="14" />
          {/* Petals */}
          <ellipse cx="100" cy="58" rx="7" ry="18" />
          <ellipse cx="100" cy="112" rx="7" ry="18" />
          <ellipse cx="73" cy="85" rx="18" ry="7" />
          <ellipse cx="127" cy="85" rx="18" ry="7" />
          <ellipse cx="81" cy="66" rx="7" ry="16" transform="rotate(-45 81 66)" />
          <ellipse cx="119" cy="66" rx="7" ry="16" transform="rotate(45 119 66)" />
          <ellipse cx="81" cy="104" rx="7" ry="16" transform="rotate(45 81 104)" />
          <ellipse cx="119" cy="104" rx="7" ry="16" transform="rotate(-45 119 104)" />
        </svg>
      )

    case 'seamoss':
      return (
        <svg {...common}>
          {/* Main branching structure like seaweed */}
          <path d="M100 180 Q100 150 100 130" stroke="currentColor" strokeWidth="3" fill="none" />
          <path d="M100 130 Q80 110 70 90" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M100 130 Q120 110 130 90" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M100 130 Q100 100 100 70" stroke="currentColor" strokeWidth="2.5" fill="none" />
          {/* Branch tips — rounded blobs */}
          <ellipse cx="70" cy="85" rx="8" ry="14" transform="rotate(-20 70 85)" />
          <ellipse cx="55" cy="75" rx="6" ry="11" transform="rotate(-35 55 75)" />
          <ellipse cx="130" cy="85" rx="8" ry="14" transform="rotate(20 130 85)" />
          <ellipse cx="145" cy="75" rx="6" ry="11" transform="rotate(35 145 75)" />
          <ellipse cx="100" cy="65" rx="7" ry="16" />
          <ellipse cx="92" cy="50" rx="5" ry="12" transform="rotate(-15 92 50)" />
          <ellipse cx="108" cy="50" rx="5" ry="12" transform="rotate(15 108 50)" />
          {/* Small side branches */}
          <ellipse cx="85" cy="110" rx="6" ry="10" transform="rotate(-30 85 110)" />
          <ellipse cx="115" cy="110" rx="6" ry="10" transform="rotate(30 115 110)" />
        </svg>
      )

    case 'molundo':
      return (
        <svg {...common}>
          {/* Main root going down */}
          <path d="M100 40 Q105 80 100 120 Q98 150 100 180" stroke="currentColor" strokeWidth="5" fill="none" />
          {/* Thick side roots */}
          <path d="M100 100 Q75 115 60 135" stroke="currentColor" strokeWidth="3.5" fill="none" />
          <path d="M100 95 Q125 110 140 130" stroke="currentColor" strokeWidth="3.5" fill="none" />
          <path d="M100 130 Q80 145 65 165" stroke="currentColor" strokeWidth="2.5" fill="none" />
          <path d="M100 125 Q120 140 135 160" stroke="currentColor" strokeWidth="2.5" fill="none" />
          {/* Root tips — bulbous */}
          <ellipse cx="58" cy="140" rx="9" ry="13" transform="rotate(-25 58 140)" />
          <ellipse cx="142" cy="135" rx="9" ry="13" transform="rotate(25 142 135)" />
          <ellipse cx="62" cy="170" rx="7" ry="11" transform="rotate(-20 62 170)" />
          <ellipse cx="138" cy="165" rx="7" ry="11" transform="rotate(20 138 165)" />
          {/* Top stem */}
          <path d="M100 40 Q100 25 100 15" stroke="currentColor" strokeWidth="2" fill="none" />
          <ellipse cx="100" cy="12" rx="8" ry="12" />
        </svg>
      )

    case 'fermented':
      return (
        <svg {...common}>
          {/* Jar body */}
          <path d="M70 70 L70 160 Q70 175 85 175 L115 175 Q130 175 130 160 L130 70 Z" />
          {/* Jar neck */}
          <rect x="75" y="55" width="50" height="18" rx="3" />
          {/* Cork/lid */}
          <rect x="78" y="48" width="44" height="10" rx="2" />
          {/* Herbs inside jar */}
          <path d="M85 140 Q80 120 85 100" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M100 145 Q95 115 100 95" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M115 140 Q120 120 115 100" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* Leaves inside */}
          <ellipse cx="80" cy="105" rx="8" ry="5" transform="rotate(-30 80 105)" />
          <ellipse cx="95" cy="100" rx="8" ry="5" transform="rotate(15 95 100)" />
          <ellipse cx="112" cy="108" rx="8" ry="5" transform="rotate(35 112 108)" />
          {/* Bubbles/fermentation marks */}
          <circle cx="90" cy="155" r="3" opacity="0.6" />
          <circle cx="108" cy="148" r="2.5" opacity="0.6" />
          <circle cx="98" cy="162" r="2" opacity="0.6" />
        </svg>
      )

    case 'african':
      return (
        <svg {...common}>
          {/* Central stem */}
          <path d="M100 180 Q100 140 100 100" stroke="currentColor" strokeWidth="3" fill="none" />
          {/* Large compound leaflets — left */}
          <ellipse cx="72" cy="150" rx="22" ry="10" transform="rotate(-40 72 150)" />
          <ellipse cx="65" cy="125" rx="20" ry="9" transform="rotate(-35 65 125)" />
          <ellipse cx="68" cy="100" rx="18" ry="8" transform="rotate(-30 68 100)" />
          <ellipse cx="75" cy="78" rx="15" ry="7" transform="rotate(-25 75 78)" />
          {/* Large compound leaflets — right */}
          <ellipse cx="128" cy="148" rx="22" ry="10" transform="rotate(40 128 148)" />
          <ellipse cx="135" cy="123" rx="20" ry="9" transform="rotate(35 135 123)" />
          <ellipse cx="132" cy="98" rx="18" ry="8" transform="rotate(30 132 98)" />
          <ellipse cx="125" cy="76" rx="15" ry="7" transform="rotate(25 125 76)" />
          {/* Top tip leaflets */}
          <ellipse cx="88" cy="58" rx="12" ry="6" transform="rotate(-20 88 58)" />
          <ellipse cx="112" cy="56" rx="12" ry="6" transform="rotate(20 112 56)" />
          <ellipse cx="100" cy="42" rx="10" ry="6" />
        </svg>
      )

    default:
      return null
  }
}
