import { BudgetTier } from '@prisma/client';

export interface LeadScoreInput {
  budgetTier: BudgetTier | string;
  service?: string | null;
  email: string;
  companyName?: string | null;
  website?: string | null;
  country?: string | null;
  projectDescription?: string | null;
}

export interface ScoreBreakdown {
  budget: number;
  service: number;
  company: number;
  country: number;
  completeness: number;
  total: number;
}

const FREE_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'outlook.com',
  'aol.com',
  'icloud.com',
  'proton.me',
  'protonmail.com',
  'mail.com',
  'zoho.com',
]);

const PRIORITY_COUNTRIES = new Set([
  'united states',
  'usa',
  'us',
  'united kingdom',
  'uk',
  'canada',
  'australia',
  'united arab emirates',
  'uae',
  'singapore',
  'germany',
  'india',
]);

export function calculateLeadScore(input: LeadScoreInput): ScoreBreakdown {
  let budgetScore = 5;
  let serviceScore = 12;
  let companyScore = 0;
  let countryScore = 4;
  let completenessScore = 5;

  // 1. Budget scoring (Max 35 pts)
  switch (input.budgetTier) {
    case 'ABOVE_25000':
    case 'INR_ABOVE_20L':
      budgetScore = 35;
      break;
    case 'TIER_10000_25000':
    case 'INR_8L_20L':
      budgetScore = 28;
      break;
    case 'TIER_5000_10000':
    case 'INR_4L_8L':
      budgetScore = 20;
      break;
    case 'TIER_2500_5000':
    case 'INR_2L_4L':
      budgetScore = 12;
      break;
    case 'NOT_SURE':
      budgetScore = 8;
      break;
    case 'UNDER_2500':
    case 'INR_UNDER_2L':
    default:
      budgetScore = 5;
      break;
  }

  // 2. Service Alignment (Max 25 pts)
  const service = (input.service || '').toLowerCase();
  if (
    service.includes('cmo') ||
    service.includes('cto') ||
    service.includes('dedicated') ||
    service.includes('transformation')
  ) {
    serviceScore = 25;
  } else if (
    service.includes('software') ||
    service.includes('app') ||
    service.includes('saas') ||
    service.includes('ai')
  ) {
    serviceScore = 22;
  } else if (
    service.includes('performance') ||
    service.includes('crm') ||
    service.includes('data') ||
    service.includes('analytics')
  ) {
    serviceScore = 18;
  } else {
    serviceScore = 12;
  }

  // 3. Company & Domain Profile (Max 20 pts)
  const emailDomain = input.email.split('@')[1]?.toLowerCase() || '';
  const isCorporateDomain = emailDomain && !FREE_EMAIL_DOMAINS.has(emailDomain);

  if (isCorporateDomain) {
    companyScore += 15;
  } else {
    companyScore += 5;
  }

  if (input.website && input.website.length > 5) {
    companyScore += 5;
  }

  // 4. Geography / Market Tier (Max 10 pts)
  const country = (input.country || '').trim().toLowerCase();
  if (PRIORITY_COUNTRIES.has(country)) {
    countryScore = 10;
  } else if (country.length > 0) {
    countryScore = 6;
  }

  // 5. Form Completeness & Project Depth (Max 10 pts)
  const descWords = (input.projectDescription || '').trim().split(/\s+/).filter(Boolean).length;
  if (descWords >= 50) {
    completenessScore = 10;
  } else if (descWords >= 20) {
    completenessScore = 7;
  } else {
    completenessScore = 4;
  }

  const total = Math.min(100, budgetScore + serviceScore + companyScore + countryScore + completenessScore);

  return {
    budget: budgetScore,
    service: serviceScore,
    company: companyScore,
    country: countryScore,
    completeness: completenessScore,
    total,
  };
}
