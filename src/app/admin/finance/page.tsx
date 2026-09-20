import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DollarSign, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminFinancePage() {
  let invoices: any[] = [];
  let totalBilled = 0;
  let totalPaid = 0;

  try {
    invoices = await prisma.invoice.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        company: { select: { id: true, name: true } },
        project: { select: { id: true, projectCode: true, name: true } },
      },
    });

    invoices.forEach((inv) => {
      const amount = Number(inv.totalAmount || 0);
      totalBilled += amount;
      if (inv.status === 'PAID') {
        totalPaid += amount;
      }
    });
  } catch (err) {
    console.error('Failed to load invoices:', err);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PAID':
        return <Badge variant="success">PAID</Badge>;
      case 'DRAFT':
        return <Badge variant="outline">DRAFT</Badge>;
      case 'SENT':
        return <Badge variant="orange">SENT</Badge>;
      case 'OVERDUE':
        return <Badge variant="destructive">OVERDUE</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Commercial Finance & Billing</h1>
          <p className="text-sm text-slate-400">
            Automated milestone invoices, deposit collections, and payment tracking across DiziBrand Media.
          </p>
        </div>
      </div>

      {/* Finance KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Total Billed Volume
              </span>
              <DollarSign className="w-4 h-4 text-brand-orange" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white">
              ${totalBilled.toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-slate-500">{invoices.length} invoices generated</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Collected Revenue
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white">
              ${totalPaid.toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-slate-500">Settled via Stripe / Wire</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Pending / Outstanding
              </span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white">
              ${(totalBilled - totalPaid).toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-slate-500">In draft or awaiting settlement</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <CardTitle className="text-white text-base">Invoices & Commercial Commitments</CardTitle>
          <CardDescription className="text-slate-400">
            Automatically created upon deal closure and milestone client approvals
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Invoice Number</th>
                  <th className="py-3.5 px-4 font-semibold">Client Org</th>
                  <th className="py-3.5 px-4 font-semibold">Project</th>
                  <th className="py-3.5 px-4 font-semibold">Amount</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {invoices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No invoices recorded yet.
                    </td>
                  </tr>
                ) : (
                  invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-brand-orange text-xs">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-white">
                        {inv.company?.name || 'Client Org'}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">
                        {inv.project?.name || 'Commercial Deposit'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-white">
                        {inv.currency} {Number(inv.totalAmount || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(inv.status)}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                        {new Date(inv.dueDate).toLocaleDateString()}
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
