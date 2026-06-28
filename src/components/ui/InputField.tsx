"use client";

import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function InputField({ label, hint, className = "", ...props }: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[var(--foreground)] opacity-80">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-2.5 rounded-xl glass-card border border-[var(--border-color)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] transition-all duration-200 tabular-nums ${className}`}
      />
      {hint && (
        <p className="text-xs text-[var(--muted-foreground)]">{hint}</p>
      )}
    </div>
  );
}
