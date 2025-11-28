import { NextRequest, NextResponse } from 'next/server'
import { WaitlistEntry } from '@/lib/supabase'
import { Pool } from 'pg'
import { sendWaitlistWelcomeEmail } from '@/lib/resend'

// Use direct PostgreSQL connection to bypass PostgREST issues
let pool: Pool | null = null

function getPool() {
  if (!pool) {
    const databaseUrl = process.env.DATABASE_URL
    
    if (!databaseUrl) {
      throw new Error('DATABASE_URL not configured')
    }

    pool = new Pool({
      connectionString: databaseUrl,
      ssl: {
        rejectUnauthorized: false
      }
    })
  }
  
  return pool
}

// Helper function to detect device type from user agent
function getDeviceType(userAgent?: string): string {
  if (!userAgent) return 'unknown'
  
  const ua = userAgent.toLowerCase()
  
  // Check for mobile devices
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    if (/ipad|tablet/i.test(ua)) {
      return 'tablet'
    }
    return 'mobile'
  }
  
  // Check for tablets
  if (/ipad|tablet|kindle|playbook|silk/i.test(ua)) {
    return 'tablet'
  }
  
  // Default to desktop
  return 'desktop'
}

// Server-side functions using direct PostgreSQL connection
async function addToWaitlistServer(email: string, source: string = 'api', userAgent?: string, ipAddress?: string) {
  const client = await getPool().connect()
  
  try {
    // Check if email already exists
    const checkResult = await client.query(
      'SELECT id FROM public.waitlist WHERE email = $1',
      [email]
    )

    if (checkResult.rows.length > 0) {
      console.log("Email already in waitlist:", email)
      return { success: false, message: 'Email already registered' }
    }

    // Detect device type
    const deviceType = getDeviceType(userAgent)

    // Add new email
    const insertResult = await client.query(
      `INSERT INTO public.waitlist (email, source, user_agent, device_type, ip_address) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      [email, source, userAgent || null, deviceType, ipAddress || null]
    )

    const data = insertResult.rows[0]
    console.log("Added to waitlist:", email, "Source:", source, "Device:", deviceType, "IP:", ipAddress)
    return { success: true, data }

  } catch (error) {
    console.error('Error in addToWaitlistServer:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    })
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unexpected error occurred' 
    }
  } finally {
    client.release()
  }
}

async function getWaitlistCountServer(): Promise<number> {
  const client = await getPool().connect()
  
  try {
    const result = await client.query('SELECT COUNT(*) FROM public.waitlist')
    return parseInt(result.rows[0].count, 10)
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return 0
  } finally {
    client.release()
  }
}

async function getWaitlistEmailsServer(): Promise<WaitlistEntry[]> {
  const client = await getPool().connect()
  
  try {
    const result = await client.query(
      'SELECT * FROM public.waitlist ORDER BY created_at DESC'
    )
    return result.rows
  } catch (error) {
    console.error('Error getting waitlist emails:', error)
    return []
  } finally {
    client.release()
  }
}

export async function GET(request: NextRequest) {
  try {
    // Simple authentication - in production, use proper auth
    const authHeader = request.headers.get('authorization')
    const expectedAuth = `Bearer ${process.env.WAITLIST_API_KEY || 'handypay-secret-key'}`

    if (authHeader !== expectedAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const emails = await getWaitlistEmailsServer()
    const count = await getWaitlistCountServer()

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

    // Get user agent from request headers
    const userAgent = request.headers.get('user-agent') || undefined

    // Get IP address from request
    // Try multiple headers in order of preference
    const ipAddress = 
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') || // Cloudflare
      request.headers.get('x-client-ip') ||
      undefined

    const result = await addToWaitlistServer(email, source, userAgent, ipAddress)

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 })
    }

    const count = await getWaitlistCountServer()

    // Send welcome email (don't wait for it, send async)
    sendWaitlistWelcomeEmail({
      email,
      position: count,
    }).catch((error) => {
      // Log error but don't fail the request
      console.error('Failed to send welcome email:', error)
    })

    return NextResponse.json({
      success: true,
      message: 'Email added to waitlist',
      count,
      data: result.data
    })
  } catch (error) {
    console.error('Error adding to waitlist:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    })
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
