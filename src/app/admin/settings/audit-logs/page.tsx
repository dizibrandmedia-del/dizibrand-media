'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  ShieldAlert,
  ArrowLeft,
  Search,
  Eye,
  Loader2,
  RefreshCw,
  Clock,
  User as UserIcon,
} from 'lucide-react';

interface AuditLogItem {
  id: string;
  actorId?: string | null;
  actorEmail?: string | null;
  action: string;
  entityType: string;
  entityId: string;
  changes?: any;
  createdAt: string;
  actor?: { id: string; name: string; email: string; role: string } | null;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState('');
  const [entityFilter, setEntityFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  // Changes Inspector modal
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (actionFilter) params.set('action', actionFilter);
      if (entityFilter) params.set('entityType', entityFilter);
      params.set('page', page.toString());
      params.set('limit', '25');

      const res = await fetch(`/api/admin/settings/audit-logs?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.auditLogs || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalLogs(data.pagination?.total || 0);
      }
    } catch (err) {
      console.error('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  }, [actionFilter, entityFilter, page]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10';
      case 'UPDATE':
        return 'border-blue-500/40 text-blue-400 bg-blue-500/10';
      case 'DELETE':
        return 'border-red-500/40 text-red-400 bg-red-500/10';
      case 'STATUS_CHANGE':
        return 'border-brand-orange/40 text-brand-orange bg-brand-orange/10';
      case 'ROLE_CHANGE':
        return 'border-purple-500/40 text-purple-400 bg-purple-500/10';
      case 'DELIVERABLE_APPROVED':
        return 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10';
      default:
        return 'border-slate-700 text-slate-400 bg-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Settings
          </Link>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-brand-orange" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Immutable Governance Audit Logs
            </h1>
          </div>
          <p className="text-sm text-slate-400">
            Cryptographic-grade tamper-evident trail recording every state mutation, role change, and commercial action across DiziBrand Media.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchLogs}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Select
                value={actionFilter}
                onChange={(e) => {
                  setActionFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-brand-black/50 border-brand-border text-xs"
              >
                <option value="">All Mutation Types</option>
                <option value="CREATE">CREATE</option>
                <option value="UPDATE">UPDATE</option>
                <option value="DELETE">DELETE</option>
                <option value="STATUS_CHANGE">STATUS_CHANGE</option>
                <option value="ROLE_CHANGE">ROLE_CHANGE</option>
                <option value="DELIVERABLE_APPROVED">DELIVERABLE_APPROVED</option>
              </Select>
            </div>

            <div>
              <Input
                placeholder="Filter by Entity Type (e.g. Lead, User)..."
                value={entityFilter}
                onChange={(e) => {
                  setEntityFilter(e.target.value);
                  setPage(1);
                }}
                className="bg-brand-black/50 border-brand-border text-xs"
              />
            </div>

            <div className="flex items-center justify-end text-xs text-slate-400 font-mono">
              Displaying {logs.length} of {totalLogs} events
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Timestamp (UTC)</th>
                  <th className="py-3.5 px-4 font-semibold">Actor / Initiator</th>
                  <th className="py-3.5 px-4 font-semibold">Action</th>
                  <th className="py-3.5 px-4 font-semibold">Entity Type</th>
                  <th className="py-3.5 px-4 font-semibold">Entity ID</th>
                  <th className="py-3.5 px-4 font-semibold text-right">State Diff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-brand-orange" />
                        <span>Verifying audit signatures...</span>
                      </div>
                    </td>
                  </tr>
                ) : logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-500">
                      No audit events match your filter.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3 px-4 font-mono text-xs text-slate-400">
                        {new Date(log.createdAt).toISOString().replace('T', ' ').substring(0, 19)}
                      </td>
                      <td className="py-3 px-4 text-xs">
                        <div className="font-medium text-white">
                          {log.actor?.name || log.actorEmail || 'System Process'}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {log.actor?.role || 'SYSTEM'}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getActionBadgeColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-300">
                        {log.entityType}
                      </td>
                      <td className="py-3 px-4 text-xs font-mono text-slate-400">
                        {log.entityId.length > 16 ? `${log.entityId.substring(0, 14)}...` : log.entityId}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLog(log)}
                          className="text-xs border-brand-border text-slate-300 hover:text-white"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          View Diff
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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

      {/* Changes Inspector Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div>
                <h3 className="text-base font-bold text-white">Audit Event Details</h3>
                <p className="text-[11px] text-slate-400 font-mono">
                  Event ID: {selectedLog.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-slate-300">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Action</span>
                <span className="font-semibold text-white">{selectedLog.action}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Target Entity</span>
                <span className="font-semibold text-white">{selectedLog.entityType} ({selectedLog.entityId})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Initiated By</span>
                <span className="font-semibold text-white">
                  {selectedLog.actor?.name || selectedLog.actorEmail || 'System'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-mono">Timestamp</span>
                <span className="font-mono text-white">
                  {new Date(selectedLog.createdAt).toUTCString()}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-500 uppercase block font-mono mb-1">State Mutation Diff</span>
              <pre className="p-4 rounded-lg bg-brand-black border border-brand-border font-mono text-[11px] text-emerald-400 overflow-x-auto max-h-72 whitespace-pre-wrap">
                {JSON.stringify(selectedLog.changes || {}, null, 2)}
              </pre>
            </div>

            <div className="flex justify-end pt-3 border-t border-brand-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedLog(null)}
                className="border-brand-border text-slate-300"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
