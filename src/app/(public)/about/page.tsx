import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Target, Users, Globe, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About DiziBrand Media | Growth, Technology, AI & Leadership',
  description:
    'Learn about DiziBrand Media. We are an extended strategic growth and technology team for ambitious enterprises and scale-ups.',
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">ABOUT DIZIBRAND MEDIA</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Your Business Deserves More Than an Agency
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          DiziBrand Media was founded on a simple realization: traditional digital marketing agencies
          and software consultancies operate in silos, leaving ambitious businesses with fragmented tools,
          unaccountable metrics, and bloated overhead.
        </p>
      </div>

      {/* Core Mission & Philosophy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
          <h2 className="text-2xl font-bold text-white">An Extended Strategic Partner</h2>
          <p>
            We operate as an integrated extension of your company. Rather than handing off tasks to junior
            freelancers or hiding behind vague monthly retainers, our practice leads, software architects,
            and growth strategists embed directly into your operations.
          </p>
          <p>
            From deploying autonomous AI agents and engineering high-converting Next.js applications to
            optimizing multi-channel acquisition economics, we align our success with your business milestones.
          </p>
          <div className="pt-2">
            <span className="font-mono text-xs font-bold text-brand-orange uppercase tracking-wider">
              Brand Promise:
            </span>
            <p className="text-white font-semibold mt-1">
              Build. Market. Automate. Scale.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-brand-charcoal/80 border-brand-border p-5 text-center">
            <Target className="w-8 h-8 text-brand-orange mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-white">Unit Economic Focus</h3>
            <p className="text-[11px] text-slate-400 mt-1">Every initiative tied strictly to CAC, LTV, and revenue.</p>
          </Card>
          <Card className="bg-brand-charcoal/80 border-brand-border p-5 text-center">
            <ShieldCheck className="w-8 h-8 text-brand-orange mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-white">Engineering Rigor</h3>
            <p className="text-[11px] text-slate-400 mt-1">Production-ready, secure, and maintainable software.</p>
          </Card>
          <Card className="bg-brand-charcoal/80 border-brand-border p-5 text-center">
            <Users className="w-8 h-8 text-brand-orange mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-white">Senior Practitioners</h3>
            <p className="text-[11px] text-slate-400 mt-1">Direct access to C-suite and lead engineers.</p>
          </Card>
          <Card className="bg-brand-charcoal/80 border-brand-border p-5 text-center">
            <Globe className="w-8 h-8 text-brand-orange mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-white">Global Execution</h3>
            <p className="text-[11px] text-slate-400 mt-1">Serving clients across US, UK, UAE, India, and APAC.</p>
          </Card>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl border-2 border-brand-orange bg-brand-surface/90 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Explore How We Can Partner</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Schedule an initial strategic discovery call with an executive practice lead.
        </p>
        <Link href="/book-consultation">
          <Button variant="primary" size="lg" className="gap-2">
            <span>Schedule Discovery Call</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
