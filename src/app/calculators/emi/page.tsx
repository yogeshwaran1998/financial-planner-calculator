"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { InputField } from "@/components/ui/InputField";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { ResultDisplay } from "@/components/ui/ResultDisplay";
import { DonutChart } from "@/components/ui/DonutChart";
import { calculateEMI } from "@/lib/calculations";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

const LOAN_TYPES = [
  { label: "Home Loan", amount: 5000000, rate: 8.5, tenure: 20 },
  { label: "Car Loan", amount: 800000, rate: 9.0, tenure: 5 },
  { label: "Personal", amount: 500000, rate: 14.0, tenure: 3 },
];

export default function EMIPage() {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const results = calculateEMI(loanAmount, interestRate, tenureYears);

  return (
    <motion.div className="space-y-6" variants={pageVariants} initial="hidden" animate="show">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-200 text-[var(--foreground)]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-display font-bold text-[var(--foreground)]">EMI Calculator</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Calculate monthly EMI for home, car, or personal loans</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6 glass-card border border-[var(--border-color)] p-6 rounded-2xl">
          {/* Quick preset buttons */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-[var(--foreground)] opacity-80">Quick Select</label>
            <div className="grid grid-cols-3 gap-2">
              {LOAN_TYPES.map((lt) => (
                <button
                  key={lt.label}
                  onClick={() => { setLoanAmount(lt.amount); setInterestRate(lt.rate); setTenureYears(lt.tenure); }}
                  className="py-2.5 min-h-[40px] px-2 rounded-lg text-xs font-medium glass-card border border-[var(--border-color)] text-[var(--muted-foreground)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-200"
                >
                  {lt.label}
                </button>
              ))}
            </div>
          </div>
          <InputField
            label="Loan Amount"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            min={10000}
            step={10000}
          />
          <RangeSlider label="Annual Interest Rate" value={interestRate} onChange={setInterestRate} min={1} max={30} step={0.1} unit="%" />
          <RangeSlider label="Loan Tenure" value={tenureYears} onChange={setTenureYears} min={1} max={30} unit=" yrs" />
        </div>

        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <ResultDisplay label="Monthly EMI" value={results.emi} highlight />
          </motion.div>
          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4" variants={item}>
            <ResultDisplay label="Total Payment" value={results.totalPayment} />
            <ResultDisplay label="Total Interest" value={results.totalInterest} />
          </motion.div>
          <motion.div variants={item}>
            <ResultDisplay label="Principal Amount" value={loanAmount} />
          </motion.div>
        </motion.div>
      </div>

      <div className="glass-card border border-[var(--border-color)] p-6 rounded-2xl">
        <h3 className="text-base font-display font-semibold text-[var(--foreground)] mb-5">Principal vs Interest Breakup</h3>
        <DonutChart principal={loanAmount} totalInterest={results.totalInterest} />
      </div>
    </motion.div>
  );
}
