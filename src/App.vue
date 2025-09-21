<template>
  <div class="app">
    <Transition name="slide-up">
      <header class="app__navbar" :inert="isLanding || undefined">
        <NavBar v-show="!isLanding" />
      </header>
    </Transition>

    <main class="app__main" :class="{ 'app__main--landing': isLanding }">
      <ThemeToggle />
      <MediaQuery />

      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>

    <Transition name="slide-up">
      <footer v-show="!isLanding" class="app__footer" :inert="isLanding || undefined">
        <Footer />
      </footer>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router'

import NavBar from '@/components/app/NavBar.vue'
import ThemeToggle from './components/app/ThemeToggle.vue';
import Footer from '@/components/page/Footer.vue'
import MediaQuery from '@/components/test/MediaQuery.vue'

const route = useRoute()

const isLanding = computed(() => {
  return route.fullPath === "/"
})
</script>

<style scoped lang="scss">
.app {
  height: 100vh;
  position: relative;

  &__navbar {
    height: var(--nav-bar-height);
  }

  &__main {
    position: relative;
    min-height: calc(100% - var(--nav-bar-height));

    &--landing {
      position: absolute;
      top: var(--nav-bar-height);
      // height: calc(100% - )
    }

    // maybe do something to help transition to landing page at some point, okay for now
    // &:not(.app__main--landing) {
    // }
  }

  .fade-enter-active,
  .fade-leave-active,
  .slide-up-enter-active,
  .slide-up-leave-active,
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: all 0.4s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    opacity: 0;
    transform: translateY(-100%);
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
}
</style>