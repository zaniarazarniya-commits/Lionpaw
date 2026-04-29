export type Lang = 'sv' | 'en'

export const translations = {
  sv: {
    nav: {
      story: 'Vår Story',
      tonics: 'Produkter',
      ingredients: 'Ingredienser',
      contact: 'Kontakt',
      shop: 'Beställ',
    },
    hero: {
      title: 'Lion Paw',
      subtitle: 'Roots & Herbs — Bryggda i Lysekil på västkusten, med örtkunskap från Jamaica',
    },
    welcome: {
      label: 'VÄLKOMMEN',
      heading: 'Roots, Herbs & Natural Care',
      body: 'På Lion Paw skapar vi våra produkter på det gamla sättet — långsamt, med respekt för växterna och havet som omger oss. Från naturligt fermenterade tonics och mineralrika havsprodukter till vårdande hudvård. Varje produkt är en blandning av karibisk örtkunskap och svenskt västkusthantverk, förädlad bland klippor och salta vindar i Lysekil.',
    },
    tonics: {
      label: 'Våra Produkter',
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
    marquee: 'LYSEKIL · BOHUSLÄN · VÄSTKUSTEN · ROTADE I TRADITION · BRYGGDA MED SJÄL · LION PAW · ',
    range: {
      label: 'FRÅN VÅRT SORTIMENT',
      heading: 'Våra produkter',
      products: [
        {
          name: 'Damiana Roots Tonic',
          desc: 'Herbal Fortifier — En autentisk örtelixir för vitalitet och balans. Bryggd med damiana och karibiska örter efter traditionella metoder.',
        },
        {
          name: 'Fermentina Fermenta',
          desc: 'Feminine Harmony — En naturligt fermenterad tonic för kvinnans vitalitet och balans. 200 ml av ren örtkraft.',
        },
        {
          name: 'Molundo Roots Tonic',
          desc: 'Traditional Herbal Support — För vitalitet och balans. 90 kapslar med noga utvalda traditionella örter.',
        },
        {
          name: 'Africana Purius',
          desc: 'Pulver/Kapslar — Renad och traditionell ört för kropp och harmoni. 90 kapslar för ditt dagliga välbefinnande.',
        },
        {
          name: 'Irish Seamoss Gel',
          desc: 'Vildväxande karragentång "Irish Seamoss" (Chondrus crispus). 100 % naturligt, veganskt och rikt på mineraler. 500 ml.',
        },
        {
          name: 'Ringblomssalva',
          desc: 'Calendula Balm — Naturlig hudvård som lugnar, skyddar och återfuktar. 60 ml av ren ringblomskraft.',
        },
      ],
    },
    ingredients: {
      label: '002 — INGREDIENSERNA',
      headingLine1: 'RENA ÖRTER.',
      headingLine2: 'RIKTIG KRAFT.',
      subheading: 'Inga kemikalier. Inga tillsatser. Bara vad jorden och havet erbjudit i tusentals år. Förädlade i Lysekil.',
      roots: [
        {
          num: '01',
          name: 'DAMIANA',
          latin: 'TURNERA DIFFUSA',
          benefit:
            'Traditionell ört för vitalitet och balans. Används i århundraden för sin uppfriskande och stärkande effekt.',
          origin: 'Mexiko & Karibien',
        },
        {
          num: '02',
          name: 'RINGBLOMMA',
          latin: 'CALENDULA OFFICINALIS',
          benefit:
            'Lugnar, skyddar och återfuktar huden naturligt. En av naturens mest skonsamma läkeörter.',
          origin: 'Medelhavet',
        },
        {
          num: '03',
          name: 'KARRAGENTÅNG',
          latin: 'CHONDRUS CRISPUS',
          benefit:
            'Vildväxande havsmossa rik på 92 av 102 mineraler. Stödjer kroppens naturliga välbefinnande.',
          origin: 'Nordatlanten (Irländska kusten)',
        },
        {
          num: '04',
          name: 'MOLUNDO',
          latin: 'TRADITIONELL ÖRT',
          benefit:
            'Traditionell ört för vitalitet och balans. Noga utvald för sina stärkande egenskaper.',
          origin: 'Jamaica',
        },
        {
          num: '05',
          name: 'FERMENTERADE ÖRTER',
          latin: 'NATURLIG FERMENTERING',
          benefit:
            'Naturligt fermenterade örter som främjar kroppens balans och stödjer välbefinnande.',
          origin: 'Lysekil, Sverige',
        },
        {
          num: '06',
          name: 'AFRIKANSKA ÖRTER',
          latin: 'TRADITIONELLA RENADE ÖRTER',
          benefit:
            'Renade och traditionella örter för kropp och harmoni. Örtkunskap som gått i arv genom generationer.',
          origin: 'Västafrika',
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
      description: 'Tillverkad i Lysekil på västkusten — där karibisk örtkunskap möter bohuslänskt hantverk och havets krafter.',
      follow: 'FÖLJ OSS',
      wholesale: 'Handla',
      copyright: '© 2025 Lion Paw Roots & Herbs. Alla rättigheter förbehållna.',
    },
  },
  en: {
    nav: {
      story: 'Our Story',
      tonics: 'Products',
      ingredients: 'Ingredients',
      contact: 'Contact',
      shop: 'Shop Now',
    },
    hero: {
      title: 'Lion Paw',
      subtitle: 'Roots & Herbs — Crafted in Lysekil on the west coast, with herbal wisdom from Jamaica',
    },
    welcome: {
      label: 'WELCOME',
      heading: 'Roots, Herbs & Natural Care',
      body: 'At Lion Paw, we create our products the old way — slowly, with respect for the plants and the sea that surrounds us. From naturally fermented tonics and mineral-rich sea moss to nurturing skincare. Every product is a blend of Caribbean herbal wisdom and Swedish west coast craftsmanship, refined among rocks and salty winds in Lysekil.',
    },
    tonics: {
      label: 'Our Products',
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
    marquee: 'LYSEKIL \u00B7 BOHUSL\u00C4N \u00B7 WEST COAST \u00B7 ROOTED IN TRADITION \u00B7 BREWED WITH SOUL \u00B7 LION PAW \u00B7 ',
    range: {
      label: 'FROM OUR RANGE',
      heading: 'From Our Range',
      products: [
        {
          name: 'Damiana Roots Tonic',
          desc: 'Herbal Fortifier — An authentic herbal elixir for vitality and balance. Brewed with damiana and Caribbean herbs using traditional methods.',
        },
        {
          name: 'Fermentina Fermenta',
          desc: 'Feminine Harmony — A naturally fermented tonic for feminine vitality and balance. 200 ml of pure herbal power.',
        },
        {
          name: 'Molundo Roots Tonic',
          desc: 'Traditional Herbal Support — For vitality and balance. 90 capsules with carefully selected traditional herbs.',
        },
        {
          name: 'Africana Purius',
          desc: 'Powder/Capsules — Purified traditional herbs for body and harmony. 90 capsules for your daily well-being.',
        },
        {
          name: 'Irish Seamoss Gel',
          desc: 'Wildcrafted carrageen moss "Irish Seamoss" (Chondrus crispus). 100% natural, vegan and rich in minerals. 500 ml.',
        },
        {
          name: 'Ringblomssalva',
          desc: 'Calendula Balm — Natural skin care that soothes, protects and moisturizes. 60 ml of pure calendula power.',
        },
      ],
    },
    ingredients: {
      label: '002 — THE INGREDIENTS',
      headingLine1: 'PURE HERBS.',
      headingLine2: 'REAL POWER.',
      subheading: 'No chemicals. No additives. Just what the earth and sea have offered for thousands of years. Refined in Lysekil.',
      roots: [
        {
          num: '01',
          name: 'DAMIANA',
          latin: 'TURNERA DIFFUSA',
          benefit:
            'Traditional herb for vitality and balance. Used for centuries for its refreshing and strengthening effects.',
          origin: 'Mexico & Caribbean',
        },
        {
          num: '02',
          name: 'CALENDULA',
          latin: 'CALENDULA OFFICINALIS',
          benefit:
            'Soothes, protects and moisturizes the skin naturally. One of nature\'s gentlest healing herbs.',
          origin: 'Mediterranean',
        },
        {
          num: '03',
          name: 'CARRAGEEN MOSS',
          latin: 'CHONDRUS CRISPUS',
          benefit:
            'Wildcrafted sea moss rich in 92 of 102 minerals. Supports the body\'s natural well-being.',
          origin: 'North Atlantic (Irish coast)',
        },
        {
          num: '04',
          name: 'MOLUNDO',
          latin: 'TRADITIONAL HERB',
          benefit:
            'Traditional herb for vitality and balance. Carefully selected for its strengthening properties.',
          origin: 'Jamaica',
        },
        {
          num: '05',
          name: 'FERMENTED HERBS',
          latin: 'NATURAL FERMENTATION',
          benefit:
            'Naturally fermented herbs that promote the body\'s balance and support well-being.',
          origin: 'Lysekil, Sweden',
        },
        {
          num: '06',
          name: 'AFRICAN HERBS',
          latin: 'TRADITIONAL PURIFIED HERBS',
          benefit:
            'Purified and traditional herbs for body and harmony. Herbal knowledge passed down through generations.',
          origin: 'West Africa',
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
      description: 'Crafted in Lysekil on the Swedish west coast — where Caribbean herbal wisdom meets Bohuslän craftsmanship and the power of the sea.',
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
    roots: { num: string; name: string; latin: string; benefit: string; origin: string }[]
    featureCaption: string
  }
  newsletter: { heading: string; body: string; placeholder: string; button: string; thanks: string }
  footer: { tagline: string; description: string; follow: string; wholesale: string; copyright: string }
}

export function getTranslation(lang: Lang): Translations {
  return translations[lang] as Translations
}
