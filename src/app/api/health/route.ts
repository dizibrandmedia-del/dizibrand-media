import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const startTime = Date.now();
  let dbStatus = 'disconnected';

  try {
    // Perform low-overhead database health check
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch (err: any) {
    console.error('Health check database error:', err);
    dbStatus = 'unreachable';
  }

  const responseTimeMs = Date.now() - startTime;
  const isHealthy = dbStatus === 'connected';

  const healthPayload = {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    responseTimeMs,
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    services: {
      database: dbStatus,
      webApp: 'operational',
    },
  };

  return NextResponse.json(healthPayload, {
    status: isHealthy ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}
