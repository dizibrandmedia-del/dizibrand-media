'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  CheckSquare,
  Search,
  Filter,
  Plus,
  Loader2,
  RefreshCw,
  Clock,
  User,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

interface TaskItem {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  priority: string;
  dueDate?: string | null;
  estimatedHours?: number | null;
  actualHours?: number | null;
  project?: { id: string; projectCode: string; name: string } | null;
  milestone?: { id: string; title: string } | null;
  assignedTo?: { id: string; name: string; email: string; role: string } | null;
}

const STATUS_COLUMNS = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'COMPLETED', 'BLOCKED'];

export default function TeamTasksPage() {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [myTasksOnly, setMyTasksOnly] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState('');
  const [movingId, setMovingId] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (myTasksOnly) params.set('myTasksOnly', 'true');
      if (priorityFilter) params.set('priority', priorityFilter);

      const res = await fetch(`/api/team/tasks?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || []);
      }
    } catch (err) {
      console.error('Failed to load tasks:', err);
    } finally {
      setLoading(false);
    }
  }, [myTasksOnly, priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    setMovingId(taskId);
    try {
      const res = await fetch(`/api/team/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchTasks();
      }
    } catch (err) {
      console.error('Failed to update task status:', err);
    } finally {
      setMovingId(null);
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-red-400 bg-red-500/10 border border-red-500/30">URGENT</span>;
      case 'HIGH':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-amber-400 bg-amber-500/10 border border-amber-500/30">HIGH</span>;
      case 'LOW':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-slate-400 bg-slate-800 border border-slate-700">LOW</span>;
      default:
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-blue-400 bg-blue-500/10 border border-blue-500/30">MEDIUM</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Sprint Task Board</h1>
          <p className="text-sm text-slate-400">
            Cross-functional engineering and marketing sprint task queue across active client engagements.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTasks}
            disabled={loading}
            className="border-brand-border text-slate-300 hover:text-white"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            variant={myTasksOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMyTasksOnly(!myTasksOnly)}
            className={`text-xs ${myTasksOnly ? 'bg-brand-orange text-white' : 'border-brand-border text-slate-300'}`}
          >
            {myTasksOnly ? 'Showing My Tasks' : 'Filter to My Tasks'}
          </Button>
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-brand-black/50 border-brand-border text-xs"
              >
                <option value="">All Priorities</option>
                <option value="URGENT">Urgent</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </Select>
            </div>

            <div className="flex items-center text-xs text-slate-400 font-mono">
              Displaying {tasks.length} sprint tasks
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board Columns */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-flex gap-4 min-w-full">
          {STATUS_COLUMNS.map((statusKey) => {
            const colTasks = tasks.filter((t) => t.status === statusKey);

            return (
              <div
                key={statusKey}
                className="w-72 shrink-0 bg-brand-charcoal/60 rounded-xl border border-brand-border flex flex-col max-h-[75vh]"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-brand-border/80 bg-brand-black/40 rounded-t-xl flex items-center justify-between">
                  <span className="font-semibold text-xs text-white uppercase tracking-wider">
                    {statusKey.replace('_', ' ')}
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-surface text-slate-300 border border-brand-border">
                    {colTasks.length}
                  </span>
                </div>

                {/* Column Cards Container */}
                <div className="p-3 space-y-3 overflow-y-auto flex-1">
                  {colTasks.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-600 italic">
                      No tasks in this state
                    </div>
                  ) : (
                    colTasks.map((task) => {
                      const isBusy = movingId === task.id;

                      return (
                        <div
                          key={task.id}
                          className="p-3 rounded-lg bg-brand-surface/70 border border-brand-border/60 hover:border-brand-border transition-all shadow-sm space-y-2.5"
                        >
                          {/* Project Code & Priority */}
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-mono text-brand-orange font-bold">
                              {task.project?.projectCode}
                            </span>
                            {getPriorityBadge(task.priority)}
                          </div>

                          {/* Task Title */}
                          <div className="font-semibold text-xs text-white line-clamp-2">
                            {task.title}
                          </div>

                          {/* Milestone */}
                          <p className="text-[11px] text-slate-400 line-clamp-1">
                            {task.milestone?.title}
                          </p>

                          {/* Assignee & Est Hours */}
                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-brand-border/40 font-mono">
                            <span className="truncate max-w-[130px]">
                              {task.assignedTo?.name || 'Unassigned'}
                            </span>
                            {task.estimatedHours && (
                              <span>{Number(task.estimatedHours)}h est</span>
                            )}
                          </div>

                          {/* Status Mover */}
                          <div className="pt-2 border-t border-brand-border/40">
                            <Select
                              value={task.status}
                              disabled={isBusy}
                              onChange={(e) => handleStatusChange(task.id, e.target.value)}
                              className="w-full bg-brand-black/50 border-brand-border text-[10px] py-0.5"
                            >
                              <option value="TODO">TODO</option>
                              <option value="IN_PROGRESS">IN PROGRESS</option>
                              <option value="IN_REVIEW">IN REVIEW</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="BLOCKED">BLOCKED</option>
                            </Select>
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
