import React from 'react';
import { LeadForm } from '@/components/forms/lead-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Linkedin,
  Instagram,
  Facebook,
} from 'lucide-react';

export const metadata = {
  title: 'Contact & Build Your Team | DiziBrand Media',
  description:
    'Official contact details for DiziBrand Media. Connect via phone, email, WhatsApp, or schedule a strategy consultation. Located in Lucknow, India, serving global clients.',
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { service?: string };
}) {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Top Section: Header & Direct Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Official Contact Directory */}
        <div className="lg:col-span-5 space-y-6">
          <Badge variant="orange" className="font-mono">
            OFFICIAL CONTACT DIRECTORY
          </Badge>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Build Your Growth & Technology Team With Us
          </h1>

          <p className="text-slate-300 text-sm leading-relaxed">
            Connect directly with our practice directors, software architects, and performance growth
            leads. Submit your inquiry below, or contact us through any of our official communication
            channels.
          </p>

          {/* Primary Contact Cards */}
          <div className="space-y-3 pt-2">
            {/* Phone */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-navy-soft/80 flex items-start gap-3.5 hover:border-brand-red-orange transition-colors">
              <div className="w-10 h-10 rounded-lg bg-brand-red-orange/10 border border-brand-red-orange/30 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-brand-red-orange" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Phone (Direct Call & Inquiries)
                </span>
                <div>
                  <a
                    href={CONTACT_CONFIG.phone.telHref}
                    className="text-base font-semibold text-white hover:text-brand-red-orange transition-colors block"
                  >
                    {CONTACT_CONFIG.phone.formatted}
                  </a>
                </div>
                <p className="text-[11px] text-slate-400">Direct telephone line for founders & clients</p>
              </div>
            </div>

            {/* Email */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-navy-soft/80 flex items-start gap-3.5 hover:border-brand-red-orange transition-colors">
              <div className="w-10 h-10 rounded-lg bg-brand-red-orange/10 border border-brand-red-orange/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-brand-red-orange" />
              </div>
              <div className="space-y-0.5">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Official Email
                </span>
                <div>
                  <a
                    href={CONTACT_CONFIG.email.mailtoHref}
                    className="text-base font-semibold text-white hover:text-brand-red-orange transition-colors block break-all"
                  >
                    {CONTACT_CONFIG.email.primary}
                  </a>
                </div>
                <p className="text-[11px] text-slate-400">Response guaranteed within 4 business hours</p>
              </div>
            </div>


            {/* Office Address */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-navy-soft/80 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-brand-red-orange" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Registered Headquarters
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {CONTACT_CONFIG.address.fullSingleLine}
                </p>
                <a
                  href={CONTACT_CONFIG.address.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] text-brand-red-orange hover:underline font-medium pt-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Operational Hours */}
            <div className="p-4 rounded-xl border border-brand-border bg-brand-navy-soft/80 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
              <div className="space-y-0.5 text-xs text-slate-300">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                  Business Hours
                </span>
                <p className="font-semibold text-white">{CONTACT_CONFIG.businessHours.days}</p>
                <p className="text-slate-400">{CONTACT_CONFIG.businessHours.hours}</p>
                <p className="text-[11px] text-slate-500 pt-0.5">{CONTACT_CONFIG.businessHours.weekend}</p>
              </div>
            </div>
          </div>

          {/* Social Channels */}
          <div className="pt-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-2">
              Official Social Profiles
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {CONTACT_CONFIG.socials.map((social) => {
                const iconMap = {
                  linkedin: Linkedin,
                  instagram: Instagram,
                  facebook: Facebook,
                  whatsapp: MessageCircle,
                  twitter: ArrowRight,
                  youtube: ArrowRight,
                };
                const IconComponent = iconMap[social.platform] || ArrowRight;

                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-lg border border-brand-border bg-brand-surface hover:bg-brand-red-orange hover:text-white hover:border-brand-red-orange text-slate-300 transition-all flex items-center justify-center sm:justify-start gap-2 text-xs font-medium w-full"
                    aria-label={social.ariaLabel}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span className="capitalize truncate">{social.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column: Full Lead Form */}
        <div className="lg:col-span-7">
          <Card className="bg-brand-navy-soft border-brand-border shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white">Project Inquiry & Requirement Scope</CardTitle>
              <CardDescription className="text-brand-muted">
                Tell us about your business goals, target timelines, and technical requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LeadForm initialService={searchParams.service} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
