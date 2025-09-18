<template>
  <NavBar v-if="!isLanding"/>
  <main>
    <ThemeToggle />
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import NavBar from '@/components/app/NavBar.vue'
import ThemeToggle from './components/page/ThemeToggle.vue';

const router = useRouter()
const route = useRoute()

const isLanding = computed(() => {
  return route.fullPath === "/"
})

onMounted(() => {
  console.log("router", router)
  console.log("route", route)
})
</script>

<style scoped lang="scss">

</style>
