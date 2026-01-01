import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tryhandypay.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read HandyPay's Terms of Service. Learn about our payment processing services, user agreements, and policies for merchants in Jamaica.",
  alternates: {
    canonical: `${siteUrl}/terms`,
  },
  openGraph: {
    title: "Terms of Service | HandyPay",
    description: "HandyPay Terms of Service - Payment processing agreements and policies for merchants in Jamaica",
    url: `${siteUrl}/terms`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <main className="relative">
      {/* Vertical dashed lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="max-w-4xl mx-auto h-full relative">
          <div className="absolute left-0 top-0 bottom-0 w-px border-l border-dashed border-neutral-200"></div>
          <div className="absolute right-0 top-0 bottom-0 w-px border-r border-dashed border-neutral-200"></div>
          <div className="absolute left-1/3 top-0 bottom-0 w-px border-l border-dashed border-neutral-200"></div>
          <div className="absolute right-1/3 top-0 bottom-0 w-px border-r border-dashed border-neutral-200"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 prose max-w-4xl relative">
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 text-sm font-medium text-[#11AD30] bg-[#11AD30]/10 rounded-full mb-4">
            License and Notes
          </span>
          <h1 className="text-4xl md:text-5xl font-medium mb-4">Terms of Service</h1>
          <p className="text-neutral-600">Last Updated: <strong>May 23, 2025</strong></p>
        </div>
        <hr className="border-neutral-200 mb-8" />

      <h2>1. Introduction and Acceptance</h2>
      <p>
        Welcome to HandyPay (&quot;we,&quot; &quot;our,&quot; &quot;us,&quot; or &quot;Company&quot;). These Terms of Service
        (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;you,&quot; &quot;your,&quot; or &quot;Merchant&quot;) 
        and HandyPay governing your access to and use of the HandyPay mobile application, website, 
        and payment processing services (collectively, the &quot;Services&quot;).
      </p>
      <p>
        By downloading, installing, accessing, or using our Services, you acknowledge that you have 
        read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do 
        not agree to these Terms, you must immediately discontinue use of our Services and may not 
        access or use them.
      </p>
      <p>
        These Terms apply to all users of the Services, including merchants, customers, and any 
        other individuals or entities that access or use our platform. You represent and warrant 
        that you are at least 18 years of age and have the legal capacity to enter into this agreement.
      </p>

      <h2>2. Description of Services</h2>
      <p>
        HandyPay provides a comprehensive payment processing platform designed specifically for 
        merchants operating in Jamaica. Our Services include:
      </p>
      <ul>
        <li>QR code payment generation and processing</li>
        <li>Payment link creation and distribution</li>
        <li>Digital wallet integration</li>
        <li>Transaction management and reporting</li>
        <li>Payout processing to Jamaican bank accounts and Western Union</li>
        <li>Multi-currency support (USD and JMD)</li>
        <li>Customer transaction tracking</li>
        <li>Business and team account management</li>
      </ul>
      <p>
        Our Services are powered by Stripe Connect, a third-party payment processor, and are 
        designed to facilitate secure, efficient payment transactions for micro and small businesses 
        in Jamaica. We act as an intermediary between merchants and payment processors, providing 
        the technology and infrastructure necessary to accept digital payments.
      </p>
      <p>
        We reserve the right to modify, suspend, or discontinue any aspect of our Services at any 
        time, with or without notice. We do not guarantee that our Services will be available at 
        all times or that they will be error-free or uninterrupted.
      </p>

      <h2>3. Account Registration and Eligibility</h2>
      <p>
        To use our payment processing Services, you must create an account and complete the merchant 
        onboarding process. You must provide accurate, current, and complete information during 
        registration and maintain the accuracy of such information throughout your use of the Services.
      </p>
      <p>
        <strong>Eligibility Requirements:</strong>
      </p>
      <ul>
        <li>You must be at least 18 years of age</li>
        <li>You must be legally authorized to conduct business in Jamaica</li>
        <li>You must have a valid Jamaican bank account or Western Union account for payouts</li>
        <li>You must comply with all applicable Jamaican laws and regulations</li>
        <li>You must not be located in a jurisdiction where our Services are prohibited</li>
      </ul>
      <p>
        <strong>Merchant Onboarding:</strong> To activate payment processing, you must complete 
        Stripe&apos;s merchant onboarding process, which includes:
      </p>
      <ul>
        <li>Providing valid government-issued identification</li>
        <li>Submitting business registration documents (if applicable)</li>
        <li>Providing accurate business information and contact details</li>
        <li>Verifying your bank account information</li>
        <li>Completing any additional compliance checks required by Stripe or applicable regulations</li>
      </ul>
      <p>
        We reserve the right to reject any application for an account or to suspend or terminate 
        any account at our sole discretion, with or without cause or notice.
      </p>

      <h2>4. Payment Processing and Transactions</h2>
      <p>
        <strong>Transaction Processing:</strong> All payment transactions are processed through 
        Stripe Connect. When a customer makes a payment through your HandyPay account, the funds 
        are initially held by Stripe in accordance with their terms and our payout schedule.
      </p>
      <p>
        <strong>Transaction Limits:</strong> We may impose transaction limits on your account 
        based on various factors including your account history, verification status, and risk 
        assessment. These limits may be adjusted at our discretion.
      </p>
      <p>
        <strong>Refunds and Chargebacks:</strong> You are responsible for handling customer 
        refunds and disputes. Refunds will be processed according to your refund policy and 
        applicable laws. Chargebacks and disputes may result in fees and reserves as determined 
        by Stripe and our policies.
      </p>
      <p>
        <strong>Failed Transactions:</strong> We are not responsible for transactions that fail 
        due to insufficient funds, expired payment methods, or other issues beyond our control. 
        You are responsible for verifying that payments have been successfully processed before 
        providing goods or services.
      </p>

      <h2>5. Payout Processing</h2>
      <p>
        <strong>Initial Payout:</strong> Your first payout will begin processing 7 days after your 
        account is activated and successfully verified. This initial hold period is required for 
        security and compliance purposes.
      </p>
      <p>
        <strong>Subsequent Payouts:</strong> After your first payout, subsequent payouts are 
        typically processed within 2-5 business days, depending on:
      </p>
      <ul>
        <li>Your bank&apos;s processing times</li>
        <li>The payment method selected (bank transfer vs. Western Union)</li>
        <li>Weekends and Jamaican public holidays</li>
        <li>Any holds or reserves placed on your account</li>
      </ul>
      <p>
        <strong>Payout Methods:</strong> We support payouts to Jamaican bank accounts and Western 
        Union. You are responsible for providing accurate payout information. We are not liable 
        for delays or failures caused by incorrect bank account information.
      </p>
      <p>
        <strong>Reserves:</strong> We or Stripe may place reserves on funds in your account based 
        on risk assessment, chargeback history, or other factors. Reserved funds will be released 
        according to the reserve schedule provided to you.
      </p>
      <p>
        <strong>Payout Fees:</strong> Standard payout fees may apply depending on your payout method. 
        These fees will be disclosed to you before processing.
      </p>

      <h2>6. Fees and Charges</h2>
      <p>
        <strong>Transaction Fees:</strong> HandyPay charges a service fee for each transaction 
        processed through our platform. Our current fee structure is 4.9% + 40¢ per transaction, 
        which includes payment processing costs. There are no monthly fees, setup fees, or hidden costs.
      </p>
      <p>
        These fees are automatically deducted from each transaction before payout.
      </p>
      <p>
        <strong>Fee Changes:</strong> We reserve the right to modify our fee structure at any time. 
        We will provide at least 30 days&apos; notice of any fee increases via email or through the 
        app. Continued use of our Services after the effective date of fee changes constitutes 
        acceptance of the new fees.
      </p>
      <p>
        <strong>Additional Fees:</strong> Additional fees may apply for:
      </p>
      <ul>
        <li>Chargebacks and disputes</li>
        <li>Currency conversion (if applicable)</li>
        <li>Expedited payout processing</li>
        <li>Account maintenance or inactivity</li>
        <li>Other services as may be introduced</li>
      </ul>
      <p>
        All fees are non-refundable except as required by law or as expressly stated in these Terms.
      </p>

      <h2>7. Compliance and Regulatory Requirements</h2>
      <p>
        <strong>Jamaican Regulations:</strong> As a payment service provider operating in Jamaica, 
        we comply with all applicable laws and regulations, including but not limited to:
      </p>
      <ul>
        <li>Bank of Jamaica regulations</li>
        <li>Financial Services Commission requirements</li>
        <li>Anti-money laundering (AML) laws</li>
        <li>Know Your Customer (KYC) requirements</li>
        <li>Data protection and privacy laws</li>
        <li>Consumer protection regulations</li>
      </ul>
      <p>
        <strong>Your Compliance Obligations:</strong> You must ensure that your business activities 
        and use of our Services comply with all applicable Jamaican laws and regulations. This includes:
      </p>
      <ul>
        <li>Obtaining all necessary business licenses and permits</li>
        <li>Complying with tax obligations</li>
        <li>Adhering to consumer protection laws</li>
        <li>Maintaining accurate business records</li>
        <li>Reporting suspicious transactions as required by law</li>
      </ul>
      <p>
        <strong>Cooperation with Authorities:</strong> We may be required to disclose information 
        about your account or transactions to regulatory authorities, law enforcement, or courts 
        as required by law or court order. You agree to cooperate with any such requests.
      </p>
      <p>
        <strong>Sanctions Compliance:</strong> You represent and warrant that you are not subject 
        to any sanctions, embargoes, or other restrictions imposed by the United States, United 
        Nations, European Union, or Jamaica. You will not use our Services to facilitate transactions 
        with sanctioned individuals or entities.
      </p>

      <h2>8. Data Protection and Privacy</h2>
      <p>
        <strong>Privacy Policy:</strong> Our collection, use, and protection of your personal 
        information is governed by our Privacy Policy, which is incorporated into these Terms by 
        reference. By using our Services, you consent to our Privacy Policy.
      </p>
      <p>
        <strong>Payment Data Security:</strong> Customer payment data, including credit card numbers 
        and bank account details, is processed securely through Stripe and is not stored on our 
        servers. We do not have access to your full payment credentials. Stripe handles all payment 
        processing in compliance with PCI DSS (Payment Card Industry Data Security Standard) requirements.
      </p>
      <p>
        <strong>Data Security Measures:</strong> We implement industry-standard security measures 
        to protect your information, including:
      </p>
      <ul>
        <li>Encryption of data in transit and at rest</li>
        <li>Secure servers and infrastructure</li>
        <li>Regular security audits and assessments</li>
        <li>Access controls and authentication</li>
        <li>Employee training on data protection</li>
      </ul>
      <p>
        <strong>Data Breach:</strong> In the event of a data breach that may affect your personal 
        information, we will notify you and relevant authorities as required by law.
      </p>
      <p>
        <strong>Third-Party Services:</strong> Your data may be shared with third-party service 
        providers (including Stripe) as necessary to provide our Services. These providers are 
        contractually obligated to protect your data in accordance with applicable laws and our 
        Privacy Policy.
      </p>

      <h2>9. Account Security and Responsibilities</h2>
      <p>
        <strong>Account Credentials:</strong> You are solely responsible for maintaining the 
        confidentiality and security of your account credentials, including your username, password, 
        and any two-factor authentication codes. You must immediately notify us of any unauthorized 
        access to or use of your account.
      </p>
      <p>
        <strong>Account Activity:</strong> You are responsible for all activities that occur under 
        your account, whether authorized by you or not. We are not liable for any loss or damage 
        arising from unauthorized use of your account.
      </p>
      <p>
        <strong>Account Information:</strong> You must provide accurate, current, and complete 
        information during registration and keep your business information, contact details, and 
        bank account information up to date. Failure to maintain accurate information may result 
        in delayed payouts or account suspension.
      </p>
      <p>
        <strong>Account Monitoring:</strong> You should regularly review your account activity 
        and transaction history. Report any discrepancies or unauthorized transactions immediately.
      </p>
      <p>
        <strong>Multiple Accounts:</strong> You may not create multiple accounts without our prior 
        written consent. We reserve the right to consolidate or close duplicate accounts.
      </p>

      <h2>10. Prohibited Activities and Restricted Use</h2>
      <p>
        You agree not to use our Services for any illegal, fraudulent, or harmful activities. 
        Prohibited activities include, but are not limited to:
      </p>
      <ul>
        <li>Money laundering or terrorist financing</li>
        <li>Fraud, theft, or other financial crimes</li>
        <li>Violation of any applicable laws or regulations</li>
        <li>Transactions involving illegal goods or services</li>
        <li>Gambling or betting activities (unless properly licensed)</li>
        <li>Sale of tobacco, alcohol, or controlled substances to minors</li>
        <li>Pyramid schemes or other fraudulent investment schemes</li>
        <li>Intellectual property infringement</li>
        <li>Harassment, stalking, or threats</li>
        <li>Circumventing security measures or attempting to hack our systems</li>
        <li>Interfering with or disrupting our Services</li>
        <li>Using our Services to compete with us or reverse engineer our technology</li>
      </ul>
      <p>
        <strong>Restricted Businesses:</strong> Certain business types may be restricted or require 
        additional verification, including:
      </p>
      <ul>
        <li>Adult content or services</li>
        <li>Cryptocurrency exchanges or trading</li>
        <li>Debt collection or credit repair services</li>
        <li>Financial services requiring special licensing</li>
        <li>High-risk businesses as determined by Stripe or us</li>
      </ul>
      <p>
        <strong>Enforcement:</strong> We reserve the right to investigate any suspected violation 
        of these Terms and to suspend or terminate your account immediately, without notice, if 
        we determine that you have engaged in prohibited activities. We may also report suspected 
        illegal activities to law enforcement.
      </p>

      <h2>11. Intellectual Property</h2>
      <p>
        <strong>Our Intellectual Property:</strong> All content, features, functionality, and 
        technology of our Services, including but not limited to text, graphics, logos, icons, 
        images, software, and code, are owned by HandyPay or our licensors and are protected by 
        copyright, trademark, and other intellectual property laws.
      </p>
      <p>
        <strong>License to Use:</strong> We grant you a limited, non-exclusive, non-transferable, 
        revocable license to access and use our Services for your business purposes in accordance 
        with these Terms. This license does not include the right to:
      </p>
      <ul>
        <li>Reproduce, modify, or create derivative works</li>
        <li>Distribute, sublicense, or transfer the Services</li>
        <li>Reverse engineer or attempt to extract source code</li>
        <li>Remove any copyright or proprietary notices</li>
      </ul>
      <p>
        <strong>Your Content:</strong> You retain ownership of any content you submit through 
        our Services. By submitting content, you grant us a worldwide, royalty-free, perpetual 
        license to use, reproduce, modify, and display such content as necessary to provide our 
        Services.
      </p>
      <p>
        <strong>Trademarks:</strong> &quot;HandyPay&quot; and our logos are trademarks of HandyPay. You may 
        not use our trademarks without our prior written consent.
      </p>

      <h2>12. Disclaimers and Limitations of Liability</h2>
      <p>
        <strong>Service Availability:</strong> Our Services are provided &quot;as is&quot; and &quot;as available&quot; 
        without warranties of any kind, either express or implied. We do not guarantee that our 
        Services will be uninterrupted, error-free, or completely secure.
      </p>
      <p>
        <strong>Third-Party Services:</strong> Our Services rely on third-party providers, including 
        Stripe, banks, and telecommunications providers. We are not responsible for the availability, 
        performance, or actions of these third parties.
      </p>
      <p>
        <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, HandyPay, 
        its officers, directors, employees, and agents shall not be liable for any indirect, 
        incidental, special, consequential, or punitive damages, including but not limited to loss 
        of profits, data, or business opportunities, arising out of or relating to your use of our 
        Services.
      </p>
      <p>
        <strong>Maximum Liability:</strong> Our total liability to you for any claims arising from 
        or related to our Services shall not exceed the total fees you paid to us in the twelve 
        (12) months preceding the claim.
      </p>
      <p>
        <strong>Force Majeure:</strong> We are not liable for any failure or delay in performance 
        due to circumstances beyond our reasonable control, including natural disasters, war, 
        terrorism, labor disputes, internet failures, or government actions.
      </p>

      <h2>13. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless HandyPay, its officers, directors, 
        employees, agents, and affiliates from and against any claims, damages, losses, liabilities, 
        costs, and expenses (including reasonable attorneys&apos; fees) arising out of or relating to:
      </p>
      <ul>
        <li>Your use of our Services</li>
        <li>Your violation of these Terms</li>
        <li>Your violation of any laws or regulations</li>
        <li>Your violation of any third-party rights</li>
        <li>Any disputes between you and your customers</li>
        <li>Any content you submit through our Services</li>
      </ul>
      <p>
        We reserve the right to assume exclusive defense and control of any matter subject to 
        indemnification by you, and you agree to cooperate with our defense of such claims.
      </p>

      <h2>14. Termination</h2>
      <p>
        <strong>Termination by You:</strong> You may terminate your account at any time by 
        contacting us at support@tryhandypay.com or through the app settings. Upon termination, 
        you will remain responsible for all outstanding fees and charges.
      </p>
      <p>
        <strong>Termination by Us:</strong> We may suspend or terminate your account immediately, 
        with or without notice, if:
      </p>
      <ul>
        <li>You violate these Terms or our policies</li>
        <li>You engage in fraudulent or illegal activities</li>
        <li>We are required to do so by law or court order</li>
        <li>You fail to pay fees when due</li>
        <li>Your account poses a risk to us or other users</li>
        <li>You become insolvent or file for bankruptcy</li>
      </ul>
      <p>
        <strong>Effect of Termination:</strong> Upon termination:
      </p>
      <ul>
        <li>Your right to use our Services immediately ceases</li>
        <li>We may cancel pending transactions or refunds</li>
        <li>You remain liable for all fees and charges incurred prior to termination</li>
        <li>We may hold funds in your account for up to 180 days to cover chargebacks, refunds, 
        or other liabilities</li>
        <li>Your data will be handled in accordance with our Privacy Policy and applicable 
        data retention laws</li>
      </ul>
      <p>
        <strong>Survival:</strong> Sections of these Terms that by their nature should survive 
        termination will survive, including but not limited to Sections 6 (Fees), 8 (Data Protection), 
        12 (Disclaimers), 13 (Indemnification), and 15 (Dispute Resolution).
      </p>

      <h2>15. Dispute Resolution</h2>
      <p>
        <strong>Informal Resolution:</strong> We encourage you to contact our support team first 
        to resolve any issues or disputes amicably. Most concerns can be resolved quickly and 
        satisfactorily through direct communication.
      </p>
      <p>
        <strong>Governing Law:</strong> These Terms shall be governed by and construed in 
        accordance with the laws of Jamaica, without regard to its conflict of law provisions.
      </p>
      <p>
        <strong>Jurisdiction:</strong> Any disputes arising from or relating to these Terms or 
        our Services shall be subject to the exclusive jurisdiction of the courts of Jamaica. 
        You consent to the personal jurisdiction of such courts.
      </p>
      <p>
        <strong>Class Action Waiver:</strong> You agree that any disputes will be resolved on 
        an individual basis and waive any right to participate in a class action lawsuit or 
        class-wide arbitration.
      </p>
      <p>
        <strong>Time Limitation:</strong> Any claim or cause of action arising out of or related 
        to these Terms or our Services must be filed within one (1) year after such claim or 
        cause of action arose, or be forever barred.
      </p>

      <h2>16. Updates to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. We will notify you of material 
        changes by:
      </p>
      <ul>
        <li>Posting a notice in the app</li>
        <li>Sending an email to the address associated with your account</li>
        <li>Updating the &quot;Last Updated&quot; date at the top of these Terms</li>
      </ul>
      <p>
        Material changes will take effect 30 days after notice is provided, unless a shorter 
        period is required by law or for security reasons. Non-material changes will take effect 
        immediately upon posting.
      </p>
      <p>
        Your continued use of our Services after changes take effect constitutes acceptance of 
        the modified Terms. If you do not agree to the modified Terms, you must stop using our 
        Services and may terminate your account.
      </p>

      <h2>17. General Provisions</h2>
      <p>
        <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy, 
        constitute the entire agreement between you and HandyPay regarding your use of our 
        Services and supersede all prior agreements and understandings.
      </p>
      <p>
        <strong>Severability:</strong> If any provision of these Terms is found to be invalid, 
        illegal, or unenforceable, the remaining provisions will continue in full force and effect.
      </p>
      <p>
        <strong>Waiver:</strong> Our failure to enforce any provision of these Terms does not 
        constitute a waiver of that provision or any other provision.
      </p>
      <p>
        <strong>Assignment:</strong> You may not assign or transfer these Terms or your account 
        without our prior written consent. We may assign these Terms without restriction.
      </p>
      <p>
        <strong>Relationship:</strong> These Terms do not create a partnership, joint venture, 
        employment, or agency relationship between you and HandyPay.
      </p>
      <p>
        <strong>Notices:</strong> Notices to you may be sent to the email address associated 
        with your account or posted in the app. Notices to us should be sent to 
        support@tryhandypay.com.
      </p>
      <p>
        <strong>Language:</strong> These Terms are written in English. Any translations are 
        provided for convenience only, and the English version shall govern in case of 
        discrepancies.
      </p>

      <h2>18. Customer Responsibilities and Obligations</h2>
      <p>
        <strong>Customer Relations:</strong> You are solely responsible for your relationship 
        with your customers. We are not a party to any transaction between you and your customers, 
        and we do not guarantee the performance of either party.
      </p>
      <p>
        <strong>Customer Disputes:</strong> You are responsible for resolving any disputes with 
        your customers directly. We may provide tools to assist with dispute resolution, but we 
        are not obligated to mediate or resolve disputes between you and your customers.
      </p>
      <p>
        <strong>Refund Policies:</strong> You must maintain and clearly communicate your refund 
        and return policies to your customers. You are responsible for processing refunds in 
        accordance with your policies and applicable laws.
      </p>
      <p>
        <strong>Customer Data:</strong> You are responsible for obtaining all necessary consents 
        from your customers for the collection, use, and processing of their personal information 
        in connection with our Services. You must comply with all applicable data protection laws 
        when handling customer data.
      </p>
      <p>
        <strong>Tax Obligations:</strong> You are solely responsible for determining and paying 
        all applicable taxes, including income tax, sales tax, value-added tax (VAT), and any 
        other taxes or fees that may apply to your transactions. We may provide tax reporting 
        information, but we do not provide tax advice.
      </p>
      <p>
        <strong>Record Keeping:</strong> You must maintain accurate and complete records of all 
        transactions processed through our Services for at least seven (7) years, or as required 
        by applicable law. You must provide such records to us or regulatory authorities upon request.
      </p>

      <h2>19. Service Modifications and Updates</h2>
      <p>
        <strong>Service Changes:</strong> We reserve the right to modify, update, or discontinue 
        any aspect of our Services at any time, with or without notice. This includes changes to 
        features, functionality, user interface, and technical specifications.
      </p>
      <p>
        <strong>App Updates:</strong> We may release updates to our mobile application that may 
        add, modify, or remove features. You are responsible for keeping your app updated to the 
        latest version. Continued use of outdated versions may result in limited functionality or 
        security vulnerabilities.
      </p>
      <p>
        <strong>Beta Features:</strong> We may offer beta or experimental features that are still 
        under development. These features are provided &quot;as is&quot; and may be modified or 
        discontinued at any time. Use of beta features is at your own risk.
      </p>
      <p>
        <strong>Service Interruptions:</strong> We may temporarily suspend or interrupt our Services 
        for maintenance, updates, security reasons, or due to circumstances beyond our control. We 
        will make reasonable efforts to minimize disruptions, but we do not guarantee uninterrupted 
        service.
      </p>
      <p>
        <strong>Deprecation:</strong> We may deprecate features or functionality with reasonable 
        notice. We will provide at least 90 days&apos; notice for material deprecations, except 
        when required for security or legal compliance reasons.
      </p>

      <h2>20. Technical Support and Service Levels</h2>
      <p>
        <strong>Support Availability:</strong> We provide technical support during our standard 
        business hours, which are Monday through Friday, 9:00 AM to 5:00 PM Jamaica Time (JST), 
        excluding Jamaican public holidays.
      </p>
      <p>
        <strong>Support Channels:</strong> Support is available through email at 
        support@tryhandypay.com. We aim to respond to support inquiries within 48 hours during 
        business days.
      </p>
      <p>
        <strong>Service Level Agreement:</strong> While we strive to maintain high availability, 
        we do not guarantee specific uptime percentages or service levels. Our Services are provided 
        on a best-effort basis.
      </p>
      <p>
        <strong>Self-Service Resources:</strong> We may provide documentation, FAQs, tutorials, 
        and other self-service resources to help you use our Services. These resources are provided 
        for informational purposes only and do not constitute professional advice.
      </p>
      <p>
        <strong>Escalation:</strong> For urgent matters affecting your ability to process payments, 
        you may request escalation through our support channels. We will prioritize critical issues 
        but cannot guarantee immediate resolution.
      </p>

      <h2>21. Marketing and Communications</h2>
      <p>
        <strong>Marketing Communications:</strong> By using our Services, you consent to receive 
        marketing communications from us, including newsletters, promotional offers, and product 
        updates. You may opt out of marketing communications at any time by following the 
        unsubscribe instructions in our emails or by contacting us.
      </p>
      <p>
        <strong>Transactional Communications:</strong> You cannot opt out of transactional 
        communications, including payment confirmations, account notifications, security alerts, 
        and important service updates.
      </p>
      <p>
        <strong>Use of Your Name:</strong> We may use your business name and logo in our marketing 
        materials, website, and customer lists to indicate that you use our Services, unless you 
        request otherwise in writing.
      </p>
      <p>
        <strong>Testimonials:</strong> We may request testimonials or case studies from you. If 
        you provide such content, you grant us permission to use it in our marketing materials 
        with attribution to you.
      </p>
      <p>
        <strong>Email and SMS:</strong> We may send you communications via email or SMS. Standard 
        message and data rates may apply for SMS. You are responsible for any charges from your 
        mobile carrier.
      </p>

      <h2>22. Feedback and Suggestions</h2>
      <p>
        <strong>Feedback Submission:</strong> We welcome feedback, suggestions, and ideas about 
        our Services. You may submit feedback through our support channels or within the app.
      </p>
      <p>
        <strong>No Obligation:</strong> We are under no obligation to implement, develop, or 
        respond to any feedback you provide. We may use your feedback without compensation or 
        attribution to you.
      </p>
      <p>
        <strong>Ownership:</strong> By submitting feedback, you grant us a perpetual, irrevocable, 
        worldwide, royalty-free license to use, modify, and incorporate your feedback into our 
        Services without any obligation to you.
      </p>
      <p>
        <strong>Confidentiality:</strong> Feedback is not considered confidential. Do not submit 
        any proprietary, confidential, or sensitive information as feedback.
      </p>

      <h2>23. Export Controls and International Trade</h2>
      <p>
        <strong>Export Compliance:</strong> Our Services may be subject to export control laws and 
        regulations. You agree to comply with all applicable export control laws, including those 
        of Jamaica, the United States, and other jurisdictions.
      </p>
      <p>
        <strong>Restricted Use:</strong> You may not use our Services if you are located in, or 
        are a national or resident of, any country subject to comprehensive sanctions, or if you 
        are on any restricted party list.
      </p>
      <p>
        <strong>Prohibited Transactions:</strong> You may not use our Services to facilitate 
        transactions involving goods or services that are subject to export restrictions or 
        embargoes.
      </p>
      <p>
        <strong>Compliance:</strong> You represent and warrant that you are not subject to any 
        export restrictions and that your use of our Services complies with all applicable 
        international trade laws.
      </p>

      <h2>24. Third-Party Services and Integrations</h2>
      <p>
        <strong>Third-Party Services:</strong> Our Services may integrate with or link to third-party 
        services, websites, or applications. We do not control or endorse these third-party services 
        and are not responsible for their content, privacy practices, or terms of service.
      </p>
      <p>
        <strong>Stripe Integration:</strong> Our payment processing is powered by Stripe Connect. 
        Your use of Stripe&apos;s services is also subject to Stripe&apos;s terms of service and 
        privacy policy. We are not responsible for Stripe&apos;s actions or policies.
      </p>
      <p>
        <strong>Third-Party Fees:</strong> Third-party services may charge their own fees. You 
        are responsible for any fees charged by third-party services you choose to use in 
        connection with our Services.
      </p>
      <p>
        <strong>API Access:</strong> We may provide application programming interfaces (APIs) that 
        allow you to integrate our Services with your own systems or third-party services. API 
        access is subject to separate terms and usage limits.
      </p>
      <p>
        <strong>No Warranty:</strong> We make no warranties regarding third-party services or 
        integrations. Your use of third-party services is at your own risk.
      </p>

      <h2>25. Business Continuity and Disaster Recovery</h2>
      <p>
        <strong>Business Continuity:</strong> We maintain business continuity and disaster recovery 
        plans to minimize service disruptions. However, we cannot guarantee that our Services 
        will be available during natural disasters, cyberattacks, or other emergencies.
      </p>
      <p>
        <strong>Data Backup:</strong> While we maintain backups of our systems, you are responsible 
        for maintaining your own backups of important business data and transaction records.
      </p>
      <p>
        <strong>Service Restoration:</strong> In the event of a service disruption, we will work 
        to restore services as quickly as possible, but we do not guarantee specific recovery 
        timeframes.
      </p>
      <p>
        <strong>Force Majeure:</strong> We are not liable for service disruptions caused by events 
        beyond our reasonable control, including natural disasters, war, terrorism, pandemics, 
        government actions, or failures of third-party infrastructure.
      </p>

      <h2>26. Account Verification and Identity</h2>
      <p>
        <strong>Identity Verification:</strong> We may require you to verify your identity at any 
        time, including by providing government-issued identification, proof of address, or other 
        documentation.
      </p>
      <p>
        <strong>Business Verification:</strong> If you operate a business, we may require business 
        registration documents, tax identification numbers, and other business verification 
        documents.
      </p>
      <p>
        <strong>Ongoing Verification:</strong> We may periodically request updated verification 
        documents to ensure your account information remains current and accurate.
      </p>
      <p>
        <strong>Verification Delays:</strong> Failure to provide requested verification documents 
        may result in delayed payouts, account restrictions, or account suspension.
      </p>
      <p>
        <strong>Third-Party Verification:</strong> We may use third-party services to verify your 
        identity. By using our Services, you consent to such verification processes.
      </p>

      <h2>27. Risk Management and Fraud Prevention</h2>
      <p>
        <strong>Fraud Detection:</strong> We employ automated and manual fraud detection systems 
        to identify and prevent fraudulent transactions. These systems may flag or block transactions 
        that appear suspicious.
      </p>
      <p>
        <strong>Account Monitoring:</strong> We continuously monitor accounts for suspicious 
        activity, including unusual transaction patterns, chargeback rates, and compliance issues.
      </p>
      <p>
        <strong>Risk Assessment:</strong> We may assess the risk level of your account based on 
        various factors, including transaction volume, chargeback history, business type, and 
        other risk indicators.
      </p>
      <p>
        <strong>Account Holds:</strong> We may place holds on funds or restrict account functionality 
        if we detect suspicious activity or if your account poses a risk to us or other users.
      </p>
      <p>
        <strong>Investigation:</strong> We may investigate any transaction or account activity that 
        we deem suspicious. During an investigation, we may temporarily restrict your account or 
        hold funds.
      </p>
      <p>
        <strong>Cooperation:</strong> You must cooperate with any fraud investigation and provide 
        requested information promptly. Failure to cooperate may result in account termination.
      </p>

      <h2>28. Chargebacks and Disputes</h2>
      <p>
        <strong>Chargeback Process:</strong> Chargebacks occur when a customer disputes a 
        transaction with their bank or card issuer. We will notify you of any chargebacks 
        affecting your account.
      </p>
      <p>
        <strong>Chargeback Fees:</strong> Chargebacks may result in fees charged to your account. 
        These fees are non-refundable, even if the chargeback is later reversed.
      </p>
      <p>
        <strong>Chargeback Response:</strong> You are responsible for responding to chargebacks 
        and providing evidence to support your position. We may assist with the chargeback process, 
        but you are ultimately responsible for the outcome.
      </p>
      <p>
        <strong>Chargeback Limits:</strong> Excessive chargebacks may result in account restrictions, 
        increased reserves, or account termination. We may set chargeback thresholds based on your 
        transaction volume and risk profile.
      </p>
      <p>
        <strong>Dispute Resolution:</strong> For disputes with customers, we recommend resolving 
        them directly with the customer before they escalate to a chargeback. We may provide tools 
        to facilitate dispute resolution.
      </p>
      <p>
        <strong>Chargeback Reversal:</strong> If a chargeback is reversed in your favor, we will 
        credit the disputed amount back to your account, minus any applicable fees.
      </p>

      <h2>29. Reserves and Holds</h2>
      <p>
        <strong>Reserve Accounts:</strong> We or Stripe may require you to maintain a reserve 
        account to cover potential chargebacks, refunds, or other liabilities. Reserve requirements 
        are determined based on risk assessment.
      </p>
      <p>
        <strong>Reserve Amounts:</strong> Reserve amounts may be a percentage of your transaction 
        volume or a fixed amount. Reserve requirements may change based on your account performance 
        and risk factors.
      </p>
      <p>
        <strong>Reserve Release:</strong> Reserved funds are typically released according to a 
        schedule based on your account history and risk profile. We will notify you of your reserve 
        schedule.
      </p>
      <p>
        <strong>Temporary Holds:</strong> We may place temporary holds on funds for various reasons, 
        including suspected fraud, compliance reviews, or high-risk transactions. Holds are typically 
        released within a specified timeframe after resolution.
      </p>
      <p>
        <strong>Reserve Adjustments:</strong> We may increase or decrease reserve requirements based 
        on changes in your account risk profile, chargeback rates, or other factors.
      </p>

      <h2>30. Currency and Exchange Rates</h2>
      <p>
        <strong>Supported Currencies:</strong> Our Services support transactions in Jamaican Dollars 
        (JMD) and United States Dollars (USD). We may add or remove supported currencies at any time.
      </p>
      <p>
        <strong>Currency Selection:</strong> You may select your preferred currency for transactions 
        and payouts. Currency selection may affect processing times and fees.
      </p>
      <p>
        <strong>Exchange Rates:</strong> If currency conversion is required, we or our payment 
        processors will apply exchange rates. Exchange rates are determined by market rates and 
        may include a markup. We will disclose applicable exchange rates before processing conversions.
      </p>
      <p>
        <strong>Exchange Rate Fluctuations:</strong> Exchange rates fluctuate constantly. We are not 
        responsible for losses resulting from exchange rate fluctuations between the time a 
        transaction is initiated and when it is settled.
      </p>
      <p>
        <strong>Multi-Currency Accounts:</strong> If you maintain accounts in multiple currencies, 
        each currency account is subject to separate fees, limits, and payout schedules.
      </p>

      <h2>31. Transaction Limits and Restrictions</h2>
      <p>
        <strong>Transaction Limits:</strong> We may impose limits on transaction amounts, transaction 
        frequency, or total transaction volume. These limits may vary based on your account type, 
        verification status, and risk assessment.
      </p>
      <p>
        <strong>Limit Adjustments:</strong> Transaction limits may be adjusted at our discretion 
        based on your account history, risk profile, or business needs. You may request limit 
        increases, which are subject to review and approval.
      </p>
      <p>
        <strong>Daily Limits:</strong> Daily transaction limits may apply to prevent fraud and 
        manage risk. Limits reset at midnight Jamaica Time (JST).
      </p>
      <p>
        <strong>Monthly Limits:</strong> Monthly transaction volume limits may also apply. These 
        limits reset at the beginning of each calendar month.
      </p>
      <p>
        <strong>Limit Exceeded:</strong> If you attempt to exceed your transaction limits, the 
        transaction may be declined or held for review. We are not obligated to approve limit 
        increase requests.
      </p>

      <h2>32. Mobile Application Terms</h2>
      <p>
        <strong>App License:</strong> We grant you a limited, non-exclusive, non-transferable 
        license to download, install, and use our mobile application on your personal mobile device 
        for your business purposes.
      </p>
      <p>
        <strong>Device Requirements:</strong> Our mobile application requires a compatible mobile 
        device and operating system. You are responsible for ensuring your device meets minimum 
        requirements and is kept updated.
      </p>
      <p>
        <strong>App Store Terms:</strong> If you download our app from an app store (Apple App 
        Store or Google Play Store), you are also subject to the app store&apos;s terms of service. 
        We are not responsible for app store policies or actions.
      </p>
      <p>
        <strong>App Updates:</strong> We may require you to update the app to continue using certain 
        features. Failure to update may result in limited functionality or inability to access 
        the Services.
      </p>
      <p>
        <strong>Mobile Data:</strong> Use of our mobile application may consume data. You are 
        responsible for any data charges from your mobile carrier.
      </p>
      <p>
        <strong>Location Services:</strong> Our app may request access to your device&apos;s location 
        services for certain features. You may disable location services, but this may limit 
        functionality.
      </p>

      <h2>33. Website and Online Services</h2>
      <p>
        <strong>Website Access:</strong> Our website and online dashboard are provided for your 
        use in managing your account and accessing our Services. We reserve the right to modify 
        or discontinue our website at any time.
      </p>
      <p>
        <strong>Browser Compatibility:</strong> Our website is designed to work with modern web 
        browsers. We recommend using the latest versions of Chrome, Firefox, Safari, or Edge for 
        optimal performance.
      </p>
      <p>
        <strong>Cookies:</strong> Our website uses cookies and similar technologies to enhance 
        functionality and analyze usage. By using our website, you consent to our use of cookies 
        as described in our Privacy Policy.
      </p>
      <p>
        <strong>Website Content:</strong> All content on our website, including text, graphics, 
        logos, and images, is our property or the property of our licensors and is protected by 
        copyright and other intellectual property laws.
      </p>

      <h2>34. Beta and Experimental Features</h2>
      <p>
        <strong>Beta Features:</strong> We may offer beta or experimental features that are still 
        under development. These features are provided for testing purposes and may be unstable or 
        incomplete.
      </p>
      <p>
        <strong>No Warranty:</strong> Beta features are provided &quot;as is&quot; without warranties 
        of any kind. We make no guarantees about the performance, reliability, or availability of 
        beta features.
      </p>
      <p>
        <strong>Feedback:</strong> We may request feedback on beta features. Your use of beta 
        features constitutes consent to provide feedback and allows us to monitor your usage.
      </p>
      <p>
        <strong>Discontinuation:</strong> We may modify, suspend, or discontinue beta features at 
        any time without notice. We are not obligated to make beta features generally available.
      </p>
      <p>
        <strong>Data in Beta:</strong> Data created or stored using beta features may be lost 
        when features are modified or discontinued. We recommend not relying on beta features for 
        critical business operations.
      </p>

      <h2>35. Accessibility</h2>
      <p>
        <strong>Accessibility Standards:</strong> We strive to make our Services accessible to 
        users with disabilities. We aim to comply with applicable accessibility standards and 
        guidelines.
      </p>
      <p>
        <strong>Accessibility Features:</strong> Our Services may include accessibility features 
        such as screen reader support, keyboard navigation, and adjustable text sizes. We 
        continuously work to improve accessibility.
      </p>
      <p>
        <strong>Feedback:</strong> If you encounter accessibility barriers, please contact us 
        so we can work to address them.
      </p>
      <p>
        <strong>Third-Party Content:</strong> We are not responsible for the accessibility of 
        third-party content or services that may be linked from or integrated with our Services.
      </p>

      <h2>36. Changes to Services and Pricing</h2>
      <p>
        <strong>Service Modifications:</strong> We reserve the right to modify, enhance, or 
        discontinue any aspect of our Services at any time. We will provide reasonable notice 
        for material changes that adversely affect your use of the Services.
      </p>
      <p>
        <strong>Pricing Changes:</strong> We may change our fees and pricing at any time. We will 
        provide at least 30 days&apos; notice of fee increases. Fee decreases may take effect 
        immediately.
      </p>
      <p>
        <strong>Grandfathering:</strong> We may, but are not obligated to, grandfather existing 
        users at previous pricing levels for a limited time after pricing changes.
      </p>
      <p>
        <strong>New Features:</strong> New features may be introduced with separate pricing or 
        may be included in your existing plan. We will notify you of any additional costs 
        associated with new features.
      </p>

      <h2>37. Account Suspension and Investigation</h2>
      <p>
        <strong>Suspension Rights:</strong> We may suspend your account immediately, with or without 
        notice, if we suspect fraud, violation of these Terms, or if your account poses a risk 
        to us or other users.
      </p>
      <p>
        <strong>Investigation Period:</strong> During an investigation, we may restrict your 
        account functionality, hold funds, or suspend payouts. Investigations may take several 
        weeks or longer depending on complexity.
      </p>
      <p>
        <strong>Cooperation:</strong> You must cooperate fully with any investigation, including 
        providing requested documents, information, and explanations. Failure to cooperate may 
        result in permanent account termination.
      </p>
      <p>
        <strong>Appeal Process:</strong> If your account is suspended, you may appeal the decision 
        by contacting our support team and providing additional information or documentation.
      </p>
      <p>
        <strong>Reinstatement:</strong> We may reinstate suspended accounts if investigations 
        determine that no violation occurred or if violations have been remedied. Reinstatement 
        is at our sole discretion.
      </p>

      <h2>38. Data Portability and Account Closure</h2>
      <p>
        <strong>Data Export:</strong> Upon request, we will provide you with a copy of your account 
        data in a machine-readable format. Data export requests may take up to 30 days to process.
      </p>
      <p>
        <strong>Account Closure:</strong> You may close your account at any time by contacting 
        our support team. Account closure is subject to resolution of any outstanding issues, 
        fees, or liabilities.
      </p>
      <p>
        <strong>Data Retention:</strong> After account closure, we will retain your data for 
        the period required by law or our business needs, typically seven (7) years for 
        financial records.
      </p>
      <p>
        <strong>Data Deletion:</strong> You may request deletion of your personal data, subject 
        to legal and regulatory retention requirements. Some data may be retained for compliance 
        or legal purposes even after account closure.
      </p>

      <h2>39. Limitation Periods and Time Bars</h2>
      <p>
        <strong>Claim Time Limits:</strong> Any claim or cause of action arising from or related 
        to these Terms or our Services must be brought within one (1) year after the claim or 
        cause of action arose, or be forever barred.
      </p>
      <p>
        <strong>Discovery Rule:</strong> The limitation period begins when you knew or should have 
        known of the claim, not necessarily when the underlying event occurred.
      </p>
      <p>
        <strong>Statutory Exceptions:</strong> Some claims may be subject to different limitation 
        periods under applicable law. This section does not limit any rights you may have under 
        mandatory consumer protection laws.
      </p>

      <h2>40. Severability and Waiver</h2>
      <p>
        <strong>Severability:</strong> If any provision of these Terms is found to be invalid, 
        illegal, or unenforceable by a court of competent jurisdiction, the remaining provisions 
        will continue in full force and effect. The invalid provision will be modified to the 
        minimum extent necessary to make it valid and enforceable.
      </p>
      <p>
        <strong>Waiver:</strong> Our failure to enforce any provision of these Terms does not 
        constitute a waiver of that provision or any other provision. Any waiver must be in writing 
        and signed by an authorized representative of HandyPay.
      </p>
      <p>
        <strong>Cumulative Rights:</strong> All rights and remedies available to us under these 
        Terms are cumulative and not exclusive of any other rights or remedies available at law 
        or in equity.
      </p>

      <h2>41. Entire Agreement and Modifications</h2>
      <p>
        <strong>Entire Agreement:</strong> These Terms, together with our Privacy Policy and any 
        other policies referenced herein, constitute the entire agreement between you and HandyPay 
        regarding your use of our Services and supersede all prior or contemporaneous agreements, 
        understandings, or communications.
      </p>
      <p>
        <strong>Modifications:</strong> These Terms may only be modified as set forth in Section 16 
        (Updates to Terms). No oral modifications or side agreements are valid unless confirmed 
        in writing by an authorized representative of HandyPay.
      </p>
      <p>
        <strong>Conflicting Terms:</strong> If there is a conflict between these Terms and any 
        other agreement or policy, these Terms will govern unless expressly stated otherwise in 
        writing by HandyPay.
      </p>

      <h2>42. Assignment and Transfer</h2>
      <p>
        <strong>Assignment by HandyPay:</strong> We may assign, transfer, or delegate these 
        Terms or any of our rights or obligations hereunder to any third party without your consent, 
        including in connection with a merger, acquisition, or sale of assets.
      </p>
      <p>
        <strong>Assignment by You:</strong> You may not assign, transfer, or delegate these Terms 
        or any of your rights or obligations hereunder without our prior written consent. Any 
        attempted assignment without consent is void.
      </p>
      <p>
        <strong>Successors:</strong> These Terms will be binding upon and inure to the benefit of 
        the parties and their respective successors and permitted assigns.
      </p>

      <h2>43. Relationship of Parties</h2>
      <p>
        <strong>Independent Contractors:</strong> These Terms do not create a partnership, joint 
        venture, employment, agency, or fiduciary relationship between you and HandyPay. We are 
        independent contractors.
      </p>
      <p>
        <strong>No Agency:</strong> Neither party has the authority to bind the other party or 
        to make any representations or warranties on behalf of the other party.
      </p>
      <p>
        <strong>Third-Party Beneficiaries:</strong> These Terms are for the benefit of you and 
        HandyPay only. There are no third-party beneficiaries to these Terms.
      </p>

      <h2>44. Notices and Communications</h2>
      <p>
        <strong>Notices to You:</strong> We may provide notices to you by:
      </p>
      <ul>
        <li>Email to the address associated with your account</li>
        <li>In-app notifications</li>
        <li>Postal mail to the address on file</li>
        <li>SMS to the phone number on file</li>
        <li>Posting on our website or in the app</li>
      </ul>
      <p>
        <strong>Notices to Us:</strong> Notices to HandyPay must be sent in writing to:
      </p>
      <ul>
        <li>Email: support@tryhandypay.com</li>
        <li>Address: HandyPay, Jamaica</li>
      </ul>
      <p>
        <strong>Effective Date:</strong> Notices are deemed received when sent (for email) or 
        when delivered (for postal mail). In-app notifications are deemed received when displayed.
      </p>
      <p>
        <strong>Language:</strong> All communications will be in English. We are not obligated 
        to provide translations.
      </p>

      <h2>45. Language and Translations</h2>
      <p>
        <strong>English Language:</strong> These Terms are written in English. Any translations 
        are provided for convenience only and are not legally binding.
      </p>
      <p>
        <strong>Governing Version:</strong> In case of any discrepancy between the English version 
        and any translation, the English version shall govern and prevail.
      </p>
      <p>
        <strong>Translation Errors:</strong> We are not responsible for any errors or inaccuracies 
        in translations of these Terms.
      </p>

      <h2>46. Electronic Signatures and Records</h2>
      <p>
        <strong>Electronic Acceptance:</strong> By clicking &quot;I Agree,&quot; creating an account, or 
        using our Services, you are electronically signing these Terms. Electronic signatures 
        have the same legal effect as handwritten signatures.
      </p>
      <p>
        <strong>Electronic Records:</strong> We may maintain records of your transactions and 
        communications in electronic form. Electronic records are admissible as evidence in legal 
        proceedings to the same extent as paper records.
      </p>
      <p>
        <strong>Consent:</strong> You consent to receive all communications, notices, and documents 
        electronically. You may request paper copies, but we may charge a fee for providing them.
      </p>

      <h2>47. Survival</h2>
      <p>
        The following sections will survive termination of these Terms and your use of our Services:
      </p>
      <ul>
        <li>Section 6 (Fees and Charges)</li>
        <li>Section 8 (Data Protection and Privacy)</li>
        <li>Section 11 (Intellectual Property)</li>
        <li>Section 12 (Disclaimers and Limitations of Liability)</li>
        <li>Section 13 (Indemnification)</li>
        <li>Section 15 (Dispute Resolution)</li>
        <li>Section 18 (Customer Responsibilities)</li>
        <li>Section 28 (Chargebacks and Disputes)</li>
        <li>Section 38 (Data Portability and Account Closure)</li>
        <li>Section 40 (Severability and Waiver)</li>
        <li>Section 41 (Entire Agreement)</li>
        <li>This Section 47 (Survival)</li>
      </ul>

      <h2>48. Contact Information</h2>
      <p>
        If you have any questions, concerns, or complaints about these Terms or our Services, 
        please contact us:
      </p>
      <ul>
        <li><strong>Email:</strong> support@tryhandypay.com or support@tryhandypay.com</li>
        <li><strong>Address:</strong> HandyPay, Jamaica</li>
        <li><strong>Support Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM JST</li>
      </ul>
      <p>
        We will respond to your inquiries within a reasonable time frame, typically within 48 
        hours during business days.
      </p>
      <p>
        <strong>Legal Notices:</strong> For legal notices or service of process, please send 
        correspondence to our registered address as provided above.
      </p>

      <h2>49. Acknowledgment</h2>
      <p>
        By using HandyPay&apos;s Services, you acknowledge that:
      </p>
      <ul>
        <li>You have read and understood these Terms of Service in their entirety</li>
        <li>You agree to be bound by these Terms and our Privacy Policy</li>
        <li>You have the legal capacity and authority to enter into this agreement</li>
        <li>You will comply with all applicable laws and regulations</li>
        <li>You understand that these Terms may be updated from time to time</li>
        <li>You will regularly review these Terms for updates</li>
        <li>Your continued use of our Services constitutes acceptance of any modifications</li>
      </ul>

        <p className="text-sm text-neutral-600 mt-8 border-t pt-6">
          <strong>Last Updated:</strong> May 23, 2025<br />
          <strong>Version:</strong> 2.0<br />
          <br />
          By using HandyPay&apos;s Services, you acknowledge that you have read, understood, and 
          agree to be bound by these Terms of Service. If you do not agree to these Terms, you 
          must immediately discontinue use of our Services.
        </p>
      </div>
    </main>
  );
}