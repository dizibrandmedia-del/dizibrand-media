import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function TeamMeetingsPage() {
  let meetings: any[] = [];

  try {
    meetings = await prisma.meeting.findMany({
      orderBy: { scheduledAt: 'desc' },
      include: {
        company: { select: { name: true } },
        lead: { select: { firstName: true, lastName: true, companyName: true } },
        host: { select: { name: true } },
      },
    });
  } catch (err) {
    console.error('Failed to load meetings:', err);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Team Overview
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-white">Scheduled Calls & Discovery</h1>
          <p className="text-sm text-slate-400">
            Upcoming executive consultations, technical discovery sessions, and project checkpoints.
          </p>
        </div>
      </div>

      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-brand-border bg-brand-black/40 text-xs uppercase text-slate-400 font-mono">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Title & Host</th>
                  <th className="py-3.5 px-4 font-semibold">Client / Lead</th>
                  <th className="py-3.5 px-4 font-semibold">Scheduled Time</th>
                  <th className="py-3.5 px-4 font-semibold">Duration</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40 text-slate-300">
                {meetings.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-500 text-xs">
                      No meetings currently scheduled.
                    </td>
                  </tr>
                ) : (
                  meetings.map((m) => (
                    <tr key={m.id} className="hover:bg-brand-surface/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white text-xs">{m.title}</div>
                        <span className="text-slate-400 text-[11px]">Host: {m.host?.name || 'Sales Rep'}</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-white">
                        {m.company?.name || m.lead?.companyName || 'Inbound Prospect'}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-300">
                        {new Date(m.scheduledAt).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                        {m.durationMinutes} mins
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Badge variant="orange">{m.status || 'Scheduled'}</Badge>
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
