"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HeroPreview } from "@/components/ui/HeroPreview";
import { CALCULATORS, CATEGORY_ORDER } from "@/lib/calculators";
import { currencies } from "@/lib/currencies";

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// ── Stat band data ────────────────────────────────────────────────────────────
const stats = [
  { value: `${CALCULATORS.length}`, label: "Calculators" },
  { value: `${currencies.length}`, label: "Currencies" },
  { value: "100%", label: "Private — runs in browser" },
  { value: "₹0", label: "No cost, no login" },
];

// ── Feature strip data ────────────────────────────────────────────────────────
const features = [
  {
    icon: ShieldCheck,
    title: "Completely Private",
    description: "All calculations happen in your browser. No data is ever sent to any server.",
    gradient: "from-emerald-500 to-teal-600",
    glow: "rgba(16,185,129,0.3)",
  },
  {
    icon: Globe,
    title: "Multi-Currency",
    description: `Supports ${currencies.length} currencies — switch instantly without losing your inputs.`,
    gradient: "from-blue-500 to-indigo-600",
    glow: "rgba(79,110,247,0.3)",
  },
  {
    icon: Zap,
    title: "Instant & Visual",
    description: "Results update as you type. Animated numbers and charts make the math intuitive.",
    gradient: "from-amber-500 to-orange-600",
    glow: "rgba(245,158,11,0.3)",
  },
];

export default function HomePage() {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    calcs: CALCULATORS.filter((c) => c.category === cat),
  }));

  return (
    <div className="space-y-20">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <motion.section
        className="grid lg:grid-cols-2 gap-10 items-center pt-6 lg:pt-12"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Left: copy */}
        <motion.div variants={fadeUp} className="space-y-6">
          {/* Eyebrow chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-[var(--border-color)] text-xs font-medium text-[var(--muted-foreground)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            100% free · No signup · Runs in your browser
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold leading-[1.1] tracking-tight">
            <span className="accent-gradient-text">Plan every rupee</span>
            <br />
            <span className="text-[var(--foreground)]">of your future.</span>
          </h1>

          <p className="text-[var(--muted-foreground)] text-lg leading-relaxed max-w-md">
            Powerful financial calculators built for Indian investors — SIP, FD, PPF, EMI, Retirement, and more. Instant results, beautiful charts.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#calculators"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
                boxShadow: "0 6px 20px var(--accent-glow)",
              }}
            >
              Explore calculators <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/calculators/sip-growth"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-semibold text-sm glass-card border border-[var(--border-color)] hover:border-[var(--accent)] text-[var(--foreground)] transition-all duration-200 hover:-translate-y-0.5"
            >
              Try SIP Calculator
            </Link>
          </div>
        </motion.div>

        {/* Right: live preview card */}
        <motion.div variants={fadeUp} className="w-full lg:ml-auto">
          <HeroPreview />
        </motion.div>
      </motion.section>

      {/* ── STAT BAND ────────────────────────────────────────────────────── */}
      <motion.section
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={cardVariant}
            className="glass-card border border-[var(--border-color)] rounded-2xl p-5 text-center"
          >
            <p className="text-2xl font-display font-bold accent-gradient-text tabular-nums">{s.value}</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1 leading-snug">{s.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ── BENTO CALCULATOR GRID ─────────────────────────────────────────── */}
      <section id="calculators" className="space-y-10 scroll-mt-20">
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--foreground)]">
            All Calculators
          </h2>
          <p className="text-[var(--muted-foreground)] text-sm">Pick a tool and get your answer in seconds</p>
        </motion.div>

        {byCategory.map(({ category, calcs }) => (
          <motion.div
            key={category}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-4"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4"
            >
              <div className="flex-1 h-px bg-[var(--border-color)]" />
              <span className="text-sm font-semibold font-display uppercase tracking-widest text-[var(--accent)] whitespace-nowrap">
                {category}
              </span>
              <div className="flex-1 h-px bg-[var(--border-color)]" />
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {calcs.map((calc) => (
                <motion.div key={calc.slug} variants={cardVariant}>
                  <Link
                    href={calc.href}
                    className={`group flex flex-col h-full p-6 glass-card rounded-2xl border border-[var(--border-color)] ${calc.hoverBorder} transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shadow-lg flex-shrink-0"
                      style={{ background: calc.gradient, boxShadow: `0 5px 16px ${calc.glow}` }}
                    >
                      <calc.icon className="w-5 h-5 text-white" />
                    </div>

                    <h3 className="text-base font-display font-semibold text-[var(--foreground)] mb-1">
                      {calc.title}
                    </h3>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-1">
                      {calc.description}
                    </p>

                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                      Open <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>

      {/* ── FEATURE STRIP ────────────────────────────────────────────────── */}
      <motion.section
        className="space-y-8"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center">
          <h2 className="text-2xl font-display font-bold text-[var(--foreground)]">Why use PlanDhan?</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariant}
              className="glass-card border border-[var(--border-color)] rounded-2xl p-6"
            >
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-lg`}
                style={{ boxShadow: `0 5px 16px ${f.glow}` }}
              >
                <f.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-display font-semibold text-[var(--foreground)] mb-1.5">{f.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
