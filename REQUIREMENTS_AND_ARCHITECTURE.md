# AIMER Business School — Technical Requirements & Architecture Specification

> **Project**: AIMER Business School Web Platform  
> **Framework**: Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS  
> **Version**: 1.0.0  
> **Repository**: [https://github.com/minhajvp/AIMER-Business-School-UI.git](https://github.com/minhajvp/AIMER-Business-School-UI.git)  

---

## 1. System & Technical Prerequisites

To install, develop, or run this project locally, ensure your environment meets the following specifications:

| Requirement | Supported Version / Specification | Notes |
| :--- | :--- | :--- |
| **Node.js** | `>= 18.18.0` (Recommended: `v20.x` or `v22.x` LTS) | Node 19 is not recommended for production. |
| **Package Manager** | `npm` (`>= 9.x`), `pnpm` (`>= 8.x`), or `yarn` (`>= 1.22.x`) | Built and tested with `npm` (lockfile provided). |
| **OS** | Windows, macOS, or Linux | Fully cross-platform compatible. |
| **Modern Browser** | Chrome 110+, Edge 110+, Safari 16+, Firefox 115+ | Requires CSS Grid, Flexbox, and Modern ES2022. |

---

## 2. Technology Stack & Dependencies

```
┌────────────────────────────────────────────────────────┐
│                      Next.js 15                        │
│                (App Router + Turbopack)                │
├──────────────────────────┬─────────────────────────────┤
│         React 19         │         TypeScript          │
│   (Server + Client Comps)│       (Strict Typing)       │
├──────────────────────────┼─────────────────────────────┤
│       Tailwind CSS       │       clsx + twMerge        │
│   (Custom Design Tokens) │   (Dynamic Class Merging)   │
└──────────────────────────┴─────────────────────────────┘
```

### Production Dependencies (`package.json`)
- **`next` (`^15.1.0`)**: Next.js 15 App Router providing hybrid server-side rendering, static site generation (`SSG`), and automatic route segment optimization.
- **`react` & `react-dom` (`^19.0.0`)**: React 19 core library utilizing modern concurrent features, native metadata support, and React Server Components (`RSC`).
- **`clsx` (`^2.1.1`) & `tailwind-merge` (`^2.6.0`)**: Efficient conditional CSS class composition with deduplication.
- **`lucide-react` (`^0.469.0`)**: High-performance SVG glyphs and institutional iconography.
- **`framer-motion` (`^12.0.0`)**: Available in project for optional declarative motion.

### Developer Dependencies
- **`typescript` (`^5.7.2`)**: Full end-to-end type safety across content schemas, components, and API routes.
- **`tailwindcss` (`^3.4.17`)** & **`postcss` (`^8.4.49`)**: Utility-first CSS engine customized with institutional tokens.
- **`@next/bundle-analyzer` (`^16.4.6`)**: Visual bundle breakdown analysis for tracking bundle weights.

---

## 3. Brand Identity & Design System

The platform reflects an editorial, academic, and premium institutional aesthetic. It purposefully eliminates generic templates, card boxes, glassmorphism, heavy drop-shadows, and emojis.

### A. Color Palette (`tailwind.config.ts`)

#### 1. Official AIMER Teal (`aimer-*`)
The signature brand accent communicating innovation, corporate mobility, and prestige:
- `aimer-50`: `#F2F9F9` (Subtle tinted backgrounds)
- `aimer-100`: `#E2F3F3` (Selection highlights, soft badges)
- `aimer-200`: `#C3E6E6`
- `aimer-300`: `#96D3D5`
- `aimer-400`: `#5DB7BC` (Accent links, hover indicators)
- **`aimer-500`: `#168C9B` (Official AIMER Primary Brand Teal)**
- **`aimer-600`: `#0F7684` (Primary CTAs, active buttons, focus states)**
- **`aimer-700`: `#086C78` (Deep Teal for headings and high-contrast text)**
- `aimer-800`: `#09535D`
- `aimer-900`: `#0B454D`
- `aimer-950`: `#052B31` (Dark banner containers, high contrast badges)

#### 2. Editorial Charcoal (`charcoal-*`)
Provides clean typography and contrast without harsh pure black:
- `charcoal-50`: `#F6F7F7` (Alternate section backgrounds)
- `charcoal-100`: `#EDEFF0` (Subtle image placeholders and borders)
- `charcoal-200`: `#D8DCDE` (Primary hairline dividers: `border-charcoal-200/70`)
- `charcoal-300`: `#B8C0C4` (Muted labels and borders)
- `charcoal-400`: `#8D9A9F` (Sub-bullets and secondary notes)
- `charcoal-500`: `#69767B`
- `charcoal-600`: `#4F595E` (Body paragraph text)
- `charcoal-700`: `#3E464A` (Emphasized body text)
- `charcoal-800`: `#272C2F` (Deep dark text)
- **`charcoal-900`: `#171B1D` (Official Charcoal for H1, H2, and high-impact headings)**
- **`charcoal-950`: `#0D0F10` (Dark closing banners and footer background)**

#### 3. Aqua Ambient Tints (`aqua-*`)
- `aqua.subtle`: `#EAF7F6`
- `aqua.tint`: `#F4FAFA` (Founder message and testimonial cards)
- `aqua.surface`: `#F9FCFC`

---

### B. Typography Specifications

- **Primary Font**: `Poppins` (Google Font with weights 300, 400, 500, 600, 700).
- **Fallbacks**: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
- **Typographic Scale**:
  - **Display H1**: `clamp(2.75rem, 6.5vw, 6.5rem)` to `clamp(4rem, 10vw, 10.25rem)` (tight letter spacing: `-0.04em`, line-height `0.92` to `0.98`).
  - **Section H2**: `clamp(1.875rem, 3.5vw, 3rem)` (tight letter spacing: `-0.02em`).
  - **Pillar/Card H3**: `1.25rem` to `1.5rem` (`font-bold`).
  - **Eyebrow / Badges**: `10px` to `12px` (`uppercase font-semibold tracking-widest`).
  - **Mono Numerals**: `font-mono` (`01`, `02`, etc.) in `text-aimer-600` for ordered rows.

---

### C. Visual Rules & Editorial Guidelines

1. **Square & Crisp Edges**: Square corners on all cards, feature image containers, and layout grids. The only rounded elements permitted are:
   - Primary and secondary Pill Buttons (`rounded-full`).
   - Circular play triggers (e.g., 44px circular outlined film buttons).
   - Category tag pills.
2. **Hairline Dividers**: Content rows are separated by crisp `1px` hairlines (`border-charcoal-200/70` or `border-charcoal-200/80`). No heavy card shadows or thick borders.
3. **No Decorative Dash or Dot Patterns**: Dotted and dashed background grids were intentionally removed to maintain clean, flat backgrounds with soft editorial tint bands (`#F4FAFA`).
4. **Accessible Contrast**: WCAG 2.1 AA/AAA compliance across all sections. Muted video backdrops feature directional linear scrims (`from-white/95 via-white/75 to-white/35`) to ensure black text passes contrast checks over moving video.

---

## 4. Platform Architecture & Directory Structure

```
AIMER-Business-School-UI/
├── public/                       # Static assets served at root
│   ├── About-Images/             # Photography (labs, CXO masterclasses, board portraits)
│   ├── brochure/                 # Downloadable PDF prospectuses (HSBIP, UGBIP, PGBIP)
│   ├── campus/                   # Architectural campus illustrations & diagrams
│   ├── campus-video/             # Cinematic 1080p hero loop (hero-1080.mp4)
│   ├── logo/                     # Institutional logos (aimer-logo.png, Aimer.png)
│   └── icon.png                  # Favicon & Web App icon
├── content/                      # Scraped & verified markdown copy source files
│   ├── about.md                  # Institutional story, vision, leadership copy
│   ├── parents.md                # Parent trust pillars, safety guidelines, FAQs
│   └── programmes/               # Raw markdown copy for UGBIP, PGBIP, HSBIP
├── src/
│   ├── app/                      # Next.js App Router root
│   │   ├── layout.tsx            # Global root layout with metadata, fonts, styles
│   │   ├── page.tsx              # Home Page (practice-led degree pathways, method)
│   │   ├── about/page.tsx        # Institutional About Page (/about)
│   │   ├── parents/page.tsx      # Parents Trust Guide (/parents)
│   │   ├── programmes/
│   │   │   ├── ugbip/page.tsx    # Undergraduate Program (3 Years, 75% Practicum)
│   │   │   ├── pgbip/page.tsx    # Postgraduate Program (2 Years, Corporate Immersion)
│   │   │   └── hsbip/page.tsx    # Higher Secondary Program (+1 & +2 Residential)
│   │   ├── sitemap.ts            # XML Sitemap generator for search engines
│   │   ├── icon.png              # App Router icon handler
│   │   └── globals.css           # Global Tailwind and brand utilities
│   ├── components/               # Modular UI component library
│   │   ├── about/                # About page components (Hero, Features, Vision, Leadership)
│   │   ├── parents/              # Parents page components (Hero, Pillars, FAQs, Visit)
│   │   ├── ugbip/                # UGBIP curriculum and immersion components
│   │   ├── pgbip/                # PGBIP program components
│   │   ├── hsbip/                # HSBIP residential components
│   │   ├── navbar/               # Global Header, MegaMenu, Mobile Drawer, Active Indicator
│   │   ├── footer/               # Institutional footer with degree links & accreditations
│   │   ├── hero/                 # Home Hero section with drawing animation
│   │   └── ui/                   # Reusable UI primitives (SectionBadge, BrochureModal)
│   ├── contents/                 # Cleaned, typed content objects (single source of truth)
│   │   ├── about.ts              # About page typed content object
│   │   ├── parents.ts            # Parents page typed content object
│   │   └── programmes/           # Typed content for UGBIP, PGBIP, HSBIP
│   ├── data/                     # Global mock and static structured data
│   │   └── programmes.data.ts    # Centralized programme list, IDs, durations, links
│   └── types/                    # TypeScript interfaces & types
├── tailwind.config.ts            # Tailwind custom colors, typography, letter-spacing
├── next.config.mjs               # Next.js compiler flags & bundle analysis settings
├── tsconfig.json                 # TypeScript compiler configuration
├── PERFORMANCE_REPORT.md         # Comprehensive Lighthouse & bundle optimization report
└── README.md                     # Quickstart & developer onboarding guide
```

---

## 5. Page Specifications & Features

### 1. Home Page (`/`)
- **Hero**: Practice-led positioning with interactive coordinate stroke SVG animation.
- **11 Pillars & Practicum**: Highlights the 75% practical learning methodology.
- **Dynamic Program Tabs**: Interactive switcher for UGBIP, PGBIP, HSBIP, and Executive courses.
- **CXO Mentors Rail**: Showcase of visiting corporate leaders and faculty directors.
- **NAAT Fast-Track Admissions**: Direct application form with callback scheduling.

### 2. About Page (`/about`)
- **Hero Video Loop**: Hardware-accelerated background video (`/campus-video/hero-1080.mp4`) with entrance mask animation and quartic count-up stats (125 Acres, 75% Practicum, 100+ Partners, 100% Mobility).
- **Lightbox Film Modal**: High-definition video player with custom controls, focus trapping, and Esc key listeners.
- **Alternating Features**: Digital Venture Incubation and Direct CXO Masterclasses with responsive `aspect-[4/3]` photography.
- **Interactive Vision**: Word-by-word scroll fill animation alongside split mission narrative.
- **Institutional Values Accordion**: 5 expandable values with animated hairline draws.
- **21:9 Campus Layout**: Panoramic visual of Markaz Knowledge City with hover zoom.
- **Founder’s Message**: Framed 4:5 portrait with offset primary accent outline.
- **Leadership Team**: Interactive desktop expandable panels (`flex-grow: 2.6` vs `1.0`).
- **5-Stage Transformation**: Visual progressive journey from *Entry* to *CxO Pathways*.

### 3. Parents Guide (`/parents`)
- **Safe & Disciplined Hero**: Muted video backdrop with parent consultation WhatsApp CTA.
- **6 Pillars of Parent Trust**:
  1. Gated Township & 24/7 Security
  2. Separate Modern Hostels (Male & Female with 8:30 PM curfew)
  3. Nutritious Multi-Cuisine Dining
  4. 1:1 Faculty Mentorship & Attendance Tracking
  5. Fee Transparency & 0% Interest EMI
  6. Verified ROI & Monthly Corporate Stipends (Up to ₹50k/mo)
- **Verified Parent Testimonial**: Real feedback from parents outside Kerala.
- **Parent FAQs**: Clean accordion where answers are hidden by default with zero text bleeding.
- **Family Campus Immersion**: Guided tour booking and direct phone helpline (`+91 97784 11884`).

### 4. Programme Pages (`/programmes/*`)
- **UGBIP (`/programmes/ugbip`)**: Undergraduate 3-Year degree, dual 6-month residencies, and Dubai international immersion.
- **PGBIP (`/programmes/pgbip`)**: Postgraduate 2-Year degree featuring CXO boardroom defense.
- **HSBIP (`/programmes/hsbip`)**: Higher Secondary (+1 & +2) residential commerce program with corporate foundation.

---

## 6. Performance Engineering & Benchmarks

Audited and verified with Google Chrome DevTools Lighthouse:

| Metric | Score / Benchmark | Industry Standard |
| :--- | :--- | :--- |
| **Mobile Performance** | **100 / 100** | Avg: 70–85 |
| **Desktop Performance** | **99 / 100** | Avg: 85–92 |
| **First Contentful Paint (FCP)** | **0.7s (Mobile) / 0.5s (Desktop)** | Good: < 1.8s |
| **Largest Contentful Paint (LCP)** | **0.7s (Mobile) / 0.5s (Desktop)** | Good: < 2.5s |
| **Total Blocking Time (TBT)** | **20ms (Mobile) / 0ms (Desktop)** | Good: < 200ms |
| **Cumulative Layout Shift (CLS)** | **0.000** | Good: < 0.1 |
| **First Load JS Bundle** | **103 kB Shared + ~13 kB Page** | Clean & lightweight |

### Key Optimizations Applied:
1. **Zero Runtime Animation Overhead**: Heavy motion libraries were eliminated from the critical render path in favor of native CSS hardware-accelerated animations (`translate`, `opacity`, `transform`).
2. **Server Components by Default**: Over 70% of components are pure React Server Components, eliminating hydration cost for presentational content.
3. **Passive rAF Scroll Listeners**: Scroll-reactive animations are throttled through `requestAnimationFrame` with passive event listeners to maintain 60 FPS scrolling.
4. **Static Route Pre-rendering**: All 11 pages compile to static HTML at build time (`○ (Static)`), ready for instant CDN edge delivery.

