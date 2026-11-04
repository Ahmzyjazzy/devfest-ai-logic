const naira = new Intl.NumberFormat('en-NG', { maximumFractionDigits: 2 })

// ₦12,500 for whole naira, ₦54,962.50 when there is kobo. No space, no "NGN".
export function formatNaira(amount: number): string {
  const hasKobo = !Number.isInteger(amount)
  const digits = hasKobo
    ? amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : naira.format(amount)
  return `₦${digits}`
}
