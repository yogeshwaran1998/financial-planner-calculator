"use client";

import Link from "next/link";
import { CurrencySelector } from "@/components/ui/CurrencySelector";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { TrendingUp } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 glass-card border-b border-[var(--border-color)]">
      <div className="container mx-auto px-4 py-3.5 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group min-w-0">
            <div className="w-9 h-9 rounded-xl bg-accent-gradient flex items-center justify-center shadow-glow-sm flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-lg font-display font-semibold text-[var(--foreground)] group-hover:accent-gradient-text transition-all truncate">
              PlanDhan
            </h1>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <CurrencySelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
