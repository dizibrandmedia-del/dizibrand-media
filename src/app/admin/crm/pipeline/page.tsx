'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RefreshCw,
  Loader2,
} from 'lucide-react';

interface StageSummary {
  stage: string;
  count: number;
  totalValue: number;
}

const STAGE_CONFIG: { [key: string]: { label: string; color: string; border: string } } = {
  NEW: { label: 'New Inbound', color: 'bg-slate-500/10 text-slate-300', border: 'border-slate-700' },
  CONTACTED: { label: 'Contacted', color: 'bg-blue-500/10 text-blue-400', border: 'border-blue-500/30' },
  QUALIFIED: { label: 'Qualified', color: 'bg-indigo-500/10 text-indigo-400', border: 'border-indigo-500/30' },
  MEETING: { label: 'Meeting Set', color: 'bg-purple-500/10 text-purple-400', border: 'border-purple-500/30' },
  PROPOSAL: { label: 'Proposal Sent', color: 'bg-amber-500/10 text-amber-400', border: 'border-amber-500/30' },
  NEGOTIATION: { label: 'Negotiation', color: 'bg-cyan-500/10 text-cyan-400', border: 'border-cyan-500/30' },
  WON: { label: 'Deal Won', color: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/30' },
  LOST: { label: 'Lost / Closed', color: 'bg-red-500/10 text-red-400', border: 'border-red-500/30' },
};

const STAGE_ORDER = ['NEW', 'CONTACTED', 'QUALIFIED', 'MEETING', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];

export default function PipelinePage() {
  const [stages, setStages] = useState<Record<string, any[]>>({});
  const [summaries, setSummaries] = useState<StageSummary[]>([]);
  const [totalPipelineValue, setTotalPipelineValue] = useState(0);
  const [activeDealsCount, setActiveDealsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [movingId, setMovingId] = useState<string | null>(null);

  const fetchPipeline = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/crm/pipeline');
      if (res.ok) {
        const data = await res.json();
        setStages(data.stages || {});
        setSummaries(data.summaries || []);
        setTotalPipelineValue(data.totalPipelineValue || 0);
        setActiveDealsCount(data.activeDealsCount || 0);
      }
    } catch (err) {
      console.error('Failed to load pipeline:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPipeline();
  }, [fetchPipeline]);

  const handleMoveStage = async (leadId: string, newStatus: string) => {
    setMovingId(leadId);
    try {
      const res = await fetch('/api/admin/crm/pipeline', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, newStatus }),
      });
      if (res.ok) {
        fetchPipeline();
      }
    } catch (err) {
      console.error('Failed to move deal:', err);
    } finally {
      setMovingId(null);
    }
  };

  const getNextStage = (currentStage: string): string | null => {
    const currentIndex = STAGE_ORDER.indexOf(currentStage);
    if (currentIndex >= 0 && currentIndex < STAGE_ORDER.length - 2) {
      return STAGE_ORDER[currentIndex + 1];
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Deals Pipeline Kanban</h1>
          <p className="text-sm text-slate-400">
            Real-time visual velocity across all active commercial opportunities and contracts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPipeline}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link
            href="/admin/crm/leads"
            className="text-xs px-3 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-hover transition-colors"
          >
            Lead Directory →
          </Link>
        </div>
      </div>

      {/* Pipeline Summary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Total Pipeline Value
              </span>
              <DollarSign className="w-4 h-4 text-brand-orange" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white">
              ${totalPipelineValue.toLocaleString()}
            </div>
            <p className="mt-1 text-xs text-slate-500">Unweighted active deals</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Active In-Flight Deals
              </span>
              <Briefcase className="w-4 h-4 text-brand-orange" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white">{activeDealsCount}</div>
            <p className="mt-1 text-xs text-slate-500">Excluding Won & Lost</p>
          </CardContent>
        </Card>

        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                Average Deal Size
              </span>
              <TrendingUp className="w-4 h-4 text-brand-orange" />
            </div>
            <div className="mt-2 text-2xl font-bold text-white">
              ${activeDealsCount > 0 ? Math.round(totalPipelineValue / activeDealsCount).toLocaleString() : '0'}
            </div>
            <p className="mt-1 text-xs text-slate-500">Target contract value</p>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-flex gap-4 min-w-full">
          {STAGE_ORDER.map((stageKey) => {
            const config = STAGE_CONFIG[stageKey] || {
              label: stageKey,
              color: 'bg-slate-800 text-white',
              border: 'border-brand-border',
            };
            const stageLeads = stages[stageKey] || [];
            const stageTotal = stageLeads.reduce((acc, curr) => acc + (curr.estimatedValue || 0), 0);

            return (
              <div
                key={stageKey}
                className="w-72 shrink-0 bg-brand-charcoal/60 rounded-xl border border-brand-border flex flex-col max-h-[75vh]"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-brand-border/80 bg-brand-black/40 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white uppercase tracking-wider">
                      {config.label}
                    </span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-surface text-slate-300 border border-brand-border">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] font-mono text-slate-400">
                    ${stageTotal.toLocaleString()}
                  </div>
                </div>

                {/* Column Cards Container */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                  {stageLeads.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-600 italic">
                      No deals in this stage
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const nextStage = getNextStage(stageKey);
                      const isMoving = movingId === lead.id;

                      return (
                        <div
                          key={lead.id}
                          className="p-3 rounded-lg bg-brand-surface/70 border border-brand-border/60 hover:border-brand-border transition-all shadow-sm space-y-2.5"
                        >
                          {/* Card Header */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <Link
                                href={`/admin/crm/leads/${lead.id}`}
                                className="font-semibold text-xs text-white hover:text-brand-orange transition-colors line-clamp-1"
                              >
                                {lead.companyName}
                              </Link>
                              <p className="text-[11px] text-slate-400">
                                {lead.firstName} {lead.lastName}
                              </p>
                            </div>
                            <span className="font-mono text-[11px] font-bold text-brand-orange shrink-0">
                              ${(lead.estimatedValue || 0).toLocaleString()}
                            </span>
                          </div>

                          {/* Service & Score */}
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-slate-400 truncate max-w-[130px]">
                              {lead.serviceName || 'Consulting'}
                            </span>
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-brand-black/60 text-slate-300 border border-brand-border/40">
                              {lead.score}/100
                            </span>
                          </div>

                          {/* Assignee & Country */}
                          <div className="text-[10px] text-slate-500 flex items-center justify-between font-mono">
                            <span>{lead.assignedTo?.name || 'Unassigned'}</span>
                            <span>{lead.country}</span>
                          </div>

                          {/* Action Buttons */}
                          <div className="pt-2 border-t border-brand-border/40 flex items-center justify-between gap-1">
                            <Link
                              href={`/admin/crm/leads/${lead.id}`}
                              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-0.5"
                            >
                              Details
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>

                            <div className="flex items-center gap-1">
                              {stageKey !== 'LOST' && stageKey !== 'WON' && (
                                <>
                                  <button
                                    disabled={isMoving}
                                    onClick={() => handleMoveStage(lead.id, 'LOST')}
                                    title="Mark Lost"
                                    className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                                  >
                                    <XCircle className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    disabled={isMoving}
                                    onClick={() => handleMoveStage(lead.id, 'WON')}
                                    title="Mark Won"
                                    className="p-1 text-slate-500 hover:text-emerald-400 rounded transition-colors"
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </button>
                                </>
                              )}

                              {nextStage && (
                                <button
                                  disabled={isMoving}
                                  onClick={() => handleMoveStage(lead.id, nextStage)}
                                  className="px-2 py-0.5 rounded bg-brand-black/60 hover:bg-brand-orange hover:text-white text-slate-300 border border-brand-border/60 text-[10px] font-mono flex items-center gap-0.5 transition-colors"
                                >
                                  Next
                                  <ChevronRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
