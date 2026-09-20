import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroEcosystem } from '@/components/website/hero-ecosystem';
import { ArrowRight, Sparkles, TrendingUp, Cpu } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden">
      {/* Subtle Background Radial Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-orange/15 via-brand-black/0 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-orange/30 bg-brand-orange/10 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
          <span className="text-xs font-mono font-bold tracking-widest text-brand-orange uppercase">
            DIZIBRAND MEDIA
          </span>
        </div>

        {/* Exact Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Your Business Deserves More Than an Agency.
        </h1>

        {/* Exact Sub-headline */}
        <p className="mt-4 text-xl sm:text-2xl font-semibold text-slate-200 max-w-3xl mx-auto">
          Build Your Growth & Technology Team With Us.
        </p>

        {/* Exact Body */}
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          DiziBrand Media brings together experienced marketing, technology, AI, data and business
          professionals to help ambitious businesses build, launch, acquire customers and scale.
        </p>

        {/* Primary & Secondary CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/book-consultation">
            <Button variant="primary" size="lg" className="gap-2">
              <span>Book a Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>

          <Link href="/services">
            <Button variant="secondary" size="lg">
              Explore Our Capabilities
            </Button>
          </Link>
        </div>

        {/* Additional CTAs: Talk to Digital CMO & Digital CTO */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link
            href="/digital-cmo"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-brand-border hover:border-brand-orange bg-brand-charcoal/70 text-slate-200 hover:text-white transition-all hover:scale-105"
          >
            <TrendingUp className="w-3.5 h-3.5 text-brand-orange" />
            <span>Talk to a Digital CMO</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/digital-cto"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-brand-border hover:border-brand-orange bg-brand-charcoal/70 text-slate-200 hover:text-white transition-all hover:scale-105"
          >
            <Cpu className="w-3.5 h-3.5 text-brand-orange" />
            <span>Talk to a Digital CTO</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>
        </div>

        {/* Exact Supporting line */}
        <p className="mt-6 text-xs sm:text-sm font-mono tracking-wider text-slate-400 uppercase">
          Digital CMO • Digital CTO • Marketing • Technology • AI • Data
        </p>

        {/* Hero Visual: Premium Animated Business Ecosystem Node Graph */}
        <div className="mt-10">
          <HeroEcosystem />
        </div>
      </div>
    </section>
  );
}
