import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, CheckCircle2, User, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default async function ClientProjectsPage() {
  const session = await getServerSession(authOptions);
  let companyId = '';

  try {
    companyId = assertClientTenant(session);
  } catch {}

  if (!companyId) {
    const firstCompany = await prisma.company.findFirst({ select: { id: true } });
    companyId = firstCompany?.id || '';
  }

  const projects = companyId
    ? await prisma.project.findMany({
        where: { companyId },
        orderBy: { updatedAt: 'desc' },
        include: {
          manager: { select: { id: true, name: true, email: true } },
          milestones: {
            orderBy: { order: 'asc' },
            select: { id: true, title: true, status: true },
          },
          _count: {
            select: { deliverables: true, tasks: true },
          },
        },
      })
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Active Projects</h1>
          <p className="text-sm text-slate-400">
            Overview of all strategic initiatives, roadmaps, and delivery progress for your organization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {projects.length} Total Project{projects.length === 1 ? '' : 's'}
          </Badge>
        </div>
      </div>

      {projects.length === 0 ? (
        <Card className="bg-brand-charcoal/80 border-brand-border text-center py-12">
          <CardContent>
            <Briefcase className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">No Projects Found</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
              Your organization currently has no active delivery projects logged. Once an agreement is finalized, your dedicated project workspace will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const totalM = project.milestones.length;
            const completedM = project.milestones.filter(
              (m) => m.status === 'COMPLETED' || m.status === 'APPROVED'
            ).length;
            const pct = totalM > 0 ? Math.round((completedM / totalM) * 100) : 0;

            return (
              <Card
                key={project.id}
                className="bg-brand-charcoal/80 border-brand-border hover:border-brand-orange/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-brand-orange font-semibold">
                        {project.projectCode}
                      </span>
                      <div className="flex items-center gap-2">
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
                        <Badge variant="outline">
                          {project.status.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-white line-clamp-1">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      PM: {project.manager?.name || 'Assigned Lead'}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                        <span>Milestone Progress</span>
                        <span className="font-semibold text-white">
                          {completedM} / {totalM} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-brand-surface overflow-hidden">
                        <div
                          className="h-full bg-brand-orange transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Timeline & Budget */}
                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-brand-border/60">
                      <div>
                        <span className="text-slate-500 block">Target Completion</span>
                        <span className="font-medium text-slate-200">
                          {project.targetDate
                            ? new Date(project.targetDate).toLocaleDateString()
                            : 'TBD'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Deliverables</span>
                        <span className="font-medium text-slate-200">
                          {project._count.deliverables} Assets Logged
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 border-t border-brand-border/60 bg-brand-surface/20 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    {project.budget
                      ? `${project.currency} ${Number(project.budget).toLocaleString()}`
                      : 'Retainer Model'}
                  </span>
                  <Link
                    href={`/portal/projects/${project.id}`}
                    className="text-xs font-semibold text-brand-orange hover:text-brand-orange-hover flex items-center gap-1 transition-colors"
                  >
                    Open Cockpit <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
