# PlanDhan — Financial Calculators for Indian Investors

> Free, open-source financial planning calculators. No login, no ads — just the math you need to plan your investments.

**Live demo:** [plandhan.netlify.app](https://plandhan.netlify.app)

---

## Calculators

| Calculator | What it does |
| --- | --- |
| **SIP Growth** | Projects the future value of recurring SIP investments |
| **Goal SIP** | Calculates the monthly SIP needed to reach a target corpus |
| **FD (Fixed Deposit)** | Computes maturity amount for fixed deposit investments |
| **RD (Recurring Deposit)** | Maturity value for recurring deposit schemes |
| **PPF (Public Provident Fund)** | 15-year PPF corpus projection with compounding |
| **EMI** | Loan EMI, total interest, and amortisation breakdown |
| **SWP (Systematic Withdrawal Plan)** | How long a corpus lasts under monthly withdrawals |
| **Retirement** | Corpus needed to sustain a target monthly income in retirement |
| **Corpus Future Value** | Future value of a lump sum at a given return rate |
| **Years to Goal** | How many years to reach a corpus at a given SIP + return |

## Features

- **No account required** — all calculations run client-side in the browser
- **Multi-currency support** — switch between INR, USD, EUR, and more via the currency context
- **Interactive charts** — recharts-powered area and donut charts for visual breakdowns
- **Animated results** — smooth number transitions powered by framer-motion
- **Dark mode** — next-themes with system preference detection
- **Fully responsive** — works on mobile and desktop

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Charts | Recharts |
| Animations | Framer Motion |
| Icons | Lucide React |
| Dark mode | next-themes |

## Getting Started

### 1. Clone

```bash
git clone https://github.com/yogeshwaran1998/financial-planner-calculator.git
cd financial-planner-calculator
```

### 2. Install

```bash
npm install
```

### 3. Run

```bash
npm run dev
```

App starts at `http://localhost:3000`.

No environment variables required — all calculations are purely client-side.

## Project Structure

```text
src/
├── app/
│   ├── page.tsx                     # Home — calculator grid
│   └── calculators/
│       ├── sip-growth/page.tsx
│       ├── goal-sip/page.tsx
│       ├── fd/page.tsx
│       ├── rd/page.tsx
│       ├── ppf/page.tsx
│       ├── emi/page.tsx
│       ├── swp/page.tsx
│       ├── retirement/page.tsx
│       ├── corpus-future-value/page.tsx
│       └── years-to-goal/page.tsx
├── context/
│   └── CurrencyContext.tsx          # Global currency selection
├── lib/
│   ├── calculators.ts               # Pure financial calculation functions
│   ├── calculations.ts              # Shared math helpers
│   └── currencies.ts                # Supported currency definitions
└── components/
    └── ui/                          # Shared UI: AnimatedNumber, InvestmentChart, DonutChart, …
```

## License

MIT — see [LICENSE](LICENSE).
