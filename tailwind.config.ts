import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        "surface-solid": "var(--surface-solid)",
        "surface-elevated": "var(--surface-elevated)",
        accent: "var(--accent)",
        "accent-2": "var(--accent-2)",
        "muted-foreground": "var(--muted-foreground)",
        border: "var(--border-color)",
        success: "var(--success)",
        warning: "var(--warning)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, var(--accent), var(--accent-2))",
        "success-gradient": "linear-gradient(135deg, #10b981, #059669)",
        "warning-gradient": "linear-gradient(135deg, #f59e0b, #d97706)",
      },
      boxShadow: {
        glow: "0 0 20px var(--accent-glow)",
        "glow-sm": "0 0 10px var(--accent-glow)",
        "glow-success": "0 0 20px rgba(16,185,129,0.25)",
        "glow-warning": "0 0 20px rgba(245,158,11,0.25)",
        glass: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-sm": "0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
      },
      keyframes: {
        "aurora-1": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(3%, -4%) scale(1.05)" },
          "66%": { transform: "translate(-2%, 3%) scale(0.97)" },
        },
        "aurora-2": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(-4%, 3%) scale(0.95)" },
          "66%": { transform: "translate(3%, -2%) scale(1.08)" },
        },
        "aurora-3": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(2%, -3%) scale(1.03)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "count-up": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "aurora-1": "aurora-1 18s ease-in-out infinite",
        "aurora-2": "aurora-2 22s ease-in-out infinite",
        "aurora-3": "aurora-3 15s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-up": "fade-up 0.4s cubic-bezier(0.16,1,0.3,1) both",
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
