import { describe, it, expect, vi } from 'vitest';
import { GET } from '@/app/api/health/route';
import { prisma } from '@/lib/db/prisma';

describe('Health Check API Endpoint Tests', () => {
  it('returns HTTP 200 and healthy status when database is reachable', async () => {
    // Mock prisma queryRaw to succeed
    vi.spyOn(prisma, '$queryRaw').mockResolvedValueOnce([{ '?column?': 1 }] as any);

    const response = await GET();
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.status).toBe('healthy');
    expect(body.services.database).toBe('connected');
    expect(body.services.webApp).toBe('operational');
    expect(body.uptimeSeconds).toBeGreaterThanOrEqual(0);
    expect(body.version).toBe('1.0.0');
  });

  it('returns HTTP 503 and degraded status when database is unreachable', async () => {
    // Mock prisma queryRaw to reject
    vi.spyOn(prisma, '$queryRaw').mockRejectedValueOnce(new Error('Connection timeout'));

    const response = await GET();
    expect(response.status).toBe(503);

    const body = await response.json();
    expect(body.status).toBe('degraded');
    expect(body.services.database).toBe('unreachable');
  });
});
