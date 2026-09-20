import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'Client Work & Architecture Case Studies | DiziBrand Media',
  description:
    'Explore DiziBrand Media client engagements, technical architectures, and growth implementations. All case studies adhere strictly to our editorial verification policy.',
};

export default function WorkPage() {
  const caseStudies = [
    {
      title: 'Autonomous Support Agent Deployment for B2B Cloud Platform',
      client: 'Confidential B2B SaaS Scale-Up',
      industry: 'SaaS & B2B Technology',
      practice: 'AI & Automation',
      challenge:
        'Rapid international customer growth overwhelmed tier-1 support engineers, causing response latency and reducing developer focus on core feature releases.',
      solution:
        'Architected an autonomous LLM agent with vector knowledgebase search and Zendesk API integration, enforcing strict accuracy guardrails.',
      verification: 'Pending verification',
      slug: 'b2b-saas-ai-triage-agent',
    },
    {
      title: 'Headless Next.js Storefront & Attribution Architecture',
      client: 'Confidential D2C Lifestyle Brand',
      industry: 'E-commerce & D2C',
      practice: 'Technology & Marketing',
      challenge:
        'Legacy monolithic e-commerce CMS suffered from slow mobile load times (LCP > 4.5s) and unreliable ad attribution across Meta and Google campaigns.',
      solution:
        'Re-platformed to a headless Next.js App Router storefront deployed on the edge, coupled with a first-party CDP attribution pipeline.',
      verification: 'Pending verification',
      slug: 'headless-nextjs-d2c-storefront',
    },
    {
      title: 'Fractional Digital CMO & B2B Pipeline Modernization',
      client: 'Confidential HealthTech Solutions Provider',
      industry: 'Healthcare & Life Sciences',
      practice: 'Leadership & Growth',
      challenge:
        'HealthTech platform required enterprise positioning and HIPAA-compliant lead funnels to target hospital networks and clinical directors.',
      solution:
        'Embedded a Fractional Digital CMO to restructure messaging, implement ABM outbound pipelines, and build audit-ready conversion tracking.',
      verification: 'Pending verification',
      slug: 'healthtech-digital-cmo-pipeline',
    },
    {
      title: 'Enterprise Core Web Vitals & International SEO Architecture',
      client: 'Confidential FinTech Global Platform',
      industry: 'BFSI & FinTech',
      practice: 'Technology & SEO',
      challenge:
        'Complex multi-region website experienced severe layout shifts (CLS > 0.3) and duplicate content penalties across US, UK, and UAE domains.',
      solution:
        'Re-engineered rendering pipeline with sub-resource integrity, canonical hreflang schemas, and server-side edge rendering.',
      verification: 'Pending verification',
      slug: 'fintech-core-web-vitals-seo',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">CLIENT WORK & ARCHITECTURE</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Real Architectures. Measurable Impact.
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Explore our client engagements across software engineering, AI agent deployment, and
          multi-channel customer acquisition.
        </p>
      </div>

      {/* Strict Editorial Integrity Banner */}
      <div className="p-4 rounded-xl border border-purple-500/40 bg-purple-950/20 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs text-purple-200">
        <div className="p-2 rounded-lg bg-purple-500/20 shrink-0">
          <ShieldCheck className="w-5 h-5 text-purple-300" />
        </div>
        <div>
          <span className="font-bold text-white block">Strict Editorial & Proof Integrity Policy:</span>
          DiziBrand Media never publishes fabricated client logos, inflated ROI claims, or synthetic testimonials. All ongoing and recently delivered engagements display a <span className="font-mono font-bold text-purple-300">[Pending verification]</span> badge until formal client sign-off is completed.
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {caseStudies.map((cs) => (
          <Card key={cs.title} className="bg-brand-charcoal/80 border-brand-border/80 hover:border-brand-orange/60 transition-all flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono text-brand-orange font-semibold">{cs.practice}</span>
                <Badge variant="pending">{cs.verification}</Badge>
              </div>
              <CardTitle className="text-xl mt-3 leading-snug">{cs.title}</CardTitle>
              <CardDescription className="text-xs text-slate-400 font-mono mt-1">
                Client: {cs.client} • Industry: {cs.industry}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-0 text-xs text-slate-300">
              <div className="space-y-2 border-t border-brand-border/40 pt-3">
                <div>
                  <span className="font-semibold text-white block mb-0.5">The Challenge:</span>
                  <p className="text-slate-400 leading-relaxed">{cs.challenge}</p>
                </div>
                <div>
                  <span className="font-semibold text-white block mb-0.5">The Solution & Architecture:</span>
                  <p className="text-slate-400 leading-relaxed">{cs.solution}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-mono">Formal Case Study in Review</span>
                <Link href="/book-consultation" className="text-xs text-brand-orange hover:underline flex items-center gap-1 font-medium">
                  <span>Discuss Similar Project</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl border-2 border-brand-orange bg-brand-surface/90 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Have a Challenging Project in Mind?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          Schedule a strategy call with our practice leads to review architectural feasibility and growth potential.
        </p>
        <Link href="/book-consultation">
          <Button variant="primary" size="lg" className="gap-2">
            <span>Book Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
