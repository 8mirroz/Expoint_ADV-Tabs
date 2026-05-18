/**
 * CALCULATOR_PRICING_SNAPSHOT — v2026-05-18-t8
 *
 * Verified against: t8_calc knowledge base (NotebookLM)
 * Market: Moscow signage production, B2B rates
 * Updated: 2026-05-18
 *
 * Algorithms:
 *   Volumetric letters: Price = (Height_cm × Rate/cm × K_font) × K_urgency + PowerSupply + Mounting
 *   Lightboxes:         Price = (Area_m2 × Rate/m2 × K_shape × K_sides) × K_urgency + Mounting
 *   Flex neon:          Price = Base + (Length_m × Rate/m × K_font) × K_color + Joints + Backing
 *   Metal letters:      Price = (Height_cm × Rate/cm × K_geometry) × K_urgency + Fastening + Mounting
 *   Pylon/Roof:         Price = ProjectBase × ScaleMultiplier
 */
export const CALCULATOR_PRICING_SNAPSHOT = {
  version: 'moscow-signage-2026-05-18-t8',
  verifiedAt: '2026-05-18',
  currency: 'RUB',
  sources: [
    {
      label: 't8_calc / NotebookLM knowledge base',
      url: 'internal://docs/knowledge/coverage/t8_calc',
      notes: 'B2B pricing engine knowledge base: algorithms, rate tables, Moscow market coefficients.',
    },
    {
      label: 'Reklamastroy price list 2026',
      url: 'https://reklamastroy.ru/stoimost',
      notes: 'Световые буквы 95–105 ₽/см, контражур 130 ₽/см, монтаж 1-2 этаж ~9 500 ₽.',
    },
    {
      label: 'NRPRO market anchors',
      url: 'https://nrpro.ru/',
      notes: 'Объемные буквы от 60 ₽/см, световые короба от 4 000 ₽/м², композитные от 6 500 ₽/м².',
    },
    {
      label: 'Profi.ru installation rates',
      url: 'https://profi.ru/remont/remont-naruzhnoj-reklamy/price/',
      notes: 'Монтаж вывесок в Москве от 3 000 ₽/м².',
    },
    {
      label: 'ShopVOX parametric quoting patterns',
      url: 'https://shopvox.com/sign-shop-software/sign-quoting-software/',
      notes: 'Parametric pricing, optional add-ons, branded quote, quote-to-order handoff.',
    },
  ],

  /**
   * Volumetric letters & metal letters
   * Rate table: ₽ per 1 cm of letter height
   * Source: t8_calc lines 57, 105-106
   */
  letters: {
    /** Minimum order floor — protects margin on small jobs */
    minOrder: 9_500,

    /**
     * Base rates per 1 cm height, by lighting type.
     * none        = ПВХ несветовые            35–55 ₽/см  → anchor midpoint 45
     * internal    = Лицевая LED подсветка      65–140 ₽/см → anchor midpoint 105
     * halo        = Контражурная подсветка     70–155 ₽/см → anchor midpoint 130
     * combined    = Комбинированная / RGB      max range   → 155
     * open_neon   = Открытый неон на буквах   140 ₽/см
     */
    ratesPerHeightCm: {
      none:       45,   // ПВХ несветовые
      internal:   105,  // Лицевая LED
      halo:       130,  // Контражур
      combined:   155,  // Комбинированная / RGB
      open_neon:  140,  // Неон на буквах
    } as Record<string, number>,

    /**
     * Material tier multipliers.
     * Source: t8_calc — металл от 180–259 ₽/см (x1.7-1.9 vs base), нержавейка AISI 316 от 240 ₽/см
     */
    materialMultipliers: {
      standard:  1.0,   // ПВХ / Акрил стандарт
      premium:   1.22,  // Премиум акрил, усиленная электрика
      exclusive: 1.55,  // Нержавеющая сталь / металл (180–259 ₽/см)
    } as Record<string, number>,

    /**
     * Metal-specific base rate (separate algorithm path, exclusive tier)
     * Source: t8_calc — нержавейка AISI 304 от 110–180 ₽/см, AISI 316 от 240 ₽/см
     */
    metalRatePerCm: 180, // AISI 304 midpoint
  },

  /**
   * Lightbox / световые короба
   * Calculated per m² of face area with scale economy
   * Source: t8_calc lines 62-64, 110-118
   */
  lightbox: {
    /**
     * Minimum order for micro-boxes (<0.25 m²)
     * Source: t8_calc — малые короба до 0.25 м² → от 6 500 ₽ (фикс)
     */
    minOrder: 6_500,

    /**
     * Tiered rate per m² — economy of scale
     * Source: t8_calc — от 1 до 10 м²: 7 000–18 500 ₽/м²
     */
    ratePerM2: [
      { maxAreaM2: 0.25, rate: 18_500 }, // micro-boxes: фиксированный минимум
      { maxAreaM2: 1,    rate: 14_000 }, // small
      { maxAreaM2: 5,    rate: 9_000  }, // medium
      { maxAreaM2: 10,   rate: 7_500  }, // large
      { maxAreaM2: 999,  rate: 7_000  }, // extra-large
    ],

    /**
     * Shape multipliers mapped to complexity selector
     * Source: t8_calc — прямоугольник x1.0, круглый x1.25, композит x1.4
     */
    shapeMultipliers: {
      standard: 1.0,   // Прямоугольный (база)
      serif:    1.25,  // Круглый / фигурный
      script:   1.4,   // Композитный с инкрустацией
    } as Record<string, number>,

    /**
     * Double-sided panel-kронштейн multiplier
     * Source: t8_calc — двусторонняя консоль x1.6
     */
    doubleSidedMultiplier: 1.6,
  },

  /**
   * Flexible neon / гибкий неон
   * Calculated per linear meter of neon contour
   * Source: t8_calc lines 66-68, 120-130
   */
  neon: {
    /** Minimum neon order */
    minOrder: 9_500,

    /**
     * Base rate per linear meter of neon tube
     * Source: t8_calc — от 1 200–1 900 ₽/м.п., anchor midpoint 1 550
     */
    basePerMeter: 1_550,

    /**
     * Average neon length per symbol, by letter height tier
     * Source: t8_calc — S ~30 см/символ, M ~50 см/символ, L ~80 см/символ
     */
    averageMetersBySize: {
      small:  0.30, // высота < 25 см
      medium: 0.50, // 25–55 см
      large:  0.80, // > 55 см
    },

    /**
     * RGB / dynamic light multiplier
     * Source: t8_calc — RGB-динамика x1.5
     */
    rgbMultiplier: 1.5,

    /**
     * Soldering / connection cost per joint/contact
     * Source: t8_calc — пайка 187 ₽/контакт
     */
    contactAssembly: 187,

    /**
     * Acrylic backing cost per m²
     * Source: t8_calc — акриловая подложка 5-8 мм, входит в комплект
     * Estimated production cost ~5 200 ₽/m²
     */
    acrylicBackingPerM2: 5_200,
  },

  /**
   * Complex projects (pylon signs, roof installations)
   * Price = ProjectBase × ScaleMultiplier
   * Source: t8_calc — пилоны от 180 000 ₽, крышные от 350 000 ₽
   */
  project: {
    pylonBase: 180_000,
    roofBase:  350_000,
  },

  /**
   * Add-on services and overheads
   * Source: t8_calc lines 74-78, 132-139
   */
  addOns: {
    /** Power supply / block питания — added to illuminated products */
    powerSupply: {
      /** Standard: IP67 блок питания for letters/neon */
      standard: 3_500, // t8_calc: 2 000–6 000 ₽ → anchor 3 500

      /** Premium: Large enclosure for pylons/roof */
      premium:  6_500,
    },

    /**
     * Mounting costs by access type
     * Source: t8_calc — базовый монтаж от 4 000 ₽, автовышка от 17 000 ₽/смена
     */
    mounting: {
      none:       0,
      wall_simple: 9_500,  // 1-2 этаж: 4 000–5 000 ₽ base + materials
      frame:      18_000,  // Сложный фасад / рама
      roof:       45_000,  // Крышный монтаж
    } as Record<string, number>,

    /**
     * High access surcharge — автовышка / автокран
     * Source: t8_calc — смена вышки от 17 000–24 000 ₽ (7 часов + 1 час подачи)
     */
    highAccess: 21_000,

    /**
     * Dismantling
     * Source: t8_calc — демонтаж от 2 500–3 000 ₽ или 1 900 ₽/м²
     */
    dismantlingMin:   2_500,
    dismantlingPerM2: 1_900,

    /**
     * 902-ПП compliance audit
     * Source: t8_calc — базовая проверка 5 000 ₽, сложная до 14 000+ ₽
     * We offer it free for audit, charge for full registration: 9 000 ₽ base
     */
    compliance902Audit: 0, // Бесплатно (маркетинговый дифференциатор)
  },

  /**
   * Urgency multipliers
   * Source: t8_calc — срочность от +40% (3 дня) до +100% (день в день)
   */
  urgencyMultipliers: {
    standard: 1.0,
    express:  1.4, // +40% за 3–5 дней
  } as Record<string, number>,

  /**
   * Font complexity multipliers for letters
   * Source: t8_calc — прямой x1.0, засечки x1.15, рукописный x1.25–1.5
   */
  complexityMultipliers: {
    standard: 1.00, // Прямой печатный
    serif:    1.15, // С засечками
    script:   1.35, // Рукописный (midpoint 1.25–1.5)
  } as Record<string, number>,
} as const;
