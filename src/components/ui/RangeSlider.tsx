"use client";

import { useState } from "react";

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export function RangeSlider({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = "",
  disabled = false,
  disabledMessage,
}: RangeSliderProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleInteraction = () => {
    if (disabled && disabledMessage) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-[var(--foreground)] opacity-80">
          {label}
        </label>
        <span className="text-sm font-semibold font-display px-2 py-0.5 rounded-md bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--accent)] tabular-nums">
          {value}{unit}
        </span>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => !disabled && onChange(Number(e.target.value))}
          onMouseDown={handleInteraction}
          onTouchStart={handleInteraction}
          disabled={disabled}
          className="w-full"
          style={{ "--slider-pct": `${pct}%` } as React.CSSProperties}
        />
        {showTooltip && disabledMessage && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 glass-card border border-[var(--border-color)] text-[var(--foreground)] text-xs px-3 py-1.5 rounded-lg whitespace-nowrap z-10">
            {disabledMessage}
          </div>
        )}
      </div>

      <div className="flex justify-between text-xs text-[var(--muted-foreground)]">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
