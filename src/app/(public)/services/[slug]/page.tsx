import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { SERVICES_DATA, ServiceData } from '@/lib/data/services';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
  Cpu,
  Database,
  Cloud,
  Smartphone,
  Palette,
  RefreshCw,
  Phone,
  Mail,
  ChevronRight,
} from 'lucide-react';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(SERVICES_DATA).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = SERVICES_DATA[params.slug];
  if (!service) {
    return {
      title: 'Service Not Found | DiziBrand Media',
    };
  }

  return {
    title: `${service.name} | DiziBrand Media`,
    description: service.subheadline,
    openGraph: {
      title: `${service.name} | DiziBrand Media`,
      description: service.subheadline,
    },
  };
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Layers,
  Zap,
  Shield,
  Cpu,
  Database,
  Cloud,
  Smartphone,
  Bot,
  MessageCircle,
  Users,
  Target,
  BarChart3,
  TrendingUp: BarChart3,
  Globe,
  Compass,
  Palette,
  RefreshCw,
  Building2,
  Clock,
};

export default function ServiceDetailPage({ params }: PageProps) {
  const service = SERVICES_DATA[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <Link href="/" className="hover:text-brand-red-orange transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link href="/services" className="hover:text-brand-red-orange transition-colors">
          Services
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200 font-semibold truncate">{service.name}</span>
      </nav>

      {/* 1. Hero Section */}
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="orange" className="font-mono text-xs">
            {service.badge}
          </Badge>
          <Badge variant="default" className="font-mono text-xs">
            {service.category}
          </Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
          {service.headline}
        </h1>

        <p className="text-xl text-slate-200 font-medium max-w-3xl mx-auto leading-relaxed">
          {service.subheadline}
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
          {service.description}
        </p>

        {/* Primary CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
            <Button variant="primary" size="lg" className="gap-2 font-semibold">
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <a href={CONTACT_CONFIG.phone.telHref}>
            <Button
              variant="secondary"
              size="lg"
              className="gap-2 border-slate-700/90 hover:border-slate-500 bg-brand-surface/80 hover:bg-brand-surface shadow-sm"
            >
              <Phone className="w-4 h-4 text-brand-red-orange" />
              <span>Call Us: {CONTACT_CONFIG.phone.display}</span>
            </Button>
          </a>
        </div>
      </div>

      {/* 2. Key Impact Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {service.metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-6 rounded-xl border border-brand-border bg-brand-navy-soft/80 text-center space-y-2 hover:border-brand-red-orange/50 transition-colors shadow-lg"
          >
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-red-orange font-mono">
              {metric.value}
            </div>
            <h2 className="text-xs sm:text-sm font-semibold text-white">{metric.label}</h2>
            <p className="text-xs text-slate-400 leading-normal">{metric.context}</p>
          </div>
        ))}
      </div>

      {/* 3. Operational Challenges Solved */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="default" className="font-mono">CORE CHALLENGES SOLVED</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Common Bottlenecks We Eliminate
          </h2>
          <p className="text-sm text-slate-400">
            Why traditional agency retainers and fragmented internal efforts struggle to achieve durable results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {service.challenges.map((c) => (
            <Card
              key={c.title}
              className="bg-brand-navy-soft/90 border-brand-border hover:border-red-500/40 transition-colors p-6 space-y-3"
            >
              <div className="flex items-center gap-2.5 text-red-400 font-semibold text-sm">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{c.title}</span>
              </div>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{c.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* 4. Core Capabilities & Methodology */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <Badge variant="orange" className="font-mono">PRACTICE CAPABILITIES</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Engineering Precision & Execution
          </h2>
          <p className="text-sm text-slate-400">
            How our dedicated specialist pods design, build, and optimize every tier of the engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {service.capabilities.map((item) => {
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
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{item.desc}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 5. Technology Stack & Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Tech Stack Column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <Badge variant="default" className="font-mono">TECHNOLOGY ARCHITECTURE</Badge>
            <h3 className="text-2xl font-bold text-white">Production Stack & Tools</h3>
            <p className="text-xs text-slate-400">
              Modern, secure, and battle-tested technologies deployed across our engineering workflows.
            </p>
          </div>

          <div className="space-y-4">
            {service.techStack.map((tech) => (
              <div
                key={tech.category}
                className="p-5 rounded-xl border border-brand-border/80 bg-brand-navy-soft/60 space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red-orange" aria-hidden="true" />
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-red-orange">
                    {tech.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {tech.technologies.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-surface/90 border border-brand-border text-slate-200 hover:border-brand-red-orange/50 hover:text-white transition-colors"
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
        <div className="lg:col-span-6 flex flex-col h-full space-y-6">
          <div className="space-y-2">
            <Badge variant="orange" className="font-mono">DELIVERABLES</Badge>
            <h3 className="text-2xl font-bold text-white">What You Receive</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Concrete sprint milestones, full code ownership, and comprehensive documentation.
            </p>
          </div>

          <div className="flex-1 p-6 rounded-xl border border-brand-border bg-brand-navy-soft/80 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {service.deliverables.map((del) => (
                <div key={del} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-brand-border/60 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Bi-weekly sprint deliverables
              </span>
              <span className="text-brand-red-orange font-medium font-mono">100% IP Ownership</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Service FAQs */}
      {service.faqs.length > 0 && (
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <Badge variant="default" className="font-mono">FREQUENTLY ASKED QUESTIONS</Badge>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              Common Questions About {service.name}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {service.faqs.map((faq) => (
              <Card key={faq.question} className="bg-brand-navy-soft border-brand-border p-6 space-y-2">
                <h3 className="text-sm sm:text-base font-semibold text-white">{faq.question}</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 7. Bottom Conversion Banner */}
      <div className="p-8 sm:p-12 rounded-2xl border border-brand-red-orange/50 bg-gradient-to-br from-brand-red-orange/15 via-brand-navy-soft to-brand-navy-soft text-center space-y-6 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Deploy {service.name}?
          </h2>
          <p className="text-sm text-slate-300">
            Speak directly with our practice leads to audit your current architecture, review your growth targets, and architect a customized execution plan.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
            <Button variant="primary" size="lg" className="gap-2 font-semibold">
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <a href={CONTACT_CONFIG.phone.telHref}>
            <Button variant="secondary" size="lg" className="gap-2">
              <Phone className="w-4 h-4 text-brand-red-orange" />
              <span>{CONTACT_CONFIG.phone.display}</span>
            </Button>
          </a>

          <a href={CONTACT_CONFIG.email.mailtoHref}>
            <Button variant="secondary" size="lg" className="gap-2">
              <Mail className="w-4 h-4 text-brand-red-orange" />
              <span>{CONTACT_CONFIG.email.primary}</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
