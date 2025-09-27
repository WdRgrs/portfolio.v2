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

const DEFAULT_THEME: SkillTheme = {
  label: '',
  primary: '#64748b',
  secondary: '#ffffff',
  bd: '#94a3b8'
}

const theme = computed(() => {
  return {
    ...DEFAULT_THEME,
    ...props.skill
  }
})
</script>

<style scoped>
.chip {
  --chip-primary: #64748b;
  --chip-secondary: #ffffff;
  --chip-accent: color-mix(in oklab, var(--chip-primary) 20%, transparent);
  --chip-border: color-mix(in oklab, var(--chip-primary) 25%, transparent);

  position: relative;
  isolation: isolate;
  display: inline-flex;
  place-items: center;
  font-size: var(--text-xs);
  padding: var(--space-1) var(--space-2);  
  border-radius: 1000px;
  background: var(--chip-accent);
  color: var(--chip-primary);
  border: 1px solid var(--chip-border);

  filter: saturate(2) brightness(1.3) contrast(1);
  filter: saturate(2) brightness(1.2) contrast(.7);
  filter: saturate(2) brightness(1.3) contrast(.7);
  
  box-shadow:
    0 0 0 1px color-mix(in oklab, var(--chip-primary) 20%, transparent);
  
  transition: all 0.15s ease;
  cursor: default;
  user-select: none;
  white-space: nowrap;

  &:hover {
    background: color-mix(in oklab, var(--chip-primary) 30%, transparent);
    border-color: color-mix(in oklab, var(--chip-primary) 40%, transparent);
    box-shadow:
    0 0 0 1px color-mix(in oklab, var(--chip-primary) 15%, transparent),
    0 2px 4px color-mix(in oklab, var(--chip-primary) 20%, transparent);
  }
  
  &:focus-visible {
    outline: 1px solid var(--color-info);
    outline-offset: 2px;
  }
}

</style>