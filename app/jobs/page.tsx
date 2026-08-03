"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JobCard } from "@/components/job-card"
import { JobApplicationModal } from "@/components/job-application-modal"
import { Search, MapPin, Briefcase, Filter, Star } from "lucide-react"
import Link from "next/link"

const jobs = [
  {
    id: "1",
    title: "Chief Technology Officer",
    company: "Leading FinTech Company",
    location: "Dubai, UAE",
    type: "Full-time",
    salary: "$180,000 - $250,000",
    experience: "15+ years",
    department: "Technology",
    postedDate: "2 days ago",
    description:
      "Lead our technology vision and strategy as we scale from Series B to IPO. Drive innovation across our fintech platform serving 2M+ users across MENA region. Build and mentor world-class engineering teams.",
    requirements: [
      "15+ years in technology leadership roles",
      "Experience scaling fintech/financial services platforms",
      "Strong background in cloud architecture (AWS/Azure)",
      "Experience with regulatory compliance (PCI DSS, SOX)",
      "Proven track record building teams of 50+ engineers",
    ],
    benefits: [
      "Equity package with high growth potential",
      "Relocation assistance to Dubai",
      "Health insurance for family",
      "Annual learning budget of $10,000",
    ],
    featured: true,
    urgent: true,
  },
  {
    id: "2",
    title: "Enterprise Architect",
    company: "Global Energy Corporation",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    experience: "10-15 years",
    department: "Technology",
    postedDate: "1 week ago",
    description:
      "Shape the digital transformation of a leading energy company. Design enterprise-wide architecture solutions supporting Vision 2030 initiatives. Lead architectural governance across 200+ applications.",
    requirements: [
      "10+ years enterprise architecture experience",
      "TOGAF or Zachman framework certification",
      "Experience with large-scale digital transformations",
      "Knowledge of oil & gas industry preferred",
      "Strong stakeholder management skills",
    ],
    benefits: ["Tax-free salary in Saudi Arabia", "Housing allowance", "Annual flights home", "Private healthcare"],
    featured: true,
  },
  {
    id: "3",
    title: "HR Director - EMEA",
    company: "Global Consulting Firm",
    location: "London, UK",
    type: "Full-time",
    salary: "£120,000 - £160,000",
    experience: "12+ years",
    department: "Human Resources",
    postedDate: "3 days ago",
    description:
      "Lead HR strategy across our EMEA operations covering 25+ offices. Drive talent acquisition, development, and retention for 3,000+ consultants. Partner with senior leadership on organizational transformation.",
    requirements: [
      "12+ years progressive HR leadership experience",
      "Experience in professional services/consulting",
      "Strong background in talent management",
      "CIPD qualification preferred",
      "Multilingual capabilities (English, French, German)",
    ],
    benefits: [
      "Competitive base salary + bonus",
      "Comprehensive benefits package",
      "Professional development opportunities",
      "Flexible working arrangements",
    ],
    urgent: true,
  },
  {
    id: "4",
    title: "Chief Financial Officer",
    company: "Leading Mobility Platform",
    location: "Dubai, UAE",
    type: "Full-time",
    salary: "$200,000 - $280,000",
    experience: "15+ years",
    department: "Finance",
    postedDate: "5 days ago",
    description:
      "Lead financial strategy for the Middle East's leading ride-hailing platform. Oversee financial planning, investor relations, and M&A activities. Drive profitability across 14 countries in MENA region.",
    requirements: [
      "15+ years senior finance experience",
      "Big 4 accounting background preferred",
      "Experience with high-growth tech companies",
      "Strong investor relations experience",
      "CPA/CFA qualification required",
    ],
    benefits: [
      "Significant equity upside",
      "Relocation package",
      "Health & wellness benefits",
      "Annual performance bonus",
    ],
    featured: true,
  },
  {
    id: "5",
    title: "VP of Engineering",
    company: "E-commerce Giant",
    location: "Riyadh, Saudi Arabia",
    type: "Full-time",
    salary: "$160,000 - $220,000",
    experience: "12+ years",
    department: "Technology",
    postedDate: "1 week ago",
    description:
      "Scale engineering excellence at a leading e-commerce platform. Lead 150+ engineers across mobile, web, and backend teams. Drive technical strategy for our platform serving 20M+ customers.",
    requirements: [
      "12+ years engineering leadership experience",
      "Experience scaling e-commerce platforms",
      "Strong background in distributed systems",
      "Experience managing large engineering teams",
      "Arabic language skills preferred",
    ],
    benefits: ["Tax-free salary", "Stock options", "Relocation assistance", "Professional development budget"],
  },
  {
    id: "6",
    title: "Finance Manager - Investment Banking",
    company: "Premier Investment Bank",
    location: "London, UK",
    type: "Full-time",
    salary: "£90,000 - £120,000",
    experience: "8-12 years",
    department: "Finance",
    postedDate: "4 days ago",
    description:
      "Join our EMEA Investment Banking division managing financial reporting and analysis. Support deal execution across M&A, IPOs, and debt financing. Work with senior leadership on strategic initiatives.",
    requirements: [
      "8+ years investment banking experience",
      "Strong financial modeling skills",
      "Experience with deal execution",
      "CFA or MBA preferred",
      "Excellent client management skills",
    ],
    benefits: [
      "Competitive salary + bonus",
      "Health & dental insurance",
      "Pension contributions",
      "Career development programs",
    ],
  },
  {
    id: "7",
    title: "Head of Digital Transformation",
    company: "International Banking Group",
    location: "Dubai, UAE",
    type: "Full-time",
    salary: "$150,000 - $200,000",
    experience: "10+ years",
    department: "Technology",
    postedDate: "6 days ago",
    description:
      "Lead bank-wide digital transformation initiatives across Asia, Africa, and Middle East. Drive adoption of emerging technologies including AI, blockchain, and cloud computing. Manage $50M+ transformation budget.",
    requirements: [
      "10+ years digital transformation experience",
      "Banking/financial services background",
      "Experience with emerging technologies",
      "Strong program management skills",
      "MBA from top-tier university",
    ],
    benefits: [
      "Expatriate package",
      "Annual bonus opportunity",
      "Health insurance for family",
      "Education allowance for children",
    ],
  },
  {
    id: "8",
    title: "Senior Product Manager - AI",
    company: "Technology Giant",
    location: "New York, USA",
    type: "Full-time",
    salary: "$140,000 - $180,000",
    experience: "8+ years",
    department: "Product",
    postedDate: "3 days ago",
    description:
      "Drive AI product strategy for enterprise solutions. Lead cross-functional teams to deliver cutting-edge AI capabilities. Work directly with leadership team on strategic AI initiatives.",
    requirements: [
      "8+ years product management experience",
      "Strong background in AI/ML technologies",
      "Experience with enterprise software",
      "Technical degree (CS/Engineering)",
      "Excellent communication skills",
    ],
    benefits: [
      "Competitive salary + equity",
      "Comprehensive health benefits",
      "401k matching",
      "Professional development opportunities",
    ],
    urgent: true,
  },
  {
    id: "9",
    title: "Regional Sales Director",
    company: "Leading CRM Platform",
    location: "Dubai, UAE",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    experience: "10+ years",
    department: "Sales",
    postedDate: "1 week ago",
    description:
      "Lead sales strategy across MENA region for world's #1 CRM platform. Manage enterprise accounts worth $100M+ ARR. Build and scale high-performing sales teams across multiple countries.",
    requirements: [
      "10+ years enterprise sales experience",
      "Experience selling SaaS/cloud solutions",
      "Track record of exceeding quotas",
      "Strong leadership and team building skills",
      "Arabic language skills preferred",
    ],
    benefits: [
      "Uncapped commission structure",
      "Equity participation",
      "Relocation assistance",
      "Sales incentive trips",
    ],
  },
  {
    id: "10",
    title: "Chief Marketing Officer",
    company: "Food Delivery Platform",
    location: "London, UK",
    type: "Full-time",
    salary: "£130,000 - £180,000",
    experience: "12+ years",
    department: "Marketing",
    postedDate: "2 weeks ago",
    description:
      "Shape global marketing strategy for Europe's leading food delivery platform. Drive brand awareness, customer acquisition, and retention across 12 countries. Lead marketing team of 80+ professionals.",
    requirements: [
      "12+ years marketing leadership experience",
      "Experience in consumer tech/marketplace",
      "Strong digital marketing background",
      "Data-driven approach to marketing",
      "Experience scaling international brands",
    ],
    benefits: [
      "Competitive salary + equity",
      "Flexible working arrangements",
      "Health & wellness benefits",
      "Learning & development budget",
    ],
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [selectedJob, setSelectedJob] = useState<{ id: string; title: string; company: string } | null>(null)

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase())
      const matchesDepartment = !departmentFilter || job.department === departmentFilter

      return matchesSearch && matchesLocation && matchesDepartment
    })
  }, [searchTerm, locationFilter, departmentFilter])

  const handleApply = (jobId: string) => {
    const job = jobs.find((j) => j.id === jobId)
    if (job) {
      setSelectedJob({
        id: job.id,
        title: job.title,
        company: job.company,
      })
    }
  }

  const uniqueLocations = [...new Set(jobs.map((job) => job.location.split(",")[0]))]
  const uniqueDepartments = [...new Set(jobs.map((job) => job.department))]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2DD4BF] to-[#14B8A6] rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">i</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-[#2DD4BF] tracking-tight">iON</span>
                <span className="text-2xl font-medium text-[#1a1a1a] ml-1">Talent</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-[#4a4a4a] hover:text-[#2DD4BF] transition-colors font-medium text-sm">
                Home
              </Link>
              <Link href="/jobs" className="text-[#2DD4BF] font-medium text-sm">
                Jobs
              </Link>
              <Link
                href="/#about"
                className="text-[#4a4a4a] hover:text-[#2DD4BF] transition-colors font-medium text-sm"
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-[#4a4a4a] hover:text-[#2DD4BF] transition-colors font-medium text-sm"
              >
                Contact
              </Link>
            </nav>

            <Button className="bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#0d9488] text-white font-semibold px-6 py-2 rounded-full text-sm">
              For Employers
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #2DD4BF 0%, transparent 50%), radial-gradient(circle at 75% 75%, #14B8A6 0%, transparent 50%)`,
            }}
          ></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <Star className="h-5 w-5 text-[#2DD4BF] mr-2" />
              <span className="text-white text-sm font-semibold">EXCLUSIVE OPPORTUNITIES</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Your next career-defining role awaits
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Discover exclusive executive and senior-level positions with the world's most innovative companies.
              Curated opportunities that match your ambition.
            </p>

            <div className="flex items-center justify-center space-x-8 pt-4 text-white/70">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">500+</div>
                <div className="text-sm">Premium Roles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24h</div>
                <div className="text-sm">Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 px-6 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6a6a6a]" />
                    <Input
                      placeholder="Search jobs, companies, or keywords..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 border-2 border-gray-200 focus:border-[#2DD4BF] rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6a6a6a]" />
                    <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full pl-12 pr-4 h-12 border-2 border-gray-200 focus:border-[#2DD4BF] rounded-xl bg-white appearance-none"
                    >
                      <option value="">All Locations</option>
                      {uniqueLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#6a6a6a]" />
                    <select
                      value={departmentFilter}
                      onChange={(e) => setDepartmentFilter(e.target.value)}
                      className="w-full pl-12 pr-4 h-12 border-2 border-gray-200 focus:border-[#2DD4BF] rounded-xl bg-white appearance-none"
                    >
                      <option value="">All Departments</option>
                      {uniqueDepartments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-[#6a6a6a]">
                  <span>{filteredJobs.length} positions found</span>
                  <span>•</span>
                  <span>{jobs.filter((j) => j.featured).length} featured roles</span>
                  <span>•</span>
                  <span>{jobs.filter((j) => j.urgent).length} urgent openings</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-[#6a6a6a]" />
                  <span className="text-sm text-[#6a6a6a]">Sort by: Relevance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {filteredJobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">No positions found</h3>
                <p className="text-[#6a6a6a] mb-8">
                  Try adjusting your search criteria or browse all available positions.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setLocationFilter("")
                    setDepartmentFilter("")
                  }}
                  className="bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] text-white"
                >
                  View All Jobs
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={handleApply} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6]">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">Don't see the perfect role?</h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Our executive search team works with exclusive opportunities that aren't publicly advertised. Let us know
              what you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                size="lg"
                className="bg-white text-[#2DD4BF] hover:bg-gray-100 font-semibold px-8 py-4 rounded-full flex-1"
              >
                Submit Your Profile
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-full flex-1 bg-transparent"
              >
                Speak to a Consultant
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <JobApplicationModal
          isOpen={!!selectedJob}
          onClose={() => setSelectedJob(null)}
          jobTitle={selectedJob.title}
          company={selectedJob.company}
        />
      )}
    </div>
  )
}
