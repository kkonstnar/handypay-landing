"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle } from "lucide-react"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
}

export function WaitlistModal({ isOpen, onClose, email }: WaitlistModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-[1px] z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
          <motion.div
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>

              <h3 className="text-lg font-medium text-gray-900 mb-2">
                You&apos;re on the waitlist!
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                Thanks for your interest in HandyPay beta! We&apos;ll send updates to{" "}
                <span className="font-medium text-gray-900">{email}</span> as soon
                as the beta is ready.
              </p>

              <button
                onClick={onClose}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

