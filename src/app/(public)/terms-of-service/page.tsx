import React from 'react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Terms of Service | DiziBrand Media',
  description: 'DiziBrand Media Terms of Service, platform usage rules, and commercial engagement terms.',
};

export default function TermsOfServicePage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-3">
        <Badge variant="default" className="font-mono">LEGAL TERMS</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Service</h1>
        <p className="text-xs text-slate-500 font-mono">Last Updated: September 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
        <p>
          By accessing the DiziBrand Media website or our authenticated portals (Super Admin, Team, Client), you agree to be bound by these Terms of Service and all applicable commercial contracts (Master Services Agreements and Statements of Work).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Commercial Engagements & Portals</h2>
        <p>
          Client engagements, deliverable milestones, and payment obligations are governed by executed Statements of Work (SOWs). Access to the Client Portal is granted exclusively to authorized stakeholders representing the contracted client organization.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Intellectual Property</h2>
        <p>
          Unless otherwise agreed in an executed SOW, all custom code, assets, and deliverables created for a client are assigned to the client upon receipt of full payment. DiziBrand Media retains ownership of its proprietary frameworks, internal tooling, and reusable code libraries.
        </p>
      </section>
    </div>
  );
}
