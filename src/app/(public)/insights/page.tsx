import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, ArrowRight, Clock, User } from 'lucide-react';

export const metadata = {
  title: 'Strategic Insights, Guides & Playbooks | DiziBrand Media',
  description:
    'Thought leadership, technical guides, and growth playbooks authored by our Digital CMO and Digital CTO practice leads.',
};

export default function InsightsPage() {
  const articles = [
    {
      title: 'The Fractional C-Suite: Why High-Growth Startups Are Hiring Digital CMOs & CTOs',
      category: 'Leadership',
      author: 'Digital CMO Practice Lead',
      readTime: '6 min read',
      date: 'Sep 2026',
      excerpt:
        'Why venture-backed startups and scaling SMEs are replacing traditional agency retainers and full-time executive salaries with embedded fractional leadership.',
    },
    {
      title: 'Beyond Chatbots: Deploying Autonomous AI Agents That Trigger Real Backend Actions',
      category: 'AI & Automation',
      author: 'Head of AI Engineering',
      readTime: '8 min read',
      date: 'Sep 2026',
      excerpt:
        'A technical deep-dive into tool-calling LLM agents, vector database retrieval pipelines, and enterprise security guardrails.',
    },
    {
      title: 'The Modern Attribution Stack: Tracking B2B Pipeline Velocity Across Complex Cycles',
      category: 'Data & Analytics',
      author: 'Data & BI Practice Lead',
      readTime: '5 min read',
      date: 'Sep 2026',
      excerpt:
        'How to transition from flawed last-touch Google Analytics models to first-party event tracking and algorithmic multi-touch attribution.',
    },
    {
      title: 'Next.js App Router & Core Web Vitals: Engineering High-Converting Web Experiences',
      category: 'Technology',
      author: 'Senior Full-Stack Architect',
      readTime: '7 min read',
      date: 'Aug 2026',
      excerpt:
        'How sub-resource integrity, server components, and edge caching yield sub-2-second page loads that dramatically increase conversion rates.',
    },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="orange" className="font-mono">THOUGHT LEADERSHIP</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          Strategic Insights & Engineering Playbooks
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          In-depth analyses, architectural breakdowns, and growth frameworks authored by senior
          practitioners at DiziBrand Media.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((art) => (
          <Card key={art.title} className="bg-brand-charcoal/80 border-brand-border/80 hover:border-brand-orange/60 transition-all flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span className="text-brand-orange font-semibold">{art.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {art.readTime}</span>
              </div>
              <CardTitle className="text-xl mt-3 leading-snug">{art.title}</CardTitle>
              <CardDescription className="text-xs text-slate-300 mt-2 leading-relaxed">
                {art.excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0 border-t border-brand-border/40 mt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5 font-medium text-slate-300">
                <User className="w-3.5 h-3.5 text-brand-orange" />
                {art.author}
              </span>
              <span className="text-brand-orange font-semibold">Read Insight →</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
