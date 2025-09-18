<template>
  <div class="landing">
    <div class="landing__container">
      <!-- Title Section -->
      <div class="landing__title-wrapper">
        <div class="landing__name" @click="handleNameClick">
          <span class="landing__name-first">
            <span class="landing__name-initial">W</span>ade
          </span>
          <span class="landing__name-last">
            <span class="landing__name-initial">R</span>ogers
          </span>
        </div>
        
        <div class="landing__border-break"></div>
        
        <!-- Job titles navigation -->
        <nav class="landing__jobs">
          <router-link 
            to="/software" 
            class="landing__job-link"
          >
            Developer
          </router-link>
          
          <span class="landing__divider"></span>
          
          <router-link 
            to="/welding" 
            class="landing__job-link"
          >
            Welder
          </router-link>
          
          <span class="landing__divider"></span>
          
          <router-link 
            to="/photography" 
            class="landing__job-link"
          >
            Photographer
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Toggle effect for name click (placeholder for color change)
const isActive = ref(false)

const handleNameClick = () => {
  isActive.value = !isActive.value
}
</script>

<style scoped lang="scss">
.landing {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  
  background: radial-gradient(
    ellipse at bottom, 
    var(--color-surface-3) -80%, 
    var(--color-bg) 60%
  );

  &__container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100%;
  }

  &__title-wrapper {
    position: absolute;
    bottom: 32vh;
    height: 13rem;
    width: fit-content;
    user-select: none;
    
    // Reflection effect for non-mobile
    -webkit-box-reflect: 
      below -0.5rem 
      linear-gradient(
        transparent, 
        rgba(255, 255, 255, 0.01),
        rgba(255, 255, 255, 0.1)
      );

    @include mobile {
      height: fit-content;
      -webkit-box-reflect: unset;
    }

    @include tablet {
      height: fit-content;
      -webkit-box-reflect: unset;
    }

    @include laptop {
      height: 10.4rem;
    }
  }

  &__name {
    display: inline-block;
    cursor: pointer;
    // color: var(--color-text);
    font-family: var(--font-cinzel);
    font-size: 7rem;
    line-height: 1.35;
    
    // Stroke effect
    -webkit-text-stroke-width: 0.05rem;
    -webkit-text-stroke-color: var(--color-accent);
    
    transition: color 0.3s ease;

    @include mobile {
      font-size: 3.8rem;
      margin: 0 var(--space-5);
      line-height: 1.55;
    }
    
    @include tablet {
      font-size: 3.8rem;
      // margin: 0 var(--space-5);
      // line-height: 1.55;
      // flex-wrap: wrap;
    }
    
    @include laptop {
      font-size: 5.5rem;
    }

    &:hover {
      opacity: 0.9;
    }
  }

  &__name-first,
  &__name-last {
    display: inline-block;
  }

  &__name-first {
    @include mobile {
      margin: 1.5rem 1rem;
    }
    
    @include tablet {
      margin: 1.5rem 1rem;
      // display: block;
      // position: relative;
    }
  }

  &__name-last {
    margin-left: 1.5rem;

    @include mobile {
      position: relative;
      top: -5.4rem;
      left: 2rem;
    }

    @include tablet {
      position: relative;
      top: -5rem;
      left: 2rem;
    }
  }

  &__name-initial {
    display: inline-block;
    font-size: 10rem;
    margin-right: -1.5rem;
    
    @include mobile {
      font-size: 5rem;
      margin-right: -0.7rem;
    }

    @include laptop {
      font-size: 8rem;
      margin-right: -1.2rem;
    }
  }

  &__name-last &__name-initial {
    margin-right: -0.3rem;

    @include laptop {
      margin-right: -0.5rem;
    }
  }

  &__border-break {
    position: relative;
    bottom: 3.1rem;
    opacity: 0.75;
    margin-left: 3.5rem;
    margin-right: var(--space-5);
    z-index: -1;
    border: 1px solid var(--color-accent);

    @include mobile {
      display: none;
    }

    @include tablet {
      display: none;
    }

    @include laptop {
      bottom: 2.5rem;
      margin-left: 2.7rem;
      margin-right: 0.85rem;
    }
  }

  &__jobs {
    position: relative;
    display: flex;
    align-items: center;
    width: fit-content;
    height: 2rem;
    bottom: 3rem;
    left: 3.5rem;

    @include mobile {
      flex-direction: column;
      position: absolute;
      bottom: -4rem;
      left: 7rem;
      height: fit-content;
    }

    @include tablet {
      position: absolute;
      justify-content: center;
      width: 100%;
      left: 0;
    }

    @include laptop {
      bottom: 2.4rem;
      left: 3rem;
    }
  }

  &__job-link {
    display: inline-block;
    position: relative;
    padding: 0;
    margin: 0;
    margin-bottom: 0.5rem;
    font-family: var(--font-fredericka);
    font-size: 1.55rem;
    color: var(--color-accent);
    text-decoration: none;
    transition: all 0.35s ease;

    @include mobile {
      font-size: 1.4rem;
    }

    @include laptop {
      font-size: 1.2rem;
    }

    &:hover {
      opacity: 0.87;
      cursor: pointer;
      color: var(--color-warning);
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 1px;
      bottom: 0;
      left: 0;
      background-color: var(--color-accent);
      opacity: 0.5;
      transform-origin: bottom right;
      transition: transform 0.35s ease-out;
    }

    &:hover::after {
      transform: scaleX(1);
      background-color: var(--color-warning);
      transform-origin: bottom left;
    }
  }

  &__divider {
    &::before {
      content: '|';
      color: var(--color-accent);
      font-size: 1.5rem;
      font-weight: var(--font-bold);
      opacity: 0.5;
      position: relative;
      top: 0.05rem;
      margin: 0 var(--space-4);

      @include mobile {
        content: '';
      }

      @include laptop {
        // top: 0.12rem;
        // margin: 0 0.7rem;
      }
    }
  }
}
</style>