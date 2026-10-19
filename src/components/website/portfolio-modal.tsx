'use client';

import React, { useEffect } from 'react';
import { PortfolioProject } from '@/lib/data/portfolio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  X,
  ExternalLink,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Quote,
  Building2,
} from 'lucide-react';
import Link from 'next/link';

interface PortfolioModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
}

export function PortfolioModal({ project, onClose }: PortfolioModalProps) {
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const primaryCategory = project.categories[0] || 'Digital Product';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="portfolio-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-brand-border/80 bg-brand-navy-soft text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)] z-10 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-brand-surface/80 hover:bg-brand-surface border border-brand-border text-slate-400 hover:text-white transition-colors"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="orange" className="font-mono text-xs uppercase tracking-wider font-semibold">
            {primaryCategory}
          </Badge>
          <Badge variant="outline" className="font-mono text-xs text-slate-300">
            {project.tier}
          </Badge>
          {project.industry && (
            <span className="text-xs font-mono text-slate-400">
              {project.industry}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 id="portfolio-modal-title" className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {project.title}
        </h2>

        {/* Client or Practice info */}
        {project.client && (
          <p className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-brand-red-orange" />
            <span>Client: {project.client}</span>
          </p>
        )}

        {/* Prominent Live Site Action Banner (if projectUrl exists) */}
        {project.projectUrl && (
          <div className="mt-5 p-4 rounded-2xl bg-brand-navy border-2 border-brand-red-orange/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <span className="text-xs font-mono font-semibold text-brand-red-orange uppercase tracking-wider block">
                Official Production Website
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                This project is live in production and open to public exploration.
              </p>
            </div>
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-red-orange text-white text-xs font-bold hover:bg-brand-red-deep shadow-md transition-all active:scale-95 shrink-0"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Main Description */}
        <div className="mt-5 text-sm sm:text-base text-slate-200 leading-relaxed">
          {project.description}
        </div>

        {/* Challenge & Solution Grid */}
        {(project.challenge || project.solution) && (
          <div className="mt-6 grid grid-cols-1 gap-4 pt-4 border-t border-brand-border/60">
            {project.challenge && (
              <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                  The Challenge
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.challenge}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="p-4 rounded-xl bg-brand-surface/40 border border-brand-border/60">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                  The Architecture & Solution
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Technology Pills */}
        <div className="mt-6 pt-4 border-t border-brand-border/60 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold block flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-brand-red-orange" />
            <span>Technologies & Delivery Stack</span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-brand-navy border border-brand-border text-xs font-mono text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Results Block */}
        {project.results && (
          <div className="mt-6 p-4 rounded-xl bg-brand-surface/50 border border-brand-border/60 flex items-start gap-3 text-xs sm:text-sm text-slate-300">
            <Quote className="w-4 h-4 text-brand-red-orange shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5 font-mono text-xs">
                Outcome & Impact:
              </span>
              <p className="italic leading-relaxed">{project.results}</p>
            </div>
          </div>
        )}

        {/* Bottom CTAs */}
        <div className="mt-8 pt-5 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            href={`/book-consultation?project=${encodeURIComponent(project.id)}`}
            className="w-full sm:w-auto"
            onClick={onClose}
          >
            <Button variant="primary" size="md" className="gap-2 w-full">
              <span>Discuss Similar Project</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          {project.projectUrl ? (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-brand-red-orange hover:underline flex items-center gap-1.5"
            >
              <span>Explore Live Site ({new URL(project.projectUrl).hostname})</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs font-mono text-slate-500">
              Enterprise Proprietary Architecture
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
