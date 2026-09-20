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
  CheckSquare,
  Calendar,
  DollarSign,
  FileText,
  LogOut,
  FolderKanban,
  FileCheck,
} from 'lucide-react';

export default async function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login?callbackUrl=/team');
  }

  const role = session.user.role;

  // Client role must not access team portal
  if (role === 'CLIENT') {
    redirect('/portal');
  }

  // Generate dynamic navigation items based on the active role within the single Team Portal
  interface NavItem {
    href: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }

  let navItems: NavItem[] = [];

  if (role === 'SALES') {
    navItems = [
      { href: '/team', label: 'Sales Overview', icon: LayoutDashboard },
      { href: '/team/leads', label: 'My Assigned Leads', icon: Users },
      { href: '/team/pipeline', label: 'Deal Pipeline', icon: FolderKanban },
      { href: '/team/meetings', label: 'Scheduled Calls', icon: Calendar },
      { href: '/team/proposals', label: 'Proposals', icon: FileText },
    ];
  } else if (role === 'PROJECT_MANAGER') {
    navItems = [
      { href: '/team', label: 'PM Overview', icon: LayoutDashboard },
      { href: '/team/projects', label: 'Assigned Projects', icon: Briefcase },
      { href: '/team/tasks', label: 'Sprint Task Board', icon: CheckSquare },
      { href: '/team/milestones', label: 'Milestone Roadmap', icon: FolderKanban },
      { href: '/team/approvals', label: 'Client Approvals', icon: FileCheck },
    ];
  } else if (role === 'EMPLOYEE') {
    navItems = [
      { href: '/team', label: 'My Workspace', icon: LayoutDashboard },
      { href: '/team/tasks', label: 'My Assigned Tasks', icon: CheckSquare },
      { href: '/team/deliverables', label: 'Submit Deliverables', icon: FileCheck },
      { href: '/team/projects', label: 'Project Specs', icon: Briefcase },
    ];
  } else if (role === 'FREELANCER') {
    // Strictly restricted navigation for Freelancers
    navItems = [
      { href: '/team', label: 'My Contract Tasks', icon: CheckSquare },
      { href: '/team/deliverables', label: 'Deliverables', icon: FileCheck },
      { href: '/team/payments', label: 'Payment Status', icon: DollarSign },
    ];
  } else {
    // Super Admin / Management viewing the Team Portal
    navItems = [
      { href: '/team', label: 'Team Overview', icon: LayoutDashboard },
      { href: '/team/projects', label: 'All Projects', icon: Briefcase },
      { href: '/team/tasks', label: 'All Tasks', icon: CheckSquare },
      { href: '/admin', label: 'Return to Super Admin', icon: FolderKanban },
    ];
  }

  return (
    <div className="min-h-screen flex bg-brand-navy text-slate-100">
      {/* Unified Team Sidebar with Role-Specific Navigation */}
      <aside className="w-64 border-r border-brand-border bg-brand-navy-soft flex flex-col fixed inset-y-0 z-30">
        <div className="h-16 flex items-center px-5 border-b border-brand-border">
          <Logo variant="portal" size="sm" href="/team" portalBadge="Team" />
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
              <p className="text-[10px] text-brand-orange font-mono font-semibold">{role}</p>
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
              Team Workspace
            </span>
            <span className="text-slate-600">•</span>
            <Badge variant="orange" className="text-[11px] font-mono">
              {role.replace('_', ' ')}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-slate-300 hover:text-brand-orange transition-colors"
            >
              Public Website ↗
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
