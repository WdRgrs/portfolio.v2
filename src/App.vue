<template>
  <div class="app">
    <header class="app__navbar" :inert="isLanding || undefined">
      <NavBar v-show="!isLanding" />
    </header>

    <main class="app__main" :class="{ 'app__main--landing': isLanding }">
      <ThemeToggle />

      <RouterView v-slot="{ Component, route }">
          <component :is="Component" :key="route.path" />
      </RouterView>
    </main>

    <footer v-show="!isLanding" class="app__footer" :inert="isLanding || undefined">
      <Footer />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'

import NavBar from '@/components/app/NavBar.vue'
import ThemeToggle from './components/app/ThemeToggle.vue';
import Footer from '@/components/page/Footer.vue'

const route = useRoute()

const isLanding = computed(() => {
  return route.fullPath === "/"
})
</script>

<style scoped lang="scss">
.app {
  height: 100dvh;
  position: relative;

  &__navbar {
    height: var(--nav-bar-height);
  }

  &__main {
    position: relative;
    min-height: calc(100% - var(--nav-bar-height));

    &--landing {
      position: fixed;
      top: var(--nav-bar-height);
    }
  }
}
</style>