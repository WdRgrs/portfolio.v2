<template>
  <section class="page-section">
    <div class="page-section__container">
      <div class="page-section__header">
        <slot name="header" />
      </div>
      
      <div class="page-section__content">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.page-section {
  max-width: 100dvw;
  margin: 0 auto;
  
  @include mobile {
  }
  
  &__container {
    margin: var(--space-5);
    // border: 1px solid rgba(220, 100, 100, .6);
  }
  
  &__header {
    // margin-bottom: var(--space-6);
  }
}
</style>