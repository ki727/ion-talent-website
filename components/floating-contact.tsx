"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Phone, Mail } from "lucide-react"

export function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isExpanded ? (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 max-w-sm animate-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-[#1a1a1a] mb-1">Need immediate assistance?</h4>
              <p className="text-sm text-[#6a6a6a]">Let's discuss your hiring needs</p>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white font-semibold justify-start"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Start a conversation
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start border-[#2DD4BF] text-[#2DD4BF] hover:bg-[#2DD4BF] hover:text-white bg-transparent"
                onClick={() => window.open("tel:+97141234567")}
              >
                <Phone className="h-4 w-4 mr-2" />
                Call now
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => window.open("mailto:hello@iontalent.com")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Send email
              </Button>
            </div>

            <p className="text-xs text-[#6a6a6a] text-center">Available across all time zones</p>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsExpanded(true)}
          className="w-14 h-14 rounded-full bg-[#2DD4BF] hover:bg-[#14B8A6] text-white shadow-2xl hover:shadow-3xl transition-all duration-300"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
