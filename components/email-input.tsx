"use client"

import type React from "react"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import posthog from "posthog-js"
import { trackGAEvent } from "@/lib/google-analytics"
import { trackJoinWaitlist } from "@/lib/google-ads"

import { supabase, WaitlistEntry } from '@/lib/supabase'

// Supabase-based waitlist storage
export async function addToWaitlist(email: string, source: string = 'website') {
  try {
    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      console.log("Email already in waitlist:", email)
      return { success: false, message: 'Email already registered' }
    }

    // Add new email
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{
        email,
        source,
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
        ip_address: null // Will be handled by Supabase functions if needed
      }])
      .select()

    if (error) {
      console.error('Error adding to waitlist:', error)
      return { success: false, message: 'Failed to add email' }
    }

    console.log("Added to waitlist:", email, "Source:", source)
    return { success: true, data }

  } catch (error) {
    console.error('Error in addToWaitlist:', error)
    return { success: false, message: 'Unexpected error' }
  }
}

export async function getWaitlistCount(): Promise<number> {
  try {
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })

    return count || 0
  } catch (error) {
    console.error('Error getting waitlist count:', error)
    return 0
  }
}

export async function getWaitlistEmails(): Promise<WaitlistEntry[]> {
  try {
    const { data } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: false })

    return data || []
  } catch (error) {
    console.error('Error getting waitlist emails:', error)
    return []
  }
}

export function EmailInput({ onSubmit }: { onSubmit?: (email: string) => void }) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await addToWaitlist(email, "hero_section")

      if (result.success) {
        // Track waitlist signup
        const waitlistData = {
          source: "hero_section",
          email: email,
          device_type: typeof window !== "undefined" && /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
          timestamp: new Date().toISOString(),
        }
        posthog.capture("waitlist_signup", waitlistData)
        trackGAEvent("waitlist_signup", waitlistData)
        trackJoinWaitlist()

        toast.success("Successfully joined the waitlist!", {
          description: "We'll send updates to " + email,
        })
        setEmail("")
        onSubmit?.(email)
      } else {
        // Track error
        const errorData = {
          source: "hero_section",
          error: result.message,
          email: email,
        }
        posthog.capture("waitlist_signup_error", errorData)
        trackGAEvent("waitlist_signup_error", errorData)

        toast.error(result.message || "Failed to join waitlist. Please try again.")
      }
    } catch (error) {
      const errorData = {
        source: "hero_section",
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
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
  )
}
