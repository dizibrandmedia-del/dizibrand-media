import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/providers/auth-provider';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'DiziBrand Media | Marketing • Technology • AI • Data • Leadership',
    template: '%s | DiziBrand Media',
  },
  description:
    'Your Business Deserves More Than an Agency. Build Your Growth & Technology Team With Us. On-demand Digital CMO, Digital CTO, AI automation, and full-stack engineering.',
  keywords: [
    'Digital CMO',
    'Digital CTO',
    'AI Automation',
    'Performance Marketing',
    'SaaS Development',
    'Next.js Web Development',
    'Data Analytics',
    'B2B Growth Team',
  ],
  authors: [{ name: 'DiziBrand Media' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://dizibrandmedia.com'),
  alternates: {
    canonical: 'https://dizibrandmedia.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dizibrandmedia.com',
    siteName: 'DiziBrand Media',
    title: 'DiziBrand Media | Marketing • Technology • AI • Data • Leadership',
    description:
      'Your Business Deserves More Than an Agency. Build Your Growth & Technology Team With Us.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DiziBrand Media - Marketing, Technology, AI, Data, Leadership',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DiziBrand Media | Marketing • Technology • AI • Data • Leadership',
    description:
      'Your Business Deserves More Than an Agency. Build Your Growth & Technology Team With Us.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://dizibrandmedia.com/#organization',
      name: 'DiziBrand Media',
      url: 'https://dizibrandmedia.com',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://dizibrandmedia.com/#logo',
        url: 'https://dizibrandmedia.com/logo.png',
        contentUrl: 'https://dizibrandmedia.com/logo.png',
        caption: 'DiziBrand Media',
      },
      image: 'https://dizibrandmedia.com/og-image.jpg',
      description:
        'Enterprise Growth, AI Automation, Full-Stack Engineering, and Digital Leadership Teams.',
      email: 'contact@dizibrandmedia.com',
      sameAs: [
        'https://www.linkedin.com/company/dizibrandmedia',
        'https://twitter.com/dizibrandmedia',
        'https://www.instagram.com/dizibrandmedia',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://dizibrandmedia.com/#website',
      url: 'https://dizibrandmedia.com',
      name: 'DiziBrand Media',
      publisher: {
        '@id': 'https://dizibrandmedia.com/#organization',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': 'https://dizibrandmedia.com/#service',
      name: 'DiziBrand Media',
      url: 'https://dizibrandmedia.com',
      priceRange: '$$',
      description:
        'On-demand Digital CMO, Digital CTO, AI automation, and full-stack engineering.',
      areaServed: 'Worldwide',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-brand-black text-slate-100 font-sans antialiased selection:bg-brand-orange/30 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
