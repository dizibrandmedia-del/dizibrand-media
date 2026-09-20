import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Building2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { INDUSTRIES_DATA } from '@/lib/data/industries';

export const metadata = {
  title: 'Industry Solutions & Specializations | DiziBrand Media',
  description:
    'Tailored growth, technology, and AI solutions for SaaS, E-commerce, Real Estate, Healthcare, BFSI, Education, and Manufacturing.',
};

export default function IndustriesPage() {
  const industries = Object.values(INDUSTRIES_DATA);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">INDUSTRY DOMAIN EXPERTISE</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Vertical Solutions Built for Your Market Dynamics
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Generic marketing campaigns and template websites fail in specialized industries.
          We engineer tailored solutions calibrated to your regulatory, commercial, and technical realities.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind) => (
          <Card
            key={ind.slug}
            className="bg-brand-navy-soft/90 border-brand-border/70 hover:border-brand-red-orange/60 transition-all flex flex-col justify-between"
          >
            <CardHeader>
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-red-orange mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <CardTitle className="text-lg text-white">{ind.name}</CardTitle>
              <CardDescription className="text-xs text-slate-400 mt-2 leading-relaxed">
                {ind.subheadline}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-1.5 border-t border-brand-border/40 pt-3">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                  Key Sprint Deliverables:
                </span>
                <div className="space-y-1.5 text-[11px] text-slate-300">
                  {ind.deliverables.slice(0, 3).map((d) => (
                    <div key={d} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link href={`/industries/${ind.slug}`}>
                  <Button variant="secondary" size="sm" className="w-full gap-1.5 font-semibold">
                    <span>Explore {ind.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 sm:p-12 rounded-2xl border border-brand-red-orange/40 bg-gradient-to-br from-brand-red-orange/10 via-brand-navy-soft to-brand-navy-soft text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Do Not See Your Specific Industry?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Our core capabilities in executive leadership, software engineering, and AI automation adapt seamlessly to custom market challenges.
        </p>
        <Link href="/book-consultation">
          <Button variant="primary" size="lg" className="gap-2">
            <span>Schedule Custom Industry Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
