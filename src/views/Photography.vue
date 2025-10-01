<template>
  <div class="photography-page">
    <PhotoHero :quote="heroQuote" />
    
    <div class="photography-page__placeholder">
      <p>Gallery coming soon...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import PhotoHero from '@/components/photography/Hero.vue'

const heroQuote = {
  text: 'Photography is the story I fail to put into words.',
  author: 'Destin Sparks'
}
</script>

<style scoped lang="scss">
.photography-page {
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