export interface AboutHeroStat {
  label: string;
  value: string;
  suffix: string;
  desc: string;
}

export interface AboutFeatureRow {
  index: string;
  eyebrow: string;
  heading: string;
  text: string;
  image: string;
  alt: string;
}

export interface AboutValueItem {
  num: string;
  title: string;
  description: string;
}

export interface AboutCampusPoint {
  index: string;
  title: string;
  description: string;
}

export interface AboutLeader {
  id: string;
  name: string;
  role: string;
  organization: string;
  image: string;
  initials: string;
  focalPosition?: string;
}

export interface AboutTransformationStep {
  num: string;
  label: string;
  description: string;
}

export interface AboutContent {
  meta: {
    title: string;
    description: string;
    canonical: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    paragraph: string;
    videoDuration: string;
    stats: AboutHeroStat[];
  };
  features: AboutFeatureRow[];
  visionMission: {
    visionEyebrow: string;
    visionHeading: string;
    visionStatement: string;
    missionEyebrow: string;
    missionHeading: string;
    missionStatement: string;
  };
  values: {
    heading: string;
    items: AboutValueItem[];
  };
  campus: {
    eyebrow: string;
    heading: string;
    image: string;
    alt: string;
    points: AboutCampusPoint[];
  };
  founder: {
    eyebrow: string;
    heading: string;
    image: string;
    alt: string;
    salutation: string;
    paragraph1: string;
    paragraph2: string;
    closing: string;
    name: string;
    role: string;
  };
  leadership: {
    eyebrow: string;
    heading: string;
    members: AboutLeader[];
  };
  transformation: {
    eyebrow: string;
    heading: string;
    description: string;
    steps: AboutTransformationStep[];
  };
  faculty: {
    eyebrow: string;
    heading: string;
    description: string;
    seeFacultyHref: string;
    teachHref: string;
  };
  closing: {
    badge: string;
    heading: string;
    description: string;
    bullets: string[];
    naatDate: string | null;
    applyHref: string;
    whatsappUrl: string;
  };
  newsletter: {
    heading: string;
    description: string;
    consentText: string;
  };
}

export const ABOUT_VIDEO_CONFIG = {
  webmUrl: 'https://aimerbschool.com/assets/video/aimer-film-1080.webm',
  mp4Url: '/campus-video/hero-1080.mp4',
  poster: '/About-Images/campus-main-building.webp',
  runtime: '02:14',
};

// Check if next NAAT date is in future
const NAAT_DATE_STRING = '2026-03-29'; // Sunday, 29 March 2026
const isNaatInFuture = (): string | null => {
  try {
    const naatDate = new Date(NAAT_DATE_STRING);
    const now = new Date();
    if (naatDate > now) {
      return 'Next NAAT: Sunday, 29 March 2026';
    }
  } catch {
    // ignore
  }
  return null;
};

export const aboutContent: AboutContent = {
  meta: {
    title: 'About AIMER Business School | Experiential Business Education',
    description:
      'Discover AIMER Business School at Markaz Knowledge City, Calicut. Pioneering 75% enterprise practicum, CXO mentorship, and transformational business leadership.',
    canonical: 'https://www.aimerbschool.com/about',
  },
  hero: {
    eyebrow: 'About AIMER • Markaz Knowledge City',
    title: 'About',
    titleAccent: 'AIMER',
    paragraph:
      "At AIMER Business School, disruption isn't just a buzzword - it's a way of life, turning big ideas into bigger realities. Here, industry-led business education breaks free from tradition, equipping students with the mindset and tools to stand out, innovate, and lead with confidence.",
    videoDuration: '02:14',
    stats: [
      {
        label: 'Campus Ecosystem',
        value: '125',
        suffix: 'Acres',
        desc: 'Smart city campus at Markaz Knowledge City, Calicut',
      },
      {
        label: 'Experiential Pedagogy',
        value: '75%',
        suffix: 'Practicum',
        desc: 'Live business labs, studio builds & simulation',
      },
      {
        label: 'Enterprise Network',
        value: '100+',
        suffix: 'Partners',
        desc: 'Direct CXO mentorship & corporate residencies',
      },
      {
        label: 'International Mobility',
        value: '100%',
        suffix: 'Participation',
        desc: 'Global immersion trips & cross-border corridors',
      },
    ],
  },
  features: [
    {
      index: '01',
      eyebrow: 'Collaborative Labs',
      heading: 'Digital Business & Venture Incubation',
      text: 'Students work directly on live enterprise sprints, financial models, and pitch decks.',
      image: '/About-Images/aimer-students-laptops-focused.jpg',
      alt: 'AIMER Business School students working on practical digital business ventures',
    },
    {
      index: '02',
      eyebrow: 'Executive Dialogue',
      heading: 'Direct CXO Masterclasses',
      text: 'Unfiltered insights from operating entrepreneurs, CEOs, and industry practitioners.',
      image: '/About-Images/aimer-cxo-speaker-stage.jpg',
      alt: 'CXO Speaker addressing AIMER cohort from stage',
    },
  ],
  visionMission: {
    visionEyebrow: 'Vision & Mission',
    visionHeading: 'Our Vision',
    visionStatement:
      'To be a globally recognized business school that pioneers experiential learning, shaping visionary leaders and entrepreneurs who drive sustainable economic and social transformation.',
    missionEyebrow: 'Mission',
    missionHeading: 'Our Mission',
    missionStatement:
      'To deliver innovative, industry-integrated education that bridges the gap between academic theory and practical business reality. We empower our students with the skills, mindset, and ethical foundation to excel in a dynamic global environment.',
  },
  values: {
    heading: 'Our Values',
    items: [
      {
        num: '01',
        title: 'High agency',
        description:
          'Taking full ownership of outcomes and driving change without waiting for permission.',
      },
      {
        num: '02',
        title: 'Curiosity',
        description:
          "Maintaining an insatiable desire to learn, explore, and understand the deeper 'why'.",
      },
      {
        num: '03',
        title: 'Truth over image',
        description:
          'Prioritizing radical honesty and real substance over superficial appearances.',
      },
      {
        num: '04',
        title: 'Long-term thinking',
        description:
          'Making decisions that compound over time rather than chasing short-term gains.',
      },
      {
        num: '05',
        title: 'Consistency over hype',
        description:
          'Valuing steady, compounding progress and reliable execution over fleeting trends.',
      },
    ],
  },
  campus: {
    eyebrow: 'Campus & Infrastructure',
    heading: 'Markaz Knowledge City',
    image: '/campus/aimer-img.jpg',
    alt: 'AIMER Business School campus main building at Markaz Knowledge City',
    points: [
      {
        index: '01',
        title: 'Integrated Township',
        description:
          'Markaz Knowledge City (MKC), a 125-acre hub in Kaithappoyil, Kerala, near the Wayanad foothills.',
      },
      {
        index: '02',
        title: 'Centre of Excellence',
        description:
          'A premier destination for education, healthcare, culture, and entrepreneurship.',
      },
      {
        index: '03',
        title: 'Serene Location',
        description:
          'Set amidst lush greenery and hills, offering a peaceful environment for learning and living.',
      },
    ],
  },
  founder: {
    eyebrow: 'Message from the founder',
    heading: 'Message from the founder',
    image: '/About-Images/board-member/muhammed-mon-thekkayil.jpg',
    alt: 'Mr. Muhammed Mon, Founder of AIMER Business School',
    salutation: 'Dear Students and Parents,',
    paragraph1:
      "Welcome to AIMER Business School - where we redefine Business Education by bridging academic excellence with real-world application with India's first ever PG Business Integrated Program.",
    paragraph2:
      'This is an era of rapid transformation, where knowledge alone is not enough. Our mission is to cultivate these attributes in every student who walks through our doors. We are proud to pioneer a transformative approach to education in Kerala, emphasising Experiential Learning as a core component of our curriculum. Whether your goal is to lead an organization, build a startup, or create meaningful change, AIMER equips you with the skills, network, and mindset to thrive.',
    closing: "Join us and discover what it truly means to gain an edge in today's competitive world.",
    name: 'Mr. Muhammed Mon',
    role: 'Founder',
  },
  leadership: {
    eyebrow: 'Visionary Governance',
    heading: 'Leadership Team',
    members: [
      {
        id: 'muhammed-mon',
        name: 'Muhammed Mon Thekkayil',
        role: 'Founder',
        organization: 'DiMOIS Training Institute',
        image: '/About-Images/board-member/muhammed-mon-thekkayil.jpg',
        initials: 'DM',
      },
      {
        id: 'abdul-hakim-azhari',
        name: 'Dr. Abdul Hakim Azhari',
        role: 'Director',
        organization: 'Markaz Knowledge City & Jamia Markaz',
        image: '/About-Images/board-member/dr-abdul-hakim-azhari.jpg',
        initials: 'MKC',
        focalPosition: '60% 20%',
      },
      {
        id: 'muhammed-arakkal-bava',
        name: 'Muhammed Arakkal Bava',
        role: 'Director',
        organization: 'DMS Hospital LLP',
        image: '/About-Images/board-member/muhammed-arakkal-bava.jpg',
        initials: 'DMS',
      },
      {
        id: 'muneer-muhammed',
        name: 'Muneer Muhammed',
        role: 'Executive Director',
        organization: "DUNKIN'",
        image: '/About-Images/board-member/muneer-muhammed.jpg',
        initials: 'DK',
      },
    ],
  },
  transformation: {
    eyebrow: '5-Stage Pathway',
    heading: 'The AIMER Transformation',
    description:
      'A structured progression engineered to turn aspiring high-school and undergraduate students into autonomous enterprise leaders.',
    steps: [
      {
        num: '01',
        label: 'Entry',
        description: 'Orientation, mindset calibration, and immersive baseline skill auditing.',
      },
      {
        num: '02',
        label: 'Exploration',
        description: 'Multi-disciplinary business sprint challenges, simulations, and case-study debates.',
      },
      {
        num: '03',
        label: 'Internship',
        description: 'Embedded corporate residencies with operational teams and verified stipends.',
      },
      {
        num: '04',
        label: 'Leadership Development',
        description: 'Executive presence coaching, Outbound Training (OBT), and boardroom defenses.',
      },
      {
        num: '05',
        label: 'Startup / CxO-Level Pathways',
        description: 'Venture launch via Junior Venture Studio or fast-track executive placement.',
      },
    ],
  },
  faculty: {
    eyebrow: 'Academic Leadership',
    heading: 'Meet the faculty',
    // TODO: Client must confirm the wording (source text: "25% faculty, 25% visiting faculty and industry experts from companies across Kerala.")
    description:
      '25% faculty, 25% visiting faculty and industry experts from companies across Kerala.',
    seeFacultyHref: '/#faculty',
    teachHref: '/careers',
  },
  closing: {
    badge: 'Markaz Knowledge City · Admissions 2026–27 · NAAT open',
    heading: 'Start your business journey at AIMER',
    description:
      'HSBIP · UGBIP · PGBIP programmes with dual-degree options, 12 months corporate residency and scholarships up to 100%.',
    bullets: [
      'Merit scholarships for top 10% in NAAT',
      'Industry mentorship with 25+ CXOs',
      'Guaranteed corporate internship placements',
    ],
    naatDate: isNaatInFuture(),
    applyHref: '/admissions#apply',
    whatsappUrl:
      'https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20talk%20to%20an%20admissions%20counsellor',
  },
  newsletter: {
    heading: 'Subscribe to our Newsletter',
    description: 'Get the latest insights, campus news, and corporate updates straight to your inbox.',
    consentText: 'I agree to receive emails from AIMER Business School.',
  },
};

