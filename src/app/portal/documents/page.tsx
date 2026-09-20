import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import { assertClientTenant } from '@/lib/auth/rbac';
import { prisma } from '@/lib/db/prisma';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  ExternalLink,
  DollarSign,
  FileCheck,
} from 'lucide-react';

export default async function ClientDocumentsPage() {
  const session = await getServerSession(authOptions);
  let companyId = '';

  try {
    companyId = assertClientTenant(session);
  } catch {}

  if (!companyId) {
    const firstCompany = await prisma.company.findFirst({ select: { id: true } });
    companyId = firstCompany?.id || '';
  }

  const [contracts, proposals, files] = await Promise.all([
    companyId
      ? prisma.contract.findMany({
          where: { companyId },
          orderBy: { effectiveDate: 'desc' },
          include: {
            proposal: { select: { id: true, title: true, proposalNumber: true } },
          },
        })
      : [],
    companyId
      ? prisma.proposal.findMany({
          where: { companyId },
          orderBy: { createdAt: 'desc' },
          include: {
            createdBy: { select: { id: true, name: true, email: true } },
          },
        })
      : [],
    companyId
      ? prisma.fileAttachment.findMany({
          where: { companyId },
          orderBy: { createdAt: 'desc' },
          include: {
            uploadedBy: { select: { id: true, name: true } },
            project: { select: { id: true, name: true } },
          },
        })
      : [],
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Documents & Contracts</h1>
        <p className="text-sm text-slate-400">
          Executed Master Services Agreements (MSAs), Statements of Work (SOWs), and formal proposals.
        </p>
      </div>

      {/* Contracts Section */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Legal Contracts & MSAs</CardTitle>
              <CardDescription>Binding agreements and executed legal documents</CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {contracts.length} Contract{contracts.length === 1 ? '' : 's'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {contracts.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">
              No formal contracts generated yet.
            </p>
          ) : (
            <div className="space-y-3">
              {contracts.map((contract) => {
                const isExecuted = contract.status === 'EXECUTED';

                return (
                  <div
                    key={contract.id}
                    className="p-4 rounded-xl border border-brand-border bg-brand-surface/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-lg bg-brand-surface border border-brand-border text-brand-orange mt-0.5">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-brand-orange">
                            {contract.contractNumber}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{contract.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Effective:{' '}
                          <span className="text-slate-200">
                            {new Date(contract.effectiveDate).toLocaleDateString()}
                          </span>
                          {contract.signedDate && (
                            <>
                              {' '}
                              • Signed:{' '}
                              <span className="text-slate-200">
                                {new Date(contract.signedDate).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          isExecuted
                            ? 'success'
                            : contract.status === 'SENT_FOR_SIGNATURE'
                            ? 'warning'
                            : 'outline'
                        }
                      >
                        {contract.status.replace(/_/g, ' ')}
                      </Badge>
                      {contract.documentUrl && (
                        <a
                          href={contract.documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-lg border border-brand-border hover:border-brand-orange text-white flex items-center gap-1.5 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-brand-orange" />
                          Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Proposals Section */}
      <Card className="bg-brand-charcoal/80 border-brand-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Commercial Proposals & SOWs</CardTitle>
              <CardDescription>
                Detailed scope specifications, pricing tiers, and engagement models
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-xs">
              {proposals.length} Proposal{proposals.length === 1 ? '' : 's'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {proposals.length === 0 ? (
            <p className="text-sm text-slate-400 py-4 text-center">
              No proposals recorded for your organization.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {proposals.map((prop) => {
                const isAccepted = prop.status === 'ACCEPTED';

                return (
                  <div
                    key={prop.id}
                    className="p-4 rounded-xl border border-brand-border bg-brand-surface/20 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-brand-orange">
                          {prop.proposalNumber}
                        </span>
                        <Badge
                          variant={
                            isAccepted
                              ? 'success'
                              : prop.status === 'SENT'
                              ? 'warning'
                              : 'outline'
                          }
                        >
                          {prop.status}
                        </Badge>
                      </div>
                      <h4 className="text-sm font-semibold text-white">{prop.title}</h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {prop.scopeOverview}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-brand-border/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-slate-500 block">Total Commercial</span>
                        <span className="font-bold text-white">
                          {prop.currency} {Number(prop.totalAmount).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 block">Valid Until</span>
                        <span className="text-slate-300">
                          {new Date(prop.validUntil).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
