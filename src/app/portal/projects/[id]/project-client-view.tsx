'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  DollarSign,
  FileCheck,
  User,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';

interface ProjectClientViewProps {
  project: any;
}

export function ProjectClientView({ project }: ProjectClientViewProps) {
  const [milestones, setMilestones] = useState(project.milestones || []);
  const [approvingMilestoneId, setApprovingMilestoneId] = useState<string | null>(null);
  const [approvalSuccessMessage, setApprovalSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleApproveMilestone = async (milestoneId: string) => {
    setApprovingMilestoneId(milestoneId);
    setErrorMessage(null);
    setApprovalSuccessMessage(null);

    try {
      const res = await fetch(`/api/portal/milestones/${milestoneId}/approve`, {
        method: 'POST',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to approve milestone');
      }

      // Update state locally
      setMilestones((prev: any[]) =>
        prev.map((m) => (m.id === milestoneId ? { ...m, status: 'APPROVED', clientApprovedAt: new Date().toISOString() } : m))
      );
      setApprovalSuccessMessage('Milestone sign-off recorded successfully.');
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during approval.');
    } finally {
      setApprovingMilestoneId(null);
    }
  };

  const totalMilestones = milestones.length;
  const completedMilestones = milestones.filter(
    (m: any) => m.status === 'COMPLETED' || m.status === 'APPROVED'
  ).length;
  const progressPercent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-brand-border/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold text-brand-orange">
              {project.projectCode}
            </span>
            <span className="text-slate-600">•</span>
            <Badge
              variant={
                project.health === 'Green'
                  ? 'success'
                  : project.health === 'Amber'
                  ? 'warning'
                  : 'destructive'
              }
            >
              Health: {project.health}
            </Badge>
            <Badge variant="outline">{project.status.replace(/_/g, ' ')}</Badge>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{project.name}</h1>
          <p className="text-sm text-slate-400 mt-1">
            Organization: <span className="text-slate-200 font-medium">{project.company?.name}</span> • Project Lead:{' '}
            <span className="text-slate-200 font-medium">{project.manager?.name || 'Assigned Lead'}</span> ({project.manager?.email})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/portal/deliverables"
            className="text-xs px-3.5 py-2 rounded-lg border border-brand-border hover:border-brand-orange text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5 text-brand-orange" />
            Deliverables Hub
          </Link>
          <Link
            href="/portal/support"
            className="text-xs px-3.5 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-hover transition-colors"
          >
            Raise Change Request
          </Link>
        </div>
      </div>

      {/* Notifications / Alerts */}
      {approvalSuccessMessage && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{approvalSuccessMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* High-Level Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <span className="text-xs text-slate-400 uppercase font-semibold">Delivery Progress</span>
            <p className="text-2xl font-bold text-white mt-1">
              {completedMilestones} of {totalMilestones} Milestones
            </p>
            <div className="w-full h-1.5 rounded-full bg-brand-surface mt-2.5 overflow-hidden">
              <div
                className="h-full bg-brand-orange transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">{progressPercent}% complete</span>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <span className="text-xs text-slate-400 uppercase font-semibold">Timeline Target</span>
            <p className="text-lg font-bold text-white mt-1">
              {project.targetDate ? new Date(project.targetDate).toLocaleDateString() : 'Active Sprint'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Started: {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'Kickoff'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <span className="text-xs text-slate-400 uppercase font-semibold">Commercial Budget</span>
            <p className="text-2xl font-bold text-white mt-1">
              {project.budget
                ? `${project.currency} ${Number(project.budget).toLocaleString()}`
                : 'Retainer Model'}
            </p>
            <p className="text-xs text-slate-400 mt-1">
              {project.invoices?.length || 0} Invoices logged
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Milestones Delivery Roadmap */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <CardTitle>Milestones Delivery Roadmap & Approvals</CardTitle>
          <CardDescription>
            Review sprint deliverables and provide formal client sign-off for completed milestones.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {milestones.length === 0 ? (
            <p className="text-sm text-slate-400">No milestones registered yet.</p>
          ) : (
            <div className="space-y-4">
              {milestones.map((m: any, idx: number) => {
                const isApproved = m.status === 'APPROVED' || m.status === 'COMPLETED';
                const isPendingApproval = m.status === 'PENDING_CLIENT_APPROVAL';
                const isInProgress = m.status === 'IN_PROGRESS';

                return (
                  <div
                    key={m.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isApproved
                        ? 'border-emerald-500/30 bg-emerald-500/5'
                        : isPendingApproval
                        ? 'border-amber-500/40 bg-amber-500/5 ring-1 ring-amber-500/20'
                        : isInProgress
                        ? 'border-brand-orange/40 bg-brand-orange/5'
                        : 'border-brand-border bg-brand-surface/20 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="mt-0.5">
                          {isApproved ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isPendingApproval ? (
                            <Clock className="w-5 h-5 text-amber-400" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border border-slate-500 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                              {idx + 1}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold text-white">{m.title}</h4>
                            <Badge
                              variant={
                                isApproved
                                  ? 'success'
                                  : isPendingApproval
                                  ? 'warning'
                                  : isInProgress
                                  ? 'orange'
                                  : 'outline'
                              }
                            >
                              {m.status.replace(/_/g, ' ')}
                            </Badge>
                          </div>
                          {m.description && (
                            <p className="text-xs text-slate-400 mt-1 max-w-xl">{m.description}</p>
                          )}
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                            <span>Target: {m.dueDate ? new Date(m.dueDate).toLocaleDateString() : 'Sprint'}</span>
                            {m.clientApprovedAt && (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Signed off on{' '}
                                {new Date(m.clientApprovedAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Button: Formal Client Sign-off */}
                      <div className="flex items-center gap-2 shrink-0">
                        {!isApproved && (
                          <Button
                            size="sm"
                            variant="primary"
                            disabled={approvingMilestoneId === m.id}
                            onClick={() => handleApproveMilestone(m.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1.5"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            {approvingMilestoneId === m.id ? 'Recording Sign-off...' : 'Approve Milestone'}
                          </Button>
                        )}
                        {isApproved && (
                          <Badge variant="success" className="text-xs py-1 px-2.5">
                            ✓ Approved
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Milestone Deliverables Sub-list */}
                    {m.deliverables && m.deliverables.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-brand-border/40 pl-8 space-y-2">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Milestone Deliverables:
                        </span>
                        {m.deliverables.map((deliv: any) => (
                          <div
                            key={deliv.id}
                            className="flex items-center justify-between text-xs bg-brand-surface/40 p-2 rounded-lg border border-brand-border/40"
                          >
                            <span className="text-slate-300 font-medium">{deliv.title}</span>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  deliv.status === 'Approved'
                                    ? 'success'
                                    : deliv.status === 'Changes Requested'
                                    ? 'destructive'
                                    : 'warning'
                                }
                                className="text-[10px]"
                              >
                                {deliv.status}
                              </Badge>
                              {deliv.fileUrl || deliv.externalLink ? (
                                <a
                                  href={deliv.fileUrl || deliv.externalLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-brand-orange hover:underline flex items-center gap-0.5"
                                >
                                  Asset <ArrowUpRight className="w-3 h-3" />
                                </a>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Staffed Team & Invoices Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staffed Team */}
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardHeader>
            <CardTitle>Staffed Project Specialists</CardTitle>
            <CardDescription>Direct point of contacts and assigned engineering talent</CardDescription>
          </CardHeader>
          <CardContent>
            {project.members && project.members.length > 0 ? (
              <div className="space-y-3">
                {project.members.map((mem: any) => (
                  <div
                    key={mem.id}
                    className="p-3 rounded-lg border border-brand-border bg-brand-surface/30 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-surface flex items-center justify-center text-xs font-bold text-brand-orange border border-brand-border">
                        {mem.user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{mem.user.name}</p>
                        <p className="text-xs text-slate-400">{mem.roleInProject}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px]">
                      {mem.user.role.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Project team is currently being assembled.</p>
            )}
          </CardContent>
        </Card>

        {/* Project Invoices */}
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Project Billing</CardTitle>
              <CardDescription>Retainers and invoices associated with this project</CardDescription>
            </div>
            <Link href="/portal/invoices" className="text-xs text-brand-orange hover:underline">
              Ledger →
            </Link>
          </CardHeader>
          <CardContent>
            {project.invoices && project.invoices.length > 0 ? (
              <div className="space-y-3">
                {project.invoices.map((inv: any) => (
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
              <p className="text-sm text-slate-400">No invoices generated for this project.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
