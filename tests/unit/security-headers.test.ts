import { describe, it, expect } from 'vitest';
import nextConfig from '@/../next.config.mjs';

describe('Security Headers Configuration Tests', () => {
  it('disables the powered-by header to prevent server fingerprinting', () => {
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it('enforces React strict mode for robust rendering', () => {
    expect(nextConfig.reactStrictMode).toBe(true);
  });

  it('configures mandatory OWASP security headers for all routes', async () => {
    const headersFn = nextConfig.headers;
    expect(headersFn).toBeDefined();
    const headersConfig = await headersFn!();
    expect(headersConfig).toBeDefined();
    expect(headersConfig.length).toBeGreaterThan(0);

    const globalHeaders = headersConfig.find((h: any) => h.source === '/(.*)');
    expect(globalHeaders).toBeDefined();

    const headerMap = new Map<string, string>();
    for (const h of globalHeaders!.headers) {
      headerMap.set(h.key, h.value);
    }

    // 1. Strict Transport Security (HSTS)
    expect(headerMap.get('Strict-Transport-Security')).toContain('max-age=63072000');
    expect(headerMap.get('Strict-Transport-Security')).toContain('includeSubDomains');
    expect(headerMap.get('Strict-Transport-Security')).toContain('preload');

    // 2. Clickjacking prevention
    expect(headerMap.get('X-Frame-Options')).toBe('DENY');

    // 3. MIME type sniffing prevention
    expect(headerMap.get('X-Content-Type-Options')).toBe('nosniff');

    // 4. Referrer policy
    expect(headerMap.get('Referrer-Policy')).toBe('origin-when-cross-origin');

    // 5. Cross-Site Scripting (XSS) filter
    expect(headerMap.get('X-XSS-Protection')).toBe('1; mode=block');
  });
});
