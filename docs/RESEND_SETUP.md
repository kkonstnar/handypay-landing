# Resend Email Setup Guide

This guide will help you set up Resend to send welcome emails to waitlist signups.

## Step 1: Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Go to your Resend dashboard
2. Click on "API Keys" in the sidebar
3. Click "Create API Key"
4. Give it a name (e.g., "HandyPay Production")
5. Copy the API key (starts with `re_`)

## Step 3: Add API Key to Environment Variables

Add this to your `.env.local` file:

```bash
RESEND_API_KEY=re_your_api_key_here
```

## Step 4: Verify Your Domain (Recommended)

For production, you should verify your domain to send from `hello@tryhandypay.com`:

1. Go to "Domains" in Resend dashboard
2. Click "Add Domain"
3. Enter your domain: `tryhandypay.com`
4. Add the DNS records to your domain provider
5. Wait for verification (usually takes a few minutes)

### DNS Records to Add:

Resend will provide you with DNS records like:

- **SPF Record** (TXT): `v=spf1 include:_spf.resend.com ~all`
- **DKIM Record** (TXT): `resend._domainkey` with a long value
- **DMARC Record** (TXT): `v=DMARC1; p=none;`

## Step 5: Update the "From" Email

Once your domain is verified, the emails will be sent from `hello@tryhandypay.com`.

If you want to use a different email, update it in `lib/resend.ts`:

```typescript
from: 'HandyPay <your-email@tryhandypay.com>',
```

## Step 6: Test the Email

1. Start your dev server: `npm run dev`
2. Go to your website
3. Sign up for the waitlist with your email
4. Check your inbox for the welcome email!

## Development Mode

For development/testing, you can use Resend's test mode:

- Resend provides a free tier with 100 emails/day
- In development, emails are sent but marked as "test"
- You can view all sent emails in the Resend dashboard

## Email Template Customization

The email template is in `emails/waitlist-welcome.tsx`. You can customize:

- Logo (update the image URL)
- Colors (change the styles at the bottom)
- Content (edit the text and sections)
- Social links (update Instagram, TikTok, Discord links)

## Troubleshooting

### Email not sending?

1. Check that `RESEND_API_KEY` is set in `.env.local`
2. Check the console logs for errors
3. Verify your API key is valid in Resend dashboard

### Email going to spam?

1. Verify your domain (see Step 4)
2. Add all DNS records (SPF, DKIM, DMARC)
3. Wait 24-48 hours for DNS propagation

### Want to preview the email?

You can preview the email template by creating a preview page:

```typescript
// app/preview-email/page.tsx
import WaitlistWelcomeEmail from '@/emails/waitlist-welcome'

export default function PreviewEmail() {
  return <WaitlistWelcomeEmail email="test@example.com" position={42} />
}
```

Then visit `http://localhost:3000/preview-email`

## Production Checklist

- [ ] Resend account created
- [ ] API key added to environment variables
- [ ] Domain verified in Resend
- [ ] DNS records added and verified
- [ ] Test email sent successfully
- [ ] "From" email updated to verified domain
- [ ] Email template customized with your branding

## Support

- Resend Docs: https://resend.com/docs
- Resend Support: support@resend.com
