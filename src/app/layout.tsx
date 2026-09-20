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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="min-h-screen bg-brand-black text-slate-100 font-sans antialiased selection:bg-brand-orange/30 selection:text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
