'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  FileCheck,
  ExternalLink,
  Loader2,
  RefreshCw,
  Clock,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface DeliverableItem {
  id: string;
  title: string;
  description?: string | null;
  fileUrl?: string | null;
  externalLink?: string | null;
  status: string;
  feedback?: string | null;
  createdAt: string;
  project?: { id: string; projectCode: string; name: string } | null;
  milestone?: { id: string; title: string } | null;
  submittedBy?: { id: string; name: string; email: string } | null;
  reviewedBy?: { id: string; name: string; email: string } | null;
}

export default function TeamDeliverablesPage() {
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [mySubmissionsOnly, setMySubmissionsOnly] = useState(false);

  // Review modal state
  const [selectedDeliverable, setSelectedDeliverable] = useState<DeliverableItem | null>(null);
  const [reviewStatus, setReviewStatus] = useState('Approved');
  const [reviewFeedback, setReviewFeedback] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchDeliverables = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (mySubmissionsOnly) params.set('mySubmissionsOnly', 'true');

      const res = await fetch(`/api/team/deliverables?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setDeliverables(data.deliverables || []);
      }
    } catch (err) {
      console.error('Failed to load deliverables:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, mySubmissionsOnly]);

  useEffect(() => {
    fetchDeliverables();
  }, [fetchDeliverables]);

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeliverable) return;
    setIsSubmittingReview(true);
    try {
      const res = await fetch(`/api/team/deliverables/${selectedDeliverable.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: reviewStatus,
          feedback: reviewFeedback,
        }),
      });
      if (res.ok) {
        setSelectedDeliverable(null);
        setReviewFeedback('');
        fetchDeliverables();
      }
    } catch (err) {
      console.error('Failed to review deliverable:', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Deliverables & Client Review Hub</h1>
          <p className="text-sm text-slate-400">
            Submit completed project assets, review deliverable quality, and manage client approval cycles.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchDeliverables}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant={mySubmissionsOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMySubmissionsOnly(!mySubmissionsOnly)}
            className={`text-xs ${mySubmissionsOnly ? 'bg-brand-orange text-white' : 'border-brand-border text-slate-300'}`}
          >
            {mySubmissionsOnly ? 'Showing My Submissions' : 'Filter to My Submissions'}
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-brand-black/50 border-brand-border text-xs"
              >
                <option value="">All Review States</option>
                <option value="Submitted">Submitted (Pending Review)</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
                <option value="Changes Requested">Changes Requested</option>
              </Select>
            </div>

            <div className="flex items-center justify-end text-xs text-slate-400 font-mono">
              Total {deliverables.length} deliverable assets
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deliverables Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Deliverable Asset</th>
                  <th className="py-3.5 px-4 font-semibold">Project & Milestone</th>
                  <th className="py-3.5 px-4 font-semibold">Submitted By</th>
                  <th className="py-3.5 px-4 font-semibold">Review State</th>
                  <th className="py-3.5 px-4 font-semibold">Feedback / Notes</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                        <span>Loading deliverables...</span>
                      </div>
                    </td>
                  </tr>
                ) : deliverables.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No deliverables recorded.
                    </td>
                  </tr>
                ) : (
                  deliverables.map((d) => (
                    <tr key={d.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white text-xs">{d.title}</div>
                        {d.externalLink && (
                          <a
                            href={d.externalLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[11px] text-brand-orange hover:underline inline-flex items-center gap-1 font-mono"
                          >
                            Open Asset Link
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <div className="text-white font-medium">{d.project?.name}</div>
                        <span className="text-slate-400 font-mono text-[11px]">
                          {d.milestone?.title || 'General'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-300">
                        {d.submittedBy?.name || 'Specialist'}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            d.status === 'Approved'
                              ? 'success'
                              : d.status === 'Changes Requested'
                              ? 'destructive'
                              : 'orange'
                          }
                        >
                          {d.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400 max-w-xs truncate">
                        {d.feedback || <span className="text-slate-600 italic">No notes</span>}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedDeliverable(d);
                            setReviewStatus(d.status);
                            setReviewFeedback(d.feedback || '');
                          }}
                          className="text-xs border-brand-border text-slate-300 hover:text-white"
                        >
                          Review Asset
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      {selectedDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-base font-bold text-white">Review Deliverable Quality</h3>
              <button
                onClick={() => setSelectedDeliverable(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300">
              Reviewing: <strong>{selectedDeliverable.title}</strong> for project{' '}
              <strong>{selectedDeliverable.project?.name}</strong>.
            </p>

            <form onSubmit={handleReview} className="space-y-3">
              <div>
                <label className="block text-slate-300 mb-1">Review Decision</label>
                <Select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="bg-brand-black/50 border-brand-border"
                >
                  <option value="Approved">Approved</option>
                  <option value="Changes Requested">Changes Requested</option>
                  <option value="In Review">In Review</option>
                </Select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Feedback & Notes *</label>
                <textarea
                  required
                  rows={3}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  placeholder="Specific feedback or approval confirmation..."
                  className="w-full rounded-md border border-brand-border bg-brand-black/50 p-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedDeliverable(null)}
                  className="border-brand-border text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmittingReview}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  {isSubmittingReview ? 'Saving...' : 'Save Decision'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
