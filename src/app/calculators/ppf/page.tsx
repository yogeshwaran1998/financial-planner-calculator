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
import { calculatePPF, generatePPFData } from "@/lib/calculations";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

export default function PPFPage() {
  const [yearlyDeposit, setYearlyDeposit] = useState(150000);
  const [rate, setRate] = useState(7.1);
  const [years, setYears] = useState(15);

  const results = calculatePPF(yearlyDeposit, rate, years);
  const chartData = generatePPFData(yearlyDeposit, rate, years);

  return (
    <motion.div className="space-y-6" variants={pageVariants} initial="hidden" animate="show">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-200 text-[var(--foreground)]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-display font-bold text-[var(--foreground)]">PPF Calculator</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Estimate your Public Provident Fund maturity corpus</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6 glass-card border border-[var(--border-color)] p-6 rounded-2xl">
          <InputField
            label="Yearly Deposit"
            type="number"
            value={yearlyDeposit}
            onChange={(e) => setYearlyDeposit(Math.min(Number(e.target.value), 150000))}
            min={500}
            step={500}
          />
          <p className="text-xs text-[var(--muted-foreground)] -mt-4">Max ₹1,50,000/year under Section 80C</p>
          <RangeSlider label="Interest Rate" value={rate} onChange={setRate} min={6} max={9} step={0.1} unit="%" />
          <RangeSlider label="Duration" value={years} onChange={setYears} min={15} max={50} unit=" yrs" />
          <p className="text-xs text-[var(--muted-foreground)] -mt-4">PPF has a 15-year lock-in, extendable in 5-year blocks</p>
        </div>

        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <ResultDisplay label="Maturity Value" value={results.maturityValue} highlight />
          </motion.div>
          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4" variants={item}>
            <ResultDisplay label="Total Deposited" value={results.totalDeposited} />
            <ResultDisplay label="Total Interest" value={results.totalInterest} />
          </motion.div>
        </motion.div>
      </div>

      <div className="glass-card border border-[var(--border-color)] p-6 rounded-2xl">
        <h3 className="text-base font-display font-semibold text-[var(--foreground)] mb-5">Growth Over Time</h3>
        <InvestmentChart data={chartData} />
      </div>
    </motion.div>
  );
}
