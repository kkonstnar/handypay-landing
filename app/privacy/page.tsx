import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tryhandypay.org";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "HandyPay Privacy Policy - Learn how we protect your personal information and payment data. Secure payment processing for merchants in Jamaica.",
  alternates: {
    canonical: `${siteUrl}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | HandyPay",
    description: "HandyPay Privacy Policy - How we collect, use, and protect your data for secure payment processing in Jamaica",
    url: `${siteUrl}/privacy`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-12 prose max-w-4xl">
      <h1>Privacy Policy</h1>
      <p className="text-neutral-600">Last Updated: May 23, 2025</p>

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

      <h2>15. Information We Collect - Detailed Categories</h2>
      <p>
        <strong>Personal Identification Information:</strong> We collect personal information 
        that you provide directly to us, including:
      </p>
      <ul>
        <li>Full name and any aliases</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Date of birth (for age verification)</li>
        <li>Government-issued identification numbers (for verification purposes)</li>
        <li>Photographs (from identification documents)</li>
        <li>Physical address and mailing address</li>
      </ul>
      <p>
        <strong>Business Information:</strong> If you are a merchant, we collect:
      </p>
      <ul>
        <li>Business name and legal entity name</li>
        <li>Business registration number</li>
        <li>Tax identification number</li>
        <li>Business address and contact information</li>
        <li>Business type and industry</li>
        <li>Bank account information for payouts</li>
        <li>Business licenses and permits</li>
      </ul>
      <p>
        <strong>Authentication Information:</strong> We collect authentication data through 
        various methods:
      </p>
      <ul>
        <li>Apple Sign-In credentials (user ID, email, name)</li>
        <li>Account passwords (stored in encrypted form)</li>
        <li>Two-factor authentication codes</li>
        <li>Biometric data (if you enable biometric authentication on your device)</li>
        <li>Device identifiers for authentication</li>
      </ul>
      <p>
        <strong>Financial Information:</strong> While we do not store full payment card numbers, 
        we may collect:
      </p>
      <ul>
        <li>Payment method type (credit card, debit card, etc.)</li>
        <li>Last four digits of payment cards (for display purposes)</li>
        <li>Card expiration dates (processed securely by Stripe)</li>
        <li>Bank account information for payouts</li>
        <li>Transaction history and payment patterns</li>
      </ul>

      <h2>16. How We Collect Information</h2>
      <p>
        <strong>Information You Provide:</strong> We collect information that you voluntarily 
        provide when you:
      </p>
      <ul>
        <li>Create an account or register for our Services</li>
        <li>Complete merchant onboarding forms</li>
        <li>Submit verification documents</li>
        <li>Contact our customer support</li>
        <li>Participate in surveys or provide feedback</li>
        <li>Subscribe to our newsletters or marketing communications</li>
        <li>Use features that require additional information</li>
      </ul>
      <p>
        <strong>Automatically Collected Information:</strong> We automatically collect certain 
        information when you use our Services:
      </p>
      <ul>
        <li>Device information (model, operating system, unique device identifiers)</li>
        <li>IP address and approximate location</li>
        <li>Browser type and version (for web access)</li>
        <li>App version and installation information</li>
        <li>Usage data and interaction patterns</li>
        <li>Crash reports and error logs</li>
        <li>Network information and connection type</li>
      </ul>
      <p>
        <strong>Information from Third Parties:</strong> We may receive information about you 
        from third parties, including:
      </p>
      <ul>
        <li>Stripe (payment processing and verification data)</li>
        <li>Identity verification services</li>
        <li>Credit bureaus or financial institutions (for risk assessment)</li>
        <li>Government databases (for compliance verification)</li>
        <li>Social media platforms (if you connect your accounts)</li>
        <li>Business partners and service providers</li>
      </ul>

      <h2>17. Payment Information - Detailed</h2>
      <p>
        <strong>Payment Processing:</strong> All payment transactions are processed securely 
        through Stripe Connect, a PCI DSS Level 1 certified payment processor. We do not store, 
        process, or have access to your full credit card numbers, debit card numbers, or complete 
        bank account details.
      </p>
      <p>
        <strong>What Stripe Collects:</strong> When you make or receive payments, Stripe collects 
        and processes:
      </p>
      <ul>
        <li>Full payment card numbers (encrypted and tokenized)</li>
        <li>Card verification values (CVV)</li>
        <li>Card expiration dates</li>
        <li>Billing addresses</li>
        <li>Bank account numbers and routing information</li>
        <li>Payment authentication data</li>
      </ul>
      <p>
        <strong>What We See:</strong> We only receive and store:
      </p>
      <ul>
        <li>Last four digits of payment cards (for display and identification)</li>
        <li>Card brand (Visa, Mastercard, etc.)</li>
        <li>Payment method type</li>
        <li>Transaction amounts and status</li>
        <li>Payment tokens (non-sensitive identifiers)</li>
      </ul>
      <p>
        <strong>PCI DSS Compliance:</strong> We comply with Payment Card Industry Data Security 
        Standard (PCI DSS) requirements through our use of Stripe&apos;s secure infrastructure. 
        We do not handle, store, or transmit cardholder data directly.
      </p>

      <h2>18. Transaction Data - Comprehensive</h2>
      <p>
        <strong>Transaction Records:</strong> We collect and store comprehensive transaction 
        information, including:
      </p>
      <ul>
        <li>Transaction amounts (in both JMD and USD when applicable)</li>
        <li>Transaction dates and timestamps</li>
        <li>Transaction status (completed, pending, failed, refunded)</li>
        <li>Merchant and customer information (as applicable)</li>
        <li>Transaction descriptions and notes</li>
        <li>Payment method used</li>
        <li>Transaction fees and charges</li>
        <li>Currency exchange rates (if applicable)</li>
        <li>QR code identifiers</li>
        <li>Payment link identifiers</li>
        <li>Receipt and invoice data</li>
      </ul>
      <p>
        <strong>Transaction Metadata:</strong> We also collect metadata associated with transactions:
      </p>
      <ul>
        <li>Device information used for the transaction</li>
        <li>IP addresses (for fraud prevention)</li>
        <li>Geographic location (approximate, based on IP)</li>
        <li>Transaction patterns and frequency</li>
        <li>Refund and chargeback history</li>
      </ul>

      <h2>19. Device and Usage Information - Detailed</h2>
      <p>
        <strong>Device Information:</strong> We collect detailed information about the devices 
        you use to access our Services:
      </p>
      <ul>
        <li>Device manufacturer and model</li>
        <li>Operating system name and version</li>
        <li>Device unique identifiers (UDID, IMEI, Android ID)</li>
        <li>Mobile carrier information</li>
        <li>Screen resolution and display settings</li>
        <li>Battery level and charging status</li>
        <li>Available storage space</li>
        <li>Language and region settings</li>
      </ul>
      <p>
        <strong>Usage Analytics:</strong> We collect information about how you use our Services:
      </p>
      <ul>
        <li>Features accessed and frequency of use</li>
        <li>Time spent in the app</li>
        <li>Navigation patterns and user flows</li>
        <li>Search queries and filters used</li>
        <li>Error messages encountered</li>
        <li>Performance metrics and load times</li>
        <li>App crashes and technical issues</li>
      </ul>
      <p>
        <strong>Location Information:</strong> With your permission, we may collect:
      </p>
      <ul>
        <li>Precise location (GPS coordinates) when you enable location services</li>
        <li>Approximate location (based on IP address or network information)</li>
        <li>Location history (if you use location-based features)</li>
      </ul>
      <p>
        You can disable location services through your device settings, though this may limit 
        certain features.
      </p>

      <h2>20. How We Use Your Information - Comprehensive</h2>
      <p>
        <strong>Service Provision:</strong> We use your information to:
      </p>
      <ul>
        <li>Create and manage your account</li>
        <li>Process payments and transactions</li>
        <li>Facilitate payouts to your bank account</li>
        <li>Generate QR codes and payment links</li>
        <li>Provide transaction history and receipts</li>
        <li>Enable multi-currency transactions</li>
        <li>Support customer tracking features</li>
        <li>Manage team and business accounts</li>
      </ul>
      <p>
        <strong>Verification and Compliance:</strong> We use your information to:
      </p>
      <ul>
        <li>Verify your identity and eligibility</li>
        <li>Complete Know Your Customer (KYC) checks</li>
        <li>Comply with anti-money laundering (AML) regulations</li>
        <li>Meet regulatory reporting requirements</li>
        <li>Conduct risk assessments</li>
        <li>Prevent fraud and financial crimes</li>
      </ul>
      <p>
        <strong>Communication:</strong> We use your contact information to:
      </p>
      <ul>
        <li>Send transaction notifications and receipts</li>
        <li>Provide customer support</li>
        <li>Send important account updates and security alerts</li>
        <li>Respond to your inquiries and requests</li>
        <li>Send marketing communications (with your consent)</li>
        <li>Notify you of policy changes</li>
      </ul>
      <p>
        <strong>Service Improvement:</strong> We use aggregated and anonymized data to:
      </p>
      <ul>
        <li>Analyze usage patterns and trends</li>
        <li>Improve app performance and functionality</li>
        <li>Develop new features and services</li>
        <li>Conduct research and analytics</li>
        <li>Optimize user experience</li>
        <li>Fix bugs and technical issues</li>
      </ul>
      <p>
        <strong>Security and Fraud Prevention:</strong> We use your information to:
      </p>
      <ul>
        <li>Detect and prevent fraudulent transactions</li>
        <li>Monitor for suspicious activity</li>
        <li>Protect against security threats</li>
        <li>Investigate potential violations</li>
        <li>Enforce our Terms of Service</li>
        <li>Maintain platform security</li>
      </ul>

      <h2>21. Legal Basis for Processing</h2>
      <p>
        We process your personal information based on the following legal grounds:
      </p>
      <p>
        <strong>Contract Performance:</strong> We process your information to perform our 
        contract with you, including processing payments, managing your account, and providing 
        our Services.
      </p>
      <p>
        <strong>Legal Obligation:</strong> We process your information to comply with legal 
        obligations, including:
      </p>
      <ul>
        <li>Financial regulations and reporting requirements</li>
        <li>Anti-money laundering laws</li>
        <li>Tax reporting obligations</li>
        <li>Court orders and legal processes</li>
        <li>Regulatory investigations</li>
      </ul>
      <p>
        <strong>Legitimate Interests:</strong> We process your information for our legitimate 
        business interests, including:
      </p>
      <ul>
        <li>Fraud prevention and security</li>
        <li>Service improvement and development</li>
        <li>Marketing and business development (with appropriate safeguards)</li>
        <li>Risk management</li>
        <li>Legal defense</li>
      </ul>
      <p>
        <strong>Consent:</strong> We process certain information based on your explicit consent, 
        such as:
      </p>
      <ul>
        <li>Marketing communications</li>
        <li>Location tracking</li>
        <li>Biometric authentication</li>
        <li>Optional data sharing</li>
      </ul>
      <p>
        You may withdraw your consent at any time, though this may limit certain features.
      </p>

      <h2>22. Information Sharing - Detailed</h2>
      <p>
        <strong>We Do Not Sell Your Data:</strong> We do not sell, rent, or trade your personal 
        information to third parties for their marketing purposes.
      </p>
      <p>
        <strong>Payment Processors:</strong> We share payment information with Stripe and other 
        payment processors to facilitate transactions. These processors are contractually obligated 
        to protect your data and comply with PCI DSS standards.
      </p>
      <p>
        <strong>Financial Institutions:</strong> We share information with banks and financial 
        institutions to:
      </p>
      <ul>
        <li>Process payouts to your bank account</li>
        <li>Verify bank account information</li>
        <li>Comply with banking regulations</li>
        <li>Facilitate Western Union transfers</li>
      </ul>
      <p>
        <strong>Service Providers:</strong> We share information with service providers who assist 
        our operations, including:
      </p>
      <ul>
        <li>Cloud hosting providers</li>
        <li>Customer support platforms</li>
        <li>Email and SMS service providers</li>
        <li>Analytics and monitoring services</li>
        <li>Identity verification services</li>
        <li>Fraud detection services</li>
        <li>Legal and accounting services</li>
      </ul>
      <p>
        All service providers are contractually required to protect your information and use it 
        only for specified purposes.
      </p>
      <p>
        <strong>Legal and Regulatory:</strong> We may disclose your information when required by 
        law or to:
      </p>
      <ul>
        <li>Comply with court orders, subpoenas, or legal processes</li>
        <li>Respond to government or regulatory requests</li>
        <li>Enforce our Terms of Service</li>
        <li>Protect our rights, property, or safety</li>
        <li>Investigate potential violations</li>
        <li>Prevent fraud or illegal activities</li>
      </ul>
      <p>
        <strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of 
        assets, your information may be transferred to the acquiring entity, subject to the same 
        privacy protections.
      </p>
      <p>
        <strong>With Your Consent:</strong> We may share your information with third parties when 
        you explicitly consent to such sharing.
      </p>

      <h2>23. Data Security - Comprehensive Measures</h2>
      <p>
        <strong>Encryption:</strong> We use industry-standard encryption to protect your data:
      </p>
      <ul>
        <li>Transport Layer Security (TLS) 1.2+ for data in transit</li>
        <li>Advanced Encryption Standard (AES-256) for data at rest</li>
        <li>Encrypted database connections</li>
        <li>Encrypted backups</li>
      </ul>
      <p>
        <strong>Access Controls:</strong> We implement strict access controls:
      </p>
      <ul>
        <li>Role-based access controls (RBAC)</li>
        <li>Multi-factor authentication for administrative access</li>
        <li>Regular access reviews and audits</li>
        <li>Principle of least privilege</li>
        <li>Secure credential management</li>
      </ul>
      <p>
        <strong>Infrastructure Security:</strong> Our infrastructure is secured through:
      </p>
      <ul>
        <li>Secure cloud hosting with industry-leading providers</li>
        <li>Firewalls and network segmentation</li>
        <li>Intrusion detection and prevention systems</li>
        <li>Regular security updates and patches</li>
        <li>DDoS protection</li>
        <li>Secure configuration management</li>
      </ul>
      <p>
        <strong>Security Monitoring:</strong> We continuously monitor for security threats:
      </p>
      <ul>
        <li>24/7 security operations center</li>
        <li>Automated threat detection</li>
        <li>Security event logging and analysis</li>
        <li>Incident response procedures</li>
        <li>Regular security assessments</li>
      </ul>
      <p>
        <strong>Employee Training:</strong> Our employees receive regular security training and 
        are bound by strict confidentiality agreements.
      </p>
      <p>
        <strong>Third-Party Security:</strong> We require all third-party service providers to 
        maintain appropriate security measures and undergo security assessments.
      </p>
      <p>
        <strong>Data Breach Response:</strong> In the event of a data breach, we will:
      </p>
      <ul>
        <li>Investigate and contain the breach immediately</li>
        <li>Notify affected users and relevant authorities as required by law</li>
        <li>Provide guidance on protective measures</li>
        <li>Take steps to prevent future breaches</li>
      </ul>

      <h2>24. Data Retention - Detailed Policies</h2>
      <p>
        <strong>Retention Periods:</strong> We retain your personal information for different 
        periods depending on the type of data and legal requirements:
      </p>
      <p>
        <strong>Account Information:</strong> We retain your account information for as long as 
        your account is active, plus an additional period as required by law (typically 7 years 
        for financial records).
      </p>
      <p>
        <strong>Transaction Records:</strong> Transaction records are retained for 7 years from 
        the date of the transaction, as required by Jamaican financial regulations and tax laws.
      </p>
      <p>
        <strong>Verification Documents:</strong> Identity verification documents are retained for 
        the duration of your account plus 7 years for compliance purposes.
      </p>
      <p>
        <strong>Marketing Data:</strong> Marketing preferences and consent records are retained 
        until you withdraw consent or close your account.
      </p>
      <p>
        <strong>Support Communications:</strong> Customer support communications are retained for 
        3 years after the last interaction.
      </p>
      <p>
        <strong>Analytics Data:</strong> Aggregated and anonymized analytics data may be retained 
        indefinitely for research and improvement purposes.
      </p>
      <p>
        <strong>Deletion:</strong> Upon account closure or deletion request, we will delete your 
        personal information within 30 days, except where retention is required by law. Some data 
        may be retained in anonymized form for analytics.
      </p>
      <p>
        <strong>Backup Retention:</strong> Deleted data may persist in backups for up to 90 days 
        before permanent deletion.
      </p>

      <h2>25. Your Rights - Comprehensive</h2>
      <p>
        <strong>Right to Access:</strong> You have the right to request access to your personal 
        information. We will provide you with:
      </p>
      <ul>
        <li>A copy of your personal data</li>
        <li>Information about how we use your data</li>
        <li>Details about third parties with whom we share your data</li>
        <li>Information about data retention periods</li>
      </ul>
      <p>
        <strong>Right to Rectification:</strong> You have the right to correct inaccurate or 
        incomplete personal information. You can update most information through your account 
        settings or by contacting us.
      </p>
      <p>
        <strong>Right to Erasure:</strong> You have the right to request deletion of your personal 
        information, subject to legal and regulatory retention requirements. We may not be able 
        to delete certain information if:
      </p>
      <ul>
        <li>It is required for legal compliance</li>
        <li>It is necessary for contract performance</li>
        <li>It is needed for legal claims or defense</li>
        <li>It is part of an ongoing investigation</li>
      </ul>
      <p>
        <strong>Right to Restrict Processing:</strong> You have the right to request that we limit 
        how we use your personal information in certain circumstances, such as when you contest 
        the accuracy of the data.
      </p>
      <p>
        <strong>Right to Data Portability:</strong> You have the right to receive your personal 
        information in a structured, commonly used, and machine-readable format. You can request 
        export of your data at any time.
      </p>
      <p>
        <strong>Right to Object:</strong> You have the right to object to processing of your personal 
        information for:
      </p>
      <ul>
        <li>Direct marketing purposes</li>
        <li>Legitimate interests (where applicable)</li>
        <li>Automated decision-making</li>
      </ul>
      <p>
        <strong>Right to Withdraw Consent:</strong> Where processing is based on consent, you have 
        the right to withdraw consent at any time. This will not affect the lawfulness of processing 
        before withdrawal.
      </p>
      <p>
        <strong>Right to Complain:</strong> You have the right to lodge a complaint with the 
        relevant data protection authority if you believe we have violated your privacy rights.
      </p>
      <p>
        <strong>Exercising Your Rights:</strong> To exercise any of these rights, please contact 
        us at privacy@tryhandypay.org. We will respond to your request within 30 days.
      </p>

      <h2>26. Cookies and Tracking Technologies - Detailed</h2>
      <p>
        <strong>Types of Cookies:</strong> We use various types of cookies and similar technologies:
      </p>
      <p>
        <strong>Essential Cookies:</strong> These are necessary for the Services to function and 
        cannot be disabled:
      </p>
      <ul>
        <li>Authentication cookies</li>
        <li>Security cookies</li>
        <li>Session management cookies</li>
        <li>Load balancing cookies</li>
      </ul>
      <p>
        <strong>Functional Cookies:</strong> These enhance functionality but are not essential:
      </p>
      <ul>
        <li>Preference cookies (language, region)</li>
        <li>Feature cookies (remembering settings)</li>
      </ul>
      <p>
        <strong>Analytics Cookies:</strong> These help us understand how you use our Services:
      </p>
      <ul>
        <li>Usage analytics</li>
        <li>Performance monitoring</li>
        <li>Error tracking</li>
      </ul>
      <p>
        <strong>Third-Party Cookies:</strong> Some third-party services we use may set their own 
        cookies:
      </p>
      <ul>
        <li>Stripe (for payment processing)</li>
        <li>Analytics providers</li>
        <li>Customer support platforms</li>
      </ul>
      <p>
        <strong>Managing Cookies:</strong> You can manage cookie preferences through:
      </p>
      <ul>
        <li>Your device settings (for mobile apps)</li>
        <li>Browser settings (for web access)</li>
        <li>Our app settings (where available)</li>
      </ul>
      <p>
        Note that disabling certain cookies may limit functionality.
      </p>
      <p>
        <strong>Do Not Track:</strong> Some browsers offer a &quot;Do Not Track&quot; feature. We do not 
        currently respond to Do Not Track signals, but we respect your privacy choices through 
        other mechanisms.
      </p>

      <h2>27. International Data Transfers - Detailed</h2>
      <p>
        <strong>Transfer Locations:</strong> Your data may be transferred to and processed in 
        countries outside Jamaica, including:
      </p>
      <ul>
        <li>United States (for Stripe&apos;s payment processing)</li>
        <li>Other countries where our service providers operate</li>
      </ul>
      <p>
        <strong>Safeguards:</strong> We ensure appropriate safeguards are in place for international 
        transfers:
      </p>
      <ul>
        <li>Standard Contractual Clauses (SCCs) with service providers</li>
        <li>Data Processing Agreements (DPAs)</li>
        <li>Certification under recognized frameworks (where applicable)</li>
        <li>Due diligence on service providers</li>
        <li>Regular security assessments</li>
      </ul>
      <p>
        <strong>Your Rights:</strong> When your data is transferred internationally, you retain 
        all rights under this Privacy Policy and applicable data protection laws.
      </p>
      <p>
        <strong>Legal Basis:</strong> International transfers are necessary for:
      </p>
      <ul>
        <li>Payment processing (Stripe operates globally)</li>
        <li>Cloud hosting and infrastructure</li>
        <li>Service provision and support</li>
        <li>Compliance with legal obligations</li>
      </ul>

      <h2>28. Children&apos;s Privacy - Detailed</h2>
      <p>
        <strong>Age Requirement:</strong> Our Services are not intended for individuals under 
        18 years of age. We do not knowingly collect personal information from children under 18.
      </p>
      <p>
        <strong>Age Verification:</strong> During account registration, we verify that users are 
        at least 18 years old. If we discover that we have collected information from a child 
        under 18, we will:
      </p>
      <ul>
        <li>Immediately delete the information</li>
        <li>Close the account</li>
        <li>Refund any transactions (if applicable)</li>
        <li>Notify the child&apos;s parent or guardian (if possible)</li>
      </ul>
      <p>
        <strong>Parental Rights:</strong> If you are a parent or guardian and believe your child 
        has provided us with personal information, please contact us immediately.
      </p>
      <p>
        <strong>Educational Use:</strong> Our Services are designed for business use and are not 
        suitable for educational or personal use by minors.
      </p>

      <h2>29. Marketing Communications</h2>
      <p>
        <strong>Opt-In Consent:</strong> We only send marketing communications with your explicit 
        consent. You can opt in when creating your account or through your account settings.
      </p>
      <p>
        <strong>Types of Marketing:</strong> Marketing communications may include:
      </p>
      <ul>
        <li>Product updates and new features</li>
        <li>Promotional offers and discounts</li>
        <li>Educational content and tips</li>
        <li>Newsletters and company updates</li>
        <li>Event invitations</li>
      </ul>
      <p>
        <strong>Opt-Out:</strong> You can opt out of marketing communications at any time by:
      </p>
      <ul>
        <li>Clicking the unsubscribe link in emails</li>
        <li>Updating your preferences in account settings</li>
        <li>Contacting us directly</li>
      </ul>
      <p>
        <strong>Transactional Communications:</strong> You cannot opt out of transactional 
        communications, which are necessary for service provision, including:
      </p>
      <ul>
        <li>Payment confirmations</li>
        <li>Account notifications</li>
        <li>Security alerts</li>
        <li>Important service updates</li>
        <li>Legal notices</li>
      </ul>
      <p>
        <strong>Frequency:</strong> We limit marketing communications to avoid overwhelming you. 
        You can adjust frequency preferences in your account settings.
      </p>

      <h2>30. Automated Decision-Making and Profiling</h2>
      <p>
        <strong>Automated Processing:</strong> We use automated systems for certain processes, 
        including:
      </p>
      <ul>
        <li>Fraud detection and prevention</li>
        <li>Risk assessment</li>
        <li>Transaction approval or decline</li>
        <li>Account verification</li>
      </ul>
      <p>
        <strong>Your Rights:</strong> You have the right to:
      </p>
      <ul>
        <li>Request human review of automated decisions</li>
        <li>Express your point of view</li>
        <li>Challenge automated decisions</li>
        <li>Understand the logic behind automated processing</li>
      </ul>
      <p>
        <strong>Profiling:</strong> We may create profiles based on your usage patterns to:
      </p>
      <ul>
        <li>Personalize your experience</li>
        <li>Detect fraud</li>
        <li>Assess risk</li>
        <li>Improve our Services</li>
      </ul>
      <p>
        You can object to profiling for marketing purposes at any time.
      </p>

      <h2>31. Third-Party Links and Services</h2>
      <p>
        <strong>External Links:</strong> Our Services may contain links to third-party websites 
        or services. We are not responsible for the privacy practices of these third parties. 
        We encourage you to review their privacy policies.
      </p>
      <p>
        <strong>Integrated Services:</strong> Our Services integrate with third-party services, 
        including:
      </p>
      <ul>
        <li>Stripe (payment processing)</li>
        <li>Apple Sign-In (authentication)</li>
        <li>Cloud hosting providers</li>
        <li>Analytics services</li>
        <li>Customer support platforms</li>
      </ul>
      <p>
        <strong>Data Sharing:</strong> When you use integrated services, your data may be shared 
        with those third parties in accordance with their privacy policies and our agreements 
        with them.
      </p>
      <p>
        <strong>Your Control:</strong> You can control some third-party integrations through 
        your account settings. Disabling certain integrations may limit functionality.
      </p>

      <h2>32. Data Breach Notification</h2>
      <p>
        <strong>Our Commitment:</strong> We take data breaches seriously and have procedures in 
        place to detect, respond to, and prevent breaches.
      </p>
      <p>
        <strong>Notification Process:</strong> In the event of a data breach that may affect your 
        personal information, we will:
      </p>
      <ul>
        <li>Investigate and contain the breach immediately</li>
        <li>Assess the risk and scope of the breach</li>
        <li>Notify affected users without undue delay (typically within 72 hours)</li>
        <li>Notify relevant authorities as required by law</li>
        <li>Provide information about the breach and steps taken</li>
        <li>Offer guidance on protective measures</li>
      </ul>
      <p>
        <strong>Notification Methods:</strong> We will notify you of breaches through:
      </p>
      <ul>
        <li>Email to your registered address</li>
        <li>In-app notifications</li>
        <li>Public announcements (for significant breaches)</li>
      </ul>
      <p>
        <strong>Information Provided:</strong> Breach notifications will include:
      </p>
      <ul>
        <li>Description of the breach</li>
        <li>Types of data affected</li>
        <li>Potential consequences</li>
        <li>Steps we are taking</li>
        <li>Recommended actions for you</li>
        <li>Contact information for questions</li>
      </ul>

      <h2>33. California Privacy Rights (CCPA)</h2>
      <p>
        If you are a California resident, you have additional rights under the California Consumer 
        Privacy Act (CCPA):
      </p>
      <p>
        <strong>Right to Know:</strong> You have the right to know what personal information we 
        collect, use, disclose, and sell.
      </p>
      <p>
        <strong>Right to Delete:</strong> You have the right to request deletion of your personal 
        information, subject to certain exceptions.
      </p>
      <p>
        <strong>Right to Opt-Out:</strong> You have the right to opt out of the sale of your 
        personal information. We do not sell personal information.
      </p>
      <p>
        <strong>Right to Non-Discrimination:</strong> We will not discriminate against you for 
        exercising your privacy rights.
      </p>
      <p>
        <strong>Verification:</strong> We may need to verify your identity before processing 
        certain requests.
      </p>
      <p>
        To exercise your California privacy rights, please contact us at privacy@tryhandypay.org.
      </p>

      <h2>34. European Privacy Rights (GDPR)</h2>
      <p>
        If you are located in the European Economic Area (EEA), you have additional rights 
        under the General Data Protection Regulation (GDPR):
      </p>
      <p>
        <strong>Data Controller:</strong> HandyPay is the data controller for your personal 
        information.
      </p>
      <p>
        <strong>Lawful Basis:</strong> We process your data based on contract performance, legal 
        obligation, legitimate interests, and consent as described in Section 21.
      </p>
      <p>
        <strong>Data Protection Officer:</strong> For GDPR-related inquiries, you can contact 
        our Data Protection Officer at privacy@tryhandypay.org.
      </p>
      <p>
        <strong>Supervisory Authority:</strong> You have the right to lodge a complaint with 
        your local data protection authority if you believe we have violated your rights.
      </p>
      <p>
        <strong>Cross-Border Transfers:</strong> We use Standard Contractual Clauses and other 
        appropriate safeguards for transfers outside the EEA as described in Section 27.
      </p>

      <h2>35. Changes to This Policy</h2>
      <p>
        <strong>Policy Updates:</strong> We may update this Privacy Policy from time to time to 
        reflect changes in our practices, technology, legal requirements, or other factors.
      </p>
      <p>
        <strong>Notification of Changes:</strong> We will notify you of material changes by:
      </p>
      <ul>
        <li>Posting a notice in the app</li>
        <li>Sending an email to your registered address</li>
        <li>Updating the &quot;Last Updated&quot; date at the top of this Policy</li>
        <li>Providing prominent notice for significant changes</li>
      </ul>
      <p>
        <strong>Material Changes:</strong> Material changes include:
      </p>
      <ul>
        <li>Changes to how we collect or use your information</li>
        <li>Changes to your rights</li>
        <li>Changes to data sharing practices</li>
        <li>Changes to security measures</li>
      </ul>
      <p>
        <strong>Effective Date:</strong> Changes will take effect 30 days after notification, 
        unless a shorter period is required by law or for security reasons.
      </p>
      <p>
        <strong>Continued Use:</strong> Your continued use of our Services after changes take 
        effect constitutes acceptance of the updated Privacy Policy. If you do not agree to 
        the changes, you must stop using our Services and may close your account.
      </p>
      <p>
        <strong>Review:</strong> We encourage you to review this Privacy Policy periodically 
        to stay informed about how we protect your information.
      </p>

      <h2>36. Contact Us</h2>
      <p>
        If you have questions, concerns, or requests regarding this Privacy Policy or our data 
        practices, please contact us:
      </p>
      <ul>
        <li><strong>Email:</strong> privacy@tryhandypay.org or support@tryhandypay.org</li>
        <li><strong>Address:</strong> HandyPay, Jamaica</li>
        <li><strong>Data Protection Officer:</strong> privacy@tryhandypay.org</li>
      </ul>
      <p>
        <strong>Response Time:</strong> We aim to respond to privacy inquiries within 30 days. 
        For urgent matters, please indicate &quot;URGENT&quot; in your subject line.
      </p>
      <p>
        <strong>Verification:</strong> For security purposes, we may need to verify your identity 
        before processing certain requests.
      </p>

      <h2>37. Acknowledgment</h2>
      <p>
        By using HandyPay&apos;s Services, you acknowledge that:
      </p>
      <ul>
        <li>You have read and understood this Privacy Policy</li>
        <li>You consent to our collection, use, and sharing of your information as described</li>
        <li>You understand your rights and how to exercise them</li>
        <li>You will review this Policy periodically for updates</li>
        <li>Your continued use constitutes acceptance of any modifications</li>
      </ul>

      <p className="text-sm text-neutral-600 mt-8 border-t pt-6">
        <strong>Last Updated:</strong> May 23, 2025<br />
        <strong>Version:</strong> 2.0<br />
        <br />
        This Privacy Policy is effective as of the Last Updated date above. By using HandyPay&apos;s 
        Services, you acknowledge that you have read, understood, and agree to this Privacy Policy.
      </p>
    </main>
  );
}