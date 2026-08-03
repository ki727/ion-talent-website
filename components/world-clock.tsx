"use client"

import { useState, useEffect } from "react"

interface WorldClockProps {
  timezone: string
  city: string
  color: string
}

export function WorldClock({ timezone, city, color }: WorldClockProps) {
  const [time, setTime] = useState<Date>(new Date())

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeInZone = new Date(now.toLocaleString("en-US", { timeZone: timezone }))
      setTime(timeInZone)
    }

    // Update immediately
    updateTime()

    // Update every second
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [timezone])

  const hours = time.getHours() % 12
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()

  const hourAngle = hours * 30 + minutes * 0.5
  const minuteAngle = minutes * 6
  const secondAngle = seconds * 6

  return (
    <div className="text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="mb-4">
        {/* Analog Clock */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 bg-white shadow-inner" style={{ borderColor: color }}>
            {/* Hour markers */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-0.5 h-3 bg-gray-400"
                style={{
                  top: "4px",
                  left: "50%",
                  transformOrigin: "50% 36px",
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                }}
              />
            ))}

            {/* Hour hand */}
            <div
              className="absolute w-1 bg-gray-800 rounded-full origin-bottom"
              style={{
                height: "24px",
                bottom: "50%",
                left: "50%",
                transformOrigin: "50% 100%",
                transform: `translateX(-50%) rotate(${hourAngle}deg)`,
              }}
            />

            {/* Minute hand */}
            <div
              className="absolute w-0.5 bg-gray-600 rounded-full origin-bottom"
              style={{
                height: "32px",
                bottom: "50%",
                left: "50%",
                transformOrigin: "50% 100%",
                transform: `translateX(-50%) rotate(${minuteAngle}deg)`,
              }}
            />

            {/* Second hand */}
            <div
              className="absolute w-px rounded-full origin-bottom"
              style={{
                height: "34px",
                bottom: "50%",
                left: "50%",
                backgroundColor: color,
                transformOrigin: "50% 100%",
                transform: `translateX(-50%) rotate(${secondAngle}deg)`,
              }}
            />

            {/* Center dot */}
            <div
              className="absolute w-2 h-2 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>

        <div
          className="w-16 h-1 bg-gradient-to-r rounded-full mx-auto"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
        ></div>
      </div>
      <h3 className="text-lg font-semibold text-[#1a1a1a] mb-2">{city}</h3>
      <p className="text-sm text-[#6a6a6a]">
        {timezone === "Asia/Dubai" && "Middle East Hub"}
        {timezone === "Asia/Riyadh" && "Saudi Arabia"}
        {timezone === "Europe/London" && "Europe"}
        {timezone === "America/New_York" && "Americas"}
      </p>
    </div>
  )
}
