<template>
  <PageSection
    class="about"
    variant="default"
    spacing="normal"
  >
    <template #header>
      <div class="about__header">
        <h2 id="about-title" class="about__title">About</h2>
        
        <div class="about__controls">
          <button 
            class="btn-12"
            :class="{ 'btn-12--active': isTldr }"
            @mouseenter="handleTldr"
            @mouseleave="handleTldrEnd"
            @touchstart.prevent="handleTldr"
            @touchend="handleTldrEnd"
            @touchcancel="handleTldrEnd"
          >
            <span>TL:DR</span>
            <span>:)</span>
          </button>
        </div>
      </div>
    </template>
    <div class="about__content">
      <p v-for="(text, idx) in content" :key="idx" v-html="text"/>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PageSection from '@/components/page/Section.vue'

const isTldr = ref(false)
const handleTldr = () => {
  isTldr.value = true
}

const handleTldrEnd = () => {
  // Small delay to allow for visual feedback
  setTimeout(() => {
    isTldr.value = false
  }, 150)
}


const timerId = ref<number | null>(null)

/** Paragraph source strings */
const p1Src = `Hi! I'm Wade and my [passion] to build is fueled by a [curiosity] to understand how and why things work.`
const p2Src = `My tech story began as a PC game enthusiast in the 56k dial-up era, when 128MB of RAM was luxurious and "your system is running low on virtual memory" was a daily notification. This early [fascination] led me to build PCs and eventually to code, turning curiosity into a career.`
const p3Src = `Professionally, I work full-stack but gravitate toward frontend as a medium for [expression] as much as a technology. The mentor side of me enjoys [crafting] [exepriences] that connect people to [ideas] in clear and engaging ways.`
const p4Src = `I'm energized by [innovation] in every form, and especially [inspired] by spatial computing. The idea of one day stepping into a true metaverse, as imagined by Neal Stephenson, reminds me that we're laying the groundwork now for technologies that will shape generations to come.`


const content = computed(() => {
  const srcs = [p1Src, p2Src, p3Src, p4Src]


  
  return srcs.map(p => highlightWords(p).join(" "))
})

const highlightWords = (str: string) => {
  const words = str.split(' ')
  let processedWords: string[] = []
  
  words.forEach((word, idx) => {
  // Check if word is marked for highlighting
    if (word.startsWith('[') && word.endsWith(']')) {
      const highlightedWord = word.slice(1, -1)
      processedWords.push(`<span class="highlight">${highlightedWord}</span>`)
    } else {
      processedWords.push(word)
    }
  })

  return processedWords
}
</script>

<style scoped lang="scss">
.about {
  &__header {
    position: relative;
  }

  &__title {
    font-family: var(--font-fredericka);
    font-size: var(--text-3xl);

    @include mobile {
      text-align: center;
    }
  }
  
  &__content {
    max-width: 1000px;
    margin: 0 auto;
    
    p {
      font-family: var(--font-body);
      font-size: var(--text-base);
      line-height: var(--leading-body);
      color: var(--color-text-secondary);
      margin-bottom: var(--space-4);
      
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
    }
  }
  
  &__controls {
    perspective: 100cm;
    perspective: none;
    position: absolute;
    right: 0;
    top: 0;

    .btn-12 {
      background-color: transparent;
      border: transparent;
      width: 80px;
      height: 30px;
      cursor: sw-resize;
      user-select: none;
      -webkit-tap-highlight-color: transparent;

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
      }
      
      span:nth-child(1) {
        transform: rotateX(0deg);
        transform-origin: 50% 50% -15px;
      }
      
      &.btn-12--active span:nth-child(2) {
        transform: rotateX(0deg);
      }
      
      &.btn-12--active span:nth-child(1) {
        transform: rotateX(-90deg);
      }
    }
  }
}
</style>