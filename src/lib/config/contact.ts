/**
 * Official DiziBrand Media Contact Configuration
 * Single Source of Truth for all contact, address, and communication channels.
 */

export interface SocialLink {
  platform: 'facebook' | 'instagram' | 'whatsapp' | 'linkedin' | 'twitter' | 'youtube';
  label: string;
  url: string;
  ariaLabel: string;
}

export const CONTACT_CONFIG = {
  brandName: 'DiziBrand Media',
  legalName: 'DiziBrand Media Private Limited',
  tagline: 'Your Growth Partner',
  description: 'Marketing • Technology • AI • Data • Leadership',

  // Primary Direct Contacts
  phone: {
    raw: '+91 8296531599',
    formatted: '+91 82965 31599',
    telHref: 'tel:+918296531599',
    countryCode: '+91',
    display: '+91 82965 31599',
  },

  email: {
    primary: 'contactus@dizibrandmedia.com',
    support: 'contactus@dizibrandmedia.com',
    careers: 'careers@dizibrandmedia.com',
    mailtoHref: 'mailto:contactus@dizibrandmedia.com',
  },

  // Physical Office Address
  address: {
    line1: '2nd Floor, 5/585',
    line2: 'Sector-5, Gomtinagar Extension',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    postalCode: '226010',
    country: 'India',
    fullSingleLine:
      '2nd Floor, 5/585, Sector-5, Gomtinagar Extension, Lucknow, Uttar Pradesh 226010, India',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=2nd+Floor,+5/585,+Sector-5,+Gomtinagar+Extension,+Lucknow,+Uttar+Pradesh+226010,+India',
  },

  // Business Operational Hours
  businessHours: {
    days: 'Monday – Saturday',
    hours: '9:30 AM – 6:30 PM IST',
    weekend: 'Sunday: Closed (Emergency Client On-Call Only)',
    display: 'Mon – Sat: 9:30 AM – 6:30 PM IST',
    responseTime: 'Within 4 business hours',
  },

  // WhatsApp Business Direct Link
  whatsapp: {
    number: '+91 8296531599',
    rawDigits: '918296531599',
    url: 'https://wa.me/918296531599?text=Hello%20DiziBrand%20Media%2C%20I%20would%20like%20to%20discuss%20a%20project.',
    actionLabel: 'Chat on WhatsApp',
  },

  // Social Media Presence
  socials: [
    {
      platform: 'linkedin',
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/company/dizibrandmedia',
      ariaLabel: 'Follow DiziBrand Media on LinkedIn',
    },
    {
      platform: 'instagram',
      label: 'Instagram',
      url: 'https://www.instagram.com/dizibrandmedia',
      ariaLabel: 'Follow DiziBrand Media on Instagram',
    },
    {
      platform: 'facebook',
      label: 'Facebook',
      url: 'https://www.facebook.com/dizibrandmedia',
      ariaLabel: 'Follow DiziBrand Media on Facebook',
    },
    {
      platform: 'whatsapp',
      label: 'WhatsApp',
      url: 'https://wa.me/918296531599?text=Hello%20DiziBrand%20Media%2C%20I%20would%20like%20to%20discuss%20a%20project.',
      ariaLabel: 'Chat with DiziBrand Media on WhatsApp',
    },
  ] as SocialLink[],
} as const;
