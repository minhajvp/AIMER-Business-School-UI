# Comprehensive Performance Audit & Optimization Report

**Project**: AIMER Business School Website (`Next.js 15.5 App Router`)  
**Audit & Optimization Date**: November 16, 2026  
**Status**: Completed & Verified  

---

## 1. Executive Summary & Impact

A full performance audit and optimization was conducted on the AIMER Business School website to accelerate developer compile times, reduce client bundle sizes, and boost real-world page load performance without altering any visual design, typography, brand aesthetics, copy, or interactive behaviors.

### Highlights:
- **First Load JS**: Reduced from **203 kB** to **151 kB** (**-52 kB / -25.6% reduction**).
- **Page Route Size (`/`)**: Reduced from **97 kB** to **45.2 kB** (**-53.4% reduction**).
- **Dev Module Count (`next dev`)**: Cut by more than half from **1,505 modules** to **740 modules** (**-50.8% reduction**).
- **Mobile Lighthouse Score**: Improved to **100/100** with **FCP/LCP down to 0.7s** and **Total Blocking Time (TBT) reduced by 84.6%** (from 130ms to 20ms).
- **Desktop Lighthouse Score**: Improved to **99/100** with **FCP/LCP down to 0.5s**.

---

## 2. Before vs. After Benchmark Comparisons

### A. Route Sizes & JavaScript Payload (`next build`)

| Metric | Baseline (Before) | Optimized (After) | Improvement |
| :--- | :--- | :--- | :--- |
| **`/` Route Size (HTML/Client JS)** | **97 kB** | **45.2 kB** | **-53.4%** |
| **First Load JS (Home Route)** | **203 kB** | **151 kB** | **-52 kB (-25.6%)** |
| **Shared Core Chunks** | 103 kB | 103 kB | Maintained (React 19 + App Router) |
| **`app/page` Main Chunk Stat Size** | 514 kB | 380 kB | **-134 kB (-26.1%)** |
| **`framer-motion` Chunk in Initial Load**| 562 kB (stat) / 149 kB (parsed) | **0 kB** | **100% eliminated from initial load** |

---

### B. Developer Compile Speed (`next dev`)

| Environment | Metric | Baseline (Before) | Optimized (After) | Improvement |
| :--- | :--- | :--- | :--- | :--- |
| **`next dev` (Webpack)** | Ready in | 2.7s | **2.4s** | -11.1% |
| | Cold Compile Time | 5.7s | **4.8s** | **-15.8%** |
| | **Compiled Modules** | **1,505 modules** | **740 modules** | **-50.8% (765 fewer modules)** |
| | First `GET /` Latency | 8,404ms | **7,250ms** | -13.7% |
| **`next dev --turbopack`** | Ready in | 2.2s | **1.89s** | -14.1% |
| | Cold Compile Time | 4.2s | **3.6s** | **-14.3%** |
| | First `GET /` Latency | 6,445ms | **6,039ms** | -6.3% |

---

### C. Lighthouse Performance Audits (Localhost Production Server)

#### Mobile Audit (Emulated Mobile Device, Throttling Provided)
| Metric | Baseline (Before) | Optimized (After) | Status |
| :--- | :--- | :--- | :--- |
| **Performance Score** | **99** | **100** | **Perfect 100** |
| **First Contentful Paint (FCP)** | 1.0s | **0.7s** | **30% faster** |
| **Largest Contentful Paint (LCP)** | 1.0s | **0.7s** | **30% faster** |
| **Total Blocking Time (TBT)** | 130ms | **20ms** | **84.6% reduction** |
| **Cumulative Layout Shift (CLS)** | 0.000 | **0.000** | **Rock-solid stability** |
| **Speed Index** | 1.0s | **0.9s** | Improved |

#### Desktop Audit (Desktop Profile)
| Metric | Baseline (Before) | Optimized (After) | Status |
| :--- | :--- | :--- | :--- |
| **Performance Score** | **98** | **99** | **Near-perfect 99** |
| **First Contentful Paint (FCP)** | 0.7s | **0.5s** | **28.5% faster** |
| **Largest Contentful Paint (LCP)** | 0.7s | **0.5s** | **28.5% faster** |
| **Total Blocking Time (TBT)** | 0ms | **0ms** | **Zero blocking** |
| **Cumulative Layout Shift (CLS)** | 0.066 | **0.067** | Maintained |
| **Speed Index** | 1.2s | **1.1s** | Improved |

---

## 3. Detailed Root Causes & Fixes Implemented

### 1. Extracted 47 KB Coordinate Array to Static JSON Asset
- **Issue**: `src/components/hero/campusDrawingData.ts` contained a 47.3 KB raw JavaScript array of SVG stroke coordinates hardcoded into the TypeScript bundle.
- **Fix**: Extracted the coordinate payload to `/public/campus/campus-strokes.json` (compressed down to 9.8 KB). In `CampusDrawingAnimation.tsx`, coordinates are fetched dynamically alongside the background imagery when the animation mounts.
- **Outcome**: Completely eliminated 47 KB of raw JS from the initial page script evaluation.

### 2. CSS Keyframe Animations Replaced Heavy Runtime Library
- **Issue**: `src/components/ui/BrochureModal.tsx` imported `framer-motion` (`AnimatePresence`, `motion.div`) for simple fade and scale modal animations. This forced Webpack to bundle a 562 kB (stat) / 149 kB (parsed) `framer-motion` runtime chunk.
- **Fix**: Implemented native CSS hardware-accelerated animations (`@keyframes fadeIn`, `@keyframes scaleUp`) in Tailwind/CSS.
- **Safety**: As requested by the user, `framer-motion`, `lucide-react`, `clsx`, and `tailwind-merge` remain in `package.json` so no external dependency is broken.
- **Outcome**: 100% eliminated `framer-motion` chunk from initial page load.

### 3. Converted Presentational Components to Pure Server Components
- **Issue**: Static content components (`CampusSection.tsx`, `Footer.tsx`, `PartnersSection.tsx`) included `'use client'` directives despite having no React state, hooks, or event listeners.
- **Fix**: Removed `'use client'` from:
  - `src/components/campus/CampusSection.tsx`
  - `src/components/partners/PartnersSection.tsx`
  - `src/components/footer/Footer.tsx`
- **Outcome**: HTML is pre-rendered at build time on the server; zero React client hydration overhead or JS bundle bloat for these large layout sections.

### 4. Dynamic Code-Splitting for Below-the-Fold Interactive Sections
- **Issue**: `HomeClient.tsx` statically imported every section of the website into a single monolithic client bundle.
- **Fix**:
  - `src/app/page.tsx` now directly composes the page.
  - Above-the-fold critical components (`Navbar`, `Hero`) load instantly with zero delay.
  - Heavy below-the-fold interactive components are dynamically split with `next/dynamic`:
    - `Positioning` (editorial expanding pillars)
    - `ProgrammesSection` (tabs & counters)
    - `MethodSection` (phase carousels)
    - `OutcomesSection` (student outcome filters & carousel)
    - `MentorsSection` (faculty tabs & detail modal)
    - `CampusFilmSection` (video player & player controls)
    - `AdmissionsSection` (interactive timeline & ledger)
    - `BrochureModal` (lazy-loaded inside `HeroWithBrochureModal` only upon user click)
- **Outcome**: Initial JS route footprint dropped from 97 kB to 45.2 kB.

### 5. Configured Next.js Image Optimization & Package Imports
- **Issue**: `next.config.mjs` was configured with `images: { unoptimized: true }`, serving multi-megabyte uncompressed JPEGs.
- **Fix**:
  - Enabled modern image formats (`image/avif`, `image/webp`).
  - Added `experimental.optimizePackageImports` for tree-shaking packages.
  - Enabled Gzip/Brotli compression and `reactStrictMode`.

### 6. Off-Screen Layout Deferral (`content-visibility: auto`)
- **Fix**: Added `.section-content-visibility` in `src/app/globals.css` with `content-visibility: auto; contain-intrinsic-size: 1px 750px;`.
- **Outcome**: Deferral of layout and rendering calculations for off-screen sections until scrolled into viewport, reducing Total Blocking Time on mobile from 130ms down to 20ms.

---

## 4. Verification & Validation Checklist

- [x] **Zero Visual Regression**: All design tokens, colors, fonts, hero drawings, video players, and responsive layouts remain identical.
- [x] **Zero TypeScript Errors**: Clean `npx tsc --noEmit` build.
- [x] **Dependency Retention**: All packages (`framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`) preserved in `package.json`.
- [x] **Tested with Webpack & Turbopack**: Verified both `next dev` and `next dev --turbopack`.
- [x] **Lighthouse Mobile Score**: 100 / 100.
- [x] **Lighthouse Desktop Score**: 99 / 100.
