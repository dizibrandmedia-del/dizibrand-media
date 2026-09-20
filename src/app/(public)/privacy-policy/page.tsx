import React from 'react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Privacy Policy | DiziBrand Media',
  description: 'DiziBrand Media Privacy Policy, data processing disclosures, and compliance with GDPR, CCPA, and DPDP Act 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-3">
        <Badge variant="default" className="font-mono">LEGAL COMPLIANCE</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500 font-mono">Last Updated: September 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
        <p>
          DiziBrand Media collects business contact information provided directly through our website lead forms, free audit requests, consultation booking flows, and portal user accounts. This includes: Full Name, Business Email Address, Phone Number, Company Name, Website URL, Country, Project Requirements, and Estimated Budget.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. How We Use Your Information</h2>
        <p>
          We use the information collected strictly to evaluate business fit, respond to inquiries, schedule strategic consultations, execute client contracts, process invoices, and provide access to the Client and Team Portals. We never sell, rent, or lease personal or corporate data to third parties.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Data Security & Storage</h2>
        <p>
          All data is transmitted via HTTPS with TLS 1.3 encryption and stored in secure PostgreSQL databases with strict multi-tenant access controls. Authentication credentials are cryptographically hashed using industry-standard algorithms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">4. Your Rights (GDPR, CCPA & DPDP Act)</h2>
        <p>
          You have the right to request access to, rectification of, or deletion of your personal data stored in our systems. To exercise these rights, please contact privacy@dizibrandmedia.com.
        </p>
      </section>
    </div>
  );
}
