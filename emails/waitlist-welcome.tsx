import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tryhandypay.com'

interface WaitlistWelcomeEmailProps {
  email: string
  position?: number
}

export const WaitlistWelcomeEmail = ({
  email,
  position = 0,
}: WaitlistWelcomeEmailProps) => (
  <Html>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    </Head>
    <Tailwind>
      <Body className="bg-[#f6f9fc]" style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
        <Preview>Welcome to the HandyPay waitlist</Preview>
        <Container className="bg-white mx-auto py-5 pb-12 mb-16 max-w-[600px]">
          <Section className="px-12">
            <Img
              src={`${baseUrl}/handypay-full.svg`}
              width="180"
              height="50"
              alt="HandyPay"
              className="mx-auto my-8"
            />
            <Hr className="border-[#e6ebf1] my-5" />
            
            <Text className="text-[#1a1a1a] text-[32px] font-semibold leading-[1.3] text-center my-8">
              You're on the waitlist!
            </Text>

            <Text className="text-[#484848] text-base leading-6 text-left">
              Thanks for joining the HandyPay waitlist. We're excited to have you as part of our early community.
            </Text>

            {position > 0 && (
              <Section className="bg-[#3AB75C] rounded-lg my-6 p-5 text-center">
                <Text className="text-white text-xl font-bold m-0">
                  You're <strong>#{position}</strong> on the waitlist
                </Text>
              </Section>
            )}

            <Text className="text-[#484848] text-base leading-6 text-left">
              HandyPay is Jamaica's easiest way to accept digital payments. With just a QR code or payment link, you can:
            </Text>

            <Text className="text-[#484848] text-base leading-6 text-left">
              • Accept card payments instantly<br />
              • Get paid directly to your Jamaican bank account<br />
              • Receive payouts to Western Union<br />
              • No hardware or setup fees required
            </Text>

            <Hr className="border-[#e6ebf1] my-5" />

            <Text className="text-[#484848] text-base leading-6 text-left">
              We'll send you an email as soon as we're ready to launch. In the meantime, follow us for updates:
            </Text>

            <Section className="text-left my-6">
              <Link href="https://www.instagram.com/handypayapp" className="inline-block mr-3">
                <Img
                  src="https://cdn.simpleicons.org/instagram/E4405F"
                  width="24"
                  height="24"
                  alt="Instagram"
                />
              </Link>
              <Link href="https://www.tiktok.com/@handypay" className="inline-block mr-3">
                <Img
                  src="https://cdn.simpleicons.org/tiktok/000000"
                  width="24"
                  height="24"
                  alt="TikTok"
                />
              </Link>
              <Link href="https://discord.gg/handypay" className="inline-block mr-3">
                <Img
                  src="https://cdn.simpleicons.org/discord/5865F2"
                  width="24"
                  height="24"
                  alt="Discord"
                />
              </Link>
            </Section>

            <Hr className="border-[#e6ebf1] my-5" />

            <Text className="text-[#484848] text-base leading-6 text-left">
              Questions? Reply to this email and we'll get back to you.
            </Text>

            <Text className="text-[#484848] text-base leading-6 text-left">
              — The HandyPay Team
            </Text>

            <Hr className="border-[#e6ebf1] my-5" />

            <Text className="text-[#8898aa] text-xs leading-4">
              You're receiving this email because you signed up for the HandyPay waitlist with {email}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
)

export default WaitlistWelcomeEmail

