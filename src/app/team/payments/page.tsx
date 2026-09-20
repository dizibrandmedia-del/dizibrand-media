import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function TeamPaymentsPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id || '';

  let deliverables: any[] = [];

  try {
    deliverables = await prisma.deliverable.findMany({
      where: {
        submittedById: userId,
      },
      include: {
        project: { select: { name: true, projectCode: true } },
        milestone: { select: { title: true } },
      },
    });
  } catch (err) {
    console.error('Failed to load contractor deliverables:', err);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Workspace
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">Disbursements & Milestone Clearing</h1>
          <p className="text-sm text-slate-400">
            Payment approval status based on accepted sprint deliverables and approved milestone milestones.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
              Cleared for Disbursement
            </span>
            <div className="mt-2 text-2xl font-bold text-emerald-400">
              {deliverables.filter((d) => d.status === 'Approved').length} Deliverables
            </div>
            <p className="mt-1 text-xs text-slate-500">Approved by Project Manager</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <span className="text-xs text-slate-400 uppercase font-semibold font-mono">
              Under Review
            </span>
            <div className="mt-2 text-2xl font-bold text-amber-400">
              {deliverables.filter((d) => d.status !== 'Approved').length} Deliverables
            </div>
            <p className="mt-1 text-xs text-slate-500">Pending PM sign-off</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <CardTitle className="text-white text-base">Contract Deliverables & Clearance</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Deliverable</th>
                  <th className="py-3.5 px-4 font-semibold">Project & Milestone</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Disbursement State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {deliverables.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-500 text-xs">
                      No deliverables submitted under this specialist account.
                    </td>
                  </tr>
                ) : (
                  deliverables.map((d) => (
                    <tr key={d.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-white text-xs">
                        {d.title}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">
                        {d.project?.name} • {d.milestone?.title || 'Milestone'}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={d.status === 'Approved' ? 'success' : 'orange'}>
                          {d.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono text-xs">
                        {d.status === 'Approved' ? (
                          <span className="text-emerald-400 font-semibold">Cleared for Payout</span>
                        ) : (
                          <span className="text-slate-500">Pending Approval</span>
                        )}
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
