<template>
  <article 
    class="exp-card" 
    :class="{
      'exp-card--compact': isCompact,
      'exp-card--full': !isCompact
    }"
  >
    <div class="exp-card__header">
      <div class="exp-card__company">
        <h3 class="exp-card__name">{{ experience.company }}</h3>
        <a 
          v-if="experience.website && !isCompact" 
          :href="experience.website" 
          class="exp-card__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit company website"
        >
          <Icon 
            name="link"
            size="md"
            color="var(--color-accent)"
          />
        </a>
      </div>
      
      <div class="exp-card__meta">
        <span class="exp-card__role">{{ experience.role }}</span>
        <span v-if="!isCompact" class="exp-card__divider">•</span>
        <span v-if="!isCompact" class="exp-card__location">{{ experience.location }}</span>
      </div>
      
      <span class="exp-card__period">{{ experience.period }}</span>
    </div>

    <!-- Only show in full mode -->
    <template v-if="!isCompact">
      <p class="exp-card__description">{{ experience.description }}</p>

      <ul class="exp-card__achievements">
        <li v-for="(achievement, index) in experience.achievements" :key="index">
          {{ achievement }}
        </li>
      </ul>
    </template>

    <!-- Compact mode indicator -->
    <div v-if="isCompact" class="exp-card__compact-indicator" @click="action">
      <span>Click to expand</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="m6 9 6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </article>
</template>

<script setup lang="ts">
import Icon from '@/components/app/Icon.vue'
import type { WorkExperienceData } from '@/types'

interface Props {
  experience: WorkExperienceData
  isCompact?: boolean
  action?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  isCompact: false
})

function handleAction() {
  if (props.action) {
    props.action()
  }
}
</script>

<style scoped lang="scss">
.exp-card {
  background: var(--color-surface-1);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;

  &--compact {
    user-select: none;
    padding: var(--space-4);
    width: var(--exp-card-width, 280px);
    height: var(--exp-card-height, 160px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @include mobile {
      padding: var(--space-3);
    }

    &:hover {
      // background: var(--color-surface-2);
      // border-color: var(--color-primary);
      // transform: translateY(-2px);
      // box-shadow: 0 2px 8px var(--color-shadow);
    }

    .exp-card__header {
      margin-bottom: var(--space-2);
      padding-bottom: var(--space-2);
    }

    .exp-card__name {
      font-size: var(--text-lg);
      
      @include mobile {
        font-size: var(--text-base);
      }
    }

    .exp-card__role {
      font-size: var(--text-sm);
      
      @include mobile {
        font-size: var(--text-xs);
      }
    }

    .exp-card__period {
      font-size: var(--text-xs);
    }
  }

  &--full {
    padding: var(--space-6);
    min-height: 300px;
    width: 100%;
    border: none;

    @include mobile {
      padding: var(--space-5);
    }

    &:hover {
      // background: var(--color-surface-2);
      // border-color: var(--color-primary);
      // transform: translateY(-2px);
      // box-shadow: 0 4px 12px var(--color-shadow);
    }

    .exp-card__header {
      margin-bottom: var(--space-4);
      border-bottom: 1px solid var(--color-divider);
      padding-bottom: var(--space-4);
    }
  }

  &__company {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-2);
  }

  &__name {
    font-family: var(--font-title);
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);

    @include mobile {
      font-size: var(--text-lg);
    }
  }

  &__link {
    color: var(--color-text-muted);
    transition: color 0.2s ease;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--color-primary);
    }

    // svg {
    //   width: 16px;
    //   height: 16px;
    // }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-bottom: var(--space-2);
  }

  &__role {
    font-family: var(--font-body);
    font-size: var(--text-base);
    font-weight: var(--font-medium);
    color: var(--color-text-secondary);

    @include mobile {
      font-size: var(--text-sm);
    }
  }

  &__divider {
    color: var(--color-text-muted);
    user-select: none;

    @include mobile {
      display: none;
    }
  }

  &__location {
    font-family: var(--font-body);
    font-size: var(--text-base);
    color: var(--color-text-muted);

    @include mobile {
      font-size: var(--text-sm);
      width: 100%;
    }
  }

  &__period {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    display: block;
  }

  &__description {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);
    margin-bottom: var(--space-4);

    @include mobile {
      font-size: var(--text-sm);
      line-height: var(--leading-normal);
    }
  }

  &__achievements {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    li {
      font-family: var(--font-body);
      font-size: var(--text-base);
      line-height: var(--leading-relaxed);
      color: var(--color-text-secondary);
      padding-left: var(--space-5);
      position: relative;

      @include mobile {
        font-size: var(--text-sm);
        line-height: var(--leading-normal);
      }

      &::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--color-primary);
        font-weight: var(--font-bold);
      }
    }
  }

  &__compact-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    padding: var(--space-2);
    color: var(--color-text-muted);
    font-size: var(--text-sm);
    font-family: var(--font-body);
    border-top: 1px solid var(--color-divider);
    margin-top: auto; /* Push to bottom */
    opacity: 0.7;
    transition: opacity 0.2s ease;

    svg {
      width: 16px;
      height: 16px;
    }

    .exp-card--compact:hover & {
      opacity: 1;
    }
  }
}
</style>