import React from 'react';
import { ConsultationForm } from '@/components/forms/consultation-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, Calendar, Users } from 'lucide-react';

export const metadata = {
  title: 'Book a Strategy Consultation | DiziBrand Media',
  description:
    'Schedule a 45-minute executive consultation with our Digital CMO or Digital CTO practice leads to review your growth and technology architecture.',
};

export default function BookConsultationPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Context & Trust */}
        <div className="lg:col-span-5 space-y-6">
          <Badge variant="orange" className="font-mono">EXECUTIVE CONSULTATION</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Schedule a Strategy Call With a Practice Lead
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            No sales pitch. You will speak directly with an experienced executive—either our Digital CMO
            or Digital CTO—to evaluate your current bottlenecks and explore concrete growth levers.
          </p>

          <div className="space-y-4 pt-4 border-t border-brand-border/60">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              What to Expect:
            </h3>

            <div className="flex items-start gap-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>45-minute structured video discovery session via Google Meet / Zoom</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Diagnostic review of your current customer acquisition channels or tech stack</span>
            </div>
            <div className="flex items-start gap-3 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Actionable recommendations you can implement regardless of partnering with us</span>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-brand-border bg-brand-charcoal/60 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Shield className="w-4 h-4 text-brand-orange" />
              <span>Strict Confidentiality Guaranteed</span>
            </div>
            <p>
              All proprietary business metrics, architectural details, and growth data shared during the consultation are covered under mutual non-disclosure.
            </p>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <Card className="bg-brand-charcoal/90 border-brand-border shadow-2xl">
            <CardHeader>
              <CardTitle>Select Your Consultation Details</CardTitle>
              <CardDescription>Reserve your preferred date and executive practice</CardDescription>
            </CardHeader>
            <CardContent>
              <ConsultationForm initialType={searchParams.type} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
