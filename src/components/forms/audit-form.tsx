'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FreeAuditSchema, FreeAuditData } from '@/lib/validations/lead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';

export function AuditForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FreeAuditData>({
    resolver: zodResolver(FreeAuditSchema),
    defaultValues: {
      auditType: 'Website',
      privacyConsent: false,
    },
  });

  async function onSubmit(data: FreeAuditData) {
    setErrorMsg('');
    try {
      const res = await fetch('/api/audits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit audit request');

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong');
    }
  }

  if (isSuccess) {
    return (
      <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">Free Audit Queued</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Our technical and growth specialists will analyze your digital presence and deliver a bespoke PDF teardown report within 2 business days.
        </p>
        <Button variant="secondary" onClick={() => setIsSuccess(false)} size="sm">
          Request Another Audit
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errorMsg && (
        <div className="p-3 rounded-lg border border-red-800 bg-red-950/40 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Audit Type Selection */}
      <Select label="Select Audit Focus *" {...register('auditType')} error={errors.auditType?.message}>
        <option value="Website">Website Performance & Core Web Vitals Audit</option>
        <option value="SEO">Technical SEO & Organic Visibility Audit</option>
        <option value="Conversion">Conversion Rate Optimization (CRO) & UX Audit</option>
        <option value="Ads">Paid Media & Ad Account Efficiency Audit</option>
        <option value="Social">B2B Social & Brand Authority Audit</option>
        <option value="Digital Presence">Comprehensive 360° Digital Presence Audit</option>
      </Select>

      {/* Website URL */}
      <Input
        label="Website or Store URL to Audit *"
        placeholder="https://example.com"
        {...register('websiteUrl')}
        error={errors.websiteUrl?.message}
      />

      {/* Company & Contact Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Company Name *"
          placeholder="Acme Corp"
          {...register('companyName')}
          error={errors.companyName?.message}
        />
        <Input
          label="Your Name *"
          placeholder="e.g. Sarah Jenkins"
          {...register('contactName')}
          error={errors.contactName?.message}
        />
      </div>

      {/* Email & Ad Spend */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Business Email for Report Delivery *"
          type="email"
          placeholder="sarah@acme.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Current Monthly Ad Spend (Optional)"
          placeholder="e.g. $10k/mo or ₹5L/mo"
          {...register('monthlyAdSpend')}
          error={errors.monthlyAdSpend?.message}
        />
      </div>

      {/* Primary Pain Point */}
      <Textarea
        label="Primary Challenge or Goal *"
        placeholder="e.g. Our website conversion rate dropped after re-platforming, or our CAC on Meta ads increased 40%..."
        rows={3}
        {...register('primaryPainPoint')}
        error={errors.primaryPainPoint?.message}
      />

      {/* Consent */}
      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          id="audit-privacy"
          {...register('privacyConsent')}
          className="mt-1 h-4 w-4 rounded border-brand-border bg-brand-charcoal text-brand-orange focus:ring-brand-orange"
        />
        <label htmlFor="audit-privacy" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
          I agree to the <a href="/privacy-policy" className="text-brand-orange underline">Privacy Policy</a> and consent to DiziBrand Media auditing the supplied URL.
        </label>
      </div>
      {errors.privacyConsent && (
        <p className="text-xs text-red-400">{errors.privacyConsent.message}</p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full gap-2 mt-4" isLoading={isSubmitting}>
        <Sparkles className="w-4 h-4" />
        <span>Generate Free Audit Report</span>
      </Button>
    </form>
  );
}
