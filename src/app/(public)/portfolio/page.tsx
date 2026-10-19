import React from 'react';
import { Metadata } from 'next';
import { getAllPortfolioProjects, getPortfolioCategories } from '@/lib/data/portfolio';
import { PortfolioView } from '@/components/website/portfolio-view';

export const metadata: Metadata = {
  title: 'Digital Portfolio & Engineering Works | DiziBrand Media',
  description:
    'Explore DiziBrand Media verified portfolio across SaaS products, enterprise platforms, eCommerce systems, AI workflows, and mobile applications.',
  alternates: {
    canonical: 'https://dizibrandmedia.com/portfolio',
  },
  openGraph: {
    title: 'Digital Portfolio & Engineering Works | DiziBrand Media',
    description:
      'Verified delivery record of modern web platforms, mobile apps, enterprise ERPs, and AI automation systems.',
    url: 'https://dizibrandmedia.com/portfolio',
    siteName: 'DiziBrand Media',
    locale: 'en_US',
    type: 'website',
  },
};

export default function PortfolioPage() {
  const projects = getAllPortfolioProjects();
  const categories = getPortfolioCategories();

  return (
    <main className="min-h-screen bg-brand-navy">
      <PortfolioView initialProjects={projects} categories={categories} />
    </main>
  );
}
