'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  CheckCircle2,
  Building,
  Mail,
  Phone,
  Globe,
  DollarSign,
  TrendingUp,
  Clock,
  MessageSquare,
  Calendar,
  Briefcase,
  FileText,
  AlertCircle,
  Loader2,
  ShieldCheck,
} from 'lucide-react';

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const leadId = params.id as string;

  const [lead, setLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Note form state
  const [noteContent, setNoteContent] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);

  // Call form state
  const [callNotes, setCallNotes] = useState('');
  const [callOutcome, setCallOutcome] = useState('Qualified - Scheduled Discovery');
  const [callDuration, setCallDuration] = useState(900);
  const [submittingCall, setSubmittingCall] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  // Won Deal Conversion modal state
  const [showWonModal, setShowWonModal] = useState(false);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionSuccess, setConversionSuccess] = useState<any>(null);
  const [convertForm, setConvertForm] = useState({
    projectName: '',
    budget: 15000,
    currency: 'USD',
    initialDepositAmount: 6000,
  });

  const fetchLead = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/crm/leads/${leadId}`);
      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
        if (data.lead) {
          setConvertForm({
            projectName: `${data.lead.companyName} - ${data.lead.serviceName || 'Strategic Engagement'}`,
            budget: data.lead.budgetTier?.startsWith('INR') ? 1200000 : 18000,
            currency: data.lead.budgetTier?.startsWith('INR') ? 'INR' : 'USD',
            initialDepositAmount: data.lead.budgetTier?.startsWith('INR') ? 480000 : 7200,
          });
        }
      } else {
        alert('Lead not found.');
        router.push('/admin/crm/leads');
      }
    } catch (err) {
      console.error('Failed to fetch lead:', err);
    } finally {
      setLoading(false);
    }
  }, [leadId, router]);

  useEffect(() => {
    fetchLead();
  }, [fetchLead]);

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === 'WON') {
      setShowWonModal(true);
      return;
    }

    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/crm/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchLead();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setUpdating(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    setSubmittingNote(true);
    try {
      const res = await fetch(`/api/admin/crm/leads/${leadId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: noteContent }),
      });
      if (res.ok) {
        setNoteContent('');
        fetchLead();
      }
    } catch (err) {
      console.error('Failed to add note:', err);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleLogCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callNotes.trim()) return;
    setSubmittingCall(true);
    try {
      const res = await fetch(`/api/admin/crm/leads/${leadId}/calls`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: callNotes,
          outcome: callOutcome,
          durationSeconds: Number(callDuration),
        }),
      });
      if (res.ok) {
        setCallNotes('');
        setShowCallModal(false);
        fetchLead();
      }
    } catch (err) {
      console.error('Failed to log call:', err);
    } finally {
      setSubmittingCall(false);
    }
  };

  const handleConvertDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConverting(true);
    try {
      const res = await fetch(`/api/admin/crm/leads/${leadId}/convert`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convertForm),
      });
      const data = await res.json();
      if (res.ok) {
        setConversionSuccess(data);
        setShowWonModal(false);
        fetchLead();
      } else {
        alert(data.error || 'Conversion failed');
      }
    } catch (err) {
      console.error('Failed to convert deal:', err);
      alert('Error connecting to conversion service.');
    } finally {
      setIsConverting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!lead) return null;

  const scoreBreakdown = lead.scoreBreakdown as any;

  return (
    <div className="space-y-6">
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/crm/leads"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Leads Directory
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {lead.firstName} {lead.lastName}
            </h1>
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
          </div>
          <p className="text-xs text-slate-400">
            {lead.companyName} • Source: <span className="font-mono text-slate-300">{lead.source}</span> • Registered:{' '}
            {new Date(lead.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex items-center gap-3">
          {lead.status !== 'WON' && (
            <Button
              onClick={() => setShowWonModal(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              Convert to Won Deal & Onboard
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCallModal(true)}
            className="border-brand-border text-slate-300 hover:text-white text-xs"
          >
            <Phone className="w-3.5 h-3.5 mr-1.5" />
            Log Call
          </Button>

          {/* Quick Stage Selector */}
          <div className="w-40">
            <Select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updating}
              className="bg-brand-black/50 border-brand-border text-xs"
            >
              <option value="NEW">New</option>
              <option value="CONTACTED">Contacted</option>
              <option value="QUALIFIED">Qualified</option>
              <option value="MEETING">Meeting</option>
              <option value="PROPOSAL">Proposal</option>
              <option value="NEGOTIATION">Negotiation</option>
              <option value="WON">Deal Won</option>
              <option value="LOST">Lost</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Success Banner if just converted */}
      {conversionSuccess && (
        <Card className="bg-emerald-950/40 border-emerald-500/40">
          <CardContent className="pt-6 flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-bold text-emerald-300 text-sm">
                Deal Won & Automated Onboarding Complete!
              </p>
              <p className="text-slate-300">
                Created Company, Primary Contact, Active Project ({conversionSuccess.projectCode}), and Initial Deposit Invoice ({conversionSuccess.invoiceNumber}).
              </p>
              <div className="flex gap-3 pt-2">
                <Link
                  href="/admin/projects"
                  className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                >
                  View in Projects Delivery →
                </Link>
                <Link
                  href="/admin/finance"
                  className="px-3 py-1 rounded bg-brand-surface border border-brand-border text-slate-300 hover:text-white transition-colors"
                >
                  Review Deposit Invoice
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Scope, Score Breakdown, Timeline (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Qualification & Score Breakdown */}
          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white text-base">Intent & Fit Score</CardTitle>
                  <CardDescription className="text-slate-400">
                    Automated multi-factor evaluation of budget, service fit, and company domain
                  </CardDescription>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-brand-orange">
                    {lead.score}/100
                  </span>
                  <p className="text-[10px] text-slate-500 uppercase font-mono">Total Score</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {scoreBreakdown ? (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                  <div className="p-2.5 rounded bg-brand-black/40 border border-brand-border/60">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Budget Fit</p>
                    <p className="text-sm font-bold text-white mt-1">{scoreBreakdown.budget}/35</p>
                  </div>
                  <div className="p-2.5 rounded bg-brand-black/40 border border-brand-border/60">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Service Match</p>
                    <p className="text-sm font-bold text-white mt-1">{scoreBreakdown.service}/25</p>
                  </div>
                  <div className="p-2.5 rounded bg-brand-black/40 border border-brand-border/60">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Domain/Profile</p>
                    <p className="text-sm font-bold text-white mt-1">{scoreBreakdown.company}/20</p>
                  </div>
                  <div className="p-2.5 rounded bg-brand-black/40 border border-brand-border/60">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Geography</p>
                    <p className="text-sm font-bold text-white mt-1">{scoreBreakdown.country}/10</p>
                  </div>
                  <div className="p-2.5 rounded bg-brand-black/40 border border-brand-border/60">
                    <p className="text-[10px] text-slate-400 uppercase font-mono">Completeness</p>
                    <p className="text-sm font-bold text-white mt-1">{scoreBreakdown.completeness}/10</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-500">Automated breakdown not available for this record.</p>
              )}
            </CardContent>
          </Card>

          {/* Project Requirement & Scope */}
          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader>
              <CardTitle className="text-white text-base">Project Scope & Objectives</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="p-4 rounded-lg bg-brand-black/40 border border-brand-border text-slate-300 leading-relaxed whitespace-pre-wrap">
                {lead.projectDescription || 'No description provided.'}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Requested Service</span>
                  <span className="font-semibold text-white">{lead.serviceName || 'General'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Budget Tier</span>
                  <span className="font-semibold text-white">{lead.budgetTier}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase block font-mono">Target Timeline</span>
                  <span className="font-semibold text-white">{lead.timeline || 'Immediate'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Touchpoint Activity & Notes Log */}
          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-base">Touchpoint Velocity & Activity History</CardTitle>
                <CardDescription className="text-slate-400">
                  Chronological trail of calls, meetings, notes, and score adjustments
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="space-y-2">
                <textarea
                  rows={2}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Record an internal note, executive update, or sales context..."
                  className="w-full rounded-md border border-brand-border bg-brand-black/50 p-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-orange"
                />
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="sm"
                    disabled={submittingNote || !noteContent.trim()}
                    className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs"
                  >
                    {submittingNote ? 'Saving...' : 'Add Note'}
                  </Button>
                </div>
              </form>

              {/* Combined Timeline */}
              <div className="space-y-4">
                {/* Notes */}
                {lead.notes?.map((n: any) => (
                  <div key={n.id} className="p-3 rounded-lg bg-brand-surface/40 border border-brand-border/60 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-medium text-slate-200 flex items-center gap-1.5">
                        <MessageSquare className="w-3 h-3 text-brand-orange" />
                        {n.author?.name || 'Internal Note'}
                      </span>
                      <span className="text-[10px] font-mono">{new Date(n.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-300 whitespace-pre-wrap">{n.content}</p>
                  </div>
                ))}

                {/* Calls */}
                {lead.calls?.map((c: any) => (
                  <div key={c.id} className="p-3 rounded-lg bg-brand-surface/40 border border-brand-border/60 text-xs space-y-1">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="font-medium text-emerald-400 flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-emerald-400" />
                        Call with {c.conductedBy?.name || 'Sales Rep'} • Outcome: {c.outcome || 'Logged'}
                      </span>
                      <span className="text-[10px] font-mono">{new Date(c.callDate).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-300 whitespace-pre-wrap">{c.notes}</p>
                  </div>
                ))}

                {/* Score History */}
                {lead.scoreHistory?.map((sh: any) => (
                  <div key={sh.id} className="p-2.5 rounded bg-brand-black/30 border border-brand-border/40 text-[11px] text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3 text-blue-400" />
                      {sh.reason}: <span className="font-mono text-white">{sh.scoreBefore} → {sh.scoreAfter}</span>
                    </span>
                    <span className="text-[10px] font-mono">{new Date(sh.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}

                {(!lead.notes?.length && !lead.calls?.length && !lead.scoreHistory?.length) && (
                  <p className="text-xs text-slate-500 py-4 text-center">No recorded activity yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Profile, Assignee, Commercials (1/3 width) */}
        <div className="space-y-6">
          {/* Contact & Company Details */}
          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader>
              <CardTitle className="text-white text-base">Contact & Organization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                <a href={`mailto:${lead.email}`} className="hover:text-brand-orange transition-colors">
                  {lead.email}
                </a>
              </div>
              {lead.phone && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-3.5 h-3.5 text-slate-500" />
                  <span>{lead.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-300">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{lead.country}</span>
              </div>
              {lead.website && (
                <div className="flex items-center gap-2 text-slate-300">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <a
                    href={lead.website.startsWith('http') ? lead.website : `https://${lead.website}`}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-brand-orange underline truncate"
                  >
                    {lead.website}
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sales Assignee */}
          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardHeader>
              <CardTitle className="text-white text-base">Account Executive</CardTitle>
              <CardDescription className="text-slate-400">
                Assigned representative handling proposal and contract negotiation
              </CardDescription>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <p className="font-semibold text-white">
                {lead.assignedTo?.name || 'Unassigned (General Pool)'}
              </p>
              {lead.assignedTo?.email && (
                <p className="text-slate-400">{lead.assignedTo.email}</p>
              )}
            </CardContent>
          </Card>

          {/* Linked Client Records (If already converted) */}
          {lead.company && (
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardHeader>
                <CardTitle className="text-white text-base">Linked Organization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p className="font-semibold text-white">{lead.company.name}</p>
                {lead.company.projects?.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-brand-border/60">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Active Projects</span>
                    {lead.company.projects.map((p: any) => (
                      <div key={p.id} className="flex items-center justify-between text-slate-300">
                        <span>{p.name}</span>
                        <Badge variant="outline" className="text-[10px]">{p.status}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Won Deal Conversion Modal */}
      {showWonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-lg font-bold text-white">Close Deal & Launch Project</h3>
              </div>
              <button
                onClick={() => setShowWonModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Confirming deal closure will automatically create a <strong>Company profile</strong>, primary <strong>Contact</strong>, active <strong>Project ({lead.companyName})</strong> with initial milestones, and an initial <strong>Deposit Invoice</strong>.
            </p>

            <form onSubmit={handleConvertDeal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Project Name</label>
                <Input
                  required
                  value={convertForm.projectName}
                  onChange={(e) => setConvertForm({ ...convertForm, projectName: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Total Agreed Budget</label>
                  <Input
                    type="number"
                    required
                    value={convertForm.budget}
                    onChange={(e) => setConvertForm({ ...convertForm, budget: Number(e.target.value) })}
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Currency</label>
                  <Select
                    value={convertForm.currency}
                    onChange={(e) => setConvertForm({ ...convertForm, currency: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Initial Deposit Invoice Amount</label>
                <Input
                  type="number"
                  required
                  value={convertForm.initialDepositAmount}
                  onChange={(e) =>
                    setConvertForm({ ...convertForm, initialDepositAmount: Number(e.target.value) })
                  }
                  className="bg-brand-black/50 border-brand-border"
                />
                <span className="text-[10px] text-slate-500 mt-1 block font-mono">
                  Standard 40% initial deposit required before development sprint kickoff.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowWonModal(false)}
                  className="border-brand-border text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isConverting}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold"
                >
                  {isConverting ? 'Generating Project & Invoice...' : 'Confirm Deal Won & Onboard'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-lg font-bold text-white">Log Call Touchpoint</h3>
              <button
                onClick={() => setShowCallModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogCall} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Call Outcome</label>
                <Select
                  value={callOutcome}
                  onChange={(e) => setCallOutcome(e.target.value)}
                  className="bg-brand-black/50 border-brand-border"
                >
                  <option value="Qualified - Scheduled Discovery">Qualified - Scheduled Discovery</option>
                  <option value="Proposal Review Completed">Proposal Review Completed</option>
                  <option value="Left Voicemail / Follow-up Needed">Left Voicemail / Follow-up Needed</option>
                  <option value="Contract Finalization In Progress">Contract Finalization In Progress</option>
                  <option value="Unqualified / Not a Fit">Unqualified / Not a Fit</option>
                </Select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Duration (seconds)</label>
                <Input
                  type="number"
                  value={callDuration}
                  onChange={(e) => setCallDuration(Number(e.target.value))}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Executive Notes *</label>
                <textarea
                  required
                  rows={4}
                  value={callNotes}
                  onChange={(e) => setCallNotes(e.target.value)}
                  placeholder="Key takeaways, client objections, next agreed milestone..."
                  className="w-full rounded-md border border-brand-border bg-brand-black/50 p-2.5 text-xs text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCallModal(false)}
                  className="border-brand-border text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submittingCall}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white"
                >
                  {submittingCall ? 'Saving...' : 'Record Call'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
