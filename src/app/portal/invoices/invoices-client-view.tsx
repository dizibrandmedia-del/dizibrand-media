'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  CheckCircle2,
  Clock,
  CreditCard,
  Building2,
  FileText,
  AlertCircle,
  ArrowUpRight,
  ShieldCheck,
  Receipt,
} from 'lucide-react';

interface Payment {
  id: string;
  amount: any;
  currency: string;
  method: string;
  transactionReference?: string | null;
  status: string;
  paymentDate: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: any;
  taxAmount: any;
  totalAmount: any;
  currency: string;
  status: string;
  dueDate: string;
  paidAt?: string | null;
  pdfUrl?: string | null;
  project?: { id: string; name: string; projectCode: string } | null;
  payments: Payment[];
}

interface InvoicesClientViewProps {
  initialInvoices: Invoice[];
}

export function InvoicesClientView({ initialInvoices }: InvoicesClientViewProps) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'STRIPE' | 'RAZORPAY' | 'BANK_TRANSFER' | 'WIRE'>('STRIPE');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const totalInvoiced = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
  const totalPaid = invoices
    .filter((inv) => inv.status === 'PAID')
    .reduce((sum, inv) => sum + Number(inv.totalAmount), 0);
  const totalOutstanding = totalInvoiced - totalPaid;

  const handleSimulatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/portal/invoices/${selectedInvoice.id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: paymentMethod }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Payment failed');
      }

      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === selectedInvoice.id
            ? {
                ...inv,
                status: 'PAID',
                paidAt: new Date().toISOString(),
                payments: [data.payment, ...inv.payments],
              }
            : inv
        )
      );

      setSuccessMsg(
        `Payment successful! Invoice ${selectedInvoice.invoiceNumber} marked as PAID. Reference: ${data.payment.transactionReference}`
      );
      setSelectedInvoice(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment simulation failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Invoices & Commercials</h1>
          <p className="text-sm text-slate-400">
            Billing history, milestone retainers, payment receipts, and settlement processing.
          </p>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Paid</span>
            <p className="text-2xl font-bold text-emerald-400 mt-1">
              ${totalPaid.toLocaleString()}
            </p>
            <span className="text-xs text-slate-400 mt-1 block">Settled via verified gateways</span>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <span className="text-xs text-slate-400 uppercase font-semibold">Outstanding Balance</span>
            <p className="text-2xl font-bold text-brand-orange mt-1">
              ${totalOutstanding.toLocaleString()}
            </p>
            <span className="text-xs text-slate-400 mt-1 block">Due on active sprint milestones</span>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Commercials</span>
            <p className="text-2xl font-bold text-white mt-1">
              ${totalInvoiced.toLocaleString()}
            </p>
            <span className="text-xs text-slate-400 mt-1 block">
              {invoices.length} Total Invoices Logged
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <CardTitle>Invoices Ledger</CardTitle>
          <CardDescription>
            All generated invoices, retainers, and settlement statuses.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invoices.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">No invoices recorded yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-border text-xs text-slate-400 uppercase">
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Project</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/60">
                  {invoices.map((inv) => {
                    const isPaid = inv.status === 'PAID';
                    const isOverdue = inv.status === 'OVERDUE';

                    return (
                      <tr key={inv.id} className="hover:bg-brand-surface/30 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-semibold text-white">
                          {inv.invoiceNumber}
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {inv.project?.name || 'General Retainer'}
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          {new Date(inv.dueDate).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-white">
                          {inv.currency} {Number(inv.totalAmount).toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={
                              isPaid ? 'success' : isOverdue ? 'destructive' : 'orange'
                            }
                          >
                            {inv.status}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          {!isPaid ? (
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => {
                                setSelectedInvoice(inv);
                                setErrorMsg(null);
                              }}
                              className="text-xs bg-brand-orange hover:bg-brand-orange-hover"
                            >
                              Settle Invoice
                            </Button>
                          ) : (
                            <span className="text-xs text-emerald-400 font-medium flex items-center justify-end gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Settled
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Simulation Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal border border-brand-border rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Settle Invoice</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {selectedInvoice.invoiceNumber} • {selectedInvoice.currency}{' '}
                  {Number(selectedInvoice.totalAmount).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSimulatePayment} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Payment Gateway / Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'STRIPE', label: 'Stripe (Card / USD)', icon: CreditCard },
                    { id: 'RAZORPAY', label: 'Razorpay (UPI / INR)', icon: DollarSign },
                    { id: 'BANK_TRANSFER', label: 'ACH / SEPA', icon: Building2 },
                    { id: 'WIRE', label: 'International Wire', icon: Receipt },
                  ].map((m) => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id as any)}
                        className={`p-3 rounded-lg border text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'border-brand-orange bg-brand-orange/10 text-white ring-1 ring-brand-orange'
                            : 'border-brand-border bg-brand-surface/30 text-slate-400 hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1 text-brand-orange" />
                        <div>{m.label}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-brand-surface/40 border border-brand-border/60 text-xs text-slate-400 space-y-1">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white">
                    {selectedInvoice.currency} {Number(selectedInvoice.amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (0.00%):</span>
                  <span className="text-white">
                    {selectedInvoice.currency} {Number(selectedInvoice.taxAmount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between pt-1 border-t border-brand-border/40 font-semibold text-white">
                  <span>Total Due:</span>
                  <span className="text-brand-orange font-mono">
                    {selectedInvoice.currency}{' '}
                    {Number(selectedInvoice.totalAmount).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedInvoice(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white"
                >
                  {submitting ? 'Processing Payment...' : 'Simulate & Settle Payment'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
