'use client';

import React, { useRef, useEffect } from 'react';
import { CAMPUS_DRAWING_CONFIG } from './campusDrawingData';

interface StrokeItem {
  pts: number[][];
  cx: number;
  cy: number;
  len: number;
  w: number;
}

interface MotionPath {
  p: number[][];
  c: number[];
  T: number;
  start: number;
  speed: number;
  dur: number;
  w: number;
  d: number;
  si: number;
}

export const CampusDrawingAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const penRef = useRef<HTMLDivElement | null>(null);
  const brsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const site = containerRef.current;
    const cv = canvasRef.current;
    const pen = penRef.current;
    const brs = brsRef.current;
    if (!site || !cv || !pen || !brs) return;

    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const SW = CAMPUS_DRAWING_CONFIG.w;
    const SH = CAMPUS_DRAWING_CONFIG.h;

    // Up to ~10s build animation duration:
    // START 0.35s + T_LINE 5.2s + GAP 0.2s + T_PAINT 4.0s = 9.75 seconds total
    const START = 0.35;
    const T_LINE = 4.2;
    const GAP = 0.2;
    const T_PAINT = 3.5;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let mkL: HTMLCanvasElement | null = null;
    let mkC: HTMLCanvasElement | null = null;
    let tmp: HTMLCanvasElement | null = null;
    let lctx: CanvasRenderingContext2D | null = null;
    let cctx: CanvasRenderingContext2D | null = null;
    let tctx: CanvasRenderingContext2D | null = null;

    let cw = 0;
    let ch = 0;
    let sc = 1;
    let css = 1;
    let run = false;
    let done = false;
    let imL: HTMLImageElement | null = null;
    let imC: HTMLImageElement | null = null;
    let t0 = 0;
    let rafId = 0;

    let S: MotionPath[] = [];
    let lo = 0;
    let sweep: MotionPath | null = null;
    let Tdetail = 0;

    function loadImage(src: string): Promise<HTMLImageElement> {
      return new Promise((resolve, reject) => {
        const i = new Image();
        i.decoding = 'async';
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = src;
      });
    }

    function mk(pts: number[][], start: number, dur: number, w: number): MotionPath {
      const c = [0];
      for (let i = 1; i < pts.length; i++) {
        c.push(c[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
      }
      const T = c[c.length - 1];
      return {
        p: pts,
        c: c,
        T: T,
        start: start,
        speed: T / Math.max(dur, 1e-3),
        dur: dur,
        w: w,
        d: 0,
        si: 0,
      };
    }

    function at(P: MotionPath, dist: number): [number, number] {
      const n = P.p.length;
      P.si = 0;
      while (P.si < n - 2 && P.c[P.si + 1] < dist) P.si++;
      const i = P.si;
      const sg = P.c[i + 1] - P.c[i] || 1;
      const f = Math.min(1, Math.max(0, (dist - P.c[i]) / sg));
      return [
        P.p[i][0] + (P.p[i + 1][0] - P.p[i][0]) * f,
        P.p[i][1] + (P.p[i + 1][1] - P.p[i][1]) * f,
      ];
    }

    function brush(g: CanvasRenderingContext2D, P: MotionPath, a: number, b: number) {
      const pts: [number, number][] = [at(P, a)];
      for (let i = 0; i < P.p.length; i++) {
        if (P.c[i] > a && P.c[i] < b) {
          pts.push([P.p[i][0], P.p[i][1]]);
        }
      }
      pts.push(at(P, b));

      g.lineCap = 'round';
      g.lineJoin = 'round';
      g.strokeStyle = '#000';
      g.beginPath();
      g.moveTo(pts[0][0], pts[0][1]);
      for (let k = 1; k < pts.length; k++) {
        g.lineTo(pts[k][0], pts[k][1]);
      }
      g.globalAlpha = 0.45;
      g.lineWidth = P.w * 1.7;
      g.stroke();
      g.globalAlpha = 1;
      g.lineWidth = P.w;
      g.stroke();
    }

    function plan(strokes: number[][]) {
      const items: StrokeItem[] = strokes.map((s) => {
        const pts: number[][] = [];
        let cy = 0;
        let cx = 0;
        for (let j = 0; j < s.length; j += 2) {
          pts.push([s[j], s[j + 1]]);
          cx += s[j];
          cy += s[j + 1];
        }
        return {
          pts: pts,
          cx: cx / pts.length,
          cy: cy / pts.length,
          len: 0,
          w: 0,
        };
      });

      items.forEach((o) => {
        o.len = 0;
        for (let i = 1; i < o.pts.length; i++) {
          o.len += Math.hypot(o.pts[i][0] - o.pts[i - 1][0], o.pts[i][1] - o.pts[i - 1][1]);
        }
      });

      items.sort((a, b) => b.len - a.len);
      const topItems = items.slice(0, 240);

      // Bottom -> top bands, left -> right inside each band
      const band = SH / 9;
      topItems.sort((a, b) => {
        const ba = Math.floor(a.cy / band);
        const bb = Math.floor(b.cy / band);
        return ba !== bb ? bb - ba : a.cx - b.cx;
      });

      let sum = 0;
      topItems.forEach((o) => {
        o.w = Math.pow(o.len, 0.72);
        sum += o.w;
      });

      const k = (T_LINE * 0.94) / sum;
      let t = START;
      S = [];
      topItems.forEach((o) => {
        const d = o.w * k;
        S.push(mk(o.pts, t, d, 5.5));
        t += d;
      });
      Tdetail = t;

      // Paint roller sweep: vertical passes, left -> right
      const bw = 96;
      const step = 70;
      const pts: number[][] = [];
      let x = -bw * 0.3;
      let dir = 0;
      while (x < SW + bw * 0.6) {
        pts.push([x, dir ? SH + 14 : -14]);
        pts.push([x + 10, dir ? -14 : SH + 14]);
        x += step;
        dir ^= 1;
      }
      const ps = START + T_LINE + GAP;
      sweep = mk(pts, ps, T_PAINT, bw);
    }

    function size() {
      if (!site || !cv || !ctx) return;
      const w = Math.round(site.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
      if (!w) return;
      cw = w;
      ch = Math.round((w * SH) / SW);
      sc = cw / SW;
      css = site.clientWidth / SW;
      cv.width = cw;
      cv.height = ch;

      if (run) {
        finish();
        return;
      }
      if (done && imC) {
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(imC, 0, 0, cw, ch);
      }
    }

    function layers() {
      mkL = document.createElement('canvas');
      mkC = document.createElement('canvas');
      tmp = document.createElement('canvas');
      mkL.width = mkC.width = tmp.width = cw;
      mkL.height = mkC.height = tmp.height = ch;
      lctx = mkL.getContext('2d');
      cctx = mkC.getContext('2d');
      tctx = tmp.getContext('2d');
      if (lctx) lctx.setTransform(sc, 0, 0, sc, 0, 0);
      if (cctx) cctx.setTransform(sc, 0, 0, sc, 0, 0);
    }

    function release() {
      mkL = null;
      mkC = null;
      tmp = null;
      lctx = null;
      cctx = null;
      tctx = null;
    }

    function layer(im: HTMLImageElement, maskCv: HTMLCanvasElement) {
      if (!tctx) return;
      tctx.globalCompositeOperation = 'source-over';
      tctx.clearRect(0, 0, cw, ch);
      tctx.drawImage(im, 0, 0, cw, ch);
      tctx.globalCompositeOperation = 'destination-in';
      tctx.drawImage(maskCv, 0, 0);
      tctx.globalCompositeOperation = 'source-over';
    }

    function frame(now: number) {
      if (!run || !imL || !imC || !ctx || !tmp || !mkL || !mkC || !sweep || !pen || !brs) return;
      const t = (now - t0) / 1000;

      // 1) Skeleton strokes
      let penAt: [number, number] | null = null;
      if (lctx) {
        for (let j = lo; j < S.length && S[j].start <= t; j++) {
          const P = S[j];
          const tg = Math.min(P.T, Math.max(0, (t - P.start) * P.speed));
          if (tg > P.d) {
            brush(lctx, P, P.d, tg);
            P.d = tg;
          }
          if (P.d < P.T) {
            penAt = at(P, P.d);
          } else if (j === lo) {
            lo++;
          }
        }
      }

      // 2) Paint roller sweep
      let paintAt: [number, number] | null = null;
      if (t >= sweep.start && cctx) {
        const g = Math.min(sweep.T, (t - sweep.start) * sweep.speed);
        if (g > sweep.d) {
          brush(cctx, sweep, sweep.d, g);
          sweep.d = g;
        }
        if (sweep.d < sweep.T) {
          paintAt = at(sweep, sweep.d);
        }
      }

      // Composite
      ctx.clearRect(0, 0, cw, ch);
      const da = Math.min(1, Math.max(0, (t - (Tdetail - 0.1)) / 0.4));
      layer(imL, mkL);
      ctx.drawImage(tmp, 0, 0);
      if (da > 0) {
        ctx.globalAlpha = da;
        ctx.drawImage(imL, 0, 0, cw, ch);
        ctx.globalAlpha = 1;
      }
      if (t >= sweep.start) {
        layer(imC, mkC);
        ctx.drawImage(tmp, 0, 0);
      }

      // Cursors positioning directly on DOM elements for high frame rate
      if (paintAt) {
        pen.style.opacity = '0';
        brs.style.opacity = '1';
        brs.style.transform = `translate3d(${paintAt[0] * css}px, ${paintAt[1] * css}px, 0)`;
      } else if (penAt && t < sweep.start) {
        brs.style.opacity = '0';
        pen.style.opacity = '1';
        pen.style.transform = `translate3d(${penAt[0] * css}px, ${penAt[1] * css}px, 0)`;
      } else {
        pen.style.opacity = '0';
        brs.style.opacity = '0';
      }

      if (sweep.d >= sweep.T) {
        finish();
        return;
      }

      rafId = requestAnimationFrame(frame);
    }

    function finish() {
      run = false;
      done = true;
      if (pen) pen.style.opacity = '0';
      if (brs) brs.style.opacity = '0';
      if (ctx && imC) {
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(imC, 0, 0, cw, ch);
      }
      release();
    }

    // Initialize
    let ro: ResizeObserver | null = null;

    Promise.all([
      loadImage(CAMPUS_DRAWING_CONFIG.lineSrc),
      loadImage(CAMPUS_DRAWING_CONFIG.colorSrc),
      fetch(CAMPUS_DRAWING_CONFIG.strokesSrc).then((r) => r.json()),
    ])
      .then(([l, c, strokes]) => {
        imL = l;
        imC = c;
        size();

        if (typeof ResizeObserver !== 'undefined') {
          ro = new ResizeObserver(() => {
            if (!site) return;
            const w = Math.round(site.clientWidth * Math.min(window.devicePixelRatio || 1, 2));
            if (w !== cw) size();
          });
          ro.observe(site);
        }

        if (reduce) {
          done = true;
          if (imC && ctx) ctx.drawImage(imC, 0, 0, cw, ch);
          return;
        }

        plan(strokes);
        layers();
        run = true;
        t0 = performance.now() + 350;
        rafId = requestAnimationFrame(frame);
      })
      .catch((err) => {
        console.error('Failed to load campus drawing images:', err);
      });

    return () => {
      run = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (ro) ro.disconnect();
      release();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ aspectRatio: `${CAMPUS_DRAWING_CONFIG.w} / ${CAMPUS_DRAWING_CONFIG.h}` }}
    >
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="AIMER Business School campus architectural building drawing"
        className="block w-full h-auto mix-blend-multiply transition-opacity duration-300"
        style={{ aspectRatio: `${CAMPUS_DRAWING_CONFIG.w} / ${CAMPUS_DRAWING_CONFIG.h}` }}
      />

      {/* Drafting Pen Cursor */}
      <div
        ref={penRef}
        className="absolute left-0 top-0 w-0 h-0 pointer-events-none z-10 opacity-0 transition-opacity duration-200 will-change-transform"
      >
        <svg
          viewBox="0 0 132 16"
          aria-hidden="true"
          className="absolute left-0 -top-2 w-[clamp(78px,9vw,128px)] h-auto -rotate-[34deg] origin-[0_50%] overflow-visible filter drop-shadow-md"
        >
          <path d="M0 8 L18 3.2 L18 12.8Z" fill="#1c2123" />
          <path d="M18 3.2 L34 1.6 L34 14.4 L18 12.8Z" fill="#e6d8c2" />
          <rect x="34" y="1.6" width="74" height="12.8" fill="#12838f" />
          <rect x="34" y="1.6" width="74" height="3.4" fill="#0b6b74" />
          <rect x="108" y="1.6" width="7" height="12.8" fill="#c9d3d5" />
          <rect x="115" y="1.6" width="14" height="12.8" rx="2" fill="#1c2123" />
        </svg>
      </div>

      {/* Paint Brush Cursor */}
      <div
        ref={brsRef}
        className="absolute left-0 top-0 w-0 h-0 pointer-events-none z-10 opacity-0 transition-opacity duration-200 will-change-transform"
      >
        <svg
          viewBox="0 0 132 20"
          aria-hidden="true"
          className="absolute left-0 -top-2 w-[clamp(78px,9vw,128px)] h-auto -rotate-[34deg] origin-[0_50%] overflow-visible filter drop-shadow-md"
        >
          <path d="M0 10 C4 4 12 2 24 3 L24 17 C12 18 4 16 0 10Z" fill="#12838f" />
          <rect x="24" y="3" width="18" height="14" fill="#c9d3d5" />
          <rect x="24" y="3" width="18" height="3" fill="#aab6b9" />
          <path d="M42 6 L112 8 Q132 10 112 12 L42 14Z" fill="#1c2123" />
        </svg>
      </div>
    </div>
  );
};
