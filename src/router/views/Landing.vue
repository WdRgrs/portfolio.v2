<template>
  <div class="landing">
    <!-- Background effects -->
<MediaQuery />
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
import MediaQuery from '@/components/test/MediaQuery.vue'

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
    width: 100%;
    height: 100%;
  }

  &__title-wrapper {
    height: fit-content;
    user-select: none;
    margin: auto;
    // Reflection effect for non-mobile
    -webkit-box-reflect: 
      below -.3rem 
      linear-gradient(
        transparent, 
        rgba(255, 255, 255, 0.01),
        rgba(255, 255, 255, 0.2)
      );

    @include mobile {
      -webkit-box-reflect: unset;
    }

    @include tablet {
      -webkit-box-reflect: unset;
    }
  }

  &__name {
    // border: 1px solid red;
    // display: inline-block;
    // cursor: pointer;
    // color: var(--color-text);
    font-family: var(--font-cinzel);
    font-size: 7rem;
    // line-height: 1.35;
    
    // Stroke effect
    -webkit-text-stroke-width: 0.05rem;
    -webkit-text-stroke-color: var(--color-accent);
    
    transition: color 0.3s ease;

    @include mobile {
      font-size: 3.5rem;
      margin: 0 var(--space-5);
    }
    
    @include tablet {
      // border: 1px solid green;
      font-size: 3.5rem;
      // line-height: 2;
      // margin: 0 var(--space-5);
    }
    
    @include laptop {
      font-size: 5rem;
    }
  }

  &__name-first,
  &__name-last {
    display: inline-block;
    margin: 0 1rem;
    // margin: 0 1rem;
    
    @include mobile {
      display: block;
    }
    
    @include tablet {
      margin: 0 .5rem;
    }
    
    @include laptop {
      margin: 0 .75rem;
    }
  }
  
  &__name-first {
    @include mobile {

      // border: 1px solid red;
      transform: translate(-5%, -100%);
      // line-height: 2.1;
      // margin: 1.5rem 1rem;
    }
    
    @include tablet {
      // margin: 1rem 1rem;
      // display: block;
      // position: relative;
    }
  }
  
  &__name-last {
    // margin-left: 1.5rem;
    
    @include mobile {
      transform: translate(10%, -118%);

      // position: relative;
      // top: -5.4rem;
      // left: 2rem;
    }

    @include tablet {
      position: relative;
      // top: -5rem;
      // left: 2rem;
    }
  }

  &__name-initial {
    // display: inline-block;
    font-size: calc(7rem * 1.5);
    letter-spacing: calc(7rem * .25 * -1);
    // margin-right: calc(7rem * .2  * -1);
    
    @include mobile {
      font-size: calc(3.5rem * 1.5);
      letter-spacing: calc(3.5rem * .25 * -1);
      // font-size: 5rem;
      // margin-right: -0.7rem;
    }
    
    @include tablet {
      font-size: calc(3.5rem * 1.5);
      letter-spacing: calc(3.5rem * .25 * -1);
      // font-size: 6rem;
      // font-size: 6rem;
      // margin-right: -1.2rem;
    }
    @include laptop {
      // font-size: 8rem;
      font-size: calc(5rem * 1.5);
      letter-spacing: calc(5rem * .25 * -1);
      // margin-right: -1.2rem;
    }
  }
  
  &__name-last &__name-initial {
    letter-spacing: calc(7rem * .1 * -1);
    @include mobile {
      letter-spacing: calc(3.5rem * .1 * -1);
    }
    @include tablet {
      letter-spacing: calc(3.5rem * .1 * -1);
    }
    @include laptop {
      letter-spacing: calc(5rem * .1 * -1);
    }
  }

  &__border-break {
    position: relative;
    // opacity: 0.75;

    bottom: calc(7.5rem * .2);
    margin-left: calc(7.5rem * .6);
    margin-right: calc(7.5rem * .25);
    z-index: -1;
    border: 1px solid var(--color-accent);

    @include mobile {
      display: none;
    }

    @include tablet {
      display: none;
    }

    @include laptop {
      bottom: calc(5rem * .2);
      margin-left: calc(5rem * .65);
      margin-right: calc(5rem * .25);
      // bottom: .8rem;
      // margin-left: 2.7rem;
      // margin-right: 0.85rem;
    }
  }

  &__jobs {
    position: relative;
    // display: flex;
    // align-items: center;
    // width: fit-content;
    height: 2rem;
    bottom: calc(7.5rem * .125);
    left: calc(7.5rem * .6);
    // bottom: 3rem;
    // left: 3.5rem;

    @include mobile {
      display: flex;
      bottom: unset;
      left: unset;
      // margin:auto;
      // border: 1px solid red;;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      // place-items: center;
      // position: absolute;
      // bottom: -4rem;
      // left: 7rem;
      // height: fit-content;
      // margin: auto;
    }

    @include tablet {
      // width: fit-content;
      // display: flex;
      // align-items: center;
      // margin: auto;

      bottom: -2rem;
      // left: unset;
      left: unset;
      // right: 0;
      text-align: center;      
      // align-items: center;
      // justify-content: center;
      // margin: auto;
      // border: 1px solid red;
      // left: calc(3.5rem * .3);
    }

    @include laptop {
      // bottom: 2.4rem;
      // left: 3rem;
      // bottom: calc(5rem * .01);
      // left: calc(5rem * .3);
      bottom: calc(5rem * .15);
      left: calc(5rem * .7);
    }
  }

  &__job-link {

    display: inline-block;
    // border: 1px solid red;
    position: relative;
    // padding: 0;
    // margin: 0;
    // margin-bottom: 0.5rem;
    font-family: var(--font-fredericka);
    font-size: calc(7.5rem * .22);
    color: var(--color-accent);
    text-decoration: none;
    transition: all 0.35s ease;
    
    @include mobile {
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
    }
    
    @include tablet {
      font-size: 1.4rem;
    }
      
    @include laptop {
      font-size: 1.2rem;
      font-size: calc(5rem * .22);
    }

    &:hover {
      color: var(--color-secondary);
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: 0;
      left: 0;
      background-color: var(--color-accent);
      opacity: 0.5;
      transform-origin: bottom right;
      transition: transform 0.35s ease-out;
    }

    &:hover::after {
      transform: scaleX(1);
      background-color: var(--color-secondary);
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