import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        '/demo',
        '/demo-confirmation',
      ],
    },
    sitemap: 'https://bukva-svet.ru/sitemap.xml',
  };
}
