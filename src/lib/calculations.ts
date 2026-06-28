/**
 * Calculate Future Value of a corpus
 * FV = PV * (1 + r/100)^n
 */
export function calculateCorpusFutureValue(
  presentValue: number,
  cagr: number,
  years: number
): number {
  if (years === 0) return presentValue;
  const rate = cagr / 100;
  return presentValue * Math.pow(1 + rate, years);
}

/**
 * Calculate SIP Growth with yearly step-up
 * Returns { finalValue, totalInvested, returns }
 */
export function calculateSIPGrowth(
  monthlySIP: number,
  cagr: number,
  years: number,
  yearlyStepUp: number
): { finalValue: number; totalInvested: number; returns: number } {
  let currentMonthlySIP = monthlySIP;
  let totalInvested = 0;
  let finalValue = 0;
  const monthlyRate = cagr / 100 / 12;

  for (let year = 0; year < years; year++) {
    const monthsInYear = 12;
    const stepUpAmount = currentMonthlySIP * (yearlyStepUp / 100);

    for (let month = 0; month < monthsInYear; month++) {
      const monthsRemaining = (years - year) * 12 - month;
      const growthFactor = Math.pow(1 + monthlyRate, monthsRemaining);
      finalValue += currentMonthlySIP * growthFactor;
      totalInvested += currentMonthlySIP;
    }

    if (year < years - 1) {
      currentMonthlySIP += stepUpAmount;
    }
  }

  return {
    finalValue: Math.round(finalValue),
    totalInvested: Math.round(totalInvested),
    returns: Math.round(finalValue - totalInvested),
  };
}

/**
 * Calculate years needed to reach corpus goal
 * If achievable within desiredYears, returns exact years (decimal)
 * If not achievable, returns projected value, shortfall, and extrapolated years
 */
export function calculateYearsToGoal(
  existingCorpus: number,
  corpusCagr: number,
  corpusGoal: number,
  monthlySIP: number | null,
  sipCagr: number,
  yearlyStepUp: number,
  desiredYears: number
): {
  achievable: boolean;
  yearsNeeded?: number;
  projectedCorpus?: number;
  shortfall?: number;
  extrapolatedYears?: number;
} {
  const corpusRate = corpusCagr / 100;
  const sipRate = sipCagr / 100 / 12;
  const stepUpDecimal = yearlyStepUp / 100;

  if (!monthlySIP || monthlySIP <= 0) {
    // No SIP - just calculate compound growth on existing corpus
    const finalCorpus = existingCorpus * Math.pow(1 + corpusRate, desiredYears);

    if (finalCorpus >= corpusGoal) {
      // Binary search for exact years
      let low = 0, high = desiredYears;
      while (high - low > 0.01) {
        const mid = (low + high) / 2;
        const value = existingCorpus * Math.pow(1 + corpusRate, mid);
        if (value >= corpusGoal) high = mid;
        else low = mid;
      }
      return { achievable: true, yearsNeeded: Math.round(high * 10) / 10 };
    } else {
      const shortfall = corpusGoal - finalCorpus;
      // Extrapolate years needed
      let years = desiredYears;
      let value = finalCorpus;
      while (value < corpusGoal && years < 100) {
        years += 0.5;
        value = existingCorpus * Math.pow(1 + corpusRate, years);
      }
      return {
        achievable: false,
        projectedCorpus: Math.round(finalCorpus),
        shortfall: Math.round(shortfall),
        extrapolatedYears: Math.round(years * 10) / 10,
      };
    }
  }

  // With SIP - iterate year by year to find exact point
  let currentCorpus = existingCorpus;
  let currentMonthlySIP = monthlySIP;
  const desiredMonths = Math.ceil(desiredYears * 12);

  for (let month = 0; month < desiredMonths; month++) {
    // Monthly compounding on existing corpus
    currentCorpus *= (1 + corpusRate / 12);
    // Add SIP
    currentCorpus += currentMonthlySIP;

    // Apply step-up at start of each year
    if (month > 0 && month % 12 === 0) {
      currentMonthlySIP *= (1 + stepUpDecimal);
    }
  }

  if (currentCorpus >= corpusGoal) {
    // Binary search for exact month
    let low = 0, high = desiredMonths;
    while (high - low > 0.1) {
      const mid = Math.floor((low + high) / 2);
      let testCorpus = existingCorpus;
      let testSIP = monthlySIP;
      for (let m = 0; m < mid; m++) {
        testCorpus *= (1 + corpusRate / 12);
        testCorpus += testSIP;
        if (m > 0 && m % 12 === 0) testSIP *= (1 + stepUpDecimal);
      }
      if (testCorpus >= corpusGoal) high = mid;
      else low = mid;
    }
    const yearsNeeded = high / 12;
    return { achievable: true, yearsNeeded: Math.round(yearsNeeded * 10) / 10 };
  } else {
    const shortfall = corpusGoal - currentCorpus;
    // Extrapolate
    let extraMonths = 0;
    let value = currentCorpus;
    let extrapolatedSIP = currentMonthlySIP;
    while (value < corpusGoal && extraMonths < 1200) {
      value *= (1 + corpusRate / 12);
      value += extrapolatedSIP;
      extraMonths++;
      if (extraMonths % 12 === 0) extrapolatedSIP *= (1 + stepUpDecimal);
    }
    const extrapolatedYears = (desiredMonths + extraMonths) / 12;
    return {
      achievable: false,
      projectedCorpus: Math.round(currentCorpus),
      shortfall: Math.round(shortfall),
      extrapolatedYears: Math.round(extrapolatedYears * 10) / 10,
    };
  }
}

/**
 * Generate yearly data for charts
 */
export function generateYearlyData(
  years: number,
  calculator: "corpus" | "sip",
  initialValue?: number,
  monthlySIP?: number,
  cagr?: number,
  yearlyStepUp?: number
): Array<{ year: number; invested: number; returns: number; total: number }> {
  const data = [];
  const monthlyRate = (cagr || 0) / 100 / 12;
  const stepUpDecimal = (yearlyStepUp || 0) / 100;

  if (calculator === "corpus" && initialValue) {
    const rate = (cagr || 0) / 100;
    for (let year = 1; year <= years; year++) {
      const total = initialValue * Math.pow(1 + rate, year);
      const invested = initialValue;
      const returns = total - invested;
      data.push({ year, invested, returns, total: Math.round(total) });
    }
  } else if (calculator === "sip" && monthlySIP) {
    // Running balance (annuity-due): each month, add SIP then apply growth.
    // Produces the real portfolio value at each year-end, not a future-projected figure.
    let currentMonthlySIP = monthlySIP;
    let totalInvested = 0;
    let balance = 0;

    for (let year = 1; year <= years; year++) {
      for (let month = 0; month < 12; month++) {
        balance = (balance + currentMonthlySIP) * (1 + monthlyRate);
        totalInvested += currentMonthlySIP;
      }
      data.push({
        year,
        invested: Math.round(totalInvested),
        returns: Math.round(balance - totalInvested),
        total: Math.round(balance),
      });
      currentMonthlySIP *= (1 + stepUpDecimal);
    }
  }

  return data;
}

// ─── Goal SIP ────────────────────────────────────────────────────────────────
/**
 * Calculate the monthly SIP needed to reach a target corpus.
 * Uses annuity-due formula: SIP = FV * i / ((1+i)^n - 1) / (1+i)
 */
export function calculateGoalSIP(
  targetCorpus: number,
  cagr: number,
  years: number
): { monthlySIP: number; totalInvested: number; returns: number } {
  const i = cagr / 100 / 12;
  const n = years * 12;
  if (i === 0) {
    const sip = targetCorpus / n;
    return { monthlySIP: Math.ceil(sip), totalInvested: Math.round(sip * n), returns: 0 };
  }
  const sip = (targetCorpus * i) / ((Math.pow(1 + i, n) - 1) * (1 + i));
  const totalInvested = sip * n;
  return {
    monthlySIP: Math.ceil(sip),
    totalInvested: Math.round(totalInvested),
    returns: Math.round(targetCorpus - totalInvested),
  };
}

export function generateGoalSIPData(
  targetCorpus: number,
  cagr: number,
  years: number
): Array<{ year: number; invested: number; returns: number; total: number }> {
  const { monthlySIP } = calculateGoalSIP(targetCorpus, cagr, years);
  return generateYearlyData(years, "sip", undefined, monthlySIP, cagr, 0);
}

// ─── SWP ─────────────────────────────────────────────────────────────────────
/**
 * Simulate systematic withdrawals from a corpus.
 * Returns monthly schedule of balance, total withdrawn, months until depletion.
 */
export function calculateSWP(
  initialCorpus: number,
  monthlyWithdrawal: number,
  annualReturn: number,
  years: number
): {
  finalBalance: number;
  totalWithdrawn: number;
  monthsLast: number; // -1 means corpus outlasts the period
  depleted: boolean;
} {
  const i = annualReturn / 100 / 12;
  let balance = initialCorpus;
  let totalWithdrawn = 0;
  const months = years * 12;

  for (let m = 1; m <= months; m++) {
    balance = balance * (1 + i) - monthlyWithdrawal;
    totalWithdrawn += monthlyWithdrawal;
    if (balance <= 0) {
      return {
        finalBalance: 0,
        totalWithdrawn: Math.round(totalWithdrawn + balance), // adjust last partial
        monthsLast: m,
        depleted: true,
      };
    }
  }
  return {
    finalBalance: Math.round(balance),
    totalWithdrawn: Math.round(totalWithdrawn),
    monthsLast: months,
    depleted: false,
  };
}

export function generateSWPData(
  initialCorpus: number,
  monthlyWithdrawal: number,
  annualReturn: number,
  years: number
): Array<{ year: number; balance: number }> {
  const i = annualReturn / 100 / 12;
  let balance = initialCorpus;
  const data: Array<{ year: number; balance: number }> = [];
  for (let yr = 1; yr <= years; yr++) {
    for (let m = 0; m < 12; m++) {
      balance = balance * (1 + i) - monthlyWithdrawal;
      if (balance <= 0) { balance = 0; }
    }
    data.push({ year: yr, balance: Math.round(balance) });
    if (balance === 0) break;
  }
  return data;
}

// ─── Retirement Planner ──────────────────────────────────────────────────────
/**
 * Estimate retirement corpus needed and monthly SIP to reach it.
 * Uses real-return annuity for post-retirement income, then Goal-SIP for accumulation.
 */
export function calculateRetirement(
  currentAge: number,
  retireAge: number,
  monthlyExpense: number,
  inflationRate: number,
  preReturnRate: number,
  postReturnRate: number,
  lifeExpectancy: number,
  existingSavings: number
): {
  corpusNeeded: number;
  expenseAtRetire: number;
  monthlySIPNeeded: number;
  existingSavingsGrowth: number;
  sipCorpusTarget: number;
} {
  const yearsToRetire = retireAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retireAge;
  const infl = inflationRate / 100;
  const r = postReturnRate / 100 / 12; // monthly post-retirement return
  const g = infl / 12; // monthly inflation
  const n = yearsInRetirement * 12;

  // Monthly expense adjusted for inflation at retirement
  const expenseAtRetire = monthlyExpense * Math.pow(1 + infl, yearsToRetire);

  // Present value of growing annuity (post-retirement)
  let corpusNeeded: number;
  if (Math.abs(r - g) < 0.0001) {
    corpusNeeded = expenseAtRetire * n;
  } else {
    corpusNeeded = expenseAtRetire * (1 - Math.pow((1 + g) / (1 + r), n)) / (r - g);
  }

  // How much existing savings will grow by retirement
  const existingSavingsGrowth = existingSavings * Math.pow(1 + preReturnRate / 100, yearsToRetire);
  const sipCorpusTarget = Math.max(0, corpusNeeded - existingSavingsGrowth);

  // Monthly SIP needed to cover the gap
  const { monthlySIP } = calculateGoalSIP(sipCorpusTarget, preReturnRate, yearsToRetire);

  return {
    corpusNeeded: Math.round(corpusNeeded),
    expenseAtRetire: Math.round(expenseAtRetire),
    monthlySIPNeeded: sipCorpusTarget > 0 ? Math.ceil(monthlySIP) : 0,
    existingSavingsGrowth: Math.round(existingSavingsGrowth),
    sipCorpusTarget: Math.round(sipCorpusTarget),
  };
}

export function generateRetirementData(
  currentAge: number,
  retireAge: number,
  monthlySIP: number,
  preReturnRate: number,
  existingSavings: number = 0
): Array<{ year: number; invested: number; returns: number; total: number }> {
  const years = retireAge - currentAge;
  const monthlyRate = preReturnRate / 100 / 12;
  const annualRate = preReturnRate / 100;
  // Running SIP balance (annuity-due)
  let balance = 0;
  // Track total invested: existing principal + SIP contributions
  let totalInvested = existingSavings;
  const data = [];
  for (let year = 1; year <= years; year++) {
    for (let month = 0; month < 12; month++) {
      balance = (balance + monthlySIP) * (1 + monthlyRate);
    }
    totalInvested += monthlySIP * 12;
    // Existing savings grow as a lump sum alongside the SIP
    const lumpGrowth = existingSavings * Math.pow(1 + annualRate, year);
    const total = balance + lumpGrowth;
    data.push({
      year,
      invested: Math.round(totalInvested),
      returns: Math.round(total - totalInvested),
      total: Math.round(total),
    });
  }
  return data;
}

// ─── FD ──────────────────────────────────────────────────────────────────────
/**
 * Fixed Deposit: M = P * (1 + r/f)^(f*t)
 * compoundFreq: 1=annual, 2=half-yearly, 4=quarterly, 12=monthly
 */
export function calculateFD(
  principal: number,
  ratePercent: number,
  years: number,
  compoundFreq: number
): { maturityValue: number; totalInterest: number } {
  const maturityValue = principal * Math.pow(1 + ratePercent / 100 / compoundFreq, compoundFreq * years);
  return {
    maturityValue: Math.round(maturityValue),
    totalInterest: Math.round(maturityValue - principal),
  };
}

export function generateFDData(
  principal: number,
  ratePercent: number,
  years: number,
  compoundFreq: number
): Array<{ year: number; invested: number; returns: number; total: number }> {
  const data = [];
  for (let yr = 1; yr <= years; yr++) {
    const total = principal * Math.pow(1 + ratePercent / 100 / compoundFreq, compoundFreq * yr);
    data.push({ year: yr, invested: principal, returns: Math.round(total - principal), total: Math.round(total) });
  }
  return data;
}

// ─── RD ──────────────────────────────────────────────────────────────────────
/**
 * Recurring Deposit (quarterly compounding, Indian standard):
 * M = D * ((1+i)^n - 1) / i * (1+i)  where i = r/4/3 (quarterly rate / 3 months)
 */
export function calculateRD(
  monthlyDeposit: number,
  ratePercent: number,
  years: number
): { maturityValue: number; totalDeposited: number; totalInterest: number } {
  const n = years * 12;
  const i = ratePercent / 100 / 4; // quarterly rate
  // Each monthly deposit compounds quarterly; approximate with monthly rate
  const iM = ratePercent / 100 / 12;
  const maturityValue = monthlyDeposit * ((Math.pow(1 + iM, n) - 1) / iM) * (1 + iM);
  const totalDeposited = monthlyDeposit * n;
  return {
    maturityValue: Math.round(maturityValue),
    totalDeposited: Math.round(totalDeposited),
    totalInterest: Math.round(maturityValue - totalDeposited),
  };
}

export function generateRDData(
  monthlyDeposit: number,
  ratePercent: number,
  years: number
): Array<{ year: number; invested: number; returns: number; total: number }> {
  const data = [];
  const iM = ratePercent / 100 / 12;
  for (let yr = 1; yr <= years; yr++) {
    const n = yr * 12;
    const total = monthlyDeposit * ((Math.pow(1 + iM, n) - 1) / iM) * (1 + iM);
    const invested = monthlyDeposit * n;
    data.push({ year: yr, invested: Math.round(invested), returns: Math.round(total - invested), total: Math.round(total) });
  }
  return data;
}

// ─── PPF ─────────────────────────────────────────────────────────────────────
/**
 * PPF: annual deposits, compounded annually. Each year's deposit earns interest
 * for the remaining years. Standard 15-year lock-in, extendable in 5-yr blocks.
 */
export function calculatePPF(
  yearlyDeposit: number,
  ratePercent: number,
  years: number
): { maturityValue: number; totalDeposited: number; totalInterest: number } {
  const r = ratePercent / 100;
  let maturityValue = 0;
  for (let yr = 1; yr <= years; yr++) {
    maturityValue += yearlyDeposit * Math.pow(1 + r, years - yr + 1);
  }
  const totalDeposited = yearlyDeposit * years;
  return {
    maturityValue: Math.round(maturityValue),
    totalDeposited: Math.round(totalDeposited),
    totalInterest: Math.round(maturityValue - totalDeposited),
  };
}

export function generatePPFData(
  yearlyDeposit: number,
  ratePercent: number,
  years: number
): Array<{ year: number; invested: number; returns: number; total: number }> {
  const r = ratePercent / 100;
  const data = [];
  for (let endYr = 1; endYr <= years; endYr++) {
    let total = 0;
    for (let yr = 1; yr <= endYr; yr++) {
      total += yearlyDeposit * Math.pow(1 + r, endYr - yr + 1);
    }
    const invested = yearlyDeposit * endYr;
    data.push({ year: endYr, invested: Math.round(invested), returns: Math.round(total - invested), total: Math.round(total) });
  }
  return data;
}

// ─── EMI ─────────────────────────────────────────────────────────────────────
/**
 * EMI = P * i * (1+i)^n / ((1+i)^n - 1)
 */
export function calculateEMI(
  loanAmount: number,
  annualRatePercent: number,
  tenureYears: number
): { emi: number; totalPayment: number; totalInterest: number } {
  const i = annualRatePercent / 100 / 12;
  const n = tenureYears * 12;
  if (i === 0) {
    const emi = loanAmount / n;
    return { emi: Math.round(emi), totalPayment: Math.round(loanAmount), totalInterest: 0 };
  }
  const emi = (loanAmount * i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  const totalPayment = emi * n;
  return {
    emi: Math.round(emi),
    totalPayment: Math.round(totalPayment),
    totalInterest: Math.round(totalPayment - loanAmount),
  };
}

export function generateEMIAmortization(
  loanAmount: number,
  annualRatePercent: number,
  tenureYears: number
): Array<{ year: number; principal: number; interest: number; balance: number }> {
  const i = annualRatePercent / 100 / 12;
  const n = tenureYears * 12;
  const { emi } = calculateEMI(loanAmount, annualRatePercent, tenureYears);
  let balance = loanAmount;
  const data = [];

  for (let yr = 1; yr <= tenureYears; yr++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let m = 0; m < 12; m++) {
      if (balance <= 0) break;
      const intPart = balance * i;
      const prinPart = Math.min(emi - intPart, balance);
      yearInterest += intPart;
      yearPrincipal += prinPart;
      balance = Math.max(0, balance - prinPart);
    }
    data.push({ year: yr, principal: Math.round(yearPrincipal), interest: Math.round(yearInterest), balance: Math.round(balance) });
  }
  return data;
}