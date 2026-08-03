"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"

interface FadeInProps {
  children: React.ReactNode
  className?: string
  /** delay in ms applied when the element enters the viewport */
  delay?: number
  as?: React.ElementType
}

export function FadeIn({ children, className = "", delay = 0, as: Tag = "div" }: FadeInProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect reduced-motion: show immediately, no animation.
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReduced) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`fade-up ${visible ? "fade-up-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
