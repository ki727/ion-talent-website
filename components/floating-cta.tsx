"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Phone, X } from "lucide-react"

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 5000) // Show after 5 seconds

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || isMinimized) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-lg shadow-2xl border border-[#e9ecef] p-6 max-w-sm">
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute top-2 right-2 text-[#6c757d] hover:text-[#2c3e50]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-[#2ecc71] rounded-full flex items-center justify-center mr-3">
            <Phone className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-[#2c3e50]">Need Executive Talent?</h4>
            <p className="text-sm text-[#6c757d]">Speak with a senior partner</p>
          </div>
        </div>

        <Button className="w-full bg-[#2ecc71] hover:bg-[#27ae60] text-white font-semibold">
          Schedule Free Consultation
        </Button>

        <p className="text-xs text-[#6c757d] text-center mt-2">15-minute strategy call • No commitment</p>
      </div>
    </div>
  )
}
