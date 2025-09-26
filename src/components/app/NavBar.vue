<template>
  <nav class="navbar" :class="{ 'navbar--mobile-open': isMobileMenuOpen }">
    <div class="navbar__container">
      <!-- Logo/name -->
      <router-link :to="LANDING_PAGE" class="navbar__name">
        <span class="navbar__name-text">
          <span class="navbar__name-initial">W</span>ade
          <span class="navbar__name-initial">R</span>ogers
        </span>
      </router-link>

      <!-- Desktop Navigation -->
      <div class="navbar__nav">
        <router-link v-for="link in navLinks" :key="link.path" :to="link.path" class="navbar__link"
          active-class="navbar__link--active">
          {{ link.label }}
        </router-link>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="navbar__toggle" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu">
        <span class="navbar__toggle-line"></span>
        <span class="navbar__toggle-line"></span>
        <span class="navbar__toggle-line"></span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div class="navbar__mobile" v-show="isMobileMenuOpen">
      <router-link v-for="link in navLinks" :key="`mobile-${link.path}`" :to="link.path" class="navbar__mobile-link"
        active-class="navbar__mobile-link--active" @click="closeMobileMenu">
        {{ link.label }}
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LINKS, SITE_LINKS } from '@/constants'

interface NavLink {
  path: string
  label: string
  icon?: string
}

const navLinks: NavLink[] = SITE_LINKS.filter(ln => ln.main)
const LANDING_PAGE = LINKS.SITE.LANDING

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<style scoped lang="scss">
.navbar {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(8px);

  &__container {
    max-width: var(--max-width);
    height: var(--nav-bar-height);
    margin: auto;
    padding: var(--space-5);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__name {
    text-decoration: none;

    &-initial {
      font-size: var(--text-2xl);
    }

    &-text {
      font-family: var(--font-cinzel);
      font-size: var(--text-lg);
      color: var(--color-secondary);
      -webkit-text-stroke-width: .05rem;
      -webkit-text-stroke-color: var(--color-text);
    }
  }

  &__nav {
    display: flex;
    gap: var(--space-6);

    @include mobile {
      display: none;
    }
  }

  &__link {
    text-decoration: none;
    color: var(--color-text-secondary);
    font-family: var(--font-ui);
    font-weight: var(--font-medium);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    transition: all 0.2s ease;
    @include tablet {
      padding: var(--space-1);
    }

    &:hover {
      color: var(--color-primary);
      background: var(--color-surface-1);
    }

    &--active {
      color: var(--color-primary);
      background: var(--color-surface-2);
    }
  }

  &__toggle {
    display: none;
    flex-direction: column;
    gap: 3px;
    background: transparent;
    border: none;
    padding: var(--space-2);
    cursor: pointer;

    @include mobile {
      display: flex;
    }

    &-line {
      width: 20px;
      height: 2px;
      background: var(--color-text);
      transition: all 0.3s ease;
    }
  }

  &--mobile-open &__toggle &__toggle-line {
    &:nth-child(1) {
      transform: rotate(45deg) translate(2.5px, 2.5px);
    }

    &:nth-child(2) {
      opacity: 0;
    }

    &:nth-child(3) {
      transform: rotate(-45deg) translate(4.5px, -4.5px);
    }
  }

  &__mobile {
    display: none;

    @include mobile {
      display: block;
      padding: var(--space-5);
      background: var(--color-surface-1);
      border-top: 1px solid var(--color-border);
    }
  }

  &__mobile-link {
    display: block;
    text-decoration: none;
    color: var(--color-text-secondary);
    font-family: var(--font-ui);
    font-weight: var(--font-medium);
    padding: var(--space-3);
    border-radius: var(--radius-sm);
    margin-bottom: var(--space-2);
    transition: all 0.2s ease;

    &:hover {
      color: var(--color-primary);
      background: var(--color-surface-2);
    }

    &--active {
      color: var(--color-primary);
      background: var(--color-surface-3);
    }
  }
}
</style>