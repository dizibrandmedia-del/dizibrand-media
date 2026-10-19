'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { PortfolioProject } from '@/lib/data/portfolio';
import { PortfolioCard } from '@/components/website/portfolio-card';
import { PortfolioModal } from '@/components/website/portfolio-modal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Search,
  X,
  ArrowRight,
  Filter,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
} from 'lucide-react';

interface PortfolioViewProps {
  initialProjects: PortfolioProject[];
  categories: string[];
}

export function PortfolioView({ initialProjects, categories }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  // Filter projects by category and search keyword
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'All' || project.categories.includes(selectedCategory);

      // Search match
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.client && project.client.toLowerCase().includes(query)) ||
        (project.industry && project.industry.toLowerCase().includes(query)) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* 1. Page Header & Hero Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-red-orange/30 bg-brand-red-orange/10 text-brand-red-orange text-xs font-mono font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PORTFOLIO & DELIVERED WORK</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Engineered for Scale.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red-orange to-amber-400">
            Built for Real-World Impact.
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          From full-stack web platforms and high-availability ERPs to autonomous AI pipelines and
          high-conversion storefronts—explore systems delivered and contributed to by our team.
        </p>

        {/* Highlight Stats Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs text-slate-300 font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-surface/60 border border-brand-border/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>32+ Systems Documented</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-surface/60 border border-brand-border/60">
            <span className="w-2 h-2 rounded-full bg-brand-red-orange" />
            <span>100% Real Deliveries</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand-surface/60 border border-brand-border/60">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Zero Synthetic Claims</span>
          </div>
        </div>
      </div>

      {/* 2. Controls Bar: Interactive Category Filters & Search */}
      <div className="space-y-4 pt-4 border-t border-brand-border/60">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project, tech (React, Python...), or industry..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-brand-navy-soft/90 border border-brand-border/80 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-brand-red-orange focus:ring-1 focus:ring-brand-red-orange transition-colors"
              aria-label="Search portfolio projects"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results Count & Reset Indicator */}
          <div className="flex items-center justify-between lg:justify-end gap-3 text-xs font-mono text-slate-400">
            <span>
              Showing <strong className="text-white">{filteredProjects.length}</strong> of {initialProjects.length} projects
            </span>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="text-brand-red-orange hover:underline font-semibold flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Pill Tabs */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg font-mono uppercase tracking-wider text-xs font-semibold transition-all duration-200 select-none ${
                  isSelected
                    ? 'bg-brand-red-orange text-white shadow-[0_0_15px_rgba(255,75,62,0.35)] border border-brand-red-orange'
                    : 'bg-brand-navy-soft text-slate-300 hover:text-white border border-brand-border/70 hover:border-brand-border'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Responsive Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <PortfolioCard
              key={project.id}
              project={project}
              onSelect={setActiveProject}
            />
          ))}
        </div>
      ) : (
        /* 4. Useful Empty State */
        <div className="p-12 text-center rounded-2xl border border-dashed border-brand-border/80 bg-brand-navy-soft/40 max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-brand-surface mx-auto flex items-center justify-center text-slate-400 border border-brand-border">
            <Filter className="w-6 h-6 text-brand-red-orange" />
          </div>
          <h3 className="text-lg font-bold text-white">No Matching Projects Found</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            No projects match category <strong className="text-slate-200">&ldquo;{selectedCategory}&rdquo;</strong>
            {searchQuery ? ` with search query "${searchQuery}"` : ''}.
          </p>
          <Button variant="secondary" size="sm" onClick={handleResetFilters} className="mt-2">
            View All Projects
          </Button>
        </div>
      )}

      {/* 5. Bottom Conversion CTA Section */}
      <section className="relative overflow-hidden p-8 sm:p-12 rounded-3xl border-2 border-brand-red-orange/60 bg-gradient-to-b from-brand-surface/90 via-brand-navy-soft to-brand-navy text-center space-y-6 shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-3">
          <Badge variant="orange" className="font-mono text-xs">
            LET&apos;S BUILD TOGETHER
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a High-Stakes Project or Growth Goal?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Whether you need modern digital product engineering, autonomous AI workflows, or
            revenue-driven marketing systems, our leadership practice will scope the blueprint with you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/book-consultation">
            <Button variant="primary" size="lg" className="gap-2 w-full sm:w-auto">
              <span>Book Strategy Session</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/free-audit">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Request Free Audit
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t border-brand-border/40 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct Access to Technical Leads</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>30-Minute Architecture Scoping</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>No Obligation Proposal</span>
          </div>
        </div>
      </section>

      {/* 6. Interactive Architecture & Case Study Modal */}
      <PortfolioModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}
