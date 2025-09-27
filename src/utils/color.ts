import { SKILLS, type SkillTheme } from "@/constants";

export function resolveSkillTheme(raw: string): SkillTheme {
  const key = raw.toLowerCase().trim() as keyof typeof SKILLS;
  return SKILLS[key] ?? { label: raw, primary: '#e5e7eb', secondary: '#0a0f14', bd: '#d1d5db' };
}
