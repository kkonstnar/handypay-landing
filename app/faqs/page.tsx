"use client"

import { useState, useEffect, useRef, useMemo, useCallback, type KeyboardEvent } from "react"
import { Plus, Search, Mail, Keyboard, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Import HandyPay FAQ data
import { faqData } from "@/constants/faqData"

// Transform FAQ data to match component structure
const faqCategories = [
  {
    id: "general",
    title: "General",
    questions: faqData.general.map((item, index) => ({
      id: `general-${index}`,
      question: item.question,
      answer: item.answer,
    })),
  },
  {
    id: "payments",
    title: "Payments & Pricing",
    questions: faqData.payments.map((item, index) => ({
      id: `payments-${index}`,
      question: item.question,
      answer: item.answer,
    })),
  },
  {
    id: "security",
    title: "Security & Safety",
    questions: faqData.security.map((item, index) => ({
      id: `security-${index}`,
      question: item.question,
      answer: item.answer,
    })),
  },
  {
    id: "business",
    title: "For Businesses",
    questions: faqData.business.map((item, index) => ({
      id: `business-${index}`,
      question: item.question,
      answer: item.answer,
    })),
  },
  {
    id: "technical",
    title: "Technical Support",
    questions: faqData.technical.map((item, index) => ({
      id: `technical-${index}`,
      question: item.question,
      answer: item.answer,
    })),
  },
  {
    id: "support",
    title: "Customer Support",
    questions: faqData.support.map((item, index) => ({
      id: `support-${index}`,
      question: item.question,
      answer: item.answer,
    })),
  },
]

export default function FAQPage() {
  const [openCategory, setOpenCategory] = useState<string>("general")
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [focusedQuestionIndex, setFocusedQuestionIndex] = useState<number>(-1)
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const questionRefs = useRef<(HTMLButtonElement | null)[]>([])
  const searchInputRef = useRef<HTMLInputElement>(null)
  const categoryRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    setIsLoaded(true)
    // Reset question refs when category changes
    questionRefs.current = []

    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [openCategory])

  const toggleQuestion = useCallback((id: string) => {
    const wasOpen = openQuestions[id];
    const newState = !wasOpen;

    setOpenQuestions((prev) => ({
      ...prev,
      [id]: newState,
    }));

    // Find the question details
    const question = faqCategories
      .flatMap(cat => cat.questions)
      .find(q => q.id === id);

    if (question) {
      // Track FAQ question interaction (simplified without PostHog for now)
      console.log("FAQ question interaction:", {
        action: newState ? "opened" : "closed",
        question_id: id,
        question_text: question.question,
        category: faqCategories.find(cat => cat.questions.some(q => q.id === id))?.title || "unknown",
        page: "/faqs",
        has_search_query: searchQuery.length > 0,
      });
    }
  }, [openQuestions, searchQuery])

  const filteredCategories = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories

  const currentCategory = filteredCategories.find((cat) => cat.id === openCategory) || filteredCategories[0]
  const currentQuestions = useMemo(() => currentCategory?.questions || [], [currentCategory])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: Event) => {
      const keyboardEvent = e as globalThis.KeyboardEvent
      // Don't handle keyboard shortcuts when user is typing in search
      if (document.activeElement === searchInputRef.current) {
        if (keyboardEvent.key === "Escape") {
          setSearchQuery("")
          searchInputRef.current?.blur()
        }
        return
      }

      switch (keyboardEvent.key) {
        case "ArrowDown":
          keyboardEvent.preventDefault()
          setFocusedQuestionIndex((prev) => {
            const nextIndex = prev < currentQuestions.length - 1 ? prev + 1 : 0
            questionRefs.current[nextIndex]?.focus()
            return nextIndex
          })
          break

        case "ArrowUp":
          keyboardEvent.preventDefault()
          setFocusedQuestionIndex((prev) => {
            const nextIndex = prev > 0 ? prev - 1 : currentQuestions.length - 1
            questionRefs.current[nextIndex]?.focus()
            return nextIndex
          })
          break

        case "Enter":
        case " ":
          if (focusedQuestionIndex >= 0 && focusedQuestionIndex < currentQuestions.length) {
            keyboardEvent.preventDefault()
            toggleQuestion(currentQuestions[focusedQuestionIndex].id)
          }
          break

        case "Escape":
          // Close any open questions
          setOpenQuestions({})
          break

        case "/":
          // Focus search
          keyboardEvent.preventDefault()
          searchInputRef.current?.focus()
          break

        case "?":
          // Show keyboard shortcuts
          e.preventDefault()
          setShowKeyboardShortcuts(true)
          break

        default:
          // Number keys 1-9 to navigate categories
          const num = Number.parseInt(keyboardEvent.key)
          if (!isNaN(num) && num >= 1 && num <= faqCategories.length) {
            keyboardEvent.preventDefault()
            const categoryIndex = num - 1
            setOpenCategory(faqCategories[categoryIndex].id)
            categoryRefs.current[categoryIndex]?.focus()
          }
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentQuestions, focusedQuestionIndex, toggleQuestion])

  // Highlight search terms in text
  const highlightText = (text: string) => {
    if (!searchQuery) return text

    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === searchQuery.toLowerCase() ? (
        <span key={i} className="bg-green-100 text-green-800 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="pt-20 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row gap-12">
              {/* Left column - main content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <motion.h1
                    className="text-5xl font-medium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    FAQs
                  </motion.h1>

                  <motion.button
                    className="hidden md:flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors"
                    onClick={() => setShowKeyboardShortcuts(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    aria-label="Show keyboard shortcuts"
                  >
                    <Keyboard className="h-4 w-4" />
                    <span className="text-sm">Shortcuts</span>
                  </motion.button>
                </div>

                <motion.p
                  className="text-gray-500 mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Last updated January 2025
                </motion.p>

                {/* Search bar */}
                <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <div className="flex items-center border-b border-gray-300 py-2 transition-all duration-300 focus-within:border-green-500">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder={isMobile ? "Search for answers..." : "Search for answers... (Press '/' to focus)"}
                      className="w-full outline-none text-gray-700 bg-transparent"
                      value={searchQuery}
                      onChange={(e) => {
                        const newQuery = e.target.value;
                        setSearchQuery(newQuery);
                      }}
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Clear search"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </motion.div>

                {/* Categories - Mobile only */}
                <div className="md:hidden mb-8">
                  <h3 className="text-lg font-medium mb-4 text-gray-400">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {faqCategories.map((category, index) => (
                      <button
                        key={category.id}
                        ref={(el) => {
                          categoryRefs.current[index] = el
                        }}
                        onClick={() => {
                          setOpenCategory(category.id);
                        }}
                        className={`px-3 py-2 rounded-full text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 ${
                          openCategory === category.id
                            ? "bg-green-600 text-white font-medium"
                            : "bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600"
                        }`}
                      >
                        {category.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category title */}
                <motion.h2
                  className="text-2xl font-medium mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={currentCategory?.id}
                >
                  {currentCategory?.title}
                </motion.h2>

                {/* FAQ questions */}
                <motion.div
                  className="space-y-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLoaded ? 1 : 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <AnimatePresence>
                    {currentQuestions.map((item, questionIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: questionIndex * 0.05 }}
                        className="border-b border-dotted border-gray-200 py-4"
                      >
                        <button
                          ref={(el) => {
                            questionRefs.current[questionIndex] = el
                          }}
                          className={`w-full flex items-start justify-between text-left font-medium group focus:outline-none ${
                            focusedQuestionIndex === questionIndex
                              ? "ring-2 ring-green-300 ring-offset-2 rounded-sm"
                              : ""
                          }`}
                          onClick={() => toggleQuestion(item.id)}
                          onFocus={() => setFocusedQuestionIndex(questionIndex)}
                          aria-expanded={openQuestions[item.id] || false}
                        >
                          <div className="flex items-center">
                            <div className="mr-3 text-green-500 transition-transform duration-300 transform">
                              <Plus
                                className={`h-5 w-5 transition-transform duration-300 ${
                                  openQuestions[item.id] ? "rotate-45" : ""
                                }`}
                              />
                            </div>
                            <span className="text-lg group-hover:text-green-600 transition-colors duration-300">
                              {searchQuery ? highlightText(item.question) : item.question}
                            </span>
                          </div>
                        </button>

                        <AnimatePresence>
                          {openQuestions[item.id] && (
                            <motion.div
                              className="pl-8 pr-4 pt-3 text-gray-600"
                              initial={{ height: 0, opacity: 0, marginTop: 0 }}
                              animate={{ height: "auto", opacity: 1, marginTop: 8 }}
                              exit={{ height: 0, opacity: 0, marginTop: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-gray-600 leading-relaxed">
                                {searchQuery ? highlightText(item.answer) : item.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {currentQuestions.length === 0 && (
                    <motion.div
                      className="py-8 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-500">
                        No results found for &quot;{searchQuery}&quot;. Try a different search term.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              {/* Right column - categories (Desktop only) */}
              <div className="hidden md:block w-full md:w-64 flex-shrink-0">
                <div className="sticky top-32">
                  <h3 className="text-lg font-medium mb-4 text-gray-400">Categories</h3>
                  <ul className="space-y-3">
                    {faqCategories.map((category, index) => (
                      <li key={category.id}>
                        <button
                          ref={(el) => {
                            categoryRefs.current[index] = el
                          }}
                          onClick={() => {
                            setOpenCategory(category.id);
                          }}
                          className={`text-left w-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 rounded-sm ${
                            openCategory === category.id
                              ? "text-green-600 font-medium"
                              : "text-gray-700 hover:text-green-600"
                          }`}
                        >
                          <span className="text-gray-400 mr-2 text-sm">{index + 1}.</span>
                          {category.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact support - Now outside the main flex container to be at bottom */}
            <motion.div
              className="mt-16 border-t border-gray-200 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-xl font-medium mb-2">Still need help?</h2>
              <p className="text-gray-600 mb-4">Our support team is here to help you with any questions.</p>
              <motion.a
                href="mailto:support@handypay.com"
                className="inline-flex items-center gap-2 text-green-600 font-medium hover:text-green-800 transition-colors"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-4 w-4" />
                <span>Contact Support</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Keyboard shortcuts modal */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Keyboard className="h-5 w-5" />
                  Keyboard Shortcuts
                </h2>
                <button
                  onClick={() => setShowKeyboardShortcuts(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Close keyboard shortcuts"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Navigation</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Navigate questions</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">↑ / ↓</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Open/close question</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Enter / Space</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Switch category</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">
                        1-{faqCategories.length}
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Search</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Focus search</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">/</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Clear search</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Esc</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Other</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-gray-600">Show this dialog</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">?</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Close all questions</span>
                      <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-sm">Esc</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setShowKeyboardShortcuts(false)}
                  className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
