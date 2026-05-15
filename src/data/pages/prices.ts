import { PageBlueprint } from '@/components/framework/types';

export const PRICES_PAGE: PageBlueprint = {
  slug: '/prices',
  metadata: {
    title: 'Цены на изготовление наружной рекламы | Expoint ADV',
    description: 'Прозрачные цены на производство вывесок, объемных букв, световых коробов и стел. Базовые тарифы и расчет стоимости онлайн.',
  },
  headerVariant: 'immersive',
  breadcrumbs: [{ label: 'Цены', href: '/prices' }],
  sections: [
    {
      type: 'hero-generic',
      id: 'hero',
      props: {
        subtitle: 'Commercial Terms',
        title: 'Тарифы и',
        titleAccent: 'Эффективность',
        description: 'Прозрачное ценообразование на базе инженерных расчетов. Выберите типовое решение или запросите индивидуальную спецификацию под ваш бюджет.',
      },
    },
    {
      type: 'service-rates',
      id: 'rates',
    },
    {
      type: 'pricing',
      id: 'packages',
    },
    {
      type: 'stats',
      id: 'trust',
      props: {
        subtitle: 'Production Metrics',
        title: 'Цифры, которые экономят ваш бюджет',
        items: [
          { numericValue: 12, suffix: '%', label: 'Средняя экономия на материалах за счет оптовых закупок' },
          { numericValue: 3, suffix: ' дня', label: 'Минимальный срок запуска проекта' },
          { numericValue: 100, suffix: '%', label: 'Соответствие 902-ПП регламентам' },
          { numericValue: 5, suffix: ' лет', label: 'Срок службы наших световых решений' },
        ],
      },
    },
    {
      type: 'faq',
      id: 'faq',
    },
    {
      type: 'cta',
      id: 'cta',
      props: {
        title: 'Нужно индивидуальное решение?',
        description: 'Наши инженеры подготовят детализированную смету и 3D-визуализацию вашего проекта в течение 24 часов. Без скрытых платежей.',
        buttonText: 'Запросить расчет',
        buttonHref: '/contacts',
      },
    },
  ],
};
