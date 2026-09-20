import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, CheckCircle2, ArrowRight, BarChart2, ShieldCheck, Target } from 'lucide-react';

export const metadata = {
  title: 'Digital CMO (Fractional CMO) | DiziBrand Media',
  description:
    'On-demand Chief Marketing Officer leadership. Strategic brand positioning, acquisition economics, CAC-to-LTV optimization, and board-level growth reporting.',
};

export default function DigitalCMOPage() {
  const deliverables = [
    {
      title: 'Quarterly Growth Roadmap',
      desc: 'Actionable 90-day sprints mapping channel experiments, budget allocation, and target CAC thresholds.',
    },
    {
      title: 'Unit Economics & Attribution Model',
      desc: 'Multi-touch attribution framework connecting ad spend directly to closed-won revenue and customer LTV.',
    },
    {
      title: 'Omnichannel Acquisition Architecture',
      desc: 'Integrated paid media, technical SEO, and ABM pipelines to generate predictable inbound pipeline.',
    },
    {
      title: 'Marketing Operations & Team Governance',
      desc: 'Standard operating procedures, CRM hygiene, tooling rationalization, and specialist pod leadership.',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">FRACTIONAL C-SUITE PRACTICE</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Digital CMO: Executive Marketing Leadership on Demand
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Scale customer acquisition, optimize unit economics, and establish brand authority without
          the $350k+ overhead and equity dilution of a full-time Chief Marketing Officer.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link href="/book-consultation?type=DIGITAL_CMO">
            <Button variant="primary" size="lg" className="gap-2">
              <span>Talk to a Digital CMO</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/free-audit">
            <Button variant="secondary" size="lg">
              Get Acquisition Audit
            </Button>
          </Link>
        </div>
      </div>

      {/* Strategic Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <Target className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">CAC-to-LTV Discipline</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              We eliminate vanity impressions and focus exclusively on qualified pipeline and payback periods.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <BarChart2 className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">Full-Funnel Ownership</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              From first brand impression to CRM nurture sequences, sales enablement, and customer retention.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <ShieldCheck className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">Board-Level Reporting</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Transparent, audit-ready marketing KPIs and attribution models ready for investors and executive boards.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tangible Deliverables */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Tangible Deliverables You Receive</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every Digital CMO engagement produces concrete assets, playbooks, and systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {deliverables.map((d) => (
            <div key={d.title} className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/70 space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-orange shrink-0" />
                <h3 className="text-sm font-semibold text-white">{d.title}</h3>
              </div>
              <p className="text-xs text-slate-400 pl-6 leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Card */}
      <div className="p-8 rounded-2xl border-2 border-brand-orange bg-brand-surface/90 text-center space-y-4 shadow-[0_0_35px_rgba(255,85,0,0.2)]">
        <h3 className="text-2xl font-bold text-white">Ready for Strategic Marketing Leadership?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Schedule a preliminary 45-minute discovery session with our Digital CMO practice lead to evaluate your current acquisition channels.
        </p>
        <Link href="/book-consultation?type=DIGITAL_CMO">
          <Button variant="primary" size="lg" className="gap-2">
            <span>Schedule Digital CMO Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
