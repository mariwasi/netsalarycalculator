const euro = new Intl.NumberFormat("it-IT", {
  style: "currency",
  currency: "EUR",
  // Explicit `true`: the locale default ("auto") skips the thousands separator
  // for four-digit amounts (1903,85), while the site writes 1.903,85 everywhere.
  useGrouping: true,
});

export function formatEuro(value: number): string {
  return euro.format(value);
}

export function formatPercent(value: number, digits = 1): string {
  return `${new Intl.NumberFormat("it-IT", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)}%`;
}
