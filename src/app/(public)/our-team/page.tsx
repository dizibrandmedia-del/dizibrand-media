import React from 'react';
import { Metadata } from 'next';
import { TeamView } from '@/components/website/team-view';

export const metadata: Metadata = {
  title: 'Our Team | Experts Committed to Your Growth | DiziBrand Media',
  description:
    'Meet the DiziBrand Media leadership and cross-functional team of experts in strategy, software development, AI automation, and performance marketing.',
  alternates: {
    canonical: 'https://dizibrandmedia.com/our-team',
  },
  openGraph: {
    title: 'Our Team | DiziBrand Media',
    description:
      'A Team of Experts Committed to Your Growth across Strategy, Technology, Marketing and Operations.',
    url: 'https://dizibrandmedia.com/our-team',
    siteName: 'DiziBrand Media',
    type: 'website',
  },
};

export default function OurTeamPage() {
  return <TeamView />;
}
