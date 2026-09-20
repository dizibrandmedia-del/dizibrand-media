import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dizibrandmedia.com';
  const currentDate = new Date();

  const routes = [
    '',
    '/about',
    '/services',
    '/digital-cmo',
    '/digital-cto',
    '/industries',
    '/work',
    '/insights',
    '/our-team',
    '/careers',
    '/freelancers',
    '/book-consultation',
    '/free-audit',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/digital-') || route.startsWith('/book-') ? 0.9 : 0.7,
  }));
}
