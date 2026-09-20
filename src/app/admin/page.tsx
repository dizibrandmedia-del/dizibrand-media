import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Briefcase, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { LeadStatus, ProjectStatus } from '@prisma/client';
import { estimateBudgetAmount } from '@/lib/domain/crm/deal-service';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  // Fetch real counts from database
  let totalLeads = 0;
  let activeProjects = 0;
  let pipelineValue = 0;
  let averageScore = 0;
  let recentLeads: any[] = [];

  try {
    const [leadsCount, projectsCount, leads, scoreAgg] = await Promise.all([
      prisma.lead.count(),
      prisma.project.count({
        where: { status: { in: [ProjectStatus.PLANNING, ProjectStatus.KICKOFF, ProjectStatus.ACTIVE] } },
      }),
      prisma.lead.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedTo: { select: { name: true } },
        },
      }),
      prisma.lead.aggregate({
        _avg: { score: true },
      }),
    ]);

    totalLeads = leadsCount;
    activeProjects = projectsCount;
    averageScore = Math.round(scoreAgg._avg.score || 0);
    recentLeads = leads;

    // Calculate pipeline value
    const activeDeals = await prisma.lead.findMany({
      where: {
        status: {
          notIn: [LeadStatus.LOST, LeadStatus.WON],
        },
      },
      select: { budgetTier: true },
    });

    pipelineValue = activeDeals.reduce((sum, d) => sum + estimateBudgetAmount(d.budgetTier), 0);
  } catch (error) {
    console.error('Failed to load admin metrics:', error);
  }

  const stats = [
    {
      label: 'Total Inbound Leads',
      value: totalLeads.toString(),
      change: 'Active in CRM',
      icon: Users,
    },
    {
      label: 'Weighted Pipeline Value',
      value: `$${pipelineValue.toLocaleString()}`,
      change: 'Active proposals & deals',
      icon: DollarSign,
    },
    {
      label: 'Active Engagements',
      value: activeProjects.toString(),
      change: 'In delivery lifecycle',
      icon: Briefcase,
    },
    {
      label: 'Average Lead Score',
      value: `${averageScore}/100`,
      change: 'Automated intent score',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Executive Cockpit</h1>
          <p className="text-sm text-slate-400">
            Real-time pipeline, lead velocity, and client delivery oversight across DiziBrand Media.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="pending">Demonstration Environment</Badge>
          <Link
            href="/admin/crm/pipeline"
            className="text-xs px-3 py-2 rounded-lg bg-brand-surface text-slate-200 border border-brand-border hover:text-white transition-colors"
          >
            Pipeline Board
          </Link>
          <Link
            href="/admin/crm/leads"
            className="text-xs px-3 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-hover transition-colors"
          >
            Review Leads →
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <Icon className="w-4 h-4 text-brand-orange" />
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Inbound Leads */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white">Recent Inbound Inquiries</CardTitle>
            <CardDescription className="text-slate-400">
              Scored and prioritized by the autonomous lead qualification engine
            </CardDescription>
          </div>
          <Link href="/admin/crm/leads" className="text-xs text-brand-orange hover:underline font-mono">
            View All Leads →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="pb-3 font-semibold">Contact & Company</th>
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold">Country</th>
                  <th className="pb-3 font-semibold">Score</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No inbound leads recorded yet.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5">
                        <div className="font-medium text-white">
                          {lead.firstName} {lead.lastName}
                        </div>
                        <div className="text-xs text-slate-400">{lead.companyName}</div>
                      </td>
                      <td className="py-3.5 text-xs text-slate-300">
                        {lead.serviceName || 'General Inquiry'}
                      </td>
                      <td className="py-3.5 text-xs text-slate-400">{lead.country}</td>
                      <td className="py-3.5">
                        <span className="font-mono text-xs font-bold text-brand-orange">
                          {lead.score}/100
                        </span>
                      </td>
                      <td className="py-3.5">
                        <Badge
                          variant={
                            lead.status === 'WON'
                              ? 'success'
                              : lead.status === 'NEW'
                              ? 'orange'
                              : lead.status === 'LOST'
                              ? 'destructive'
                              : 'default'
                          }
                        >
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          href={`/admin/crm/leads/${lead.id}`}
                          className="text-xs text-brand-orange hover:text-white transition-colors"
                        >
                          Manage →
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
