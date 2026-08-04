"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Cpu, Building2, Zap, Briefcase, Heart, ShoppingCart, ArrowRight, Globe } from "lucide-react"

const industries = [
  {
    id: "technology",
    name: "Technology & Software",
    icon: Cpu,
    color: "#2DD4BF",
    description:
      "From AI startups to enterprise software giants, we place the technical leaders driving digital innovation.",
    specialties: [
      "CTOs & VPs Engineering",
      "AI/ML Leaders",
      "Product Chiefs",
      "DevOps Directors",
      "Data Science Heads",
    ],
    recentPlacements: [
      "CTO at AI Unicorn (Series B)",
      "VP Engineering at Cloud Platform",
      "Chief Product Officer at SaaS Scale-up",
    ],
    marketInsights: {
      avgSalary: "$180k - $400k",
      timeToHire: "12 days",
      demandGrowth: "+45%",
    },
    keyClients: ["Cloud Providers", "AI Startups", "Enterprise Software", "FinTech Platforms"],
  },
  {
    id: "corporate-finance",
    name: "Corporate Finance",
    icon: Building2,
    color: "#3498db",
    description: "CFOs, Finance Directors, and senior finance professionals who drive strategic financial decisions.",
    specialties: [
      "CFOs & Finance Directors",
      "FP&A Leaders",
      "Treasury Heads",
      "Corporate Development",
      "Risk Management",
    ],
    recentPlacements: [
      "CFO at PE-backed Scale-up",
      "Finance Director at Public Company",
      "Head of FP&A at Tech Unicorn",
    ],
    marketInsights: {
      avgSalary: "$200k - $500k",
      timeToHire: "18 days",
      demandGrowth: "+32%",
    },
    keyClients: ["Private Equity", "Public Companies", "Scale-ups", "Investment Firms"],
  },
  {
    id: "engineering",
    name: "Engineering & Manufacturing",
    icon: Zap,
    color: "#e74c3c",
    description:
      "Engineering leaders in manufacturing, infrastructure, and industrial sectors driving operational excellence.",
    specialties: ["Engineering Directors", "Plant Managers", "Operations VPs", "Quality Leaders", "R&D Heads"],
    recentPlacements: [
      "VP Engineering at Manufacturing Giant",
      "Plant Director at Automotive OEM",
      "Head of R&D at Industrial Tech",
    ],
    marketInsights: {
      avgSalary: "$160k - $350k",
      timeToHire: "21 days",
      demandGrowth: "+28%",
    },
    keyClients: ["Manufacturing", "Automotive", "Aerospace", "Industrial Equipment"],
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    icon: Briefcase,
    color: "#9b59b6",
    description: "Construction executives and project leaders delivering mega-projects and infrastructure development.",
    specialties: ["Project Directors", "Construction VPs", "Site Managers", "Commercial Directors", "Safety Leaders"],
    recentPlacements: [
      "Project Director at $2B Mega Project",
      "Construction VP at Infrastructure Fund",
      "Commercial Director at Contractor",
    ],
    marketInsights: {
      avgSalary: "$150k - $400k",
      timeToHire: "25 days",
      demandGrowth: "+35%",
    },
    keyClients: ["General Contractors", "Infrastructure Funds", "Real Estate Developers", "Government Projects"],
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Risk",
    icon: Heart,
    color: "#27ae60",
    description:
      "Cybersecurity leaders protecting organizations from evolving digital threats and compliance challenges.",
    specialties: ["CISOs & Security VPs", "Risk Directors", "Compliance Heads", "SOC Managers", "Security Architects"],
    recentPlacements: [
      "CISO at Financial Services Firm",
      "VP Security at Tech Company",
      "Risk Director at Healthcare System",
    ],
    marketInsights: {
      avgSalary: "$200k - $450k",
      timeToHire: "16 days",
      demandGrowth: "+55%",
    },
    keyClients: ["Financial Services", "Healthcare", "Government", "Critical Infrastructure"],
  },
  {
    id: "consulting",
    name: "Management Consulting",
    icon: ShoppingCart,
    color: "#f39c12",
    description: "Strategy and operations consultants from Big 4 to boutique firms driving transformation initiatives.",
    specialties: [
      "Managing Directors",
      "Practice Leaders",
      "Strategy VPs",
      "Transformation Directors",
      "Advisory Partners",
    ],
    recentPlacements: [
      "Managing Director at Big 4 Firm",
      "Practice Leader at Strategy Boutique",
      "VP Strategy at Consulting Firm",
    ],
    marketInsights: {
      avgSalary: "$180k - $400k",
      timeToHire: "20 days",
      demandGrowth: "+25%",
    },
    keyClients: ["Big 4 Firms", "Strategy Boutiques", "Transformation Specialists", "Industry Consultancies"],
  },
]

export function IndustryExpertise() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2DD4BF]/10 to-[#14B8A6]/10 rounded-full mb-8">
            <Globe className="h-5 w-5 text-[#2DD4BF] mr-2" />
            <span className="text-[#2DD4BF] text-sm font-bold tracking-wide">INDUSTRY EXPERTISE</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-8 leading-tight">
            Deep sector knowledge drives better outcomes
          </h2>
          <p className="text-xl text-[#6a6a6a] max-w-4xl mx-auto leading-relaxed">
            Specialized expertise across six core verticals with deep understanding of market dynamics and talent
            landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {industries.map((industry) => {
            const IconComponent = industry.icon
            return (
              <Card
                key={industry.id}
                className="border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white group hover:-translate-y-2 overflow-hidden"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: `${industry.color}15` }}
                    >
                      <IconComponent className="h-8 w-8" style={{ color: industry.color }} />
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold text-[#1a1a1a] mb-3">{industry.name}</CardTitle>
                  <p className="text-[#6a6a6a] leading-relaxed">{industry.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Key Specialties */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a1a] mb-3">KEY SPECIALTIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-50 text-[#6a6a6a] border-gray-200"
                        >
                          {specialty}
                        </span>
                      ))}
                      {industry.specialties.length > 3 && (
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-50 text-[#6a6a6a] border-gray-200">
                          +{industry.specialties.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Market Insights */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-[#1a1a1a] mb-3">MARKET INSIGHTS</h4>
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <div className="text-sm font-bold" style={{ color: industry.color }}>
                          {industry.marketInsights.avgSalary}
                        </div>
                        <div className="text-xs text-[#6a6a6a]">Avg. Salary</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: industry.color }}>
                          {industry.marketInsights.timeToHire}
                        </div>
                        <div className="text-xs text-[#6a6a6a]">Time to Hire</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold" style={{ color: industry.color }}>
                          {industry.marketInsights.demandGrowth}
                        </div>
                        <div className="text-xs text-[#6a6a6a]">YoY Growth</div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Placements */}
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1a1a] mb-3">RECENT PLACEMENTS</h4>
                    <div className="space-y-2">
                      {industry.recentPlacements.slice(0, 2).map((placement, index) => (
                        <div key={index} className="flex items-center text-sm text-[#6a6a6a]">
                          <div
                            className="w-1.5 h-1.5 rounded-full mr-3 flex-shrink-0"
                            style={{ backgroundColor: industry.color }}
                          ></div>
                          {placement}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simple CTA */}
                  <div className="pt-4 border-t border-gray-100">
                    <Button
                      size="sm"
                      className="w-full text-white font-semibold"
                      style={{ backgroundColor: industry.color }}
                      onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Discuss Your Needs
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Don't see your industry?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We work across multiple sectors including manufacturing, real estate, logistics, and emerging industries.
              Our adaptable approach ensures success in any vertical.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#0d9488] text-white font-bold px-8 py-4 rounded-full flex-1"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                Discuss Your Sector
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 font-bold px-8 py-4 rounded-full flex-1 bg-white/5 backdrop-blur-sm"
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              >
                View All Industries
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
