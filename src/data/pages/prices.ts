import registry from '@/data/nbllm-research-registry.json';
import { PageBlueprint } from '@/components/framework/types';
import { SERVICES } from '@/data/services';
import { rules902PP } from '@/data/rules_902pp';

const pricingDrivers = [
  {
    title: 'Габариты и объем символов',
    description: 'Для букв и типовых фасадных конструкций базовый расчет начинается с единицы размера: сантиметр, квадратный метр, погонный метр или проектная единица.',
    sourceDocId: 'NB-003',
    evidenceSnippet: 'Rate per cm multiplied by letter count is the primary baseline estimator.',
  },
  {
    title: 'Материал и световой сценарий',
    description: 'Акрил, металл, тип подсветки и лицевая панель меняют не только внешний вид, но и эксплуатационный ресурс. Поэтому одинаковый размер не означает одинаковую цену.',
    sourceDocId: 'NB-004',
    evidenceSnippet: 'Material-lighting coupling directly affects luminance stability and service life.',
  },
  {
    title: 'Монтаж, доступ и SLA',
    description: 'Фасадный доступ, ночные работы, спецтехника и roll-out сценарии меняют трудоемкость проекта. Именно поэтому калькулятор дает диапазон, а не фальшиво точную цифру.',
    sourceDocId: 'NB-017',
    evidenceSnippet: 'Access complexity and night works materially affect final project budget.',
  },
];

const complianceItems = [
  {
    title: 'Размер вывески считаем до дизайна',
    description: 'До запуска производства проверяем высоту и длину конструкции относительно фасада, чтобы смета не расходилась с допустимым форматом.',
    sourceDocId: 'NB-006',
    evidenceSnippet: rules902PP[0]?.evidence.evidence_snippet ?? '',
    tone: 'allowed' as const,
  },
  {
    title: 'Исторический центр меняет формат',
    description: 'Если объект в чувствительной зоне, световой короб может не подойти. Тогда сравниваем не только цену, но и шанс согласования.',
    sourceDocId: 'NB-007',
    evidenceSnippet: rules902PP[2]?.evidence.evidence_snippet ?? '',
    tone: 'risk' as const,
  },
  {
    title: 'Штрафной риск учитываем до бюджета',
    description: 'Перекрытие окон, балконы и спорные зоны размещения сначала убираем из концепции, а уже потом подтверждаем финальную смету.',
    sourceDocId: 'NB-018',
    evidenceSnippet: rules902PP[4]?.evidence.evidence_snippet ?? '',
    tone: 'risk' as const,
  },
];

const pricingFaq = [
  {
    q: 'Что можно посчитать сразу, без выезда на объект?',
    a: 'Сразу считаем базовую конструкцию, единицу размера, материал и ориентир по монтажу. Для типовых букв, лайтбоксов и неона этого достаточно, чтобы понять рабочий бюджетный коридор.',
  },
  {
    q: 'Почему вы показываете диапазон, а не одну фиксированную цифру?',
    a: 'Потому что итог меняется от фасадного доступа, ночных работ, согласований и точного материала. Мы сознательно не имитируем ложную точность до замера и фотопривязки.',
  },
  {
    q: 'Когда нужно идти в проверку 902-ПП еще до расчета?',
    a: 'Когда проект в историческом центре, на сложном фасаде, на кровле или рядом с зонами риска вроде окон, балконов и нестандартных креплений. В этих сценариях compliance влияет на сам тип конструкции.',
  },
  {
    q: 'Если у нас сеть объектов, считать каждую вывеску отдельно?',
    a: 'Для сети считаем не только единичную вывеску, но и повторяемость, SLA, монтажный стандарт и масштаб roll-out. Это снижает шум в бюджете и ускоряет согласование внутри вашей команды.',
  },
];

export const PRICES_PAGE: PageBlueprint = {
  slug: '/prices',
  metadata: {
    title: 'Цены на изготовление наружной рекламы | Expoint ADV',
    description: 'Сравните базовые ставки, проектные сценарии и регуляторные ограничения по вывескам. Главный следующий шаг — расчет через промышленный калькулятор.',
  },
  headerVariant: 'immersive',
  breadcrumbs: [{ label: 'Цены', href: '/prices' }],
  sections: [
    {
      type: 'hero-generic',
      id: 'hero',
      props: {
        subtitle: 'Commercial Pricing Hub',
        title: 'Цена начинается',
        titleAccent: 'с логики проекта',
        description:
          'Сначала определяем тип конструкции, единицу расчета и ограничения фасада. Затем даем диапазон бюджета, который можно сразу проверить через калькулятор и уточнить после замера.',
        highlights: [
          'Что влияет на цену: размер, материал, монтаж и формат размещения.',
          'Что можно оценить сейчас: базовую ставку и рабочий диапазон бюджета.',
          'Почему следующий шаг — калькулятор: он собирает тип конструкции в ваш проектный сценарий.',
        ],
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
        title: 'Три драйвера, которые нельзя упростить до одного прайса.',
        intro:
          'Мы не обещаем искусственно точную цену до замера. Вместо этого показываем проверяемую логику расчета: что формирует базу, что меняет ресурс и что двигает монтажную часть сметы.',
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
    },
    {
      type: 'pricing-compliance',
      id: 'risk',
      props: {
        title: 'Compliance меняет не только риск, но и саму цену проекта.',
        intro:
          'Для типовых объектов compliance не тормозит продажу, а защищает смету от переделок. Для исторического центра, кровли и сложных фасадов он определяет, какую конструкцию вообще можно считать.',
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
        title: 'Основа страницы — не рекламные обещания, а рабочие исходные данные',
        animateOnView: false,
        items: [
          { numericValue: SERVICES.length, suffix: ' типов', label: 'конструкций в базовой матрице расчета' },
          { numericValue: registry.length, suffix: ' источников', label: 'в NBLLM-контуре для pricing, segment-fit и compliance copy' },
          { numericValue: rules902PP.length, suffix: ' правил', label: 'проверяем до запуска спорных фасадных сценариев' },
          { numericValue: 50, suffix: ' тыс. ч', label: 'ресурс премиальных LED-модулей в инженерных спецификациях' },
        ],
      },
    },
    {
      type: 'faq',
      id: 'faq',
      props: {
        titleText: 'Вопросы по бюджету',
        introText: 'Ответы на возражения, которые мешают перейти к расчету.',
        items: pricingFaq,
      },
    },
    {
      type: 'cta',
      id: 'cta',
      props: {
        title: 'Нужен диапазон бюджета по вашему сценарию?',
        titleAccent: 'Соберите его в калькуляторе',
        description:
          'Выберите тип конструкции, проверьте стартовую единицу расчета и получите рабочий коридор бюджета. Для сложных фасадов мы подключим compliance-проверку вторым шагом, а не вместо расчета.',
        buttonText: 'Открыть калькулятор',
        buttonHref: '/calculator',
      },
    },
  ],
};
