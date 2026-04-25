export type Lang = 'sv' | 'en'

export const translations = {
  sv: {
    nav: {
      story: 'Vår Story',
      tonics: 'Tonics',
      ingredients: 'Ingredienser',
      contact: 'Kontakt',
      shop: 'Beställ',
    },
    hero: {
      title: 'Lion Paw',
      subtitle: 'Roots & Herbs — Bryggda i Sverige, inspirerade av Jamaica',
    },
    welcome: {
      label: 'VÄLKOMMEN',
      heading: 'Roots Tonics från naturens hjärta',
      body: 'På Lion Paw brygger vi våra tonics på det gamla sättet — långsamt, med respekt för växterna och traditionerna som bär dem. Varje flaska är en blandning av karibisk örtkunskap och svenskt hantverk, naturligt fermenterad för en levande, vibrerande dryck.',
    },
    tonics: {
      label: 'Våra Tonics',
      count: (n: number, total: number) =>
        `${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
    },
    craft: {
      label: '003 — PROCESSEN',
      heading: 'FRÅN ROT TILL FLASKA.',
      subheading: 'Varje batch tar veckor. Vi skyndar aldrig. Naturen har sin egen takt.',
      steps: [
        {
          num: '01',
          title: 'RÖTTERNA VÄLJS FÖR HAND',
          desc: 'Varje rot inspekteras. Endast de fullt torkade, kraftfullaste exemplaren får plats i vår blandning. Det tar tid. Det är meningen.',
        },
        {
          num: '02',
          title: 'SJUDS I TIMMAR',
          desc: 'Rötterna kokas långsamt för att dra ut all kraft. Det är ett hantverk som kräver tålamod och respekt för ingredienserna.',
        },
        {
          num: '03',
          title: 'FERMENTERAS I KYLA',
          desc: 'Efter kokningen lagras tonics svalt i veckor. Processen renar och förstärker. Resultatet talar för sig självt.',
        },
      ],
    },
    marquee: 'ROTADE I TRADITION · BRYGGDA MED SJÄL · LION PAW · ',
    range: {
      label: 'FRÅN VÅRT SORTIMENT',
      heading: 'Våra produkter',
      products: [
        {
          name: 'Damiana Roots Tonic',
          desc: 'En värmande blandning av damiana, ingefära och karibiska kryddor. Långsamt fermenterad för en naturligt djup och levande tonic.',
        },
        {
          name: 'Fermenta Femina',
          desc: 'En mild ört-tonic skapad för kvinnor. Hallonblad, rödklöver och damvante med värmande ingefära och kardemumma.',
        },
        {
          name: 'Golden Irish Seamoss',
          desc: 'Vildväxande havsmossa från rena atlantvatten. Ett dagligt mineraltillskott med 92 av de 102 mineraler kroppen behöver.',
        },
      ],
    },
    ingredients: {
      label: '002 — RÖTTERNA',
      headingLine1: 'SEX RÖTTER.',
      headingLine2: 'EN FLASKA.',
      subheading: 'Inga kemikalier. Ingen alkohol. Bara vad jorden erbjudit i tusentals år.',
      roots: [
        {
          num: '01',
          name: 'SARSAPARILLA',
          latin: 'SMILAX ORNATA',
          benefit:
            'Rensar blodet och har använts i århundraden för att stärka kroppens naturliga försvar.',
        },
        {
          num: '02',
          name: 'CHANEY ROOT',
          latin: 'COCOLOBA DIVERSIFOLIA',
          benefit:
            'Rik på järn. Stärker blodet och ger kroppen det den behöver för att bygga energi.',
        },
        {
          num: '03',
          name: 'STRONG BACK',
          latin: 'DESMODIUM GANGETICUM',
          benefit:
            'Stärker rygg och leder. En traditionell favorit bland dem som arbetar hårt.',
        },
        {
          num: '04',
          name: 'MEDINA',
          latin: 'ALYSICARPUS VAGINALIS',
          benefit:
            'Stärker immunförsvaret och bidrar till kroppens återhämtning.',
        },
        {
          num: '05',
          name: 'GUINEA HEN WEED',
          latin: 'PETIVERIA ALLIACEA',
          benefit:
            'Kraftfull ört med traditionella antiinflammatoriska egenskaper.',
        },
        {
          num: '06',
          name: 'BLACK WISS',
          latin: 'BANISTERIOPSIS MURICATA',
          benefit:
            'Kompletterar övriga rötter och bidrar till tonics övergripande styrka.',
        },
      ],
      featureCaption: 'Hela ingredienser, inget dolt',
    },
    newsletter: {
      heading: 'Håll dig uppdaterad',
      body: 'Nya batcher, säsongsbetonade recept och örtvisdom direkt till din inkorg.',
      placeholder: 'Din e-post',
      button: 'Prenumerera',
      thanks: 'Tack! Välkommen till cirkeln.',
    },
    footer: {
      tagline: 'Roots & Herbs',
      description: 'Tillverkad i Sverige med respekt för kultur, natur och tradition.',
      follow: 'FÖLJ OSS',
      wholesale: 'Handla',
      copyright: '© 2025 Lion Paw Roots & Herbs. Alla rättigheter förbehållna.',
    },
  },
  en: {
    nav: {
      story: 'Our Story',
      tonics: 'Tonics',
      ingredients: 'Ingredients',
      contact: 'Contact',
      shop: 'Shop Now',
    },
    hero: {
      title: 'Lion Paw',
      subtitle: 'Roots & Herbs — Crafted in Sweden, Inspired by Jamaica',
    },
    welcome: {
      label: 'WELCOME',
      heading: 'Roots Tonics from the Heart of Nature',
      body: 'At Lion Paw, we brew our tonics the old way — slowly, with respect for the plants and the traditions that carry them. Every bottle is a blend of Caribbean herbal wisdom and Swedish craftsmanship, fermented naturally for a living, vibrant drink.',
    },
    tonics: {
      label: 'Our Tonics',
      count: (n: number, total: number) =>
        `${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`,
    },
    craft: {
      label: '003 — THE PROCESS',
      heading: 'FROM ROOT TO BOTTLE.',
      subheading: 'Every batch takes weeks. We never rush. Nature has its own pace.',
      steps: [
        {
          num: '01',
          title: 'ROOTS SELECTED BY HAND',
          desc: 'Every root is inspected. Only the fully dried, most potent specimens make it into our blend. It takes time. That is the point.',
        },
        {
          num: '02',
          title: 'SIMMERED FOR HOURS',
          desc: 'The roots are slowly simmered to extract all their power. It is a craft that requires patience and respect for the ingredients.',
        },
        {
          num: '03',
          title: 'FERMENTED IN THE COLD',
          desc: 'After boiling, the tonic is stored cold for weeks. The process purifies and strengthens. The result speaks for itself.',
        },
      ],
    },
    marquee: 'ROOTED IN TRADITION \u00B7 BREWED WITH SOUL \u00B7 LION PAW \u00B7 ',
    range: {
      label: 'FROM OUR RANGE',
      heading: 'From Our Range',
      products: [
        {
          name: 'Damiana Roots Tonic',
          desc: 'A warming blend of damiana, ginger, and island spices. Slowly fermented for a naturally deep and living tonic.',
        },
        {
          name: 'Fermenta Femina',
          desc: 'A gentle herbal tonic crafted for women. Raspberry leaf, red clover & lady\'s mantle with warming ginger and cardamom.',
        },
        {
          name: 'Golden Irish Seamoss',
          desc: 'Wildcrafted sea moss from clean Atlantic waters. A daily mineral boost with 92 of the 102 minerals your body needs.',
        },
      ],
    },
    ingredients: {
      label: '002 — THE ROOTS',
      headingLine1: 'SIX ROOTS.',
      headingLine2: 'ONE BOTTLE.',
      subheading: 'No chemicals. No alcohol. Just what the earth has offered for thousands of years.',
      roots: [
        {
          num: '01',
          name: 'SARSAPARILLA',
          latin: 'SMILAX ORNATA',
          benefit:
            'Cleanses the blood and has been used for centuries to strengthen the body\'s natural defenses.',
        },
        {
          num: '02',
          name: 'CHANEY ROOT',
          latin: 'COCOLOBA DIVERSIFOLIA',
          benefit:
            'Rich in iron. Strengthens the blood and gives the body what it needs to build energy.',
        },
        {
          num: '03',
          name: 'STRONG BACK',
          latin: 'DESMODIUM GANGETICUM',
          benefit:
            'Strengthens back and joints. A traditional favourite among those who work hard.',
        },
        {
          num: '04',
          name: 'MEDINA',
          latin: 'ALYSICARPUS VAGINALIS',
          benefit:
            'Strengthens the immune system and contributes to the body\'s recovery.',
        },
        {
          num: '05',
          name: 'GUINEA HEN WEED',
          latin: 'PETIVERIA ALLIACEA',
          benefit:
            'Powerful herb with traditional anti-inflammatory properties.',
        },
        {
          num: '06',
          name: 'BLACK WISS',
          latin: 'BANISTERIOPSIS MURICATA',
          benefit:
            'Complements the other roots and contributes to the tonic\'s overall strength.',
        },
      ],
      featureCaption: 'Whole ingredients, nothing hidden',
    },
    newsletter: {
      heading: 'Stay in the Circle',
      body: 'New batches, seasonal recipes, and roots wisdom delivered to your inbox.',
      placeholder: 'Your email',
      button: 'Subscribe',
      thanks: 'Thank you! Welcome to the circle.',
    },
    footer: {
      tagline: 'Roots & Herbs',
      description: 'Tillverkad i Sverige med respekt for kultur, natur och tradition.',
      follow: 'FOLLOW THE PAW',
      wholesale: 'Wholesale',
      copyright: '\u00A9 2025 Lion Paw Roots & Herbs. All rights reserved.',
    },
  },
}

export interface Translations {
  nav: { story: string; tonics: string; ingredients: string; contact: string; shop: string }
  hero: { title: string; subtitle: string }
  welcome: { label: string; heading: string; body: string }
  tonics: { label: string; count: (n: number, total: number) => string }
  craft: {
    label: string
    heading: string
    subheading: string
    steps: { num: string; title: string; desc: string }[]
  }
  marquee: string
  range: {
    label: string
    heading: string
    products: { name: string; desc: string }[]
  }
  ingredients: {
    label: string
    headingLine1: string
    headingLine2: string
    subheading: string
    roots: { num: string; name: string; latin: string; benefit: string }[]
    featureCaption: string
  }
  newsletter: { heading: string; body: string; placeholder: string; button: string; thanks: string }
  footer: { tagline: string; description: string; follow: string; wholesale: string; copyright: string }
}

export function getTranslation(lang: Lang): Translations {
  return translations[lang] as Translations
}
