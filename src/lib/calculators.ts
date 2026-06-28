import {
  TrendingUp,
  PiggyBank,
  Target,
  Wallet,
  Landmark,
  BadgePercent,
  CalendarClock,
  ArrowDownUp,
  Home,
  Coins,
  CalendarRange,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type CalculatorCategory = "Invest" | "Plan" | "Save" | "Borrow";

export interface CalculatorMeta {
  slug: string;
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;    // CSS gradient string for inline style
  glow: string;
  hoverBorder: string;
  category: CalculatorCategory;
  featured?: boolean;
}

export const CALCULATORS: CalculatorMeta[] = [
  // ── Invest ────────────────────────────────────────────────────────────────
  {
    slug: "sip-growth",
    href: "/calculators/sip-growth",
    title: "SIP Growth",
    description: "Calculate returns on monthly SIP investments with yearly step-up",
    icon: PiggyBank,
    gradient: "linear-gradient(135deg, #10b981, #0d9488)",
    glow: "rgba(16,185,129,0.35)",
    hoverBorder: "hover:border-emerald-400/40",
    category: "Invest",
    featured: true,
  },
  {
    slug: "corpus-future-value",
    href: "/calculators/corpus-future-value",
    title: "Lumpsum Investment",
    description: "See how a one-time investment grows over time",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #3b82f6, #4f46e5)",
    glow: "rgba(79,110,247,0.35)",
    hoverBorder: "hover:border-blue-400/40",
    category: "Invest",
  },
  {
    slug: "goal-sip",
    href: "/calculators/goal-sip",
    title: "Goal SIP",
    description: "Find the monthly SIP needed to reach your target corpus",
    icon: Target,
    gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
    glow: "rgba(167,139,250,0.35)",
    hoverBorder: "hover:border-violet-400/40",
    category: "Invest",
  },
  {
    slug: "swp",
    href: "/calculators/swp",
    title: "SWP Calculator",
    description: "Plan systematic withdrawals from your retirement corpus",
    icon: ArrowDownUp,
    gradient: "linear-gradient(135deg, #f43f5e, #db2777)",
    glow: "rgba(244,63,94,0.35)",
    hoverBorder: "hover:border-rose-400/40",
    category: "Invest",
  },
  // ── Plan ──────────────────────────────────────────────────────────────────
  {
    slug: "retirement",
    href: "/calculators/retirement",
    title: "Retirement Planner",
    description: "Estimate your retirement corpus and monthly SIP needed",
    icon: CalendarClock,
    gradient: "linear-gradient(135deg, #f59e0b, #ea580c)",
    glow: "rgba(245,158,11,0.35)",
    hoverBorder: "hover:border-amber-400/40",
    category: "Plan",
  },
  {
    slug: "years-to-goal",
    href: "/calculators/years-to-goal",
    title: "Years to Goal",
    description: "Find how long it takes your portfolio to hit a target",
    icon: CalendarRange,
    gradient: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
    glow: "rgba(14,165,233,0.35)",
    hoverBorder: "hover:border-sky-400/40",
    category: "Plan",
  },
  // ── Save ──────────────────────────────────────────────────────────────────
  {
    slug: "fd",
    href: "/calculators/fd",
    title: "FD Calculator",
    description: "Calculate maturity value of a Fixed Deposit",
    icon: Landmark,
    gradient: "linear-gradient(135deg, #84cc16, #16a34a)",
    glow: "rgba(132,204,22,0.35)",
    hoverBorder: "hover:border-lime-400/40",
    category: "Save",
  },
  {
    slug: "rd",
    href: "/calculators/rd",
    title: "RD Calculator",
    description: "Calculate returns on a Recurring Deposit",
    icon: Coins,
    gradient: "linear-gradient(135deg, #14b8a6, #10b981)",
    glow: "rgba(20,184,166,0.35)",
    hoverBorder: "hover:border-teal-400/40",
    category: "Save",
  },
  {
    slug: "ppf",
    href: "/calculators/ppf",
    title: "PPF Calculator",
    description: "Estimate your Public Provident Fund maturity corpus",
    icon: Wallet,
    gradient: "linear-gradient(135deg, #6366f1, #2563eb)",
    glow: "rgba(99,102,241,0.35)",
    hoverBorder: "hover:border-indigo-400/40",
    category: "Save",
  },
  // ── Borrow ────────────────────────────────────────────────────────────────
  {
    slug: "emi",
    href: "/calculators/emi",
    title: "EMI Calculator",
    description: "Calculate monthly EMI for home, car, or personal loans",
    icon: Home,
    gradient: "linear-gradient(135deg, #f97316, #dc2626)",
    glow: "rgba(249,115,22,0.35)",
    hoverBorder: "hover:border-orange-400/40",
    category: "Borrow",
  },
];

export const CATEGORY_ORDER: CalculatorCategory[] = ["Invest", "Plan", "Save", "Borrow"];

export const currencies_count = 8; // matches currencies.ts array length
