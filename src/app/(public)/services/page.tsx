import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  TrendingUp,
  Cpu,
  Bot,
  BarChart3,
  Rocket,
  ArrowRight,
  Code2,
  Smartphone,
  Cloud,
  Search,
  Share2,
  Palette,
  Database,
  LineChart,
  RefreshCw,
  Users2,
  ChevronRight,
} from 'lucide-react';

export const metadata = {
  title: 'Full-Spectrum Capabilities & Solutions | DiziBrand Media',
  description:
    'Explore DiziBrand Media capabilities across Marketing & Growth, Technology & Software, AI & Automation, Data Analytics, and Executive Leadership.',
};

export default function ServicesPage() {
  const categories = [
    {
      name: 'Fractional Executive Leadership',
      badge: 'C-Suite on Demand',
      icon: TrendingUp,
      services: [
        {
          title: 'Digital CMO',
          desc: 'Strategic brand positioning, multi-channel customer acquisition engine, and CAC/LTV optimization.',
          href: '/digital-cmo',
        },
        {
          title: 'Digital CTO',
          desc: 'Enterprise software architecture, cloud infrastructure, AI adoption roadmaps, and security governance.',
          href: '/digital-cto',
        },
        {
          title: 'Digital Transformation Advisory',
          desc: 'Re-platforming legacy business operations into modern cloud-native architectures.',
          href: '/services/technology',
        },
      ],
    },
    {
      name: 'Technology & Software Engineering',
      badge: 'Production-Ready Code',
      icon: Code2,
      services: [
        {
          title: 'Enterprise Website Development',
          desc: 'High-performance corporate Next.js & React web applications optimized for Core Web Vitals and conversions.',
          href: '/services/website-development',
        },
        {
          title: 'Custom Software & APIs',
          desc: 'Mission-critical web applications, microservices, and secure backend integrations.',
          href: '/services/software-development',
        },
        {
          title: 'Mobile App Development',
          desc: 'Cross-platform iOS and Android applications built with React Native and Flutter.',
          href: '/services/app-development',
        },
        {
          title: 'SaaS Platform Development',
          desc: 'Multi-tenant cloud architectures, subscription billing, and enterprise role-based access control.',
          href: '/services/saas-development',
        },
        {
          title: 'CRM / ERP Engineering',
          desc: 'Enterprise implementations and custom extensions for Salesforce, HubSpot, and internal databases.',
          href: '/services/crm-erp',
        },
      ],
    },
    {
      name: 'AI & Autonomous Automation',
      badge: 'Intelligent Workflows',
      icon: Bot,
      services: [
        {
          title: 'Autonomous AI Agents',
          desc: 'Custom trained LLM agents that execute tasks, query internal knowledgebases, and trigger API actions 24/7.',
          href: '/services/ai-agents',
        },
        {
          title: 'Robotic Process Automation',
          desc: 'Automating high-volume repetitive workflows across customer support, finance, and operations.',
          href: '/services/ai-automation',
        },
      ],
    },
    {
      name: 'Marketing & Customer Acquisition',
      badge: 'Data-Driven Growth',
      icon: Rocket,
      services: [
        {
          title: 'Performance Marketing',
          desc: 'Precision paid advertising across Meta, Google, LinkedIn, and programmatic channels.',
          href: '/services/performance-marketing',
        },
        {
          title: 'B2B Lead Generation & ABM',
          desc: 'High-intent outbound pipelines, account-based marketing, and automated nurture sequences.',
          href: '/services/lead-generation',
        },
        {
          title: 'Technical & Global SEO',
          desc: 'Modern search engine optimization, structured data schemas, and multi-region localization.',
          href: '/services/seo',
        },
        {
          title: 'Brand Identity & CRO',
          desc: 'Visual identity systems, messaging playbooks, and conversion rate optimization.',
          href: '/services/branding',
        },
      ],
    },
    {
      name: 'Data Analytics & Business Intelligence',
      badge: 'Attribution & Forecasting',
      icon: BarChart3,
      services: [
        {
          title: 'Multi-Touch Attribution',
          desc: 'Accurate tracking across complex customer journeys to measure true channel ROI.',
          href: '/services/data-analytics',
        },
        {
          title: 'Executive BI Dashboards',
          desc: 'Custom real-time Looker, PowerBI, and web dashboards tracking MRR, churn, and gross margins.',
          href: '/services/business-intelligence',
        },
      ],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-400 font-mono">
        <Link href="/" className="hover:text-brand-red-orange transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200 font-semibold">Services</span>
      </nav>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">FULL-SPECTRUM CAPABILITIES</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Everything You Need to Build, Market, Automate & Scale
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Explore our integrated practice areas. From fractional executive advisory to production-ready
          software engineering and autonomous AI agents, we provide an extended strategic team.
        </p>
      </div>

      {/* Categories */}
      <div className="space-y-14">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.name} className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-border/60 pb-3">
                <Icon className="w-6 h-6 text-brand-orange" />
                <h2 className="text-xl sm:text-2xl font-bold text-white">{cat.name}</h2>
                <Badge variant="default" className="text-[10px] font-mono ml-auto">
                  {cat.badge}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.services.map((s) => (
                  <Link key={s.title} href={s.href} className="group block">
                    <Card className="h-full bg-brand-charcoal/80 border-brand-border/70 hover:border-brand-orange/60 transition-all flex flex-col justify-between">
                      <CardHeader>
                        <CardTitle className="text-base group-hover:text-brand-orange transition-colors">
                          {s.title}
                        </CardTitle>
                        <CardDescription className="text-xs leading-relaxed mt-2 text-slate-400">
                          {s.desc}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-1 text-xs text-brand-orange font-medium mt-2">
                          <span>Explore capability</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="p-8 rounded-2xl border-2 border-brand-orange bg-brand-surface/90 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Need a Customized Pod of Capabilities?</h3>
        <p className="text-sm text-slate-300 max-w-xl mx-auto">
          We combine marketing, technology, AI, and leadership to fit your exact business stage.
        </p>
        <Link href="/book-consultation">
          <Button variant="primary" size="lg" className="gap-2">
            <span>Schedule a Strategy Session</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
