"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle } from "lucide-react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate subscription
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail("")
    }, 3000)
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-[#2ecc71] to-[#27ae60]">
      <div className="container mx-auto">
        <Card className="max-w-2xl mx-auto border-0 shadow-2xl bg-white">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-[#2ecc71]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-[#2ecc71]" />
            </div>
            <CardTitle className="text-3xl font-bold text-[#2c3e50] mb-2">Executive Intelligence Weekly</CardTitle>
            <CardDescription className="text-lg text-[#6c757d]">
              Get exclusive insights on executive search trends, compensation data, and leadership intelligence
              delivered to your inbox.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your executive email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 border-[#dee2e6] focus:border-[#2ecc71] focus:ring-[#2ecc71] h-12"
                  />
                  <Button type="submit" className="bg-[#2ecc71] hover:bg-[#27ae60] text-white font-semibold px-8 h-12">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-[#6c757d] text-center">
                  Join 5,000+ senior executives. Unsubscribe anytime. Privacy guaranteed.
                </p>
              </form>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-[#2ecc71] mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#2c3e50] mb-2">Welcome to the Network!</h3>
                <p className="text-[#6c757d]">
                  You'll receive your first executive intelligence report within 24 hours.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
