'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  FolderKanban,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';

interface MilestoneItem {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  status: string;
  dueDate?: string | null;
  isClientApprovalRequired: boolean;
  project?: { id: string; projectCode: string; name: string } | null;
  _count?: { tasks: number; deliverables: number };
}

export default function TeamMilestonesPage() {
  const [milestones, setMilestones] = useState<MilestoneItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchMilestones = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/team/projects');
      if (res.ok) {
        const data = await res.json();
        // Flatten milestones from projects
        const list: MilestoneItem[] = [];
        data.projects?.forEach((p: any) => {
          p.milestones?.forEach((m: any) => {
            list.push({
              ...m,
              project: { id: p.id, projectCode: p.projectCode, name: p.name },
            });
          });
        });
        setMilestones(list);
      }
    } catch (err) {
      console.error('Failed to load milestones:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMilestones();
  }, [fetchMilestones]);

  const handleStatusChange = async (milestoneId: string, newStatus: string) => {
    setUpdatingId(milestoneId);
    try {
      const res = await fetch(`/api/team/milestones/${milestoneId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchMilestones();
      }
    } catch (err) {
      console.error('Failed to update milestone status:', err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Milestone Delivery Roadmap</h1>
          <p className="text-sm text-slate-400">
            Sprint milestones, client sign-off requirements, and delivery checkpoints across active engagements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchMilestones}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link
            href="/team/projects"
            className="text-xs px-3 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-hover transition-colors"
          >
            All Projects →
          </Link>
        </div>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-16 text-center text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-brand-orange" />
            <span>Loading milestone roadmap...</span>
          </div>
        ) : milestones.length === 0 ? (
          <Card className="bg-brand-charcoal/80 border-brand-border">
            <CardContent className="py-12 text-center text-slate-500 text-xs">
              No milestones currently registered across active projects.
            </CardContent>
          </Card>
        ) : (
          milestones.map((m) => {
            const isBusy = updatingId === m.id;

            return (
              <Card key={m.id} className="bg-brand-charcoal/80 border-brand-border hover:border-brand-border/80 transition-all">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-orange">
                        {m.project?.projectCode}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-xs text-slate-400 font-mono">Stage {m.order}</span>
                      <Badge variant={m.status === 'COMPLETED' ? 'success' : 'orange'}>
                        {m.status}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-white text-sm">{m.title}</h3>
                    <p className="text-xs text-slate-400">
                      Project: <span className="text-slate-300 font-medium">{m.project?.name}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Select
                      value={m.status}
                      disabled={isBusy}
                      onChange={(e) => handleStatusChange(m.id, e.target.value)}
                      className="w-44 bg-brand-black/50 border-brand-border text-xs py-1"
                    >
                      <option value="UPCOMING">Upcoming</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="PENDING_CLIENT_APPROVAL">Pending Client Approval</option>
                      <option value="APPROVED">Approved</option>
                      <option value="COMPLETED">Completed</option>
                    </Select>

                    <Link
                      href={`/team/projects/${m.project?.id}`}
                      className="text-xs px-2.5 py-1.5 rounded bg-brand-surface border border-brand-border text-brand-orange hover:text-white transition-colors"
                    >
                      Cockpit →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
