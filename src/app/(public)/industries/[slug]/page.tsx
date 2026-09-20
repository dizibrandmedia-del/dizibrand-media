import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { INDUSTRIES_DATA, IndustryData } from '@/lib/data/industries';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Shield,
  Layers,
  BarChart3,
  Bot,
  Target,
  Code2,
  Clock,
  Globe,
  Building2,
  MessageCircle,
  Compass,
  Users,
  Calendar,
} from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(INDUSTRIES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const industry = INDUSTRIES_DATA[params.slug];
  if (!industry) {
    return {
      title: 'Industry Not Found | DiziBrand Media',
    };
  }

  return {
    title: `${industry.name} Solutions & Architecture | DiziBrand Media`,
    description: industry.subheadline,
    openGraph: {
      title: `${industry.name} | DiziBrand Media`,
      description: industry.subheadline,
    },
  };
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Target,
  Bot,
  Code2,
  BarChart3,
  Zap,
  Layers,
  TrendingUp: BarChart3,
  Clock,
  Building2,
  MessageCircle,
  Shield,
  Compass,
  Globe,
  Users,
};

export default function IndustryDetailPage({ params }: PageProps) {
  const industry = INDUSTRIES_DATA[params.slug];

  if (!industry) {
    notFound();
  }

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* 1. Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <Badge variant="orange" className="font-mono">
          {industry.badge}
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          {industry.headline}
        </h1>

        <p className="text-xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed">
          {industry.subheadline}
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {industry.description}
        </p>

        {/* Primary CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href="/book-consultation">
            <Button variant="primary" size="lg" className="gap-2">
              <span>Book an Industry Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href={`/contact?service=${encodeURIComponent(industry.name)}`}>
            <Button variant="secondary" size="lg">
              <span>Request Solution Proposal</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {industry.metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-6 rounded-xl border border-brand-border bg-brand-navy-soft/80 text-center space-y-2 hover:border-brand-red-orange/50 transition-colors"
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-red-orange font-mono">
              {metric.value}
            </div>
            <h2 className="text-xs sm:text-sm font-semibold text-white">{metric.label}</h2>
            <p className="text-[11px] text-slate-400">{metric.context}</p>
          </div>
        ))}
      </div>

      {/* 3. Market Challenges Section */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="default" className="font-mono">INDUSTRY CHALLENGES</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Why Standard Agency Playbooks Fail in {industry.name}
          </h2>
          <p className="text-sm text-slate-400">
            Specialized verticals face unique regulatory, economic, and technical bottlenecks that
            cannot be solved with cookie-cutter marketing campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {industry.challenges.map((c) => (
            <Card
              key={c.title}
              className="bg-brand-navy-soft/90 border-brand-border hover:border-red-500/40 transition-colors p-6 space-y-3"
            >
              <div className="flex items-center gap-2.5 text-red-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{c.title}</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. DiziBrand Growth & Technology Playbook */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="orange" className="font-mono">OUR SPECIALIZED PLAYBOOK</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            How DiziBrand Media Engineers Unfair Advantages
          </h2>
          <p className="text-sm text-slate-400">
            We unite executive leadership, high-velocity Next.js software development, autonomous AI
            agents, and closed-loop data attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {industry.playbook.map((item) => {
            const IconComponent = ICON_MAP[item.icon] || Zap;
            return (
              <Card
                key={item.title}
                className="bg-brand-navy-soft border-brand-border hover:border-brand-red-orange/50 transition-colors p-6 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-red-orange">
                  <IconComponent className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 5. Enterprise Tech Stack & Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tech Stack Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <Badge variant="default" className="font-mono">TECHNOLOGY ARCHITECTURE</Badge>
            <h3 className="text-2xl font-bold text-white">Recommended Stack & Integrations</h3>
            <p className="text-xs text-slate-400">
              Modern, decoupled, and secure infrastructure tailored for {industry.name}.
            </p>
          </div>

          <div className="space-y-4">
            {industry.techStack.map((tech) => (
              <div
                key={tech.category}
                className="p-4 rounded-xl border border-brand-border bg-brand-navy-soft/60 space-y-2"
              >
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-red-orange">
                  {tech.category}
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {tech.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-brand-surface border border-brand-border text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <Badge variant="orange" className="font-mono">CORE DELIVERABLES</Badge>
            <h3 className="text-2xl font-bold text-white">What We Build & Deliver</h3>
            <p className="text-xs text-slate-400">
              Concrete sprint milestones delivered by our dedicated specialist pods.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-brand-border bg-brand-navy-soft/80 space-y-4">
            {industry.deliverables.map((del) => (
              <div key={del} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{del}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6. Industry FAQs */}
      {industry.faqs.length > 0 && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="default" className="font-mono">FREQUENTLY ASKED QUESTIONS</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Questions Regarding Our {industry.name} Engagements
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {industry.faqs.map((faq) => (
              <Card key={faq.question} className="bg-brand-navy-soft border-brand-border p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-semibold text-white">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 7. Bottom Conversion Banner */}
      <div className="p-8 sm:p-12 rounded-2xl border border-brand-red-orange/50 bg-gradient-to-br from-brand-red-orange/15 via-brand-navy-soft to-brand-navy-soft text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Accelerate Growth in {industry.name}?
          </h2>
          <p className="text-sm text-slate-300">
            Book a dedicated working session with our Digital CMO and Digital CTO practice leads to
            audit your existing funnel, tech stack, and growth opportunities.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/book-consultation">
            <Button variant="primary" size="lg" className="gap-2 font-semibold">
              <span>Book Executive Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href={`/contact?service=${encodeURIComponent(industry.name)}`}>
            <Button variant="secondary" size="lg">
              <span>Request Custom Proposal</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
