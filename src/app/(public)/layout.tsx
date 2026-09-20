import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/ui/logo';
import { MobileCTABar } from '@/components/website/mobile-cta-bar';
import { WhatsAppFloatingButton } from '@/components/website/whatsapp-floating-button';
import { MobileNavigation } from '@/components/website/mobile-navigation';
import { DesktopNavigation } from '@/components/website/desktop-navigation';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import {
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Lock,
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
} from 'lucide-react';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-brand-navy text-slate-100 selection:bg-brand-red-orange/30 selection:text-white pb-16 lg:pb-0">
      {/* 1. Header Utility Bar with Clickable Phone, Email, and Announcement (Hidden on mobile) */}
      <div className="hidden sm:block bg-brand-navy-soft/95 border-b border-brand-border/60 py-2 px-4 text-xs text-slate-300 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Direct Clickable Contact Links */}
          <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
            <a
              href={CONTACT_CONFIG.phone.telHref}
              className="flex items-center gap-1.5 text-white hover:text-brand-red-orange transition-colors font-medium"
              aria-label={`Call DiziBrand Media at ${CONTACT_CONFIG.phone.formatted}`}
            >
              <Phone className="w-3.5 h-3.5 text-brand-red-orange shrink-0" />
              <span>{CONTACT_CONFIG.phone.formatted}</span>
            </a>

            <a
              href={CONTACT_CONFIG.email.mailtoHref}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              aria-label={`Email DiziBrand Media at ${CONTACT_CONFIG.email.primary}`}
            >
              <Mail className="w-3.5 h-3.5 text-brand-red-orange shrink-0" />
              <span className="hidden xs:inline">{CONTACT_CONFIG.email.primary}</span>
              <span className="xs:hidden">Email Us</span>
            </a>
          </div>

          {/* Announcement Banner */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-300">
            <span className="font-mono text-brand-red-orange font-semibold">ANNOUNCING:</span>
            <span>On-demand Fractional Digital CMO & Digital CTO services for scale-ups.</span>
            <Link
              href="/book-consultation"
              className="underline hover:text-white font-medium ml-1 text-brand-red-orange focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-red-orange rounded"
            >
              Explore Leadership →
            </Link>
          </div>

          {/* Location / WhatsApp Badge */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400">
            <a
              href={CONTACT_CONFIG.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
              aria-label="Chat with DiziBrand Media on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
            <span className="text-slate-600">•</span>
            <span>Lucknow • Global Delivery</span>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-brand-border/60 bg-brand-navy/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo with Official High-Resolution Transparent Asset */}
          <Logo variant="header" size="md" />

          {/* Desktop Navigation Links with Interactive Dropdowns */}
          <DesktopNavigation />

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* "Get In Touch" Button (hidden on mobile, visible on sm and up) */}
            <Link href="/contact" className="hidden sm:inline-flex">
              <Button variant="secondary" size="sm" className="font-semibold text-xs px-3.5">
                Get In Touch
              </Button>
            </Link>

            <Link
              href="/admin"
              className="hidden sm:flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2 py-1.5 rounded transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-brand-red-orange" />
              <span>Portal</span>
            </Link>

            <Link href="/book-consultation" className="hidden sm:inline-flex">
              <Button variant="primary" size="sm" className="gap-1.5">
                <span>Strategy Call</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>

            {/* Mobile Navigation Hamburger Menu */}
            <MobileNavigation />
          </div>
        </div>
      </header>

      {/* Main Page Body */}
      <main className="flex-1">{children}</main>

      {/* 4. Global Footer with Complete Official Contact Details & Social Icons */}
      <footer className="border-t border-brand-border bg-brand-navy-soft text-slate-400 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Column 1: Brand & Promise */}
            <div className="lg:col-span-2 space-y-4">
              <Logo variant="footer" size="lg" showTagline={true} />
              <p className="text-xs tracking-wide text-brand-red-orange font-mono font-semibold">
                {CONTACT_CONFIG.description}
              </p>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Your Business Deserves More Than an Agency. Build Your Growth & Technology Team With Us.
              </p>

              {/* Social Links */}
              <div className="pt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                  Connect With Us
                </p>
                <div className="flex items-center gap-3">
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
                        className="w-8 h-8 rounded-lg border border-brand-border bg-brand-surface/60 hover:bg-brand-red-orange hover:text-white hover:border-brand-red-orange text-slate-300 flex items-center justify-center transition-all"
                        aria-label={social.ariaLabel}
                        title={social.label}
                      >
                        <IconComponent className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Column 2: Official Contact & Headquarters */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-white font-mono">
                Official Contact
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 block text-xs uppercase font-mono">Phone</span>
                  <a
                    href={CONTACT_CONFIG.phone.telHref}
                    className="text-white hover:text-brand-red-orange font-medium flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-brand-red-orange shrink-0" />
                    <span>{CONTACT_CONFIG.phone.formatted}</span>
                  </a>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs uppercase font-mono">Email</span>
                  <a
                    href={CONTACT_CONFIG.email.mailtoHref}
                    className="text-white hover:text-brand-red-orange flex items-center gap-1.5 mt-0.5 break-all"
                  >
                    <Mail className="w-3.5 h-3.5 text-brand-red-orange shrink-0" />
                    <span>{CONTACT_CONFIG.email.primary}</span>
                  </a>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs uppercase font-mono">Office Address</span>
                  <p className="text-slate-300 flex items-start gap-1.5 mt-0.5 leading-relaxed">
                    <MapPin className="w-3.5 h-3.5 text-brand-red-orange shrink-0 mt-0.5" />
                    <span>{CONTACT_CONFIG.address.fullSingleLine}</span>
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 block text-xs uppercase font-mono">Hours</span>
                  <p className="text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span>{CONTACT_CONFIG.businessHours.display}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: Capabilities & Leadership */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-slate-200">
                Leadership & Tech
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/digital-cmo" className="hover:text-brand-red-orange">Digital CMO</Link></li>
                <li><Link href="/digital-cto" className="hover:text-brand-red-orange">Digital CTO</Link></li>
                <li><Link href="/services/ai-automation" className="hover:text-brand-red-orange">AI Automation</Link></li>
                <li><Link href="/services/ai-agents" className="hover:text-brand-red-orange">Autonomous AI Agents</Link></li>
                <li><Link href="/services/website-development" className="hover:text-brand-red-orange">Website Development</Link></li>
                <li><Link href="/services/software-development" className="hover:text-brand-red-orange">Software Development</Link></li>
                <li><Link href="/services/saas-development" className="hover:text-brand-red-orange">SaaS Development</Link></li>
              </ul>
            </div>

            {/* Column 4: Platform & Company */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-wider text-slate-200">
                Company & Portals
              </h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="hover:text-brand-red-orange font-medium text-white">Contact Us</Link></li>
                <li><Link href="/about" className="hover:text-brand-red-orange">About Us</Link></li>
                <li><Link href="/our-team" className="hover:text-brand-red-orange">Our Team</Link></li>
                <li><Link href="/work" className="hover:text-brand-red-orange">Case Studies</Link></li>
                <li><Link href="/insights" className="hover:text-brand-red-orange">Insights & Blog</Link></li>
                <li><Link href="/careers" className="hover:text-brand-red-orange">Careers</Link></li>
                <li><Link href="/freelancers" className="hover:text-brand-red-orange text-brand-red-orange font-medium">Freelancer Network</Link></li>
                <li><Link href="/admin" className="hover:text-brand-red-orange text-slate-300">Portal Login</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar & Legal */}
          <div className="border-t border-brand-border/60 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} DiziBrand Media. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-slate-300">Terms of Service</Link>
              <Link href="/cookie-policy" className="hover:text-slate-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. Mobile Sticky Conversion Bar */}
      <MobileCTABar />

      {/* 6. WhatsApp Floating Quick Chat Button */}
      <WhatsAppFloatingButton />
    </div>
  );
}

