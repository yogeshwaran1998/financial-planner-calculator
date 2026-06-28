"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { useCurrency } from "@/context/CurrencyContext";
import { formatCurrency } from "@/lib/currencies";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export function AnimatedNumber({ value, className }: AnimatedNumberProps) {
  const { currency } = useCurrency();
  const displayRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      if (displayRef.current) {
        displayRef.current.textContent = formatCurrency(value, currency);
      }
      return;
    }

    const from = prevValue.current;
    prevValue.current = value;

    const controls = animate(from, value, {
      duration: 0.7,
      ease: "easeOut",
      onUpdate(latest) {
        if (displayRef.current) {
          displayRef.current.textContent = formatCurrency(Math.round(latest), currency);
        }
      },
    });

    return () => controls.stop();
  }, [value, currency]);

  return (
    <span ref={displayRef} className={className} suppressHydrationWarning>
      {formatCurrency(value, currency)}
    </span>
  );
}
