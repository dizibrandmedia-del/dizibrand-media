export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  description: string;
  badge?: string;
  avatarInitials: string;
}

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  category: 'Engineering & Tech' | 'Strategy & Consulting' | 'Marketing & Growth' | 'Creative & Media' | 'Operations & Finance';
  iconType: string;
  accentColor: 'red' | 'blue' | 'purple' | 'amber' | 'emerald' | 'cyan' | 'pink' | 'orange' | 'teal' | 'violet' | 'sky';
}

export interface StandoutPillar {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  accent: string;
}

export const LEADERSHIP_DATA: LeadershipMember[] = [
  {
    id: 'siddharth-gupta',
    name: 'Siddharth Gupta',
    role: 'Founder',
    focus: 'Strategy | Growth | Business Development',
    description:
      'Directing strategic vision, high-velocity revenue operations, and enterprise partner architectures at DiziBrand Media.',
    badge: 'Executive Founder',
    avatarInitials: 'SG',
  },
  {
    id: 'sneha-gupta',
    name: 'Sneha Gupta',
    role: 'Co-Founder',
    focus: 'Operations | Marketing | Client Success',
    description:
      'Leading operational excellence, omni-channel marketing execution, and seamless client delivery across global engagements.',
    badge: 'Co-Founder',
    avatarInitials: 'SG',
  },
];

export const VALUE_PILLARS = [
  {
    title: 'Strategy Driven',
    desc: 'Aligning business economics with measurable pipeline ROI',
    icon: 'Target',
  },
  {
    title: 'Technology Enabled',
    desc: 'Scalable Next.js, cloud systems & enterprise microservices',
    icon: 'Cpu',
  },
  {
    title: 'AI Integrated',
    desc: 'Autonomous agentic workflows & custom LLM pipelines',
    icon: 'Bot',
  },
  {
    title: 'Growth Focused',
    desc: 'Performance acquisition, CRO & full-funnel retention',
    icon: 'TrendingUp',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  // Column 1
  {
    id: 'danish-abbaas',
    name: 'Danish Abbaas',
    designation: 'CA',
    department: 'Finance & Compliance',
    category: 'Operations & Finance',
    iconType: 'FileSpreadsheet',
    accentColor: 'sky',
  },
  {
    id: 'umesh-tiwari',
    name: 'Umesh Tiwari',
    designation: 'CHRO',
    department: 'People & Talent Management',
    category: 'Operations & Finance',
    iconType: 'Users',
    accentColor: 'amber',
  },
  {
    id: 'navneeta',
    name: 'Navneeta',
    designation: 'Business Development & Recruitment Lead',
    department: 'Sales & Partnerships',
    category: 'Strategy & Consulting',
    iconType: 'TrendingUp',
    accentColor: 'pink',
  },
  {
    id: 'gaurav',
    name: 'Gaurav',
    designation: 'AI Developer',
    department: 'AI Solutions & Automation',
    category: 'Engineering & Tech',
    iconType: 'Bot',
    accentColor: 'purple',
  },
  {
    id: 'ritik-sharma',
    name: 'Ritik Sharma',
    designation: 'UI/UX Designer',
    department: 'Design & User Experience',
    category: 'Creative & Media',
    iconType: 'Palette',
    accentColor: 'pink',
  },

  // Column 2
  {
    id: 'sunil-prajapati',
    name: 'Sunil Prajapati',
    designation: 'Digital Marketing Manager',
    department: 'Campaigns & Acquisition',
    category: 'Marketing & Growth',
    iconType: 'BarChart3',
    accentColor: 'red',
  },
  {
    id: 'anshuman',
    name: 'Anshuman',
    designation: 'Business Consultant',
    department: 'Business Strategy & Client Relations',
    category: 'Strategy & Consulting',
    iconType: 'LineChart',
    accentColor: 'orange',
  },
  {
    id: 'shivam-raj',
    name: 'Shivam Raj',
    designation: 'Software Developer',
    department: 'Website & Software Development',
    category: 'Engineering & Tech',
    iconType: 'Laptop',
    accentColor: 'cyan',
  },
  {
    id: 'pradyumna',
    name: 'Pradyumna',
    designation: 'Meta & Google Ads Specialist',
    department: 'Paid Advertising & Performance Marketing',
    category: 'Marketing & Growth',
    iconType: 'Megaphone',
    accentColor: 'orange',
  },
  {
    id: 'pooja-verma',
    name: 'Pooja Verma',
    designation: 'Content Creator',
    department: 'Content & Social Media',
    category: 'Creative & Media',
    iconType: 'Sparkles',
    accentColor: 'purple',
  },

  // Column 3
  {
    id: 'nadeem-khan',
    name: 'Nadeem Khan',
    designation: 'Flutter Developer',
    department: 'Mobile Engineering & Cross-Platform',
    category: 'Engineering & Tech',
    iconType: 'Code2',
    accentColor: 'emerald',
  },
  {
    id: 'ashok-sharma',
    name: 'Ashok Sharma',
    designation: 'CXO Consultant',
    department: 'Leadership Advisory & Business Growth',
    category: 'Strategy & Consulting',
    iconType: 'Award',
    accentColor: 'violet',
  },
  {
    id: 'kaushal-singh',
    name: 'Kaushal Singh',
    designation: 'Software Developer',
    department: 'Software Development & Support',
    category: 'Engineering & Tech',
    iconType: 'Terminal',
    accentColor: 'teal',
  },
  {
    id: 'amisha-singh',
    name: 'Amisha Singh',
    designation: 'Business Development & HR Manager',
    department: 'Client Acquisition & Talent Management',
    category: 'Operations & Finance',
    iconType: 'UserCheck',
    accentColor: 'amber',
  },
  {
    id: 'karan-gupta',
    name: 'Karan Gupta',
    designation: 'SEO Specialist',
    department: 'SEO & Website Optimization',
    category: 'Marketing & Growth',
    iconType: 'Search',
    accentColor: 'red',
  },

  // Column 4
  {
    id: 'mehbabin',
    name: 'Mehbabin',
    designation: 'Business Consultant',
    department: 'Client Advisory & Solutions',
    category: 'Strategy & Consulting',
    iconType: 'Briefcase',
    accentColor: 'purple',
  },
  {
    id: 'rohit-verma',
    name: 'Rohit Verma',
    designation: 'CTO',
    department: 'Technology & Product Development',
    category: 'Engineering & Tech',
    iconType: 'Cpu',
    accentColor: 'blue',
  },
  {
    id: 'aditya',
    name: 'Aditya',
    designation: 'Data Analyst',
    department: 'Data Analysis & Business Intelligence',
    category: 'Engineering & Tech',
    iconType: 'BarChart2',
    accentColor: 'amber',
  },
  {
    id: 'jyoti',
    name: 'Jyoti',
    designation: 'Finance Associate',
    department: 'Accounting & Financial Operations',
    category: 'Operations & Finance',
    iconType: 'Landmark',
    accentColor: 'emerald',
  },
  {
    id: 'vivek-mishra',
    name: 'Vivek Mishra',
    designation: 'Video Editor',
    department: 'Video Editing & Creative Production',
    category: 'Creative & Media',
    iconType: 'Video',
    accentColor: 'sky',
  },
];

export const STANDOUT_PILLARS: StandoutPillar[] = [
  {
    title: 'IIT & IIM Alumni Network',
    subtitle: 'World-class education meets real-world execution',
    description:
      'Our strategic advisory and engineering leadership brings elite institutional rigor, structured problem solving, and proven domain execution.',
    iconName: 'GraduationCap',
    accent: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
  },
  {
    title: 'Multi-Disciplinary Expertise',
    subtitle: 'Strategy, Technology, Marketing & Operations',
    description:
      'We eliminate agency handoff friction by fusing software engineering, performance marketing, and financial operations into one synchronized delivery engine.',
    iconName: 'Layers',
    accent: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
  },
  {
    title: 'Innovation First',
    subtitle: 'Creative and technology-driven problem solving',
    description:
      'We continuously integrate modern AI agents, automated workflow orchestration, and high-performance serverless stacks to unlock durable competitive advantages.',
    iconName: 'Lightbulb',
    accent: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
  },
  {
    title: 'Client Focused',
    subtitle: 'Committed to your growth and success',
    description:
      'Zero-fluff partnerships anchored on verified deliverables, transparent sprint reporting, and direct accountability to your top-line revenue metrics.',
    iconName: 'HeartHandshake',
    accent: 'text-purple-400 border-purple-500/30 bg-purple-500/10',
  },
];
