<template>
  <span
    class="chip"
    :style="{
      '--chip-primary': theme.primary,
      '--chip-secondary': theme.secondary,
      '--chip-accent': `color-mix(in oklab, ${theme.primary} 20%, transparent)`,
      '--chip-border': `color-mix(in oklab, ${theme.primary} 25%, transparent)`,
    }"
    :aria-label="theme.label"
    role="status"
  >
    {{ theme.label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SkillTheme } from '@/constants';

interface Props {
  skill: SkillTheme
}

const props = defineProps<Props>()


// Default theme for unknown skills
const DEFAULT_THEME: SkillTheme = {
  label: '',
  primary: '#64748b',
  secondary: '#ffffff',
  bd: '#94a3b8'
}

const theme = computed(() => {
  // Return default theme with the original label
  return {
    ...DEFAULT_THEME,
    ...props.skill
  }
})
</script>

<style scoped>
.chip {
  /* CSS custom properties with fallbacks */
  --chip-primary: #64748b;
  --chip-secondary: #ffffff;
  --chip-accent: color-mix(in oklab, var(--chip-primary) 20%, transparent);
  --chip-border: color-mix(in oklab, var(--chip-primary) 25%, transparent);
  
  /* Layout & typography */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  /* Compact, responsive sizing */
  font-size: clamp(0.7rem, 0.65rem + 0.2vw, 0.75rem);
  font-weight: 500;
  line-height: 1;
  padding: clamp(0.2rem, 0.18rem + 0.1vw, 0.25rem) clamp(0.5rem, 0.45rem + 0.25vw, 0.625rem);
  
  /* Fully rounded, subtle appearance */
  border-radius: 9999px;
  background: var(--chip-accent);
  color: var(--chip-primary);
  border: 1px solid var(--chip-border);
  
  /* Subtle depth without being boxy */
  box-shadow:
    0 0 0 1px color-mix(in oklab, var(--chip-primary) 8%, transparent),
    0 1px 2px color-mix(in oklab, var(--chip-primary) 12%, transparent);
  
  /* Smooth interactions */
  transition: all 0.15s ease;
  cursor: default;
  user-select: none;
  white-space: nowrap;
}

.chip:hover {
  background: color-mix(in oklab, var(--chip-primary) 30%, transparent);
  border-color: color-mix(in oklab, var(--chip-primary) 40%, transparent);
  box-shadow:
    0 0 0 1px color-mix(in oklab, var(--chip-primary) 15%, transparent),
    0 2px 4px color-mix(in oklab, var(--chip-primary) 20%, transparent);
}

.chip:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}
</style>