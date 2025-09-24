<template>
  <PageSection class="experience">
    <template #header>
      <h2 class="experience__title">Experience</h2>
    </template>

    <div class="experience__container">
      <div class="experience__stream">
        <div class="experience__card-line experience__card-line--animation" >
          <ExperienceCard
            class="experience__card"
            v-for="(job, index) in jobs"
            :key="index"
            :experience="job"
            />
        </div>
      </div>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
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
    role: 'Full Stack Web Development',
    location: 'Lehi, UT',
    period: 'Sep 2021',
    description: 'Intensive full-stack development bootcamp certification program.',
    achievements: [
      'Completed comprehensive curriculum covering frontend and backend technologies',
      'Built full-stack applications using modern web development frameworks',
      'Developed collaborative coding and project management skills'
    ]
  }
]
</script>

<style scoped lang="scss">
.experience {
  &__title {
    // Uses PageSection header styles
  }

  &__container {
    position: relative;
    
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    
    min-height: 300px;
    width: 100dvw;
    
    display: flex;
    align-items: center;
    // overflow: hidden;
    // border: 1px solid red;
    
    @include mobile {
    }
  }

  &__stream {
    // width: 100dvw;
    width: calc(100dvw -  var(--space-4));
    margin-left: calc(var(--space-4) / 2);
    position: relative;
    
    display: flex;
    align-items: center;
    gap: var(--space-8);
    overflow: visible;
    
    // border: 1px solid red;
  }

  &__card-line {
    display: flex;
    align-items: center;
    gap: 60px;
    white-space: nowrap;
    cursor: grab;
    user-select: none;
    will-change: transform;

    &.dragging,
    &:active {
      cursor: grabbing;
    }

    &--animation {
      animation: scrollCards 40s linear infinite;
    }

    @keyframes scrollCards {
      0% {
        transform: translateX(100dvw);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  }

  &__card {
    aspect-ratio: 16 / 9;
    height: 350px;
  }
}
</style>