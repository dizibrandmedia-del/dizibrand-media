import React from 'react';
import { FreelancerForm } from '@/components/forms/freelancer-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, DollarSign, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Join Our Freelancer & Specialist Network | DiziBrand Media',
  description:
    'Apply to join the vetted DiziBrand Media external specialist network. High-impact enterprise projects, competitive hourly/milestone rates, and transparent payment release.',
};

export default function FreelancersPage() {
  const benefits = [
    {
      title: 'Direct Client Engagements',
      desc: 'Work on cutting-edge Next.js, AI agent, and growth projects with ambitious global brands.',
      icon: CheckCircle2,
    },
    {
      title: 'Guaranteed Payment Terms',
      desc: 'Transparent milestone approvals and immediate disbursement upon PM sign-off in the Team Portal.',
      icon: DollarSign,
    },
    {
      title: 'Flexible Remote Contracts',
      desc: 'Take on discrete sprint deliverables or retainers matching your weekly availability.',
      icon: Clock,
    },
    {
      title: 'Clear Technical Scopes',
      desc: 'Every task comes with detailed specifications, Figma files, and acceptance criteria.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 space-y-6">
          <Badge variant="orange" className="font-mono">SPECIALIST NETWORK</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Join the DiziBrand Media Specialist Network
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            We partner with elite independent developers, AI engineers, motion designers, and growth
            specialists worldwide. Deliver high-impact work on your schedule.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border/60">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-4 rounded-xl border border-brand-border bg-brand-charcoal/70">
                  <Icon className="w-5 h-5 text-brand-orange mb-2" />
                  <h4 className="text-xs font-semibold text-white">{b.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl border border-brand-border bg-brand-charcoal/60 text-xs text-slate-400">
            <span className="text-white font-semibold block mb-1">Vetting Standards:</span>
            We review GitHub commits, live production URLs, and previous design systems. Only top 5% of applicants are accepted into the network.
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7">
          <Card className="bg-brand-charcoal/90 border-brand-border shadow-2xl">
            <CardHeader>
              <CardTitle>Freelancer Application</CardTitle>
              <CardDescription>Submit your portfolio and specialty for review</CardDescription>
            </CardHeader>
            <CardContent>
              <FreelancerForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
