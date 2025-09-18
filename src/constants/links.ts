// todo VERIFY THESE LINKS - very outdated

export const LINKS = {
  SOCIAL: {
    LINKEDIN: 'https://www.linkedin.com/in/WdRgrs/',
    GITHUB: 'https://github.com/WdRgrs',
    GITHUB_REPOS: 'https://github.com/WdRgrs?tab=repositories',
    INSTAGRAM: 'https://www.instagram.com/wdrgrs/',
  },
  COMPANIES: {
    NEXTIQ: 'https://www.nextiq.com/',
    NEXTIQ_CERT: 'https://www.nextiq.com/how-to-get-certified',
    DEVMOUNTAIN: 'https://devmountain.com/',
  },
  PROJECTS: {
    DEVMOUNTAIN_DEMO: 'https://www.youtube.com/watch?v=TyiiZmUncbA',
    DEVMOUNTAIN_REPO: 'https://github.com/WdRgrs/Foundations-Project',
    MELODIENT_APP: 'https://melodient.herokuapp.com',
    MELODIENT_VIDEO: 'https://youtu.be/Y8CmFLRZMSY',
    MELODIENT_REPO: 'https://github.com/WdRgrs/Melodient',
    ALPHABITS_PAGE: 'https://wdrgrs.itch.io/alphabits',
  },
  PERSONAL: {
    PORTFOLIO: 'https://waderogers.dev',
  },
} as const;

export type ExternalLink = Readonly<{
  key: string;
  label: string;
  href: string;
  icon?: 'github' | 'linkedin' | 'instagram' | 'external';
  rel?: string;
}>;

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