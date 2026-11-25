"use client"

import { RoleApplicationForm } from "@/components/role-application-form"

export function CandidateRegistrationForm({ selectedRole = "" }: { selectedRole?: string }) {
  return <RoleApplicationForm mode="registration" selectedRole={selectedRole} roleTitle="" roleUrl="" roleCategory="" roleLocation="" roleType="" />
}
