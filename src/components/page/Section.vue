<template>
  <section 
    ref="containerRef" 
    class="page-section" 
    :style="{ minHeight: lockedHeight || 'auto' }"
  >
    <div class="page-section__container">
      <div class="page-section__header">
        <slot name="header" />
      </div>
      
      <div class="page-section__content">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';

const containerRef = ref<HTMLElement | null>(null)
const lockedHeight = ref<string | null>(null)

onMounted(() => {
  nextTick(() => {
    if (containerRef.value) {
      lockedHeight.value = `${containerRef.value.offsetHeight}px`
    }
  })
})
</script>

<style scoped lang="scss">
.page-section {
  max-width: 100dvw;
  margin: 0 auto;
  
  &__container {
    margin: var(--space-6);
  }
  
  &__header {
    position: relative;
    margin: var(--space-7) auto;
    margin: var(--space-7) auto var(--space-4);
    max-width: 1200px;
    color: var(--color-text-muted);
    font-family: var(--font-fredericka);
    font-size: calc(var(--text-3xl) * 2);
    padding: var(--space-5);
    user-select: none;
    
    @include mobile {
      font-size: calc(var(--text-3xl) * 1.5);
    }
  }
}
</style>