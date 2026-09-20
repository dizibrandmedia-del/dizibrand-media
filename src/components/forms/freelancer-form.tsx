'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FreelancerApplicationSchema, FreelancerApplicationData } from '@/lib/validations/lead';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CheckCircle2, AlertCircle, Briefcase } from 'lucide-react';

export function FreelancerForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FreelancerApplicationData>({
    resolver: zodResolver(FreelancerApplicationSchema),
    defaultValues: {
      primarySpecialty: 'Full-Stack Next.js / TypeScript',
      experienceYears: 4,
      privacyConsent: false,
    },
  });

  async function onSubmit(data: FreelancerApplicationData) {
    setErrorMsg('');
    try {
      const res = await fetch('/api/freelancers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to submit application');

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
        <h3 className="text-xl font-bold text-white">Application Received</h3>
        <p className="text-sm text-slate-300 max-w-md mx-auto">
          Thank you for applying to the DiziBrand Media Freelancer Network. Our practice leads review all portfolios and will contact shortlisted specialists for an initial technical screening.
        </p>
        <Button variant="secondary" onClick={() => setIsSuccess(false)} size="sm">
          Submit Another Application
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

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full Legal Name *"
          placeholder="e.g. Sofia Chen"
          {...register('fullName')}
          error={errors.fullName?.message}
        />
        <Input
          label="Email Address *"
          type="email"
          placeholder="sofia@chen.design"
          {...register('email')}
          error={errors.email?.message}
        />
      </div>

      {/* Specialty & Years of Experience */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select label="Primary Domain Specialty *" {...register('primarySpecialty')} error={errors.primarySpecialty?.message}>
          <option value="Full-Stack Next.js / TypeScript">Full-Stack Next.js / TypeScript</option>
          <option value="AI / LLM Agent Engineering">AI / LLM Agent Engineering</option>
          <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
          <option value="UI/UX & Design Systems">UI/UX & Design Systems (Figma)</option>
          <option value="Motion & 3D Interactive Design">Motion & 3D Interactive Design</option>
          <option value="Performance Marketing & Paid Ads">Performance Marketing & Paid Ads</option>
          <option value="Technical SEO & Content Ops">Technical SEO & Content Ops</option>
          <option value="Data Pipelines & BI Modeling">Data Pipelines & BI Modeling</option>
        </Select>

        <Input
          label="Years of Professional Experience *"
          type="number"
          min={1}
          max={40}
          {...register('experienceYears')}
          error={errors.experienceYears?.message}
        />
      </div>

      {/* Portfolio URL & Rate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Portfolio / GitHub / Dribbble URL *"
          placeholder="https://github.com/username or https://portfolio.com"
          {...register('portfolioUrl')}
          error={errors.portfolioUrl?.message}
        />
        <Input
          label="Desired Hourly Rate (USD / INR) *"
          placeholder="e.g. $75/hr or ₹4,000/hr"
          {...register('desiredHourlyRate')}
          error={errors.desiredHourlyRate?.message}
        />
      </div>

      {/* Resume / CV Link */}
      <Input
        label="Resume / CV Public Link (Optional)"
        placeholder="https://drive.google.com/... or https://linkedin.com/in/..."
        {...register('resumeUrl')}
        error={errors.resumeUrl?.message}
      />

      {/* Consent */}
      <div className="flex items-start gap-2 pt-2">
        <input
          type="checkbox"
          id="freelancer-privacy"
          {...register('privacyConsent')}
          className="mt-1 h-4 w-4 rounded border-brand-border bg-brand-charcoal text-brand-orange focus:ring-brand-orange"
        />
        <label htmlFor="freelancer-privacy" className="text-xs text-slate-400 leading-relaxed cursor-pointer">
          I confirm that all portfolio work submitted is my own and agree to DiziBrand Media&apos;s data handling policy.
        </label>
      </div>
      {errors.privacyConsent && (
        <p className="text-xs text-red-400">{errors.privacyConsent.message}</p>
      )}

      <Button type="submit" variant="primary" size="lg" className="w-full gap-2 mt-4" isLoading={isSubmitting}>
        <Briefcase className="w-4 h-4" />
        <span>Submit Freelancer Application</span>
      </Button>
    </form>
  );
}
