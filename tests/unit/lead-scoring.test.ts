import { describe, it, expect } from 'vitest';
import { calculateLeadScore, LeadScoreInput } from '@/lib/domain/crm/lead-scoring';
import { BudgetTier } from '@prisma/client';

describe('Lead Scoring Engine Unit Tests', () => {
  it('assigns maximum tier points to high-budget enterprise leads', () => {
    const input: LeadScoreInput = {
      budgetTier: BudgetTier.ABOVE_25000,
      service: 'Digital CTO (Fractional CTO)',
      email: 'alex@enterprise-cloud.io',
      website: 'https://enterprise-cloud.io',
      country: 'United States',
      projectDescription:
        'We need complete fractional CTO leadership and enterprise architecture migration for our microservices cluster across AWS and Google Cloud. We expect high availability, zero downtime, and SOC2 compliance across all 4 regions.',
    };

    const breakdown = calculateLeadScore(input);

    expect(breakdown.budget).toBe(35);
    expect(breakdown.service).toBe(25);
    expect(breakdown.company).toBe(20); // 15 (corporate domain) + 5 (website)
    expect(breakdown.country).toBe(10); // United States is priority
    expect(breakdown.completeness).toBe(7); // > 20 words
    expect(breakdown.total).toBe(97);
  });

  it('assigns lower scores to personal email addresses and small budget tiers', () => {
    const input: LeadScoreInput = {
      budgetTier: BudgetTier.UNDER_2500,
      service: 'General inquiry',
      email: 'john.doe@gmail.com',
      country: 'Unknown',
      projectDescription: 'Quick question.',
    };

    const breakdown = calculateLeadScore(input);

    expect(breakdown.budget).toBe(5);
    expect(breakdown.service).toBe(12);
    expect(breakdown.company).toBe(5); // free email
    expect(breakdown.country).toBe(6);
    expect(breakdown.completeness).toBe(4);
    expect(breakdown.total).toBe(32);
  });

  it('recognizes INR high-budget tiers properly', () => {
    const input: LeadScoreInput = {
      budgetTier: BudgetTier.INR_ABOVE_20L,
      service: 'Autonomous AI Agents',
      email: 'cto@fintech-mumbai.in',
      website: 'https://fintech-mumbai.in',
      country: 'India',
      projectDescription:
        'Deploy autonomous triage agents across customer support and underwriting pipelines for payment workflows.',
    };

    const breakdown = calculateLeadScore(input);

    expect(breakdown.budget).toBe(35);
    expect(breakdown.service).toBe(22); // AI
    expect(breakdown.country).toBe(10); // India is priority
    expect(breakdown.total).toBeGreaterThanOrEqual(80);
  });

  it('clamps the maximum score at 100', () => {
    const input: LeadScoreInput = {
      budgetTier: 'ABOVE_25000',
      service: 'Digital CMO & Digital CTO Transformation',
      email: 'exec@fortune500.com',
      website: 'https://fortune500.com',
      country: 'United Kingdom',
      projectDescription:
        'Word '.repeat(60), // >= 50 words -> 10 pts
    };

    const breakdown = calculateLeadScore(input);

    expect(breakdown.total).toBeLessThanOrEqual(100);
    expect(breakdown.total).toBe(100);
  });
});
