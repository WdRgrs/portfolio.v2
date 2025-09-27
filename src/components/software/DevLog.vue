<template>
  <PageSection class="dev-log" variant="default" spacing="normal">
    <template #header>
      <h2 class="dev-log__title">Dev<span>.</span>Log<span>()</span></h2>
    </template>

    <div class="dev-log__content">
      Here be giants:
      {{ projects }}
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import PageSection from '@/components/page/Section.vue'
import { PROJECT_EXPERIENCE } from '@/constants';
const projects = PROJECT_EXPERIENCE


</script>

<style scoped lang="scss">
.dev-log {
  &__title {
    span {
      letter-spacing: var(--space-3);
    }
  }

  &__content {
    height: 500px;
    width: 80%;
    margin: auto;
    background-color: var(--color-surface-1);
    border-radius: var(--radius-lg);
  }
}
</style>