'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Programme } from '@/types';

interface FooterProps {
  programmes: Programme[];
}

export const Footer: React.FC<FooterProps> = ({ programmes }) => {
  return (
    <footer className="bg-charcoal-950 text-white pt-20 pb-12 border-t border-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-charcoal-800">
          {/* Col 1: Institutional Brand & Bio (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative h-12 w-48 inline-block">
              <Image
                src="/logo/Aimer.png"
                alt="AIMER Business School"
                fill
                className="object-contain object-left"
                sizes="192px"
              />
            </div>

            <p className="text-xs sm:text-sm text-charcoal-300 leading-relaxed font-light">
              AIMER Business School is South India’s leading practice-led business institution located at Markaz Knowledge City, Calicut.
              Pioneering 75% enterprise practicum, embedded corporate residencies, and global mobility corridors.
            </p>

            <div className="text-xs text-charcoal-400 space-y-1">
              <div>🏆 Best Practice-Led B-School — South India</div>
              <div>🤝 Kerala Startup Mission (KSUM) Partner Ecosystem</div>
              <div>📚 NEP 2020 Aligned Experiential Architecture</div>
            </div>
          </div>

          {/* Col 2: Degree Pathways (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-aimer-400">
              Programmes of Study
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-300">
              {programmes.map((p) => (
                <li key={p.id}>
                  <Link
                    href={
                      p.id === 'ugbip'
                        ? '/programmes/ugbip'
                        : p.id === 'pgbip'
                        ? '/programmes/pgbip'
                        : p.id === 'hsbip'
                        ? '/programmes/hsbip'
                        : '/#programmes'
                    }
                    className="hover:text-aimer-400 transition-colors flex items-center justify-between group"
                  >
                    <span>{p.title}</span>
                    <span className="text-[10px] text-charcoal-500 group-hover:text-aimer-300">
                      {p.shortTitle}
                    </span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/#admissions"
                  className="text-aimer-400 hover:text-aimer-300 font-medium inline-flex items-center gap-1"
                >
                  <span>NAAT 2026 Admissions</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Institutional Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-aimer-400">
              Institution
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-charcoal-300">
              <li>
                <Link href="/about" className="hover:text-aimer-400 transition-colors font-medium text-white">
                  About AIMER
                </Link>
              </li>
              <li>
                <Link href="/parents" className="hover:text-aimer-400 transition-colors font-medium text-white">
                  Parents Guide
                </Link>
              </li>
              <li>
                <Link href="/#method" className="hover:text-aimer-400 transition-colors">
                  The AIMER Method
                </Link>
              </li>
              <li>
                <Link href="/#outcomes" className="hover:text-aimer-400 transition-colors">
                  Student Outcomes
                </Link>
              </li>
              <li>
                <Link href="#mentors" className="hover:text-aimer-400 transition-colors">
                  CXO Mentors & Founders
                </Link>
              </li>
              <li>
                <Link href="#campus" className="hover:text-aimer-400 transition-colors">
                  Knowledge City Campus
                </Link>
              </li>
              <li>
                <a
                  href="https://wa.me/917450030600?text=Hi%20AIMER,%20I%20would%20like%20to%20book%20a%20campus%20tour"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-aimer-400 transition-colors"
                >
                  Book a Campus Tour
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Campus Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="text-xs font-semibold uppercase tracking-wider text-aimer-400">
              Campus & Admissions
            </div>
            <div className="space-y-3 text-xs text-charcoal-300 leading-relaxed">
              <div>
                <strong className="text-white block font-medium">AIMER Business School</strong>
                Markaz Knowledge City, Kannamparambu, Kaithapoyil, Calicut, Kerala 673580, India
              </div>
              <div className="pt-1">
                <span className="text-charcoal-400 block">Admissions Desk:</span>
                <a href="tel:+917450030600" className="text-white font-medium hover:text-aimer-400 transition-colors">
                  +91 74500 30600
                </a>
              </div>
              <div>
                <span className="text-charcoal-400 block">Direct Inquiries:</span>
                <a href="mailto:admissions@aimerbschool.com" className="text-white font-medium hover:text-aimer-400 transition-colors">
                  admissions@aimerbschool.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Strip: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-400 gap-4">
          <div>
            &copy; {new Date().getFullYear()} AIMER Business School. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Markaz Knowledge City</span>
            <span>•</span>
            <span>Experiential Commerce</span>
            <span>•</span>
            <span>NAAT 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

