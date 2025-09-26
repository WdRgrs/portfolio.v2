import type { ExperienceBase } from "."

export type WorkExperienceData = ExperienceBase & {
  company: string
  role: string
  location: string
}