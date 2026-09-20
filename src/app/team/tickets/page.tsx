'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Search,
  Plus,
  Loader2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';

interface TicketItem {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  createdAt: string;
  company?: { id: string; name: string } | null;
  project?: { id: string; name: string; projectCode: string } | null;
  createdBy?: { id: string; name: string } | null;
  assignedTo?: { id: string; name: string } | null;
}

export default function TeamTicketsPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/team/tickets?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setTickets(data.tickets || []);
      }
    } catch (err) {
      console.error('Failed to load tickets:', err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    setUpdatingId(ticketId);
    try {
      const res = await fetch(`/api/team/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchTickets();
      }
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return <Badge variant="destructive">URGENT</Badge>;
      case 'HIGH':
        return <Badge variant="orange">HIGH</Badge>;
      case 'LOW':
        return <Badge variant="default">LOW</Badge>;
      default:
        return <Badge variant="default">MEDIUM</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Support & Escalation Tickets</h1>
          <p className="text-sm text-slate-400">
            Client requests, bug investigations, and technical change requests triage.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTickets}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
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
                <option value="">All Ticket Statuses</option>
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="AWAITING_CLIENT_RESPONSE">Awaiting Client Response</option>
                <option value="RESOLVED">Resolved</option>
                <option value="CLOSED">Closed</option>
              </Select>
            </div>

            <div className="flex items-center justify-end text-xs text-slate-400 font-mono">
              Total {tickets.length} tickets recorded
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Ticket & Client</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Priority</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold">Assignee</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                        <span>Loading support tickets...</span>
                      </div>
                    </td>
                  </tr>
                ) : tickets.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                      No tickets match your filter criteria.
                    </td>
                  </tr>
                ) : (
                  tickets.map((t) => {
                    const isBusy = updatingId === t.id;

                    return (
                      <tr key={t.id} className="hover:bg-brand-surface/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white text-xs">{t.title}</div>
                          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                            <span className="text-brand-orange font-bold">{t.ticketNumber}</span>
                            <span>•</span>
                            <span>{t.company?.name || 'Client Org'}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-300">
                          {t.category.replace('_', ' ')}
                        </td>
                        <td className="py-3.5 px-4">
                          {getPriorityBadge(t.priority)}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge
                            variant={
                              t.status === 'RESOLVED' || t.status === 'CLOSED'
                                ? 'success'
                                : t.status === 'OPEN'
                                ? 'orange'
                                : 'default'
                            }
                          >
                            {t.status.replace('_', ' ')}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-xs text-slate-300">
                          {t.assignedTo?.name || <span className="text-slate-600 italic">Unassigned</span>}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <Select
                            value={t.status}
                            disabled={isBusy}
                            onChange={(e) => handleStatusChange(t.id, e.target.value)}
                            className="w-36 ml-auto bg-brand-black/50 border-brand-border text-xs py-1"
                          >
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="AWAITING_CLIENT_RESPONSE">AWAITING CLIENT</option>
                            <option value="RESOLVED">RESOLVED</option>
                            <option value="CLOSED">CLOSED</option>
                          </Select>
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
    </div>
  );
}
