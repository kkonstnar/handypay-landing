export default function Page() {
  return (
    <main className="container mx-auto px-4 py-12 prose">
      <h1>Privacy Policy</h1>
      <p>05/23/2025</p>

      <h2>1. Introduction</h2>
      <p>
        At HandyPay, we are committed to protecting your privacy and personal
        information. This Privacy Policy explains how we collect, use, store,
        and protect your data when you use our mobile payment application and
        services.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We collect information you provide directly, such as your name, email
        address, phone number, and business information during account
        registration. We also collect authentication data through Apple
        Sign-In, including your user ID and profile information.
      </p>

      <h2>3. Payment Information</h2>
      <p>
        Payment data is processed securely through Stripe and is not stored on
        our servers. We do not have access to your full credit card numbers,
        bank account details, or payment credentials. Stripe handles all
        payment processing in compliance with PCI DSS standards.
      </p>

      <h2>4. Transaction Data</h2>
      <p>
        We collect transaction information including amounts, timestamps, and
        merchant details for your payment history and receipts. This data helps
        us provide transaction records and improve our services.
      </p>

      <h2>5. Device and Usage Information</h2>
      <p>
        We collect information about your device, including device type,
        operating system, app version, and usage patterns. This helps us
        optimize the app performance and provide technical support.
      </p>

      <h2>6. How We Use Your Information</h2>
      <ul>
        <li>Process payments and manage your account</li>
        <li>Provide customer support and technical assistance</li>
        <li>Send transaction notifications and receipts</li>
        <li>Improve our app and develop new features</li>
        <li>Comply with legal and regulatory requirements</li>
        <li>Prevent fraud and ensure platform security</li>
      </ul>

      <h2>7. Information Sharing</h2>
      <p>
        We do not sell or rent your personal information to third parties. We
        may share information with:
      </p>
      <ul>
        <li>Stripe for payment processing</li>
        <li>Financial institutions for payout processing</li>
        <li>Law enforcement when required by law</li>
        <li>Service providers who assist our operations</li>
      </ul>

      <h2>8. Data Security</h2>
      <p>
        We implement industry-standard security measures including encryption,
        secure servers, and regular security audits. Your payment information
        is protected by Stripe&apos;s advanced security systems. We use secure
        connections (HTTPS) for all data transmission.
      </p>

      <h2>9. Data Retention</h2>
      <p>
        We retain your personal information for as long as necessary to
        provide our services and comply with legal obligations. Transaction
        records are typically retained for 7 years as required by Jamaican
        financial regulations. You can request deletion of your account data at
        any time.
      </p>

      <h2>10. Your Rights</h2>
      <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your data</li>
        <li>Object to processing of your information</li>
        <li>Request data portability</li>
      </ul>

      <h2>11. Cookies and Tracking</h2>
      <p>
        Our mobile app may use cookies and similar technologies to improve user
        experience and analyze app usage. You can manage cookie preferences
        through your device settings.
      </p>

      <h2>12. International Data Transfers</h2>
      <p>
        Your data may be transferred to and processed in countries other than
        Jamaica, including the United States for Stripe&apos;s services. We ensure
        appropriate safeguards are in place for such transfers.
      </p>

      <h2>13. Children&apos;s Privacy</h2>
      <p>
        Our services are not intended for children under 18 years of age. We
        do not knowingly collect personal information from children under 18.
      </p>

      <h2>14. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any material changes via the app or email. Your continued use of our
        services after changes take effect constitutes acceptance of the
        updated policy.
      </p>

      <h2>15. Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices,
        please contact us at privacy@handypay.com or support@tryhandypay.org.
      </p>
    </main>
  );
}