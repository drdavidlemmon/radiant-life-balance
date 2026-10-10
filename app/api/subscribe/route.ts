import { NextRequest, NextResponse } from 'next/server'

const KIT_API_KEY = process.env.KIT_API_KEY
const KIT_API_BASE = 'https://api.kit.com/v4'

const TAG_IDS: Record<string, string> = {
  mind: '23530642',
  body: '23530643',
  spirit: '23530644',
  relationships: '23530645',
  money: '23530646',
  direction: '23530647',
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(req: NextRequest) {
  if (!KIT_API_KEY) {
    console.error('KIT_API_KEY is not configured')
    return NextResponse.json({ error: 'Email service is not configured.' }, { status: 500 })
  }

  let body: { email?: string; areas?: string[] }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  if (!body || typeof body !== 'object') return NextResponse.json({error: 'Invalid request body.'}, {status: 400})

  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const areas = Array.isArray(body.areas) ? body.areas.filter((a): a is string => typeof a === 'string' && a in TAG_IDS) : []

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  try {
    // Step 1: Create or update the subscriber
    const subscriberRes = await fetch(`${KIT_API_BASE}/subscribers`, {
      method: 'POST',
      headers: {
        'X-Kit-Api-Key': KIT_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        state: 'active',
      }),
      signal: AbortSignal.timeout(10000),
    })

    if (!subscriberRes.ok) {
      console.error('Kit subscriber creation failed:', {status: subscriberRes.status})
      return NextResponse.json({ error: 'Could not process your subscription. Please try again.' }, { status: 502 })
    }

    const subscriberData = await subscriberRes.json()
    const subscriberId = subscriberData?.subscriber?.id

    if (!Number.isSafeInteger(subscriberId) || subscriberId <= 0) throw new Error('Missing subscriber id')
    // A failed tag must not be silently reported as successful personalization.
    const tagResponses = await Promise.all([...new Set(areas)].map(area => fetch(`${KIT_API_BASE}/tags/${TAG_IDS[area]}/subscribers/${subscriberId}`, {
      method: 'POST', headers: {'X-Kit-Api-Key': KIT_API_KEY, 'Content-Type': 'application/json'},
      body: '{}', signal: AbortSignal.timeout(10000),
    })))
    if (tagResponses.some(response => !response.ok)) {
      console.error('Kit interest tagging failed', {statuses: tagResponses.map(response => response.status)})
      return NextResponse.json({error: 'Your email was saved, but we could not save all your interests. Please try again.'}, {status: 502})
    }
    // Enable only after a sequence is published and reviewed in the Kit account.
    const sequenceId = process.env.KIT_WELCOME_SEQUENCE_ID
    let sequenceEnrolled = false
    if (sequenceId) {
      if (!/^[0-9]+$/.test(sequenceId)) throw new Error('Invalid sequence configuration')
      const response = await fetch(`${KIT_API_BASE}/sequences/${sequenceId}/subscribers/${subscriberId}`, {
        method: 'POST', headers: {'X-Kit-Api-Key': KIT_API_KEY, 'Content-Type': 'application/json'},
        body: '{}', signal: AbortSignal.timeout(10000),
      })
      if (!response.ok) {
        console.error('Kit sequence enrollment failed', {status: response.status})
        return NextResponse.json({error: 'Your email and interests were saved, but we could not start the welcome emails. Please try again.'}, {status: 502})
      }
      sequenceEnrolled = true
    }
    return NextResponse.json({success: true, sequenceEnrolled})
  } catch (err) {
    console.error('Subscribe route error:', {errorType: err instanceof Error ? err.name : 'Unknown'})
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
