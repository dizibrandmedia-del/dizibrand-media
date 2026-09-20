'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ThumbsUp,
  AlertCircle,
  MessageSquare,
  Filter,
  ExternalLink,
} from 'lucide-react';

interface Deliverable {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  fileUrl?: string | null;
  externalLink?: string | null;
  feedback?: string | null;
  createdAt: string;
  project: { id: string; name: string; projectCode: string };
  milestone?: { id: string; title: string; order: number } | null;
  submittedBy: { id: string; name: string; email: string };
  reviewedBy?: { id: string; name: string } | null;
}

interface DeliverablesClientViewProps {
  initialDeliverables: Deliverable[];
}

export function DeliverablesClientView({
  initialDeliverables,
}: DeliverablesClientViewProps) {
  const [deliverables, setDeliverables] = useState<Deliverable[]>(initialDeliverables);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Review Modal state
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null);
  const [reviewStatus, setReviewStatus] = useState<'Approved' | 'Changes Requested'>('Approved');
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filtered = deliverables.filter((d) => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'PENDING') return d.status !== 'Approved' && d.status !== 'Changes Requested';
    return d.status.toUpperCase() === statusFilter.toUpperCase();
  });

  const handleOpenReview = (deliv: Deliverable) => {
    setSelectedDeliverable(deliv);
    setReviewStatus('Approved');
    setReviewFeedback('');
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeliverable) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/portal/deliverables/${selectedDeliverable.id}/approve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: reviewStatus,
          feedback: reviewFeedback,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit deliverable review');
      }

      setDeliverables((prev) =>
        prev.map((d) => (d.id === selectedDeliverable.id ? { ...d, status: reviewStatus, feedback: reviewFeedback } : d))
      );

      setSuccessMsg(`Deliverable review saved: marked as ${reviewStatus}.`);
      setSelectedDeliverable(null);
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Deliverables & Approvals</h1>
          <p className="text-sm text-slate-400">
            Review completed sprint deliverables, inspect submitted assets, and provide formal sign-off.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {deliverables.length} Deliverable{deliverables.length === 1 ? '' : 's'}
          </Badge>
        </div>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-brand-border/60">
        <span className="text-xs text-slate-500 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {['ALL', 'PENDING', 'APPROVED', 'CHANGES REQUESTED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              statusFilter === st
                ? 'bg-brand-orange text-white'
                : 'bg-brand-surface/40 text-slate-400 hover:text-white hover:bg-brand-surface'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Deliverables List */}
      {filtered.length === 0 ? (
        <Card className="bg-brand-charcoal/80 border-brand-border text-center py-12">
          <CardContent>
            <FileCheck className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">No Deliverables Found</h3>
            <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
              No deliverables match your current filter criteria.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((deliv) => {
            const isApproved = deliv.status === 'Approved';
            const isChanges = deliv.status === 'Changes Requested';

            return (
              <Card
                key={deliv.id}
                className="bg-brand-charcoal/80 border-brand-border hover:border-brand-orange/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-mono text-brand-orange font-semibold">
                        {deliv.project.projectCode}
                      </span>
                      <Badge
                        variant={
                          isApproved ? 'success' : isChanges ? 'destructive' : 'warning'
                        }
                      >
                        {deliv.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg text-white">{deliv.title}</CardTitle>
                    <CardDescription className="text-xs text-slate-400 mt-1">
                      Project: {deliv.project.name}
                      {deliv.milestone && ` • Milestone: ${deliv.milestone.title}`}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {deliv.description && (
                      <p className="text-sm text-slate-300">{deliv.description}</p>
                    )}

                    {deliv.feedback && (
                      <div className="p-3 rounded-lg bg-brand-surface/40 border border-brand-border/60 text-xs text-slate-300">
                        <span className="font-semibold text-slate-400 block mb-1">
                          Review History:
                        </span>
                        <p className="whitespace-pre-line text-slate-400">{deliv.feedback}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-brand-border/60 text-xs text-slate-400">
                      <span>Submitted by {deliv.submittedBy.name}</span>
                      <span>{new Date(deliv.createdAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </div>

                <div className="p-4 border-t border-brand-border/60 bg-brand-surface/20 flex items-center justify-between">
                  <div>
                    {deliv.fileUrl || deliv.externalLink ? (
                      <a
                        href={deliv.fileUrl || deliv.externalLink || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-brand-orange hover:underline flex items-center gap-1"
                      >
                        Inspect Asset <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500">Asset link attached internally</span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => handleOpenReview(deliv)}
                    className="text-xs"
                  >
                    Review & Sign-Off
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Review & Sign-Off Modal */}
      {selectedDeliverable && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal border border-brand-border rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Review Deliverable</h3>
                <p className="text-xs text-slate-400">{selectedDeliverable.title}</p>
              </div>
              <button
                onClick={() => setSelectedDeliverable(null)}
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

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Sign-Off Decision
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReviewStatus('Approved')}
                    className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      reviewStatus === 'Approved'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500'
                        : 'border-brand-border bg-brand-surface/30 text-slate-400 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Approve Deliverable
                  </button>

                  <button
                    type="button"
                    onClick={() => setReviewStatus('Changes Requested')}
                    className={`p-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                      reviewStatus === 'Changes Requested'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 ring-1 ring-amber-500'
                        : 'border-brand-border bg-brand-surface/30 text-slate-400 hover:text-white'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    Request Changes
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  {reviewStatus === 'Approved' ? 'Approval Comments (Optional)' : 'Change Request Details (Required)'}
                </label>
                <textarea
                  required={reviewStatus === 'Changes Requested'}
                  rows={4}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  placeholder={
                    reviewStatus === 'Approved'
                      ? 'e.g. Asset meets all acceptance criteria and is ready for production.'
                      : 'e.g. Please revise section 3 to address data masking for client IDs.'
                  }
                  className="w-full px-3 py-2 text-sm bg-brand-surface/60 border border-brand-border rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-orange"
                />
              </div>

              {selectedDeliverable.fileUrl || selectedDeliverable.externalLink ? (
                <div className="p-3 rounded-lg bg-brand-surface/30 border border-brand-border/60 text-xs">
                  <span className="text-slate-400 block mb-1">Attached Asset Link:</span>
                  <a
                    href={selectedDeliverable.fileUrl || selectedDeliverable.externalLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-orange hover:underline break-all"
                  >
                    {selectedDeliverable.fileUrl || selectedDeliverable.externalLink}
                  </a>
                </div>
              ) : null}

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDeliverable(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submitting}
                  className={reviewStatus === 'Approved' ? 'bg-emerald-600 hover:bg-emerald-500' : 'bg-amber-600 hover:bg-amber-500'}
                >
                  {submitting ? 'Submitting...' : `Confirm ${reviewStatus}`}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
