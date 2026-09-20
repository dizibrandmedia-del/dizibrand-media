import React from 'react';
import { Badge } from '@/components/ui/badge';

export const metadata = {
  title: 'Cookie Policy | DiziBrand Media',
  description: 'DiziBrand Media Cookie Policy and transparency disclosure on session and analytics cookies.',
};

export default function CookiePolicyPage() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-slate-300 text-sm leading-relaxed">
      <div className="space-y-3">
        <Badge variant="default" className="font-mono">TRANSPARENCY</Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Cookie Policy</h1>
        <p className="text-xs text-slate-500 font-mono">Last Updated: September 2026</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device to ensure secure authentication, remember your preferences, and track aggregate website performance.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">2. Cookies We Use</h2>
        <p>
          We use strictly necessary session cookies (`__Secure-next-auth.session-token`) to authenticate portal users and protect against cross-site request forgery (CSRF). We also use privacy-focused analytics cookies to monitor page performance and Core Web Vitals.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white">3. Managing Preferences</h2>
        <p>
          You can configure your browser to decline non-essential cookies. However, disabling essential session cookies will prevent login access to the Super Admin, Team, and Client Portals.
        </p>
      </section>
    </div>
  );
}
