/** Keep test payments confined to previews and live payments confined to production. */
export function reportStripeKey(): string | undefined {
  if (process.env.VERCEL_ENV === 'preview') {
    const key = process.env.STRIPE_SECRET_KEYz
    return key?.startsWith('sk_test_') ? key : undefined
  }
  if (process.env.VERCEL_ENV === 'production') {
    const key = process.env.STRIPE_SECRET_KEY
    return key?.startsWith('sk_live_') ? key : undefined
  }
  const key = process.env.STRIPE_SECRET_KEYz || process.env.STRIPE_SECRET_KEY
  return key?.startsWith('sk_test_') ? key : undefined
}
