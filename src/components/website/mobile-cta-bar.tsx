import React from 'react';
import Link from 'next/link';
import { CONTACT_CONFIG } from '@/lib/config/contact';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

export function MobileCTABar() {
  return (
    <aside
      aria-label="Quick Contact Actions"
      className="fixed bottom-0 inset-x-0 z-50 lg:hidden border-t border-brand-border bg-brand-navy-soft/95 backdrop-blur-lg px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        {/* 1. WhatsApp Action */}
        <a
          href={CONTACT_CONFIG.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all active:scale-95 text-center select-none"
          aria-label="Chat with DiziBrand Media on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-[11px] font-semibold leading-tight">WhatsApp</span>
        </a>

        {/* 2. Call Now Action (direct dial +91 8296531599) */}
        <a
          href={CONTACT_CONFIG.phone.telHref}
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-brand-red-orange text-white hover:bg-brand-red-deep transition-all active:scale-95 shadow-[0_0_15px_rgba(255,75,62,0.3)] text-center select-none"
          aria-label={`Call DiziBrand Media at ${CONTACT_CONFIG.phone.formatted}`}
        >
          <Phone className="w-4 h-4" />
          <span className="text-[11px] font-bold leading-tight">Call Now</span>
        </a>

        {/* 3. Strategy Call Booking */}
        <Link
          href="/book-consultation"
          className="flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-brand-surface hover:bg-brand-surfaceHover text-slate-100 border border-brand-border transition-all active:scale-95 text-center select-none"
          aria-label="Book a Growth Strategy Session"
        >
          <Calendar className="w-4 h-4 text-brand-red-orange" />
          <span className="text-[11px] font-semibold leading-tight">Strategy Call</span>
        </Link>
      </div>
    </aside>
  );
}
