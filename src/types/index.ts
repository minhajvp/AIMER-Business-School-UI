export interface Programme {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  audience: string;
  duration: string;
  tagline: string;
  description: string;
  eligibility: string;
  keyOutcome: {
    highlight: string;
    label: string;
  };
  features: string[];
  scholarship: string;
  hasNAAT: boolean;
  accentColor: string;
}

export interface MethodPhase {
  number: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metric: string;
  metricLabel: string;
}

export interface StudentOutcome {
  id: string;
  name: string;
  role: string;
  batch: string;
  type: 'internship' | 'placement' | 'venture';
  companyOrVenture: string;
  image?: string;
  initials: string;
  quote?: string;
}

export interface IndustryPartner {
  name: string;
  category: 'Enterprise' | 'Technology' | 'Healthcare' | 'EdTech' | 'Consulting' | 'Venture';
  highlight?: string;
}

export interface Mentor {
  id: string;
  name: string;
  role: string;
  organization: string;
  category: 'Core Faculty' | 'Visiting Faculty' | 'Industry Experts' | 'Executive' | 'Founder' | 'Academic' | 'Industry Specialist';
  avatar?: string;
  photo?: string;
  companyLogo?: string;
  companyInitials?: string;
  initials?: string;
  linkedin?: string;
  bio?: string;
  experience?: string;
  expertise?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  description: string;
  status: 'Open' | 'Filling Fast' | 'Announced';
  actionUrl: string;
  featured?: boolean;
}

export interface InstitutionalStat {
  value: string;
  label: string;
  subtext: string;
  emphasis?: boolean;
}

