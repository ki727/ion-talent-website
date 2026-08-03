"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building2, Clock, DollarSign, Users, Briefcase } from "lucide-react"

interface JobCardProps {
  job: {
    id: string
    title: string
    company: string
    location: string
    type: string
    salary: string
    experience: string
    department: string
    postedDate: string
    description: string
    requirements: string[]
    benefits: string[]
    urgent?: boolean
    featured?: boolean
  }
  onApply: (jobId: string) => void
}

export function JobCard({ job, onApply }: JobCardProps) {
  return (
    <Card
      className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white group hover:-translate-y-1 ${
        job.featured ? "ring-2 ring-[#2DD4BF] ring-opacity-50" : ""
      }`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {job.featured && (
                <Badge className="bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] text-white text-xs">FEATURED</Badge>
              )}
              {job.urgent && (
                <Badge variant="destructive" className="text-xs">
                  URGENT
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl font-bold text-[#1a1a1a] mb-2 group-hover:text-[#2DD4BF] transition-colors">
              {job.title}
            </CardTitle>
            <div className="flex items-center text-[#6a6a6a] mb-3">
              <Building2 className="h-4 w-4 mr-2" />
              <span className="font-medium">{job.company}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-[#6a6a6a]">
            <MapPin className="h-4 w-4 mr-2 text-[#2DD4BF]" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-[#6a6a6a]">
            <Briefcase className="h-4 w-4 mr-2 text-[#2DD4BF]" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center text-[#6a6a6a]">
            <DollarSign className="h-4 w-4 mr-2 text-[#2DD4BF]" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-[#6a6a6a]">
            <Users className="h-4 w-4 mr-2 text-[#2DD4BF]" />
            <span>{job.experience}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-[#4a4a4a] leading-relaxed line-clamp-3">{job.description}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm text-[#6a6a6a]">
              <Clock className="h-4 w-4 mr-1" />
              <span>Posted {job.postedDate}</span>
            </div>
            <Button
              onClick={() => onApply(job.id)}
              className="bg-gradient-to-r from-[#2DD4BF] to-[#14B8A6] hover:from-[#14B8A6] hover:to-[#0d9488] text-white font-semibold px-6 py-2 rounded-full"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
