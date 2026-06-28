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
import { calculateGoalSIP, generateGoalSIPData } from "@/lib/calculations";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};
const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } };

export default function GoalSIPPage() {
  const [targetCorpus, setTargetCorpus] = useState(5000000);
  const [cagr, setCagr] = useState(12);
  const [years, setYears] = useState(15);

  const results = calculateGoalSIP(targetCorpus, cagr, years);
  const chartData = generateGoalSIPData(targetCorpus, cagr, years);

  return (
    <motion.div className="space-y-6" variants={pageVariants} initial="hidden" animate="show">
      <div className="flex items-center gap-4">
        <Link href="/" className="p-2 rounded-xl glass-card border border-[var(--border-color)] hover:border-[var(--accent)] transition-all duration-200 text-[var(--foreground)]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h2 className="text-xl font-display font-bold text-[var(--foreground)]">Goal SIP Calculator</h2>
          <p className="text-sm text-[var(--muted-foreground)]">Find the monthly SIP needed to reach your target corpus</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6 glass-card border border-[var(--border-color)] p-6 rounded-2xl">
          <InputField
            label="Target Corpus"
            type="number"
            value={targetCorpus}
            onChange={(e) => setTargetCorpus(Number(e.target.value))}
            min={100000}
            step={100000}
          />
          <RangeSlider label="Expected CAGR" value={cagr} onChange={setCagr} min={1} max={25} unit="%" />
          <RangeSlider label="Investment Duration" value={years} onChange={setYears} min={1} max={40} unit=" yrs" />
        </div>

        <motion.div className="space-y-4" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={item}>
            <ResultDisplay label="Required Monthly SIP" value={results.monthlySIP} highlight />
          </motion.div>
          <motion.div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4" variants={item}>
            <ResultDisplay label="Total Invested" value={results.totalInvested} />
            <ResultDisplay label="Total Returns" value={results.returns} />
          </motion.div>
        </motion.div>
      </div>

      <div className="glass-card border border-[var(--border-color)] p-6 rounded-2xl">
        <h3 className="text-base font-display font-semibold text-[var(--foreground)] mb-5">Projected Growth</h3>
        <InvestmentChart data={chartData} />
      </div>
    </motion.div>
  );
}
