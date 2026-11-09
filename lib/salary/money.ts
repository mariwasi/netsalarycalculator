/**
 * Round to euro cents, half towards zero.
 * 136.215 → 136.21 and 541.355 → 541.35; a following digit above 5 still rounds away from zero.
 */
export function round2(value: number): number {
  if (!Number.isFinite(value)) return 0;
  const sign = value < 0 ? -1 : 1;
  const scaled = Math.abs(value) * 100;
  const cents = Math.floor(scaled + 1e-9);
  const fraction = scaled - cents;
  const rounded = fraction > 0.5 + 1e-9 ? cents + 1 : cents;
  return (sign * rounded) / 100;
}

/** First four decimal digits, without rounding. Used for art. 12 TUIR ratios. */
export function truncate4(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.trunc(value * 10000) / 10000;
}

/** Apply a percentage expressed in basis points (123 = 1,23%) to an euro amount. */
export function applyBasisPoints(amount: number, basisPoints: number): number {
  const cents = Math.round(amount * 100);
  return Math.round((cents * basisPoints) / 10000) / 100;
}
