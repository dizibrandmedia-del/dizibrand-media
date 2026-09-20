import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, ShieldAlert, Key, Database, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminSettingsPage() {
  const sections = [
    {
      title: 'User Accounts & RBAC Governance',
      description: 'Manage internal team roles (Super Admin, Management, Sales, PM, Employee, Freelancer) and client accounts.',
      href: '/admin/settings/users',
      icon: Users,
      badge: 'Strict RBAC Active',
      cta: 'Manage Users',
    },
    {
      title: 'Immutable Audit Logs',
      description: 'Inspect cryptographic-grade tamper-evident trail of all platform mutations, role changes, and commercial actions.',
      href: '/admin/settings/audit-logs',
      icon: ShieldAlert,
      badge: 'Audit Trail Live',
      cta: 'View Audit Logs',
    },
    {
      title: 'Security & Access Architecture',
      description: 'Review JWT session lifetimes, CSRF tokens, honeypot anti-spam policies, and tenant isolation guards.',
      href: '/admin/settings/audit-logs',
      icon: ShieldCheck,
      badge: 'Zero-Trust Architecture',
      cta: 'Review Security Controls',
    },
    {
      title: 'Database & Multi-Tenant Boundaries',
      description: 'PostgreSQL schema integrity, connection pools, and companyId foreign key tenant isolation status.',
      href: '/admin/settings/audit-logs',
      icon: Database,
      badge: 'PostgreSQL Normalized',
      cta: 'View Storage Status',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Platform Settings & Governance</h1>
        <p className="text-sm text-slate-400">
          Super Admin configuration, security auditing, role assignments, and tenant boundaries.
        </p>
      </div>

      {/* Grid of Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <Card key={sec.title} className="bg-brand-charcoal/80 border-brand-border flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <Badge variant="outline" className="font-mono text-xs text-slate-300">
                    {sec.badge}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg mt-3">{sec.title}</CardTitle>
                <CardDescription className="text-slate-400 text-xs leading-relaxed">
                  {sec.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href={sec.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-white transition-colors"
                >
                  {sec.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
