import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckSquare, Briefcase, Calendar, FileCheck, ArrowRight, Clock, Users, Phone, DollarSign } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { ProjectStatus, TaskStatus, LeadStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

export default async function TeamDashboardPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role || 'EMPLOYEE';
  const userId = session?.user?.id || '';

  // Fetch contextual metrics based on user role
  let activeProjectsCount = 0;
  let myTasksCount = 0;
  let pendingDeliverablesCount = 0;
  let assignedLeadsCount = 0;
  let recentTasks: any[] = [];
  let recentProjects: any[] = [];
  let assignedLeads: any[] = [];

  try {
    if (role === 'SALES') {
      const [leadsCount, leads] = await Promise.all([
        prisma.lead.count({
          where: { assignedToId: userId, status: { notIn: [LeadStatus.LOST, LeadStatus.WON] } },
        }),
        prisma.lead.findMany({
          where: { assignedToId: userId },
          take: 5,
          orderBy: { updatedAt: 'desc' },
        }),
      ]);
      assignedLeadsCount = leadsCount;
      assignedLeads = leads;
    } else if (role === 'PROJECT_MANAGER') {
      const [projCount, projs, delivCount] = await Promise.all([
        prisma.project.count({
          where: { status: { in: [ProjectStatus.PLANNING, ProjectStatus.KICKOFF, ProjectStatus.ACTIVE] } },
        }),
        prisma.project.findMany({
          where: { status: { in: [ProjectStatus.PLANNING, ProjectStatus.KICKOFF, ProjectStatus.ACTIVE] } },
          take: 4,
          orderBy: { updatedAt: 'desc' },
          include: {
            company: { select: { name: true } },
            _count: { select: { tasks: true, deliverables: true } },
          },
        }),
        prisma.deliverable.count({
          where: { status: 'Submitted' },
        }),
      ]);
      activeProjectsCount = projCount;
      recentProjects = projs;
      pendingDeliverablesCount = delivCount;
    } else {
      // Employee / Freelancer / Management
      const [tasksCount, tasks, delivs] = await Promise.all([
        prisma.task.count({
          where: {
            assignedToId: userId,
            status: { notIn: [TaskStatus.COMPLETED] },
          },
        }),
        prisma.task.findMany({
          where: { assignedToId: userId },
          take: 5,
          orderBy: { dueDate: 'asc' },
          include: {
            project: { select: { name: true, projectCode: true } },
          },
        }),
        prisma.deliverable.count({
          where: { submittedById: userId },
        }),
      ]);
      myTasksCount = tasksCount;
      recentTasks = tasks;
      pendingDeliverablesCount = delivs;
    }
  } catch (err) {
    console.error('Failed to load team dashboard metrics:', err);
  }

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Welcome back, {session?.user?.name?.split(' ')[0]}
          </h1>
          <p className="text-sm text-slate-400">
            DiziBrand Team Workspace • Active Role:{' '}
            <span className="text-brand-orange font-semibold">{role.replace('_', ' ')}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="orange" className="font-mono">
            {role.replace('_', ' ')}
          </Badge>
          {session?.user?.role === 'SUPER_ADMIN' && (
            <Link
              href="/admin"
              className="text-xs px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-slate-300 hover:text-white transition-colors"
            >
              Super Admin Portal →
            </Link>
          )}
        </div>
      </div>

      {/* Role-tailored workspace views */}
      {role === 'SALES' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  Assigned Opportunities
                </span>
                <p className="text-2xl font-bold text-white mt-1">{assignedLeadsCount}</p>
                <p className="text-xs text-brand-orange mt-1">In active sales cycle</p>
              </CardContent>
            </Card>
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  Pipeline Board
                </span>
                <p className="text-2xl font-bold text-white mt-1">Live</p>
                <Link href="/team/pipeline" className="text-xs text-brand-orange hover:underline mt-1 block">
                  Open Deals Board →
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  Conversion Actions
                </span>
                <p className="text-2xl font-bold text-emerald-400 mt-1">Ready</p>
                <Link href="/team/leads" className="text-xs text-slate-300 hover:underline mt-1 block">
                  Review Priority Inquiries →
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-base">My Assigned Inbound Leads</CardTitle>
                <CardDescription className="text-slate-400">
                  Prioritized by automated intent scoring
                </CardDescription>
              </div>
              <Link href="/team/leads" className="text-xs text-brand-orange hover:underline font-mono">
                View All Leads →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assignedLeads.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    No active leads currently assigned. Check the general inbound queue in the admin portal.
                  </p>
                ) : (
                  assignedLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-3.5 rounded-lg border border-brand-border bg-brand-surface/40 flex items-center justify-between hover:bg-brand-surface/60 transition-colors"
                    >
                      <div>
                        <span className="font-medium text-white text-sm">
                          {lead.companyName} ({lead.firstName} {lead.lastName})
                        </span>
                        <p className="text-xs text-slate-400">
                          {lead.serviceName || 'Strategic Engagement'} • {lead.country}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-brand-orange font-bold">
                          Score: {lead.score}/100
                        </span>
                        <Badge variant="orange">{lead.status}</Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {role === 'PROJECT_MANAGER' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  Active Engagements
                </span>
                <p className="text-2xl font-bold text-white mt-1">{activeProjectsCount}</p>
                <p className="text-xs text-emerald-400 mt-1">Delivery lifecycle active</p>
              </CardContent>
            </Card>
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  Pending Deliverable Reviews
                </span>
                <p className="text-2xl font-bold text-brand-orange mt-1">{pendingDeliverablesCount}</p>
                <Link href="/team/deliverables" className="text-xs text-brand-orange hover:underline mt-1 block">
                  Review submissions →
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  Sprint Task Board
                </span>
                <p className="text-2xl font-bold text-white mt-1">Kanban</p>
                <Link href="/team/tasks" className="text-xs text-slate-300 hover:underline mt-1 block">
                  Manage Sprint Tasks →
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-base">Active Client Projects</CardTitle>
                <CardDescription className="text-slate-400">
                  Sprint progress and milestone health
                </CardDescription>
              </div>
              <Link href="/team/projects" className="text-xs text-brand-orange hover:underline font-mono">
                View All Projects →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentProjects.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center col-span-2">
                    No active projects. Converted CRM deals will appear here.
                  </p>
                ) : (
                  recentProjects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-4 rounded-lg border border-brand-border bg-brand-surface/30 space-y-2 hover:bg-brand-surface/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white text-sm">{proj.name}</span>
                        <Badge variant="success">{proj.status}</Badge>
                      </div>
                      <p className="text-xs text-slate-400">
                        {proj.company?.name} • Code:{' '}
                        <span className="font-mono text-brand-orange">{proj.projectCode}</span>
                      </p>
                      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-brand-border/40">
                        <span className="font-mono">
                          {proj._count?.tasks || 0} Tasks • {proj._count?.deliverables || 0} Deliverables
                        </span>
                        <Link
                          href={`/team/projects/${proj.id}`}
                          className="text-brand-orange hover:underline font-medium"
                        >
                          Cockpit →
                        </Link>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {(role === 'EMPLOYEE' || role === 'FREELANCER' || role === 'SUPER_ADMIN' || role === 'MANAGEMENT') && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  My Assigned Tasks
                </span>
                <p className="text-2xl font-bold text-white mt-1">{myTasksCount}</p>
                <Link href="/team/tasks" className="text-xs text-brand-orange hover:underline mt-1 block">
                  Open My Task Queue →
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  Deliverables Submitted
                </span>
                <p className="text-2xl font-bold text-white mt-1">{pendingDeliverablesCount}</p>
                <Link href="/team/deliverables" className="text-xs text-slate-300 hover:underline mt-1 block">
                  View Deliverables Hub →
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
                  {role === 'FREELANCER' ? 'Freelancer Profile' : 'Support Tickets'}
                </span>
                <p className="text-2xl font-bold text-emerald-400 mt-1">Active</p>
                <Link
                  href={role === 'FREELANCER' ? '/team/freelancer/profile' : '/team/tickets'}
                  className="text-xs text-brand-orange hover:underline mt-1 block"
                >
                  {role === 'FREELANCER' ? 'Update Availability →' : 'Triage Tickets →'}
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-base">My Active Sprint Tasks</CardTitle>
                <CardDescription className="text-slate-400">
                  Tasks currently assigned to your queue across active client engagements
                </CardDescription>
              </div>
              <Link href="/team/tasks" className="text-xs text-brand-orange hover:underline font-mono">
                View Full Task Board →
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTasks.length === 0 ? (
                  <p className="text-xs text-slate-500 py-6 text-center">
                    No active tasks assigned to you right now.
                  </p>
                ) : (
                  recentTasks.map((t) => (
                    <div
                      key={t.id}
                      className="p-3.5 rounded-lg border border-brand-border bg-brand-surface/30 flex items-center justify-between hover:bg-brand-surface/50 transition-colors"
                    >
                      <div>
                        <span className="font-medium text-white text-sm">{t.title}</span>
                        <p className="text-xs text-slate-400">
                          {t.project?.name} ({t.project?.projectCode})
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          variant={
                            t.status === 'COMPLETED'
                              ? 'success'
                              : t.status === 'IN_PROGRESS'
                              ? 'orange'
                              : t.status === 'BLOCKED'
                              ? 'destructive'
                              : 'default'
                          }
                        >
                          {t.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
