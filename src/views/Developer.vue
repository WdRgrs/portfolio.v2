<template>
  <div class="software">
    <div class="software__container">

      <!-- <div class="scroll">
        <div class="scroll__container">
          Quick Scroll
        </div>
      </div> -->

      <About />
    </div>
  </div>
</template>

<script setup lang="ts">
import About from '@/components/software/About.vue';

</script>

<style scoped lang="scss">
.software {

  &__container {
    position: relative;
    max-width: var(--max-width);
    margin: 0 auto;
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