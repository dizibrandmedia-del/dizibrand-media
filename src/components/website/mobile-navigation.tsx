'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/logo';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Phone,
  MessageCircle,
  Lock,
  Cpu,
  Building2,
  Layers,
  Users,
  Compass,
  Sparkles,
  Code2,
  Bot,
  TrendingUp,
} from 'lucide-react';
import {
  ENGINEERING_SERVICES,
  AI_DATA_SERVICES,
  GROWTH_SERVICES,
} from './desktop-navigation';

const INDUSTRIES = [
  { name: 'SaaS & B2B', href: '/industries/saas-b2b' },
  { name: 'Ecommerce & D2C', href: '/industries/ecommerce-d2c' },
  { name: 'Real Estate & PropTech', href: '/industries/real-estate-proptech' },
  { name: 'Healthcare & HealthTech', href: '/industries/healthcare-healthtech' },
  { name: 'Education & EdTech', href: '/industries/education-edtech' },
  { name: 'BFSI & FinTech', href: '/industries/bfsi-fintech' },
  { name: 'Manufacturing & Logistics', href: '/industries/manufacturing-logistics' },
];

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [industriesExpanded, setIndustriesExpanded] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isOpen]);

  const drawerContent = (
    <div className="fixed inset-0 z-[9999] flex justify-end" aria-modal="true" role="dialog">
      {/* 1. Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Slide-in Drawer with Solid Dark Background */}
      <div className="relative w-full max-w-[340px] xs:max-w-sm h-full bg-[#070B14] border-l border-brand-border text-slate-100 flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10 animate-in slide-in-from-right duration-200">
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-border/70 bg-[#0B1120]">
          <Logo variant="header" size="sm" />
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-brand-surface text-slate-300 hover:text-white hover:bg-brand-surfaceHover border border-brand-border transition-colors active:scale-95"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 text-brand-red-orange" />
          </button>
        </div>

        {/* Scrollable Links Container */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2.5">
          {/* Capabilities Accordion */}
          <div className="rounded-xl border border-brand-border/60 bg-[#0B1120] overflow-hidden">
            <button
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-white hover:text-brand-red-orange transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Cpu className="w-4 h-4 text-brand-red-orange shrink-0" />
                <span>Capabilities</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                  servicesExpanded ? 'rotate-180 text-brand-red-orange' : ''
                }`}
              />
            </button>

            {servicesExpanded && (
              <div className="px-3 pb-3 pt-1 space-y-3 bg-[#070B14] border-t border-brand-border/40">
                <Link
                  href="/services"
                  className="block py-2 px-3 text-xs font-semibold text-brand-red-orange hover:underline"
                >
                  Explore All 15 Services →
                </Link>

                {/* Category 1: Engineering & Web */}
                <div className="space-y-1">
                  <div className="px-3 pt-1 pb-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-red-orange flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Engineering & Web</span>
                  </div>
                  {ENGINEERING_SERVICES.map((srv) => (
                    <Link
                      key={srv.href}
                      href={srv.href}
                      className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <srv.icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium truncate">{srv.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Category 2: AI, Automation & Data */}
                <div className="space-y-1 pt-2 border-t border-brand-border/30">
                  <div className="px-3 pt-1 pb-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-red-orange flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5" />
                    <span>AI, Automation & Data</span>
                  </div>
                  {AI_DATA_SERVICES.map((srv) => (
                    <Link
                      key={srv.href}
                      href={srv.href}
                      className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <srv.icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium truncate">{srv.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Category 3: Growth & Performance */}
                <div className="space-y-1 pt-2 border-t border-brand-border/30">
                  <div className="px-3 pt-1 pb-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-brand-red-orange flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Growth & Performance</span>
                  </div>
                  {GROWTH_SERVICES.map((srv) => (
                    <Link
                      key={srv.href}
                      href={srv.href}
                      className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <srv.icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="font-medium truncate">{srv.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industries Accordion */}
          <div className="rounded-xl border border-brand-border/60 bg-[#0B1120] overflow-hidden">
            <button
              onClick={() => setIndustriesExpanded(!industriesExpanded)}
              className="w-full flex items-center justify-between p-3.5 text-sm font-semibold text-white hover:text-brand-red-orange transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-brand-red-orange shrink-0" />
                <span>Industries</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                  industriesExpanded ? 'rotate-180 text-brand-red-orange' : ''
                }`}
              />
            </button>

            {industriesExpanded && (
              <div className="px-3 pb-3 pt-1 space-y-1 bg-[#070B14] border-t border-brand-border/40">
                <Link
                  href="/industries"
                  className="block py-2 px-3 text-xs font-semibold text-brand-red-orange hover:underline"
                >
                  View All 7 Industries →
                </Link>
                {INDUSTRIES.map((ind) => (
                  <Link
                    key={ind.href}
                    href={ind.href}
                    className="block py-2 px-3 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {ind.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Primary Navigation Links */}
          <Link
            href="/digital-cmo"
            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-colors ${
              isActive('/digital-cmo')
                ? 'border-brand-red-orange/70 bg-brand-red-orange/10 text-brand-red-orange shadow-[0_0_15px_rgba(255,75,62,0.15)]'
                : 'border-brand-border/60 bg-[#0B1120] text-slate-100 hover:text-brand-red-orange hover:border-brand-red-orange/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-red-orange shrink-0" />
              <span>Digital CMO</span>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${isActive('/digital-cmo') ? 'text-brand-red-orange' : 'text-slate-400'}`} />
          </Link>

          <Link
            href="/digital-cto"
            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-colors ${
              isActive('/digital-cto')
                ? 'border-brand-red-orange/70 bg-brand-red-orange/10 text-brand-red-orange shadow-[0_0_15px_rgba(255,75,62,0.15)]'
                : 'border-brand-border/60 bg-[#0B1120] text-slate-100 hover:text-brand-red-orange hover:border-brand-red-orange/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-brand-red-orange shrink-0" />
              <span>Digital CTO</span>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${isActive('/digital-cto') ? 'text-brand-red-orange' : 'text-slate-400'}`} />
          </Link>

          <Link
            href="/portfolio"
            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-colors ${
              isActive('/portfolio')
                ? 'border-brand-red-orange/70 bg-brand-red-orange/10 text-brand-red-orange shadow-[0_0_15px_rgba(255,75,62,0.15)]'
                : 'border-brand-border/60 bg-[#0B1120] text-slate-100 hover:text-brand-red-orange hover:border-brand-red-orange/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-brand-red-orange shrink-0" />
              <span>Portfolio & Projects</span>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${isActive('/portfolio') ? 'text-brand-red-orange' : 'text-slate-400'}`} />
          </Link>

          <Link
            href="/our-team"
            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-colors ${
              isActive('/our-team')
                ? 'border-brand-red-orange/70 bg-brand-red-orange/10 text-brand-red-orange shadow-[0_0_15px_rgba(255,75,62,0.15)]'
                : 'border-brand-border/60 bg-[#0B1120] text-slate-100 hover:text-brand-red-orange hover:border-brand-red-orange/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-brand-red-orange shrink-0" />
              <span>Our Team</span>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${isActive('/our-team') ? 'text-brand-red-orange' : 'text-slate-400'}`} />
          </Link>

          <Link
            href="/about"
            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-colors ${
              isActive('/about')
                ? 'border-brand-red-orange/70 bg-brand-red-orange/10 text-brand-red-orange shadow-[0_0_15px_rgba(255,75,62,0.15)]'
                : 'border-brand-border/60 bg-[#0B1120] text-slate-100 hover:text-brand-red-orange hover:border-brand-red-orange/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-red-orange shrink-0" />
              <span>About Us</span>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${isActive('/about') ? 'text-brand-red-orange' : 'text-slate-400'}`} />
          </Link>

          <Link
            href="/contact"
            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-colors ${
              isActive('/contact')
                ? 'border-brand-red-orange/70 bg-brand-red-orange/10 text-brand-red-orange shadow-[0_0_15px_rgba(255,75,62,0.15)]'
                : 'border-brand-border/60 bg-[#0B1120] text-slate-100 hover:text-brand-red-orange hover:border-brand-red-orange/40'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-brand-red-orange shrink-0" />
              <span>Contact Us</span>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${isActive('/contact') ? 'text-brand-red-orange' : 'text-slate-400'}`} />
          </Link>

          <Link
            href="/admin"
            className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-semibold transition-colors ${
              isActive('/admin')
                ? 'border-brand-red-orange/70 bg-brand-red-orange/10 text-brand-red-orange shadow-[0_0_15px_rgba(255,75,62,0.15)]'
                : 'border-brand-border/60 bg-[#0B1120] text-slate-200 hover:text-white hover:border-brand-border'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Lock className="w-4 h-4 text-brand-red-orange shrink-0" />
              <span>Admin & Client Portal</span>
            </div>
            <ChevronRight className={`w-4 h-4 shrink-0 ${isActive('/admin') ? 'text-brand-red-orange' : 'text-slate-400'}`} />
          </Link>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-4 border-t border-brand-border/70 bg-[#0B1120] space-y-2.5 shrink-0">
          <Link
            href="/book-consultation"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-brand-red-orange hover:bg-brand-red-deep text-white font-semibold text-sm shadow-[0_0_20px_rgba(255,75,62,0.3)] transition-all active:scale-95 text-center"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={CONTACT_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold transition-colors text-center"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" />
              <span>WhatsApp</span>
            </a>

            <a
              href={CONTACT_CONFIG.phone.telHref}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-brand-surface hover:bg-brand-surfaceHover text-slate-200 border border-brand-border text-xs font-semibold transition-colors text-center"
            >
              <Phone className="w-3.5 h-3.5 text-brand-red-orange shrink-0" />
              <span>Call Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="lg:hidden">
      {/* 1. Hamburger Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-surface border border-brand-border text-slate-100 hover:text-white hover:border-brand-red-orange/50 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red-orange/50 active:scale-95"
        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="w-5 h-5 text-brand-red-orange" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* 2. Portal Rendered Drawer (attached to document.body) */}
      {mounted && isOpen && createPortal(drawerContent, document.body)}
    </div>
  );
}
