"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/currencies";

interface DonutChartProps {
  principal: number;
  totalInterest: number;
}

export function DonutChart({ principal, totalInterest }: DonutChartProps) {
  const { currency } = useCurrency();

  const data = [
    { name: "Principal", value: principal },
    { name: "Interest", value: totalInterest },
  ];

  const COLORS = ["#6474f8", "#f43f5e"];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="border border-[var(--border-color)] rounded-xl p-3 shadow-xl"
          style={{ background: "var(--surface-solid)" }}
        >
          <p className="font-display font-semibold text-[var(--foreground)] mb-1">{payload[0].name}</p>
          <p className="text-sm text-[var(--foreground)] tabular-nums font-medium">
            {formatCurrency(payload[0].value, currency)}
          </p>
          <p className="text-xs text-[var(--muted-foreground)]">
            {((payload[0].value / (principal + totalInterest)) * 100).toFixed(1)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <defs>
            <linearGradient id="principalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="interestGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="100%" stopColor="#e11d48" />
            </linearGradient>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="75%"
            paddingAngle={3}
            dataKey="value"
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          >
            <Cell fill="url(#principalGrad)" />
            <Cell fill="url(#interestGrad)" />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 16 }}
            formatter={(value) => (
              <span className="text-xs text-[var(--muted-foreground)]">{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
