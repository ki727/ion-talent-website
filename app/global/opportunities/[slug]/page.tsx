import RolePage from "@/app/opportunities/[slug]/page"
import { opportunities } from "@/lib/opportunities"
import { previewMetadata } from "@/lib/preview-metadata"
export function generateStaticParams() { return opportunities.map(role => ({ slug: role.slug })) }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const role = opportunities.find(item => item.slug === params.slug)
  return previewMetadata(`${role?.title || "Role not found"} | ION Talent`, role?.description || "ION Talent opportunity details.")
}
export default RolePage
