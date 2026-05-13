import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://expoint-adv.ru',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // We would dynamically map over programmatic pages here, e.g.:
    // { url: 'https://expoint-adv.ru/services/neon-moscow', priority: 0.8 }
  ];
}
