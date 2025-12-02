"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
  }
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center px-4 py-12 md:py-20 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 heading">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
              Have questions about HandyPay? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-medium mb-8 heading">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-xl mb-2">Email Us</h3>
                  <p className="text-neutral-600 mb-4">
                    Send us an email and we&apos;ll respond as soon as possible.
                  </p>
                  <a
                    href="mailto:support@handypay.com"
                    className="text-[#11AD30] hover:text-[#2ea04a] font-medium text-lg"
                  >
                    support@handypay.com
                  </a>
                </div>

                <div>
                  <h3 className="font-medium text-xl mb-2">Response Time</h3>
                  <p className="text-neutral-600">
                    We typically respond to all inquiries within 30 minutes during business days.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h3 className="text-2xl font-medium mb-6">Send us a message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you..."
                    rows={5}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-neutral-800 text-white"
                >
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
