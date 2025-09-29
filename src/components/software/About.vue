<template>
  <PageSection class="about" variant="default" spacing="normal">
    <template #header>
      <h2 id="about-title" class="about__title">
        <Transition name="slide-fade" mode="out-in">
          <span :key="isTldr.toString()">{{ isTldr ? 'I am ..' : 'About' }}</span>
        </Transition>
      </h2>
      <div class="about__controls">
        <button 
          class="btn" 
          :class="{ 'btn--active': isTldr }" 
          @click="toggleTldr"
          aria-label="Toggle summary view"
        >
          <span>TL;DR</span>
          <span>:)</span>
        </button>
      </div>
    </template>

    <div class="about__content" :class="{ 'about__content--active': isTldr }">
      <p v-for="(text, idx) in displayContent" :key="idx">
        <span v-html="text" />
      </p>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import PageSection from '@/components/page/Section.vue'

const isTldr = ref(false)

const paragraphSources = [
  `Hi! I'm Wade, [passionate] about building and fueled by a [curious] tic to understand how and why things work.`,
  
  `My tech story began as a [PC enthusiast] in the 56k dial-up era, when 128MB of RAM was luxurious and "your system is running low on virtual memory" was a daily notification. 
  This early fascination led me to build PCs and eventually to code, turning curiosity into a career.`,
  
  `Professionally, I work full-stack but gravitate toward the frontend, a medium for expression as much as a technology. 
  The mentor side of me enjoys [crafting] [experiences] that connect people to [ideas] in clear and engaging ways.`,
  
  `I'm energized by [innovation] in every form, and especially [inspired] by spatial computing. 
  I dream of one day stepping into the metaverse, as imagined by Neal Stephenson; we're laying the groundwork today for tomorrow's technologies.`
]

const tldrPhrases = [
  `[passionate] & [curious] ..`,
  `a [PC enthusiast] ..`,
  `crafting [experiences] & [ideas] ..`,
  `[inspired] by [innovation] ..`
]

const paragraphWords = ref<string[][]>([])
const animationTimers = ref<number[]>([])
const glowSequenceTimer = ref<number | null>(null)
const activeGlowIndex = ref<number>(-1)
const showTldr = ref(false)

onMounted(() => {
  resetContent()
})

onUnmounted(() => {
  clearAllTimers()
})

const toggleTldr = () => {
  if (!isTldr.value) {
    isTldr.value = true
    startTldrAnimation()
  } else {
    isTldr.value = false
    showTldr.value = false
    activeGlowIndex.value = -1
    resetContent()
  }
}

function resetContent() {
  clearAllTimers()
  paragraphWords.value = paragraphSources.map(src => src.split(' '))
}

function clearAllTimers() {
  animationTimers.value.forEach(timer => clearInterval(timer))
  animationTimers.value = []
  if (glowSequenceTimer.value) {
    clearInterval(glowSequenceTimer.value)
  }
  glowSequenceTimer.value = null
}

function startTldrAnimation() {
  clearAllTimers()

  // Animate word removal
  paragraphWords.value.forEach((words, paragraphIndex) => {
    const baseTime = 1000
    const targetDuration = baseTime
    const wordsToRemove = words.filter(w => !isHighlighted(w)).length

    if (wordsToRemove === 0) return

    const interval = targetDuration / wordsToRemove

    const timer = window.setInterval(() => {
      removeNextNonHighlightedWord(paragraphIndex)
    }, interval)

    animationTimers.value.push(timer)
  })

  // After animation completes, show TL;DR and start glow
  setTimeout(() => {
    showTldr.value = true
    startGlowSequence()
  }, 1000)
}

function isHighlighted(word: string): boolean {
  return word.includes('[') || word.includes(']')
}

function removeNextNonHighlightedWord(paragraphIndex: number) {
  const words = paragraphWords.value[paragraphIndex]
  const indexToRemove = words.findIndex(word => !isHighlighted(word))

  if (indexToRemove !== -1) {
    const newWords = [...words]
    newWords.splice(indexToRemove, 1)
    paragraphWords.value[paragraphIndex] = newWords
  } else {
    if (animationTimers.value[paragraphIndex]) {
      clearInterval(animationTimers.value[paragraphIndex])
    }
  }
}

function startGlowSequence() {
  const totalHighlights = tldrPhrases.reduce((count, phrase) => {
    const matches = phrase.match(/\[([^\]]+)\]/g)
    return count + (matches ? matches.length : 0)
  }, 0)

  if (totalHighlights === 0) return

  let currentHighlight = 0

  const cycleGlow = () => {
    activeGlowIndex.value = currentHighlight
    currentHighlight = (currentHighlight + 1) % totalHighlights
  }

  // immediate & cycle
  cycleGlow()
  glowSequenceTimer.value = window.setInterval(cycleGlow, 1200)
}

function processWordsForDisplay(words: string[]): string {
  return words.map(word => {
    if (word.includes('[') || word.includes(']')) {
      const cleanWord = word.replace(/[\[\]]/g, '')
      return `<span class="highlight">${cleanWord}</span>`
    }
    return word
  }).join(' ')
}

function processTldrForDisplay(phrase: string, paragraphIndex: number): string {
  let localIndex = 0
  let globalOffset = 0
  for (let i = 0; i < paragraphIndex; i++) {
    const matches = tldrPhrases[i].match(/\[([^\]]+)\]/g)
    globalOffset += matches ? matches.length : 0
  }

  return phrase.replace(/\[([^\]]+)\]/g, (match, word) => {
    const globalIndex = globalOffset + localIndex
    const isGlowing = globalIndex === activeGlowIndex.value
    localIndex++
    return `<span class="highlight ${isGlowing ? 'highlight--glow' : ''}">${word}</span>`
  })
}

const displayContent = computed(() => {
  if (showTldr.value) {
    // TL;DR phrases
    return tldrPhrases.map((phrase, idx) => processTldrForDisplay(phrase, idx))
  } else {
    return paragraphWords.value.map(words => processWordsForDisplay(words))
  }
})
</script>

<style scoped lang="scss">
.about {
  &__header {
    position: relative;
    // max-width: 1200px;
  }

  &__title {
    transition: all 0.3s ease;

    span {
      display: inline-block;
    }

    .slide-fade-enter-active,
    .slide-fade-leave-active {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .slide-fade-enter-from {
      opacity: 0;
      transform: translateY(-10px);
    }

    .slide-fade-leave-to {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  &__content {
    user-select: none;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 var(--space-8);
    
    @include mobile {
      padding: 0;
    }

    &--active {
      @include tablet {
        text-align: center;
      }

      @include mobile {
        height: 60dvh;
        overflow: hidden;
        width: fit-content;
        margin: auto;
        & p {
          font-size: var(--text-xl) !important;
        }
      }
    }

    p {
      font-family: var(--font-body);
      font-size: var(--text-lg);
      line-height: var(--leading-body);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-4);
      min-height: 1.5em;
      transition: opacity 0.3s ease;

      @include mobile {
        font-size: var(--text-sm);
        line-height: var(--leading-relaxed);
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(.highlight) {
      font-weight: var(--font-semibold);
      color: var(--color-accent);
      transition: all 0.3s ease;
      display: inline-block;

      &.highlight--glow {
        animation: glow 1.2s ease-in;
      }
    }
  }

  &__controls {
    perspective: 100cm;
    position: absolute;
    right: 0;
    top: var(--space-8);

    .btn {
      display: block;
      background-color: transparent;
      border: transparent;
      width: 80px;
      height: 30px;
      cursor: sw-resize;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      font-family: var(--font-fira);
      font-size: var(--text-lg);
      font-weight: var(--font-medium);

      &--active {
        cursor:col-resize;
      }
      
      @include mobile {
        transform: scale(var(--scale));
        font-size: var(--text-xl);
      }

      span {
        color: var(--color-accent);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        box-shadow: var(--box-shadow-in);
        border-radius: var(--radius-sm);
        transition: all .4s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span:nth-child(2) {
        transform: rotateX(90deg);
        transform-origin: 50% 50% -15px;
        background-color: var(--color-surface-1);
      }

      span:nth-child(1) {
        background-color: var(--color-surface-2);
        transform: rotateX(0deg);
        transform-origin: 50% 50% -15px;
      }

      &.btn--active span:nth-child(2) {
        transform: rotateX(0deg);
      }

      &.btn--active span:nth-child(1) {
        transform: rotateX(-90deg);
      }
    }
  }
}

@keyframes glow {
  0%,
  100% {
    transform: scale(1);
    filter: brightness(1);
  }

  50% {
    transform: scale(1.05);
    filter: brightness(1.1) contrast(200%) drop-shadow(0 0 12px var(--color-accent));
  }
}
</style>