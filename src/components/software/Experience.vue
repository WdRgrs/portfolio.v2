<template>
  <PageSection class="experience">
    <template #header>
      <h2 class="experience__title">Experience</h2>
    </template>

    <div class="experience__container">
      <!-- Bottom layer: Full width code blocks -->
      <div class="experience__layer experience__layer--code">
        <div class="experience__stream" @mouseenter="pauseAll" @mouseleave="resumeAll">
          <div ref="codeTrackRef" class="experience__track" :class="{'experience__track--paused': isPaused}">
            <div
              v-for="(job, i) in duplicatedJobs"
              :key="`code-${job.company}-${i}`"
              class="experience__cell"
            >
              <div class="experience__code">{{ buildCode() }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Top layer: Narrower cards container -->
      <div class="experience__layer experience__layer--cards">
        <div class="experience__stream" @mouseenter="pauseAll" @mouseleave="resumeAll">
          <div ref="cardTrackRef" class="experience__track" :class="{'experience__track--paused': isPaused}">
            <div
              v-for="(job, i) in duplicatedJobs"
              :key="`card-${job.company}-${i}`"
              class="experience__cell"
            >
              <ExperienceCard
                class="experience__card"
                :experience="job"
                :is-compact="true"
                @click="selectCard(job)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Expanded card Modal -->
      <Transition name="modal">
        <div v-if="selectedJob" class="experience__modal">
          <div class="experience__modal__full-card">
            <button class="experience__modal__close-btn" @click="closeFull" aria-label="Close full card view">×</button>
            <ExperienceCard :experience="selectedJob" :is-compact="false" />
          </div>
          
          <div class="experience__modal__actions">
            <button class="experience__modal__actions__btn" @click="decrementJob"><</button>
            <button class="experience__modal__actions__btn" @click="incrementJob">></button>
          </div>
        </div>
      </Transition>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageSection from '@/components/page/Section.vue'
import ExperienceCard from '@/components/software/ExperienceCard.vue'

interface ExperienceCardData {
  company: string
  role: string
  location: string
  period: string
  description: string
  achievements: string[]
  logo?: string
  website?: string
}

const isPaused = ref(false)

const selectedJob = ref<ExperienceCardData | null>(null)
const duplicatedJobs = computed(() => [...jobs, ...jobs, ...jobs])

function selectCard(job: ExperienceCardData) {
  selectedJob.value = job
  pauseAll()
}

function closeFull() {
  selectedJob.value = null
  resumeAll()
}

function pauseAll() {
  isPaused.value = true
}

function resumeAll() {
  if (!selectedJob.value) {
    isPaused.value = false
  }
}

function incrementJob() {
  const idx = jobs.findIndex(job => selectedJob.value?.company == job.company)
  selectedJob.value = jobs[idx + 1] ?? jobs[0]
}

function decrementJob() {
  const idx = jobs.findIndex(job => selectedJob.value?.company == job.company)
  selectedJob.value = jobs[idx - 1] ?? jobs[jobs.length - 1]

}

const jobs: ExperienceCardData[] = [
  {
    company: 'Hinkle Inspection and Testing',
    role: 'Lead Product Engineer and UX',
    location: 'Austin, TX',
    period: 'Sep 2025 - Present',
    description: 'Planned, designed, and shipped a modern digital presence for a Certified Welding Inspector to drive quote requests and establish credibility.',
    achievements: [
      'Drove discovery and created decision matrices for framework, hosting, images, and quote flow',
      'Planned architecture and shipped a production-ready single-page site end to end',
      'Designed responsive UI/UX focused on service clarity and client conversion',
      'Built a Vue 3 + Vite SPA in TypeScript, no backend dependency',
      'Implemented a quote workflow with mailto fallback, hosted form, and serverless adapter',
      'Delivered accessibility checks, SEO metadata, Open Graph, LocalBusiness schema, and GitHub Pages CI with custom domain and HTTPS'
    ],
    website: 'https://www.hinkletesting.com'
  },
  {
    company: 'Rhodium Enterprises LLC',
    role: 'Software Engineer',
    location: 'Rockdale, TX (remote)',
    period: 'Dec 2022 - May 2025',
    description: 'Rhodium is a vertically integrated, Texas-based Bitcoin mining company pioneering energy-efficient, high-density mining through proprietary liquid-cooled infrastructure.',
    achievements: [
      'Led frontend architecture and UX/UI design across multiple internal dashboards, emphasizing modularity and scalability',
      'Optimized data handling through selective parsing and caching, reducing dataset size from 70MB to 2MB',
      'Implemented real-time systems using WebSockets for event tracking and state updates',
      'Built robust CRUD systems and managed workflows end-to-end from design to deployment'
    ],
    website: 'https://www.rhdm.com'
  },
  {
    company: 'NextIQ',
    role: 'Software Developer',
    location: 'Austin, TX',
    period: 'Feb 2022 - Sep 2022',
    description: 'NextIQ is a startup platform educating individuals and companies in the renewable energy sector through video content and tutorials from industry leaders.',
    achievements: [
      'Created and maintained website pages, components and user workflows',
      'Curated analytics and metrics of user activity to guide data-driven decisions',
      'Ensured responsive design across all device dimensions',
      'Implemented QA processes and collaborated across departments to eliminate bugs'
    ],
    website: 'https://www.nextiq.com'
  },
  {
    company: 'DevMountain',
    role: 'Full Stack Student Developer',
    location: 'Lehi, UT (remote)',
    period: 'May 2021 - Sep 2021',
    description: 'Intensive full-stack development bootcamp certification program.',
    achievements: [
      'Completed comprehensive curriculum covering frontend and backend technologies',
      'Built full-stack applications using modern web development frameworks',
      'Developed and recognized for collaborative coding and project management skills'
    ]
  }
]

function buildCode(): string {
  return `<ExperienceCard
  class="experience__card"
  v-for="(job, index) in duplicatedJobs"
  :key="\`\${job.company}-\${index}\`"
  :experience="job"
  :is-compact="true"
  @click="selectCard(job, index)"
/>`;
}
</script>

<style scoped lang="scss">
.experience {
  overflow-x: clip;
  
  &__container {
    position: relative;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  &__layer {
    position: relative;
    width: 100%;
    height: var(--exp-card-height);
    display: flex;
    justify-content: center;
    align-items: center;

    &--code {
      position: relative;
      -webkit-mask-image: linear-gradient(
        90deg, 
        transparent 0%, 
        black 3%, 
        black 97%, 
        transparent 100%
      );
      mask-image: linear-gradient(
        90deg, 
        transparent 0%, 
        black 5%, 
        black 95%, 
        transparent 100%
      );
      @include mobile {
        mask-image: none;
      }
    }
      
    &--cards {
      position: absolute;
      // top: 0;
      // left: 50%;
      // transform: translateX(-50%);
      
      -webkit-mask-image: linear-gradient(
        90deg,
        transparent 12%,
        black 15%,
        black 85%,
        transparent 89%,
      );
      mask-image: linear-gradient(
        90deg,
        transparent 17%,
        black 20%,
        black 80%,
        transparent 83%,
      );
      @include mobile {
        mask-image: linear-gradient(
          90deg,
          transparent 10%,
          black 15%,
          black 85%,
          transparent 90%,
        );
      }
    }
  }

  &__stream {
    position: relative;
    width: 100%;
    height: 100%;
  }

  &__track {
    position: absolute;
    display: flex;
    gap: var(--exp-gap);
    animation: expScroll 30s linear infinite;
    will-change: transform;
    &--paused {
      animation-play-state: paused;
    }
  }

  @keyframes expScroll {
    0% {
      transform:  translateX(0%);
    }
    100% {
      /* 3 copies = 33% movement - .8 seems to be the magic number for no hickup */
      transform:  translateX(calc(-33.8%));
    }
  }

  &__cell {
    flex: 0 0 var(--exp-card-width);
    height: calc(var(--exp-card-height));
    display: grid;
    place-items: center;
  }

  &__code {
    width: 100%;
    height: 100%;
    border: 2px solid transparent;
    border-radius: var(--radius-lg);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    line-height: var(--leading-normal);
    color: var(--color-text-muted);
    white-space: pre;
    overflow: hidden;
    user-select: none;
    opacity: 0.6;
  }

  &__card {
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
      filter: brightness(1.2);
    }
  }

  /* Expanded card */
  &__modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    backdrop-filter: blur(2px) contrast(90%) brightness(50%);
    z-index: var(--z-modal-backdrop);


    &__full-card {
      position: relative;
      padding: var(--space-6);
      margin: var(--space-6);
      background: var(--color-surface-1);
      border-radius: var(--radius-lg);
      border: 1px solid var(--color-border);
      animation: slideDown 0.3s ease-out;
      max-width: 900px;

      @include mobile {
        border-radius: var(--radius-md);
        padding: var(--space-4);
        margin: auto var(--space-2);
        overflow-y: auto;
      }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    &__close-btn {
      position: absolute;
      top: var(--space-4);
      right: var(--space-4);
      background: transparent;
      border: none;
      font-size: var(--text-2xl);
      color: var(--color-text-muted);
      cursor: pointer;
      width: 32px;
      height: 32px;
      display: grid;
      place-items: center;
      border-radius: var(--radius-sm);
      transition: all 0.2s ease;

      &:hover {
        background: var(--color-surface-2);
        color: var(--color-text);
      }
    }

    &__actions {
      display: flex;
      flex-direction: row;
      gap: var(--space-6);
      height: 30dvh;
      margin-top: var(--space-6);

      @include tablet {
        height: 20dvh;
      }
      @include mobile {
        height: 10dvh;
      }

      &__btn{
        width: 90px;
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
        background-color: var(--color-surface-2);
        height: 40px;
        font-size: var(--text-2xl);
        font-family: var(--font-fira);
        color: var(--color-text-muted);
        opacity: .8;

        &:active {
          filter: contrast(.85);
          transform: scale(.95);
        }
      }
    }
  }

  .modal-enter-active, 
  .modal-leave-active {
    transition: all 0.3s ease-out;
  }

  .modal-enter-from, .modal-leave-to {
    backdrop-filter: blur(0px) contrast(100%) brightness(100%);
    opacity: 0;
  }

  .modal-enter-to, .modal-leave-from {
    backdrop-filter: blur(2px) contrast(90%) brightness(50%);
    opacity: 1;
  }
}
</style>