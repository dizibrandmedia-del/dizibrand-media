import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, DollarSign, Clock, ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function TeamProposalsPage() {
  let proposals: any[] = [];

  try {
    proposals = await prisma.proposal.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        company: { select: { name: true } },
        createdBy: { select: { name: true } },
      },
    });
  } catch (err) {
    console.error('Failed to load proposals:', err);
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
            Back to Team Overview
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">Commercial Proposals</h1>
          <p className="text-sm text-slate-400">
            Active statements of work, commercial scopes, and client sign-off tracking.
          </p>
        </div>
      </div>

      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Proposal # & Title</th>
                  <th className="py-3.5 px-4 font-semibold">Client Organization</th>
                  <th className="py-3.5 px-4 font-semibold">Total Value</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Valid Until</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {proposals.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500 text-xs">
                      No commercial proposals recorded yet.
                    </td>
                  </tr>
                ) : (
                  proposals.map((p) => (
                    <tr key={p.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white text-xs">{p.title}</div>
                        <span className="font-mono text-brand-orange text-[11px]">{p.proposalNumber}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-white">
                        {p.company?.name}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono font-bold text-white">
                        {p.currency} {Number(p.totalAmount || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={p.status === 'ACCEPTED' ? 'success' : 'orange'}>
                          {p.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                        {new Date(p.validUntil).toLocaleDateString()}
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
