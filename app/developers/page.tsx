"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Zap, Shield, Globe, Key, Webhook, CreditCard, QrCode, Link as LinkIcon, ArrowRight, Check, Copy, Terminal, BookOpen } from "lucide-react";
import posthog from "posthog-js";
import { trackGAEvent } from "@/lib/google-analytics";

const codeExamples = {
  createPayment: `// Create a payment intent
const response = await fetch('https://api.tryhandypay.com/v1/payments', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer hp_live_xxxxxxxxxxxxxxxx',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 5000, // $50.00 in cents
    currency: 'usd',
    description: 'Order #1234',
    customer_email: 'customer@example.com'
  })
});

const payment = await response.json();
// Redirect customer to payment.checkout_url`,

  createPaymentLink: `// Create a reusable payment link
const response = await fetch('https://api.tryhandypay.com/v1/payment-links', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer hp_live_xxxxxxxxxxxxxxxx',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: 2500, // $25.00
    currency: 'jmd',
    name: 'Premium Subscription',
    description: 'Monthly access to premium features'
  })
});

const link = await response.json();
console.log(link.url); // https://pay.tryhandypay.com/p/xxxxx`,

  webhook: `// Webhook handler (Next.js example)
export async function POST(request: Request) {
  const signature = request.headers.get('x-handypay-signature');
  const body = await request.text();
  
  // Verify webhook signature
  const isValid = verifyWebhookSignature(body, signature);
  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }
  
  const event = JSON.parse(body);
  
  switch (event.type) {
    case 'payment.completed':
      // Handle successful payment
      await fulfillOrder(event.data.payment_id);
      break;
    case 'payment.failed':
      // Handle failed payment
      await notifyCustomer(event.data.customer_email);
      break;
  }
  
  return new Response('OK', { status: 200 });
}`
};

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState<'createPayment' | 'createPaymentLink' | 'webhook'>('createPayment');
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(codeExamples[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    posthog.capture("code_copied", { example: activeTab });
    trackGAEvent("code_copied", { example: activeTab });
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    
    try {
      posthog.capture("developer_waitlist_signup", { email });
      trackGAEvent("developer_waitlist_signup", { email });
      
      // Add to waitlist via existing API
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          source: "developer_portal",
          type: "api_access"
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-neutral-950 to-neutral-900 overflow-hidden">
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#11AD30]/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />

        <div className="container mx-auto max-w-6xl px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm text-white/80 mb-6">
              <Terminal className="w-4 h-4" />
              <span>Developer API</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              Accept payments with
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#11AD30] to-emerald-400">
                a few lines of code
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
              Integrate HandyPay into your app, website, or platform. Accept card payments, 
              create payment links, and get paid across 17 countries.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#get-api-key"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#11AD30] hover:bg-[#0e9428] text-white rounded-full font-medium transition-colors"
              >
                Get API Keys
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#documentation"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors border border-white/10"
              >
                <BookOpen className="w-4 h-4" />
                Read the Docs
              </a>
            </div>
          </motion.div>

          {/* Code Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden shadow-2xl">
              {/* Tab bar */}
              <div className="flex items-center gap-1 px-4 py-3 bg-neutral-800/50 border-b border-neutral-800">
                <button
                  onClick={() => setActiveTab('createPayment')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'createPayment' 
                      ? 'bg-neutral-700 text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Create Payment
                </button>
                <button
                  onClick={() => setActiveTab('createPaymentLink')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'createPaymentLink' 
                      ? 'bg-neutral-700 text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Payment Link
                </button>
                <button
                  onClick={() => setActiveTab('webhook')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'webhook' 
                      ? 'bg-neutral-700 text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Webhooks
                </button>
                <div className="flex-1" />
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#11AD30]" />
                      <span className="text-[#11AD30]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              
              {/* Code content */}
              <div className="p-6 overflow-x-auto">
                <pre className="text-sm text-neutral-300 font-mono leading-relaxed">
                  <code>{codeExamples[activeTab]}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Everything you need to accept payments
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A complete API toolkit for accepting payments in the Caribbean, Africa, and beyond.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: CreditCard,
                title: "Accept Card Payments",
                description: "Accept Visa, Mastercard, Amex, and Discover. Plus Apple Pay and Google Pay."
              },
              {
                icon: QrCode,
                title: "QR Code Payments",
                description: "Generate QR codes for in-person payments. Customers scan and pay instantly."
              },
              {
                icon: LinkIcon,
                title: "Payment Links",
                description: "Create shareable payment links for invoices, products, or services."
              },
              {
                icon: Webhook,
                title: "Real-time Webhooks",
                description: "Get instant notifications when payments succeed, fail, or require action."
              },
              {
                icon: Globe,
                title: "17 Countries",
                description: "Accept payments and get payouts across the Caribbean and Africa."
              },
              {
                icon: Shield,
                title: "Bank-grade Security",
                description: "PCI DSS compliant with end-to-end encryption and fraud detection."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-neutral-50 rounded-2xl border border-neutral-200 hover:border-neutral-300 transition-colors"
              >
                <div className="w-12 h-12 bg-[#11AD30]/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#11AD30]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 md:py-32 bg-neutral-50">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Pay only for successful transactions. No monthly fees, no setup costs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter - Same as mobile app */}
            <div className="bg-neutral-900 p-8 rounded-2xl border border-neutral-800 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#11AD30] text-white text-sm font-medium rounded-full">
                Same as App
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Starter</h3>
              <p className="text-neutral-400 mb-6">Same rates as the mobile app</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">4.9%</span>
                <span className="text-neutral-400"> + $0.40</span>
                <p className="text-sm text-neutral-500 mt-1">per successful transaction</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited transactions",
                  "Payment links",
                  "QR code payments",
                  "Email support",
                  "Basic webhooks",
                  "17 countries"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white">
                    <Check className="w-4 h-4 text-[#11AD30]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#get-api-key"
                className="block w-full text-center py-3 bg-[#11AD30] hover:bg-[#0e9428] text-white rounded-full font-medium transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Growth */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200">
              <h3 className="text-xl font-semibold mb-2">Growth</h3>
              <p className="text-neutral-600 mb-6">For high volume businesses</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">4.5%</span>
                <span className="text-neutral-600"> + $0.35</span>
                <p className="text-sm text-neutral-500 mt-1">per successful transaction</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "$50,000+/month volume",
                  "Everything in Starter",
                  "Priority support",
                  "Advanced webhooks",
                  "Custom branding",
                  "Dedicated account manager"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#11AD30]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block w-full text-center py-3 border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white p-8 rounded-2xl border border-neutral-200">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-neutral-600 mb-6">For large scale operations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
                <p className="text-sm text-neutral-500 mt-1">volume-based pricing</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "$500,000+/month volume",
                  "Everything in Growth",
                  "24/7 dedicated support",
                  "Custom integrations",
                  "SLA guarantee",
                  "White-label options"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-[#11AD30]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block w-full text-center py-3 border border-neutral-300 rounded-full font-medium hover:bg-neutral-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation Preview */}
      <section id="documentation" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Developer-friendly documentation
              </h2>
              <p className="text-lg text-neutral-600 mb-8">
                Comprehensive guides, API references, and code examples to get you up and running in minutes.
              </p>
              
              <div className="space-y-4">
                {[
                  { title: "Quick Start Guide", desc: "Get your first payment in 5 minutes" },
                  { title: "API Reference", desc: "Complete endpoint documentation" },
                  { title: "Webhooks", desc: "Real-time event notifications" },
                  { title: "SDKs & Libraries", desc: "Node.js, Python, PHP, and more" }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                    <div className="w-10 h-10 bg-[#11AD30]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-[#11AD30]" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-neutral-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-4 text-sm text-neutral-500 font-mono">api-reference.md</span>
              </div>
              <pre className="text-sm text-neutral-300 font-mono overflow-x-auto">
{`## Endpoints

### Payments
POST   /v1/payments
GET    /v1/payments/:id
POST   /v1/payments/:id/refund

### Payment Links
POST   /v1/payment-links
GET    /v1/payment-links/:id
DELETE /v1/payment-links/:id

### Customers
POST   /v1/customers
GET    /v1/customers/:id
PUT    /v1/customers/:id

### Webhooks
POST   /v1/webhooks
GET    /v1/webhooks
DELETE /v1/webhooks/:id`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA / Waitlist Section */}
      <section id="get-api-key" className="py-20 md:py-32 bg-gradient-to-b from-neutral-900 to-black">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-[#11AD30]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Key className="w-8 h-8 text-[#11AD30]" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Get early access to the API
            </h2>
            <p className="text-lg text-neutral-400 mb-8">
              Join the waitlist to be among the first developers to integrate HandyPay. 
              We&apos;re rolling out API access in early 2025.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#11AD30]/20 border border-[#11AD30]/30 rounded-2xl p-8"
              >
                <Check className="w-12 h-12 text-[#11AD30] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">You&apos;re on the list!</h3>
                <p className="text-neutral-400">
                  We&apos;ll email you when API access is available.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 border border-white/10 rounded-full text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#11AD30]"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-[#11AD30] hover:bg-[#0e9428] text-white rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </button>
              </form>
            )}

            <p className="text-sm text-neutral-500 mt-6">
              Already have API access?{" "}
              <a href="https://dashboard.tryhandypay.com" className="text-[#11AD30] hover:underline">
                Go to Dashboard →
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

