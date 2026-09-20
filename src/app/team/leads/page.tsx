'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Search,
  Phone,
  MessageSquare,
  Calendar,
  ExternalLink,
  Loader2,
  RefreshCw,
  Clock,
} from 'lucide-react';

interface LeadItem {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  country: string;
  companyName: string;
  serviceName?: string | null;
  budgetTier: string;
  score: number;
  status: string;
  createdAt: string;
  _count?: {
    notes: number;
    calls: number;
    meetings: number;
  };
}

export default function TeamLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/admin/crm/leads?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Failed to load assigned leads:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">My Inbound Opportunity Queue</h1>
          <p className="text-sm text-slate-400">
            Prospect touchpoints, qualification calls, and proposal velocity.
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
          <Link
            href="/team/pipeline"
            className="text-xs px-3 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-hover transition-colors"
          >
            Open Deals Pipeline →
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <Input
                placeholder="Search contact, company, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-brand-black/50 border-brand-border text-xs"
              />
            </div>

            <div>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-brand-black/50 border-brand-border text-xs"
              >
                <option value="">All Opportunity Stages</option>
                <option value="NEW">New Inbound</option>
                <option value="CONTACTED">Contacted</option>
                <option value="QUALIFIED">Qualified</option>
                <option value="MEETING">Meeting Scheduled</option>
                <option value="PROPOSAL">Proposal Sent</option>
                <option value="NEGOTIATION">Negotiation</option>
                <option value="WON">Deal Won</option>
              </Select>
            </div>

            <div className="flex items-center justify-end text-xs text-slate-400 font-mono">
              Total {leads.length} leads in queue
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
                  <th className="py-3.5 px-4 font-semibold">Service Fit</th>
                  <th className="py-3.5 px-4 font-semibold">Score</th>
                  <th className="py-3.5 px-4 font-semibold">Stage</th>
                  <th className="py-3.5 px-4 font-semibold">Touchpoints</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                        <span>Loading sales opportunities...</span>
                      </div>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No leads found in your queue.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">
                          {lead.firstName} {lead.lastName}
                        </div>
                        <div className="text-xs text-slate-400 font-mono">{lead.companyName}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-300">
                        {lead.serviceName || 'Strategic Engagement'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-xs font-bold text-brand-orange">
                          {lead.score}/100
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            lead.status === 'WON'
                              ? 'success'
                              : lead.status === 'NEW'
                              ? 'orange'
                              : 'default'
                          }
                        >
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400 font-mono">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3 text-slate-500" />
                            {lead._count?.notes || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" />
                            {lead._count?.calls || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/crm/leads/${lead.id}`}
                          className="inline-flex items-center gap-1 text-xs text-brand-orange hover:text-white transition-colors"
                        >
                          Cockpit
                          <ExternalLink className="w-3 h-3" />
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
