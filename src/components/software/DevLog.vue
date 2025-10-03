<template>
  <PageSection class="devlog">
    <template #header>
      <h2 class="devlog__title">Dev<span>.</span>Log<span>()</span></h2>
      <div class="devlog__controls">
        <button 
          class="devlog__filter-btn"
          :class="{ 'devlog__filter-btn--active': filterType === 'all' }"
          @click="filterType = 'all'"
        >
          All
        </button>
        <button 
          class="devlog__filter-btn"
          :class="{ 'devlog__filter-btn--active': filterType === 'feature' }"
          @click="filterType = 'feature'"
        >
          Features
        </button>
        <button 
          class="devlog__filter-btn"
          :class="{ 'devlog__filter-btn--active': filterType === 'learning' }"
          @click="filterType = 'learning'"
        >
          Learning
        </button>
        <button 
          class="devlog__filter-btn"
          :class="{ 'devlog__filter-btn--active': filterType === 'thoughts' }"
          @click="filterType = 'thoughts'"
        >
          Thoughts
        </button>
      </div>
    </template>

    <div class="devlog__container">
      <TransitionGroup name="accordion-list">
        <div
          v-for="(entry, idx) in filteredEntries"
          :key="entry.id"
          class="devlog__entry"
          :class="{ 
            'devlog__entry--expanded': expandedItems.has(entry.id),
            [`devlog__entry--${entry.type}`]: true
          }"
        >
          <!-- Entry Header (Always Visible) -->
          <div 
            class="devlog__entry-header"
            @click="toggleEntry(entry.id)"
          >
            <div class="devlog__entry-left">
              <span class="devlog__entry-icon">{{ getIcon(entry.type) }}</span>
              <div class="devlog__entry-meta">
                <h3 class="devlog__entry-title">{{ entry.title }}</h3>
                <div class="devlog__entry-info">
                  <span class="devlog__entry-date">{{ formatDate(entry.date) }}</span>
                  <span class="devlog__entry-separator">•</span>
                  <span class="devlog__entry-readtime">{{ entry.readTime }} min read</span>
                </div>
              </div>
            </div>
            
            <div class="devlog__entry-right">
              <div class="devlog__entry-tags">
                <span 
                  v-for="tag in entry.tags.slice(0, 3)" 
                  :key="tag"
                  class="devlog__entry-tag"
                >
                  {{ tag }}
                </span>
              </div>
              <button class="devlog__entry-toggle">
                <span class="devlog__entry-arrow"></span>
              </button>
            </div>
          </div>

          <!-- Entry Content (Expandable) -->
          <Transition name="accordion">
            <div 
              v-if="expandedItems.has(entry.id)"
              class="devlog__entry-content"
            >
              <div class="devlog__entry-body">
                <!-- Dynamic Component Loading Based on Entry Type -->
                <component 
                  :is="getContentComponent(entry.contentType)"
                  :data="entry"
                  :entry-id="entry.id"
                />
                
                <!-- Fallback for text content -->
                <div v-if="!entry.contentType || entry.contentType === 'text'" class="devlog__text-content">
                  <p>{{ entry.preview }}</p>
                  <div v-if="entry.content" v-html="entry.content"></div>
                </div>
              </div>

              <!-- Entry Footer -->
              <div class="devlog__entry-footer">
                <div class="devlog__entry-actions">
                  <button class="devlog__action-btn" @click="viewFullEntry(entry)">
                    <span>View Full Entry</span>
                    <span>→</span>
                  </button>
                  <button class="devlog__action-btn devlog__action-btn--secondary">
                    <span>{{ getSourceIcon(entry.source) }}</span>
                    <span>{{ entry.source }}</span>
                  </button>
                </div>
                <div class="devlog__entry-stats">
                  <span>{{ entry.stats?.commits || 0 }} commits</span>
                  <span>{{ entry.stats?.files || 0 }} files changed</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </TransitionGroup>

      <!-- Load More / Pagination -->
      <div v-if="hasMore" class="devlog__load-more">
        <button class="devlog__load-btn" @click="loadMore">
          <span v-if="!loading">Load More Entries</span>
          <span v-else>Loading...</span>
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="filteredEntries.length === 0" class="devlog__empty">
        <div class="devlog__empty-icon">📝</div>
        <p>No entries found for "{{ filterType }}"</p>
      </div>
    </div>
  </PageSection>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef } from 'vue'
import PageSection from '@/components/page/Section.vue'

interface DevLogEntry {
  id: string
  title: string
  date: string
  type: 'feature' | 'fix' | 'learning' | 'thoughts' | 'project'
  contentType?: 'text' | 'code' | 'terminal' | 'diagram' | 'custom'
  tags: string[]
  preview: string
  content?: string
  readTime: number
  source: 'github' | 'local' | 'blog' | 'itch'
  stats?: {
    commits?: number
    files?: number
    additions?: number
    deletions?: number
  }
  customComponent?: string // Name of custom component to load
}

// Sample entries - replace with your actual data source
const allEntries = ref<DevLogEntry[]>([
  {
    id: 'profile-migration-2025',
    title: 'Updating the Portfolio',
    date: '2024-04-15',
    type: 'fix',
    contentType: 'text',
    tags: ['Vue', 'Portfolio'],
    preview: 'This site is a work in progress. My old portfolio lives at v3.waderogers.dev, but it was time for a refresh.',
    content: `Kicked off a full rebuild of my portfolio with Vue 3. The goal is to improve structure, styling, and maintainability while setting up space for projects, photography, and a devlog.`,
    readTime: 1,
    source: 'github',
    stats: { commits: 23, files: 90, additions: 5470, deletions: 2198 }
  },
  {
    id: 'rust-game-2024',
    title: 'Building Alphabits in Rust',
    date: '2024-04-15',
    type: 'project',
    contentType: 'text',
    tags: ['Rust', 'WebAssembly', 'Game Dev'],
    preview: 'Experimenting with Rust and WebAssembly to create a cross-platform word puzzle game.',
    content: `Started work on Alphabits, a word puzzle game built entirely in Rust. The challenge was to design a performant engine that runs both natively and in the browser via WebAssembly. It uses procedural board generation, live dictionary validation, and multiple difficulty modes.`,
    readTime: 4,
    source: 'itch',
    stats: { commits: 47, files: 23, additions: 3420, deletions: 892 }
  },
  {
    id: 'pi-hole-2024',
    title: 'Running Pi-hole',
    date: '2024-12-30',
    type: 'feature',
    contentType: 'text',
    tags: ['Raspberry Pi', 'Networking', 'Ad-block'],
    preview: 'Set up Pi-hole to manage network-wide ad blocking and DNS filtering.',
    content: `Deployed Pi-hole on a Raspberry Pi to act as a local DNS sinkhole. It blocks ads, reduces tracking, and improves page load times across every device on my home network.`,
    readTime: 2,
    source: 'local',
    stats: { commits: 12, files: 8, additions: 640, deletions: 110 }
  }
])

const expandedItems = ref<Set<string>>(new Set())
const filterType = ref<'all' | 'feature' | 'learning' | 'thoughts'>('all')
const loading = ref(false)
const hasMore = ref(true)
const pageSize = 10
const currentPage = ref(1)

// Dynamic component registry
const componentMap = shallowRef<Record<string, any>>({
  // 'code': CodeLogEntry,
  // 'terminal': TerminalLogEntry,
  // 'diagram': DiagramLogEntry,
  // Add your custom components here
})

const filteredEntries = computed(() => {
  if (filterType.value === 'all') return allEntries.value
  return allEntries.value.filter(entry => entry.type === filterType.value)
})

function toggleEntry(id: string) {
  if (expandedItems.value.has(id)) {
    expandedItems.value.delete(id)
  } else {
    expandedItems.value.add(id)
  }
}

function getIcon(type: string): string {
  const icons: Record<string, string> = {
    feature: '✨',
    fix: '🔧',
    learning: '📚',
    thoughts: '💭',
    project: '🚀'
  }
  return icons[type] || '📝'
}

function getSourceIcon(source: string): string {
  const icons: Record<string, string> = {
    github: '⚡',
    local: '💾',
    blog: '📰',
    itch: '🎮',
  }
  return icons[source] || '📄'
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

function getContentComponent(contentType?: string) {
  if (!contentType || !componentMap.value[contentType]) {
    return null
  }
  return componentMap.value[contentType]
}

function viewFullEntry(entry: DevLogEntry) {
  // Implement full view logic - could be modal, route, or external link
}

function loadMore() {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    currentPage.value++
    // Load more entries...
    loading.value = false
    if (currentPage.value >= 3) hasMore.value = false
  }, 1000)
}
</script>

<style scoped lang="scss">
.devlog {
  &__title {
    span {
      letter-spacing: var(--space-3);
      color: var(--color-accent);
    }
  }

  &__controls {
    position: absolute;
    right: 0;
    top: var(--space-6);
    display: flex;
    gap: var(--space-2);

    @include mobile {
      position: static;
      margin-top: var(--space-4);
      justify-content: center;
    }
  }

  &__filter-btn {
    background: transparent;
    border: 1px solid var(--color-border);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-secondary);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--color-surface-1);
    }

    &--active {
      background: var(--color-surface-2);
      color: var(--color-primary);
      border-color: var(--color-primary);
    }
  }

  &__container {
    // border: 1px solid red;
    margin: 0 auto;
    max-width: var(--max-content-width);
    padding: 0 var(--space-6);

    @include mobile {
      padding: 0;
    }
  }

  &__entry {
    background: var(--color-surface-1);
    border-radius: var(--radius-lg);
    margin-bottom: var(--space-4);
    border: 1px solid var(--color-border);
    transition: all 0.3s ease;

    &--expanded {
      box-shadow: 0 4px 12px var(--color-shadow);
      
      .devlog__entry-arrow {
        transform: rotate(180deg);
      }
    }

    &--feature {
      border-left: 3px solid var(--color-success);
    }

    &--learning {
      border-left: 3px solid var(--color-info);
    }

    &--thoughts {
      border-left: 3px solid var(--color-accent);
    }

    &--project {
      border-left: 3px solid var(--color-warning);
    }
  }

  &__entry-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-4);
    cursor: pointer;
    user-select: none;

    @include mobile {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-3);
    }
  }

  &__entry-left {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    flex: 1;
  }

  &__entry-icon {
    font-size: var(--text-2xl);
    
    @include mobile {
      font-size: var(--text-xl);
    }
  }

  &__entry-meta {
    flex: 1;
  }

  &__entry-title {
    font-family: var(--font-title);
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    margin: 0 0 var(--space-2);
    color: var(--color-text);
  }

  &__entry-info {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  &__entry-separator {
    opacity: 0.5;
  }

  &__entry-right {
    display: flex;
    align-items: center;
    gap: var(--space-3);

    @include mobile {
      width: 100%;
      justify-content: space-between;
    }
  }

  &__entry-tags {
    display: flex;
    gap: var(--space-2);
  }

  &__entry-tag {
    background: var(--color-surface-2);
    padding: var(--space-1) var(--space-2);
    border-radius: var(--radius-sm);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--color-text-secondary);

    @include mobile {
      display: none;
      
      &:first-child {
        display: inline-block;
      }
    }
  }

  &__entry-toggle {
    background: transparent;
    border: none;
    padding: var(--space-2);
    cursor: pointer;
  }

  &__entry-arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid var(--color-text-secondary);
    transition: transform 0.3s ease;
  }

  &__entry-content {
    border-top: 1px solid var(--color-border);
  }

  &__entry-body {
    padding: var(--space-5);
    
    @include mobile {
      padding: var(--space-4);
    }
  }

  &__text-content {
    font-family: var(--font-body);
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: var(--color-text-secondary);

    p {
      margin-bottom: var(--space-4);
    }
  }

  &__entry-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-4);
    background: var(--color-surface-2);
    border-top: 1px solid var(--color-border);

    @include mobile {
      flex-direction: column;
      gap: var(--space-3);
    }
  }

  &__entry-actions {
    display: flex;
    gap: var(--space-2);
  }

  &__action-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    font-family: var(--font-ui);
    font-size: var(--text-sm);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--color-surface-1);
      transform: translateX(2px);
    }

    &--secondary {
      background: transparent;
      color: var(--color-text-secondary);
    }
  }

  &__entry-stats {
    display: flex;
    gap: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
  }

  &__load-more {
    text-align: center;
    margin: var(--space-6) 0;
  }

  &__load-btn {
    background: var(--color-surface-1);
    border: 1px solid var(--color-border);
    padding: var(--space-3) var(--space-6);
    border-radius: var(--radius-md);
    font-family: var(--font-ui);
    font-size: var(--text-base);
    color: var(--color-text);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: var(--color-surface-2);
    }
  }

  &__empty {
    text-align: center;
    padding: var(--space-8);
    color: var(--color-text-muted);

    &-icon {
      font-size: 48px;
      margin-bottom: var(--space-4);
      opacity: 0.5;
    }
  }
}

// Accordion animations
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to {
  max-height: 800px;
  opacity: 1;
}

.accordion-leave-from {
  max-height: 800px;
  opacity: 1;
}

.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

// List animations
.accordion-list-move,
.accordion-list-enter-active,
.accordion-list-leave-active {
  transition: all 0.3s ease;
}

.accordion-list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.accordion-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.accordion-list-leave-active {
  position: absolute;
  width: 100%;
}
</style>