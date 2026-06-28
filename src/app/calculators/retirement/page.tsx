"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { InputField } from "@/components/ui/InputField";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { ResultDisplay } from "@/components/ui/ResultDisplay";
import { InvestmentChart } from "@/components/ui/InvestmentChart";
import { calculateRetirement, generateRetirementData } from "@/lib/calculations";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

export default function RetirementPage() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [preReturn, setPreReturn] = useState(12);
  const [postReturn, setPostReturn] = useState(7);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [existingSavings, setExistingSavings] = useState(0);

  const results = calculateRetirement(
    currentAge, retireAge, monthlyExpense, inflationRate,
    preReturn, postReturn, lifeExpectancy, existingSavings
  );
  const chartData = generateRetirementData(currentAge, retireAge, results.monthlySIPNeeded, preReturn, existingSavings);

  return (
    <motion.div className="space-y-6" variants={pageVariants} initial="hidden" animate="show">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-200 text-[var(--foreground)]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-display font-bold text-[var(--foreground)]">Retirement Planner</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Estimate your retirement corpus and monthly SIP needed</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="glass-card border border-[var(--border-color)] p-6 rounded-2xl space-y-6">
          {/* Section: Personal */}
          <div className="space-y-4">
            <p className="text-xs font-semibold font-display uppercase tracking-widest text-[var(--accent)]">Personal</p>
            <div className="grid grid-cols-2 gap-4">
              <RangeSlider label="Current Age" value={currentAge} onChange={setCurrentAge} min={18} max={60} unit=" yrs" />
              <RangeSlider label="Retire Age" value={retireAge} onChange={(v) => setRetireAge(Math.max(v, currentAge + 1))} min={40} max={75} unit=" yrs" />
            </div>
            <RangeSlider label="Life Expectancy" value={lifeExpectancy} onChange={setLifeExpectancy} min={60} max={100} unit=" yrs" />
          </div>
          <div className="h-px bg-[var(--border-color)]" />
          {/* Section: Expenses */}
          <div className="space-y-4">
            <p className="text-xs font-semibold font-display uppercase tracking-widest text-[var(--accent)]">Expenses</p>
            <InputField
              label="Monthly Expense Today"
              type="number"
              value={monthlyExpense}
              onChange={(e) => setMonthlyExpense(Number(e.target.value))}
              min={5000}
              step={5000}
            />
            <RangeSlider label="Inflation Rate" value={inflationRate} onChange={setInflationRate} min={1} max={12} unit="%" />
          </div>
          <div className="h-px bg-[var(--border-color)]" />
          {/* Section: Returns */}
          <div className="space-y-4">
            <p className="text-xs font-semibold font-display uppercase tracking-widest text-[var(--accent)]">Returns</p>
            <RangeSlider label="Pre-Retirement Return" value={preReturn} onChange={setPreReturn} min={1} max={25} unit="%" />
            <RangeSlider label="Post-Retirement Return" value={postReturn} onChange={setPostReturn} min={1} max={15} unit="%" />
            <InputField
              label="Existing Savings"
              type="number"
              value={existingSavings}
              onChange={(e) => setExistingSavings(Number(e.target.value))}
              min={0}
              step={10000}
            />
          </div>
        </div>

        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <ResultDisplay label="Required Retirement Corpus" value={results.corpusNeeded} highlight />
          </motion.div>
          <motion.div variants={item}>
            <ResultDisplay label="Monthly SIP Needed" value={results.monthlySIPNeeded} highlight />
          </motion.div>
          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4" variants={item}>
            <ResultDisplay label="Expense at Retirement" value={results.expenseAtRetire} />
            <ResultDisplay label="Savings Growth" value={results.existingSavingsGrowth} />
          </motion.div>
          <motion.div variants={item}>
            <ResultDisplay label="Corpus to Build via SIP" value={results.sipCorpusTarget} />
          </motion.div>
        </motion.div>
      </div>

      <div className="glass-card border border-[var(--border-color)] p-6 rounded-2xl">
        <h3 className="text-base font-display font-semibold text-[var(--foreground)] mb-5">Corpus Accumulation</h3>
        <InvestmentChart data={chartData} />
      </div>
    </motion.div>
  );
}
