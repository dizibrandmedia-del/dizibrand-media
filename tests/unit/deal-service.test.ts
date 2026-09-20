import { describe, it, expect, vi } from 'vitest';
import { estimateBudgetAmount } from '@/lib/domain/crm/deal-service';
import { BudgetTier } from '@prisma/client';

describe('Deal Service & Onboarding Logic Unit Tests', () => {
  describe('estimateBudgetAmount', () => {
    it('accurately estimates USD enterprise tiers', () => {
      expect(estimateBudgetAmount(BudgetTier.ABOVE_25000)).toBe(35000);
      expect(estimateBudgetAmount(BudgetTier.TIER_10000_25000)).toBe(18000);
      expect(estimateBudgetAmount(BudgetTier.TIER_5000_10000)).toBe(7500);
      expect(estimateBudgetAmount(BudgetTier.TIER_2500_5000)).toBe(3500);
      expect(estimateBudgetAmount(BudgetTier.UNDER_2500)).toBe(2500);
      expect(estimateBudgetAmount(BudgetTier.NOT_SURE)).toBe(2500);
    });

    it('accurately estimates INR tiers', () => {
      expect(estimateBudgetAmount(BudgetTier.INR_ABOVE_20L)).toBe(25000);
      expect(estimateBudgetAmount(BudgetTier.INR_8L_20L)).toBe(15000);
      expect(estimateBudgetAmount(BudgetTier.INR_4L_8L)).toBe(6000);
      expect(estimateBudgetAmount(BudgetTier.INR_2L_4L)).toBe(3000);
      expect(estimateBudgetAmount(BudgetTier.INR_UNDER_2L)).toBe(2500);
    });
  });

  describe('Deposit Calculation Rule', () => {
    it('calculates standard 40% initial deposit accurately', () => {
      const budget = estimateBudgetAmount(BudgetTier.ABOVE_25000); // 35000
      const deposit = Math.round(budget * 0.4);
      expect(deposit).toBe(14000);
    });

    it('calculates standard 40% deposit for mid-tier engagement', () => {
      const budget = estimateBudgetAmount(BudgetTier.TIER_10000_25000); // 18000
      const deposit = Math.round(budget * 0.4);
      expect(deposit).toBe(7200);
    });
  });
});
