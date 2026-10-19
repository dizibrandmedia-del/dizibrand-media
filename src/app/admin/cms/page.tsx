import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileEdit, ShieldCheck, Layers, BookOpen, MessageSquare, ArrowRight } from 'lucide-react';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminCmsPage() {
  let caseStudiesCount = 0;
  let verifiedCaseStudiesCount = 0;
  let servicesCount = 0;
  let insightsCount = 0;

  try {
    const [csCount, verifiedCount, sCount, bCount] = await Promise.all([
      prisma.caseStudy.count(),
      prisma.caseStudy.count({ where: { isVerified: true } }),
      prisma.service.count(),
      prisma.blogPost.count(),
    ]);
    caseStudiesCount = csCount;
    verifiedCaseStudiesCount = verifiedCount;
    servicesCount = sCount;
    insightsCount = bCount;
  } catch (err) {
    console.error('Failed to fetch CMS counts:', err);
  }

  const sections = [
    {
      title: 'Case Studies & Verification Governance',
      description: 'Enforce zero-fake-proof integrity. Manage client proof, results, and [Pending verification] statuses.',
      href: '/admin/cms/case-studies',
      icon: ShieldCheck,
      badge: `${verifiedCaseStudiesCount}/${caseStudiesCount} Verified`,
      cta: 'Manage Case Studies',
    },
    {
      title: 'Services & Practice Areas',
      description: 'Configure core executive leadership, AI agents, cloud engineering, and growth service offerings.',
      href: '/services',
      icon: Layers,
      badge: `${servicesCount} Active Services`,
      cta: 'View Service Catalog',
    },
    {
      title: 'Portfolio & Technical Architecture',
      description: 'Audit verified client implementations, stack breakdowns, and live project deployments.',
      href: '/portfolio',
      icon: BookOpen,
      badge: '32 Projects Catalogued',
      cta: 'View Portfolio Hub',
    },
    {
      title: 'Client Testimonials Hub',
      description: 'Audit and approve verified client endorsements adhering to non-fabrication standards.',
      href: '/about',
      icon: MessageSquare,
      badge: 'Zero-Fake Policy Active',
      cta: 'View Testimonials Hub',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Content Management System (CMS)</h1>
        <p className="text-sm text-slate-400">
          Executive content governance, service definitions, and strict proof verification across DiziBrand Media.
        </p>
      </div>

      {/* Grid of CMS Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <Card key={sec.title} className="bg-brand-charcoal/80 border-brand-border flex flex-col justify-between">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-orange" />
                  </div>
                  <Badge variant="outline" className="font-mono text-xs text-slate-300">
                    {sec.badge}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg mt-3">{sec.title}</CardTitle>
                <CardDescription className="text-slate-400 text-xs leading-relaxed">
                  {sec.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Link
                  href={sec.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-white transition-colors"
                >
                  {sec.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
