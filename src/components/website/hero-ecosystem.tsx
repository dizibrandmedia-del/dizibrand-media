'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Cpu,
  Bot,
  BarChart3,
  Rocket,
  Building,
  CheckCircle2,
} from 'lucide-react';

interface NodeData {
  id: string;
  title: string;
  role: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  deliverables: string[];
}

const NODES: NodeData[] = [
  {
    id: 'cmo',
    title: 'Digital CMO',
    role: 'Executive Growth Leadership',
    desc: 'Fractional CMO directing acquisition economics, CAC-to-LTV, and brand positioning.',
    icon: TrendingUp,
    deliverables: ['Acquisition Engine', 'Growth Strategy', 'Board-Level Reporting'],
  },
  {
    id: 'cto',
    title: 'Digital CTO',
    role: 'Enterprise Tech & AI Architecture',
    desc: 'Fractional CTO overseeing cloud infrastructure, security compliance, and engineering.',
    icon: Cpu,
    deliverables: ['System Architecture', 'Cloud Governance', 'AI Roadmap'],
  },
  {
    id: 'growth',
    title: 'Growth Team',
    role: 'Full-Funnel Acquisition',
    desc: 'Performance ads, ABM pipeline generation, international SEO, and CRO.',
    icon: Rocket,
    deliverables: ['Performance Marketing', 'Technical SEO', 'Lead Generation'],
  },
  {
    id: 'ai',
    title: 'AI Team',
    role: 'Automation & Autonomous Agents',
    desc: 'Custom LLM agents, robotic workflows, and internal tooling automation.',
    icon: Bot,
    deliverables: ['Autonomous Agents', 'Workflow Bots', 'API Orchestration'],
  },
  {
    id: 'data',
    title: 'Data Team',
    role: 'Attribution & Business Intelligence',
    desc: 'Multi-touch attribution models, customer analytics, and predictive forecasting.',
    icon: BarChart3,
    deliverables: ['Attribution Models', 'Executive BI', 'Revenue Forecasts'],
  },
];

export function HeroEcosystem() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const selectedNodeData = NODES.find((n) => n.id === activeNode) || NODES[0];

  return (
    <div className="relative w-full max-w-4xl mx-auto py-8">
      {/* Desktop & Tablet Interactive 2D Node Graph */}
      <div className="hidden md:block relative h-[480px] w-full border border-brand-border/60 rounded-2xl bg-brand-charcoal/40 backdrop-blur-xl overflow-hidden p-6 shadow-2xl">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E2436_1px,transparent_1px),linear-gradient(to_bottom,#1E2436_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 -z-10" />

        {/* Ambient Radial Glow around Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-orange/10 blur-3xl pointer-events-none -z-10" />

        {/* SVG Connecting Synapses (Curved Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5500" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2A324B" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Lines from Center (400, 240) to Satellite nodes */}
          {/* Top: Digital CMO (400, 70) */}
          <path
            d="M 400 210 L 400 110"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="animate-pulse"
          />
          {/* Top Left: Growth Team (170, 110) */}
          <path
            d="M 350 220 Q 250 180 200 140"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Top Right: Digital CTO (630, 110) */}
          <path
            d="M 450 220 Q 550 180 600 140"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Bottom Left: Data Team (200, 360) */}
          <path
            d="M 350 260 Q 260 310 220 340"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          {/* Bottom Right: AI Team (600, 360) */}
          <path
            d="M 450 260 Q 540 310 580 340"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* CENTER NODE: "YOUR BUSINESS" */}
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative px-7 py-4 rounded-2xl border-2 border-brand-orange bg-brand-surface shadow-[0_0_35px_rgba(255,85,0,0.3)] text-center cursor-default">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Building className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-mono font-bold tracking-widest text-brand-orange uppercase">
                Core Engine
              </span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">YOUR BUSINESS</h3>
            <p className="text-[11px] text-slate-400">Scale • Build • Market • Automate</p>
          </div>
        </motion.div>

        {/* SATELLITE NODE 1: Digital CMO (Top) */}
        <div
          onMouseEnter={() => setActiveNode('cmo')}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20 cursor-pointer"
        >
          <div
            className={`px-4 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2.5 ${
              activeNode === 'cmo'
                ? 'border-brand-orange bg-brand-surface shadow-[0_0_20px_rgba(255,85,0,0.3)] scale-105'
                : 'border-brand-border bg-brand-charcoal/90 hover:border-slate-500'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-brand-orange" />
            <div>
              <div className="text-xs font-bold text-white">Digital CMO</div>
              <div className="text-[10px] text-slate-400">Growth Strategy</div>
            </div>
          </div>
        </div>

        {/* SATELLITE NODE 2: Growth Team (Top Left) */}
        <div
          onMouseEnter={() => setActiveNode('growth')}
          className="absolute top-20 left-12 z-20 cursor-pointer"
        >
          <div
            className={`px-4 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2.5 ${
              activeNode === 'growth'
                ? 'border-brand-orange bg-brand-surface shadow-[0_0_20px_rgba(255,85,0,0.3)] scale-105'
                : 'border-brand-border bg-brand-charcoal/90 hover:border-slate-500'
            }`}
          >
            <Rocket className="w-4 h-4 text-brand-orange" />
            <div>
              <div className="text-xs font-bold text-white">Growth Team</div>
              <div className="text-[10px] text-slate-400">Ads • SEO • CRO</div>
            </div>
          </div>
        </div>

        {/* SATELLITE NODE 3: Digital CTO (Top Right) */}
        <div
          onMouseEnter={() => setActiveNode('cto')}
          className="absolute top-20 right-12 z-20 cursor-pointer"
        >
          <div
            className={`px-4 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2.5 ${
              activeNode === 'cto'
                ? 'border-brand-orange bg-brand-surface shadow-[0_0_20px_rgba(255,85,0,0.3)] scale-105'
                : 'border-brand-border bg-brand-charcoal/90 hover:border-slate-500'
            }`}
          >
            <Cpu className="w-4 h-4 text-brand-orange" />
            <div>
              <div className="text-xs font-bold text-white">Digital CTO</div>
              <div className="text-[10px] text-slate-400">Tech Architecture</div>
            </div>
          </div>
        </div>

        {/* SATELLITE NODE 4: Data Team (Bottom Left) */}
        <div
          onMouseEnter={() => setActiveNode('data')}
          className="absolute bottom-10 left-16 z-20 cursor-pointer"
        >
          <div
            className={`px-4 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2.5 ${
              activeNode === 'data'
                ? 'border-brand-orange bg-brand-surface shadow-[0_0_20px_rgba(255,85,0,0.3)] scale-105'
                : 'border-brand-border bg-brand-charcoal/90 hover:border-slate-500'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-brand-orange" />
            <div>
              <div className="text-xs font-bold text-white">Data Team</div>
              <div className="text-[10px] text-slate-400">Attribution & BI</div>
            </div>
          </div>
        </div>

        {/* SATELLITE NODE 5: AI Team (Bottom Right) */}
        <div
          onMouseEnter={() => setActiveNode('ai')}
          className="absolute bottom-10 right-16 z-20 cursor-pointer"
        >
          <div
            className={`px-4 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2.5 ${
              activeNode === 'ai'
                ? 'border-brand-orange bg-brand-surface shadow-[0_0_20px_rgba(255,85,0,0.3)] scale-105'
                : 'border-brand-border bg-brand-charcoal/90 hover:border-slate-500'
            }`}
          >
            <Bot className="w-4 h-4 text-brand-orange" />
            <div>
              <div className="text-xs font-bold text-white">AI Team</div>
              <div className="text-[10px] text-slate-400">Autonomous Agents</div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Capability Inspector Box (Desktop) */}
      <div className="hidden md:block mt-4 p-4 rounded-xl border border-brand-border/60 bg-brand-charcoal/60 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-white">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
            <span>Integrated Capability: {selectedNodeData.title}</span>
            <span className="text-slate-500">• {selectedNodeData.role}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            {selectedNodeData.deliverables.map((d) => (
              <span key={d} className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Responsive Connected Flow (< 768px) */}
      <div className="block md:hidden space-y-3 p-4 border border-brand-border rounded-xl bg-brand-charcoal/70">
        <div className="p-4 rounded-lg border-2 border-brand-orange bg-brand-surface text-center">
          <div className="text-xs font-mono font-bold text-brand-orange">CORE ENGINE</div>
          <h4 className="text-base font-bold text-white">YOUR BUSINESS</h4>
          <p className="text-[11px] text-slate-400">Extended Strategic Growth & Technology Team</p>
        </div>

        <div className="text-center text-brand-orange text-xs">▼ Connected Practice Teams ▼</div>

        <div className="grid grid-cols-1 gap-2 text-xs">
          {NODES.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.id}
                className="p-3 rounded-lg border border-brand-border bg-brand-charcoal flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-brand-orange shrink-0" />
                  <div>
                    <div className="font-semibold text-white">{node.title}</div>
                    <div className="text-[11px] text-slate-400">{node.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
