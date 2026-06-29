export const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

function formatNumber(amount: number, currencyCode: CurrencyCode): string {
  const n = Math.round(amount);
  if (currencyCode === "INR") {
    // Indian numbering: last 3 digits, then groups of 2
    const str = String(Math.abs(n));
    if (str.length <= 3) return n < 0 ? `-${str}` : str;
    const last3 = str.slice(-3);
    const rest = str.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    const formatted = `${rest},${last3}`;
    return n < 0 ? `-${formatted}` : formatted;
  }
  // All other currencies: standard Western grouping, no locale dependency
  const str = String(Math.abs(n));
  const formatted = str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return n < 0 ? `-${formatted}` : formatted;
}

export function getCurrencySymbol(currencyCode: CurrencyCode): string {
  return currencies.find((c) => c.code === currencyCode)?.symbol ?? "$";
}

export function formatCurrency(amount: number, currencyCode: CurrencyCode): string {
  return `${getCurrencySymbol(currencyCode)}${formatNumber(amount, currencyCode)}`;
}