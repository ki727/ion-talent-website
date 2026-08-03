"use client"
import { Users } from "lucide-react"

export function TeamSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#2DD4BF]/10 to-[#14B8A6]/10 rounded-full mb-8">
            <Users className="h-5 w-5 text-[#2DD4BF] mr-2" />
            <span className="text-[#2DD4BF] text-sm font-bold tracking-wide">APPROACH</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-[#1a1a1a] mb-8 leading-tight">
            Quality-focused recruitment
          </h2>
          <p className="text-xl text-[#6a6a6a] max-w-3xl mx-auto leading-relaxed">
            Selective approach prioritizing cultural fit and long-term success over volume metrics.
          </p>
        </div>

        {/* Simple Value Props */}
        <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-white mb-8">Why Choose iON Talent</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <h4 className="text-xl font-semibold text-[#2DD4BF] mb-4">Direct Access</h4>
              <p className="text-white/80 leading-relaxed">
                Work directly with the principal consultant - no account managers or junior staff handling your search
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-[#2DD4BF] mb-4">Market Knowledge</h4>
              <p className="text-white/80 leading-relaxed">
                Deep understanding of local markets across Europe, Middle East, and North America
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-[#2DD4BF] mb-4">Quality Focus</h4>
              <p className="text-white/80 leading-relaxed">
                Thorough screening process ensuring candidates align with your culture and requirements
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
