"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/currencies";

interface BalanceChartProps {
  data: Array<{ year: number; balance: number }>;
}

export function BalanceChart({ data }: BalanceChartProps) {
  const { currency } = useCurrency();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="border border-[var(--border-color)] rounded-xl p-3 shadow-xl"
          style={{ background: "var(--surface-solid)" }}
        >
          <p className="font-display font-semibold text-[var(--foreground)] mb-1">Year {label}</p>
          <p className="text-sm text-[var(--muted-foreground)]">
            Balance:{" "}
            <span className="font-medium text-[var(--foreground)] tabular-nums">
              {formatCurrency(payload[0]?.value || 0, currency)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  const tickFormatter = (value: number) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return String(value);
  };

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
          <defs>
            <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
          <XAxis dataKey="year" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} interval="preserveStartEnd" minTickGap={16} />
          <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={tickFormatter} width={48} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--accent)", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#f43f5e"
            strokeWidth={2}
            fill="url(#balanceGrad)"
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
