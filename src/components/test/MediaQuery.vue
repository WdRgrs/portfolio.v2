<template>
  <div>
    {{ deviceSize }}: {{ width }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const width = ref<number>(window.innerWidth)

// keep width in sync with window
window.addEventListener('resize', () => {
  width.value = window.innerWidth
})

// computed device size string
const deviceSize = computed(() => {
  if (width.value <= 480) return 'mobile'
  if (width.value <= 768) return 'tablet'
  if (width.value <= 1024) return 'laptop'
  return 'desktop'
})
</script>

<style scoped>
div {
  position: absolute;
  top: 5rem;
  right: 2rem;
}
</style>