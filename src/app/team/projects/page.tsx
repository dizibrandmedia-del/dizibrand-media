'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Briefcase,
  Search,
  Plus,
  ArrowRight,
  Loader2,
  RefreshCw,
  FolderKanban,
  CheckCircle2,
} from 'lucide-react';

interface ProjectItem {
  id: string;
  projectCode: string;
  name: string;
  status: string;
  health: string;
  budget?: number | null;
  currency: string;
  company?: { id: string; name: string } | null;
  manager?: { id: string; name: string; email: string } | null;
  milestones?: any[];
  _count?: {
    tasks: number;
    deliverables: number;
    members: number;
  };
}

export default function TeamProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/team/projects?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge variant="success">ACTIVE</Badge>;
      case 'PLANNING':
        return <Badge variant="orange">PLANNING</Badge>;
      case 'KICKOFF':
        return <Badge variant="default" className="bg-blue-500/20 text-blue-400 border-blue-500/30">KICKOFF</Badge>;
      case 'COMPLETED':
        return <Badge variant="outline">COMPLETED</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Client Projects Delivery</h1>
          <p className="text-sm text-slate-400">
            Sprint management, milestone velocity, and cross-functional team delivery cockpit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchProjects}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Link
            href="/team/tasks"
            className="text-xs px-3 py-2 rounded-lg bg-brand-orange text-white font-medium hover:bg-brand-orange-hover transition-colors"
          >
            Sprint Task Board →
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
                placeholder="Search project code, name, or client org..."
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
                <option value="">All Delivery Stages</option>
                <option value="PLANNING">Planning</option>
                <option value="KICKOFF">Kickoff</option>
                <option value="ACTIVE">Active Delivery</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="COMPLETED">Completed</option>
              </Select>
            </div>

            <div className="flex items-center justify-end text-xs text-slate-400 font-mono">
              Total {projects.length} engagements
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-500 flex items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-brand-orange" />
            <span>Loading active projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500">
            No projects found matching your search.
          </div>
        ) : (
          projects.map((proj) => (
            <Card key={proj.id} className="bg-brand-charcoal/80 border-brand-border flex flex-col justify-between hover:border-brand-border/80 transition-all">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-brand-orange">
                    {proj.projectCode}
                  </span>
                  {getStatusBadge(proj.status)}
                </div>
                <CardTitle className="text-white text-base line-clamp-1">{proj.name}</CardTitle>
                <CardDescription className="text-slate-400 text-xs font-mono">
                  {proj.company?.name || 'Internal Engagement'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded bg-brand-black/40 border border-brand-border/60 text-center text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Tasks</span>
                    <span className="font-bold text-white">{proj._count?.tasks || 0}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Deliverables</span>
                    <span className="font-bold text-white">{proj._count?.deliverables || 0}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block">Health</span>
                    <span className="font-bold text-emerald-400">{proj.health || 'Green'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-brand-border/40">
                  <span>Lead: {proj.manager?.name || 'Unassigned'}</span>
                  <Link
                    href={`/team/projects/${proj.id}`}
                    className="inline-flex items-center gap-1 font-semibold text-brand-orange hover:text-white transition-colors"
                  >
                    Cockpit
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
