<template>
  <section class="photo-hero">
    <div class="photo-hero__video-container">
      <video
        ref="videoRef"
        class="photo-hero__video"
        :src="getAssetUrl(heroVideo.path)"
        :poster="heroVideo.poster ? getAssetUrl(heroVideo.poster) : undefined"
        autoplay
        loop
        muted
        playsinline
        preload="metadata"
        @loadeddata="handleVideoLoad"
      />
      
      <!-- Overlay gradient for text readability -->
      <div class="photo-hero__overlay"></div>
    </div>

    <div class="photo-hero__content">
      <h1 class="photo-hero__title">{{ heroVideo.title }}</h1>
      
      <blockquote v-if="quote" class="photo-hero__quote">
        <p class="photo-hero__quote-text">{{ quote.text }}</p>
        <cite v-if="quote.author" class="photo-hero__quote-author">
          — {{ quote.author }}
        </cite>
      </blockquote>

      <p v-if="heroVideo.description" class="photo-hero__description">
        {{ heroVideo.description }}
      </p>
    </div>

    <!-- Scroll indicator -->
    <div class="photo-hero__scroll-indicator">
      <span class="photo-hero__scroll-text">Explore</span>
      <svg class="photo-hero__scroll-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M12 5v14M19 12l-7 7-7-7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { getAssetUrl } from '@/utils/assets'
import { PHOTOGRAPHY_VIDEOS } from '@/assets/photography'

interface Quote {
  text: string
  author?: string
}

const props = defineProps<{
  quote?: Quote
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const isVideoLoaded = ref(false)

// Use first video as hero - can be made configurable
const heroVideo = PHOTOGRAPHY_VIDEOS[0]

const handleVideoLoad = () => {
  isVideoLoaded.value = true
}

// Pause video on reduced motion preference
onMounted(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion && videoRef.value) {
    videoRef.value.pause()
  }
})

// Cleanup
onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.src = ''
  }
})
</script>

<style scoped lang="scss">
.photo-hero {
  position: relative;
  width: 100%;
  margin-top: calc(var(--nav-bar-height) * -1);
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &__video-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  &__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.4) 100%
    );
    z-index: 1;
  }

  &__content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: var(--space-8);
    text-align: center;
    color: var(--color-text-inverse);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);

    @include mobile {
      padding: var(--space-5);
      max-width: 90%;
    }
  }

  &__title {
    font-family: var(--font-title);
    font-size: var(--text-5xl);
    font-weight: var(--font-bold);
    margin-bottom: var(--space-6);
    letter-spacing: -0.02em;

    @include mobile {
      font-size: var(--text-3xl);
      margin-bottom: var(--space-4);
    }
  }

  &__quote {
    margin: var(--space-6) 0;
    padding: var(--space-4);
    border-left: 3px solid var(--color-text-inverse);
    font-style: italic;

    @include mobile {
      margin: var(--space-4) 0;
    }
  }

  &__quote-text {
    font-family: var(--font-body);
    font-size: var(--text-xl);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--space-3);

    @include mobile {
      font-size: var(--text-lg);
    }
  }

  &__quote-author {
    display: block;
    font-family: var(--font-ui);
    font-size: var(--text-base);
    font-style: normal;
    opacity: 0.9;
  }

  &__description {
    font-family: var(--font-body);
    font-size: var(--text-lg);
    line-height: var(--leading-relaxed);
    opacity: 0.95;
    margin-top: var(--space-4);

    @include mobile {
      font-size: var(--text-base);
    }
  }

  &__scroll-indicator {
    position: absolute;
    bottom: var(--space-8);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
    color: var(--color-text-inverse);
    animation: bounce 2s infinite;
    cursor: pointer;

    @include mobile {
      bottom: var(--space-5);
    }
  }

  &__scroll-text {
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.8;
  }

  &__scroll-arrow {
    width: 24px;
    height: 24px;
    opacity: 0.8;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-10px);
    }
    60% {
      transform: translateX(-50%) translateY(-5px);
    }
  }
}

// Respect reduced motion
@media (prefers-reduced-motion: reduce) {
  .photo-hero {
    &__scroll-indicator {
      animation: none;
    }
  }
}
</style>