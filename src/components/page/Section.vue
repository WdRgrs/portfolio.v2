<template>
  <section 
    ref="containerRef" 
    class="page-section" 
    :style="{ height: lockedHeight || 'auto' }"
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
  // border: 1px solid rgba(220, 100, 100, .6);
  
  @include mobile {
    
  }
  
  &__container {
    margin: var(--space-5);
    // border: 1px solid rgba(220, 100, 100, .6);
  }
  
  &__header {
    // border: 1px solid rgba(220, 100, 100, .6);
    margin: var(--space-6) auto;
    position: relative;
    max-width: 1200px;
    
    font-family: var(--font-fredericka);
    font-size: calc(var(--text-3xl) * 1.5);
    padding: var(--space-5);
    user-select: none;
    
    @include mobile {
      margin: var(--space-4) auto;
    }
  }
}
</style>