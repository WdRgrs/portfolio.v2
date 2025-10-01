<template>
  <div class="welding-page">
    <WeldHero :quote="heroQuote" :show-sparks="true" />
    
    <!-- Gallery will go here later -->
    <div class="welding-page__placeholder">
      <p>Portfolio coming soon...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeldHero from '@/components/welding/Hero.vue'

const heroQuote = {
  text: '',
  author: ''
}
</script>

<style scoped lang="scss">
.welding-page {
  &__placeholder {
    min-height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-body);
    font-size: var(--text-xl);
    color: var(--color-text-muted);
  }
}
</style>