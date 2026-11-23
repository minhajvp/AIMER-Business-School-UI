export interface PgbipHighlightItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  image: string;
}

export interface PgbipCurriculumSemester {
  semester: string;
  phase: string;
  title: string;
  focus: string;
  modules: string[];
  deliverable: string;
}

export interface PgbipFeeItem {
  num: number;
  description: string;
  year1: string;
  year2: string;
  total: string;
}

export interface PgbipContent {
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
      internship: string;
      peakPackage: string;
    };
    ctas: {
      primaryText: string;
      primaryHref: string;
      secondaryText: string;
      secondaryHref: string;
    };
    pills: string[];
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
    partners: string[];
  };
  glance: {
    heading: string;
    subheading: string;
    stats: {
      value: string;
      label: string;
      detail: string;
    }[];
  };
  highlights: {
    heading: string;
    subheading: string;
    items: PgbipHighlightItem[];
  };
  scrollOpenCurriculum: {
    heading: string;
    subheading: string;
    semesters: PgbipCurriculumSemester[];
  };
  campusBanner: {
    quote: string;
    linkText: string;
    linkHref: string;
  };
  eligibility: {
    heading: string;
    subheading: string;
    criteria: {
      title: string;
      requirement: string;
      detail: string;
    }[];
    naatCompetencies: {
      num: string;
      name: string;
      desc: string;
    }[];
  };
  admission: {
    badge: string;
    heading: string;
    subheading: string;
    perks: {
      title: string;
      desc: string;
    }[];
    whatsappHref: string;
    whatsappNumber: string;
    qualificationOptions: string[];
  };
  closing: {
    badge: string;
    heading: string;
    description: string;
    perks: string[];
    applyHref: string;
    counsellorHref: string;
  };
}

export const pgbipContent: PgbipContent = {
  meta: {
    title: 'Postgraduate Business Integrated Program (PGBIP) | AIMER Business School',
    description:
      'A 2-year full-time executive postgraduate program featuring 75% experiential learning, two 6-month embedded corporate residencies, direct CXO mentorship, and ₹14.5 LPA peak package.',
    slug: '/programmes/pgbip',
  },
  hero: {
    badge: 'POSTGRADUATE BUSINESS INTEGRATED PROGRAM 2026–27',
    title: 'Postgraduate Business',
    titleAccent: 'Integrated Program',
    subtitle:
      'Engineered for ambitious graduates and working professionals. PGBIP bridges academic management frameworks with two full 6-month corporate residencies, enterprise venture execution, and direct boardroom mentorship.',
    quickStats: {
      duration: '2 Years · Full-Time',
      mode: 'On-Campus & Corporate Residency',
      internship: '12 Months (2 × 6M Residencies)',
      peakPackage: '₹14.5 LPA Peak CTC',
    },
    ctas: {
      primaryText: 'Apply via NAAT',
      primaryHref: '#admission',
      secondaryText: 'Download Brochure',
      secondaryHref: '#brochure',
    },
    pills: [
      'Direct CXO Mentorship',
      '12 Months Guaranteed Residencies',
      '₹14.5 LPA Peak Placement',
      'Dubai Global Immersion',
    ],
    video: {
      youtubeId: 'tlBWDCku3oU',
      title: 'Experience PGBIP in Action',
      description:
        'Explore our two-year flagship postgraduate business integrated program featuring two full 6-month corporate internships, C-suite mentorship, and leadership incubation.',
      runtime: '02:45',
      poster: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1600&q=80',
    },
  },
  ecosystem: {
    heading: 'Supported by Corporate & Hiring Ecosystem:',
    partners: [
      'Google for Startups',
      'Intel',
      'FICCI',
      'Klarity Management',
      'Milma',
      'Kerala Startup Mission',
      'DIFC Dubai',
      'Zil Money',
    ],
  },
  glance: {
    heading: 'Executive Architecture at a Glance',
    subheading: 'Accelerated 24-month roadmap conditioned for senior operator roles and enterprise ownership',
    stats: [
      {
        value: '2 Years',
        label: 'Program Duration',
        detail: '4 Semesters · Full-time on-campus immersion',
      },
      {
        value: '12 Months',
        label: 'Corporate Residencies',
        detail: 'Two 6-month paid internships inside enterprise partners',
      },
      {
        value: '75%',
        label: 'Experiential Practicum',
        detail: 'Live consulting, financial models & product teardowns',
      },
      {
        value: '₹14.5 LPA',
        label: 'Peak Compensation',
        detail: 'Verified batch outcome with pre-placement conversion',
      },
    ],
  },
  highlights: {
    heading: 'Program highlights',
    subheading: 'High-agency executive pedagogy built around real market stakes and direct commercial accountability',
    items: [
      {
        id: 'industry-led',
        title: 'Industry-led learning',
        badge: '25% by Industry Experts',
        description:
          '25% of the curriculum is delivered by seasoned corporate executives, managing partners, and venture operators from top regional and global firms.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'immersion',
        title: 'International Immersion & Exposure',
        badge: 'Global Mobility Desk',
        description:
          'Students participate in a 5–10 days International Immersion in Dubai (DIFC, DFF) and monthly industrial site visits across key commercial hubs.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'hands-on',
        title: 'Hands-on Learning Approach',
        badge: '75% Activity & Practical-Based',
        description:
          'Engage in live simulations, financial valuation models, enterprise strategy sprints, and venture incubation projects from semester one.',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'internships',
        title: 'Internships for Real-world Experience',
        badge: 'Two 6-Month Residencies',
        description:
          'Students complete two rigorous 6-month corporate internships inside partner enterprises, earning monthly stipends while developing verified leadership credentials.',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'bootcamps',
        title: 'Intensive Bootcamps & Workshops',
        badge: 'Leadership Sprints',
        description:
          'Executive bootcamps covering AI automation in strategy, corporate term sheets, advanced valuation, public speaking, and crisis boardroom negotiations.',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'challenges',
        title: 'Management Challenge',
        badge: 'Multi-Disciplinary Sprints',
        description:
          'Solve real enterprise challenges across Marketing, Finance, HR, Operations, and Business Scaling evaluated by visiting CXOs.',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'curriculum',
        title: 'Core Executive Curriculum',
        badge: 'Modern Management Stack',
        description:
          'Covers emerging areas including generative AI for enterprise, digital transformation, unit economics, supply chain resilience, and global capital markets.',
        image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: 'capstone',
        title: 'Capstone Project and VIVA',
        badge: 'Boardroom Presentation',
        description:
          'Tackle a comprehensive enterprise problem with live commercial data, formulate strategic interventions, and defend the solution before an external panel of industry leaders.',
        image: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  scrollOpenCurriculum: {
    heading: 'Curriculum & Corporate Residency Roadmap',
    subheading: 'Click and scroll through the 4 progressive phases of your postgraduate transformation',
    semesters: [
      {
        semester: 'Semester 01',
        phase: 'Foundational Immersion & Strategy Core',
        title: 'Enterprise Foundations & Financial Literacy',
        focus: 'Macroeconomics, Corporate Finance, Strategic Marketing & Product Analysis',
        modules: [
          'Managerial Economics & Market Structure',
          'Financial Statement Analysis & Modeling',
          'Strategic Marketing & Consumer Psychology',
          'Organizational Behavior & Executive Presence',
        ],
        deliverable: 'Live Market Teardown & Valuation Report',
      },
      {
        semester: 'Semester 02',
        phase: 'Corporate Residency I (6 Months)',
        title: 'Foundational Corporate Residency',
        focus: 'Operational execution, client deliverables & growth marketing',
        modules: [
          'On-site Corporate Embedding (Paid Monthly Stipend)',
          'B2B Sales Pipeline & Client Management',
          'Performance Marketing & Product Analytics',
          'Mid-Term Executive Review with AIMER Mentors',
        ],
        deliverable: 'Commercial KPI Milestone Delivery',
      },
      {
        semester: 'Semester 03',
        phase: 'Advanced Specialization & Global Immersion',
        title: 'Cross-Border Scale & Digital Transformation',
        focus: 'Fintech, Supply Chain Logistics, Dubai DIFC Immersion & Enterprise AI',
        modules: [
          'Global Trade Corridors & Middle East Markets',
          'AI Automation for Enterprise Operations',
          'Mergers, Acquisitions & Venture Capital',
          '5–10 Days Dubai Immersion (DIFC & DFF Visits)',
        ],
        deliverable: 'Cross-Border Investment Memorandum',
      },
      {
        semester: 'Semester 04',
        phase: 'Corporate Residency II & Capstone VIVA (6 Months)',
        title: 'Strategic Executive Residency',
        focus: 'Senior managerial ownership, PPO conversion & board presentation',
        modules: [
          'Senior Executive Corporate Residency',
          'PPO (Pre-Placement Offer) Evaluation Pathway',
          'Comprehensive Master Capstone Project',
          'Final Boardroom VIVA Defense with Corporate Panel',
        ],
        deliverable: 'Published Enterprise Capstone & Career Placement',
      },
    ],
  },
  campusBanner: {
    quote: 'At Markaz Knowledge City, a 125-acre hub in Kaithappoyil near the Wayanad foothills.',
    linkText: 'See campus & hostel →',
    linkHref: '/#campus',
  },
  eligibility: {
    heading: 'Eligibility criteria for PGBIP',
    subheading: 'Rigorous admissions benchmarking evaluating ambition, logical aptitude, and leadership capacity',
    criteria: [
      {
        title: 'Educational Qualification',
        requirement: 'Bachelor’s Degree or Professional Qualification',
        detail:
          'Minimum 3-year Bachelor’s degree from a recognized university in any discipline. Professional candidates with ACCA (all 13 papers completed) or ICMAI (final level completed) are also eligible.',
      },
      {
        title: 'Language Proficiency',
        requirement: 'Professional English Command',
        detail:
          'Fluent command of English across professional verbal communication, executive writing, and presentation.',
      },
      {
        title: 'Entrance Requirements',
        requirement: 'Personal Interview & NAAT',
        detail:
          'Comprehensive performance in the National AIMER Admission Test (NAAT) followed by a 1:1 interview with academic directors and industry practitioners.',
      },
      {
        title: 'Demonstrated Passion',
        requirement: 'High Agency & Commercial Mindset',
        detail:
          'Demonstrated ambition in corporate leadership, startup venture building, or strategic enterprise scaling.',
      },
    ],
    naatCompetencies: [
      { num: '01', name: 'Decision-Making Under Pressure', desc: 'Evaluates logical prioritization in complex business trade-offs.' },
      { num: '02', name: 'Problem-Solving & Data Acumen', desc: 'Tests analytical reasoning, pattern discovery, and quantitative breakdown.' },
      { num: '03', name: 'Adaptability & Agility', desc: 'Gauges resilience and rapid learning curves in dynamic market scenarios.' },
      { num: '04', name: 'Strategic Thinking', desc: 'Measures commercial intuition, unit economics, and enterprise vision.' },
    ],
  },
  admission: {
    badge: 'ADMISSIONS 2026–27 · EXECUTIVE INTAKE',
    heading: 'Begin Your Journey in PGBIP',
    subheading:
      'Take the first step toward career acceleration. Register your interest for the Postgraduate Business Integrated Program to schedule your personal interview and check scholarship eligibility.',
    perks: [
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
        desc: 'Early access to corporate residency opportunities and executive leadership tracks.',
      },
    ],
    whatsappHref: 'https://wa.me/917450030600?text=Hi%20AIMER,%20I%20have%20a%20question%20about%20PGBIP%20admissions.',
    whatsappNumber: '+91 74500 30600',
    qualificationOptions: [
      'Final Year Undergraduate Student',
      'Bachelor’s Degree Graduate',
      'Working Professional (0–3 Years Experience)',
      'CA / CMA / ACCA Professional Candidate',
    ],
  },
  closing: {
    badge: 'ADMISSIONS 2026–27 · NAAT OPEN',
    heading: 'Accelerate Your Management Career at AIMER',
    description:
      'Two-year full-time postgraduate business program with two 6-month corporate residencies, direct CXO mentorship, and scholarships up to 100%.',
    perks: [
      'Merit scholarships for top 10% in NAAT',
      'Direct CXO masterclasses with 25+ founders',
      'Guaranteed corporate internship placements',
    ],
    applyHref: '#admission',
    counsellorHref: 'https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20talk%20to%20an%20admissions%20counsellor',
  },
};

