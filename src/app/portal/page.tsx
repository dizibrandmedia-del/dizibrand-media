import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  Calendar,
  FileCheck,
} from 'lucide-react';
import Link from 'next/link';

export default async function ClientPortalPage() {
  const session = await getServerSession(authOptions);
  let companyId = '';

  try {
    companyId = assertClientTenant(session);
  } catch {
    // If not authenticated or authorized, layout handles redirect
  }

  // If super admin / management inspecting or demo mode
  if (!companyId) {
    const firstCompany = await prisma.company.findFirst({ select: { id: true } });
    companyId = firstCompany?.id || '';
  }

  // Fetch live organization data
  const [company, projects, deliverables, invoices, tickets] = await Promise.all([
    companyId
      ? prisma.company.findUnique({
          where: { id: companyId },
          select: { id: true, name: true, website: true, country: true },
        })
      : null,
    companyId
      ? prisma.project.findMany({
          where: { companyId },
          include: {
            manager: { select: { id: true, name: true, email: true } },
            milestones: {
              orderBy: { order: 'asc' },
              select: {
                id: true,
                title: true,
                status: true,
                order: true,
                dueDate: true,
                clientApprovedAt: true,
              },
            },
          },
        })
      : [],
    companyId
      ? prisma.deliverable.findMany({
          where: { project: { companyId } },
          orderBy: { createdAt: 'desc' },
          take: 4,
          include: {
            project: { select: { id: true, name: true } },
            submittedBy: { select: { id: true, name: true } },
          },
        })
      : [],
    companyId
      ? prisma.invoice.findMany({
          where: { companyId },
          orderBy: { dueDate: 'desc' },
          take: 5,
        })
      : [],
    companyId
      ? prisma.supportTicket.findMany({
          where: { companyId, status: { in: ['OPEN', 'IN_PROGRESS'] } },
        })
      : [],
  ]);

  const activeProject = projects.find((p) => p.status === 'ACTIVE') || projects[0];

  // Calculate milestone stats
  const allMilestones = projects.flatMap((p) => p.milestones);
  const totalMilestones = allMilestones.length;
  const completedMilestones = allMilestones.filter(
    (m) => m.status === 'COMPLETED' || m.status === 'APPROVED'
  ).length;
  const pendingApprovalMilestones = allMilestones.filter(
    (m) => m.status === 'PENDING_CLIENT_APPROVAL'
  );

  // Financial aggregates
  const totalPaid = invoices
    .filter((inv) => inv.status === 'PAID')
    .reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
  const nextInvoice = invoices.find((inv) => inv.status === 'SENT' || inv.status === 'OVERDUE');

  return (
    <div className="space-y-8">
      {/* Client Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono tracking-wider uppercase text-brand-orange">
              Verified Client Tenant
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">
              ID: {company?.id || 'DEMO-TENANT'}
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {company?.name || session?.user?.companyName || 'Organization Workspace'}
          </h1>
          <p className="text-sm text-slate-400">
            Client Executive Dashboard • Primary Sponsor: {session?.user?.name} ({session?.user?.email})
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="success">Active Engagement</Badge>
          <Link
            href="/portal/support"
            className="text-xs px-3.5 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-hover transition-colors shadow-sm"
          >
            Submit Request / Ticket →
          </Link>
        </div>
      </div>

      {/* High-Level Engagement Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-semibold">
              <span>Active Project</span>
              <Briefcase className="w-4 h-4 text-brand-orange" />
            </div>
            <p className="text-base font-bold text-white mt-1 truncate">
              {activeProject?.name || 'No Active Project'}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="success">
                Health: {activeProject?.health || 'Green'}
              </Badge>
              <span className="text-xs text-slate-400 capitalize">
                {activeProject?.status?.toLowerCase().replace('_', ' ') || 'Planning'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-semibold">
              <span>Milestones Progress</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-1">
              {completedMilestones} of {totalMilestones || 0}
            </p>
            <p className="text-xs text-brand-orange mt-1">
              {pendingApprovalMilestones.length > 0
                ? `${pendingApprovalMilestones.length} Pending Approval`
                : `${totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0}% delivered`}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-semibold">
              <span>Billing Settled</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold text-white mt-1">
              ${totalPaid.toLocaleString()}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {nextInvoice
                ? `Next due: ${new Date(nextInvoice.dueDate).toLocaleDateString()}`
                : 'All invoices settled'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-xs text-slate-400 uppercase font-semibold">
              <span>Open Tickets</span>
              <AlertCircle className="w-4 h-4 text-brand-orange" />
            </div>
            <p className="text-2xl font-bold text-white mt-1">
              {tickets.length}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {tickets.length === 0 ? 'No open blockers' : 'In triage by team'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Project Milestones Progress */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Milestone Delivery Roadmap</CardTitle>
            <CardDescription>Structured sprint progress and formal client sign-offs</CardDescription>
          </div>
          {activeProject && (
            <Link
              href={`/portal/projects/${activeProject.id}`}
              className="text-xs text-brand-orange hover:underline flex items-center gap-1"
            >
              Project Cockpit <ArrowUpRight className="w-3 h-3" />
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {activeProject?.milestones && activeProject.milestones.length > 0 ? (
            <div className="space-y-3">
              {activeProject.milestones.map((m) => {
                const isApproved = m.status === 'APPROVED' || m.status === 'COMPLETED';
                const isPending = m.status === 'PENDING_CLIENT_APPROVAL';
                const isInProgress = m.status === 'IN_PROGRESS';

                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-lg border transition-all ${
                      isApproved
                        ? 'border-emerald-500/30 bg-emerald-500/5'
                        : isPending
                        ? 'border-amber-500/40 bg-amber-500/5'
                        : isInProgress
                        ? 'border-brand-orange/40 bg-brand-orange/5'
                        : 'border-brand-border bg-brand-surface/20 opacity-60'
                    } flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      {isApproved ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Clock className="w-5 h-5 text-brand-orange shrink-0" />
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-white">{m.title}</h4>
                        <p className="text-xs text-slate-400">
                          {m.dueDate
                            ? `Target Date: ${new Date(m.dueDate).toLocaleDateString()}`
                            : 'Sprint milestone'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <Badge
                        variant={
                          isApproved ? 'success' : isPending ? 'warning' : isInProgress ? 'orange' : 'outline'
                        }
                      >
                        {m.status.replace(/_/g, ' ')}
                      </Badge>
                      {m.clientApprovedAt && (
                        <span className="text-[10px] text-slate-400 hidden sm:inline">
                          Signed off {new Date(m.clientApprovedAt).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-slate-400">No milestones registered for this project yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Deliverable Review & Invoices Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deliverable Review */}
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Deliverables</CardTitle>
              <CardDescription>Approved outputs and assets awaiting review</CardDescription>
            </div>
            <Link href="/portal/deliverables" className="text-xs text-brand-orange hover:underline">
              View All →
            </Link>
          </CardHeader>
          <CardContent>
            {deliverables.length > 0 ? (
              <div className="space-y-3">
                {deliverables.map((deliv) => (
                  <div
                    key={deliv.id}
                    className="p-3.5 rounded-lg border border-brand-border bg-brand-surface/30 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm truncate">
                        {deliv.title}
                      </span>
                      <Badge
                        variant={
                          deliv.status === 'Approved'
                            ? 'success'
                            : deliv.status === 'Changes Requested'
                            ? 'destructive'
                            : 'warning'
                        }
                      >
                        {deliv.status}
                      </Badge>
                    </div>
                    {deliv.description && (
                      <p className="text-xs text-slate-400 line-clamp-2">{deliv.description}</p>
                    )}
                    <div className="pt-1 flex items-center justify-between text-xs">
                      <span className="text-slate-500">
                        Submitted by {deliv.submittedBy.name}
                      </span>
                      {deliv.fileUrl || deliv.externalLink ? (
                        <a
                          href={deliv.fileUrl || deliv.externalLink || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-orange hover:underline flex items-center gap-1 font-medium"
                        >
                          View Asset <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No deliverables submitted yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Invoices & Commercials</CardTitle>
              <CardDescription>Billing history and upcoming retainers</CardDescription>
            </div>
            <Link href="/portal/invoices" className="text-xs text-brand-orange hover:underline">
              Billing Ledger →
            </Link>
          </CardHeader>
          <CardContent>
            {invoices.length > 0 ? (
              <div className="space-y-3">
                {invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3 rounded-lg border border-brand-border bg-brand-surface/30 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-semibold text-white">
                        {inv.invoiceNumber}
                      </span>
                      <p className="text-xs text-slate-400">
                        {inv.currency} {Number(inv.totalAmount).toLocaleString()} • Due{' '}
                        {new Date(inv.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge
                      variant={
                        inv.status === 'PAID'
                          ? 'success'
                          : inv.status === 'OVERDUE'
                          ? 'destructive'
                          : 'orange'
                      }
                    >
                      {inv.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">No invoices generated for your organization.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
