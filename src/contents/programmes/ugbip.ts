export interface UgbipHighlight {
  label: string;
  value: string;
  detail?: string;
}

export interface UgbipTheoryPracticum {
  theoryPercent: number;
  practicumPercent: number;
  theoryDesc: string;
  practicumDesc: string;
}

export interface UgbipInternship {
  period: string;
  title: string;
  stipend: string;
  description: string;
}

export interface UgbipManagementChallenge {
  num: string;
  title: string;
  summary: string;
  skill: string;
}

export interface UgbipSpeaker {
  name: string;
  role: string;
  company: string;
  topic: string;
}

export interface UgbipMentor {
  id: string;
  name: string;
  role: string;
  company: string;
  photo: string;
  badge?: string;
}

export interface UgbipContent {
  meta: {
    title: string;
    description: string;
    slug: string;
  };
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    quickStats: {
      duration: string;
      mode: string;
      practicum: string;
      credential: string;
    };
    ctas: {
      primaryText: string;
      primaryHref: string;
      secondaryText: string;
      secondaryHref: string;
    };
    highlights: UgbipHighlight[];
    video: {
      youtubeId: string;
      title: string;
      description: string;
      runtime: string;
      poster: string;
    };
  };
  ecosystem: {
    heading: string;
    subheading: string;
    partners: string[];
  };
  overview: {
    sectionBadge: string;
    heading: string;
    headingAccent: string;
    lead: string;
    counters: {
      value: string;
      label: string;
    }[];
    pedagogy: UgbipTheoryPracticum;
    immersion: {
      eyebrow: string;
      heading: string;
      description: string;
      image: string;
      highlights: {
        num: string;
        title: string;
        desc: string;
      }[];
      ledger: {
        corridor: string;
        partner: string;
        focus: string;
      }[];
      ribbonText: string;
    };
    internships: {
      eyebrow: string;
      heading: string;
      lead: string;
      phases: UgbipInternship[];
    };
  };
  learn: {
    sectionBadge: string;
    heading: string;
    headingAccent: string;
    lead: string;
    speakers: {
      eyebrow: string;
      heading: string;
      items: UgbipSpeaker[];
    };
    managementChallenges: {
      eyebrow: string;
      heading: string;
      items: UgbipManagementChallenge[];
    };
    workshops: {
      eyebrow: string;
      heading: string;
      items: string[];
    };
    mentors: {
      eyebrow: string;
      heading: string;
      items: UgbipMentor[];
    };
  };
  development: {
    sectionBadge: string;
    heading: string;
    headingAccent: string;
    panoramicImage: string;
    outcomes: string[];
    sdp: {
      title: string;
      description: string;
      focusAreas: string[];
    };
    src: {
      title: string;
      description: string;
      pillars: string[];
    };
    campusLife: {
      eyebrow: string;
      heading: string;
      images: {
        url: string;
        title: string;
        category: string;
      }[];
    };
  };
  naatBand: {
    badge: string;
    heading: string;
    subheading: string;
    competencies: {
      num: string;
      title: string;
      description: string;
    }[];
    nextNaatDate: string; // ISO date or empty if expired
    applyHref: string;
    faqHref: string;
    phoneText: string;
    phoneHref: string;
  };
  admission: {
    badge: string;
    heading: string;
    subheading: string;
    points: {
      title: string;
      desc: string;
    }[];
    whatsappHref: string;
    whatsappNumber: string;
    qualificationOptions: string[];
  };
  closing: {
    campus: string;
    badge: string;
    heading: string;
    description: string;
    perks: string[];
    nextNaatDate: string;
    applyHref: string;
    counsellorHref: string;
  };
  newsletter: {
    heading: string;
    lead: string;
  };
}

export const ugbipContent: UgbipContent = {
  meta: {
    title: 'Undergraduate Business Integrated Program (UGBIP) | AIMER Business School',
    description:
      'A 3-year enterprise-driven undergraduate degree featuring 75% practical learning, 2 corporate internships with paid monthly stipends, and international business immersion in Dubai.',
    slug: '/programmes/ugbip',
  },
  hero: {
    badge: '3-YEAR UNDERGRADUATE DEGREE INTEGRATION',
    title: 'Undergraduate Business',
    titleAccent: 'Integrated Program',
    subtitle:
      'Beyond traditional degree frameworks. UGBIP combines rigorous university degree credits with 75% enterprise practicum, live startup incubation, 2 corporate internships, and corporate immersion across Dubai and Singapore.',
    quickStats: {
      duration: '3 Years · 6 Semesters',
      mode: 'On-Campus & Corporate Residency',
      practicum: '75% Practical Learning',
      credential: 'UGC-Recognized Degree + Global Diploma',
    },
    ctas: {
      primaryText: 'Apply via NAAT',
      primaryHref: '#admission',
      secondaryText: 'Download Brochure',
      secondaryHref: '#brochure',
    },
    highlights: [
      { label: 'PRACTICUM PEDAGOGY', value: '75%', detail: 'Lab & venture-based' },
      { label: 'CORPORATE INTERNSHIPS', value: '2 Internships', detail: 'Paid monthly stipends' },
      { label: 'GLOBAL IMMERSION', value: 'Dubai & SG', detail: 'Guaranteed trade exposure' },
      { label: 'MERIT SCHOLARSHIP', value: 'Up to 100%', detail: 'Based on NAAT score' },
    ],
    video: {
      youtubeId: 'nfCleZk8i2Y',
      title: 'UGBIP Experience & Immersion',
      description:
        'UGBIP prepares students through practical learning, live projects, and international exposure.',
      runtime: '02:30',
      poster: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80',
    },
  },
  ecosystem: {
    heading: 'Corporate Residency & Internship Partners',
    subheading: 'Our students intern and solve real business problems inside leading regional and global enterprises',
    partners: [
      'GhcGrowthlab',
      'Zil Money',
      'MindPeers',
      'Markaz Knowledge City',
      'Kerala Startup Mission',
      'DIFC Dubai',
      'Aster DM Healthcare',
      'Malabar Group',
    ],
  },
  overview: {
    sectionBadge: 'PEDAGOGICAL ARCHITECTURE',
    heading: 'Engineering Enterprise Agency,',
    headingAccent: 'From Day One.',
    lead:
      'Traditional management education teaches business history from a textbook. AIMER equips undergraduates as operators—spending 75% of academic time building real products, running financial models, and leading live client engagements.',
    counters: [
      { value: '03', label: 'Academic Years' },
      { value: '06', label: 'Immersive Semesters' },
      { value: '75%', label: 'Practicum Pedagogy' },
      { value: '02', label: 'Corporate Residencies' },
    ],
    pedagogy: {
      theoryPercent: 25,
      practicumPercent: 75,
      theoryDesc: 'Core university syllabus, legal frameworks, accounting foundations, and academic macroeconomics.',
      practicumDesc: 'Live business labs, venture incubation sprints, financial modeling, real marketing campaigns, and direct boardroom residencies.',
    },
    immersion: {
      eyebrow: 'INTERNATIONAL COMMERCIAL CORRIDORS',
      heading: 'Global Immersion: Dubai & Singapore',
      description:
        'Every UGBIP student participates in guaranteed international immersion. Experience Middle Eastern trade hubs, visit DIFC fintech accelerators, interact with regional trade chambers, and build cross-border commercial acumen.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
      highlights: [
        {
          num: '01',
          title: 'DIFC & Dubai Future Foundation',
          desc: 'Direct interaction with venture capitalists, global banking desks, and regional free-zone startup incubators.',
        },
        {
          num: '02',
          title: 'Cross-Border Supply Chain Sprints',
          desc: 'Study port logistics at Jebel Ali and trade networks connecting South Asia to the MENA region.',
        },
        {
          num: '03',
          title: 'Executive Networking Dinners',
          desc: 'Present business plans to NRI enterprise founders and overseas AIMER advisory council mentors.',
        },
      ],
      ledger: [
        { corridor: 'Calicut HQ Campus', partner: 'Markaz Knowledge City', focus: 'Academic Core & Incubation Hub' },
        { corridor: 'Dubai Commercial Hub', partner: 'DIFC & DFF Ecosystem', focus: 'Global Fintech & Trade Immersion' },
        { corridor: 'ASEAN Corridor', partner: 'Singapore & KL Desks', focus: 'Supply Chain & Enterprise Scaling' },
        { corridor: 'European Outpost', partner: 'London Trade Network', focus: 'International Strategy & Capital' },
      ],
      ribbonText: 'Dubai, UAE — Calicut HQ — Singapore & KL — London & Europe — Active International Business Corridors —',
    },
    internships: {
      eyebrow: 'EARN WHILE YOU LEARN',
      heading: 'Two Guaranteed Corporate Residencies',
      lead:
        'UGBIP integrates two distinct 6-month corporate internship residencies directly into the 3-year curriculum. You graduate with 12 full months of verified work experience and paid corporate stipends.',
      phases: [
        {
          period: 'Semester 4 · 6 Months',
          title: 'Foundational Corporate Residency',
          stipend: 'Paid Monthly Stipend',
          description:
            'Embedded inside high-growth startups and mid-market firms across India. Focus on growth marketing, client servicing, sales operations, and digital analytics.',
        },
        {
          period: 'Semester 6 · 6 Months',
          title: 'Strategic Executive Residency',
          stipend: 'Paid Executive Stipend',
          description:
            'Senior residency in corporate finance, brand management, supply chain, or HR business partnering. Direct conversion pathway to pre-placement offers (PPOs).',
        },
      ],
    },
  },
  learn: {
    sectionBadge: 'HOW YOU LEARN',
    heading: 'Practicum In Action:',
    headingAccent: 'Labs, Challenges & Sprints.',
    lead:
      'We replace passive lectures with high-intensity simulations. Work with live venture funds, execute real commercial challenges, and learn directly from 25+ operating CXOs.',
    speakers: {
      eyebrow: 'STARTUP FOUNDER SERIES',
      heading: 'Recent Masterclasses & Guest Lectures',
      items: [
        {
          name: 'Manu C Francis',
          role: '3X Founder',
          company: 'AIMER Venture Mentor',
          topic: 'Rapid MVP Prototyping & Product-Market Validation',
        },
        {
          name: 'Abdul Latheef',
          role: 'Managing Director',
          company: 'B-HUB Business Incubator',
          topic: 'Building Scalable Supply Chains & Regional Distribution',
        },
        {
          name: 'Nadeem Safran',
          role: 'Managing Partner',
          company: 'C-Suite Advisory',
          topic: 'Corporate Valuation & Angel Syndication in South India',
        },
        {
          name: 'Kanika Tekriwal',
          role: 'Founder & CEO',
          company: 'JetSetGo',
          topic: 'Disrupting Monopolistic Aviation & Capital Allocation',
        },
        {
          name: 'Sabeer Nelli',
          role: 'Founder & CEO',
          company: 'Zil Money',
          topic: 'Bootstrapping a $100M+ FinTech Platform Globally',
        },
        {
          name: 'Kanika Agarwal',
          role: 'Founder & CEO',
          company: 'MindPeers',
          topic: 'Behavioral Psychology in Enterprise Consumer Tech',
        },
      ],
    },
    managementChallenges: {
      eyebrow: 'ENTERPRISE COMPETITIONS',
      heading: '6 Multi-Disciplinary Management Challenges',
      items: [
        {
          num: '01',
          title: 'Best Management Team',
          summary: 'Cross-functional crisis simulation assessing rapid decision-making under severe market shocks.',
          skill: 'Crisis Management & Team Dynamics',
        },
        {
          num: '02',
          title: 'Financial Modeling Sprint',
          summary: 'Build robust 3-statement forecast models, valuation DCFs, and investor cap tables.',
          skill: 'Corporate Valuation & Cap Tables',
        },
        {
          num: '03',
          title: 'Marketing & Brand Teardown',
          summary: 'Live CAC optimization, performance marketing budgets, and brand repositioning audits.',
          skill: 'Growth Metrics & Brand Strategy',
        },
        {
          num: '04',
          title: 'HR & People Operations',
          summary: 'Design compensation matrices, talent retention playbooks, and organizational design frameworks.',
          skill: 'Talent Acquisition & Culture Design',
        },
        {
          num: '05',
          title: 'Logistics & Supply Chain Hack',
          summary: 'Route optimization, warehousing inventory models, and cold-chain resilience stress tests.',
          skill: 'Operations & Route Efficiency',
        },
        {
          num: '06',
          title: 'Venture Pitch & Capital Raise',
          summary: 'Present validated student enterprise MVPs before real angel investors and venture capitalists.',
          skill: 'Investor Relations & Pitching',
        },
      ],
    },
    workshops: {
      eyebrow: 'SKILLS BOOTCAMPS',
      heading: 'Industry-Certified Practical Workshops',
      items: [
        'Advanced Financial Modeling in Microsoft Excel',
        'AI for Enterprise Strategy & Automation',
        'Data Visualization with Tableau & PowerBI',
        'Digital Performance Marketing & Meta Ads',
        'Corporate Law, Contracts & Term Sheet Drafting',
        'Executive Public Speaking & Boardroom Presence',
        'Supply Chain Analytics & ERP Fundamentals',
        'B2B Sales Pipeline Management & Closing',
      ],
    },
    mentors: {
      eyebrow: 'EXECUTIVE ADVISORS',
      heading: 'Learn Directly from Operating Leaders',
      items: [
        {
          id: 'shiju',
          name: 'Shiju Philipos',
          role: 'Academic Director',
          company: 'AIMER Business School',
          photo: 'https://www.aimerbschool.com/assets/img/faculty/live-shiju-philipos.png',
          badge: 'Academic Leadership',
        },
        {
          id: 'manu',
          name: 'Manu C Francis',
          role: '3X Founder',
          company: 'AIMER Venture Mentor',
          photo: 'https://www.aimerbschool.com/assets/img/faculty/live-manu-c-francis.jpg',
          badge: 'Venture Incubation',
        },
        {
          id: 'abdul',
          name: 'Abdul Latheef',
          role: 'Managing Director',
          company: 'B-HUB Incubator',
          photo: 'https://www.aimerbschool.com/assets/img/faculty/live-abdul-latheef.jpeg',
          badge: 'Ecosystem Partner',
        },
        {
          id: 'nadeem',
          name: 'Nadeem Safran',
          role: 'Managing Partner',
          company: 'C-Suite Advisory',
          photo: 'https://www.aimerbschool.com/assets/img/faculty/live-nadeem-safran.png',
          badge: 'Capital & Finance',
        },
        {
          id: 'anitha',
          name: 'Anitha C',
          role: 'AVP, Experiential Learning',
          company: 'AIMER Business School',
          photo: 'https://www.aimerbschool.com/assets/img/faculty/live-anitha-c.png',
          badge: 'Practicum Pedagogy',
        },
        {
          id: 'sriram',
          name: 'Sriram P',
          role: 'Associate Professor, Finance',
          company: 'AIMER Faculty',
          photo: 'https://www.aimerbschool.com/assets/img/faculty/live-sriram-p.jpg',
          badge: 'Finance Mentor',
        },
      ],
    },
  },
  development: {
    sectionBadge: 'HOLISTIC DEVELOPMENT',
    heading: 'Student Development Program (SDP) &',
    headingAccent: 'SRC Life.',
    panoramicImage: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=1600&q=80',
    outcomes: ['Corporate Articulation', 'Emotional Intelligence', 'Boardroom Readiness'],
    sdp: {
      title: 'Student Development Program (SDP)',
      description:
        'The Student Development Program runs throughout the UGBIP journey, focusing on building high-agency communication, negotiation instincts, emotional intelligence, and professional boardroom confidence. Continuous interactive coaching prepares candidates for corporate interview panels and client leadership.',
      focusAreas: [
        'Executive communication and boardroom presence',
        'Group discussion dynamics & case interview mastery',
        'Negotiation frameworks and conflict management',
        'Personal branding & professional networking on LinkedIn',
      ],
    },
    src: {
      title: 'Student Representative Council (SRC)',
      description:
        'SRC programs at AIMER encourage active student governance through campus-wide initiatives, club leadership, and high-stakes event execution.',
      pillars: [
        'Leadership & enterprise ownership',
        'Event planning, budgeting & live execution',
        'Cross-functional team management',
        'Creative expression & cultural festivals',
        'Campus-wide student collaboration',
      ],
    },
    campusLife: {
      eyebrow: 'LIFE AT MARKAZ KNOWLEDGE CITY',
      heading: 'A Vibrant 125-Acre Ecosystem',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
          title: 'Sports & Wellness Complex',
          category: 'Fitness & Recreation',
        },
        {
          url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
          title: 'Campus Fests & SRC Celebrations',
          category: 'Cultural Events',
        },
        {
          url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
          title: 'Passionate Student Cohort',
          category: 'Collaborative Work',
        },
      ],
    },
  },
  naatBand: {
    badge: 'NATIONAL AIMER ADMISSION TEST',
    heading: 'Admissions Evaluation & Competency Benchmarking',
    subheading: 'NAAT evaluates a candidate’s cognitive aptitude, commercial mindset, and leadership instincts rather than rote memorization.',
    competencies: [
      {
        num: '01',
        title: 'Decision-Making Under Uncertainty',
        description: 'Assesses rational judgment and risk evaluation in complex business scenarios.',
      },
      {
        num: '02',
        title: 'Problem-Solving & Logical Aptitude',
        description: 'Tests analytical problem breakdown, data interpretation, and pattern logic.',
      },
      {
        num: '03',
        title: 'Adaptability & Learning Agility',
        description: 'Evaluates resilience, intellectual curiosity, and fast-paced skill acquisition.',
      },
      {
        num: '04',
        title: 'Strategic & Commercial Thinking',
        description: 'Gauges basic market intuition, entrepreneurial agency, and economic rationale.',
      },
    ],
    nextNaatDate: '2026-11-30', // Editable single config value
    applyHref: '#admission',
    faqHref: '/#admissions',
    phoneText: '+91 74500 30600',
    phoneHref: 'tel:+917450030600',
  },
  admission: {
    badge: 'ADMISSIONS 2026–27 · FAST-TRACK INTAKE',
    heading: 'Begin Your Journey in UGBIP',
    subheading:
      'Take the first step toward career acceleration. Register your interest for the Undergraduate Business Integrated Program to schedule your personal interview and check scholarship eligibility.',
    points: [
      {
        title: 'Fast-Track Evaluation',
        desc: 'Receive profile shortlisting & NAAT test slot details within 24–48 hours.',
      },
      {
        title: 'Merit Scholarship Pool',
        desc: 'Eligible candidates considered for up to 100% tuition coverage based on merit.',
      },
      {
        title: 'Direct CXO Mentorship',
        desc: 'Early access to corporate residency opportunities and executive guidance.',
      },
    ],
    whatsappHref: 'https://wa.me/917450030600?text=Hi%20AIMER,%20I%20have%20a%20question%20about%20UGBIP%20admissions.',
    whatsappNumber: '+91 74500 30600',
    qualificationOptions: [
      'Class 12 / Plus Two Completed',
      'Currently in Class 12',
      'Diploma / Foundation Program',
      'Parent of Student',
    ],
  },
  closing: {
    campus: 'Markaz Knowledge City, Calicut',
    badge: 'ADMISSIONS 2026–27 · NAAT OPEN',
    heading: 'Start Your Business Journey at AIMER',
    description:
      'UGBIP undergraduate program with dual-credential pathways, 12 months corporate residency and merit scholarships up to 100%.',
    perks: [
      'Merit scholarships for top 10% in NAAT',
      'Industry mentorship with 25+ operating CXOs',
      'Guaranteed corporate internship placements',
    ],
    nextNaatDate: '2026-11-30',
    applyHref: '#admission',
    counsellorHref: 'https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20talk%20to%20an%20admissions%20counsellor',
  },
  newsletter: {
    heading: 'Subscribe to the AIMER Journal',
    lead: 'Get the latest insights, campus news, placement outcomes, and corporate updates straight to your inbox.',
  },
};

