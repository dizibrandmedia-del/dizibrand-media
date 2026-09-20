import fs from 'fs';
import path from 'path';

export interface StoredLead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  country: string;
  companyName: string;
  website?: string | null;
  serviceName?: string | null;
  projectDescription?: string | null;
  budgetTier: string;
  timeline?: string | null;
  status: string;
  score: number;
  scoreBreakdown?: any;
  source?: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: { id: string; name: string; email: string; role?: string } | null;
  _count?: { notes: number; calls: number; meetings: number };
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// In-memory cache for ultra-fast access
let inMemoryLeads: StoredLead[] | null = null;

function ensureDataDirectory(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    console.warn('Could not create data directory:', err);
  }
}

function loadLeadsFromFile(): StoredLead[] {
  if (inMemoryLeads !== null) {
    return inMemoryLeads;
  }

  ensureDataDirectory();

  try {
    if (fs.existsSync(LEADS_FILE)) {
      const content = fs.readFileSync(LEADS_FILE, 'utf-8');
      inMemoryLeads = JSON.parse(content);
      return inMemoryLeads || [];
    }
  } catch (err) {
    console.warn('Failed to read leads from file:', err);
  }

  // Initial seed leads for demonstration if file does not exist
  inMemoryLeads = [
    {
      id: 'lead-seed-1',
      firstName: 'Rajesh',
      lastName: 'Sharma',
      email: 'rajesh.sharma@zenithcloud.io',
      phone: '+91 98765 43210',
      country: 'India',
      companyName: 'Zenith Cloud Technologies',
      website: 'https://zenithcloud.io',
      serviceName: 'Autonomous AI Agents',
      projectDescription: 'Enterprise AI agent architecture for customer service workflow automation with LLMs.',
      budgetTier: 'TIER_10000_25000',
      timeline: '1-3 months',
      status: 'NEW',
      score: 85,
      source: 'contact_form',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      assignedTo: { id: 'demo-user-sales', name: 'Sarah Connor', email: 'sales@dizibrandmedia.com', role: 'SALES' },
      _count: { notes: 1, calls: 0, meetings: 0 },
    },
    {
      id: 'lead-seed-2',
      firstName: 'Michael',
      lastName: 'Harrison',
      email: 'm.harrison@apexgrowth.co',
      phone: '+1 415 890 1234',
      country: 'United States',
      companyName: 'Apex Growth Ventures',
      website: 'https://apexgrowth.co',
      serviceName: 'Enterprise Website Development',
      projectDescription: 'High-conversion Next.js 14 corporate website overhaul with headless Sanity CMS and localized routing.',
      budgetTier: 'ABOVE_25000',
      timeline: 'Immediate',
      status: 'CONTACTED',
      score: 92,
      source: 'contact_form',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      assignedTo: { id: 'demo-user-sales', name: 'Sarah Connor', email: 'sales@dizibrandmedia.com', role: 'SALES' },
      _count: { notes: 2, calls: 1, meetings: 0 },
    },
    {
      id: 'lead-seed-3',
      firstName: 'Aarav',
      lastName: 'Patel',
      email: 'aarav@urbanlux.in',
      phone: '+91 99887 76655',
      country: 'India',
      companyName: 'UrbanLux Properties',
      website: 'https://urbanlux.in',
      serviceName: 'Performance Marketing & Paid Acquisition',
      projectDescription: 'Meta & Google Ads programmatic buyer acquisition campaigns for premium luxury apartments in Bangalore.',
      budgetTier: 'INR_10L_20L',
      timeline: '2 weeks',
      status: 'QUALIFIED',
      score: 78,
      source: 'free_audit',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      assignedTo: { id: 'demo-user-director', name: 'David Vance', email: 'director@dizibrandmedia.com', role: 'MANAGEMENT' },
      _count: { notes: 0, calls: 0, meetings: 1 },
    },
  ];

  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(inMemoryLeads, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to write initial seed leads:', err);
  }

  return inMemoryLeads;
}

function persistLeads(leads: StoredLead[]): void {
  inMemoryLeads = leads;
  ensureDataDirectory();
  try {
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to persist leads to disk:', err);
  }
}

export function saveLeadToStore(leadInput: Partial<StoredLead> & { email: string }): StoredLead {
  const leads = loadLeadsFromFile();
  const now = new Date().toISOString();

  const newLead: StoredLead = {
    id: leadInput.id || `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    firstName: leadInput.firstName || 'Anonymous',
    lastName: leadInput.lastName || '',
    email: leadInput.email.toLowerCase().trim(),
    phone: leadInput.phone || null,
    country: leadInput.country || 'India',
    companyName: leadInput.companyName || 'Not Specified',
    website: leadInput.website || null,
    serviceName: leadInput.serviceName || 'General Inquiry',
    projectDescription: leadInput.projectDescription || '',
    budgetTier: leadInput.budgetTier || 'TIER_5000_10000',
    timeline: leadInput.timeline || null,
    status: leadInput.status || 'NEW',
    score: leadInput.score ?? 70,
    scoreBreakdown: leadInput.scoreBreakdown || null,
    source: leadInput.source || 'website_form',
    createdAt: leadInput.createdAt || now,
    updatedAt: now,
    assignedTo: leadInput.assignedTo || {
      id: 'demo-user-sales',
      name: 'Sarah Connor',
      email: 'sales@dizibrandmedia.com',
      role: 'SALES',
    },
    _count: { notes: 0, calls: 0, meetings: 0 },
  };

  // Prepend so the newest lead is at the top of the CRM
  const updatedLeads = [newLead, ...leads.filter((l) => l.id !== newLead.id)];
  persistLeads(updatedLeads);

  return newLead;
}

export function getLeadsFromStore(options?: {
  search?: string;
  status?: string;
  country?: string;
  service?: string;
  page?: number;
  limit?: number;
}): { leads: StoredLead[]; total: number } {
  let leads = [...loadLeadsFromFile()];

  if (options?.search) {
    const s = options.search.toLowerCase();
    leads = leads.filter(
      (l) =>
        l.firstName.toLowerCase().includes(s) ||
        l.lastName.toLowerCase().includes(s) ||
        l.email.toLowerCase().includes(s) ||
        l.companyName.toLowerCase().includes(s) ||
        (l.serviceName && l.serviceName.toLowerCase().includes(s))
    );
  }

  if (options?.status) {
    leads = leads.filter((l) => l.status === options.status);
  }

  if (options?.country) {
    leads = leads.filter((l) => l.country.toLowerCase().includes(options.country!.toLowerCase()));
  }

  if (options?.service) {
    leads = leads.filter(
      (l) => l.serviceName && l.serviceName.toLowerCase().includes(options.service!.toLowerCase())
    );
  }

  const total = leads.length;
  const page = options?.page || 1;
  const limit = options?.limit || 25;
  const start = (page - 1) * limit;
  const paginatedLeads = leads.slice(start, start + limit);

  return { leads: paginatedLeads, total };
}

export function getLeadByIdFromStore(id: string): StoredLead | null {
  const leads = loadLeadsFromFile();
  return leads.find((l) => l.id === id) || null;
}

export function updateLeadInStore(id: string, updates: Partial<StoredLead>): StoredLead | null {
  const leads = loadLeadsFromFile();
  const index = leads.findIndex((l) => l.id === id);
  if (index === -1) return null;

  leads[index] = {
    ...leads[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  persistLeads(leads);
  return leads[index];
}
