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

  const email = (body.email || '').trim().toLowerCase()
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
    })

    if (!subscriberRes.ok) {
      const errText = await subscriberRes.text()
      console.error('Kit subscriber creation failed:', subscriberRes.status, errText)
      return NextResponse.json({ error: 'Could not process your subscription. Please try again.' }, { status: 502 })
    }

    const subscriberData = await subscriberRes.json()
    const subscriberId = subscriberData?.subscriber?.id

    // Step 2: Apply the selected interest tags (if any and we have a subscriber id)
    if (subscriberId && areas.length > 0) {
      await Promise.all(
        areas.map(async (area) => {
          const tagId = TAG_IDS[area]
          if (!tagId) return
          try {
            await fetch(`${KIT_API_BASE}/tags/${tagId}/subscribers/${subscriberId}`, {
              method: 'POST',
              headers: {
                'X-Kit-Api-Key': KIT_API_KEY,
                'Content-Type': 'application/json',
              },
            })
          } catch (tagErr) {
            console.error(`Failed to apply tag ${area}:`, tagErr)
          }
        })
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Subscribe route error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
