export type SkillKey = keyof typeof SKILLS;

export type SkillTheme = {
  label: string;
  primary: string;
  secondary: string;
  bd?: string;
};

export const SKILLS: Record<string, SkillTheme> = {
  // Frameworks / libs
  js: { label: 'JavaScript', primary: '#F0DB4F', secondary: '#323330' },
  ts: { label: 'TypeScript', primary: '#007acc', secondary: '#EBEBEB' },
  vue: { label: 'Vue', primary: '#41B883', secondary: '#34495E' },
  nuxt: { label: 'Nuxt', primary: '#41b883', secondary: '#35495e', bd: '#3b8070' },
  react: { label: 'React', primary: '#61dbfb', secondary: '#323330' },
  rust: { label: 'Rust', primary: '#B7410E', secondary: '#B7410E', bd: '#333333' },
  shell: { label: 'Shell', primary: '#89e051', secondary: '#0f2a12' },
  elixir: { label: 'Elixir', primary: '#A11A8C', secondary: '#957A42' },
  go: { label: 'Go', primary: '#00ADD8', secondary: '#06252c' },
  html: { label: 'HTML', primary: '#e34f26', secondary: '#F06529', bd: '#EBEBEB' },
  css: { label: 'CSS', primary: '#264de4', secondary: '#1572B6', bd: '#ebebeb' },
  scss: { label: 'Sass', primary: '#CC6699', secondary: '#250e18' },

  // Backend & protocols
  node: { label: 'Node.js', primary: '#339933', secondary: '#071a0b' },
  express: { label: 'Express.js', primary: '#0075C9', secondary: '#ffffff', bd: '#444444' },
  phoenix: { label: 'Phoenix', primary: '#f25e1b', secondary: '#2f0f06' },
  rest: { label: 'REST API', primary: '#0ea5e9', secondary: '#052433' },
  oauth2: { label: 'OAuth2', primary: '#8b5cf6', secondary: '#1c0b2a' },
  oauth: { label: 'OAuth2', primary: '#8b5cf6', secondary: '#1c0b2a' },
  websockets: { label: 'WebSockets', primary: '#22c55e', secondary: '#092015' },

  // Databases
  mongo: { label: 'MongoDB', primary: '#47A248', secondary: '#071a0a' },
  postgres: { label: 'PostgreSQL', primary: '#336791', secondary: '#ffffff' },
  dynamo: { label: 'DynamoDB', primary: '#4053D6', secondary: '#ffffff' },
  questdb: { label: 'QuestDB', primary: '#ff00ff', secondary: '#2a002a' },
  mysql: { label: 'MySQL', primary: '#00758f', secondary: '#f29111' },
  sqlite: { label: 'SQLite3', primary: '#003B57', secondary: '#ffffff' },
  neo4j: { label: 'Neo4j', primary: '#008cc1', secondary: '#ffffff' },
  graphql: { label: 'GraphQL', primary: '#E10098', secondary: '#ffffff' },
  snowflake: { label: 'Snowflake', primary: '#29B5E8', secondary: '#062633' },

  // State management
  vuex: { label: 'Vuex', primary: '#35495e', secondary: '#ffffff' },
  pinia: { label: 'Pinia', primary: '#ffd859', secondary: '#3b2b00', bd: '#e0b500' },
  redux: { label: 'Redux', primary: '#764ABC', secondary: '#ffffff' },

  // UI / styling
  tailwind: { label: 'Tailwind CSS', primary: '#38BDF8', secondary: '#072433' },
  vuetify: { label: 'Vuetify', primary: '#1867C0', secondary: '#ffffff' },

  // DevOps
  docker: { label: 'Docker', primary: '#2496ED', secondary: '#ffffff' },
  ansible: { label: 'Ansible', primary: '#EE0000', secondary: '#ffffff' },
  aws: { label: 'AWS', primary: '#FF9900', secondary: '#2a1400' },
  amplify: { label: 'AWS Amplify', primary: '#FF9900', secondary: '#2a1400' },
  s3: { label: 'AWS S3', primary: '#d73f3f', secondary: '#2a0b0b' },
  cognito: { label: 'AWS Cognito', primary: '#6b46c1', secondary: '#ffffff' },
  kubernetes: { label: 'Kubernetes', primary: '#326CE5', secondary: '#ffffff' },
  k8s: { label: 'Kubernetes', primary: '#326CE5', secondary: '#ffffff' },
  linux: { label: 'Linux', primary: '#000000', secondary: '#FCC624', bd: '#333333' },
  proxmox: { label: 'Proxmox', primary: '#E57000', secondary: '#2a1200' },

  // Tooling
  git: { label: 'Git', primary: '#F05032', secondary: '#2a0f0a' },
  npm: { label: 'npm', primary: '#CB3837', secondary: '#ffffff' },
  vite: { label: 'Vite', primary: '#646CFF', secondary: '#ffffff' },
  webpack: { label: 'Webpack', primary: '#8DD6F9', secondary: '#0b2230' },
  figma: { label: 'Figma', primary: '#0ACF83', secondary: '#062417' },
  jira: { label: 'Jira', primary: '#0052CC', secondary: '#ffffff' },
  confluence: { label: 'Confluence', primary: '#172B4D', secondary: '#ffffff' },
  asana: { label: 'Asana', primary: '#F06A6A', secondary: '#2a0f11' },
  trello: { label: 'Trello', primary: '#026AA7', secondary: '#ffffff' },

  // Misc / projects
  macroquad: { label: 'Macroquad', primary: '#2cb67d', secondary: '#06241a' },
  webassembly: { label: 'WebAssembly', primary: '#654FF0', secondary: '#ffffff' },
  wasm: { label: 'WebAssembly', primary: '#654FF0', secondary: '#ffffff' },
  heroku: { label: 'Heroku', primary: '#79589F', secondary: '#ffffff' },
  spa: { label: 'SPA', primary: '#475569', secondary: '#ffffff' },
  ssr: { label: 'SSR', primary: '#334155', secondary: '#ffffff' },

  // General skills
  gitlab: { label: 'GitLab', primary: '#FCA326', secondary: '#FC6D26', bd: '#E24329' },
  github: { label: 'GitHub', primary: '#6e5494', secondary: '#4078c0', bd: '#fafafa' },
  pages: { label: 'GitHub Pages', primary: '#238636', secondary: '#05190c' },
  ci: { label: 'CI/CD', primary: '#0ea5e9', secondary: '#052433' },
  seo: { label: 'SEO', primary: '#16a34a', secondary: '#062414' },
  networking: { label: 'Networking', primary: '#64748b', secondary: '#0b1118', bd: '#475569' },
  dns: { label: 'DNS', primary: '#94a3b8', secondary: '#0b1118', bd: '#64748b' },
  accessibility: { label: 'Accessibility', primary: '#22c55e', secondary: '#092015' },
  responsive: { label: 'Responsive Design', primary: '#14b8a6', secondary: '#042321' },
  ux: { label: 'UX/UI Design', primary: '#a78bfa', secondary: '#1b1237' },
  crud: { label: 'CRUD', primary: '#eab308', secondary: '#231a00' },
  caching: { label: 'Caching', primary: '#f59e0b', secondary: '#231500' },
  analytics: { label: 'Analytics', primary: '#10b981', secondary: '#06231b' },
  qa: { label: 'QA Testing', primary: '#c084fc', secondary: '#1e0f33' },
  testing: { label: 'QA Testing', primary: '#c084fc', secondary: '#1e0f33' },
  spotify: { label: 'Spotify API', primary: '#1DB954', secondary: '#062313' },
  agile: { label: 'Agile', primary: '#0ea5e9', secondary: '#052433' },
  wireframe: { label: 'Wireframing', primary: '#5f9cedff', secondary: '#0a0f14', bd: '#cbd5e1' },
}


export const SKILL_KEYS = Object.keys(SKILLS) as (keyof typeof SKILLS)[];
