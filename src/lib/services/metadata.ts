import { Metadata } from 'next';
import { ServicePageData } from './types';

export function generateServiceMetadata(data: ServicePageData): Metadata {
  return {
    title: `${data.hero.title} | БУКВА СВЕТ`,
    description: data.hero.subtitle,
    openGraph: {
      title: `${data.hero.title} | Премиальные рекламные конструкции`,
      description: data.hero.subtitle,
      url: `https://bukva-svet.ru/services/${data.slug}`,
      siteName: 'БУКВА СВЕТ',
      locale: 'ru_RU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: data.hero.title,
      description: data.hero.subtitle,
    },
  };
}
