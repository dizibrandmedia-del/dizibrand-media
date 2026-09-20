import { z } from 'zod';

export const BudgetTierEnum = z.enum([
  'UNDER_2500',
  'TIER_2500_5000',
  'TIER_5000_10000',
  'TIER_10000_25000',
  'ABOVE_25000',
  'NOT_SURE',
  'INR_UNDER_2L',
  'INR_2L_4L',
  'INR_4L_8L',
  'INR_8L_20L',
  'INR_ABOVE_20L',
]);

export const ServiceChoiceEnum = z.enum([
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
]);

export const LeadFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Please enter a valid business email address'),
  phone: z.string().min(6, 'Please enter a valid phone number').max(30).optional().or(z.literal('')),
  country: z.string().min(2, 'Country is required'),
  companyName: z.string().min(1, 'Company name is required').max(150),
  website: z.string().url('Please enter a valid URL (e.g. https://example.com)').optional().or(z.literal('')),
  service: ServiceChoiceEnum,
  projectDescription: z.string().min(10, 'Please provide at least 10 characters describing your project or goals').max(3000),
  budgetTier: BudgetTierEnum,
  timeline: z.string().optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the privacy policy to submit.',
  }),
  honeypot: z.string().max(0, 'Spam detected').optional(),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;

export const ConsultationSchema = z.object({
  consultationType: z.enum(['STRATEGY_CALL', 'DIGITAL_CMO', 'DIGITAL_CTO', 'AI_AUDIT']),
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid business email is required'),
  company: z.string().min(1, 'Company is required'),
  website: z.string().url('Valid URL required').optional().or(z.literal('')),
  preferredDate: z.string().min(1, 'Preferred date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  notes: z.string().max(1000).optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Privacy consent is required',
  }),
});

export type ConsultationData = z.infer<typeof ConsultationSchema>;

export const AuditTypeEnum = z.enum([
  'Website',
  'SEO',
  'Social',
  'Ads',
  'Conversion',
  'Digital Presence',
]);

export const FreeAuditSchema = z.object({
  auditType: AuditTypeEnum,
  websiteUrl: z.string().url('Please enter a valid website URL'),
  companyName: z.string().min(1, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Valid business email is required'),
  monthlyAdSpend: z.string().optional(),
  primaryPainPoint: z.string().min(5, 'Please describe your primary challenge').max(1000),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Privacy consent is required',
  }),
});

export type FreeAuditData = z.infer<typeof FreeAuditSchema>;

export const FreelancerApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  primarySpecialty: z.string().min(2, 'Specialty is required'),
  experienceYears: z.coerce.number().min(1, 'Years of experience must be at least 1').max(50),
  portfolioUrl: z.string().url('Valid portfolio URL is required'),
  desiredHourlyRate: z.string().min(1, 'Desired rate is required'),
  resumeUrl: z.string().url('Valid resume URL is required').optional().or(z.literal('')),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Privacy consent is required',
  }),
});

export type FreelancerApplicationData = z.infer<typeof FreelancerApplicationSchema>;
