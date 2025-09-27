import type { ExperienceBase } from "."

export type WorkExperienceData = ExperienceBase & {
  company: string
  role: string
  location: string
  brandColors?: string[]
}

export type ProjectData = ExperienceBase & {
  name: string
  type?: string
  repository?: string
}