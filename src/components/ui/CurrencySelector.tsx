"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { useCurrency } from "@/context/CurrencyContext";

export function CurrencySelector() {
  const { currency, setCurrency, currencies } = useCurrency();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selected = currencies.find((c) => c.code === currency) ?? currencies[0];

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative flex-shrink-0">
      {/* Compact trigger: ₹ INR */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${selected.name}`}
        className="flex items-center gap-1.5 glass-card border border-[var(--border-color)] rounded-xl px-3 py-2 text-sm font-medium text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer transition-all duration-200 min-h-[40px] whitespace-nowrap hover:border-[var(--accent)]"
      >
        <span className="tabular-nums">{selected.symbol} {selected.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[var(--muted-foreground)] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Popover list — right-aligned, never overflows screen */}
      {open && (
        <ul
          role="listbox"
          aria-label="Select currency"
          className="absolute top-full right-0 mt-2 z-50 min-w-[200px] rounded-2xl border border-[var(--border-color)] py-1.5 shadow-xl overflow-hidden"
          style={{ background: "var(--surface-solid)" }}
        >
          {currencies.map((c) => {
            const isSelected = c.code === currency;
            return (
              <li
                key={c.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setCurrency(c.code);
                  setOpen(false);
                }}
                className={`flex items-center justify-between gap-3 px-4 py-2.5 text-sm cursor-pointer transition-colors duration-150
                  ${isSelected
                    ? "text-[var(--accent)] font-semibold bg-[var(--accent)]/8"
                    : "text-[var(--foreground)] hover:bg-[var(--surface-elevated)]"
                  }`}
              >
                <span>
                  <span className="tabular-nums font-medium">{c.symbol} {c.code}</span>
                  <span className="ml-2 text-[var(--muted-foreground)] font-normal">— {c.name}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
