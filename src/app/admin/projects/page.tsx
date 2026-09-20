import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
  let projects: any[] = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        company: { select: { id: true, name: true } },
        manager: { select: { id: true, name: true, email: true } },
        milestones: {
          orderBy: { order: 'asc' },
          take: 3,
        },
        _count: {
          select: { tasks: true, deliverables: true },
        },
      },
    });
  } catch (err) {
    console.error('Failed to load projects:', err);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">ACTIVE</Badge>;
      case 'PLANNING':
        return <Badge variant="orange">PLANNING</Badge>;
      case 'KICKOFF':
        return <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/30">KICKOFF</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline">COMPLETED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Client Projects Delivery</h1>
          <p className="text-sm text-slate-400">
            Enterprise project delivery, milestone approvals, and engineering sprint governance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/crm/pipeline"
            className="text-xs px-3 py-2 rounded-lg bg-brand-surface text-slate-300 border border-brand-border hover:text-white transition-colors"
          >
            ← View Deals Pipeline
          </Link>
        </div>
      </div>

      {/* Projects Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <CardTitle className="text-white text-base">Active Client Engagements</CardTitle>
          <CardDescription className="text-slate-400">
            Automated from won CRM deals and actively staffed by project managers and specialists
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Code & Project</th>
                  <th className="py-3.5 px-4 font-semibold">Client Organization</th>
                  <th className="py-3.5 px-4 font-semibold">Delivery State</th>
                  <th className="py-3.5 px-4 font-semibold">Health</th>
                  <th className="py-3.5 px-4 font-semibold">Budget</th>
                  <th className="py-3.5 px-4 font-semibold">Engagement Lead</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No client projects created yet. Close a deal in the CRM to auto-launch an active project.
                    </td>
                  </tr>
                ) : (
                  projects.map((proj) => (
                    <tr key={proj.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{proj.name}</div>
                        <span className="font-mono text-xs text-brand-orange">{proj.projectCode}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-300">
                        {proj.company?.name || 'Internal Org'}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(proj.status)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          {proj.health || 'Green'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-200">
                        {proj.currency} {Number(proj.budget || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">
                        {proj.manager?.name || 'Unassigned PM'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href="/team/projects"
                          className="inline-flex items-center gap-1 text-xs text-brand-orange hover:text-white transition-colors"
                        >
                          Workspace
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
