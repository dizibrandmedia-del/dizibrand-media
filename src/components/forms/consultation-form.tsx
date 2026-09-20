'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ConsultationSchema, ConsultationData } from '@/lib/validations/lead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Calendar, Clock, AlertCircle } from 'lucide-react';

export function ConsultationForm({ initialType }: { initialType?: string }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ConsultationData>({
    resolver: zodResolver(ConsultationSchema),
    defaultValues: {
      consultationType: (initialType as any) || 'STRATEGY_CALL',
      privacyConsent: false,
    },
  });

  async function onSubmit(data: ConsultationData) {
    setErrorMsg('');
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to book consultation');

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
        <h3 className="text-xl font-bold text-white">Strategy Session Requested</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          We have reserved your preferred consultation slot. Our executive practice lead will confirm the calendar invitation and video link via your email shortly.
        </p>
        <Button variant="secondary" onClick={() => setIsSuccess(false)} size="sm">
          Schedule Another Session
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

      {/* Consultation Type */}
      <Select
        label="Consultation Focus *"
        {...register('consultationType')}
        error={errors.consultationType?.message}
      >
        <option value="STRATEGY_CALL">General Growth & Tech Strategy Call</option>
        <option value="DIGITAL_CMO">Talk to a Digital CMO (Marketing & CAC)</option>
        <option value="DIGITAL_CTO">Talk to a Digital CTO (Cloud, AI & Tech)</option>
        <option value="AI_AUDIT">AI Agent & Automation Evaluation</option>
      </Select>

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Your Full Name *"
          placeholder="e.g. Marcus Vance"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <Input
          label="Business Email *"
          type="email"
          placeholder="marcus@company.com"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      {/* Company & Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Company Name *"
          placeholder="Acme Cloud"
          {...register('company')}
          error={errors.company?.message}
        />
        <Input
          label="Company Website"
          placeholder="https://acme.com"
          {...register('website')}
          error={errors.website?.message}
        />
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Preferred Date *"
          type="date"
          {...register('preferredDate')}
          error={errors.preferredDate?.message}
        />
        <Input
          label="Preferred Time (With Timezone) *"
          placeholder="e.g. 2:00 PM EST or 4:30 PM IST"
          {...register('preferredTime')}
          error={errors.preferredTime?.message}
        />
      </div>

      {/* Notes */}
      <Textarea
        label="Topics or Questions for the Executive Lead"
        placeholder="Briefly state your current growth goals, technology stack, or specific questions..."
        rows={3}
        {...register('notes')}
        error={errors.notes?.message}
      />

      {/* Consent */}
      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          id="consult-privacy"
          {...register('privacyConsent')}
          className="mt-1 h-4 w-4 rounded border-brand-border bg-brand-charcoal text-brand-orange focus:ring-brand-orange"
        />
        <label htmlFor="consult-privacy" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
          I consent to DiziBrand Media contacting me regarding this strategy session.
        </label>
      </div>
      {errors.privacyConsent && (
        <p className="text-xs text-red-400">{errors.privacyConsent.message}</p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full gap-2 mt-4" isLoading={isSubmitting}>
        <Calendar className="w-4 h-4" />
        <span>Confirm Strategy Consultation</span>
      </Button>
    </form>
  );
}
