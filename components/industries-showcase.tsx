"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Cpu,
  Building2,
  Zap,
  Briefcase,
  Shield,
  TrendingUp,
  ArrowRight,
  Globe,
  Users,
  Target,
  Award,
} from "lucide-react"

const allIndustries = [
  {
    id: "technology",
    name: "Technology & Software",
    icon: Cpu,
    color: "#2DD4BF",
    shortDesc: "AI, Cloud, SaaS, and Enterprise Software",
    fullDesc:
      "From AI startups to enterprise software giants, we place the technical leaders driving digital innovation across cloud platforms, artificial intelligence, and software development.",
    roles: ["CTO", "VP Engineering", "Chief Product Officer", "Head of AI/ML", "DevOps Director"],
    companies: ["Tech Unicorns", "Cloud Providers", "AI Startups", "Enterprise Software"],
    salaryRange: "$180k - $400k",
    avgTime: "12 days",
    growth: "+45%",
    featured: true,
  },
  {
    id: "corporate-finance",
    name: "Corporate Finance",
    icon: Building2,
    color: "#3498db",
    shortDesc: "CFOs, Finance Directors, FP&A Leaders",
    fullDesc:
      "Senior finance professionals who drive strategic financial decisions, from PE-backed scale-ups to public companies requiring sophisticated financial leadership.",
    roles: ["CFO", "Finance Director", "Head of FP&A", "Treasury Director", "Corporate Development VP"],
    companies: ["Private Equity", "Public Companies", "Scale-ups", "Investment Firms"],
    salaryRange: "$200k - $500k",
    avgTime: "18 days",
    growth: "+32%",
    featured: true,
  },
  {
    id: "engineering",
    name: "Engineering & Manufacturing",
    icon: Zap,
    color: "#e74c3c",
    shortDesc: "Manufacturing, Industrial, R&D Leadership",
    fullDesc:
      "Engineering leaders in manufacturing, infrastructure, and industrial sectors driving operational excellence and innovation in traditional industries.",
    roles: ["VP Engineering", "Plant Director", "Operations VP", "R&D Head", "Quality Director"],
    companies: ["Manufacturing", "Automotive", "Aerospace", "Industrial Equipment"],
    salaryRange: "$160k - $350k",
    avgTime: "21 days",
    growth: "+28%",
    featured: true,
  },
  {
    id: "construction",
    name: "Construction & Infrastructure",
    icon: Briefcase,
    color: "#9b59b6",
    shortDesc: "Mega-projects, Infrastructure, Real Estate",
    fullDesc:
      "Construction executives and project leaders delivering billion-dollar mega-projects and infrastructure development across the globe.",
    roles: ["Project Director", "Construction VP", "Commercial Director", "Site Manager", "Safety Director"],
    companies: ["General Contractors", "Infrastructure Funds", "Developers", "Government Projects"],
    salaryRange: "$150k - $400k",
    avgTime: "25 days",
    growth: "+35%",
    featured: true,
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity & Risk",
    icon: Shield,
    color: "#27ae60",
    shortDesc: "CISOs, Security VPs, Risk Management",
    fullDesc:
      "Cybersecurity leaders protecting organizations from evolving digital threats, ensuring compliance and building resilient security frameworks.",
    roles: ["CISO", "VP Security", "Risk Director", "Compliance Head", "Security Architect"],
    companies: ["Financial Services", "Healthcare", "Government", "Critical Infrastructure"],
    salaryRange: "$200k - $450k",
    avgTime: "16 days",
    growth: "+55%",
    featured: true,
  },
  {
    id: "consulting",
    name: "Management Consulting",
    icon: TrendingUp,
    color: "#f39c12",
    shortDesc: "Strategy, Operations, Transformation",
    fullDesc:
      "Strategy and operations consultants from Big 4 to boutique firms driving transformation initiatives and strategic advisory services.",
    roles: ["Managing Director", "Practice Leader", "Strategy VP", "Transformation Director", "Advisory Partner"],
    companies: ["Big 4 Firms", "Strategy Boutiques", "Transformation Specialists", "Industry Consultancies"],
    salaryRange: "$180k - $400k",
    avgTime: "20 days",
    growth: "+25%",
    featured: false,
  },
  // Additional industries
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    icon: Users,
    color: "#e67e22",
    shortDesc: "Digital Health, Pharma, MedTech",
    fullDesc:
      "Healthcare innovation leaders driving digital transformation in medical technology, pharmaceuticals, and healthcare delivery systems.",
    roles: ["Chief Medical Officer", "VP R&D", "Digital Health VP", "Regulatory Director", "Clinical Operations Head"],
    companies: ["HealthTech", "Pharmaceutical", "Medical Devices", "Digital Health"],
    salaryRange: "$170k - $380k",
    avgTime: "19 days",
    growth: "+38%",
    featured: false,
  },
  {
    id: "energy",
    name: "Energy & Sustainability",
    icon: Target,
    color: "#8e44ad",
    shortDesc: "Renewable Energy, Oil & Gas, ESG",
    fullDesc:
      "Energy sector leaders driving the global transition to sustainable energy while managing traditional energy operations.",
    roles: ["Energy CEO", "Sustainability Chief", "Project Director", "Operations VP", "ESG Leader"],
    companies: ["Energy Majors", "Renewable Developers", "Infrastructure Funds", "Utilities"],
    salaryRange: "$160k - $400k",
    avgTime: "21 days",
    growth: "+28%",
    featured: false,
  },
  {
    id: "retail",
    name: "Retail & E-commerce",
    icon: Award,
    color: "#34495e",
    shortDesc: "Digital Commerce, Omnichannel, Supply Chain",
    fullDesc: "Retail and e-commerce leaders driving customer-centric transformation and omnichannel experiences.",
    roles: [
      "Chief Digital Officer",
      "E-commerce VP",
      "Supply Chain VP",
      "Customer Experience VP",
      "Retail Operations VP",
    ],
    companies: ["E-commerce Platforms", "Retail Chains", "Fashion Brands", "Marketplaces"],
    salaryRange: "$140k - $280k",
    avgTime: "14 days",
    growth: "+35%",
    featured: false,
  },
]

export function IndustriesShowcase() {
  const [selectedIndustry, setSelectedIndustry] = useState(allIndustries[0])
  const [showAll, setShowAll] = useState(false)

  const displayIndustries = showAll ? allIndustries : allIndustries.filter((ind) => ind.featured)

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2DD4BF]/10 to-[#14B8A6]/10 rounded-full mb-8">
            <Globe className="h-5 w-5 text-[#2DD4BF] mr-2" />
            <span className="text-[#2DD4BF] text-sm font-bold tracking-wide">INDUSTRY EXPERTISE</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-8 leading-tight">
            Specialized expertise across key sectors
          </h2>
          <p className="text-xl text-[#6a6a6a] max-w-4xl mx-auto leading-relaxed">
            Deep industry knowledge and executive networks in the sectors that matter most to your business growth.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {displayIndustries.map((industry) => {
            const IconComponent = industry.icon
            return (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedIndustry.id === industry.id
                    ? "text-white shadow-lg transform scale-105"
                    : "bg-gray-100 text-[#6a6a6a] hover:bg-gray-200"
                }`}
                style={{
                  backgroundColor: selectedIndustry.id === industry.id ? industry.color : undefined,
                }}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {industry.name}
              </button>
            )
          })}

          {!showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="flex items-center px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] text-white hover:from-[#14B8A6] hover:to-[#0d9488] transition-all duration-300"
            >
              <Globe className="h-4 w-4 mr-2" />
              View All Industries
            </button>
          )}
        </div>

        {/* Selected Industry Detail */}
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white overflow-hidden">
            <div className="h-2 w-full" style={{ backgroundColor: selectedIndustry.color }}></div>

            <CardHeader className="pb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedIndustry.color}15` }}
                  >
                    <selectedIndustry.icon className="h-10 w-10" style={{ color: selectedIndustry.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold text-[#1a1a1a] mb-2">{selectedIndustry.name}</CardTitle>
                    <p className="text-lg text-[#6a6a6a] font-medium">{selectedIndustry.shortDesc}</p>
                  </div>
                </div>

                <Button
                  className="text-white font-semibold px-8 py-3 rounded-full"
                  style={{ backgroundColor: selectedIndustry.color }}
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Discuss Your Needs
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <div className="lg:col-span-2 space-y-6">
                  <p className="text-lg text-[#4a4a4a] leading-relaxed">{selectedIndustry.fullDesc}</p>

                  {/* Key Roles */}
                  <div>
                    <h4 className="text-lg font-bold text-[#1a1a1a] mb-4">Key Leadership Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedIndustry.roles.map((role, index) => (
                        <Badge
                          key={index}
                          className="text-sm px-4 py-2 font-medium"
                          style={{
                            backgroundColor: `${selectedIndustry.color}15`,
                            color: selectedIndustry.color,
                            border: `1px solid ${selectedIndustry.color}30`,
                          }}
                        >
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Client Types */}
                  <div>
                    <h4 className="text-lg font-bold text-[#1a1a1a] mb-4">Client Types</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedIndustry.companies.map((company, index) => (
                        <div key={index} className="flex items-center text-[#6a6a6a]">
                          <div
                            className="w-2 h-2 rounded-full mr-3"
                            style={{ backgroundColor: selectedIndustry.color }}
                          ></div>
                          {company}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Market Stats */}
                <div className="space-y-6">
                  <div className="rounded-2xl p-6 text-white" style={{ backgroundColor: selectedIndustry.color }}>
                    <h4 className="text-lg font-bold mb-4">Market Intelligence</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="text-2xl font-bold">{selectedIndustry.salaryRange}</div>
                        <div className="text-white/80 text-sm">Typical Salary Range</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{selectedIndustry.avgTime}</div>
                        <div className="text-white/80 text-sm">Average Time to Hire</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">{selectedIndustry.growth}</div>
                        <div className="text-white/80 text-sm">YoY Demand Growth</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h4 className="text-lg font-bold text-[#1a1a1a] mb-4">Why Choose Us</h4>
                    <div className="space-y-3 text-sm text-[#6a6a6a]">
                      <div className="flex items-start">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: selectedIndustry.color }}
                        ></div>
                        Deep industry networks and relationships
                      </div>
                      <div className="flex items-start">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: selectedIndustry.color }}
                        ></div>
                        Specialized knowledge of sector challenges
                      </div>
                      <div className="flex items-start">
                        <div
                          className="w-1.5 h-1.5 rounded-full mt-2 mr-3 flex-shrink-0"
                          style={{ backgroundColor: selectedIndustry.color }}
                        ></div>
                        Track record of successful placements
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to find your next leader?</h3>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your specific requirements and craft a tailored search strategy for your industry.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#0d9488] text-white font-bold px-10 py-4 rounded-full text-lg"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start Your Search
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
