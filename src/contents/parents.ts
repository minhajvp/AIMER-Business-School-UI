export interface ParentHeroStat {
  label: string;
  value: string;
  suffix: string;
  desc: string;
}

export interface ParentPillar {
  num: string;
  title: string;
  description: string;
  tag: string;
}

export interface ParentFaq {
  question: string;
  answer: string;
}

export interface ParentsContent {
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
    counsellorUrl: string;
    tourHref: string;
    stats: ParentHeroStat[];
  };
  pillars: {
    eyebrow: string;
    heading: string;
    description: string;
    items: ParentPillar[];
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    location: string;
    badge: string;
  };
  faqs: {
    eyebrow: string;
    heading: string;
    description: string;
    items: ParentFaq[];
  };
  visit: {
    eyebrow: string;
    heading: string;
    description: string;
    phone: string;
    phoneTel: string;
    bookTourHref: string;
    image: string;
    alt: string;
  };
  closing: {
    badge: string;
    heading: string;
    description: string;
    bullets: string[];
    applyHref: string;
    whatsappUrl: string;
    naatDate: string | null;
  };
  newsletter: {
    heading: string;
    description: string;
    consentText: string;
  };
}

export const parentsContent: ParentsContent = {
  meta: {
    title: "A Parent's Guide to AIMER | Safe, Disciplined & Career-Driven",
    description:
      "Choosing the right business school is a family decision. Discover how AIMER ensures campus safety, 24/7 security, modern hostels, 1:1 faculty mentorship, and verified corporate ROI.",
    canonical: 'https://www.aimerbschool.com/parents',
  },
  hero: {
    eyebrow: "A Parent's Guide to AIMER • Markaz Knowledge City",
    title: "Your Child's Ambition in",
    titleAccent: 'Safe, Disciplined Hands.',
    paragraph:
      'We understand that choosing the right business school is a family decision. Here is how AIMER ensures total campus safety, personal well-being, disciplined growth, and unmatched career return on investment.',
    counsellorUrl:
      'https://wa.me/917450030600?text=Hello%20AIMER,%20I%20am%20a%20parent%20and%20would%20like%20to%20speak%20with%20an%20admissions%20counsellor.',
    tourHref: '#campus-visit',
    stats: [
      {
        label: 'Integrated Eco-Township',
        value: '125',
        suffix: 'Acres',
        desc: 'Self-contained, tranquil campus environment at Markaz Knowledge City.',
      },
      {
        label: 'Security & Surveillance',
        value: '24/7',
        suffix: 'CCTV',
        desc: 'Controlled checkpoints, biometric gates, and round-the-clock safety patrols.',
      },
      {
        label: 'Residential Discipline',
        value: '100%',
        suffix: 'Protected',
        desc: 'Strict anti-ragging enforcement and 8:30 PM monitored hostel curfews.',
      },
      {
        label: 'Pre-Graduation Earnings',
        value: '₹50k',
        suffix: '/mo',
        desc: 'Paid corporate stipends directly offsetting family educational costs.',
      },
    ],
  },
  pillars: {
    eyebrow: 'The Pillars of Parent Trust',
    heading: 'Security, Moral Grounding & Professional Acceleration',
    description:
      'Every aspect of our campus and residential life is designed for holistic security, moral grounding, and professional acceleration.',
    items: [
      {
        num: '01',
        title: 'Gated Township & 24/7 Security',
        description:
          'Situated inside Markaz Knowledge City, a 125-acre integrated, peaceful township with controlled security checkpoints, round-the-clock CCTV surveillance, biometric access, and a strictly enforced anti-ragging protocol.',
        tag: 'Physical Safety',
      },
      {
        num: '02',
        title: 'Separate Modern Hostels',
        description:
          'Dedicated, secure hostel buildings for male and female students with resident faculty wardens. Comfortable furnished rooms, study halls, high-speed Wi-Fi, laundry facilities, and disciplined evening curfews.',
        tag: 'Residential Life',
      },
      {
        num: '03',
        title: 'Nutritious Multi-Cuisine Dining',
        description:
          'Hygienic campus dining serving wholesome South Indian, North Indian, and continental meal options prepared under strict culinary sanitation standards. Special dietary requirements are supported.',
        tag: 'Health & Nutrition',
      },
      {
        num: '04',
        title: '1:1 Faculty Mentorship & Tracking',
        description:
          'Every student is paired with a dedicated faculty mentor who monitors attendance, academic progress, and emotional well-being. Parents receive regular term progress reports and direct counsellor contact channels.',
        tag: 'Academic Mentorship',
      },
      {
        num: '05',
        title: 'Fee Transparency & 0% Interest EMI',
        description:
          'No hidden charges. We provide transparent fee breakdowns covering tuition, study materials, and hostel accommodation, coupled with flexible 0% interest monthly installment plans and bank education loan sanction support.',
        tag: 'Financial Clarity',
      },
      {
        num: '06',
        title: 'Verified ROI & Corporate Stipends',
        description:
          'With up to 12 months of live corporate internships, students earn monthly stipends (up to ₹50,000/mo) before graduation, drastically offsetting educational costs and giving them a competitive edge in final placements.',
        tag: 'Career Outcomes',
      },
    ],
  },
  testimonial: {
    quote:
      'As parents living outside Kerala, our biggest concern was safety and finding an institution that values discipline just as much as career success. AIMER exceeded our expectations. The residential life inside Markaz Knowledge City gave us complete peace of mind, and watching our son present real corporate deliverables during his internship proved we made the right choice.',
    author: 'Mr. & Mrs. Abdul Rasheed',
    role: 'Parent of UGBIP Scholar',
    location: 'Bangalore, India',
    badge: 'Verified Parent Perspective',
  },
  faqs: {
    eyebrow: 'Parent Inquiries',
    heading: 'Frequently Asked Questions by Parents',
    description:
      'Direct answers to common questions about admissions, campus security, residential life, and financial planning.',
    items: [
      {
        question: 'Can parents visit the campus and inspect the hostel rooms beforehand?',
        answer:
          'Yes, absolutely. We encourage prospective students and parents to book a guided campus tour. You can walk through the academic classrooms, incubation labs, library, dining commons, and student hostels, and interact directly with our wardens and faculty.',
      },
      {
        question: 'What medical and healthcare facilities are available in case of emergency?',
        answer:
          'Markaz Knowledge City has fully functional medical centers, first-aid suites, and dedicated on-call doctor support within minutes. In addition, partner multispecialty hospitals are located nearby with 24/7 dedicated ambulance standby.',
      },
      {
        question: 'What is the student curfew and attendance policy?',
        answer:
          'Hostels enforce a strict 8:30 PM entry curfew for student safety. Weekend passes and leave applications require verified parental approval via our digital student portal before departure.',
      },
      {
        question: 'How does AIMER help with education loans and EMI plans?',
        answer:
          'Our admissions office provides dedicated documentation support for nationalized and private bank education loans. We also offer institutional 0% interest monthly installment schemes so fees can be split affordably across terms.',
      },
    ],
  },
  visit: {
    eyebrow: 'Family Campus Immersion',
    heading: 'Visit AIMER with Your Family',
    description:
      'Experience our campus, talk to faculty mentors, and see our students in action. We would be honored to host you and your family for a comprehensive guided tour.',
    phone: '+91 97784 11884',
    phoneTel: 'tel:+919778411884',
    bookTourHref:
      'https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20book%20a%20family%20campus%20tour',
    image: '/campus/aimer-img.jpg',
    alt: 'Aerial view of Markaz Knowledge City campus layout',
  },
  closing: {
    badge: 'Admissions 2026–27 · NAAT open',
    heading: "Start your child's business journey at AIMER",
    description:
      'HSBIP · UGBIP · PGBIP programmes with dual-degree options, 12 months corporate residency and scholarships up to 100%.',
    bullets: [
      'Merit scholarships for top 10% in NAAT',
      'Industry mentorship with 25+ CXOs',
      'Guaranteed corporate internship placements',
    ],
    applyHref: '/#admissions',
    whatsappUrl:
      'https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20talk%20to%20an%20admissions%20counsellor',
    naatDate: null,
  },
  newsletter: {
    heading: 'Subscribe to our Newsletter',
    description:
      'Get the latest insights, campus news, and corporate updates straight to your inbox.',
    consentText: 'I agree to receive emails from AIMER Business School.',
  },
};

