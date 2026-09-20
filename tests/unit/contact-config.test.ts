import { describe, it, expect } from 'vitest';
import { CONTACT_CONFIG } from '@/lib/config/contact';

describe('Official DiziBrand Media Contact Configuration Tests', () => {
  it('should have the exact verified primary phone number with valid tel: protocol', () => {
    expect(CONTACT_CONFIG.phone.raw).toBe('+91 8296531599');
    expect(CONTACT_CONFIG.phone.telHref).toBe('tel:+918296531599');
    expect(CONTACT_CONFIG.phone.formatted).toContain('82965');
  });

  it('should have the exact verified official email with mailto: protocol', () => {
    expect(CONTACT_CONFIG.email.primary).toBe('contactus@dizibrandmedia.com');
    expect(CONTACT_CONFIG.email.mailtoHref).toBe('mailto:contactus@dizibrandmedia.com');
    expect(CONTACT_CONFIG.email.support).toBe('contactus@dizibrandmedia.com');
  });

  it('should have the exact official registered office address in Lucknow', () => {
    expect(CONTACT_CONFIG.address.city).toBe('Lucknow');
    expect(CONTACT_CONFIG.address.state).toBe('Uttar Pradesh');
    expect(CONTACT_CONFIG.address.postalCode).toBe('226010');
    expect(CONTACT_CONFIG.address.line1).toContain('5/585');
    expect(CONTACT_CONFIG.address.line2).toContain('Gomtinagar Extension');
    expect(CONTACT_CONFIG.address.country).toBe('India');
    expect(CONTACT_CONFIG.address.fullSingleLine).toContain('Gomtinagar Extension, Lucknow, Uttar Pradesh 226010');
  });

  it('should have valid WhatsApp business integration', () => {
    expect(CONTACT_CONFIG.whatsapp.number).toBe('+91 8296531599');
    expect(CONTACT_CONFIG.whatsapp.rawDigits).toBe('918296531599');
    expect(CONTACT_CONFIG.whatsapp.url).toContain('https://wa.me/918296531599');
  });

  it('should configure social profiles for LinkedIn, Instagram, Facebook, and WhatsApp', () => {
    const platforms = CONTACT_CONFIG.socials.map((s) => s.platform);
    expect(platforms).toContain('linkedin');
    expect(platforms).toContain('instagram');
    expect(platforms).toContain('facebook');
    expect(platforms).toContain('whatsapp');

    CONTACT_CONFIG.socials.forEach((social) => {
      expect(social.url).toBeTruthy();
      expect(social.ariaLabel).toBeTruthy();
    });
  });

  it('should provide operational business hours', () => {
    expect(CONTACT_CONFIG.businessHours.days).toBe('Monday – Saturday');
    expect(CONTACT_CONFIG.businessHours.hours).toContain('9:30 AM');
    expect(CONTACT_CONFIG.businessHours.display).toContain('Mon – Sat');
  });
});
