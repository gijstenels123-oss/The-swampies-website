const siteConfig = {
  branding: {
    name: 'THE SWAMPIES',
    subtitle: 'Minecraft | Content | Community',
    intro: 'Ontdek de moerassige wereld van TheSwampiesMC: een gezellige Minecraft-community waar spelers samen bouwen, avontuur beleven en elkaar helpen. Van survival tot creatieve uitdagingen, hier vind je alles wat je nodig hebt om je ervaring te verbeteren.',
    cta: 'Word lid van onze community'
  },
  nav: [
    { label: 'Home', href: '#home' },
    { label: 'Shop', href: '#shop' },
    { label: 'Ranks', href: '#shop' },
    { label: 'Serverstatus', href: '#serverstatus' },
    { label: 'Discord', href: '#discord' },
    { label: 'Regels', href: '#regels' }
  ],
  server: {
    java: {
      label: 'Java',
      host: 'node4.serversphere.deltaservers.nl',
      port: 3002,
      protocol: 'TCP',
      copyLabel: 'Kopieer Java IP'
    },
    bedrock: {
      label: 'Bedrock',
      host: 'node4.serversphere.deltaservers.nl',
      port: 3002,
      protocol: 'UDP',
      copyLabel: 'Kopieer Bedrock IP'
    }
  },
  discord: {
    invite: 'https://discord.gg/kF8AySU4U4',
    button: 'Word lid van onze Discord'
  },
  shop: {
    categories: ['all', 'ranks', 'keys', 'kikkercoins'],
    labels: {
      all: 'Alles',
      ranks: 'Ranks',
      keys: 'Keys',
      kikkercoins: 'KikkerCoins'
    },
    products: [
      {
        id: 'silver',
        category: 'ranks',
        name: 'Zilver',
        badge: 'Rank',
        price: 2.99,
        description: 'Perfect voor spelers die een eerste upgrade willen.',
        image: 'assets/Silver rank logo..PNG'
      },
      {
        id: 'gold',
        category: 'ranks',
        name: 'Gold',
        badge: 'Rank',
        price: 5.99,
        description: 'Meer privileges en een sterke status in de community.',
        image: 'assets/gold rank logo..PNG'
      },
      {
        id: 'diamond',
        category: 'ranks',
        name: 'Diamond',
        badge: 'Rank',
        price: 11.99,
        description: 'Voor spelers die een premium uitstraling willen.',
        image: 'assets/Diamond rank logo..PNG'
      },
      {
        id: 'emerald',
        category: 'ranks',
        name: 'Emerald',
        badge: 'Rank',
        price: 19.99,
        description: 'Een rank met meer waardigheid en opvallende voordelen.',
        image: 'assets/Emerald rank logo..PNG'
      },
      {
        id: 'netherite',
        category: 'ranks',
        name: 'Netherite',
        badge: 'Rank',
        price: 29.99,
        description: 'De ultieme status voor de grootste spelers van de server.',
        image: 'assets/Netherite rank logo..PNG'
      },
      {
        id: 'kikker-key',
        category: 'keys',
        name: 'Kikker Key',
        badge: 'Key',
        price: 0,
        priceLabel: '500 KikkerCoins',
        description: 'Gebruik deze key voor speciale loot en misterieuze rewards.',
        image: 'assets/Kikker key model.PNG'
      },
      {
        id: 'galaxy-key',
        category: 'keys',
        name: 'Galaxy Key',
        badge: 'Key',
        price: 0,
        priceLabel: '500 KikkerCoins',
        description: 'Een exclusieve key voor zeldzame bonuscontent en mystieke loot.',
        image: 'assets/Galaxy key model.PNG'
      },
      {
        id: 'season-key',
        category: 'keys',
        name: 'Seizoens Key',
        badge: 'Key',
        price: 0,
        priceLabel: '500 KikkerCoins',
        description: 'Ontgrendel de tijdelijke seizoensrewards van de server.',
        image: 'assets/Seizoens key model.PNG'
      },
      {
        id: 'coin-750',
        category: 'kikkercoins',
        name: '750 KikkerCoins',
        badge: 'KikkerCoins',
        price: 4.99,
        amount: 750,
        description: 'Handige hoeveelheid KikkerCoins voor snelle upgrades.',
        image: 'assets/Kikker coins model.PNG'
      },
      {
        id: 'coin-1500',
        category: 'kikkercoins',
        name: '1500 KikkerCoins',
        badge: 'KikkerCoins',
        price: 9.99,
        amount: 1500,
        description: 'Goed uitgebalanceerd pakket voor actieve spelers.',
        image: 'assets/Kikker coins model.PNG'
      },
      {
        id: 'coin-3000',
        category: 'kikkercoins',
        name: '3000 KikkerCoins',
        badge: 'KikkerCoins',
        price: 19.99,
        amount: 3000,
        description: 'Voor spelers die vaak hun favoriete content willen uitbreiden.',
        image: 'assets/Kikker coins model.PNG'
      },
      {
        id: 'coin-6500',
        category: 'kikkercoins',
        name: '6500 KikkerCoins',
        badge: 'KikkerCoins',
        price: 42.99,
        amount: 6500,
        description: 'Het grootste pakket voor de meest loyale communityleden.',
        image: 'assets/Kikker coins model.PNG'
      }
    ]
  },
  rules: [
    {
      category: 'Algemeen',
      items: [
        'Respecteer andere spelers en medewerkers.',
        'Gebruik de officiële communicatiekanalen en volg serverinformatie op.',
        'Misbruik van bugs of glitches is niet toegestaan.'
      ]
    },
    {
      category: 'Gedrag',
      items: [
        'Ongepaste taal, haat, intimidatie of griefing zijn verboden.',
        'Wees vriendelijk en help andere spelers waar mogelijk.',
        'Gebruik geen opzettelijk vervelende of frustrerende acties om anderen te irriteren.'
      ]
    },
    {
      category: 'Survival',
      items: [
        'Maak geen gebruik van onethische hulpmiddelen of ongeoorloofde hacks.',
        'Respecteer claims, bases en land van andere spelers.',
        'Zorg voor een nette en veilige survival-ervaring voor iedereen.'
      ]
    },
    {
      category: 'Chat',
      items: [
        'Gebruik een respectvolle en begrijpelijke chatstijl.',
        'Reclame in de algemene chat is niet toegestaan zonder toestemming.',
        'Spam, capslock en ongepaste inhoud worden gestraft.'
      ]
    },
    {
      category: 'Handel',
      items: [
        'Handel eerlijk en transparant met andere spelers.',
        'Gebruik duidelijke prijzen en geen verborgen voorwaarden.',
        'Fraude of misleiding bij verkoop is niet toegestaan.'
      ]
    },
    {
      category: 'Straffen',
      items: [
        'Onderscheidende overtredingen kunnen leiden tot waarschuwingen, mute, tempban of permanente ban.',
        'Herhaalde overtredingen worden zwaarder bestraft.',
        'Beslissingen van medewerkers zijn bindend voor de server.'
      ]
    }
  ],
  team: [
    {
      role: 'Eigenaar',
      name: 'Kikkerfrog',
      image: 'assets/team-kikkerfrog.svg',
      color: '#6dcf8d'
    },
    {
      role: 'Mede-eigenaar',
      name: 'Huos',
      image: 'assets/team-huos.svg',
      color: '#69a9ff'
    },
    {
      role: 'Mede-eigenaar',
      name: 'Gio',
      image: 'assets/team-gio.svg',
      color: '#f0c567'
    }
  ]
};

window.siteConfig = siteConfig;
