# AIMER Business School — Official Web Platform UI

![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)
![React 19](https://img.shields.io/badge/React-19.0-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwind-css)
![Lighthouse Performance](https://img.shields.io/badge/Lighthouse_Mobile-100%2F100-success)

A modern, high-performance institutional website and UI design system for **AIMER Business School**, located at Markaz Knowledge City, Calicut. Engineered with **Next.js 15 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS**.

---

## ⚡ Quick Start (Run Locally)

### 1. Prerequisites
Make sure you have **Node.js** installed on your machine:
- **Node.js**: `v18.18+` or `v20.x` / `v22.x` (LTS recommended)
- **Package Manager**: `npm` (comes with Node), `pnpm`, or `yarn`

### 2. Clone the Repository
```bash
git clone https://github.com/minhajvp/AIMER-Business-School-UI.git
cd AIMER-Business-School-UI
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
# Start with Next.js Turbopack (recommended for ultra-fast HMR):
npm run dev

# Or start with standard Webpack:
npm run dev:webpack
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 5. Build for Production
```bash
# Compiles TypeScript and creates optimized static HTML/JS bundles:
npm run build

# Start the local production server:
npm start
```

---

## 🎨 Design System & Color Tokens

The UI follows an editorial, premium academic design language with square corners, hairline dividers (`1px`), and high-contrast typography.

### Primary Brand Palette
| Token | Hex Code | Visual Preview / Usage |
| :--- | :--- | :--- |
| **`aimer-500`** | `#168C9B` | Official Signature Brand Teal |
| **`aimer-600`** | `#0F7684` | Primary CTAs, active buttons, focus outlines |
| **`aimer-700`** | `#086C78` | Deep Teal for headings, badges & high contrast |
| **`charcoal-900`** | `#171B1D` | Official Dark Charcoal for primary typography |
| **`charcoal-950`** | `#0D0F10` | Dark closing bands, footer background |
| **`charcoal-200`** | `#D8DCDE` | Subtle hairline dividers (`border-charcoal-200/70`) |
| **`aqua-tint`** | `#F4FAFA` | Tinted editorial backgrounds (Founder & Testimonials) |

### Typography
- **Font Family**: `Poppins` (Google Font with weights 300, 400, 500, 600, 700).
- **Display Scale**: `clamp(2.75rem, 6.5vw, 6.5rem)` with tight letter spacing (`-0.04em`).

---

## 🗺️ Page Routes

| Route | Page | Key Features |
| :--- | :--- | :--- |
| `/` | **Home Page** | Practice-led business positioning, 11 pillars, interactive SVG coordinate stroke animation, CXO mentor rail, NAAT admission callback form. |
| `/about` | **About AIMER** | 1080p hero background video, lightbox campus film, alternating feature rows, word-by-word vision scroll fill, values accordion, founder's message, expandable leadership team cards, 5-stage transformation route. |
| `/parents` | **Parents Guide** | Hero with WhatsApp counselor hotline, 6 pillars of parent trust with scroll reveal, parent testimonial card, interactive FAQ accordion (hidden by default), family campus tour booking. |
| `/programmes/ugbip` | **UGBIP Degree** | 3-Year Undergraduate Program, 75% practicum architecture, dual 6-month corporate residencies, Dubai international business immersion. |
| `/programmes/pgbip` | **PGBIP Degree** | 2-Year Postgraduate Program, CXO boardroom defense, enterprise live capstones. |
| `/programmes/hsbip` | **HSBIP Program** | 2-Year Residential Commerce Foundation (+1 & +2) inside Markaz Knowledge City. |
| `/sitemap.xml` | **Dynamic Sitemap** | Automated SEO XML sitemap with weekly change frequency and prioritization. |

---

## 📁 Project Structure

```
├── content/               # Single source of truth markdown files (scraped & verified copy)
├── public/                # Static assets
│   ├── About-Images/      # High-res photography (labs, masterclasses, board portraits)
│   ├── brochure/          # Downloadable PDF prospectuses (HSBIP, UGBIP, PGBIP)
│   ├── campus/            # Campus drawing assets and layout illustrations
│   ├── campus-video/      # Cinematic 1080p hero loop (hero-1080.mp4)
│   ├── logo/              # Brand logos & favicon
│   └── icon.png           # Next.js App Router icon
├── src/
│   ├── app/               # Next.js App Router routes (/about, /parents, /programmes/*)
│   ├── components/        # Modular UI components
│   │   ├── about/         # About page components (Hero, Features, Vision, Leadership)
│   │   ├── parents/       # Parents page components (Hero, Pillars, FAQs, Visit)
│   │   ├── ugbip/         # UGBIP components
│   │   ├── pgbip/         # PGBIP components
│   │   ├── hsbip/         # HSBIP components
│   │   ├── navbar/        # Sticky navigation with MegaMenu, active indicator, mobile drawer
│   │   ├── footer/        # Institutional footer with accreditation details
│   │   ├── hero/          # Home hero section with SVG stroke animation
│   │   └── ui/            # Common UI elements (SectionBadge, BrochureModal)
│   ├── contents/          # Typed TypeScript content objects parsed from markdown
│   │   ├── about.ts       # Typed content for About page
│   │   ├── parents.ts     # Typed content for Parents page
│   │   └── programmes/    # Typed content for degree pathways
│   ├── data/              # Static structured data (programmes.data.ts)
│   └── types/             # TypeScript interfaces
├── PERFORMANCE_REPORT.md  # Detailed Lighthouse & build optimization audit
└── REQUIREMENTS_AND_ARCHITECTURE.md # Full architecture, design tokens & system requirements
```

---

## 🚀 Performance Highlights

- **Lighthouse Mobile Score**: **100 / 100**
- **Lighthouse Desktop Score**: **99 / 100**
- **First Contentful Paint (FCP)**: **0.7s**
- **Largest Contentful Paint (LCP)**: **0.7s**
- **Total Blocking Time (TBT)**: **20ms**
- **Zero Runtime Animation Overhead**: Native CSS keyframes and hardware-accelerated transforms replace heavy JavaScript runtime animation libraries.
- **Pure Server Components**: Over 70% of components are statically pre-rendered on the server without client-side hydration penalty.

For the full benchmark data and methodology, see [PERFORMANCE_REPORT.md](./PERFORMANCE_REPORT.md).

---

## 🛠️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts dev server using **Turbopack** on port `3000` |
| `npm run dev:webpack` | Starts dev server using Webpack |
| `npm run build` | Compiles TypeScript and creates optimized static production build |
| `npm start` | Runs the compiled production server |
| `npm run lint` | Runs Next.js ESLint checks |
| `npm run build:analyze` | Runs Webpack bundle analyzer to visualize chunk sizes |

---

## 🚢 Deployment

This project is optimized for deployment on any modern cloud hosting provider:

### Vercel (Recommended)
1. Push your repository to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. Vercel automatically detects Next.js: click **Deploy**.

### Self-Hosted / Node.js Server
```bash
npm install
npm run build
npm start
```

---

## 📄 License & Attribution

Designed and developed for **AIMER Business School**, Markaz Knowledge City, Calicut, Kerala, India.  
Proprietary institutional UI codebase. All rights reserved.
