"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { InputField } from "@/components/ui/InputField";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { ResultDisplay } from "@/components/ui/ResultDisplay";
import { BalanceChart } from "@/components/ui/BalanceChart";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateSWP, generateSWPData } from "@/lib/calculations";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

export default function SWPPage() {
  const [initialCorpus, setInitialCorpus] = useState(5000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(30000);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(20);

  const results = calculateSWP(initialCorpus, monthlyWithdrawal, annualReturn, years);
  const chartData = generateSWPData(initialCorpus, monthlyWithdrawal, annualReturn, years);

  const yearsLast = results.monthsLast / 12;

  return (
    <motion.div className="space-y-6" variants={pageVariants} initial="hidden" animate="show">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-200 text-[var(--foreground)]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-display font-bold text-[var(--foreground)]">SWP Calculator</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Plan systematic withdrawals from your corpus</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6 glass-card border border-[var(--border-color)] p-6 rounded-2xl">
          <InputField
            label="Initial Corpus"
            type="number"
            value={initialCorpus}
            onChange={(e) => setInitialCorpus(Number(e.target.value))}
            min={100000}
            step={100000}
          />
          <InputField
            label="Monthly Withdrawal"
            type="number"
            value={monthlyWithdrawal}
            onChange={(e) => setMonthlyWithdrawal(Number(e.target.value))}
            min={1000}
            step={1000}
          />
          <RangeSlider label="Expected Annual Return" value={annualReturn} onChange={setAnnualReturn} min={1} max={20} unit="%" />
          <RangeSlider label="Withdrawal Period" value={years} onChange={setYears} min={1} max={40} unit=" yrs" />
        </div>

        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <AnimatePresence mode="wait">
              {!results.depleted ? (
                <motion.div
                  key="survives"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative p-6 rounded-2xl overflow-hidden border border-emerald-500/20"
                  style={{
                    background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(5,150,105,0.08) 100%)",
                    boxShadow: "0 8px 32px rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-display font-semibold text-emerald-700 dark:text-emerald-300">Corpus Sustains!</span>
                  </div>
                  <p className="text-sm text-emerald-700/80 dark:text-emerald-300/70 mb-3">Remaining balance after {years} years:</p>
                  <AnimatedNumber
                    value={results.finalBalance}
                    className="text-3xl sm:text-4xl font-display font-bold text-emerald-700 dark:text-emerald-300 tabular-nums"
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="depletes"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative p-6 rounded-2xl overflow-hidden border border-amber-500/20"
                  style={{
                    background: "linear-gradient(135deg, rgba(245,158,11,0.12) 0%, rgba(217,119,6,0.08) 100%)",
                    boxShadow: "0 8px 32px rgba(245,158,11,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span className="font-display font-semibold text-amber-700 dark:text-amber-300">Corpus Depletes</span>
                  </div>
                  <p className="text-sm text-amber-700/80 dark:text-amber-300/70 mb-2">Corpus runs out after:</p>
                  <p className="text-3xl sm:text-4xl font-display font-bold text-amber-700 dark:text-amber-300 tabular-nums">
                    {yearsLast.toFixed(1)} yrs
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4" variants={item}>
            <ResultDisplay label="Total Withdrawn" value={results.totalWithdrawn} />
            <ResultDisplay label="Initial Corpus" value={initialCorpus} />
          </motion.div>
        </motion.div>
      </div>

      <div className="glass-card border border-[var(--border-color)] p-6 rounded-2xl">
        <h3 className="text-base font-display font-semibold text-[var(--foreground)] mb-5">Corpus Balance Over Time</h3>
        <BalanceChart data={chartData} />
      </div>
    </motion.div>
  );
}
