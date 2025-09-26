import type { LocalLink, ExternalLink } from "@/types"

export const LINKS = {
  SITE: {
    LANDING: '/',
    DEVELOPMENT: '/software',
    WELDING: '/welding',
    PHOTOGRAPHY: '/photography',
    DEV_LOG: '/dev-log',
    RESUME: '/resume',
    NOT_FOUND: 'no',
  },
  SOCIAL: {
    LINKEDIN: 'https://www.linkedin.com/in/WdRgrs/',
    GITHUB: 'https://github.com/WdRgrs',
    GITHUB_REPOS: 'https://github.com/WdRgrs?tab=repositories',
    INSTAGRAM: 'https://www.instagram.com/wdrgrs/',
  },
  COMPANIES: {
    RHDM: 'https//www.rhdm.com',
    NEXTIQ: 'https://www.nextiq.com/',
    DEVMOUNTAIN: 'https://strayer.smartcatalogiq.com/en/2023-2024/catalog/nondegree-noncredit-offerings/devmountain-offerings',
  },
  PROJECTS: {
    DEVMOUNTAIN_DEMO: 'https://www.youtube.com/watch?v=TyiiZmUncbA',
    MELODIENT_APP: 'https://melodient.herokuapp.com',
    MELODIENT_VIDEO: 'https://youtu.be/Y8CmFLRZMSY',
    MELODIENT_REPO: 'https://github.com/WdRgrs/Melodient',
    ALPHABITS_PAGE: 'https://wdrgrs.itch.io/alphabits',
  },
  PERSONAL: {
    PORTFOLIO: 'https://waderogers.dev',
  },
} as const;


export const SITE_LINKS: ReadonlyArray<LocalLink> = [
  { key: 'landing', label: 'Landing', path: LINKS.SITE.LANDING },
  { key: 'developer', label: 'Developer', path: LINKS.SITE.DEVELOPMENT, main: true },
  { key: 'welding', label: 'Welder', path: LINKS.SITE.WELDING, main: true },
  { key: 'photography', label: 'Photographer', path: LINKS.SITE.PHOTOGRAPHY, main: true },
  { key: 'dev_log', label: 'Dev Log', path: LINKS.SITE.DEV_LOG },
  { key: 'resume', label: 'Resume', path: LINKS.SITE.RESUME },
  { key: 'not_found', label: 'Not Found', path: LINKS.SITE.NOT_FOUND },
] as const;

export const SOCIAL_LINKS: ReadonlyArray<ExternalLink> = [
  { key: 'github', label: 'GitHub', href: LINKS.SOCIAL.GITHUB, icon: 'github' },
  { key: 'linkedin', label: 'LinkedIn', href: LINKS.SOCIAL.LINKEDIN, icon: 'linkedin' },
  { key: 'instagram', label: 'Instagram', href: LINKS.SOCIAL.INSTAGRAM, icon: 'instagram' },
] as const;

export const PROJECT_LINKS: ReadonlyArray<ExternalLink> = [
  { key: 'alphabits', label: 'Alphabits', href: LINKS.PROJECTS.ALPHABITS_PAGE, icon: 'external' },
  { key: 'melodient', label: 'Melodient', href: LINKS.PROJECTS.MELODIENT_APP, icon: 'external' },
  { key: 'melodient-repo', label: 'Melodient Repo', href: LINKS.PROJECTS.MELODIENT_REPO, icon: 'github' },
] as const;


