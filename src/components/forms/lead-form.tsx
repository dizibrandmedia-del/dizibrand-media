'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LeadFormSchema, LeadFormData } from '@/lib/validations/lead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';

const SERVICES = [
  'Marketing',
  'Performance Marketing',
  'Lead Generation',
  'SEO',
  'Website',
  'App Development',
  'Software Development',
  'AI Automation',
  'Data Analytics',
  'CRM / ERP',
  'Digital CMO',
  'Digital CTO',
  'Digital Transformation',
  'Dedicated Team',
  'Other',
];

const BUDGET_OPTIONS = [
  { value: 'UNDER_2500', label: 'Under $2,500' },
  { value: 'TIER_2500_5000', label: '$2,500 – $5,000' },
  { value: 'TIER_5000_10000', label: '$5,000 – $10,000' },
  { value: 'TIER_10000_25000', label: '$10,000 – $25,000' },
  { value: 'ABOVE_25000', label: '$25,000+' },
  { value: 'NOT_SURE', label: 'Not Sure / Needs Discussion' },
  { value: 'INR_UNDER_2L', label: 'India: Under ₹2 Lakhs' },
  { value: 'INR_2L_4L', label: 'India: ₹2L – ₹4L' },
  { value: 'INR_4L_8L', label: 'India: ₹4L – ₹8L' },
  { value: 'INR_8L_20L', label: 'India: ₹8L – ₹20L' },
  { value: 'INR_ABOVE_20L', label: 'India: ₹20L+' },
];

export function LeadForm({ initialService }: { initialService?: string }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      service: (initialService as any) || 'Marketing',
      budgetTier: 'TIER_5000_10000',
      privacyConsent: false,
    },
  });

  async function onSubmit(data: LeadFormData) {
    setSubmitError('');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to submit inquiry.');
      }

      setIsSuccess(true);
      reset();
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    }
  }

  if (isSuccess) {
    return (
      <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center space-y-4">
        <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
        <h3 className="text-xl font-bold text-white">Inquiry Received Successfully</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Thank you for reaching out to DiziBrand Media. Our growth and technology team is reviewing your project requirements and will respond within 4 business hours.
        </p>
        <Button variant="secondary" onClick={() => setIsSuccess(false)} size="sm">
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitError && (
        <div className="p-3 rounded-lg border border-red-800 bg-red-950/40 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{submitError}</span>
        </div>
      )}

      {/* Honeypot anti-spam field */}
      <input type="text" {...register('honeypot')} className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="First Name *"
          placeholder="e.g. Alex"
          {...register('firstName')}
          error={errors.firstName?.message}
        />
        <Input
          label="Last Name *"
          placeholder="e.g. Vance"
          {...register('lastName')}
          error={errors.lastName?.message}
        />
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Business Email *"
          type="email"
          placeholder="alex@company.com"
          {...register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Phone / WhatsApp"
          type="tel"
          placeholder="+1 (555) 000-0000"
          {...register('phone')}
          error={errors.phone?.message}
        />
      </div>

      {/* Company, Country, Website */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Company Name *"
          placeholder="Acme Technologies"
          {...register('companyName')}
          error={errors.companyName?.message}
        />
        <Input
          label="Country *"
          placeholder="e.g. United States, India, UK"
          {...register('country')}
          error={errors.country?.message}
        />
        <Input
          label="Company Website"
          placeholder="https://acme.com"
          {...register('website')}
          error={errors.website?.message}
        />
      </div>

      {/* Service Selection */}
      <Select label="Primary Capability Needed *" {...register('service')} error={errors.service?.message}>
        {SERVICES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </Select>

      {/* Budget & Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select label="Estimated Monthly / Project Budget *" {...register('budgetTier')} error={errors.budgetTier?.message}>
          {BUDGET_OPTIONS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </Select>

        <Input
          label="Desired Timeline"
          placeholder="e.g. Immediate, 1-3 Months"
          {...register('timeline')}
          error={errors.timeline?.message}
        />
      </div>

      {/* Project Description */}
      <Textarea
        label="Project Description & Goals *"
        placeholder="Tell us about your current bottlenecks, target audience, technical requirements, or growth targets..."
        rows={4}
        {...register('projectDescription')}
        error={errors.projectDescription?.message}
      />

      {/* Privacy Consent */}
      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          id="lead-privacy"
          {...register('privacyConsent')}
          className="mt-1 h-4 w-4 rounded border-brand-border bg-brand-charcoal text-brand-orange focus:ring-brand-orange"
        />
        <label htmlFor="lead-privacy" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
          I agree to the <a href="/privacy-policy" className="text-brand-orange underline">Privacy Policy</a> and consent to DiziBrand Media contacting me regarding this inquiry.
        </label>
      </div>
      {errors.privacyConsent && (
        <p className="text-xs text-red-400">{errors.privacyConsent.message}</p>
      )}

      {/* Submit Button */}
      <Button type="submit" variant="primary" size="lg" className="w-full gap-2 mt-4" isLoading={isSubmitting}>
        <Send className="w-4 h-4" />
        <span>Submit Project Inquiry</span>
      </Button>
    </form>
  );
}
