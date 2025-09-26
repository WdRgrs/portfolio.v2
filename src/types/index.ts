export * from './experience'

export interface ExperienceBase {
  period: string
  description: string
  achievements: string[]
  logo?: string
  website?: string
  skills?: string[]
}