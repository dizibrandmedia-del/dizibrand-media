'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Phone,
  Calendar,
  MessageSquare,
  ExternalLink,
  Loader2,
  RefreshCw,
} from 'lucide-react';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  country: string;
  companyName: string;
  website?: string | null;
  serviceName?: string | null;
  budgetTier: string;
  score: number;
  status: string;
  createdAt: string;
  assignedTo?: { id: string; name: string; email: string } | null;
  _count?: {
    notes: number;
    calls: number;
    meetings: number;
  };
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  // Modal state for manual lead creation
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    website: '',
    country: '',
    serviceName: 'Autonomous AI Agents',
    budgetTier: 'TIER_10000_25000',
    projectDescription: '',
  });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);
      if (countryFilter) params.set('country', countryFilter);
      params.set('page', page.toString());
      params.set('limit', '20');

      const res = await fetch(`/api/admin/crm/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalLeads(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Failed to fetch leads:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, countryFilter, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/crm/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsCreateModalOpen(false);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          website: '',
          country: '',
          serviceName: 'Autonomous AI Agents',
          budgetTier: 'TIER_10000_25000',
          projectDescription: '',
        });
        fetchLeads();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to create lead');
      }
    } catch (err) {
      console.error('Error creating lead:', err);
      alert('Network error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'WON':
        return <Badge variant="success">WON</Badge>;
      case 'LOST':
        return <Badge variant="destructive">LOST</Badge>;
      case 'NEW':
        return <Badge variant="orange">NEW</Badge>;
      case 'QUALIFIED':
        return <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/30">QUALIFIED</Badge>;
      case 'MEETING':
        return <Badge variant="default" className="bg-purple-500/20 text-purple-400 border-purple-500/30">MEETING</Badge>;
      case 'PROPOSAL':
        return <Badge variant="default" className="bg-amber-500/20 text-amber-400 border-amber-500/30">PROPOSAL</Badge>;
      case 'NEGOTIATION':
        return <Badge variant="default" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">NEGOTIATION</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 60) return 'text-brand-orange border-brand-orange/30 bg-brand-orange/10';
    if (score >= 40) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-slate-400 border-slate-700 bg-slate-800/40';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Master Lead Directory</h1>
          <p className="text-sm text-slate-400">
            Automated lead scoring, touchpoint velocity, and enterprise client conversion pipeline.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLeads}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Quick Add Lead
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <Input
                placeholder="Search name, company, email..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9 bg-brand-black/50 border-brand-border text-xs"
              />
            </div>

            {/* Status Filter */}
            <div>
              <Select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-brand-black/50 border-brand-border text-xs"
              >
                <option value="">All Pipeline Stages</option>
                <option value="NEW">New</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="MEETING">Meeting Scheduled</option>
                <option value="PROPOSAL">Proposal Sent</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="WON">Won Deal</option>
                <option value="LOST">Lost</option>
              </Select>
            </div>

            {/* Country Filter */}
            <div>
              <Input
                placeholder="Filter by country (e.g. US, India)..."
                value={countryFilter}
                onChange={(e) => {
                  setCountryFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-brand-black/50 border-brand-border text-xs"
              />
            </div>

            {/* Total Results Counter */}
            <div className="flex items-center justify-end text-xs text-slate-400 font-mono">
              Showing {leads.length} of {totalLeads} records
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Contact & Company</th>
                  <th className="py-3.5 px-4 font-semibold">Service</th>
                  <th className="py-3.5 px-4 font-semibold">Score</th>
                  <th className="py-3.5 px-4 font-semibold">Stage</th>
                  <th className="py-3.5 px-4 font-semibold">Country</th>
                  <th className="py-3.5 px-4 font-semibold">Touchpoints</th>
                  <th className="py-3.5 px-4 font-semibold">Assigned Rep</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                        <span>Loading pipeline data...</span>
                      </div>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      No leads match your search criteria.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white">
                          {lead.firstName} {lead.lastName}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-1.5">
                          <span>{lead.companyName}</span>
                          <span className="text-slate-600">•</span>
                          <span className="text-slate-500">{lead.email}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-300">
                        {lead.serviceName || 'General Consultation'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold border ${getScoreColor(
                            lead.score
                          )}`}
                        >
                          {lead.score}/100
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        {getStatusBadge(lead.status)}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">
                        {lead.country}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span title="Notes" className="flex items-center gap-0.5">
                            <MessageSquare className="w-3 h-3 text-slate-500" />
                            {lead._count?.notes || 0}
                          </span>
                          <span title="Calls" className="flex items-center gap-0.5">
                            <Phone className="w-3 h-3 text-slate-500" />
                            {lead._count?.calls || 0}
                          </span>
                          <span title="Meetings" className="flex items-center gap-0.5">
                            <Calendar className="w-3 h-3 text-slate-500" />
                            {lead._count?.meetings || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-300">
                        {lead.assignedTo?.name || (
                          <span className="text-slate-600 italic">Unassigned</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/crm/leads/${lead.id}`}
                          className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-brand-surface text-brand-orange border border-brand-border hover:bg-brand-orange hover:text-white transition-colors"
                        >
                          Manage
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-brand-border bg-brand-black/30">
              <span className="text-xs text-slate-400 font-mono">
                Page {page} of {totalPages}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || loading}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="text-xs border-brand-border"
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || loading}
                  onClick={() => setPage((p) => p + 1)}
                  className="text-xs border-brand-border"
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Add Lead Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-lg font-bold text-white">Add Inbound Prospect</h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">First Name *</label>
                  <Input
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Last Name *</label>
                  <Input
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Business Email *</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Company Name *</label>
                  <Input
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Country *</label>
                  <Input
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. United States, India"
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Service Required</label>
                  <Select
                    value={formData.serviceName}
                    onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  >
                    <option value="Autonomous AI Agents">Autonomous AI Agents</option>
                    <option value="Digital CMO">Digital CMO</option>
                    <option value="Digital CTO">Digital CTO</option>
                    <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                    <option value="Performance Marketing">Performance Marketing</option>
                    <option value="Data Infrastructure">Data Infrastructure</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Budget Tier *</label>
                  <Select
                    value={formData.budgetTier}
                    onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  >
                    <option value="TIER_10000_25000">$10,000 - $25,000 / mo</option>
                    <option value="ABOVE_25000">$25,000+ / mo</option>
                    <option value="TIER_5000_10000">$5,000 - $10,000 / mo</option>
                    <option value="TIER_2500_5000">$2,500 - $5,000 / mo</option>
                    <option value="INR_ABOVE_20L">₹20L+ / mo</option>
                    <option value="INR_8L_20L">₹8L - ₹20L / mo</option>
                    <option value="INR_4L_8L">₹4L - ₹8L / mo</option>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Project Scope & Objectives *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.projectDescription}
                  onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
                  placeholder="Outline key targets, timeline, existing stack..."
                  className="w-full rounded-md border border-brand-border bg-brand-black/50 p-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="border-brand-border text-slate-300"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white"
                >
                  {isSubmitting ? 'Scoring & Creating...' : 'Submit & Score Prospect'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
