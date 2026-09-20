import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/logo';
import {
  LayoutDashboard,
  Briefcase,
  FileCheck,
  FileText,
  DollarSign,
  HelpCircle,
  LogOut,
  Building2,
  Calendar,
} from 'lucide-react';

export default async function ClientPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login?callbackUrl=/portal');
  }

  // If user is an employee/sales/PM, redirect to team portal unless they are an admin inspecting client view
  if (
    session.user.role !== 'CLIENT' &&
    session.user.role !== 'SUPER_ADMIN' &&
    session.user.role !== 'MANAGEMENT'
  ) {
    redirect('/team');
  }

  const navItems = [
    { href: '/portal', label: 'Organization Overview', icon: LayoutDashboard },
    { href: '/portal/projects', label: 'Active Projects', icon: Briefcase },
    { href: '/portal/deliverables', label: 'Deliverables & Approvals', icon: FileCheck },
    { href: '/portal/documents', label: 'Documents & Contracts', icon: FileText },
    { href: '/portal/meetings', label: 'Strategy Meetings', icon: Calendar },
    { href: '/portal/invoices', label: 'Invoices & Billing', icon: DollarSign },
    { href: '/portal/support', label: 'Support & Change Requests', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen flex bg-brand-navy text-slate-100">
      {/* Client Portal Sidebar */}
      <aside className="w-64 border-r border-brand-border bg-brand-navy-soft flex flex-col fixed inset-y-0 z-30">
        <div className="h-16 flex items-center px-5 border-b border-brand-border">
          <Logo variant="portal" size="sm" href="/portal" portalBadge="Client" />
        </div>

        {/* Client Organization Badge */}
        <div className="px-4 py-3 border-b border-brand-border/60 bg-brand-surface/30">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-orange shrink-0" />
            <span className="text-xs font-semibold text-slate-200 truncate">
              {session.user.companyName || 'My Organization'}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-brand-surface/70 transition-colors"
              >
                <Icon className="w-4 h-4 text-slate-400 group-hover:text-brand-orange" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User profile footer */}
        <div className="p-4 border-t border-brand-border/60 bg-brand-black/40">
          <div className="flex items-center justify-between">
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{session.user.name}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">{session.user.email}</p>
            </div>
            <Link
              href="/api/auth/signout"
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-brand-surface rounded transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-brand-border bg-brand-charcoal/40 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Client Portal
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-semibold text-white">
              {session.user.companyName || 'Client Workspace'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/portal/support"
              className="text-xs px-3 py-1.5 rounded-lg border border-brand-border hover:border-brand-orange text-slate-200 transition-colors"
            >
              Raise Request / Ticket
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
