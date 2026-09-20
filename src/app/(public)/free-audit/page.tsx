import React from 'react';
import { AuditForm } from '@/components/forms/audit-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, Sparkles, FileText } from 'lucide-react';

export const metadata = {
  title: 'Free Digital Audit (Website, SEO, Ads, CRO) | DiziBrand Media',
  description:
    'Claim a free, bespoke audit of your website performance, technical SEO, conversion rate, or ad account efficiency prepared by senior practitioners.',
};

export default function FreeAuditPage() {
  const auditTypes = [
    { title: 'Website & Core Web Vitals', desc: 'Page speed, LCP/CLS/INP bottlenecks, and mobile UX rendering.' },
    { title: 'Technical & Organic SEO', desc: 'Indexation issues, internal linking hierarchy, and high-intent keyword gaps.' },
    { title: 'Conversion Rate & UX (CRO)', desc: 'Friction points in checkout/lead flows and heuristic usability review.' },
    { title: 'Paid Ad Account Efficiency', desc: 'Ad spend waste, audience saturation, and multi-touch attribution leaks.' },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <Badge variant="orange" className="font-mono">DIAGNOSTIC EVALUATION</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Claim Your Free Comprehensive Digital Audit
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Get an honest, unvarnished diagnostic report of your digital footprint. Our senior technical
            and growth leads evaluate your website, acquisition channels, and technical infrastructure.
          </p>

          <div className="space-y-4 pt-4 border-t border-brand-border/60">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Available Diagnostic Audits:
            </h3>

            {auditTypes.map((a) => (
              <div key={a.title} className="p-3.5 rounded-xl border border-brand-border bg-brand-charcoal/70">
                <div className="flex items-center gap-2 font-semibold text-white text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                  <span>{a.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 pl-5.5">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl border border-brand-border bg-brand-charcoal/60 text-xs text-slate-400 space-y-1">
            <span className="text-white font-semibold flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-brand-orange" />
              100% Free • No Obligation
            </span>
            <p>
              We deliver a detailed, personalized PDF report containing actionable findings within 48 business hours.
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <Card className="bg-brand-charcoal/90 border-brand-border shadow-2xl">
            <CardHeader>
              <CardTitle>Request Your Free Audit</CardTitle>
              <CardDescription>Enter your website URL and select the area you want evaluated</CardDescription>
            </CardHeader>
            <CardContent>
              <AuditForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
