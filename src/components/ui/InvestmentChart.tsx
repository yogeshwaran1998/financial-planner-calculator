"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/currencies";

interface InvestmentChartProps {
  data: Array<{ year: number; invested: number; returns: number; total: number }>;
}

export function InvestmentChart({ data }: InvestmentChartProps) {
  const { currency } = useCurrency();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="border border-[var(--border-color)] rounded-xl p-3 shadow-xl"
          style={{ background: "var(--surface-solid)" }}
        >
          <p className="font-display font-semibold text-[var(--foreground)] mb-2">
            Year {label}
          </p>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "url(#investedGrad)" }} />
              <span className="text-[var(--muted-foreground)]">Invested:</span>
              <span className="font-medium text-[var(--foreground)] tabular-nums ml-auto pl-4">
                {formatCurrency(payload[0]?.value || 0, currency)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-emerald-400" />
              <span className="text-[var(--muted-foreground)]">Returns:</span>
              <span className="font-medium text-[var(--foreground)] tabular-nums ml-auto pl-4">
                {formatCurrency(payload[1]?.value || 0, currency)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm border-t border-[var(--border-color)] pt-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 bg-amber-400" />
              <span className="text-[var(--foreground)] font-medium">Total:</span>
              <span className="font-bold text-[var(--foreground)] tabular-nums ml-auto pl-4">
                {formatCurrency(payload[2]?.value || 0, currency)}
              </span>
            </div>
          </div>
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
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }} barCategoryGap="25%">
          <defs>
            <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
            <linearGradient id="returnsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fcd34d" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--border-color)"
            vertical={false}
          />

          <XAxis
            dataKey="year"
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
            minTickGap={16}
          />
          <YAxis
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={tickFormatter}
            width={48}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--border-color)", radius: 6 }} />

          <Legend
            wrapperStyle={{ paddingTop: 16 }}
            formatter={(value) => (
              <span className="text-xs text-[var(--muted-foreground)] capitalize">{value}</span>
            )}
          />

          <Bar dataKey="invested" fill="url(#investedGrad)" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
          <Bar dataKey="returns" fill="url(#returnsGrad)" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
          <Bar dataKey="total" fill="url(#totalGrad)" radius={[4, 4, 0, 0]} isAnimationActive={true} animationDuration={800} animationEasing="ease-out" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
