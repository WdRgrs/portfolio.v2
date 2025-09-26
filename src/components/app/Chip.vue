<template>
  <div 
    class="skill-chip" 
    :style="chipStyles"
  >
    {{ displayName }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SKILLS_MAP } from '@/constants'

interface Props {
  skill: string
}

const props = defineProps<Props>()

// Color mappings for specific technologies (using display names from SKILLS_MAP)
const skillColors = {
  // Frontend Frameworks
  'Vue': { bg: '#4FC08D', border: '#4FC08D', text: '#ffffff' },
  'React': { bg: '#61DAFB', border: '#61DAFB', text: '#20232a' },
  'Nuxt': { bg: '#00DC82', border: '#00DC82', text: '#ffffff' },
  'Angular': { bg: '#DD0031', border: '#DD0031', text: '#ffffff' },
  'Svelte': { bg: '#FF3E00', border: '#FF3E00', text: '#ffffff' },
  
  // Languages
  'TypeScript': { bg: '#3178C6', border: '#3178C6', text: '#ffffff' },
  'JavaScript': { bg: '#F7DF1E', border: '#F7DF1E', text: '#000000' },
  'Rust': { bg: '#CE422B', border: '#CE422B', text: '#ffffff' },
  'Python': { bg: '#3776AB', border: '#3776AB', text: '#ffffff' },
  'Go': { bg: '#00ADD8', border: '#00ADD8', text: '#ffffff' },
  'Elixir': { bg: '#4B275F', border: '#4B275F', text: '#ffffff' },
  'Shell': { bg: '#89E051', border: '#89E051', text: '#000000' },
  
  // Backend/Runtime
  'Node.js': { bg: '#339933', border: '#339933', text: '#ffffff' },
  'Express.js': { bg: '#000000', border: '#000000', text: '#ffffff' },
  'Phoenix': { bg: '#FD4F00', border: '#FD4F00', text: '#ffffff' },
  
  // Databases
  'MongoDB': { bg: '#47A248', border: '#47A248', text: '#ffffff' },
  'PostgreSQL': { bg: '#336791', border: '#336791', text: '#ffffff' },
  'SQLite3': { bg: '#003B57', border: '#003B57', text: '#ffffff' },
  'DynamoDB': { bg: '#FF9900', border: '#FF9900', text: '#ffffff' },
  'QuestDB': { bg: '#5B9BD5', border: '#5B9BD5', text: '#ffffff' },
  'Neo4j': { bg: '#008CC1', border: '#008CC1', text: '#ffffff' },
  'Snowflake': { bg: '#29B5E8', border: '#29B5E8', text: '#ffffff' },
  
  // Styling/UI
  'Tailwind CSS': { bg: '#06B6D4', border: '#06B6D4', text: '#ffffff' },
  'CSS': { bg: '#1572B6', border: '#1572B6', text: '#ffffff' },
  'Sass': { bg: '#CF649A', border: '#CF649A', text: '#ffffff' },
  'Vuetify': { bg: '#1867C0', border: '#1867C0', text: '#ffffff' },
  'Material UI': { bg: '#0081CB', border: '#0081CB', text: '#ffffff' },
  
  // Tools/DevOps
  'Docker': { bg: '#2496ED', border: '#2496ED', text: '#ffffff' },
  'Kubernetes': { bg: '#326CE5', border: '#326CE5', text: '#ffffff' },
  'AWS': { bg: '#FF9900', border: '#FF9900', text: '#000000' },
  'Git': { bg: '#F05032', border: '#F05032', text: '#ffffff' },
  'GitHub': { bg: '#181717', border: '#181717', text: '#ffffff' },
  'Vite': { bg: '#646CFF', border: '#646CFF', text: '#ffffff' },
  'Webpack': { bg: '#8DD6F9', border: '#8DD6F9', text: '#000000' },
  'Figma': { bg: '#F24E1E', border: '#F24E1E', text: '#ffffff' },
  'Linux': { bg: '#FCC624', border: '#FCC624', text: '#000000' },
  'Proxmox': { bg: '#E57000', border: '#E57000', text: '#ffffff' },
  'Ansible': { bg: '#EE0000', border: '#EE0000', text: '#ffffff' },
  
  // State Management
  'Vuex': { bg: '#4FC08D', border: '#4FC08D', text: '#ffffff' },
  'Pinia': { bg: '#FFD43B', border: '#FFD43B', text: '#000000' },
  'Redux': { bg: '#764ABC', border: '#764ABC', text: '#ffffff' },
  'Redux Saga': { bg: '#999999', border: '#999999', text: '#ffffff' },
  
  // APIs/Protocols
  'REST API': { bg: '#61AFFE', border: '#61AFFE', text: '#ffffff' },
  'OAuth2': { bg: '#EB5424', border: '#EB5424', text: '#ffffff' },
  'WebSockets': { bg: '#010101', border: '#010101', text: '#ffffff' },
  'Spotify API': { bg: '#1DB954', border: '#1DB954', text: '#ffffff' },
  
  // Build Tools
  'npm': { bg: '#CB3837', border: '#CB3837', text: '#ffffff' },
  'Yarn': { bg: '#2C8EBB', border: '#2C8EBB', text: '#ffffff' },
  
  // Game Development
  'Macroquad': { bg: '#654FF0', border: '#654FF0', text: '#ffffff' },
  'WebAssembly': { bg: '#654FF0', border: '#654FF0', text: '#ffffff' },
  
  // Hosting/Deployment
  'Heroku': { bg: '#430098', border: '#430098', text: '#ffffff' },
  'GitHub Pages': { bg: '#24292e', border: '#24292e', text: '#ffffff' },
  'CI/CD': { bg: '#2088FF', border: '#2088FF', text: '#ffffff' },
  
  // Concepts/Practices
  'SPA': { bg: '#42b883', border: '#42b883', text: '#ffffff' },
  'SSR': { bg: '#00DC82', border: '#00DC82', text: '#ffffff' },
  'SEO': { bg: '#4285F4', border: '#4285F4', text: '#ffffff' },
  'Open Graph': { bg: '#1877F2', border: '#1877F2', text: '#ffffff' },
  'Schema.org': { bg: '#1A73E8', border: '#1A73E8', text: '#ffffff' },
  'HTTPS': { bg: '#0F9D58', border: '#0F9D58', text: '#ffffff' },
  'Accessibility': { bg: '#0052CC', border: '#0052CC', text: '#ffffff' },
  'Responsive Design': { bg: '#FF6B6B', border: '#FF6B6B', text: '#ffffff' },
  'UX/UI Design': { bg: '#FF7262', border: '#FF7262', text: '#ffffff' },
  'CRUD': { bg: '#6C5CE7', border: '#6C5CE7', text: '#ffffff' },
  'Caching': { bg: '#A29BFE', border: '#A29BFE', text: '#ffffff' },
  'Analytics': { bg: '#FF9F43', border: '#FF9F43', text: '#ffffff' },
  'QA Testing': { bg: '#2ECC71', border: '#2ECC71', text: '#ffffff' },
  'MERN Stack': { bg: '#61DAFB', border: '#61DAFB', text: '#20232a' },
  'Agile': { bg: '#0052CC', border: '#0052CC', text: '#ffffff' },
  'Wireframing': { bg: '#9B59B6', border: '#9B59B6', text: '#ffffff' },
}

// Default colors for unknown skills
const defaultColors = {
  bg: 'var(--color-surface-2)',
  border: 'var(--color-border)',
  text: 'var(--color-text-secondary)'
}

const chipStyles = computed(() => {
  // Convert skill key to display name using SKILLS_MAP
  const displayName = SKILLS_MAP[props.skill as keyof typeof SKILLS_MAP] || props.skill
  const colors = skillColors[displayName as keyof typeof skillColors] || defaultColors
  
  return {
    '--chip-bg': colors.bg,
    '--chip-border': colors.border,
    '--chip-text': colors.text,
  }
})

const displayName = computed(() => {
  return SKILLS_MAP[props.skill as keyof typeof SKILLS_MAP] || props.skill
})
</script>

<style scoped lang="scss">
.skill-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--chip-border);
  background: var(--chip-bg);
  color: var(--chip-text);
  border-radius: var(--radius-md);
  font-family: var(--font-ui);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  line-height: 1;
  white-space: nowrap;
  opacity: 0.9;
  transition: all 0.2s ease;
  
  // Responsive sizing
  @include mobile {
    padding: var(--space-1) var(--space-2);
    font-size: var(--text-xs);
  }
  
  @include tablet {
    padding: var(--space-2) var(--space-3);
    font-size: var(--text-sm);
  }
  
  @include laptop {
    padding: var(--space-2) var(--space-4);
    font-size: var(--text-sm);
  }
  
  // Soft background effect
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--chip-bg);
    opacity: 0.1;
    border-radius: var(--radius-md);
    z-index: -1;
  }
  
  // Optional hover effect
  &:hover {
    opacity: 1;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
}</style>