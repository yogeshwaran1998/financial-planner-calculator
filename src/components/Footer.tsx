import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { CALCULATORS, CATEGORY_ORDER } from "@/lib/calculators";

export function Footer() {
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    calcs: CALCULATORS.filter((c) => c.category === cat),
  }));

  return (
    <footer className="mt-16 border-t border-[var(--border-color)]">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--accent-2)] flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-display font-semibold text-[var(--foreground)]">PlanDhan</span>
            </Link>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Free, private, instant financial calculators. Nothing leaves your browser.
            </p>
          </div>

          {/* Category cols */}
          {byCategory.map(({ category, calcs }) => (
            <div key={category}>
              <p className="text-xs font-semibold font-display uppercase tracking-widest text-[var(--accent)] mb-3">
                {category}
              </p>
              <ul className="space-y-2">
                {calcs.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={c.href}
                      className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors duration-200"
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="pt-6 border-t border-[var(--border-color)]">
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed max-w-3xl">
            <strong className="text-[var(--foreground)]">Disclaimer:</strong> All calculations are for educational and illustrative purposes only and do not constitute financial, investment, or tax advice. Results are estimates based on the inputs provided and assumed rates of return; actual returns may vary. Consult a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
