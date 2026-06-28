"use client";

import { useCurrency } from "@/context/CurrencyContext";
import { ChevronDown } from "lucide-react";

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <div className="relative">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as typeof currency)}
        className="appearance-none glass-card border border-[var(--border-color)] rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer transition-all duration-200 min-h-[40px]"
      >
        {currencies.map((c) => (
          <option key={c.code} value={c.code} className="bg-[var(--surface-solid)]">
            {c.code} - {c.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none text-[var(--muted-foreground)]" />
    </div>
  );
}
