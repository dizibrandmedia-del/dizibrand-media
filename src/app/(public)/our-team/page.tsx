import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Executive Leadership & Practice Heads | DiziBrand Media',
  description:
    'Meet the leadership team directing Digital CMO, Digital CTO, AI Engineering, and Performance Growth practices at DiziBrand Media.',
};

export default function OurTeamPage() {
  const leadership = [
    {
      role: 'Digital CMO Practice Lead',
      practice: 'Marketing & Acquisition',
      bio: 'Directs multi-channel growth architecture, CAC optimization, and executive brand positioning for enterprise scale-ups.',
      image: '/images/team/cmo-lead.jpg',
    },
    {
      role: 'Digital CTO Practice Lead',
      practice: 'Technology & Cloud Architecture',
      bio: 'Cloud systems architect directing enterprise microservices, API development, and engineering governance.',
      image: '/images/team/cto-lead.jpg',
    },
    {
      role: 'Head of AI & Autonomous Systems',
      practice: 'AI & Automation',
      bio: 'Specializing in autonomous LLM agent orchestration, vector embeddings, and enterprise workflow automation.',
      image: '/images/team/ai-lead.jpg',
    },
    {
      role: 'Head of Data & Business Intelligence',
      practice: 'Data & Analytics',
      bio: 'Attribution modeling, predictive revenue forecasting, and executive BI dashboard architecture.',
      image: '/images/team/data-lead.jpg',
    },
    {
      role: 'Practice Lead, Performance Media',
      practice: 'Paid Acquisition & ABM',
      bio: 'High-intent B2B pipeline generation, programmatic ads, and algorithmic conversion rate optimization.',
      image: '/images/team/media-lead.jpg',
    },
    {
      role: 'Practice Lead, Full-Stack Engineering',
      practice: 'Web & Software Engineering',
      bio: 'Next.js App Router, TypeScript, and modern headless CMS architecture specialist.',
      image: '/images/team/eng-lead.jpg',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">CORE PRACTITIONERS</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Executive Leadership & Practice Heads
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Every DiziBrand engagement is directed by senior practitioners with deep domain expertise in
          software engineering, marketing economics, and AI systems.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadership.map((member) => (
          <Card key={member.role} className="bg-brand-navy-soft/90 border-brand-border text-center p-6 space-y-4 hover:border-brand-red-orange/50 transition-colors">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-brand-border mx-auto shadow-lg">
              <Image
                src={member.image}
                alt={member.role}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <CardTitle className="text-base text-white">{member.role}</CardTitle>
              <Badge variant="orange" className="mt-1.5 text-[10px] font-mono">
                {member.practice}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
          </Card>
        ))}
      </div>

      <div className="p-8 rounded-2xl border border-brand-red-orange/40 bg-gradient-to-br from-brand-red-orange/10 via-brand-navy-soft to-brand-navy-soft text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Partner With Our Senior Practice Leads</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Book a strategy session directly with our Digital CMO or Digital CTO practice leads.
        </p>
        <Link href="/book-consultation">
          <Button variant="primary" size="lg" className="gap-2">
            <span>Book an Executive Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
