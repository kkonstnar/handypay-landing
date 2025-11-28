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
        <Preview>Thanks for joining the HandyPay waitlist</Preview>
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
              You're now on the exclusive list. You'll be one of the first to know when HandyPay launches.
            </Text>

            <Text className="text-[#484848] text-base leading-6 text-left">
              HandyPay makes it easy to accept digital payments in Jamaica with QR codes and payment links.
            </Text>

            <Hr className="border-[#e6ebf1] my-5" />

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

