import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cpu, CheckCircle2, ArrowRight, ShieldCheck, Code2, Zap } from 'lucide-react';

export const metadata = {
  title: 'Digital CTO (Fractional CTO) | DiziBrand Media',
  description:
    'On-demand Chief Technology Officer leadership. Enterprise software architecture, cloud infrastructure, AI adoption roadmaps, and engineering governance.',
};

export default function DigitalCTOPage() {
  const deliverables = [
    {
      title: 'Enterprise Architecture Specification',
      desc: 'Comprehensive system blueprints detailing microservices, API contracts, database schemas, and data pipelines.',
    },
    {
      title: 'AI Agent & LLM Deployment Roadmap',
      desc: 'Strategic evaluation of internal operational bottlenecks and phased rollout of autonomous AI agents.',
    },
    {
      title: 'Cloud Infrastructure & Security Audit',
      desc: 'Rigorous review of AWS/GCP/Azure costs, security permissions, SOC2 readiness, and disaster recovery plans.',
    },
    {
      title: 'Engineering Governance & Velocity Playbook',
      desc: 'CI/CD pipeline standards, code review protocols, and developer velocity benchmarks.',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Hero Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">FRACTIONAL C-SUITE PRACTICE</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Digital CTO: Enterprise Tech & AI Architecture on Demand
        </h1>
        <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
          Steer your software engineering, cloud infrastructure, and AI transformation with veteran
          technical leadership without hiring a $350k+ full-time executive.
        </p>
        <div className="pt-4 flex flex-wrap justify-center gap-4">
          <Link href="/book-consultation?type=DIGITAL_CTO">
            <Button variant="primary" size="lg" className="gap-2">
              <span>Talk to a Digital CTO</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/free-audit">
            <Button variant="secondary" size="lg">
              Get Tech Stack Audit
            </Button>
          </Link>
        </div>
      </div>

      {/* Strategic Focus Areas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <Cpu className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">AI Transformation</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Transition from manual operations to autonomous LLM agents with verifiable accuracy and security guardrails.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <Code2 className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">Engineering Velocity</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Establish standardized sprint cadences, automated testing, and CI/CD pipelines to double feature delivery speed.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <ShieldCheck className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">Security & Compliance</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Multi-tenant data isolation, OWASP Top 10 mitigation, GDPR/DPDP data compliance, and enterprise audit trails.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Deliverables */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Architectural Deliverables You Receive</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every Digital CTO engagement delivers actionable, production-grade technical blueprints.
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

      {/* CTA Box */}
      <div className="p-8 rounded-2xl border-2 border-brand-orange bg-brand-surface/90 text-center space-y-4 shadow-[0_0_35px_rgba(255,85,0,0.2)]">
        <h3 className="text-2xl font-bold text-white">Need Senior Technical Leadership?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Book a 45-minute discovery session with our Digital CTO practice lead to review your current architecture and cloud roadmap.
        </p>
        <Link href="/book-consultation?type=DIGITAL_CTO">
          <Button variant="primary" size="lg" className="gap-2">
            <span>Schedule Digital CTO Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
