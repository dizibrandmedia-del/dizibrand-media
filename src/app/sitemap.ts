import { MetadataRoute } from 'next';
import { SERVICES_DATA } from '@/lib/data/services';
import { INDUSTRIES_DATA } from '@/lib/data/industries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://dizibrandmedia.com';
  const currentDate = new Date();

  // 1. Core Primary Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/services',
    '/digital-cmo',
    '/digital-cto',
    '/industries',
    '/portfolio',
    '/our-team',
    '/careers',
    '/freelancers',
    '/book-consultation',
    '/free-audit',
    '/contact',
    '/privacy-policy',
    '/terms-of-service',
    '/cookie-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/digital-') || route.startsWith('/book-') ? 0.9 : 0.7,
  }));

  // 2. All 15 Specialized Service Pages
  const serviceRoutes: MetadataRoute.Sitemap = Object.keys(SERVICES_DATA).map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. All 7 Industry Vertical Pages
  const industryRoutes: MetadataRoute.Sitemap = Object.keys(INDUSTRIES_DATA).map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes];
}
