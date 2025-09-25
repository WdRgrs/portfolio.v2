<template>
  <PageSection class="experience">
    <template #header>
      <h2 class="experience__title">Experience</h2>
    </template>

    <div class="experience__container">
      
      <!-- Bottom layer: Full width code blocks -->
      <div class="experience__layer experience__layer--code">
        <div class="experience__stream" @mouseenter="pauseAll" @mouseleave="resumeAll">
          <div ref="codeTrackRef" class="experience__track">
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
          <div ref="cardTrackRef" class="experience__track">
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

      <!-- Expanded card -->
      <div v-if="selectedJob" class="experience__full-card">
        <button class="experience__close-btn" @click="closeFull" aria-label="Close full card view">×</button>
        <ExperienceCard :experience="selectedJob" :is-compact="false" />
      </div>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import PageSection from '@/components/page/Section.vue'
import ExperienceCard from '@/components/app/Card.vue'

interface Experience {
  company: string
  role: string
  location: string
  period: string
  description: string
  achievements: string[]
  logo?: string
  website?: string
}

const jobs: Experience[] = [
  {
    company: 'Hinkle Inspection',
    role: 'Full Stack Developer',
    location: 'Austin, TX',
    period: 'Sept 2025 - Present',
    description: 'Designed and developed a modern digital presence for a professional inspection services company, serving as their primary business card and client portal.',
    achievements: [
      'Architected and implemented complete web solution from concept to deployment',
      'Conducted comprehensive requirements gathering and stakeholder interviews',
      'Designed responsive UI/UX focused on service showcase and client conversion',
      'Managed full project lifecycle including research, design, development, and deployment'
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

const selectedJob = ref<Experience | null>(null)
// Create 4 copies for smoother infinite scroll
const duplicatedJobs = computed(() => [...jobs, ...jobs, ...jobs])

const codeTrackRef = ref<HTMLElement | null>(null)
const cardTrackRef = ref<HTMLElement | null>(null)

// Build code block content
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

function selectCard(job: Experience) {
  selectedJob.value = job
  pauseAll()
}

function closeFull() {
  selectedJob.value = null
  resumeAll()
}

function pauseAll() {
  pauseTrack(codeTrackRef.value)
  pauseTrack(cardTrackRef.value)
}

function resumeAll() {
  resumeTrack(codeTrackRef.value)
  resumeTrack(cardTrackRef.value)
}

function pauseTrack(track: HTMLElement | null) {
  if (!track) return
  const computedStyle = getComputedStyle(track)
  const matrix = computedStyle.transform
  if (matrix && matrix !== 'none') {
    track.style.transform = matrix
  }
  track.style.animationPlayState = 'paused'
}

function resumeTrack(track: HTMLElement | null) {
  if (!track) return
  track.style.transform = ''
  track.style.animationPlayState = 'running'
}
</script>

<style scoped lang="scss">
.experience {
  --exp-card-width: 280px;
  --exp-card-height: 160px;
  --exp-gap: 60px;
  --cards-visible-width: 80%;
  overflow-x: clip;
  
  &__container {
    border: 1px solid red;
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
    height: calc(var(--exp-card-height) + 40px);
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
      }
      
    &--cards {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      
      -webkit-mask-image: linear-gradient(
        90deg,
        transparent 0%,
        transparent 12%,
        black 15%,
        black 85%,
        transparent 89%,
        transparent 100%
      );
      mask-image: linear-gradient(
        90deg,
        transparent 0%,
        transparent 17%,
        black 20%,
        black 80%,
        transparent 83%,
        transparent 100%
      );
    }
  }

  &__stream {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__track {
    position: absolute;
    display: flex;
    gap: var(--exp-gap);
    animation: expScroll 40s linear infinite;
    will-change: transform;
  }

  @keyframes expScroll {
    0% {
      // transform: translateY(-50%);
      transform:  translateX(0%);
    }
    100% {
      /* 4 copies = 25% movement */
      // transform: translateY(-50%) translateX(-25%);
      transform:  translateX(calc(1/3 * -100%));
    }
  }

  &__cell {
    flex: 0 0 var(--exp-card-width);
    height: var(--exp-card-height);
    display: grid;
    place-items: center;
  }

  /* Code blocks styling */
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

  /* Card styling */
  &__card {
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 12px var(--color-shadow);
    }
  }

  /* Expanded card */
  &__full-card {
    position: relative;
    width: 100%;
    max-width: 800px;
    margin-top: var(--space-8);
    padding: var(--space-6);
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    animation: slideDown 0.3s ease-out;
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

  @media (prefers-reduced-motion: reduce) {
    &__track {
      animation: none;
    }
  }

  @include mobile {
    --exp-card-width: 240px;
    --exp-card-height: 140px;
    --exp-gap: 40px;
    --cards-visible-width: 60%;

    &__code {
      font-size: 10px;
    }
  }
}
</style>