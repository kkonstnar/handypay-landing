"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { addToWaitlist } from "@/components/email-input"
import { toast } from "sonner"
import posthog from "posthog-js"
import { trackGAEvent } from "@/lib/google-analytics"

interface HeaderWaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function HeaderWaitlistModal({ isOpen, onClose }: HeaderWaitlistModalProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await addToWaitlist(email, "header_modal")

      if (result.success) {
        // Track waitlist signup
        const waitlistData = {
          source: "header_modal",
          email: email,
          device_type: typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
          timestamp: new Date().toISOString(),
        }
        posthog.capture("waitlist_signup", waitlistData)
        trackGAEvent("waitlist_signup", waitlistData)

        toast.success("Successfully joined the waitlist!", {
          description: "We'll send updates to " + email,
        })
        setEmail("")
        onClose()
      } else {
        // Track error
        const errorData = {
          source: "header_modal",
          error: result.message,
          email: email,
        }
        posthog.capture("waitlist_signup_error", errorData)
        trackGAEvent("waitlist_signup_error", errorData)

        toast.error(result.message || "Failed to join waitlist. Please try again.")
      }
    } catch (error) {
      const errorData = {
        source: "header_modal",
        error: error instanceof Error ? error.message : "Unknown error",
        email: email,
      }
      posthog.capture("waitlist_signup_error", errorData)
      trackGAEvent("waitlist_signup_error", errorData)

      toast.error("Failed to join waitlist. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setEmail("")
    setIsSubmitting(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
            {/* Header Image */}
            <div className="relative aspect-square w-full bg-gray-100 rounded-t-lg overflow-hidden mb-4">
              <Image
                src="/webp/newsletter.webp"
                alt="Newsletter signup"
                fill
                className="object-cover"
              />
            </div>

        <DialogHeader>
          <DialogTitle>Join the HandyPay Waitlist</DialogTitle>
          <DialogDescription>
            Be the first to know when we launch! Get early access to Jamaica&apos;s easiest payment solution.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex items-center bg-gray-100 rounded-full">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-none bg-transparent text-base placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none outline-none px-6 h-14"
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-black text-white hover:bg-black/90 px-8 h-12 text-base font-medium m-1 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <Check className="h-4 w-4 text-black" />
              ) : (
                "Join Waitlist"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
