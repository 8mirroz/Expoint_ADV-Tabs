import registry from '@/data/nbllm-research-registry.json';
import { PageBlueprint } from '@/components/framework/types';
import { SERVICES } from '@/data/services';
import { rules902PP } from '@/data/rules_902pp';

/* ================================================================
 * PRICING DRIVERS — 6 core factors explaining price formation
 * Source: t1 (blocks 5,7,8), t2 (section 3), t5 (pricing arch)
 * ================================================================ */
const pricingDrivers = [
  {
    title: 'Дизайн и габариты символов',
    description:
      'Для букв расчет начинается с высоты в сантиметрах и количества символов. Для коробов — с площади в квадратных метрах. Для неона — с длины контура в погонных метрах.',
    impactLabel: 'База сметы',
    impactValue: 'до 60%',
    sourceDocId: 'NB-003',
    evidenceSnippet:
      'Rate per cm multiplied by letter count is the primary baseline estimator.',
  },
  {
    title: 'Материалы',
    description:
      'ПВХ, акрил, нержавеющая сталь, тип подсветки (лицевая, контражурная, RGB) — каждая комбинация меняет не только внешний вид, но и эксплуатационный ресурс конструкции.',
    impactLabel: 'Влияние на бюджет',
    impactValue: '+15–40%',
    sourceDocId: 'NB-004',
    evidenceSnippet:
      'Material-lighting coupling directly affects luminance stability and service life.',
  },
  {
    title: 'Монтаж, доступ и спецтехника',
    description:
      'Фасадный доступ, высота размещения, ночные работы, автовышка и промышленный альпинизм — эти факторы могут удвоить монтажную часть сметы.',
    impactLabel: 'Монтажный риск',
    impactValue: 'x2',
    sourceDocId: 'NB-017',
    evidenceSnippet:
      'Access complexity and night works materially affect final project budget.',
  },
  {
    title: 'Электрика и настройка',
    description:
      'Влагозащищённые блоки питания, кабельная разводка, автоматика 380В для крышных — всё это отдельные статьи бюджета, которые дешёвые подрядчики не включают в прайс.',
    impactLabel: 'Надежность',
    impactValue: 'IP67',
    sourceDocId: 'NB-005',
    evidenceSnippet:
      'Power supply quality and IP-rated enclosures determine outdoor reliability.',
  },
  {
    title: 'Согласования',
    description:
      'Исторический центр, кровля, сложные фасады — в этих сценариях compliance определяет, какую конструкцию вообще можно ставить, и меняет итоговую смету ещё до производства.',
    impactLabel: 'Финансовый риск',
    impactValue: 'до 500 000 ₽',
    sourceDocId: 'NB-006',
    evidenceSnippet:
      'Signage length must be within 70% facade width with 15m absolute cap.',
  },
  {
    title: 'Сроки и срочность производства',
    description:
      'Ускоренный цикл с ночными сменами, приоритетом в производстве и сжатым монтажным окном повышает стоимость: срочные проекты требуют отдельного ресурсного резерва команды.',
    impactLabel: 'Срочная наценка',
    impactValue: '+20–35%',
    sourceDocId: 'NB-017',
    evidenceSnippet:
      'Compressed execution windows and priority scheduling increase delivery cost.',
  },
];

/* ================================================================
 * COMPLIANCE ITEMS — Risk cards for pricing page
 * Source: t7 (setup/demolition), t1 (block 9), rules_902pp
 * ================================================================ */
const complianceItems = [
  {
    title: 'Размер вывески считаем до дизайна',
    description:
      'До запуска производства проверяем высоту и длину конструкции относительно фасада, чтобы смета не расходилась с допустимым форматом.',
    sourceDocId: 'NB-006',
    evidenceSnippet: rules902PP[0]?.evidence.evidence_snippet ?? '',
    tone: 'allowed' as const,
    severity: 'low' as const,
    riskCost: '0 ₽ штрафов',
    consequence: 'Пересогласование задерживает проект на 2-4 недели.',
    prevention: 'Бесплатная предварительная проверка фасада до макетирования.',
  },
  {
    title: 'Исторический центр меняет формат',
    description:
      'Если объект в чувствительной зоне, световой короб может не подойти. Тогда сравниваем не только цену, но и вероятность согласования.',
    sourceDocId: 'NB-007',
    evidenceSnippet: rules902PP[2]?.evidence.evidence_snippet ?? '',
    tone: 'risk' as const,
    severity: 'high' as const,
    riskCost: 'до 500 000 ₽',
    consequence: 'Штраф до 500 000 ₽ и принудительный демонтаж за свой счёт.',
    prevention: 'Compliance-проверка на старте и подбор допустимого формата.',
  },
  {
    title: 'Штрафной риск учитываем до бюджета',
    description:
      'Перекрытие окон, балконы и спорные зоны размещения сначала убираем из концепции, а уже потом подтверждаем финальную смету.',
    sourceDocId: 'NB-018',
    evidenceSnippet: rules902PP[4]?.evidence.evidence_snippet ?? '',
    tone: 'risk' as const,
    severity: 'critical' as const,
    riskCost: 'двойной бюджет',
    consequence: 'Демонтаж + повторное производство = двойной бюджет.',
    prevention: 'Проверяем фасад и зону размещения до запуска в производство.',
  },
  {
    title: 'Монтаж без проекта — риск переделки',
    description:
      'Дешёвый монтаж без инженерного расчёта приводит к просадке конструкций, отрыву от фасада и выходу электрики из строя в первую зиму.',
    sourceDocId: 'NB-017',
    evidenceSnippet:
      'Access complexity and night works materially affect final project budget.',
    tone: 'risk' as const,
    severity: 'high' as const,
    riskCost: 'от 50 000 ₽',
    consequence: 'Аварийный демонтаж и новый монтаж — от 50 000 ₽ сверх сметы.',
    prevention: 'Инженерный расчёт креплений, нагрузки и электроподключения.',
  },
];

/* ================================================================
 * SCENARIO PACKAGES — 4 B2B packages with budget anchors
 * Source: t1 (block 8), t2 (section 4), pricing-matrix
 * ================================================================ */
const scenarioPackages = [
  {
    id: 'start',
    label: 'Start',
    title: 'Локальный стартап',
    budget: 'от 40 000 ₽',
    budgetNote: 'согласование + быстрый запуск',
    audience: 'Магазины у дома, экспресс-кофейни, ПВЗ маркетплейсов и локальные студии.',
    includes: [
      'Базовая вывеска из ПВХ или легкий световой короб',
      'Энергоэффективная лицевая LED-подсветка',
      'AI-предпросмотр фасада (входит в стоимость)',
      'Монтаж на высоте до 3 метров в подарок',
      'Гарантия 1–3 года и паспорт изделия',
    ],
    timeline: '5–7 рабочих дней',
    decisionNote: 'Идеально для экономного и быстрого открытия первой точки продаж',
    recommendation: ['volumetric-letters', 'lightbox'],
    riskLevel: 'low' as const,
  },
  {
    id: 'business',
    label: 'Business',
    title: 'Фирменный ритейл',
    budget: 'от 90 000 ₽',
    budgetNote: 'оптимум для трафика и B2B',
    audience: 'Полноформатные кафе, рестораны, салоны красоты, клиники и стрит-ритейл.',
    includes: [
      'Объёмные световые буквы с премиум LED Samsung',
      'AI-предпросмотр фасада (входит в стоимость)',
      'Выезд инженера-замерщика по МКАД',
      '100% аудит соответствия Постановлению 902-ПП',
      'Расширенная B2B-гарантия до 5 лет',
    ],
    timeline: '7–12 рабочих дней',
    decisionNote: 'Сбалансированное решение по цене, привлекательности и ресурсу',
    recommendation: ['volumetric-letters', 'flex-neon', 'lightbox'],
    riskLevel: 'medium' as const,
    isPopular: true,
  },
  {
    id: 'premium',
    label: 'Premium',
    title: 'Архитектурный бренд',
    budget: 'от 150 000 ₽',
    budgetNote: 'эксклюзивные материалы',
    audience: 'Флагманские бутики, рестораны высокой кухни, отели, премиальные офисы.',
    includes: [
      'Конструкции из нержавеющей стали, латуни и композита',
      'AI-предпросмотр фасада (входит в стоимость)',
      'Сложный монтаж спецтехникой в ночное время',
      'Регулярное профилактическое обслуживание',
      'Гарантия 5 лет + VIP-сервис 24/7',
    ],
    timeline: '10–18 рабочих дней',
    decisionNote: 'Когда статус компании и эстетика фасада важнее минимальной цены',
    recommendation: ['metal-letters', 'flex-neon', 'volumetric-letters'],
    riskLevel: 'medium' as const,
  },
  {
    id: 'network',
    label: 'Network',
    title: 'Roll-out & Франшизы',
    budget: 'индивидуально',
    budgetNote: 'под единый брендбук и SLA',
    audience: 'Федеральные сети, франшизы, торговые комплексы и ритейл-корпорации.',
    includes: [
      'Разработка единого технического гайдлайна сети',
      'Потоковое серийное производство по спецтарифам',
      'Комплексный roll-out монтаж по всей РФ',
      'Индивидуальный аккаунт-менеджер и отчетность',
      'Круглосуточный мониторинг и обслуживание сети',
    ],
    timeline: 'строго по графику',
    decisionNote: 'Масштабируемый выпуск вывесок с гарантией соблюдения сроков и SLA',
    recommendation: ['lightbox', 'volumetric-letters', 'pylon-signs'],
    riskLevel: 'low' as const,
  },
];

/* ================================================================
 * FAQ — Extended pricing questions (8 items)
 * Source: t1 (block 6), t2 (section 5), t7 (setup)
 * ================================================================ */
const pricingFaq = [
  {
    q: 'Сколько стоит вывеска в Москве?',
    a: 'Стоимость зависит от типа конструкции, габаритов, материалов и условий монтажа. Световой короб — от 6 500 ₽, объёмные буквы — от 85 ₽/см высоты, гибкий неон — от 3 900 ₽/м.п. Для точного расчёта пришлите фото фасада и логотип.',
  },
  {
    q: 'Что можно посчитать сразу, без выезда на объект?',
    a: 'Сразу считаем базовую конструкцию, единицу размера, материал и ориентир по монтажу. Для типовых букв, лайтбоксов и неона этого достаточно, чтобы понять рабочий бюджетный коридор.',
  },
  {
    q: 'Почему вы показываете диапазон, а не одну фиксированную цифру?',
    a: 'Потому что итог меняется от фасадного доступа, ночных работ, согласований и точного материала. Мы сознательно не имитируем ложную точность до замера и фотопривязки.',
  },
  {
    q: 'Почему у вас дороже, чем на Авито?',
    a: 'Мы считаем проект под ключ: конструкция, материалы, электрика, влагозащита, крепления, монтаж, гарантия и проверка по 902-ПП. В дешёвых предложениях часто не учитывают металлокаркас, нормальный монтаж и договорные обязательства.',
  },
  {
    q: 'Как сэкономить на вывеске без потери качества?',
    a: 'Можно выбрать лицевую подсветку вместо контражурной, стандартные шрифты без тонких засечек, заменить отдельные буквы на световой короб или сделать вывеску компактнее, но с лучшей читаемостью.',
  },
  {
    q: 'Когда нужно идти в проверку 902-ПП ещё до расчёта?',
    a: 'Когда проект в историческом центре, на сложном фасаде, на кровле или рядом с зонами риска вроде окон, балконов и нестандартных креплений. В этих сценариях compliance влияет на сам тип конструкции.',
  },
  {
    q: 'Сколько стоит монтаж вывески?',
    a: 'Стандартный монтаж — от 4 000 ₽. Автовышка — от 17 000 ₽ за смену. Ночные работы, промышленный альпинизм и демонтаж старой вывески рассчитываются отдельно по высоте, креплениям и электрике.',
  },
  {
    q: 'Если у нас сеть объектов, считать каждую вывеску отдельно?',
    a: 'Для сети считаем не только единичную вывеску, но и повторяемость, SLA, монтажный стандарт и масштаб roll-out. Это снижает шум в бюджете и ускоряет согласование внутри вашей команды.',
  },
];

/* ================================================================
 * PRICING PREVIEW — Quick price anchors for HeroGeneric
 * Source: services.ts base prices
 * ================================================================ */
const pricingPreview = {
  items: [
    { label: 'Объёмные буквы', price: '85', unit: '₽/см' },
    { label: 'Гибкий неон', price: '3 900', unit: '₽/м.п.' },
    { label: 'Световые короба', price: '4 500', unit: '₽/м²' },
    { label: 'Стелы', price: '180 000', unit: '₽/изд.' },
  ],
  badges: [
    'Расчёт за 30 минут',
    'AI-предпросмотр за 24 часа',
    'Монтаж под ключ',
    'Проверка по 902-ПП',
  ],
  meta: [
    { label: 'Средний ответ', value: '30 мин' },
    { label: 'Замерщик в Москве', value: '24 ч' },
    { label: 'Типовой монтаж', value: 'от 4 000 ₽' },
  ],
};

/* ================================================================
 * PAGE BLUEPRINT — /prices
 * ================================================================ */
export const PRICES_PAGE: PageBlueprint = {
  slug: '/prices',
  metadata: {
    title:
      'Цены на вывески и наружную рекламу в Москве — прозрачные сметы | БУКВА СВЕТ',
    description:
      'Стоимость объёмных букв, гибкого неона, лайтбоксов и монтажа в Москве. 4 пакета: Start от 40 000 ₽, Business от 90 000 ₽, Premium от 150 000 ₽, Network — индивидуально. Расчёт за 30 минут.',
  },
  headerVariant: 'immersive',
  breadcrumbs: [{ label: 'Цены', href: '/prices' }],
  sections: [
    {
      type: 'hero-generic',
      id: 'hero',
      props: {
        subtitle: 'Commercial Pricing Hub',
        title: 'Цены на вывески',
        titleAccent: 'без ложной точности',
        description:
          'Показываем базовые ставки, реальные монтажные ориентиры и 4 рабочих пакета. Сначала понимаете бюджетный коридор, потом подтверждаете его замером и проверкой фасада.',
        highlights: [
          'Размер, материал, подсветка и монтаж считаем отдельно, а не прячем в общую цену.',
          'Типовой монтаж стартует от 4 000 ₽, автовышка — от 17 000 ₽ за смену.',
          'Пакеты Start, Business и Premium дают понятный диапазон уже на первом экране.',
        ],
        pricingPreview,
        ctaText: 'Открыть калькулятор',
        ctaHref: '/calculator',
        secondaryCtaText: 'Сравнить конструкции',
        secondaryCtaHref: '#rates',
      },
    },
    {
      type: 'pricing-explainer',
      id: 'logic',
      props: {
        title: 'Пять факторов, из которых складывается любая смета.',
        intro:
          'Мы не обещаем фиктивную точность до замера. Вместо этого показываем, где рождается цена, что ускоряет рост сметы и какие цифры нужно проверять до запуска в производство.',
        drivers: pricingDrivers,
        ctaHref: '/calculator',
        ctaLabel: 'Считать по параметрам',
      },
    },
    {
      type: 'service-rates',
      id: 'rates',
      props: { compact: true },
    },
    {
      type: 'pricing',
      id: 'fit',
      props: {
        packages: scenarioPackages,
      },
    },
    {
      type: 'pricing-compliance',
      id: 'risk',
      props: {
        title:
          'Compliance влияет не только на риск, но и на цену.',
        intro:
          'Для типовых объектов compliance защищает смету от переделок. Для исторического центра, кровли и сложных фасадов он заранее показывает, где вы теряете деньги, сроки и право на монтаж.',
        items: complianceItems,
        primaryCtaHref: '/calculator',
        primaryCtaLabel: 'Считать диапазон',
        secondaryCtaHref: '/compliance',
        secondaryCtaLabel: 'Проверить ограничения',
      },
    },
    {
      type: 'stats',
      id: 'proof',
      props: {
        subtitle: 'Verified Inputs',
        title:
          'В основе страницы рабочие цифры, а не рекламные формулировки',
        animateOnView: false,
        items: [
          {
            numericValue: SERVICES.length,
            suffix: ' типов',
            label: 'конструкций в базовой матрице расчёта',
          },
          {
            numericValue: registry.length,
            suffix: ' источников',
            label: 'в NBLLM-контуре для pricing, segment-fit и compliance',
          },
          {
            numericValue: rules902PP.length,
            suffix: ' правил',
            label: 'проверяем до запуска спорных фасадных сценариев',
          },
          {
            numericValue: 50,
            suffix: ' тыс. ч',
            label: 'ресурс премиальных LED-модулей',
          },
        ],
      },
    },
    {
      type: 'faq',
      id: 'faq',
      props: {
        titleText: 'Вопросы по бюджету и ценам',
        introText:
          'Ответы на вопросы, которые задают B2B-клиенты перед расчётом.',
        items: pricingFaq,
      },
    },
  ],
};
