'use client';

import React from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ArrowRight,
  Code2,
  Cpu,
  TrendingUp,
  Globe,
  Smartphone,
  Bot,
  Sparkles,
  BarChart3,
  Layers,
  Search,
  Palette,
  Rocket,
  Cloud,
  Database,
  Building2,
  ShoppingCart,
  Home,
  HeartPulse,
  GraduationCap,
  Landmark,
  Truck,
} from 'lucide-react';

export const ENGINEERING_SERVICES = [
  {
    name: 'Website Development',
    desc: 'Ultra-fast Next.js 14 web platforms & apps',
    href: '/services/website-development',
    icon: Globe,
  },
  {
    name: 'Custom Software',
    desc: 'Scalable backend architectures & microservices',
    href: '/services/software-development',
    icon: Code2,
  },
  {
    name: 'SaaS Product Engineering',
    desc: 'Multi-tenant web applications & dashboards',
    href: '/services/saas-development',
    icon: Layers,
  },
  {
    name: 'Mobile App Development',
    desc: 'High-performance React Native & Flutter apps',
    href: '/services/app-development',
    icon: Smartphone,
  },
  {
    name: 'Cloud & DevOps Engineering',
    desc: 'AWS, GCP, CI/CD pipelines & Docker orchestration',
    href: '/services/technology',
    icon: Cloud,
  },
];

export const AI_DATA_SERVICES = [
  {
    name: 'AI & Workflow Automation',
    desc: 'Custom n8n, Make, and API automated pipelines',
    href: '/services/ai-automation',
    icon: Cpu,
  },
  {
    name: 'Autonomous AI Agents',
    desc: 'LLM agents, RAG systems & conversational AI',
    href: '/services/ai-agents',
    icon: Bot,
  },
  {
    name: 'Data Analytics & Attribution',
    desc: 'Server-side tracking, GA4 & pipeline analytics',
    href: '/services/data-analytics',
    icon: BarChart3,
  },
  {
    name: 'Business Intelligence',
    desc: 'Executive KPI dashboards & data warehousing',
    href: '/services/business-intelligence',
    icon: Database,
  },
  {
    name: 'CRM & ERP Integrations',
    desc: 'HubSpot, Salesforce, Zoho custom workflows',
    href: '/services/crm-erp',
    icon: Sparkles,
  },
];

export const GROWTH_SERVICES = [
  {
    name: 'Performance Marketing',
    desc: 'High-ROAS Meta, Google & LinkedIn ad campaigns',
    href: '/services/performance-marketing',
    icon: TrendingUp,
  },
  {
    name: 'B2B Lead Generation',
    desc: 'Cold outbound, LinkedIn automation & funnels',
    href: '/services/lead-generation',
    icon: Rocket,
  },
  {
    name: 'Enterprise SEO',
    desc: 'Technical SEO, content velocity & organic dominance',
    href: '/services/seo',
    icon: Search,
  },
  {
    name: 'Brand Identity & Design',
    desc: 'Visual systems, UI/UX design & brand strategy',
    href: '/services/branding',
    icon: Palette,
  },
  {
    name: 'Full-Funnel Growth',
    desc: 'Lifecycle retention, CRO & revenue operations',
    href: '/services/marketing-and-growth',
    icon: Sparkles,
  },
];

const INDUSTRIES = [
  {
    name: 'SaaS & B2B',
    desc: 'Pipeline acceleration & CAC reduction',
    href: '/industries/saas-b2b',
    icon: Cpu,
  },
  {
    name: 'Ecommerce & D2C',
    desc: 'High-converting stores & ROAS scaling',
    href: '/industries/ecommerce-d2c',
    icon: ShoppingCart,
  },
  {
    name: 'Real Estate & PropTech',
    desc: 'High-ticket buyers & verified investor leads',
    href: '/industries/real-estate-proptech',
    icon: Home,
  },
  {
    name: 'Healthcare & HealthTech',
    desc: 'HIPAA-compliant platforms & patient funnels',
    href: '/industries/healthcare-healthtech',
    icon: HeartPulse,
  },
  {
    name: 'Education & EdTech',
    desc: 'Student enrollments & LMS platforms',
    href: '/industries/education-edtech',
    icon: GraduationCap,
  },
  {
    name: 'BFSI & FinTech',
    desc: 'Institutional trust & secure customer acquisition',
    href: '/industries/bfsi-fintech',
    icon: Landmark,
  },
  {
    name: 'Manufacturing & Logistics',
    desc: 'B2B supply chain inquiries & ERP portals',
    href: '/industries/manufacturing-logistics',
    icon: Truck,
  },
];

export function DesktopNavigation() {
  return (
    <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
      {/* 1. Capabilities / Services Mega Menu Dropdown */}
      <div className="relative group py-4">
        <Link
          href="/services"
          className="flex items-center gap-1.5 transition-colors group-hover:text-brand-red-orange hover:text-white"
        >
          <span>Capabilities</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-brand-red-orange" />
        </Link>

        {/* Services Mega Menu Dropdown Panel (CSS Group Hover with 0ms lag) */}
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto absolute left-1/2 -translate-x-1/2 top-full pt-1 w-[880px] z-50">
          <div className="rounded-2xl border border-brand-border/80 bg-[#070B14]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Header Bar */}
            <div className="px-6 py-3.5 bg-[#0B1120] border-b border-brand-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-red-orange animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  Enterprise Capabilities & Delivery Practices
                </span>
              </div>
              <Link
                href="/services"
                className="text-xs font-semibold text-brand-red-orange hover:underline flex items-center gap-1"
              >
                <span>Explore All 15 Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 3-Column Services Grid */}
            <div className="p-6 grid grid-cols-3 gap-6">
              {/* Column 1: Engineering & Web */}
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-brand-red-orange font-semibold mb-3 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5" />
                  Engineering & Web
                </h4>
                <div className="space-y-1">
                  {ENGINEERING_SERVICES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group/item block p-2 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <item.icon className="w-4 h-4 text-slate-400 group-hover/item:text-brand-red-orange shrink-0 mt-0.5 transition-colors" />
                        <div>
                          <div className="text-xs font-semibold text-slate-200 group-hover/item:text-white transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 2: AI & Data */}
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-brand-red-orange font-semibold mb-3 flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  AI, Automation & Data
                </h4>
                <div className="space-y-1">
                  {AI_DATA_SERVICES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group/item block p-2 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <item.icon className="w-4 h-4 text-slate-400 group-hover/item:text-brand-red-orange shrink-0 mt-0.5 transition-colors" />
                        <div>
                          <div className="text-xs font-semibold text-slate-200 group-hover/item:text-white transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Column 3: Growth & Performance */}
              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-brand-red-orange font-semibold mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Growth & Performance
                </h4>
                <div className="space-y-1">
                  {GROWTH_SERVICES.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group/item block p-2 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start gap-2.5">
                        <item.icon className="w-4 h-4 text-slate-400 group-hover/item:text-brand-red-orange shrink-0 mt-0.5 transition-colors" />
                        <div>
                          <div className="text-xs font-semibold text-slate-200 group-hover/item:text-white transition-colors">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 leading-tight">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Callout Bar */}
            <div className="px-6 py-3 bg-[#0B1120]/80 border-t border-brand-border/50 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Need a tailored combination of engineering and growth marketing?
              </span>
              <Link
                href="/book-consultation"
                className="font-semibold text-brand-red-orange hover:text-white transition-colors flex items-center gap-1"
              >
                <span>Book Architecture Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Fractional Digital CMO */}
      <Link href="/digital-cmo" className="hover:text-brand-red-orange transition-colors">
        Digital CMO
      </Link>

      {/* 3. Fractional Digital CTO */}
      <Link href="/digital-cto" className="hover:text-brand-red-orange transition-colors">
        Digital CTO
      </Link>

      {/* 4. Industries Dropdown */}
      <div className="relative group py-4">
        <Link
          href="/industries"
          className="flex items-center gap-1.5 transition-colors group-hover:text-brand-red-orange hover:text-white"
        >
          <span>Industries</span>
          <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-brand-red-orange" />
        </Link>

        {/* Industries Dropdown Panel (CSS Group Hover with 0ms lag) */}
        <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto absolute left-1/2 -translate-x-1/2 top-full pt-1 w-[620px] z-50">
          <div className="rounded-2xl border border-brand-border/80 bg-[#070B14]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Header */}
            <div className="px-6 py-3.5 bg-[#0B1120] border-b border-brand-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-brand-red-orange" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                  Tailored Industry Verticals
                </span>
              </div>
              <Link
                href="/industries"
                className="text-xs font-semibold text-brand-red-orange hover:underline flex items-center gap-1"
              >
                <span>View All 7 Verticals</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* 2-Column Industries Grid */}
            <div className="p-5 grid grid-cols-2 gap-3">
              {INDUSTRIES.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group/ind flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-brand-border/50 transition-all"
                >
                  <div className="p-2 rounded-lg bg-brand-navy-soft border border-brand-border/60 text-brand-red-orange group-hover/ind:scale-110 transition-transform shrink-0">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200 group-hover/ind:text-brand-red-orange transition-colors">
                      {item.name}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight mt-0.5">
                      {item.desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Bottom Footer */}
            <div className="px-6 py-3 bg-[#0B1120]/80 border-t border-brand-border/50 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Custom GTM strategies & enterprise tech for your specific sector.
              </span>
              <Link
                href="/industries"
                className="font-semibold text-brand-red-orange hover:text-white transition-colors"
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Work / Case Studies */}
      <Link href="/work" className="hover:text-brand-red-orange transition-colors">
        Work
      </Link>

      {/* 6. Insights */}
      <Link href="/insights" className="hover:text-brand-red-orange transition-colors">
        Insights
      </Link>

      {/* 7. About Us */}
      <Link href="/about" className="hover:text-brand-red-orange transition-colors">
        About
      </Link>
    </nav>
  );
}
