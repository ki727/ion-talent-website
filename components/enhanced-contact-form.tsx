"use client"

import type React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, AlertCircle } from "lucide-react"
import { LoadingSpinner } from "./loading-spinner"
import { SuccessMessage } from "./success-message"
import { trackEvent } from "@/lib/analytics"
import { ENQUIRY_MARKETS, readEnquiryContext } from "@/lib/enquiry-context"

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  service: string
  message: string
  timeline: string
  market: string
}
interface EnhancedContactFormProps { initialService?: string }
const SERVICE_LABELS: Record<string, string> = {
  help: "Help me choose",
  contingent: "Contingent Recruitment",
  retained: "Executive Search",
  rpo: "RPO / Embedded Solutions",
  consulting: "Talent Consulting",
  general: "General Enquiry",
}
const TIMELINE_LABELS: Record<string, string> = {
  undecided: "To discuss", asap: "ASAP", "1month": "Within 1 month", "3months": "Within 3 months", "6months": "Within 6 months", planning: "Just planning",
}

export function EnhancedContactForm({ initialService }: EnhancedContactFormProps = {}) {
  const pathname = usePathname()
  const preview = pathname.startsWith("/global")
  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", company: "", phone: "", service: initialService ?? (preview ? "help" : "contingent"),
    message: "", timeline: preview ? "undecided" : "asap", market: "",
  })
  const [context, setContext] = useState({ market: "", sourcePage: "/global", sector: "" })
  const contextKey = useRef("")
  const [companyWebsite, setCompanyWebsite] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submittingRef = useRef(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const syncContext = useCallback(() => {
    if (!preview) return
    const next = readEnquiryContext(window.location.search, pathname)
    const key = JSON.stringify(next)
    if (contextKey.current === key) return
    contextKey.current = key
    setContext(next)
    setFormData(previous => ({ ...previous, market: next.market }))
  }, [pathname, preview])

  useEffect(() => {
    syncContext()
    window.addEventListener("popstate", syncContext)
    window.addEventListener("hashchange", syncContext)
    window.addEventListener("focus", syncContext)
    // The Navigation API observes same-path query updates made by Next's history integration.
    // Older browsers retain the pathname/hash/focus fallbacks without polling or history patches.
    const navigation = (window as Window & { navigation?: EventTarget }).navigation
    navigation?.addEventListener("currententrychange", syncContext)
    return () => {
      window.removeEventListener("popstate", syncContext)
      window.removeEventListener("hashchange", syncContext)
      window.removeEventListener("focus", syncContext)
      navigation?.removeEventListener("currententrychange", syncContext)
    }
  }, [syncContext])

  useEffect(() => {
    if (initialService) setFormData(previous => ({ ...previous, service: initialService }))
  }, [initialService])

  const change = (field: keyof FormData, value: string) => {
    setFormData(previous => ({ ...previous, [field]: value }))
    if (errors[field]) setErrors(previous => ({ ...previous, [field]: "" }))
  }

  const validateForm = () => {
    const next: Record<string, string> = {}
    if (!formData.name.trim()) next.name = "Name is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) next.email = "Please enter a valid business email"
    if (!formData.company.trim()) next.company = "Company is required"
    if (formData.message.trim().length < 10) next.message = "Please provide more details (minimum 10 characters)"
    if (formData.message.length > 500) next.message = "Please keep your brief within 500 characters"
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (submittingRef.current || !validateForm()) return
    submittingRef.current = true
    setIsSubmitting(true)
    setSubmitError("")
    // Read the URL again at submission so even same-page query navigation retains its origin.
    const currentContext = preview ? readEnquiryContext(window.location.search, pathname) : null
    const market = preview && JSON.stringify(currentContext) !== contextKey.current ? currentContext?.market ?? "" : formData.market
    try {
      const response = await fetch("/api/hiring-enquiry", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name, businessEmail: formData.email, company: formData.company,
          phone: formData.phone, serviceInterest: SERVICE_LABELS[formData.service] ?? formData.service,
          timeline: preview ? TIMELINE_LABELS[formData.timeline] ?? formData.timeline : formData.timeline,
          projectDetails: formData.message, pageUrl: window.location.href, companyWebsite,
          ...(preview ? { market, sourcePage: currentContext?.sourcePage, sector: currentContext?.sector } : {}),
        }),
      })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.success) throw new Error("We couldn't send your submission. Please try again.")
      trackEvent("hiring_enquiry_success", preview ? { market: market || "not-specified" } : undefined)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", company: "", phone: "", service: initialService ?? (preview ? "help" : "contingent"), message: "", timeline: preview ? "undecided" : "asap", market })
    } catch (error) {
      console.error("Error submitting hiring enquiry:", error)
      setSubmitError(error instanceof Error ? error.message : "We couldn't send your submission. Please try again.")
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) return <SuccessMessage title="Hiring enquiry sent successfully" message="Thanks. Your enquiry has been sent to ION Talent. We'll review the details and get back to you shortly." />

  const fieldClass = (name: string) => `border-2 transition-colors ${errors[name] ? "border-red-300 focus:border-red-500" : "border-gray-200 focus:border-ion-teal"}`
  const error = (name: string) => errors[name] && <p id={`${name}-error`} className="mt-1 flex items-center gap-1 text-sm text-red-600"><AlertCircle className="h-4 w-4" aria-hidden="true" />{errors[name]}</p>
  const labelClass = "mb-2 block text-sm font-semibold text-[#1a1a1a]"
  const selectClass = "w-full rounded-lg border-2 border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-ion-teal"
  const optionalFields = <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
    <div><label htmlFor="phone" className={labelClass}>Phone number <span className="font-normal text-ion-gray">(optional)</span></label><Input id="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={e => change("phone", e.target.value)} className={fieldClass("phone")} placeholder={preview ? "Include country code" : "+971 50 123 4567"} maxLength={60} /></div>
    <div><label htmlFor="service" className={labelClass}>Recruitment service</label><select id="service" value={formData.service} onChange={e => change("service", e.target.value)} className={selectClass}>{preview && <option value="help">Help me choose</option>}<option value="contingent">Contingent Recruitment</option><option value="retained">Executive Search</option><option value="rpo">RPO / Embedded Solutions</option><option value="consulting">Talent Consulting</option><option value="general">General Enquiry</option></select></div>
    <div><label htmlFor="timeline" className={labelClass}>Hiring timeline</label><select id="timeline" value={formData.timeline} onChange={e => change("timeline", e.target.value)} className={selectClass}>{preview && <option value="undecided">To discuss</option>}<option value="asap">ASAP</option><option value="1month">Within 1 month</option><option value="3months">Within 3 months</option><option value="6months">Within 6 months</option><option value="planning">Just planning</option></select></div>
  </div>

  return <form onSubmit={handleSubmit} onFocusCapture={syncContext} className="ion-density-form space-y-5" noValidate>
    <input type="text" name="companyWebsite" value={companyWebsite} onChange={e => setCompanyWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
    {preview && context.sector && <p className="rounded-lg bg-ion-teal/5 px-4 py-3 text-sm text-ion-navy">Discussing a hire in <strong>{context.sector}</strong></p>}
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div><label htmlFor="name" className={labelClass}>Full name *</label><Input id="name" type="text" autoComplete="name" value={formData.name} onChange={e => change("name", e.target.value)} className={fieldClass("name")} placeholder="Your full name" maxLength={150} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} required />{error("name")}</div>
      <div><label htmlFor="email" className={labelClass}>Business email *</label><Input id="email" type="email" autoComplete="email" value={formData.email} onChange={e => change("email", e.target.value)} className={fieldClass("email")} placeholder="you@company.com" maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} required />{error("email")}</div>
    </div>
    <div className={`grid grid-cols-1 gap-5 ${preview ? "md:grid-cols-2" : ""}`}>
      <div><label htmlFor="company" className={labelClass}>Company *</label><Input id="company" type="text" autoComplete="organization" value={formData.company} onChange={e => change("company", e.target.value)} className={fieldClass("company")} placeholder="Your company name" maxLength={200} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} required />{error("company")}</div>
      {preview && <div><label htmlFor="market" className={labelClass}>Hiring market</label><select id="market" value={formData.market} onChange={e => change("market", e.target.value)} className={selectClass}><option value="">To discuss / multiple markets</option>{ENQUIRY_MARKETS.map(market => <option key={market.slug} value={market.slug}>{market.label}</option>)}</select></div>}
    </div>
    {!preview && optionalFields}
    <div><label htmlFor="message" className={labelClass}>{preview ? "What are you hiring?" : "Project details"} *</label><Textarea id="message" rows={preview ? 4 : 5} value={formData.message} onChange={e => change("message", e.target.value)} className={fieldClass("message")} placeholder={preview ? "Tell us about the role, location and what this person needs to achieve." : "Tell us about your hiring needs, specific roles, team size and industry requirements."} maxLength={500} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} required />{error("message")}<p className="mt-1 text-right text-xs text-ion-gray">{formData.message.length}/500</p></div>
    {preview && <details className="rounded-xl border border-ion-border px-4 py-3" open={Boolean(initialService)}><summary className="cursor-pointer text-sm font-semibold text-ion-navy">Add phone, service or timing <span className="font-normal text-ion-gray">(optional)</span></summary><div className="pt-5">{optionalFields}</div></details>}
    <p className="rounded-lg bg-ion-teal/5 p-4 text-sm leading-relaxed text-[#3f4b5a]"><strong className="text-ion-navy">What happens next?</strong> We’ll review your brief and contact you to discuss next steps.</p>
    {submitError && <div role="alert" className="flex gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />{submitError}</div>}
    <Button type="submit" disabled={isSubmitting} aria-disabled={isSubmitting} size="lg" className="ion-primary-button w-full gap-2 whitespace-normal rounded-full py-4 text-base font-semibold shadow-sm focus-visible:ring-2 focus-visible:ring-ion-teal">{isSubmitting ? <LoadingSpinner /> : <>Send Hiring Enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}</Button>
    <p className="text-center text-xs leading-relaxed text-ion-gray">We use your details to respond to your enquiry. Read our <Link href={preview ? "/global/privacy" : "/privacy"} className="underline underline-offset-2">privacy policy</Link>.</p>
  </form>
}
