'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Target,
  Cpu,
  Bot,
  TrendingUp,
  Play,
  X,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Layers,
  Lightbulb,
  HeartHandshake,
  Search,
  Filter,
  FileSpreadsheet,
  Users,
  Palette,
  BarChart3,
  LineChart,
  Laptop,
  Megaphone,
  Code2,
  Award,
  Terminal,
  UserCheck,
  Briefcase,
  BarChart2,
  Landmark,
  Video,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Mail,
  Globe,
  Share2,
} from 'lucide-react';
import {
  LEADERSHIP_DATA,
  TEAM_MEMBERS,
  VALUE_PILLARS,
  STANDOUT_PILLARS,
  TeamMember,
} from '@/lib/data/team';
import { CONTACT_CONFIG } from '@/lib/config/contact';

// Map icon strings to Lucide components
function renderTeamIcon(iconType: string, accentColor: string) {
  const iconProps = { className: 'w-5 h-5' };
  
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    red: { bg: 'bg-red-500/10', text: 'text-brand-red-orange', border: 'border-red-500/30' },
    blue: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
    purple: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
    amber: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
    pink: { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/30' },
    orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
    teal: { bg: 'bg-teal-500/10', text: 'text-teal-400', border: 'border-teal-500/30' },
    violet: { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/30' },
    sky: { bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/30' },
  };

  const scheme = colorMap[accentColor] || colorMap.red;

  let IconComponent = Code2;
  switch (iconType) {
    case 'FileSpreadsheet': IconComponent = FileSpreadsheet; break;
    case 'Users': IconComponent = Users; break;
    case 'TrendingUp': IconComponent = TrendingUp; break;
    case 'Bot': IconComponent = Bot; break;
    case 'Palette': IconComponent = Palette; break;
    case 'BarChart3': IconComponent = BarChart3; break;
    case 'LineChart': IconComponent = LineChart; break;
    case 'Laptop': IconComponent = Laptop; break;
    case 'Megaphone': IconComponent = Megaphone; break;
    case 'Sparkles': IconComponent = Sparkles; break;
    case 'Code2': IconComponent = Code2; break;
    case 'Award': IconComponent = Award; break;
    case 'Terminal': IconComponent = Terminal; break;
    case 'UserCheck': IconComponent = UserCheck; break;
    case 'Search': IconComponent = Search; break;
    case 'Briefcase': IconComponent = Briefcase; break;
    case 'Cpu': IconComponent = Cpu; break;
    case 'BarChart2': IconComponent = BarChart2; break;
    case 'Landmark': IconComponent = Landmark; break;
    case 'Video': IconComponent = Video; break;
  }

  return (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${scheme.bg} ${scheme.border} ${scheme.text} shadow-sm group-hover:scale-110 transition-transform duration-200`}>
      <IconComponent {...iconProps} />
    </div>
  );
}

function renderValueIcon(iconName: string) {
  switch (iconName) {
    case 'Target': return <Target className="w-5 h-5 text-brand-red-orange" />;
    case 'Cpu': return <Cpu className="w-5 h-5 text-brand-red-orange" />;
    case 'Bot': return <Bot className="w-5 h-5 text-brand-red-orange" />;
    case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-brand-red-orange" />;
    default: return <Sparkles className="w-5 h-5 text-brand-red-orange" />;
  }
}

function renderStandoutIcon(iconName: string) {
  switch (iconName) {
    case 'GraduationCap': return <GraduationCap className="w-6 h-6" />;
    case 'Layers': return <Layers className="w-6 h-6" />;
    case 'Lightbulb': return <Lightbulb className="w-6 h-6" />;
    case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
    default: return <Sparkles className="w-6 h-6" />;
  }
}

export function TeamView() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [storyModalOpen, setStoryModalOpen] = useState<boolean>(false);

  const categories = useMemo(() => {
    return [
      'All',
      'Engineering & Tech',
      'Strategy & Consulting',
      'Marketing & Growth',
      'Creative & Media',
      'Operations & Finance',
    ];
  }, []);

  const filteredMembers = useMemo(() => {
    return TEAM_MEMBERS.filter((member) => {
      const matchesCategory =
        selectedCategory === 'All' || member.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        member.name.toLowerCase().includes(q) ||
        member.designation.toLowerCase().includes(q) ||
        member.department.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="relative overflow-hidden">
      {/* Background radial subtle glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-gradient-to-b from-brand-red-orange/10 via-brand-navy-soft/20 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-20">
        {/* ========================================================= */}
        {/* SECTION 1: HERO SECTION                                   */}
        {/* ========================================================= */}
        <section className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tagline Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-red-orange/10 border border-brand-red-orange/30 text-brand-red-orange text-xs font-mono font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-brand-red-orange animate-pulse" />
                <span>People • Ideas • Technology • Growth</span>
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                  Our Team
                </h1>
                <p className="mt-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
                  A Team of Experts Committed to Your Growth
                </p>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                We are a group of professionals from diverse backgrounds working together
                to help businesses grow through strategy, technology, digital marketing,
                and automation.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/book-consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-red-orange hover:bg-brand-red-deep text-white text-sm font-semibold shadow-[0_0_25px_rgba(255,75,62,0.35)] transition-all active:scale-95 group"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <button
                  type="button"
                  onClick={() => setStoryModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-brand-surface hover:bg-brand-surfaceHover text-slate-200 hover:text-white border border-brand-border/80 text-sm font-semibold transition-all active:scale-95"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-red-orange/20 border border-brand-red-orange/40 flex items-center justify-center text-brand-red-orange">
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </div>
                  <span>Watch Our Story</span>
                </button>
              </div>

              {/* 4 Value Badges below hero */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-brand-border/60">
                {VALUE_PILLARS.map((pillar) => (
                  <div
                    key={pillar.title}
                    className="p-3 rounded-xl bg-brand-navy-soft/60 border border-brand-border/60 flex items-center gap-2.5 hover:border-brand-red-orange/40 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#00111F] flex items-center justify-center shrink-0 border border-brand-border/70">
                      {renderValueIcon(pillar.icon)}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-white truncate">
                        {pillar.title}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        Verified Team
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Animated Emblem Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-brand-navy-soft/95 via-[#071322] to-[#00111F] border border-brand-border/80 p-6 flex flex-col items-center justify-center shadow-[0_25px_60px_rgba(0,0,0,0.7)] overflow-hidden group">
                {/* Tech Dot Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(#FF4B3E_1.2px,transparent_1.2px)] [background-size:24px_24px] opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                
                {/* Ambient Breathing Neon Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-red-orange/25 blur-3xl animate-pulse-glow pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-pink-500/20 blur-2xl pointer-events-none" />

                {/* Rotating Outer Tech Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-dashed border-brand-red-orange/30 animate-[spin_30s_linear_infinite] pointer-events-none" />
                
                {/* Counter-rotating Middle Accent Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-pink-500/20 border-t-brand-red-orange/60 animate-[spin_15s_linear_infinite_reverse] pointer-events-none" />

                {/* Expanding Radar Pulse Ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-brand-red-orange/40 animate-ping opacity-25 pointer-events-none" />

                {/* Central High-Res 3D Animated Logo Emblem */}
                <div className="relative z-10 w-56 h-56 sm:w-60 sm:h-60 transition-transform duration-500 group-hover:scale-105 filter drop-shadow-[0_0_35px_rgba(255,75,62,0.5)]">
                  <Image
                    src="/images/dz-emblem.png"
                    alt="DiziBrand Media 3D Emblem"
                    width={280}
                    height={280}
                    className="w-full h-full object-contain select-none animate-float drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
                    priority
                  />
                </div>

                {/* Orbiting / Surrounding Badges */}
                <div className="relative z-10 w-full mt-4 grid grid-cols-3 gap-2 text-center">
                  {['IDEAS', 'STRATEGY', 'TECHNOLOGY', 'MARKETING', 'AUTOMATION', 'GROWTH'].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="py-1 px-2 rounded-lg bg-black/60 backdrop-blur-md border border-brand-border/80 text-[10px] font-mono font-semibold text-slate-300 tracking-wider hover:text-brand-red-orange hover:border-brand-red-orange/50 hover:bg-brand-red-orange/10 transition-all cursor-default"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: OUR LEADERSHIP                                */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-border/60 pb-4 gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Our Leadership
              </h2>
              <span className="text-brand-red-orange font-mono text-2xl font-light">—</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">
              Visionary Leadership. Stronger Together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LEADERSHIP_DATA.map((leader) => (
              <div
                key={leader.id}
                className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-brand-navy-soft/90 to-[#071322] border border-brand-border/80 hover:border-brand-red-orange/50 transition-all duration-300 shadow-lg hover:shadow-[0_10px_35px_rgba(255,75,62,0.15)] flex flex-col sm:flex-row items-center sm:items-start gap-6"
              >
                {/* Avatar Initial Ring */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-red-orange/20 to-[#00111F] border-2 border-brand-red-orange/50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                    <span className="text-2xl font-extrabold text-white font-mono">
                      {leader.avatarInitials}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-brand-red-orange text-white text-[10px] font-bold font-mono tracking-wider shadow">
                    CORE
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 text-center sm:text-left space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-brand-red-orange transition-colors">
                      {leader.name}
                    </h3>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-brand-red-orange/15 border border-brand-red-orange/30 text-brand-red-orange text-xs font-semibold font-mono self-center sm:self-auto">
                      {leader.role}
                    </span>
                  </div>

                  <p className="text-xs font-mono font-medium text-amber-400/90 tracking-wide">
                    {leader.focus}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                    {leader.description}
                  </p>

                  <div className="pt-3 flex items-center justify-center sm:justify-start gap-3">
                    <Link
                      href="/book-consultation"
                      className="text-xs font-semibold text-brand-red-orange hover:text-white flex items-center gap-1 group/link"
                    >
                      <span>Connect with Leadership</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: OUR TEAM (20 Members Grid with Filters)       */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-border/60 pb-4 gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Our Team
              </h2>
              <span className="text-brand-red-orange font-mono text-2xl font-light">—</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">
              A Team of Professionals Across Strategy, Technology, Marketing and Operations.
            </p>
          </div>

          {/* Category Filter Pills & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <Filter className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-brand-red-orange text-white shadow-[0_0_15px_rgba(255,75,62,0.3)]'
                      : 'bg-brand-surface hover:bg-brand-surfaceHover text-slate-300 hover:text-white border border-brand-border/60'
                  }`}
                >
                  {cat === 'All' ? `All (${TEAM_MEMBERS.length})` : cat}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search team member or role..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-brand-surface border border-brand-border/70 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-red-orange focus:ring-1 focus:ring-brand-red-orange transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 4-Column Grid (Responsive: 1 col on mobile, 2 on tablet, 4 on desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredMembers.map((member) => (
              <div
                key={member.id}
                className="group relative p-4 rounded-xl bg-[#071322]/90 hover:bg-[#0A1A2E] border border-brand-border/70 hover:border-brand-red-orange/50 transition-all duration-200 flex items-start gap-3.5 shadow-sm hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
              >
                {/* Themed Icon Box */}
                {renderTeamIcon(member.iconType, member.accentColor)}

                {/* Member Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-red-orange transition-colors truncate">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
                    {member.designation}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">
                    {member.department}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-brand-surface/40 border border-brand-border/60 space-y-3">
              <Users className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm text-slate-300">
                No team member matched &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-xs text-brand-red-orange hover:underline font-semibold"
              >
                Reset all filters
              </button>
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: WHY OUR TEAM STANDS OUT                       */}
        {/* ========================================================= */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-brand-border/60 pb-4 gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Why Our Team Stands Out
              </h2>
              <span className="text-brand-red-orange font-mono text-2xl font-light">—</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-400 tracking-wide">
              Expertise • Collaboration • Results
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STANDOUT_PILLARS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#071322] to-[#00111F] border border-brand-border/80 hover:border-brand-red-orange/40 transition-all duration-200 flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.accent}`}>
                    {renderStandoutIcon(item.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {item.title}
                    </h3>
                    <div className="text-xs font-mono font-medium text-slate-400 mt-1">
                      {item.subtitle}
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-brand-border/40 flex items-center gap-1.5 text-[11px] font-mono text-brand-red-orange">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Institutional Rigor</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: BOTTOM CALLOUT BANNER                         */}
        {/* ========================================================= */}
        <section className="relative rounded-3xl overflow-hidden border border-brand-red-orange/40 bg-gradient-to-br from-brand-red-orange/15 via-[#0A1A2E] to-[#00111F] p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-wider text-brand-red-orange uppercase">
                Let&apos;s Build
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Your Next Digital Advantage.
              </h3>
              <p className="text-sm font-mono text-slate-300 tracking-wide">
                Strategy • Technology • AI • Data • Growth
              </p>
            </div>

            <div className="shrink-0">
              <Link
                href="/book-consultation"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-brand-red-orange hover:bg-brand-red-deep text-white font-bold text-sm shadow-[0_0_30px_rgba(255,75,62,0.4)] transition-all active:scale-95 group"
              >
                <span>Get a Free Consultation</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: CONNECT WITH US BAR (from PDF bottom)         */}
        {/* ========================================================= */}
        <section className="p-6 rounded-2xl bg-brand-navy-soft/60 border border-brand-border/70 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white uppercase font-mono tracking-wider">
              Connect With Us
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <a
              href={CONTACT_CONFIG.phone.telHref}
              className="flex items-center gap-2 hover:text-brand-red-orange transition-colors"
            >
              <Phone className="w-4 h-4 text-brand-red-orange" />
              <span>{CONTACT_CONFIG.phone.formatted}</span>
            </a>

            <a
              href={CONTACT_CONFIG.email.mailtoHref}
              className="flex items-center gap-2 hover:text-brand-red-orange transition-colors"
            >
              <Mail className="w-4 h-4 text-brand-red-orange" />
              <span>{CONTACT_CONFIG.email.primary}</span>
            </a>

            <a
              href="https://dizibrandmedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-brand-red-orange transition-colors"
            >
              <Globe className="w-4 h-4 text-brand-red-orange" />
              <span>www.dizibrandmedia.com</span>
            </a>
          </div>
        </section>
      </div>

      {/* ========================================================= */}
      {/* MODAL: WATCH OUR STORY                                    */}
      {/* ========================================================= */}
      {storyModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#071322] border border-brand-border p-6 sm:p-8 text-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-brand-red-orange font-bold">
                  DiziBrand Media Story
                </span>
                <h3 className="text-2xl font-extrabold text-white mt-1">
                  Engineered for High-Velocity Growth
                </h3>
              </div>
              <button
                onClick={() => setStoryModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-brand-surface hover:bg-brand-surfaceHover flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                Founded by <strong>Siddharth Gupta</strong> and <strong>Sneha Gupta</strong>,
                DiziBrand Media was built to solve a critical market disconnect: high-growth
                businesses were forced to work with fragmented agencies — one for marketing,
                another for software development, and another for AI automation.
              </p>
              <p>
                We united top engineering talent, Chartered Accountants, CXO advisors, AI
                engineers, and performance media specialists under a unified execution model.
                Every engagement is governed by transparency, non-fabricated metrics, and
                measurable pipeline outcomes.
              </p>
              <div className="p-4 rounded-xl bg-brand-navy-soft border border-brand-border/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-white">20+</div>
                  <div className="text-[11px] text-slate-400 font-mono">Specialists</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-brand-red-orange">100%</div>
                  <div className="text-[11px] text-slate-400 font-mono">Verified Team</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-400">Multi-Tech</div>
                  <div className="text-[11px] text-slate-400 font-mono">Next.js & AI</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-amber-400">Global</div>
                  <div className="text-[11px] text-slate-400 font-mono">Delivery</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-brand-border/60">
              <button
                onClick={() => setStoryModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
              >
                Close
              </button>
              <Link
                href="/book-consultation"
                onClick={() => setStoryModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-brand-red-orange hover:bg-brand-red-deep text-white text-xs font-bold shadow transition-all"
              >
                Book Strategy Call →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
