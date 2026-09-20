'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  ShieldCheck,
  AlertTriangle,
  Plus,
  CheckCircle,
  XCircle,
  Eye,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  isVerified: boolean;
  verificationStatus: string;
  isPublished: boolean;
  challenge: string;
  solution: string;
  service?: { id: string; title: string } | null;
  industry?: { id: string; name: string } | null;
  createdAt: string;
}

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Verification modal state
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [certified, setCertified] = useState(false);

  // Create modal state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    clientName: '',
    isVerified: false,
    challenge: '',
    solution: '',
    isPublished: false,
  });

  const fetchCaseStudies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/cms/case-studies');
      if (res.ok) {
        const data = await res.json();
        setCaseStudies(data.caseStudies || []);
      }
    } catch (err) {
      console.error('Failed to load case studies:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  const handleTogglePublish = async (cs: CaseStudy) => {
    setActionLoading(cs.id);
    try {
      const res = await fetch(`/api/admin/cms/case-studies/${cs.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !cs.isPublished }),
      });
      if (res.ok) {
        fetchCaseStudies();
      }
    } catch (err) {
      console.error('Failed to toggle publication:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleConfirmVerification = async () => {
    if (!selectedCaseStudy) return;
    setActionLoading(selectedCaseStudy.id);
    try {
      const res = await fetch(`/api/admin/cms/case-studies/${selectedCaseStudy.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isVerified: !selectedCaseStudy.isVerified }),
      });
      if (res.ok) {
        setShowVerifyModal(false);
        setSelectedCaseStudy(null);
        setCertified(false);
        fetchCaseStudies();
      }
    } catch (err) {
      console.error('Failed to update verification status:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCreateCaseStudy = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/cms/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setFormData({
          title: '',
          slug: '',
          clientName: '',
          isVerified: false,
          challenge: '',
          solution: '',
          isPublished: false,
        });
        fetchCaseStudies();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create case study');
      }
    } catch (err) {
      console.error('Error creating case study:', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/cms"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to CMS Hub
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Case Studies & Verification Governance
          </h1>
          <p className="text-sm text-slate-400">
            Strict zero-fake-proof enforcement: All published work must carry a verified client record or a visible [Pending verification] badge.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCaseStudies}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setShowCreateModal(true)}
            className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Case Study
          </Button>
        </div>
      </div>

      {/* Governance Banner */}
      <Card className="bg-brand-charcoal/40 border-amber-500/30">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1 text-slate-300">
            <span className="font-bold text-amber-300">Non-Fabrication Policy Enforced:</span>
            <p>
              In accordance with DiziBrand Media brand rules, no fabricated logos, client names, or exaggerated ROI metrics may ever be published. Case studies lacking signed client authorization will automatically display the <strong className="text-amber-400">[Pending verification]</strong> badge on the public website.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Case Studies Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Title & Client</th>
                  <th className="py-3.5 px-4 font-semibold">Practice Area</th>
                  <th className="py-3.5 px-4 font-semibold">Integrity Status</th>
                  <th className="py-3.5 px-4 font-semibold">Public State</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Governance Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                        <span>Loading case studies...</span>
                      </div>
                    </td>
                  </tr>
                ) : caseStudies.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500">
                      No case studies found. Click "Add Case Study" to register one.
                    </td>
                  </tr>
                ) : (
                  caseStudies.map((cs) => {
                    const isBusy = actionLoading === cs.id;

                    return (
                      <tr key={cs.id} className="hover:bg-brand-surface/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-medium text-white">{cs.title}</div>
                          <div className="text-xs text-slate-400 font-mono">{cs.clientName}</div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-300">
                          {cs.service?.title || 'Cross-Disciplinary'}
                        </td>
                        <td className="py-3.5 px-4">
                          {cs.isVerified ? (
                            <Badge variant="success" className="gap-1">
                              <ShieldCheck className="w-3 h-3" />
                              Verified Client
                            </Badge>
                          ) : (
                            <Badge variant="pending">
                              [Pending verification]
                            </Badge>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant={cs.isPublished ? 'orange' : 'outline'}>
                            {cs.isPublished ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          {/* Toggle Verification */}
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isBusy}
                            onClick={() => {
                              setSelectedCaseStudy(cs);
                              setShowVerifyModal(true);
                            }}
                            className="text-xs border-brand-border text-slate-300 hover:text-white"
                          >
                            {cs.isVerified ? 'Revoke Verification' : 'Verify Proof'}
                          </Button>

                          {/* Toggle Publish */}
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={isBusy}
                            onClick={() => handleTogglePublish(cs)}
                            className="text-xs border-brand-border text-slate-300 hover:text-white"
                          >
                            {cs.isPublished ? 'Unpublish' : 'Publish'}
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Verification Modal with Mandatory Attestation */}
      {showVerifyModal && selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-brand-orange" />
                <h3 className="text-base font-bold text-white">Client Proof Attestation</h3>
              </div>
              <button
                onClick={() => {
                  setShowVerifyModal(false);
                  setCertified(false);
                }}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-slate-300 leading-relaxed">
              You are altering the verification status for <strong>{selectedCaseStudy.title}</strong> ({selectedCaseStudy.clientName}).
            </p>

            {!selectedCaseStudy.isVerified && (
              <div className="p-3 rounded-lg bg-brand-black/50 border border-brand-border space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={certified}
                    onChange={(e) => setCertified(e.target.checked)}
                    className="mt-0.5 rounded bg-brand-black border-brand-border text-brand-orange focus:ring-0"
                  />
                  <span className="text-slate-300">
                    I solemnly attest that this case study is backed by documented client contracts, signed NDAs with disclosure clearance, or verified third-party audit.
                  </span>
                </label>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowVerifyModal(false);
                  setCertified(false);
                }}
                className="border-brand-border text-slate-300"
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!selectedCaseStudy.isVerified && !certified}
                onClick={handleConfirmVerification}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold"
              >
                {selectedCaseStudy.isVerified ? 'Confirm Revocation' : 'Approve & Mark Verified'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Case Study Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-base font-bold text-white">Create Case Study</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCaseStudy} className="space-y-3">
              <div>
                <label className="block text-slate-300 mb-1">Case Study Title *</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                    })
                  }
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">URL Slug *</label>
                  <Input
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="bg-brand-black/50 border-brand-border font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Client Name / Org *</label>
                  <Input
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Challenge *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  placeholder="The initial technical or marketing problem..."
                  className="w-full rounded-md border border-brand-border bg-brand-black/50 p-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Solution & Architecture *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  placeholder="How DiziBrand Media resolved the challenge..."
                  className="w-full rounded-md border border-brand-border bg-brand-black/50 p-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="p-3 rounded bg-brand-black/40 border border-brand-border text-[11px] text-slate-400">
                Note: Newly created case studies are saved as <strong>[Pending verification]</strong> by default until formal client release is verified.
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                  className="border-brand-border text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white font-semibold"
                >
                  Create Case Study
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
