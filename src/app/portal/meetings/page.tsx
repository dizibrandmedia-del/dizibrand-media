import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  Video,
  User,
  ExternalLink,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';

export default async function ClientMeetingsPage() {
  const session = await getServerSession(authOptions);
  let companyId = '';

  try {
    companyId = assertClientTenant(session);
  } catch {}

  if (!companyId) {
    const firstCompany = await prisma.company.findFirst({ select: { id: true } });
    companyId = firstCompany?.id || '';
  }

  const meetings = companyId
    ? await prisma.meeting.findMany({
        where: {
          OR: [{ companyId }, { project: { companyId } }],
        },
        orderBy: { scheduledAt: 'asc' },
        include: {
          host: { select: { id: true, name: true, email: true } },
          project: { select: { id: true, name: true, projectCode: true } },
        },
      })
    : [];

  const now = new Date();
  const upcomingMeetings = meetings.filter((m) => new Date(m.scheduledAt) >= now);
  const pastMeetings = meetings.filter((m) => new Date(m.scheduledAt) < now);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Strategy Meetings</h1>
        <p className="text-sm text-slate-400">
          Scheduled sprint demos, steering committee reviews, and strategic leadership calls.
        </p>
      </div>

      {/* Upcoming Meetings */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Scheduled calendar syncs and video reviews</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {upcomingMeetings.length} Scheduled
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {upcomingMeetings.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">
              No upcoming sessions currently scheduled. Reach out to your project lead to book a sprint sync.
            </p>
          ) : (
            <div className="space-y-3">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="p-4 rounded-xl border border-brand-border bg-brand-surface/30 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="p-2.5 rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-brand-orange mt-0.5">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{meeting.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {new Date(meeting.scheduledAt).toLocaleString([], {
                          dateStyle: 'full',
                          timeStyle: 'short',
                        })}{' '}
                        ({meeting.durationMinutes} mins)
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-1.5">
                        <span>Host: {meeting.host.name}</span>
                        {meeting.project && <span>• Project: {meeting.project.name}</span>}
                      </div>
                      {meeting.notes && (
                        <p className="text-xs text-slate-300 mt-2 bg-brand-surface/40 p-2 rounded border border-brand-border/40">
                          {meeting.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="orange">{meeting.status}</Badge>
                    {meeting.meetingUrl ? (
                      <a
                        href={meeting.meetingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-3.5 py-2 rounded-lg bg-brand-orange hover:bg-brand-orange-hover text-white font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        Join Call
                      </a>
                    ) : (
                      <span className="text-xs text-slate-500">Link provided prior to call</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Past Meetings */}
      {pastMeetings.length > 0 && (
        <Card className="bg-brand-charcoal/80 border-brand-border">
          <CardHeader>
            <CardTitle>Past Sessions History</CardTitle>
            <CardDescription>Completed reviews and steering calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-brand-border/60">
              {pastMeetings.map((meeting) => (
                <div key={meeting.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-white">{meeting.title}</span>
                    <p className="text-slate-400">
                      Conducted on {new Date(meeting.scheduledAt).toLocaleDateString()} by{' '}
                      {meeting.host.name}
                    </p>
                  </div>
                  <Badge variant="success">Completed</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
