<template>
  <div class="page-title">
    <h1 class="page-title__main">{{ title }}</h1>
    <p v-if="subtitle" class="page-title__subtitle">{{ subtitle }}</p>
    <div v-if="description" class="page-title__description">
      {{ description }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  description?: string
}

defineProps<Props>()
</script>

<style scoped lang="scss">
.page-title {
  text-align: center;
  margin-bottom: var(--space-8);
  
  &__main {
    font-family: var(--font-title);
    font-size: var(--text-2xl);
    color: var(--color-text);
    margin-bottom: var(--space-3);
    
    @include mobile {
    }
  }
  
  &__subtitle {
    font-family: var(--font-subtitle);
    font-size: var(--text-xl);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-4);
  }
  
  &__description {
    font-family: var(--font-body);
    font-size: var(--text-md);
    color: var(--color-text-muted);
    max-width: 60ch;
    margin: 0 auto;
    line-height: var(--leading-relaxed);
  }
}
</style>