<template>
  <button class="toggle" @click="toggleTheme">
    {{ theme }}
  </button>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'

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
button {
  cursor: pointer;
  position: absolute;
}
</style>
