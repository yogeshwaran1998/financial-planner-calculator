"use client";

import { AnimatedNumber } from "./AnimatedNumber";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/currencies";

interface ResultDisplayProps {
  label: string;
  value: number;
  highlight?: boolean;
}

export function ResultDisplay({ label, value, highlight = false }: ResultDisplayProps) {
  const { currency } = useCurrency();

  if (highlight) {
    return (
      <div className="relative p-5 rounded-2xl overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] opacity-90" />
        {/* Top-edge shimmer */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        {/* Glow */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ boxShadow: "0 8px 32px var(--accent-glow)" }}
        />
        <div className="relative z-10">
          <p className="text-sm font-medium text-white/75 mb-1">{label}</p>
          <AnimatedNumber
            value={value}
            className="text-xl sm:text-2xl font-display font-bold text-white tabular-nums break-words leading-tight"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 rounded-xl glass-card border border-[var(--border-color)]">
      <p className="text-sm text-[var(--muted-foreground)] mb-1">{label}</p>
      <AnimatedNumber
        value={value}
        className="text-lg sm:text-xl font-display font-bold text-[var(--foreground)] tabular-nums break-words leading-tight"
      />
    </div>
  );
}
