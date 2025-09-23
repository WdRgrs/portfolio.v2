<template>
  <div class="toggle">
    <MediaQuery />

    <button class="toggle__btn" @click="toggleTheme">
      {{ theme }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import MediaQuery from '@/components/test/MediaQuery.vue'

const theme = ref<'light' | 'dark'>('light')

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// keep DOM in sync
function applyTheme(value: 'light' | 'dark') {
  document.documentElement.dataset.theme = value
}

function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}

onMounted(() => {
  theme.value = prefersDark.matches ? 'dark' : 'light'
  applyTheme(theme.value)

  prefersDark.addEventListener('change', e => {
    theme.value = e.matches ? 'dark' : 'light'
  })
})

watch(theme, applyTheme)
</script>

<style scoped lang="scss">
.toggle {
  position: fixed;
  text-align: right;
  right: 1rem;
  bottom: 2rem;
  
  &__button {
    cursor: pointer;
    z-index: 1;
  }
}
</style>
