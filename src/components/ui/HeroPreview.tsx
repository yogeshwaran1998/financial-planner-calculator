"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/currencies";
import { calculateSIPGrowth } from "@/lib/calculations";

const MONTHLY_SIP = 10000;
const CAGR = 12;
const YEARS = 20;

// Lightweight sparkline — 20 data points, SVG path
function Sparkline({ data }: { data: number[] }) {
  if (data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 200;
  const H = 96;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - ((v - min) / range) * H;
    return `${x},${y}`;
  });
  const linePath = `M ${pts.join(" L ")}`;
  const fillPath = `M 0,${H} L ${pts.join(" L ")} L ${W},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6474f8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6474f8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#sparkFill)" />
      <path d={linePath} fill="none" stroke="#6474f8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeroPreview() {
  const { currency } = useCurrency();
  const spanRef = useRef<HTMLSpanElement>(null);
  const prevRef = useRef(0);

  const { finalValue, totalInvested } = calculateSIPGrowth(MONTHLY_SIP, CAGR, YEARS, 0);
  const returns = finalValue - totalInvested;

  // Sparkline data: yearly totals
  const sparkData: number[] = [];
  for (let yr = 1; yr <= YEARS; yr++) {
    const r = CAGR / 100 / 12;
    const n = yr * 12;
    const val = MONTHLY_SIP * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    sparkData.push(Math.round(val));
  }

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (spanRef.current) spanRef.current.textContent = formatCurrency(finalValue, currency);
      return;
    }
    const from = prevRef.current;
    prevRef.current = finalValue;
    const ctrl = animate(from, finalValue, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate(v) {
        if (spanRef.current) spanRef.current.textContent = formatCurrency(Math.round(v), currency);
      },
    });
    return () => ctrl.stop();
  }, [finalValue, currency]);

  return (
    <div
      className="relative glass-card rounded-2xl border border-[var(--border-color)] p-5 overflow-hidden"
      style={{ boxShadow: "0 8px 40px var(--accent-glow)" }}
    >
      {/* Top shimmer */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm text-[var(--muted-foreground)] mb-0.5">SIP · ₹10K/mo · 12% · 20 yrs</p>
          <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">Live Preview</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
          +{((returns / totalInvested) * 100).toFixed(0)}% returns
        </span>
      </div>

      {/* Big number */}
      <span
        ref={spanRef}
        className="text-3xl font-display font-bold tabular-nums accent-gradient-text"
        suppressHydrationWarning
      >
        {formatCurrency(finalValue, currency)}
      </span>

      {/* Sparkline */}
      <div className="mt-3">
        <Sparkline data={sparkData} />
      </div>

      {/* Bottom stats */}
      <div className="mt-2 grid grid-cols-2 gap-2 pt-3 border-t border-[var(--border-color)]">
        <div>
          <p className="text-xs text-[var(--muted-foreground)]">Invested</p>
          <p className="text-sm font-display font-semibold text-[var(--foreground)] tabular-nums">
            {formatCurrency(totalInvested, currency)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-[var(--muted-foreground)]">Gains</p>
          <p className="text-sm font-display font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {formatCurrency(returns, currency)}
          </p>
        </div>
      </div>
    </div>
  );
}
