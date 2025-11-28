import { Resend } from 'resend'
import { render } from '@react-email/render'
import WaitlistWelcomeEmail from '@/emails/waitlist-welcome'

export interface SendWaitlistWelcomeEmailParams {
  email: string
  position?: number
}

export async function sendWaitlistWelcomeEmail({
  email,
  position,
}: SendWaitlistWelcomeEmailParams) {
  try {
    // Check if Resend is configured
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured, skipping email send')
      return { success: false, message: 'Email service not configured' }
    }

    // Initialize Resend with the API key (do this per request to ensure env vars are loaded)
    const resend = new Resend(apiKey)

    // Render the email template
    const emailHtml = await render(
      WaitlistWelcomeEmail({ email, position })
    )

    console.log('Attempting to send email to:', email)

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'HandyPay <hello@tryhandypay.com>',
      to: [email],
      subject: "Thanks for joining the HandyPay waitlist",
      html: emailHtml,
    })

    if (error) {
      console.error('Error sending waitlist email:', error)
      return { success: false, message: error.message }
    }

    console.log('Waitlist email sent successfully:', data?.id)
    return { success: true, data }
  } catch (error) {
    console.error('Error in sendWaitlistWelcomeEmail:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

