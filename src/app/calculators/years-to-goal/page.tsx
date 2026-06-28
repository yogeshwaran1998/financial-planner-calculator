"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, AlertCircle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { InputField } from "@/components/ui/InputField";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { ResultDisplay } from "@/components/ui/ResultDisplay";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { calculateYearsToGoal } from "@/lib/calculations";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function YearsToGoalPage() {
  const [existingCorpus, setExistingCorpus] = useState(100000);
  const [corpusCagr, setCorpusCagr] = useState(10);
  const [corpusGoal, setCorpusGoal] = useState(1000000);
  const [monthlySIP, setMonthlySIP] = useState<number | null>(null);
  const [sipCagr, setSipCagr] = useState(0);
  const [yearlyStepUp, setYearlyStepUp] = useState(0);
  const [desiredYears, setDesiredYears] = useState(15);

  const results = calculateYearsToGoal(
    existingCorpus,
    corpusCagr,
    corpusGoal,
    monthlySIP,
    sipCagr,
    yearlyStepUp,
    desiredYears
  );

  const sipDisabled = !monthlySIP || monthlySIP <= 0;

  return (
    <motion.div
      className="space-y-6"
      variants={pageVariants}
      initial="hidden"
      animate="show"
    >
      {/* Page header */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="p-2 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-200 text-[var(--foreground)]"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-display font-bold text-[var(--foreground)]">
            Years to Reach Goal
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Find out how long it takes to reach your corpus goal
          </p>
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="glass-card border border-[var(--border-color)] p-6 rounded-2xl space-y-6">
          {/* Section: Existing Corpus */}
          <div className="space-y-4">
            <p className="text-xs font-semibold font-display uppercase tracking-widest text-[var(--accent)]">
              Existing Corpus
            </p>
            <InputField
              label="Current Portfolio Value"
              type="number"
              value={existingCorpus}
              onChange={(e) => setExistingCorpus(Number(e.target.value))}
              min={0}
              step={1000}
            />
            <RangeSlider
              label="Portfolio CAGR"
              value={corpusCagr}
              onChange={setCorpusCagr}
              min={1}
              max={25}
              unit="%"
            />
          </div>

          <div className="h-px bg-[var(--border-color)]" />

          {/* Section: Goal */}
          <div className="space-y-4">
            <p className="text-xs font-semibold font-display uppercase tracking-widest text-[var(--accent)]">
              Goal
            </p>
            <InputField
              label="Target Corpus Goal"
              type="number"
              value={corpusGoal}
              onChange={(e) => setCorpusGoal(Number(e.target.value))}
              min={1000}
              step={1000}
            />
            <RangeSlider
              label="Desired Years"
              value={desiredYears}
              onChange={setDesiredYears}
              min={1}
              max={40}
              unit=" yrs"
            />
          </div>

          <div className="h-px bg-[var(--border-color)]" />

          {/* Section: SIP (optional) */}
          <div className="space-y-4">
            <p className="text-xs font-semibold font-display uppercase tracking-widest text-[var(--accent)]">
              SIP Contribution <span className="normal-case font-normal text-[var(--muted-foreground)]">(optional)</span>
            </p>
            <InputField
              label="Monthly SIP Amount"
              type="number"
              value={monthlySIP ?? ""}
              onChange={(e) => setMonthlySIP(e.target.value ? Number(e.target.value) : null)}
              placeholder="Enter monthly SIP (optional)"
              min={0}
              step={100}
            />
            <RangeSlider
              label="SIP CAGR"
              value={sipCagr}
              onChange={setSipCagr}
              min={0}
              max={25}
              unit="%"
              disabled={sipDisabled}
              disabledMessage="Please enter monthly SIP amount first"
            />
            <RangeSlider
              label="Yearly SIP Step-up"
              value={yearlyStepUp}
              onChange={setYearlyStepUp}
              min={0}
              max={20}
              unit="%"
              disabled={sipDisabled}
              disabledMessage="Please enter monthly SIP amount first"
            />
          </div>
        </div>

        {/* Results */}
        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <AnimatePresence mode="wait">
              {results.achievable ? (
                <motion.div
                  key="achievable"
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
                    <span className="font-display font-semibold text-emerald-700 dark:text-emerald-300">
                      Goal Achievable!
                    </span>
                  </div>
                  <p className="text-sm text-emerald-700/80 dark:text-emerald-300/70 mb-3">
                    Your corpus goal will be reached in:
                  </p>
                  <p className="text-3xl sm:text-4xl font-display font-bold text-emerald-700 dark:text-emerald-300 tabular-nums">
                    {results.yearsNeeded} years
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="not-achievable"
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
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <span className="font-display font-semibold text-amber-700 dark:text-amber-300">
                      Goal Not Reachable
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-amber-700/80 dark:text-amber-300/70 uppercase tracking-wide mb-1">
                        Projected Corpus at {desiredYears} years
                      </p>
                      <AnimatedNumber
                        value={results.projectedCorpus || 0}
                        className="text-2xl font-display font-bold text-amber-700 dark:text-amber-300 tabular-nums"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-amber-700/80 dark:text-amber-300/70 uppercase tracking-wide mb-1">Shortfall</p>
                      <AnimatedNumber
                        value={results.shortfall || 0}
                        className="text-2xl font-display font-bold text-amber-700 dark:text-amber-300 tabular-nums"
                      />
                    </div>
                    <div className="pt-3 border-t border-amber-500/30 dark:border-amber-400/20">
                      <p className="text-xs text-amber-700/80 dark:text-amber-300/70 uppercase tracking-wide mb-1">
                        Years needed to reach goal
                      </p>
                      <p className="text-2xl font-display font-bold text-amber-700 dark:text-amber-300 tabular-nums">
                        {results.extrapolatedYears} years
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4" variants={item}>
            <ResultDisplay label="Current Corpus" value={existingCorpus} />
            <ResultDisplay label="Goal Amount" value={corpusGoal} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
