'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { PortfolioProject } from '@/lib/data/portfolio';
import {
  ArrowUpRight,
  ExternalLink,
  Quote,
  Sparkles,
  Layers,
  Bot,
  Smartphone,
  Globe,
  Database,
  Building2,
  TrendingUp,
  FileText,
} from 'lucide-react';

interface PortfolioCardProps {
  project: PortfolioProject;
  onSelect?: (project: PortfolioProject) => void;
}

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case 'ai':
      return Bot;
    case 'mobile app':
      return Smartphone;
    case 'ecommerce':
    case 'websites':
      return Globe;
    case 'data analytics':
      return Database;
    case 'erp & pos':
    case 'enterprise':
      return Building2;
    case 'fintech':
      return TrendingUp;
    default:
      return Layers;
  }
}

export function PortfolioCard({ project, onSelect }: PortfolioCardProps) {
  const primaryCategory = project.categories[0] || 'Digital Product';
  const AmbientIcon = getCategoryIcon(primaryCategory);

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click originated from an explicit anchor tag or button, don't intercept
    const target = e.target as HTMLElement;
    if (target.closest('a')) {
      return;
    }
    if (onSelect) {
      onSelect(project);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between rounded-2xl border border-brand-border/70 bg-brand-navy-soft/85 backdrop-blur-md p-6 text-slate-100 transition-all duration-300 hover:border-brand-red-orange/60 hover:shadow-[0_12px_36px_rgba(0,17,31,0.9)] hover:-translate-y-1 cursor-pointer focus-within:ring-2 focus-within:ring-brand-red-orange"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="orange" className="font-mono text-[11px] font-semibold tracking-wide uppercase">
              {primaryCategory}
            </Badge>
            {project.categories.slice(1, 2).map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-brand-surface/60 px-2 py-0.5 rounded-full border border-brand-border/50"
              >
                {cat}
              </span>
            ))}
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider border ${
              project.tier === 'Featured'
                ? 'border-brand-red-orange/50 bg-brand-red-orange/10 text-brand-red-orange'
                : project.tier === 'Selected Work'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-brand-border/80 bg-brand-surface/40 text-slate-400'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                project.tier === 'Featured'
                  ? 'bg-brand-red-orange animate-pulse'
                  : project.tier === 'Selected Work'
                  ? 'bg-emerald-400'
                  : 'bg-slate-400'
              }`}
            />
            {project.tier}
          </span>
        </div>

        {/* Ambient Header Bar */}
        {project.image ? (
          <div className="relative w-full h-44 mb-4 rounded-xl overflow-hidden border border-brand-border/60 bg-brand-navy">
            <Image
              src={project.image}
              alt={project.imageAlt || `${project.title} preview`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative h-20 mb-4 rounded-xl bg-gradient-to-r from-brand-surface/70 via-brand-navy to-brand-navy-soft/60 border border-brand-border/40 p-3.5 flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-brand-navy/90 border border-brand-border/80 flex items-center justify-center text-brand-red-orange shadow-inner">
                <AmbientIcon className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
                  {project.industry || 'Enterprise System'}
                </span>
                <span className="text-xs font-semibold text-slate-200">
                  {project.client ? `Client: ${project.client}` : 'Production Engineering'}
                </span>
              </div>
            </div>
            <Sparkles className="w-4 h-4 text-brand-red-orange/30 shrink-0" />
          </div>
        )}

        {/* Project Title with Direct Link or Modal Trigger */}
        <div className="flex items-start justify-between gap-3 group/title">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-brand-red-orange transition-colors">
            {project.projectUrl ? (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="hover:underline flex items-center gap-1.5 focus:outline-none"
                aria-label={`Open ${project.title} live website in a new tab`}
              >
                <span>{project.title}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-red-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => onSelect && onSelect(project)}
                className="text-left hover:underline flex items-center gap-1.5 focus:outline-none"
              >
                <span>{project.title}</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-brand-red-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>
            )}
          </h3>
        </div>

        {/* Project Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {project.description}
        </p>

        {/* Optional Verified Result Quote */}
        {project.results && (
          <div className="mt-4 p-3 rounded-xl bg-brand-surface/40 border border-brand-border/50 flex items-start gap-2 text-xs text-slate-300 italic">
            <Quote className="w-3.5 h-3.5 text-brand-red-orange shrink-0 mt-0.5" />
            <p className="leading-snug">{project.results}</p>
          </div>
        )}
      </div>

      {/* Footer Area */}
      <div className="mt-6 pt-4 border-t border-brand-border/50 space-y-4">
        {/* Technology Pills */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-brand-border/70 bg-brand-navy/90 px-2 py-0.5 text-[11px] font-mono font-medium text-slate-300 transition-colors group-hover:border-brand-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action CTAs */}
        <div className="flex items-center justify-between pt-1 gap-2 flex-wrap">
          {project.projectUrl ? (
            <div className="flex items-center gap-3">
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-brand-red-orange hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-brand-red-orange/10 hover:bg-brand-red-orange border border-brand-red-orange/30 hover:border-brand-red-orange"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => onSelect && onSelect(project)}
                className="text-[11px] font-mono text-slate-400 hover:text-white underline transition-colors"
              >
                Case Study
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onSelect && onSelect(project)}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-200 hover:text-brand-red-orange transition-colors py-1 px-2.5 rounded-lg bg-brand-surface/60 hover:bg-brand-surface border border-brand-border/60"
            >
              <FileText className="w-3.5 h-3.5 text-brand-red-orange" />
              <span>View Architecture & Case Study</span>
            </button>
          )}

          <span className="text-[11px] font-mono text-slate-500 ml-auto">
            {project.projectUrl ? 'Live Production' : 'Proprietary'}
          </span>
        </div>
      </div>
    </article>
  );
}
