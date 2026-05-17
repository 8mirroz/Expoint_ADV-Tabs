import { ServicePageData } from './types';

export function generateServiceSchema(data: ServicePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.hero.title,
    description: data.hero.subtitle,
    provider: {
      '@type': 'Organization',
      name: 'Expoint ADV',
      url: 'https://expoint-adv.ru',
    },
    areaServed: 'RU',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: data.hero.title,
      itemListElement: data.packages.map((pkg, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: `${data.hero.title} - ${pkg.title}`,
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'RUB',
          description: pkg.priceLabel,
        },
        position: index + 1,
      })),
    },
  };
}

export function generateFAQSchema(data: ServicePageData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
