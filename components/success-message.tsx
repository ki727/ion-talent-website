"use client"

import { CheckCircle } from "lucide-react"

export function SuccessMessage() {
  return (
    <div className="flex items-center justify-center p-8 text-center">
      <div className="space-y-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Message Sent Successfully!</h3>
          <p className="text-[#6a6a6a]">Thank you for your interest. Our team will get back to you within 24 hours.</p>
        </div>
      </div>
    </div>
  )
}
