'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  HelpCircle,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileQuestion,
  Filter,
  Phone,
  Mail,
  MessageCircle,
  Headphones,
} from 'lucide-react';
import { CONTACT_CONFIG } from '@/lib/config/contact';

interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  resolvedAt?: string | null;
  createdAt: string;
  project?: { id: string; name: string } | null;
  createdBy: { id: string; name: string };
  assignedTo?: { id: string; name: string } | null;
}

interface ProjectOption {
  id: string;
  name: string;
}

interface SupportClientViewProps {
  initialTickets: Ticket[];
  projects: ProjectOption[];
}

export function SupportClientView({
  initialTickets,
  projects,
}: SupportClientViewProps) {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CHANGE_REQUEST');
  const [priority, setPriority] = useState('MEDIUM');
  const [projectId, setProjectId] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const filteredTickets = tickets.filter((t) => {
    if (categoryFilter === 'ALL') return true;
    return t.category === categoryFilter;
  });

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/portal/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          priority,
          projectId: projectId || undefined,
          description,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create support ticket');
      }

      setTickets([data.ticket, ...tickets]);
      setSuccessMsg(`Ticket ${data.ticket.ticketNumber} created successfully! Our team has been notified.`);
      setIsCreateModalOpen(false);

      // Reset form
      setTitle('');
      setDescription('');
      setProjectId('');
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Support & Change Requests
          </h1>
          <p className="text-sm text-slate-400">
            Submit scope change requests, report issues, or communicate with your dedicated account lead.
          </p>
        </div>
        <Button
          size="sm"
          variant="primary"
          onClick={() => {
            setIsCreateModalOpen(true);
            setErrorMsg(null);
          }}
          className="flex items-center gap-1.5 bg-brand-orange hover:bg-brand-orange-hover"
        >
          <Plus className="w-4 h-4" />
          Create Ticket / Change Request
        </Button>
      </div>

      {/* Notifications */}
      {successMsg && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Official "Need Help?" Client Support Card */}
      <Card className="border-brand-border bg-brand-navy-soft shadow-lg">
        <CardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Headphones className="w-5 h-5 text-brand-red-orange" />
                <h2 className="text-base font-semibold text-white">Need Immediate Assistance?</h2>
                <Badge variant="orange" className="text-[10px] font-mono py-0">
                  Priority Support
                </Badge>
              </div>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                For urgent milestone delivery, production issues, or contract questions, connect directly
                with the DiziBrand client success desk. Our senior project directors respond promptly.
              </p>
            </div>

            {/* Quick Contact Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <a
                href={CONTACT_CONFIG.phone.telHref}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-brand-border bg-brand-surface/60 hover:border-brand-red-orange text-white hover:text-brand-red-orange transition-all font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-brand-red-orange" />
                <span>{CONTACT_CONFIG.phone.formatted}</span>
              </a>

              <a
                href={CONTACT_CONFIG.email.mailtoHref}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-brand-border bg-brand-surface/60 hover:border-brand-red-orange text-white hover:text-brand-red-orange transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-brand-red-orange" />
                <span>{CONTACT_CONFIG.email.support}</span>
              </a>

              <a
                href={CONTACT_CONFIG.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-emerald-500/30 bg-emerald-950/20 hover:border-emerald-500/60 text-emerald-300 transition-all font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-2">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-slate-500" />
              <span>Standard Support Hours: {CONTACT_CONFIG.businessHours.display} (Emergency On-Call 24/7)</span>
            </span>
            <span className="text-slate-500 font-mono">Guaranteed SLA: &lt; 4 Hours</span>
          </div>
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-brand-border/60">
        <span className="text-xs text-slate-500 flex items-center gap-1 mr-2">
          <Filter className="w-3.5 h-3.5" /> Category:
        </span>
        {['ALL', 'CHANGE_REQUEST', 'BUG', 'GENERAL_QUESTION', 'ASSET_REQUEST', 'BILLING'].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-brand-orange text-white'
                  : 'bg-brand-surface/40 text-slate-400 hover:text-white hover:bg-brand-surface'
              }`}
            >
              {cat.replace(/_/g, ' ')}
            </button>
          )
        )}
      </div>

      {/* Tickets List */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <CardTitle>Tickets History</CardTitle>
          <CardDescription>
            Active and resolved requests submitted by your team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredTickets.length === 0 ? (
            <div className="py-12 text-center">
              <FileQuestion className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white">No Tickets Found</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                No tickets or change requests match the selected category.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-brand-border/60">
              {filteredTickets.map((ticket) => {
                const isOpen = ticket.status === 'OPEN';
                const isResolved = ticket.status === 'RESOLVED' || ticket.status === 'CLOSED';

                return (
                  <div
                    key={ticket.id}
                    className="py-4 hover:bg-brand-surface/20 transition-colors rounded-lg px-3 space-y-2"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand-orange">
                          {ticket.ticketNumber}
                        </span>
                        <h4 className="text-sm font-semibold text-white">{ticket.title}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">
                          {ticket.category.replace(/_/g, ' ')}
                        </Badge>
                        <Badge
                          variant={
                            ticket.priority === 'URGENT' || ticket.priority === 'HIGH'
                              ? 'destructive'
                              : 'outline'
                          }
                          className="text-[10px]"
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge
                          variant={
                            isResolved
                              ? 'success'
                              : isOpen
                              ? 'warning'
                              : 'orange'
                          }
                          className="text-[10px]"
                        >
                          {ticket.status.replace(/_/g, ' ')}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">{ticket.description}</p>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>
                        Project: {ticket.project?.name || 'General'} • Assigned to:{' '}
                        {ticket.assignedTo?.name || 'Triage Queue'}
                      </span>
                      <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Ticket Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-brand-charcoal border border-brand-border rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Create Ticket / Request</h3>
                <p className="text-xs text-slate-400">
                  Notify your project manager and engineering team.
                </p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Request Subject / Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Add webhook retry mechanism to payment flow"
                  className="w-full px-3 py-2 text-sm bg-brand-surface/60 border border-brand-border rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-surface/60 border border-brand-border rounded-lg text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="CHANGE_REQUEST">Change Request</option>
                    <option value="BUG">Bug Report</option>
                    <option value="GENERAL_QUESTION">General Question</option>
                    <option value="ASSET_REQUEST">Asset Request</option>
                    <option value="BILLING">Billing Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-surface/60 border border-brand-border rounded-lg text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>

              {projects.length > 0 && (
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Related Project (Optional)
                  </label>
                  <select
                    value={projectId}
                    onChange={(e) => setProjectId(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-brand-surface/60 border border-brand-border rounded-lg text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Detailed Description / Acceptance Criteria
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide context, expected behavior, or specific changes required..."
                  className="w-full px-3 py-2 text-sm bg-brand-surface/60 border border-brand-border rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={submitting}
                  className="bg-brand-orange hover:bg-brand-orange-hover"
                >
                  {submitting ? 'Creating Ticket...' : 'Submit Ticket'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
