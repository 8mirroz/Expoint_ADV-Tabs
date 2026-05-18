export const CALCULATOR_PRICING_SNAPSHOT = {
  version: 'moscow-signage-2026-05-18',
  verifiedAt: '2026-05-18',
  currency: 'RUB',
  sources: [
    {
      label: 'Reklamastroy price list 2026',
      url: 'https://reklamastroy.ru/stoimost',
      notes: 'Объемные буквы: белые световые 95 ₽/см, цветные 105 ₽/см, контражур 130 ₽/см, сложный шрифт +30%, монтаж 1-2 этаж около 9500 ₽.',
    },
    {
      label: 'Fabrica Reklamy online calculator',
      url: 'https://fabrica-reklamy.ru/online-kalkulyator.html',
      notes: 'Калькулятор учитывает высоту, тип объема, подсветку, сложность шрифта, материал и подложку.',
    },
    {
      label: 'NRPRO public price anchors',
      url: 'https://nrpro.ru/',
      notes: 'Объемные буквы от 60 ₽/см, световые короба от 4000 ₽/м2, композитные короба от 6500 ₽/м2 плюс буквы.',
    },
    {
      label: 'Profi.ru Moscow installation price page',
      url: 'https://profi.ru/remont/remont-naruzhnoj-reklamy/price/',
      notes: 'Монтаж вывесок в Москве от 3000 ₽/м2 как внешний ориентир по монтажному рынку.',
    },
    {
      label: 'ShopVOX sign quoting software guide',
      url: 'https://shopvox.com/sign-shop-software/sign-quoting-software/',
      notes: 'Паттерны: parametric pricing, optional add-ons, branded quote, quote-to-order handoff.',
    },
  ],
  letters: {
    minOrder: 9500,
    ratesPerHeightCm: {
      none: 70,
      internal: 105,
      halo: 130,
      combined: 150,
      open_neon: 140,
    },
    materialMultipliers: {
      standard: 1,
      premium: 1.18,
      exclusive: 1.42,
    },
  },
  lightbox: {
    minOrder: 6500,
    ratePerM2: [
      { maxAreaM2: 1, rate: 18500 },
      { maxAreaM2: 5, rate: 12000 },
      { maxAreaM2: 10, rate: 8500 },
      { maxAreaM2: 20, rate: 7000 },
    ],
    shapeMultipliers: {
      standard: 1,
      serif: 1.15,
      script: 1.25,
    },
  },
  neon: {
    minOrder: 9500,
    basePerMeter: 1900,
    averageMetersBySize: {
      small: 0.3,
      medium: 0.5,
      large: 0.8,
    },
    rgbMultiplier: 1.5,
    contactAssembly: 187,
    acrylicBackingPerM2: 5200,
  },
  project: {
    pylonBase: 180000,
    roofBase: 350000,
  },
  addOns: {
    powerSupply: {
      standard: 3500,
      premium: 6000,
    },
    mounting: {
      none: 0,
      wall_simple: 9500,
      frame: 18000,
      roof: 45000,
    },
    highAccess: 21000,
    dismantlingMin: 3000,
    dismantlingPerM2: 1900,
    compliance902Audit: 9000,
  },
  urgencyMultipliers: {
    standard: 1,
    express: 1.4,
  },
  complexityMultipliers: {
    standard: 1,
    serif: 1.15,
    script: 1.3,
  },
} as const;
