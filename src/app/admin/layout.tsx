import React from 'react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/logo';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  DollarSign,
  ShieldAlert,
  Settings,
  LogOut,
  FolderKanban,
  FileEdit,
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login?callbackUrl=/admin');
  }

  if (session.user.role !== 'SUPER_ADMIN' && session.user.role !== 'MANAGEMENT') {
    redirect('/team');
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/crm/leads', label: 'Leads & CRM', icon: Users },
    { href: '/admin/crm/pipeline', label: 'Deals Pipeline', icon: FolderKanban },
    { href: '/admin/projects', label: 'Projects Delivery', icon: Briefcase },
    { href: '/admin/cms', label: 'CMS & Content', icon: FileEdit },
    { href: '/admin/team', label: 'Team & Talent', icon: Users },
    { href: '/admin/finance', label: 'Finance & Invoices', icon: DollarSign },
    { href: '/admin/settings/audit-logs', label: 'Audit Logs', icon: ShieldAlert },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-brand-navy text-slate-100">
      {/* Sidebar */}
      <aside className="w-64 border-r border-brand-border bg-brand-navy-soft flex flex-col fixed inset-y-0 z-30">
        <div className="h-16 flex items-center px-5 border-b border-brand-border">
          <Logo variant="portal" size="sm" href="/admin" portalBadge="Admin" />
        </div>

        {/* Navigation links */}
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
              <p className="text-[10px] text-slate-400 font-mono">{session.user.role}</p>
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
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Management Portal
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-300 hover:text-brand-orange transition-colors"
            >
              View Public Website ↗
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
