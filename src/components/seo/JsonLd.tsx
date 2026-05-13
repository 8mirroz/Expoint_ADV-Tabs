import React from 'react';
import type { Service } from '@/data/services';

interface JsonLdProps {
  data: Record<string, unknown>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

type ServiceSchemaInput = Pick<Service, 'title' | 'fullDescription' | 'basePrice' | 'priceUnit'>;

export const generateServiceSchema = (service: ServiceSchemaInput) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.fullDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Expoint ADV',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Москва',
        addressRegion: 'RU-MOW'
      }
    },
    offers: {
      '@type': 'Offer',
      price: service.basePrice,
      priceCurrency: 'RUB',
      description: `От ${service.basePrice} ${service.priceUnit}`
    }
  };
};

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};
