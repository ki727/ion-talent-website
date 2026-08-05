"use client"

import { useEffect, useRef } from "react"
import { CheckCircle } from "lucide-react"

interface SuccessMessageProps {
  title?: string
  message?: string
}

export function SuccessMessage({
  title = "Message Sent Successfully!",
  message = "Thank you for your interest. Our team will get back to you within 24 hours.",
}: SuccessMessageProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ref.current?.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "center" })
  }, [])

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-ion-teal/30 bg-white p-8 text-center shadow-md"
      role="status"
      aria-live="polite"
    >
      <div className="w-16 h-16 bg-ion-teal/10 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="h-8 w-8 text-ion-teal" aria-hidden="true" />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{title}</h3>
        <p className="text-[#6a6a6a]">{message}</p>
      </div>
    </div>
  )
}
