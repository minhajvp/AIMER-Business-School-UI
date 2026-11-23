export interface HsbipHighlight {
  label: string;
  value: string;
  detail?: string;
}

export interface HsbipOutcome {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface HsbipPillar {
  num: string;
  title: string;
  category: 'Academics' | 'Venture' | 'Leadership' | 'Practical';
  summary: string;
  deliverables: string[];
}

export interface HsbipCampusFeature {
  title: string;
  badge: string;
  description: string;
}

export interface HsbipContent {
  meta: {
    title: string;
    description: string;
    slug: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    quickStats: {
      duration: string;
      mode: string;
      board: string;
      campus: string;
    };
    ctas: {
      primaryText: string;
      primaryHref: string;
      secondaryText: string;
      secondaryHref: string;
    };
    highlights: HsbipHighlight[];
    video: {
      youtubeId: string;
      title: string;
      description: string;
      runtime: string;
      locationNote: string;
    };
  };
  ecosystem: {
    heading: string;
    subheading: string;
    partners: string[];
  };
  overview: {
    badge: string;
    heading: string;
    headingAccent: string;
    lead: string;
    counters: {
      value: string;
      label: string;
      detail: string;
    }[];
    pedagogy: {
      academicPercent: number;
      experientialPercent: number;
      academicDesc: string;
      experientialDesc: string;
    };
  };
  outcomes: {
    badge: string;
    heading: string;
    headingAccent: string;
    description: string;
    items: HsbipOutcome[];
  };
  pillars: {
    badge: string;
    heading: string;
    headingAccent: string;
    description: string;
    items: HsbipPillar[];
  };
  campus: {
    badge: string;
    heading: string;
    headingAccent: string;
    description: string;
    locationNote: string;
    features: HsbipCampusFeature[];
    parentNote: {
      title: string;
      description: string;
      contactHref: string;
      contactText: string;
    };
  };
  admissions: {
    badge: string;
    heading: string;
    headingAccent: string;
    description: string;
    criteria: {
      step: string;
      title: string;
      requirement: string;
      details: string;
    }[];
    naatCompetencies: {
      name: string;
      description: string;
    }[];
    benefits: {
      title: string;
      desc: string;
    }[];
    hotline: {
      phone: string;
      whatsappUrl: string;
    };
  };
  newsletter: {
    heading: string;
    description: string;
  };
}

export const hsbipContent: HsbipContent = {
  meta: {
    title: 'Higher Secondary Business Integrated Program (HSBIP) | AIMER Business School',
    description:
      'A 2-year residential program for Plus One & Plus Two Commerce students combining SCOLE Kerala academics with experiential business education at Markaz Knowledge City.',
    slug: 'hsbip',
  },
  hero: {
    eyebrow: 'Higher Secondary Business Integrated Program 2026-27',
    title: 'Higher Secondary Business',
    titleAccent: 'Integrated Program',
    subtitle:
      'A 2-year residential program for Plus One & Plus Two Commerce students combining SCOLE Kerala academics with hands-on business incubation and leadership mastery.',
    quickStats: {
      duration: '2 Years (+1 & +2)',
      mode: 'Full-Time Residential',
      board: 'SCOLE Kerala Board',
      campus: 'Markaz Knowledge City',
    },
    ctas: {
      primaryText: 'Apply for HSBIP',
      primaryHref: '#admission',
      secondaryText: 'Download Brochure',
      secondaryHref: '#brochure',
    },
    highlights: [
      {
        label: 'Official Recognition',
        value: 'Kerala State Board (SCOLE)',
        detail: 'Standard Higher Secondary Commerce certification',
      },
      {
        label: 'Incubation Track',
        value: 'Junior Venture Studio',
        detail: 'Build & launch real student startups before university',
      },
      {
        label: 'Executive Pedagogy',
        value: '25+ CXO Mentors',
        detail: 'Active guidance by founders & enterprise leaders',
      },
      {
        label: 'Global Exposure',
        value: 'Dubai Immersion Tour',
        detail: '5-10 day international corporate & trade expedition',
      },
    ],
    video: {
      youtubeId: 'jmMAU37mLQA',
      title: 'Experience HSBIP in Action',
      description:
        'Watch how AIMER transforms Plus One & Plus Two commerce students into future business leaders through experiential learning, executive mentorship, and residential campus immersion.',
      runtime: '02:15',
      locationNote: 'At Markaz Knowledge City, a 125-acre integrated hub near the Wayanad foothills.',
    },
  },
  ecosystem: {
    heading: 'Supported by Corporate & Hiring Ecosystem',
    subheading: 'Collaborating with industry pioneers, technology incubators, and state academic boards',
    partners: [
      'SCOLE Kerala',
      'Google for Startups',
      'Intel',
      'Kerala Startup Mission',
      'FICCI',
      'Royal Drive',
      'Team Thai',
      'Acodez Digital',
    ],
  },
  overview: {
    badge: 'Programme Overview',
    heading: 'Commerce Education Redefined for the',
    headingAccent: 'Modern Century',
    lead:
      'HSBIP bridges the gap between conventional school education and fast-moving industry realities. By integrating the Kerala State Board Commerce curriculum with our proprietary Junior Venture Studio, students master fundamental financial sciences while building real-world digital enterprises.',
    counters: [
      {
        value: '2 Years',
        label: 'Academic Duration',
        detail: 'Plus One & Plus Two Commerce cohort',
      },
      {
        value: '11 Pillars',
        label: 'Value Delivery',
        detail: 'Holistic entrepreneurship ecosystem',
      },
      {
        value: '100%',
        label: 'Residential Campus',
        detail: 'Immersive 125-acre Markaz Knowledge City',
      },
      {
        value: '1 Startup',
        label: 'Incubation Goal',
        detail: 'Launch a viable venture before age 18',
      },
    ],
    pedagogy: {
      academicPercent: 40,
      experientialPercent: 60,
      academicDesc:
        'Thorough mastery of Accountancy, Business Studies, Economics, and English governed by SCOLE Kerala.',
      experientialDesc:
        'Applied startup sprints, no-code prototyping, digital marketing campaigns, outbound leadership camps, and CXO roundtables.',
    },
  },
  outcomes: {
    badge: 'Student Transformations',
    heading: 'Five Core Outcomes of the',
    headingAccent: 'HSBIP Roadmap',
    description:
      'Students graduate not merely with a school diploma, but with proven venture-building acumen, mature interpersonal capabilities, and actionable career clarity.',
    items: [
      {
        id: 'startups',
        num: '01',
        title: 'Young Entrepreneurs & Venture Creators',
        subtitle: 'From Classroom Theory to Live Enterprise',
        description:
          'Real venture-building experience inside our Junior Venture Studio. Students ideate, validate product-market fit, and pitch real products before entering university.',
        tags: ['Startup Incubation', 'Pitch Decks', 'Seed Ideation', 'Customer Discovery'],
      },
      {
        id: 'personality',
        num: '02',
        title: 'Holistic Personality & Executive Presence',
        subtitle: 'Confidence, Poise, and Clear Communication',
        description:
          'Structured public speaking, debate societies, corporate grooming, and emotional maturity training designed to replace teenage hesitation with executive confidence.',
        tags: ['Public Speaking', 'Executive Presence', 'Emotional Intelligence', 'Debate'],
      },
      {
        id: 'tech',
        num: '03',
        title: 'Modern Tech & Artificial Intelligence Literacy',
        subtitle: 'Tech-Enabled Business Leadership',
        description:
          'Hands-on fluency with contemporary productivity ecosystems, AI prompt workflows, data analysis dashboards, and low-code digital software.',
        tags: ['AI Workflows', 'Business Analytics', 'No-Code Tools', 'Automation'],
      },
      {
        id: 'softskills',
        num: '04',
        title: 'Strategic Leadership & Negotiation Skills',
        subtitle: 'Collaborative Problem Solving',
        description:
          'Through competitive hackathons, simulation boardrooms, and Outbound Training (OBT), students master conflict resolution, cross-functional team leadership, and persuasive negotiation.',
        tags: ['Negotiation', 'Crisis Sprints', 'Team Leadership', 'Strategic Thinking'],
      },
      {
        id: 'hardskills',
        num: '05',
        title: 'Marketable Commercial & Financial Hard Skills',
        subtitle: 'Tangible Business Operations',
        description:
          'Practical understanding of enterprise financial planning, double-entry bookkeeping, digital performance marketing, and commercial sales funnels.',
        tags: ['Financial Modeling', 'Digital Marketing', 'Accounting', 'Sales Funnels'],
      },
    ],
  },
  pillars: {
    badge: 'Curriculum Architecture',
    heading: 'The 11 Value Delivery',
    headingAccent: 'Pillars of HSBIP',
    description:
      'A multi-dimensional blueprint engineered to convert a standard higher secondary commerce curriculum into an active venture accelerator.',
    items: [
      {
        num: '01',
        title: 'Core Academic Syllabus',
        category: 'Academics',
        summary: 'Standard Plus One & Plus Two Commerce curriculum governed by SCOLE Kerala.',
        deliverables: ['Accountancy', 'Business Studies', 'Economics', 'English Language'],
      },
      {
        num: '02',
        title: 'Additional Business Modules',
        category: 'Practical',
        summary: 'Supplementary coursework focused on practical business dynamics & venture creation.',
        deliverables: ['Enterprise Economics', 'Venture Dynamics', 'Corporate Law Basics', 'Supply Chain Intro'],
      },
      {
        num: '03',
        title: 'Student Development Programs (SDP)',
        category: 'Leadership',
        summary: 'Targeted workshops covering interpersonal communication, emotional intelligence, and executive presence.',
        deliverables: ['Public Speaking Mastery', 'Executive Grooming', 'Emotional Quotient (EQ)', 'Active Listening'],
      },
      {
        num: '04',
        title: 'Technical Bootcamps',
        category: 'Practical',
        summary: 'Hands-on training in real workplace software, automation tools, and financial modeling.',
        deliverables: ['Advanced Excel & Sheets', 'Canva & Design Systems', 'AI Prompt Engineering', 'No-Code Web Studio'],
      },
      {
        num: '05',
        title: 'Experiential Expeditions',
        category: 'Practical',
        summary: 'Direct exposure to operational industrial corridors, logistics hubs, and manufacturing floors.',
        deliverables: ['Factory Walkthroughs', 'Port & Logistics Visits', 'Retail Distribution Audits', 'Field Notes'],
      },
      {
        num: '06',
        title: 'Guest Talk Series',
        category: 'Leadership',
        summary: 'Regular boardroom sessions with high-impact startup founders, venture capitalists, and industry veterans.',
        deliverables: ['Founder AMAs', 'C-Suite Q&A Sessions', 'Industry Trends Briefs', 'Career Pathways'],
      },
      {
        num: '07',
        title: 'Outbound Training (OBT)',
        category: 'Leadership',
        summary: 'Off-campus leadership camps, team-building retreats, and survival resilience drills.',
        deliverables: ['Wilderness Navigation', 'High-Rope Resilience', 'Team Strategy Games', 'Leadership Under Pressure'],
      },
      {
        num: '08',
        title: 'Junior Venture Studio',
        category: 'Venture',
        summary: 'In-house incubator enabling students to build, test, and market real tech & non-tech startups.',
        deliverables: ['Problem-Solution Fit', 'MVP Prototyping', 'Real Customer Validation', 'Demo Day Pitch'],
      },
      {
        num: '09',
        title: 'Social Impact & Civic Projects',
        category: 'Leadership',
        summary: 'Community-driven initiatives fostering ethical responsibility and local sustainable development.',
        deliverables: ['NGO Partnerships', 'Environmental Audits', 'Community Fundraisers', 'Ethical Governance'],
      },
      {
        num: '10',
        title: 'Competitions & Hackathons',
        category: 'Venture',
        summary: 'Regular participation in inter-school pitch presentations, declamations, and commerce hackathons.',
        deliverables: ['Business Plan Battles', 'Declamation Trophies', 'Rapid Hackathons', 'State-Level Recognition'],
      },
      {
        num: '11',
        title: 'Management Challenges',
        category: 'Practical',
        summary: 'Time-boxed problem-solving sprints tackling actual operational dilemmas faced by local firms.',
        deliverables: ['Crisis Simulations', 'Marketing Budget Sprints', 'Turnaround Case Studies', 'Boardroom Defense'],
      },
    ],
  },
  campus: {
    badge: 'Residential Experience',
    heading: 'Safe, Supported, and Inspiring',
    headingAccent: 'Campus Life',
    description:
      'Located within the serene 125-acre Markaz Knowledge City near the Wayanad foothills, HSBIP offers a secure, distraction-free residential haven designed for focused academic and personal growth.',
    locationNote: 'Markaz Knowledge City, Kaithappoyil, Calicut, Kerala 673580',
    features: [
      {
        title: 'Modern Residential Hostels',
        badge: 'Accommodation',
        description:
          'Separate, well-furnished hostels for boys and girls with dedicated study spaces, high-speed Wi-Fi, and climate-conscious design.',
      },
      {
        title: 'Wholesome Nutrition',
        badge: 'Hostel Mess',
        description:
          'Hygienic, balanced four-meal plans prepared daily under nutritionist supervision to ensure physical health and active cognitive focus.',
      },
      {
        title: '24/7 Healthcare & Medical Care',
        badge: 'On-Site Medical',
        description:
          'Round-the-clock emergency support, resident medical personnel, and direct linkage to multispecialty healthcare facilities within Knowledge City.',
      },
      {
        title: 'Dedicated Mentorship & Security',
        badge: 'Supervision',
        description:
          'Full-time residential wardens, 24/7 campus security surveillance, biometric checkpoints, and assigned faculty mentors for each student.',
      },
    ],
    parentNote: {
      title: 'A Direct Note for Concerned Parents',
      description:
        'We understand that sending a student away for Higher Secondary is a major emotional milestone. Our campus maintains a strict anti-ragging, gadget-balanced, and morally upright atmosphere with weekly parent progress reports.',
      contactHref:
        'https://wa.me/917450030600?text=Hi%20AIMER%2C%20I%27m%20a%20parent.%20I%27d%20like%20to%20know%20about%20HSBIP%20hostel%20and%20safety.',
      contactText: 'Chat Directly with Campus Dean on WhatsApp',
    },
  },
  admissions: {
    badge: 'Admissions 2026-27',
    heading: 'Qualify for the HSBIP',
    headingAccent: 'Cohort',
    description:
      'We welcome ambitious students completing Class 10 who demonstrate passion for business, intellectual curiosity, and high personal integrity.',
    criteria: [
      {
        step: '01',
        title: 'Academic Eligibility',
        requirement: 'Passed Class 10 Examinations',
        details: 'SSLC / CBSE / ICSE or any recognized national/state board with a minimum of 60% aggregate.',
      },
      {
        step: '02',
        title: 'NAAT Assessment',
        requirement: 'National AIMER Admission Test',
        details: 'Evaluates logical reasoning, situational decision-making, and entrepreneurial aptitude.',
      },
      {
        step: '03',
        title: 'Personal Interview',
        requirement: 'Faculty & Dean Interaction',
        details: 'A holistic discussion to understand the candidate’s personal aspirations, discipline, and goals.',
      },
      {
        step: '04',
        title: 'Provisional Offer',
        requirement: 'Seat Allotment & Onboarding',
        details: 'Shortlisted candidates receive admission letters with merit scholarship eligibility evaluation.',
      },
    ],
    naatCompetencies: [
      {
        name: 'Decision-Making',
        description: 'Assessing moral clarity, quick thinking, and sound judgment under ambiguous constraints.',
      },
      {
        name: 'Problem-Solving',
        description: 'Analyzing real-world scenarios and finding pragmatic, creative solutions.',
      },
      {
        name: 'Adaptability',
        description: 'Assessing mental agility, willingness to learn new methods, and emotional resilience.',
      },
      {
        name: 'Strategic Thinking',
        description: 'Evaluating long-term planning, big-picture awareness, and entrepreneurial inclination.',
      },
    ],
    benefits: [
      {
        title: 'Fast-Track Evaluation',
        desc: 'Receive profile verification and NAAT test slot details within 24–48 hours.',
      },
      {
        title: 'Merit Scholarship Pool',
        desc: 'Exceptional performers in NAAT are considered for up to 100% tuition scholarships.',
      },
      {
        title: 'Parent Counseling Session',
        desc: 'One-on-one virtual or campus tour consultation to address hostel safety and academic roadmaps.',
      },
    ],
    hotline: {
      phone: '+91 74500 30600',
      whatsappUrl:
        'https://wa.me/917450030600?text=Hi%20AIMER%2C%20I%20have%20a%20question%20about%20HSBIP%20admissions.',
    },
  },
  newsletter: {
    heading: 'Stay Updated with AIMER HSBIP',
    description: 'Receive admissions schedules, student venture showcases, and campus newsletters.',
  },
};

