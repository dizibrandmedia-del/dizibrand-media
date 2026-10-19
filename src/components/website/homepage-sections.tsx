import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Cpu,
  Bot,
  BarChart3,
  Rocket,
  Shield,
  CheckCircle2,
  ArrowRight,
  Globe,
  Layers,
  Users,
  Code2,
  Sparkles,
  Zap,
  Building2,
  Clock,
  Compass,
} from 'lucide-react';

// ----------------------------------------------------
// SECTION 2: Global Positioning / Trust
// ----------------------------------------------------
export function SectionGlobalPositioning() {
  const pillars = [
    {
      title: 'Extended Strategic Team',
      desc: 'We do not operate as an outsourced vendor. Our partners, engineers, and growth leads embed directly within your executive workflows.',
      icon: Users,
    },
    {
      title: 'Engineering-Grade Rigor',
      desc: 'Software architecture, AI agents, and marketing pipelines built on strict, production-ready enterprise standards.',
      icon: Shield,
    },
    {
      title: 'Unit Economic Alignment',
      desc: 'Every campaign and technical deliverable is tied directly to customer acquisition cost (CAC), lifetime value (LTV), and revenue growth.',
      icon: TrendingUp,
    },
    {
      title: 'Global Operating Model',
      desc: 'Serving high-growth enterprises and ambitious scale-ups across North America, Europe, the Middle East, India, and APAC.',
      icon: Globe,
    },
  ];

  return (
    <section className="py-20 border-t border-brand-border/60 bg-brand-charcoal/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="orange" className="mb-3 font-mono">
            GLOBAL OPERATING MODEL
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Built for Decision-Makers Who Value Accountability
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            DiziBrand Media bridges the gap between high-level management consultancies and tactical
            freelance execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <Card key={p.title} className="bg-brand-charcoal/80 border-brand-border/70 hover:border-brand-orange/50 transition-all">
                <CardContent className="pt-6">
                  <div className="w-10 h-10 rounded-lg bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 3: One Partner / Multiple Capabilities
// ----------------------------------------------------
export function SectionOnePartner() {
  return (
    <section className="py-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="default" className="mb-3 font-mono">
              UNIFIED ADVANTAGE
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              One Accountable Partner. Full-Spectrum Execution.
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              When marketing and technology are managed in silos, companies burn capital on disjointed
              tools, misaligned KPIs, and communication latency.
            </p>
            <p className="mt-3 text-slate-400 text-sm leading-relaxed">
              DiziBrand Media unites executive leadership, full-stack software development,
              autonomous AI agents, and performance acquisition under one cohesive delivery framework.
            </p>

            <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero agency finger-pointing between dev and ad teams</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Single consolidated portal for milestones, invoices, and deliverables</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>On-demand scaling of specialists as your business grows</span>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/services">
                <Button variant="primary" size="md" className="gap-2">
                  <span>Explore All Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Comparison Matrix Box */}
          <div className="p-6 rounded-2xl border border-brand-border bg-brand-charcoal/80 space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 font-mono">
              Delivery Model Comparison
            </h3>

            <div className="p-4 rounded-xl border border-red-900/40 bg-red-950/20 text-xs text-red-300 space-y-1">
              <span className="font-bold uppercase tracking-wider text-red-400 block">
                ❌ The Fragmented Agency Model
              </span>
              <p>Agency A handles SEO, Agency B runs ads, Dev Shop C builds the website. No one owns the revenue outcome.</p>
            </div>

            <div className="p-4 rounded-xl border-2 border-brand-orange bg-brand-surface/70 text-xs text-slate-200 space-y-2 shadow-[0_0_25px_rgba(255,85,0,0.2)]">
              <div className="flex items-center justify-between">
                <span className="font-bold uppercase tracking-wider text-brand-orange font-mono">
                  ✓ The DiziBrand Integrated Model
                </span>
                <Badge variant="orange">Full Alignment</Badge>
              </div>
              <p className="text-slate-300">
                Digital CMO & CTO coordinate acquisition, software engineering, and AI pipelines in lockstep with shared KPIs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 4: Digital CMO / Digital CTO
// ----------------------------------------------------
export function SectionDigitalExecs() {
  return (
    <section className="py-20 border-t border-brand-border/60 bg-brand-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Badge variant="orange" className="mb-3 font-mono">
            FRACTIONAL EXECUTIVE LEADERSHIP
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            C-Suite Leadership Without Full-Time Overhead
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Access senior leadership to steer your growth strategy, technology architecture, and AI
            transformation at a fraction of full-time executive cost.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Digital CMO Card */}
          <Card className="bg-brand-charcoal/90 border-brand-border/80 hover:border-brand-orange/60 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="orange" className="font-mono">PRACTICE LEADERSHIP</Badge>
                <TrendingUp className="w-5 h-5 text-brand-orange" />
              </div>
              <CardTitle className="text-2xl mt-3">Digital CMO (Fractional CMO)</CardTitle>
              <CardDescription>
                Strategic marketing leadership embedded within your executive team.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                Directing your brand positioning, multi-channel customer acquisition engine, and
                board-level revenue reporting.
              </p>
              <div className="space-y-2 border-t border-brand-border/50 pt-4">
                <span className="font-semibold text-white block text-xs uppercase tracking-wider font-mono">
                  Key Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Quarterly Growth Roadmap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Unit Economics & CAC/LTV Model</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Omnichannel Acquisition Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Marketing Operations & Tech Stack</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/digital-cmo">
                  <Button variant="secondary" size="md" className="w-full gap-2">
                    <span>Explore Digital CMO Offering</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Digital CTO Card */}
          <Card className="bg-brand-charcoal/90 border-brand-border/80 hover:border-brand-orange/60 transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="orange" className="font-mono">PRACTICE LEADERSHIP</Badge>
                <Cpu className="w-5 h-5 text-brand-orange" />
              </div>
              <CardTitle className="text-2xl mt-3">Digital CTO (Fractional CTO)</CardTitle>
              <CardDescription>
                Enterprise technology and AI architecture leadership on demand.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs sm:text-sm">
              <p className="text-slate-300 leading-relaxed">
                Elite technical leadership steering cloud infrastructure, engineering governance, AI
                adoption roadmaps, and security compliance.
              </p>
              <div className="space-y-2 border-t border-brand-border/50 pt-4">
                <span className="font-semibold text-white block text-xs uppercase tracking-wider font-mono">
                  Key Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>System Architecture Blueprint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Cloud & Security Audit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>AI & Agent Deployment Roadmap</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-orange" />
                    <span>DevOps & Velocity Optimization</span>
                  </div>
                </div>
              </div>
              <div className="pt-4">
                <Link href="/digital-cto">
                  <Button variant="secondary" size="md" className="w-full gap-2">
                    <span>Explore Digital CTO Offering</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 5: Strong Team / Expertise
// ----------------------------------------------------
export function SectionTeamExpertise() {
  const practices = [
    { title: 'Executive Advisory', count: '10+ Years Avg Exp', desc: 'Seasoned C-suite strategists and founders.' },
    { title: 'AI & Data Engineering', count: 'Enterprise Standards', desc: 'LLM agents, vector pipelines, and modern data stack.' },
    { title: 'Full-Stack Software', count: 'Next.js & Cloud Native', desc: 'Scalable APIs, SaaS architecture, and mobile apps.' },
    { title: 'Performance Growth', count: 'Data-Driven ROI', desc: 'High-intent B2B lead gen, paid acquisition, and CRO.' },
  ];

  return (
    <section className="py-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="default" className="mb-3 font-mono">
          CROSS-DISCIPLINARY EXPERTISE
        </Badge>
        <h2 className="text-3xl font-bold tracking-tight text-white">
          A Senior Team Built for Immediate Velocity
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          No junior account reps managing enterprise engagements. Every project is led by proven
          practitioners with deep domain expertise.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {practices.map((pr) => (
            <div key={pr.title} className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/70 text-left">
              <span className="text-xs font-mono font-bold text-brand-orange">{pr.count}</span>
              <h3 className="text-base font-semibold text-white mt-1">{pr.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{pr.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 6: Marketing Capabilities
// ----------------------------------------------------
export function SectionMarketing() {
  const services = [
    { title: 'Performance Marketing', desc: 'Precision paid acquisition across Meta, Google, LinkedIn, and programmatic channels.', link: '/services/performance-marketing' },
    { title: 'B2B Lead Generation', desc: 'High-intent outbound pipelines, account-based marketing (ABM), and inbound magnets.', link: '/services/lead-generation' },
    { title: 'Technical & Global SEO', desc: 'Architectural SEO, structured data, content velocity, and multi-region localization.', link: '/services/seo' },
    { title: 'Brand & Positioning', desc: 'Distinctive brand identity systems, messaging guides, and conversion rate optimization.', link: '/services/branding' },
  ];

  return (
    <section className="py-20 border-t border-brand-border/60 bg-brand-charcoal/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <Badge variant="orange" className="mb-3 font-mono">PRACTICE: MARKETING & GROWTH</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white">Data-Driven Customer Acquisition</h2>
            <p className="mt-2 text-sm text-slate-400">Sustainable customer acquisition tied strictly to unit economics.</p>
          </div>
          <Link href="/services/marketing-and-growth" className="mt-4 sm:mt-0 text-xs text-brand-orange hover:underline font-mono">
            View Marketing Services →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Link key={s.title} href={s.link} className="block group">
              <div className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/90 hover:border-brand-orange/60 transition-all h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-brand-orange transition-colors">{s.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{s.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 group-hover:text-brand-orange">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 7: Technology Capabilities
// ----------------------------------------------------
export function SectionTechnology() {
  const tech = [
    { title: 'Website Development', desc: 'Ultra-fast corporate Next.js applications engineered for conversion and Core Web Vitals.', link: '/services/website-development' },
    { title: 'Custom Software & APIs', desc: 'Mission-critical web applications, microservices, and backend integrations.', link: '/services/software-development' },
    { title: 'App Development', desc: 'Cross-platform mobile applications built for iOS and Android with React Native / Flutter.', link: '/services/app-development' },
    { title: 'SaaS Architecture', desc: 'Multi-tenant cloud applications, subscription billing, and user access management.', link: '/services/saas-development' },
  ];

  return (
    <section className="py-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <Badge variant="default" className="mb-3 font-mono">PRACTICE: TECHNOLOGY & SOFTWARE</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white">Production-Ready Software Engineering</h2>
            <p className="mt-2 text-sm text-slate-400">High-performance digital products built on modern cloud architecture.</p>
          </div>
          <Link href="/services/technology" className="mt-4 sm:mt-0 text-xs text-brand-orange hover:underline font-mono">
            View Technology Services →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tech.map((t) => (
            <Link key={t.title} href={t.link} className="block group">
              <div className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/90 hover:border-brand-orange/60 transition-all h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-semibold text-white group-hover:text-brand-orange transition-colors">{t.title}</h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs text-slate-500 group-hover:text-brand-orange">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 8: AI Automation & Agents
// ----------------------------------------------------
export function SectionAIAutomation() {
  return (
    <section className="py-20 border-t border-brand-border/60 bg-brand-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="orange" className="mb-3 font-mono">PRACTICE: AI & AUTOMATION</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Deploy Autonomous AI Agents Across Your Enterprise
            </h2>
            <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              Move beyond basic chatbots. We architect custom, autonomous LLM agents that execute
              complex operational tasks, query internal databases, and resolve customer support tickets 24/7.
            </p>
            <div className="mt-6 space-y-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Bot className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Custom agent workflows with tool-calling capabilities</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Enterprise hallucination guardrails and data privacy compliance</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-4 h-4 text-brand-orange shrink-0" />
                <span>Direct API connectors to Salesforce, HubSpot, Zendesk, and Jira</span>
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <Link href="/services/ai-agents">
                <Button variant="primary" size="md">Explore AI Agents</Button>
              </Link>
              <Link href="/services/ai-automation">
                <Button variant="outline" size="md">Workflow Automation</Button>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-brand-border bg-brand-charcoal/80 space-y-3">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Autonomous Agent Capabilities
            </h3>
            <div className="space-y-2">
              <div className="p-3.5 rounded-lg border border-brand-border bg-brand-surface/50 text-xs">
                <div className="font-semibold text-white">Tier-1 Support Resolution Agent</div>
                <p className="text-slate-400 mt-1">Answers complex technical questions, queries knowledgebase, and updates ticket status.</p>
              </div>
              <div className="p-3.5 rounded-lg border border-brand-border bg-brand-surface/50 text-xs">
                <div className="font-semibold text-white">Lead Qualification & Scheduling Agent</div>
                <p className="text-slate-400 mt-1">Interacts with inbound prospects, scores budget fit, and books qualified meetings.</p>
              </div>
              <div className="p-3.5 rounded-lg border border-brand-border bg-brand-surface/50 text-xs">
                <div className="font-semibold text-white">Internal Operations & Document Agent</div>
                <p className="text-slate-400 mt-1">Parses vendor invoices, summarizes compliance contracts, and syncs accounting ERPs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 9: Data Analytics & Business Intelligence
// ----------------------------------------------------
export function SectionDataAnalytics() {
  return (
    <section className="py-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="default" className="mb-3 font-mono">PRACTICE: DATA & INTELLIGENCE</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white">Clarity Across Every Customer Touchpoint</h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Stop guessing channel effectiveness. We engineer data pipelines and executive dashboards
            that provide truthful attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/70">
            <BarChart3 className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">Multi-Touch Attribution</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Uncover the exact sequence of touchpoints that convert prospects into enterprise contracts.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/70">
            <Compass className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">Executive BI Dashboards</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Custom Looker, PowerBI, and custom React dashboards tracking MRR, churn, and gross margins.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/70">
            <TrendingUp className="w-6 h-6 text-brand-orange mb-3" />
            <h3 className="text-base font-semibold text-white">Predictive Revenue Modeling</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Machine learning models to forecast pipeline health, seasonal demand, and inventory needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 10: Build Your Team (Interactive Pod Selector)
// ----------------------------------------------------
export function SectionBuildYourTeam() {
  return (
    <section className="py-20 border-t border-brand-border/60 bg-brand-charcoal/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="orange" className="mb-3 font-mono">ON-DEMAND TEAM ARCHITECTURE</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Build Your Dedicated Growth & Technology Pod
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Assemble the exact multi-disciplinary team your business stage demands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl border border-brand-border bg-brand-charcoal/90 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Growth Pod</h3>
              <Badge variant="orange">Acquisition</Badge>
            </div>
            <p className="text-xs text-slate-400">Ideal for scale-ups needing rapid customer acquisition.</p>
            <ul className="text-xs space-y-2 text-slate-300 border-t border-brand-border/50 pt-4">
              <li>• Fractional Digital CMO</li>
              <li>• Performance Ad Specialist</li>
              <li>• Technical SEO Lead</li>
              <li>• CRO & Landing Page Designer</li>
            </ul>
            <div className="pt-4">
              <Link href="/book-consultation?pod=growth">
                <Button variant="secondary" size="sm" className="w-full">Select Growth Pod</Button>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl border-2 border-brand-orange bg-brand-surface/80 space-y-4 shadow-[0_0_30px_rgba(255,85,0,0.2)]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Full-Stack Scale Pod</h3>
              <Badge variant="orange">Most Popular</Badge>
            </div>
            <p className="text-xs text-slate-300">Complete growth, software engineering, and AI automation.</p>
            <ul className="text-xs space-y-2 text-slate-200 border-t border-brand-border/50 pt-4">
              <li>• Digital CMO + Digital CTO</li>
              <li>• Senior Full-Stack Engineers</li>
              <li>• AI Agent Architect</li>
              <li>• Performance Marketing Team</li>
            </ul>
            <div className="pt-4">
              <Link href="/book-consultation?pod=full-stack">
                <Button variant="primary" size="sm" className="w-full">Select Scale Pod</Button>
              </Link>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-brand-border bg-brand-charcoal/90 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Tech & AI Pod</h3>
              <Badge variant="default">Engineering</Badge>
            </div>
            <p className="text-xs text-slate-400">For enterprises modernizing legacy infrastructure.</p>
            <ul className="text-xs space-y-2 text-slate-300 border-t border-brand-border/50 pt-4">
              <li>• Fractional Digital CTO</li>
              <li>• Cloud & DevOps Engineer</li>
              <li>• Autonomous AI Developer</li>
              <li>• Data Pipeline Architect</li>
            </ul>
            <div className="pt-4">
              <Link href="/book-consultation?pod=tech">
                <Button variant="secondary" size="sm" className="w-full">Select Tech Pod</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 11: Industries
// ----------------------------------------------------
export function SectionIndustries() {
  const industries = [
    { name: 'SaaS & B2B Technology', link: '/industries/saas-b2b' },
    { name: 'E-commerce & D2C Brands', link: '/industries/ecommerce-d2c' },
    { name: 'Real Estate & PropTech', link: '/industries/real-estate-proptech' },
    { name: 'Healthcare & HealthTech', link: '/industries/healthcare-healthtech' },
    { name: 'Education & EdTech', link: '/industries/education-edtech' },
    { name: 'BFSI & FinTech', link: '/industries/bfsi-fintech' },
    { name: 'Manufacturing & Logistics', link: '/industries/manufacturing-logistics' },
  ];

  return (
    <section className="py-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="default" className="mb-3 font-mono">VERTICAL FOCUS</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white">Deep Domain Specialization</h2>
          <p className="mt-3 text-sm text-slate-400">We tailor technology architecture and acquisition channels to your specific industry dynamics.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {industries.map((ind) => (
            <Link key={ind.name} href={ind.link} className="p-4 rounded-xl border border-brand-border bg-brand-charcoal/70 hover:border-brand-orange/60 text-center transition-all group">
              <Building2 className="w-5 h-5 text-slate-400 group-hover:text-brand-orange mx-auto mb-2" />
              <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white">{ind.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 12: Case Studies (Strict Zero-Fake-Proof)
// ----------------------------------------------------
export function SectionCaseStudies() {
  return (
    <section className="py-20 border-t border-brand-border/60 bg-brand-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <Badge variant="pending" className="mb-3 font-mono">EDITORIAL INTEGRITY</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white">Client Engagements & Architecture</h2>
            <p className="mt-2 text-sm text-slate-400">
              In accordance with our strict verification policy, client case studies display verification badges.
            </p>
          </div>
          <Link href="/portfolio" className="mt-4 sm:mt-0 text-xs text-brand-orange hover:underline font-mono">
            View Full Portfolio →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">SaaS & B2B Technology</span>
                <Badge variant="pending">Pending verification</Badge>
              </div>
              <CardTitle className="text-xl mt-2">Autonomous Support Agent Deployment for B2B Cloud Platform</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              <p>Challenge: High support ticket volume during international expansion created engineering triage bottlenecks.</p>
              <p>Solution: Designed and deployed a secure vector search and autonomous triage agent integrated with ticketing APIs.</p>
              <div className="pt-2 text-slate-500 font-mono text-[11px]">
                Status: Preliminary documentation • Awaiting formal client sign-off
              </div>
            </CardContent>
          </Card>

          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">E-Commerce & D2C</span>
                <Badge variant="pending">Pending verification</Badge>
              </div>
              <CardTitle className="text-xl mt-2">Headless Next.js Storefront & Attribution Architecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs text-slate-300">
              <p>Challenge: Monolithic e-commerce platform suffered from slow load times and inaccurate attribution tracking.</p>
              <p>Solution: Re-platformed to headless Next.js with edge caching and first-party attribution modeling.</p>
              <div className="pt-2 text-slate-500 font-mono text-[11px]">
                Status: Preliminary documentation • Awaiting formal client sign-off
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 13: Engagement Models
// ----------------------------------------------------
export function SectionEngagementModels() {
  const models = [
    { title: 'Fractional C-Suite', desc: 'Embedded Digital CMO or Digital CTO steering strategy on a monthly retainer basis.' },
    { title: 'Dedicated Multi-Disciplinary Pod', desc: 'Fully managed engineering, AI, or growth team dedicated 100% to your roadmap.' },
    { title: 'Fixed-Scope Sprints', desc: 'Defined deliverables with clear milestones, deadlines, and acceptance criteria.' },
  ];

  return (
    <section className="py-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="default" className="mb-3 font-mono">FLEXIBLE PARTNERSHIP</Badge>
        <h2 className="text-3xl font-bold tracking-tight text-white">Engagement Models That Fit Your Stage</h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {models.map((m) => (
            <div key={m.title} className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/70">
              <h3 className="text-base font-semibold text-white">{m.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 14: International Clients
// ----------------------------------------------------
export function SectionInternationalClients() {
  return (
    <section className="py-20 border-t border-brand-border/60 bg-brand-charcoal/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Globe className="w-8 h-8 text-brand-orange mx-auto mb-3" />
        <h2 className="text-3xl font-bold tracking-tight text-white">Serving Ambitious Companies Worldwide</h2>
        <p className="mt-3 text-sm text-slate-400 max-w-2xl mx-auto">
          We operate across timezones to deliver seamless executive leadership and engineering execution for clients in North America, the UK, Europe, the UAE, India, and APAC.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-xs font-mono text-slate-400">
          <span className="px-3 py-1.5 rounded-lg border border-brand-border bg-brand-surface">United States (EST / PST)</span>
          <span className="px-3 py-1.5 rounded-lg border border-brand-border bg-brand-surface">United Kingdom (GMT)</span>
          <span className="px-3 py-1.5 rounded-lg border border-brand-border bg-brand-surface">United Arab Emirates (GST)</span>
          <span className="px-3 py-1.5 rounded-lg border border-brand-border bg-brand-surface">India (IST - INR Supported)</span>
          <span className="px-3 py-1.5 rounded-lg border border-brand-border bg-brand-surface">Singapore & APAC</span>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 15: Why DiziBrand (Comparison Matrix)
// ----------------------------------------------------
export function SectionWhyDiziBrand() {
  return (
    <section className="py-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="orange" className="mb-3 font-mono">WHY DIZIBRAND</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-white">How We Compare</h2>
          <p className="mt-3 text-sm text-slate-400">Why leading founders and CXOs choose DiziBrand Media over alternatives.</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border border-brand-border rounded-xl overflow-hidden">
            <thead className="bg-brand-charcoal text-slate-300 font-mono text-xs uppercase border-b border-brand-border">
              <tr>
                <th className="p-4">Criteria</th>
                <th className="p-4 text-brand-orange font-bold">DiziBrand Media</th>
                <th className="p-4">Traditional Agency</th>
                <th className="p-4">In-House Team</th>
                <th className="p-4">Consulting Firm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/50 text-slate-300 bg-brand-charcoal/40">
              <tr>
                <td className="p-4 font-semibold text-white">Accountability</td>
                <td className="p-4 text-brand-orange font-semibold">Single Unified Leadership</td>
                <td className="p-4">Tactical execution only</td>
                <td className="p-4">High management burden</td>
                <td className="p-4">Slides without execution</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Full-Stack Scope</td>
                <td className="p-4 text-brand-orange font-semibold">Marketing + Tech + AI + Data</td>
                <td className="p-4">Marketing only or Dev only</td>
                <td className="p-4">Expensive to hire all roles</td>
                <td className="p-4">High-level advisory only</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Time to Value</td>
                <td className="p-4 text-brand-orange font-semibold">Days to embed</td>
                <td className="p-4">Weeks of onboarding</td>
                <td className="p-4">3–6 months recruiting</td>
                <td className="p-4">Lengthy discovery phase</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-white">Cost Efficiency</td>
                <td className="p-4 text-brand-orange font-semibold">Fractional executive pricing</td>
                <td className="p-4">Hidden fees & markup</td>
                <td className="p-4">$1M+ combined salary overhead</td>
                <td className="p-4">Exorbitant partner rates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 16: Team Leadership
// ----------------------------------------------------
export function SectionTeam() {
  return (
    <section className="py-20 border-t border-brand-border/60 bg-brand-charcoal/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge variant="default" className="mb-3 font-mono">CORE LEADERSHIP</Badge>
        <h2 className="text-3xl font-bold tracking-tight text-white">Executive Leadership Team</h2>
        <p className="mt-3 text-sm text-slate-400 max-w-2xl mx-auto">
          DiziBrand Media is directed by veteran practitioners in technology, marketing, and business strategy.
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl border border-brand-border bg-brand-navy-soft/80 text-center hover:border-brand-red-orange/50 transition-colors">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-border mx-auto mb-3 shadow-md">
              <Image
                src="/images/team/cmo-lead.jpg"
                alt="Digital CMO Practice Lead"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-white">Digital CMO Lead</h3>
            <p className="text-xs text-brand-red-orange font-mono mt-1">Growth Practice</p>
            <p className="text-[11px] text-slate-400 mt-2">12+ years directing global acquisition and brand strategy.</p>
          </div>

          <div className="p-6 rounded-xl border border-brand-border bg-brand-navy-soft/80 text-center hover:border-brand-red-orange/50 transition-colors">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-border mx-auto mb-3 shadow-md">
              <Image
                src="/images/team/cto-lead.jpg"
                alt="Digital CTO Practice Lead"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-white">Digital CTO Lead</h3>
            <p className="text-xs text-brand-red-orange font-mono mt-1">Technology Practice</p>
            <p className="text-[11px] text-slate-400 mt-2">Cloud architect and former startup engineering head.</p>
          </div>

          <div className="p-6 rounded-xl border border-brand-border bg-brand-navy-soft/80 text-center hover:border-brand-red-orange/50 transition-colors">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-border mx-auto mb-3 shadow-md">
              <Image
                src="/images/team/ai-lead.jpg"
                alt="Head of AI & Automation"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-white">Head of AI & Automation</h3>
            <p className="text-xs text-brand-red-orange font-mono mt-1">AI Practice</p>
            <p className="text-[11px] text-slate-400 mt-2">Specializing in autonomous agents and enterprise LLM tooling.</p>
          </div>

          <div className="p-6 rounded-xl border border-brand-border bg-brand-navy-soft/80 text-center hover:border-brand-red-orange/50 transition-colors">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-brand-border mx-auto mb-3 shadow-md">
              <Image
                src="/images/team/data-lead.jpg"
                alt="Head of Data & BI"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold text-white">Head of Data & BI</h3>
            <p className="text-xs text-brand-red-orange font-mono mt-1">Data Practice</p>
            <p className="text-[11px] text-slate-400 mt-2">Quantitative attribution and business intelligence specialist.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 17: Insights & Playbooks
// ----------------------------------------------------
export function SectionInsights() {
  const articles = [
    { title: 'The Fractional C-Suite: Why High-Growth Startups Are Hiring Digital CMOs & CTOs', category: 'Leadership', read: '6 min read', link: '/insights' },
    { title: 'Beyond Chatbots: Deploying Autonomous AI Agents That Trigger Real Backend Actions', category: 'AI & Automation', read: '8 min read', link: '/insights' },
    { title: 'The Modern Attribution Stack: Tracking B2B Pipeline Velocity Across Complex Cycles', category: 'Data & Analytics', read: '5 min read', link: '/insights' },
  ];

  return (
    <section className="py-20 border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <Badge variant="default" className="mb-3 font-mono">THOUGHT LEADERSHIP</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white">Strategic Insights & Playbooks</h2>
            <p className="mt-2 text-sm text-slate-400">Deep-dives on AI transformation, fractional leadership, and growth architecture.</p>
          </div>
          <Link href="/insights" className="mt-4 sm:mt-0 text-xs text-brand-orange hover:underline font-mono">
            View All Insights →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <Link key={art.title} href={art.link} className="block group">
              <div className="p-6 rounded-xl border border-brand-border bg-brand-charcoal/80 hover:border-brand-orange/60 transition-all h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono text-brand-orange font-semibold">{art.category}</span>
                  <h3 className="text-base font-semibold text-white mt-2 group-hover:text-brand-orange transition-colors leading-snug">{art.title}</h3>
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <span>{art.read}</span>
                  <span className="group-hover:text-brand-orange">Read Article →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------------------------------
// SECTION 18: Final CTA
// ----------------------------------------------------
export function SectionFinalCTA() {
  return (
    <section className="py-24 border-t border-brand-border/60 bg-gradient-to-b from-brand-charcoal/60 to-brand-black text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-orange/15 via-transparent to-transparent pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Badge variant="orange" className="mb-4 font-mono">TAKE THE NEXT STEP</Badge>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Your Business Deserves More Than an Agency.
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          Build your growth, technology, AI, and leadership team with DiziBrand Media. Schedule a strategy call to explore your growth roadmap.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/book-consultation">
            <Button variant="primary" size="lg" className="gap-2">
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/free-audit">
            <Button variant="secondary" size="lg">
              Claim Free Digital Audit
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-xs text-slate-500 font-mono">
          No obligation • 45-minute strategic evaluation with an executive practice lead
        </p>
      </div>
    </section>
  );
}
