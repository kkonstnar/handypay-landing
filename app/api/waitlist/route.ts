import { NextRequest, NextResponse } from 'next/server'
import { getWaitlistCount, getWaitlistEmails, addToWaitlist } from '@/components/email-input'

export async function GET(request: NextRequest) {
  try {
    // Simple authentication - in production, use proper auth
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.WAITLIST_API_KEY || 'handypay-secret-key'}`

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const emails = await getWaitlistEmails()
    const count = await getWaitlistCount()

    return NextResponse.json({
      success: true,
      count,
      emails,
      lastUpdated: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error fetching waitlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, source = 'api' } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const result = await addToWaitlist(email, source)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    const count = await getWaitlistCount()

    return NextResponse.json({
      success: true,
      message: 'Email added to waitlist',
      count,
      data: result.data
    })
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
