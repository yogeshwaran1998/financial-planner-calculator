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
import { calculateSIPGrowth, generateYearlyData } from "@/lib/calculations";

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

export default function SIPGrowthPage() {
  const [monthlySIP, setMonthlySIP] = useState(5000);
  const [cagr, setCagr] = useState(12);
  const [years, setYears] = useState(10);
  const [yearlyStepUp, setYearlyStepUp] = useState(5);

  const results = calculateSIPGrowth(monthlySIP, cagr, years, yearlyStepUp);
  const chartData = generateYearlyData(years, "sip", undefined, monthlySIP, cagr, yearlyStepUp);

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
            SIP Growth Calculator
          </h2>
          <p className="text-sm text-[var(--muted-foreground)]">
            Calculate returns with monthly SIP investments and yearly step-up
          </p>
        </div>
      </div>

      {/* Main 2-col layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-6 glass-card border border-[var(--border-color)] p-6 rounded-2xl">
          <InputField
            label="Monthly SIP Amount"
            type="number"
            value={monthlySIP}
            onChange={(e) => setMonthlySIP(Number(e.target.value))}
            min={100}
            step={100}
          />
          <RangeSlider
            label="Expected CAGR"
            value={cagr}
            onChange={setCagr}
            min={1}
            max={25}
            unit="%"
          />
          <RangeSlider
            label="Investment Duration"
            value={years}
            onChange={setYears}
            min={1}
            max={30}
            unit=" yrs"
          />
          <RangeSlider
            label="Yearly SIP Step-up"
            value={yearlyStepUp}
            onChange={setYearlyStepUp}
            min={0}
            max={20}
            unit="%"
          />
        </div>

        {/* Results */}
        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <ResultDisplay label="Final Maturity Corpus" value={results.finalValue} highlight />
          </motion.div>
          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4" variants={item}>
            <ResultDisplay label="Total Invested" value={results.totalInvested} />
            <ResultDisplay label="Total Returns" value={results.returns} />
          </motion.div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="glass-card border border-[var(--border-color)] p-6 rounded-2xl">
        <h3 className="text-base font-display font-semibold text-[var(--foreground)] mb-5">
          Growth Over Time
        </h3>
        <InvestmentChart data={chartData} />
      </div>
    </motion.div>
  );
}
