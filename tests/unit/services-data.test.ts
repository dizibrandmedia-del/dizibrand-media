import { describe, it, expect } from 'vitest';
import { SERVICES_DATA } from '@/lib/data/services';

describe('Services Data & Routing Tests', () => {
  const requiredFooterSlugs = [
    'website-development',
    'software-development',
    'saas-development',
    'ai-automation',
    'ai-agents',
  ];

  it('should contain all required service slugs from footer and navigation', () => {
    requiredFooterSlugs.forEach((slug) => {
      expect(SERVICES_DATA[slug], `Missing service slug: ${slug}`).toBeDefined();
    });
  });

  it('should have complete data structure for each service', () => {
    Object.entries(SERVICES_DATA).forEach(([slug, service]) => {
      expect(service.slug).toBe(slug);
      expect(service.name.length).toBeGreaterThan(0);
      expect(service.category.length).toBeGreaterThan(0);
      expect(service.badge.length).toBeGreaterThan(0);
      expect(service.headline.length).toBeGreaterThan(0);
      expect(service.subheadline.length).toBeGreaterThan(0);
      expect(service.description.length).toBeGreaterThan(0);
      expect(service.challenges.length).toBeGreaterThanOrEqual(3);
      expect(service.capabilities.length).toBeGreaterThanOrEqual(3);
      expect(service.techStack.length).toBeGreaterThanOrEqual(3);
      expect(service.deliverables.length).toBeGreaterThanOrEqual(4);
      expect(service.metrics.length).toBeGreaterThanOrEqual(3);
      expect(service.faqs.length).toBeGreaterThanOrEqual(2);
    });
  });

  it('should have website-development correctly configured with Next.js capabilities', () => {
    const webDev = SERVICES_DATA['website-development'];
    expect(webDev).toBeDefined();
    expect(webDev.name).toBe('Enterprise Website Development');
    expect(webDev.headline).toContain('Next.js');
    expect(webDev.metrics.some((m) => m.label.includes('Page Load Speed'))).toBe(true);
  });
});
