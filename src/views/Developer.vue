<template>
  <div class="software">
    <div class="software__container">

      <!-- <div class="scroll">
        <div class="scroll__container">
          Quick Scroll
        </div>
      </div> -->


      <About />
      <div class="software__border-break" />
      
      <Experience />

      <div class="software__border-break" />
      <DevLog />
    </div>
  </div>
</template>

<script setup lang="ts">
import About from '@/components/software/About.vue';
import Experience from '@/components/software/Experience.vue';
import DevLog from '@/components/software/DevLog.vue';

</script>

<style scoped lang="scss">
.software {
  &__container {
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
  }

  &__border-break {
    height: 1px;
    height: 50px;
    border-bottom: 1px solid var(--color-surface-2);
    box-shadow: 0 20px 20px -20px var(--color-surface-1);;
    margin: var(--space-9);
    // background-image: linear-gradient(90deg, transparent, var(--color-surface-1), var(--color-secondary), var(--color-surface-1), transparent);
  }
}

.scroll {
  position: fixed;
  padding: var(--space-4);
  transform: translate(0, 500%);
  border: 1px solid rgba(120,  20, 39, .2);
  &__container {
    border: 1px solid rgba(20,  220, 239, .5);
  }

  @include laptop {
  }

  @include tablet {
    position: relative;
    transform: unset;
  }

  @include mobile {
    position: relative;
    transform: unset;
    
  }
}
</style>
