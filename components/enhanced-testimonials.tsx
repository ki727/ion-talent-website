"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    name: "Sarah Hassan",
    role: "VP of Engineering",
    company: "TechFlow Solutions",
    location: "Dubai",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "ION Talent transformed our hiring process. They understood our technical requirements perfectly and delivered exceptional candidates who became key contributors to our growth.",
    color: "#2DD4BF",
  },
  {
    id: 2,
    name: "James Mitchell",
    role: "Managing Director",
    company: "Sterling Consulting",
    location: "London",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Outstanding executive search service. The caliber of candidates and the thoroughness of their process exceeded our expectations. They found us the perfect MD who has transformed our business.",
    color: "#3498db",
  },
  {
    id: 3,
    name: "Ahmed Al-Rashid",
    role: "Project Director",
    company: "Energy Dynamics",
    location: "Riyadh",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Their RPO solution scaled perfectly with our mega-project needs. Professional, efficient, and results-driven. They understand the unique challenges of the energy sector.",
    color: "#e74c3c",
  },
  {
    id: 4,
    name: "Maria Rodriguez",
    role: "Chief Technology Officer",
    company: "FinTech Innovations",
    location: "New York",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "ION Talent's global reach and local expertise made all the difference. They helped us build our international team with top-tier talent across multiple markets.",
    color: "#9b59b6",
  },
]

export function EnhancedTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="relative">
      <Card className="border-0 shadow-2xl bg-white overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, ${currentTestimonial.color} 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${currentTestimonial.color} 0%, transparent 50%)`,
                }}
              ></div>
            </div>

            <div className="relative p-12">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>

              <Quote className="h-12 w-12 mb-6" style={{ color: currentTestimonial.color }} />

              <blockquote className="text-xl text-[#2c3e50] leading-relaxed mb-8 font-medium">
                "{currentTestimonial.text}"
              </blockquote>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg"
                    style={{ backgroundColor: currentTestimonial.color }}
                  >
                    {currentTestimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a] text-lg">{currentTestimonial.name}</p>
                    <p className="text-[#6a6a6a]">{currentTestimonial.role}</p>
                    <p className="text-sm text-[#6a6a6a]">
                      {currentTestimonial.company} • {currentTestimonial.location}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full p-0 border-gray-300 hover:border-gray-400 bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full p-0 border-gray-300 hover:border-gray-400 bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index)
              setIsAutoPlaying(false)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8" : "hover:bg-gray-400"
            }`}
            style={{
              backgroundColor: index === currentIndex ? currentTestimonial.color : "#d1d5db",
            }}
          />
        ))}
      </div>
    </div>
  )
}
