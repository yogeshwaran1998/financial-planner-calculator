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
import { calculateFD, generateFDData } from "@/lib/calculations";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

const FREQ_OPTIONS = [
  { label: "Monthly", value: 12 },
  { label: "Quarterly", value: 4 },
  { label: "Half-Yearly", value: 2 },
  { label: "Annually", value: 1 },
];

export default function FDPage() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);
  const [freq, setFreq] = useState(4);

  const results = calculateFD(principal, rate, years, freq);
  const chartData = generateFDData(principal, rate, years, freq);

  return (
    <motion.div className="space-y-6" variants={pageVariants} initial="hidden" animate="show">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-200 text-[var(--foreground)]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-display font-bold text-[var(--foreground)]">FD Calculator</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Calculate maturity value of a Fixed Deposit</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6 glass-card border border-[var(--border-color)] p-6 rounded-2xl">
          <InputField
            label="Principal Amount"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            min={1000}
            step={1000}
          />
          <RangeSlider label="Interest Rate" value={rate} onChange={setRate} min={1} max={15} step={0.1} unit="%" />
          <RangeSlider label="Duration" value={years} onChange={setYears} min={1} max={20} unit=" yrs" />
          {/* Compounding frequency */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--foreground)] opacity-80">Compounding Frequency</label>
            <div className="grid grid-cols-4 gap-2">
              {FREQ_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setFreq(opt.value)}
                  className={`py-2.5 min-h-[40px] px-2 rounded-lg text-xs font-medium border transition-all duration-200 ${
                    freq === opt.value
                      ? "bg-[var(--accent)] border-[var(--accent)] text-white"
                      : "glass-card border-[var(--border-color)] text-[var(--muted-foreground)] hover:border-[var(--accent)]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <ResultDisplay label="Maturity Value" value={results.maturityValue} highlight />
          </motion.div>
          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4" variants={item}>
            <ResultDisplay label="Principal" value={principal} />
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
