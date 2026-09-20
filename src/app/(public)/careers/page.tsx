import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight, Briefcase, CheckCircle2, Clock, Globe } from 'lucide-react';

export const metadata = {
  title: 'Careers at DiziBrand Media | Join Our Growth & Tech Pods',
  description:
    'Explore full-time and contract opportunities at DiziBrand Media across Full-Stack Engineering, AI Systems, and Performance Growth.',
};

export default function CareersPage() {
  const openings = [
    {
      title: 'Senior AI & LLM Agent Engineer',
      type: 'Full-Time / Remote',
      department: 'AI & Automation Practice',
      desc: 'Architect autonomous agent workflows, vector embeddings, and enterprise API integrations with TypeScript and Python.',
    },
    {
      title: 'Senior Full-Stack Architect (Next.js / TypeScript)',
      type: 'Full-Time / Remote',
      department: 'Technology Practice',
      desc: 'Lead production Next.js App Router implementations, headless CMS architectures, and high-performance web applications.',
    },
    {
      title: 'B2B Growth & Performance Marketing Lead',
      type: 'Full-Time / Remote',
      department: 'Marketing Practice',
      desc: 'Direct paid media acquisition across Meta, LinkedIn, and Google with strict CAC-to-LTV attribution models.',
    },
    {
      title: 'Technical Project Manager (Agile / Delivery)',
      type: 'Full-Time / Remote',
      department: 'Delivery & Operations',
      desc: 'Coordinate sprint roadmaps, milestone deliverable reviews, and client communication across our multi-disciplinary pods.',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">CAREERS & OPPORTUNITIES</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Build the Future of Growth & Technology
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Join a senior, distributed team solving high-impact challenges for ambitious enterprises
          and scale-ups worldwide.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Open Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {openings.map((job) => (
            <Card key={job.title} className="bg-brand-charcoal/80 border-brand-border/80 hover:border-brand-orange/60 transition-all flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="text-brand-orange font-semibold">{job.department}</span>
                  <span>{job.type}</span>
                </div>
                <CardTitle className="text-lg mt-2">{job.title}</CardTitle>
                <CardDescription className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {job.desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0 border-t border-brand-border/40 mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-400">Global Remote</span>
                <Link href={`/contact?service=${encodeURIComponent('Career: ' + job.title)}`}>
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <span>Apply Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Freelancer Network Callout */}
      <div className="p-8 rounded-2xl border border-brand-border bg-brand-charcoal/70 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <Badge variant="default" className="font-mono mb-2">INDEPENDENT SPECIALISTS</Badge>
          <h3 className="text-xl font-bold text-white">Looking for Contract or Sprint Engagements?</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            We regularly engage vetted freelance developers, motion designers, and media buyers through our dedicated Freelancer Network.
          </p>
        </div>
        <Link href="/freelancers" className="shrink-0">
          <Button variant="primary" size="md">
            Join Freelancer Network →
          </Button>
        </Link>
      </div>
    </div>
  );
}
