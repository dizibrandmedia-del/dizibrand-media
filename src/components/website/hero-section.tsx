'use client';

import React from 'react';
import Link from 'next/link';
import { HeroEcosystem } from '@/components/website/hero-ecosystem';
import {
  ArrowRight,
  Zap,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-brand-navy">
      {/* 1. Ambient Animated Glowing Background Aura */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[500px] sm:h-[650px] bg-[radial-gradient(ellipse_at_center,_rgba(255,75,62,0.18)_0%,_rgba(255,122,80,0.08)_40%,_transparent_75%)] pointer-events-none -z-10 blur-3xl animate-pulse duration-1000"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* 2. Top Trust Badge (Matching Reference Style) */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full border border-brand-red-orange/30 bg-[#0B1120]/90 backdrop-blur-md shadow-[0_0_25px_rgba(255,75,62,0.15)] mb-8 select-none">
          <div className="flex items-center gap-1 text-amber-400 font-bold text-xs sm:text-sm">
            <span>★</span>
            <span>4.9/5</span>
          </div>
          <span className="text-slate-600">•</span>
          <span className="text-xs sm:text-sm font-medium text-slate-300">
            Trusted by <strong className="text-white font-semibold">250+ High-Growth Enterprises</strong>
          </span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline text-xs sm:text-sm font-mono font-semibold text-brand-red-orange">
            100% Outcome-Driven ✨
          </span>
        </div>

        {/* 3. High-Impact Animated Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]">
          <span>Your Business Deserves </span>
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#FF4B3E] via-[#FF7A50] to-[#FFAA40] bg-clip-text text-transparent drop-shadow-sm">
            More Than an Agency.
          </span>
        </h1>

        {/* 4. Sub-headline */}
        <p className="mt-5 text-xl sm:text-2xl lg:text-3xl font-bold text-slate-100 max-w-4xl mx-auto tracking-tight">
          Build Your Growth & Technology Team With Us.
        </p>

        {/* 5. Clean Supporting Description */}
        <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
          DiziBrand Media brings together seasoned Digital CMOs, Digital CTOs, performance engineers,
          and AI architects to help ambitious scale-ups build, launch, acquire customers and dominate
          their market.
        </p>

        {/* 6. Primary & Secondary Glowing CTA Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book-consultation"
            className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF4B3E] to-[#FF2E20] text-white font-bold text-base shadow-[0_10px_35px_rgba(255,75,62,0.45)] hover:shadow-[0_15px_45px_rgba(255,75,62,0.65)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Zap className="w-4 h-4 fill-current text-white animate-pulse" />
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#0B1120]/90 hover:bg-[#111A2E] text-slate-100 hover:text-white border border-slate-700/80 hover:border-slate-500 font-semibold text-base backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Layers className="w-4 h-4 text-brand-red-orange" />
            <span>Explore Our Capabilities</span>
          </Link>
        </div>

        {/* 7. Quick Executive Leadership Links */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs">
          <Link
            href="/digital-cmo"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-brand-border/80 hover:border-brand-red-orange/60 bg-[#0B1120]/80 text-slate-200 hover:text-white transition-all hover:scale-105"
          >
            <TrendingUp className="w-3.5 h-3.5 text-brand-red-orange" />
            <span>Talk to a Digital CMO</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>

          <Link
            href="/digital-cto"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-brand-border/80 hover:border-brand-red-orange/60 bg-[#0B1120]/80 text-slate-200 hover:text-white transition-all hover:scale-105"
          >
            <Cpu className="w-3.5 h-3.5 text-brand-red-orange" />
            <span>Talk to a Digital CTO</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>
        </div>

        {/* 8. Trust Highlights / Feature Checkmarks (Matching Reference) */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Dedicated Execution Teams</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fractional Digital CMO & CTO Leadership</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Custom Next.js & AI Architectures</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Proven ROI & Pipeline Scalability</span>
          </div>
        </div>

        {/* 9. Hero Visual: Interactive Business Ecosystem Node Graph */}
        <div className="mt-14">
          <HeroEcosystem />
        </div>
      </div>
    </section>
  );
}
