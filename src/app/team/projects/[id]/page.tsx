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
  Briefcase,
  CheckCircle2,
  Clock,
  Plus,
  FileCheck,
  CheckSquare,
  Users,
  ExternalLink,
  MessageSquare,
  AlertTriangle,
  Loader2,
  RefreshCw,
} from 'lucide-react';

export default function ProjectCockpitPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'milestones' | 'tasks' | 'deliverables' | 'members'>('milestones');

  // Add Task modal state
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    milestoneId: '',
    priority: 'MEDIUM',
    estimatedHours: 8,
    description: '',
  });

  // Submit Deliverable modal state
  const [showDeliverableModal, setShowDeliverableModal] = useState(false);
  const [deliverableForm, setDeliverableForm] = useState({
    title: '',
    milestoneId: '',
    description: '',
    fileUrl: '',
    externalLink: '',
  });

  // Review Deliverable modal state
  const [selectedDeliverable, setSelectedDeliverable] = useState<any>(null);
  const [reviewStatus, setReviewStatus] = useState('Approved');
  const [reviewFeedback, setReviewFeedback] = useState('');

  const fetchProject = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/team/projects/${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data.project);
        if (data.project?.milestones?.length > 0) {
          setTaskForm((prev) => ({ ...prev, milestoneId: data.project.milestones[0].id }));
          setDeliverableForm((prev) => ({ ...prev, milestoneId: data.project.milestones[0].id }));
        }
      } else {
        alert('Project not found');
        router.push('/team/projects');
      }
    } catch (err) {
      console.error('Failed to load project:', err);
    } finally {
      setLoading(false);
    }
  }, [projectId, router]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/team/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...taskForm,
          projectId,
          estimatedHours: Number(taskForm.estimatedHours),
        }),
      });
      if (res.ok) {
        setShowTaskModal(false);
        setTaskForm({
          title: '',
          milestoneId: project?.milestones?.[0]?.id || '',
          priority: 'MEDIUM',
          estimatedHours: 8,
          description: '',
        });
        fetchProject();
      }
    } catch (err) {
      console.error('Failed to create task:', err);
    }
  };

  const handleSubmitDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/team/deliverables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...deliverableForm,
          projectId,
        }),
      });
      if (res.ok) {
        setShowDeliverableModal(false);
        setDeliverableForm({
          title: '',
          milestoneId: project?.milestones?.[0]?.id || '',
          description: '',
          fileUrl: '',
          externalLink: '',
        });
        fetchProject();
      }
    } catch (err) {
      console.error('Failed to submit deliverable:', err);
    }
  };

  const handleReviewDeliverable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDeliverable) return;
    try {
      const res = await fetch(`/api/team/deliverables/${selectedDeliverable.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: reviewStatus,
          feedback: reviewFeedback,
        }),
      });
      if (res.ok) {
        setSelectedDeliverable(null);
        setReviewFeedback('');
        fetchProject();
      }
    } catch (err) {
      console.error('Failed to review deliverable:', err);
    }
  };

  const handleTaskStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/team/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchProject();
      }
    } catch (err) {
      console.error('Failed to update task status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-brand-orange" />
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/team/projects"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Projects
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-white">{project.name}</h1>
            <span className="font-mono text-sm font-bold text-brand-orange">
              {project.projectCode}
            </span>
            <Badge variant="success">{project.status}</Badge>
          </div>
          <p className="text-xs text-slate-400">
            Client: <span className="text-white font-medium">{project.company?.name}</span> • Manager:{' '}
            <span className="text-slate-200">{project.manager?.name || 'Unassigned'}</span> • Health:{' '}
            <span className="text-emerald-400 font-semibold">{project.health}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowTaskModal(true)}
            className="bg-brand-surface border border-brand-border text-slate-200 hover:text-white text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Task
          </Button>
          <Button
            onClick={() => setShowDeliverableModal(true)}
            className="bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-semibold"
          >
            <FileCheck className="w-3.5 h-3.5 mr-1" />
            Submit Deliverable
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-brand-border gap-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('milestones')}
          className={`pb-3 px-4 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'milestones'
              ? 'border-brand-orange text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          Milestones Roadmap ({project.milestones?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`pb-3 px-4 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'tasks'
              ? 'border-brand-orange text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="w-3.5 h-3.5" />
          Sprint Tasks ({project.tasks?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('deliverables')}
          className={`pb-3 px-4 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'deliverables'
              ? 'border-brand-orange text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileCheck className="w-3.5 h-3.5" />
          Deliverables ({project.deliverables?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('members')}
          className={`pb-3 px-4 font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'members'
              ? 'border-brand-orange text-white'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          Staffed Team ({project.members?.length || 0})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'milestones' && (
        <div className="space-y-4">
          {project.milestones?.length === 0 ? (
            <Card className="bg-brand-charcoal/80 border-brand-border">
              <CardContent className="py-12 text-center text-slate-500 text-xs">
                No delivery milestones created for this engagement.
              </CardContent>
            </Card>
          ) : (
            project.milestones?.map((m: any, idx: number) => (
              <Card key={m.id} className="bg-brand-charcoal/80 border-brand-border">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-brand-surface border border-brand-border text-brand-orange text-xs font-mono font-bold flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <h3 className="font-semibold text-white text-sm">{m.title}</h3>
                    </div>
                    <Badge variant={m.status === 'COMPLETED' ? 'success' : 'orange'}>
                      {m.status}
                    </Badge>
                  </div>
                  {m.description && (
                    <p className="text-xs text-slate-400 pl-9 leading-relaxed">{m.description}</p>
                  )}
                  <div className="pl-9 pt-2 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Tasks: {m.tasks?.length || 0} • Deliverables: {m.deliverables?.length || 0}</span>
                    <span>Client Approval Required: {m.isClientApprovalRequired ? 'Yes' : 'No'}</span>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      )}

      {activeTab === 'tasks' && (
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Task</th>
                    <th className="py-3 px-4 font-semibold">Milestone</th>
                    <th className="py-3 px-4 font-semibold">Priority</th>
                    <th className="py-3 px-4 font-semibold">Assignee</th>
                    <th className="py-3 px-4 font-semibold">State</th>
                    <th className="py-3 px-4 font-semibold text-right">Quick Move</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40 text-slate-300">
                  {project.tasks?.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500 text-xs">
                        No tasks created yet. Click "Add Task" to create one.
                      </td>
                    </tr>
                  ) : (
                    project.tasks?.map((t: any) => (
                      <tr key={t.id} className="hover:bg-brand-surface/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-medium text-white text-xs">{t.title}</div>
                          {t.estimatedHours && (
                            <span className="text-[10px] text-slate-500 font-mono">
                              Est: {Number(t.estimatedHours)} hrs
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-400">
                          {t.milestone?.title || 'General'}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                              t.priority === 'URGENT' || t.priority === 'HIGH'
                                ? 'text-red-400 border-red-500/30 bg-red-500/10'
                                : 'text-slate-300 border-brand-border bg-brand-surface'
                            }`}
                          >
                            {t.priority}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-300">
                          {t.assignedTo?.name || <span className="text-slate-600">Unassigned</span>}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              t.status === 'COMPLETED'
                                ? 'success'
                                : t.status === 'IN_PROGRESS'
                                ? 'orange'
                                : t.status === 'BLOCKED'
                                ? 'destructive'
                                : 'default'
                            }
                          >
                            {t.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Select
                            value={t.status}
                            onChange={(e) => handleTaskStatusChange(t.id, e.target.value)}
                            className="w-32 ml-auto bg-brand-black/50 border-brand-border text-[11px] py-0.5"
                          >
                            <option value="TODO">TODO</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="IN_REVIEW">IN REVIEW</option>
                            <option value="COMPLETED">COMPLETED</option>
                            <option value="BLOCKED">BLOCKED</option>
                          </Select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'deliverables' && (
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Deliverable Asset</th>
                    <th className="py-3 px-4 font-semibold">Milestone</th>
                    <th className="py-3 px-4 font-semibold">Submitted By</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border/40 text-slate-300">
                  {project.deliverables?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500 text-xs">
                        No deliverables submitted yet. Click "Submit Deliverable" to record one.
                      </td>
                    </tr>
                  ) : (
                    project.deliverables?.map((d: any) => (
                      <tr key={d.id} className="hover:bg-brand-surface/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-medium text-white text-xs">{d.title}</div>
                          {d.externalLink && (
                            <a
                              href={d.externalLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] text-brand-orange hover:underline inline-flex items-center gap-1"
                            >
                              External Link
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-400">
                          {d.milestone?.title || 'General'}
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-300">
                          {d.submittedBy?.name || 'Specialist'}
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={d.status === 'Approved' ? 'success' : 'orange'}>
                            {d.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedDeliverable(d);
                              setReviewStatus(d.status);
                              setReviewFeedback(d.feedback || '');
                            }}
                            className="text-xs border-brand-border text-slate-300 hover:text-white"
                          >
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'members' && (
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.members?.length === 0 ? (
                <p className="text-xs text-slate-500 col-span-full text-center py-8">
                  No additional team members staffed yet.
                </p>
              ) : (
                project.members?.map((m: any) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-lg border border-brand-border bg-brand-surface/40 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-medium text-white text-xs">{m.user?.name}</span>
                      <p className="text-[10px] text-slate-400">{m.user?.email}</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-mono">
                      {m.roleInProject || m.user?.role}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-base font-bold text-white">Create Sprint Task</h3>
              <button onClick={() => setShowTaskModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleCreateTask} className="space-y-3">
              <div>
                <label className="block text-slate-300 mb-1">Task Title *</label>
                <Input
                  required
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Milestone</label>
                <Select
                  value={taskForm.milestoneId}
                  onChange={(e) => setTaskForm({ ...taskForm, milestoneId: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                >
                  {project.milestones?.map((m: any) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 mb-1">Priority</label>
                  <Select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="bg-brand-black/50 border-brand-border"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Estimated Hours</label>
                  <Input
                    type="number"
                    value={taskForm.estimatedHours}
                    onChange={(e) => setTaskForm({ ...taskForm, estimatedHours: Number(e.target.value) })}
                    className="bg-brand-black/50 border-brand-border"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button type="button" variant="outline" onClick={() => setShowTaskModal(false)} className="border-brand-border text-slate-300">Cancel</Button>
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-hover text-white">Create Task</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submit Deliverable Modal */}
      {showDeliverableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-base font-bold text-white">Submit Deliverable Asset</h3>
              <button onClick={() => setShowDeliverableModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <form onSubmit={handleSubmitDeliverable} className="space-y-3">
              <div>
                <label className="block text-slate-300 mb-1">Deliverable Title *</label>
                <Input
                  required
                  value={deliverableForm.title}
                  onChange={(e) => setDeliverableForm({ ...deliverableForm, title: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Milestone</label>
                <Select
                  value={deliverableForm.milestoneId}
                  onChange={(e) => setDeliverableForm({ ...deliverableForm, milestoneId: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                >
                  {project.milestones?.map((m: any) => (
                    <option key={m.id} value={m.id}>{m.title}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-slate-300 mb-1">External Asset Link (Figma, GitHub PR, Google Drive)</label>
                <Input
                  type="url"
                  placeholder="https://..."
                  value={deliverableForm.externalLink}
                  onChange={(e) => setDeliverableForm({ ...deliverableForm, externalLink: e.target.value })}
                  className="bg-brand-black/50 border-brand-border"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button type="button" variant="outline" onClick={() => setShowDeliverableModal(false)} className="border-brand-border text-slate-300">Cancel</Button>
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-hover text-white">Submit for PM Review</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review Deliverable Modal */}
      {selectedDeliverable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-brand-charcoal border border-brand-border rounded-xl shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <h3 className="text-base font-bold text-white">Review Deliverable</h3>
              <button onClick={() => setSelectedDeliverable(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
            <p className="text-slate-300">
              Reviewing: <strong>{selectedDeliverable.title}</strong>
            </p>
            <form onSubmit={handleReviewDeliverable} className="space-y-3">
              <div>
                <label className="block text-slate-300 mb-1">Review Decision</label>
                <Select
                  value={reviewStatus}
                  onChange={(e) => setReviewStatus(e.target.value)}
                  className="bg-brand-black/50 border-brand-border"
                >
                  <option value="Approved">Approved</option>
                  <option value="Changes Requested">Changes Requested</option>
                  <option value="In Review">In Review</option>
                </Select>
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Feedback / Notes</label>
                <textarea
                  rows={3}
                  value={reviewFeedback}
                  onChange={(e) => setReviewFeedback(e.target.value)}
                  placeholder="Feedback for the specialist..."
                  className="w-full rounded-md border border-brand-border bg-brand-black/50 p-2 text-xs text-white focus:outline-none focus:border-brand-orange"
                />
              </div>
              <div className="flex justify-end gap-3 pt-3 border-t border-brand-border">
                <Button type="button" variant="outline" onClick={() => setSelectedDeliverable(null)} className="border-brand-border text-slate-300">Cancel</Button>
                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">Save Review</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
