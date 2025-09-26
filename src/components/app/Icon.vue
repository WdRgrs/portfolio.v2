<template>
  <component 
    :is="parseComponent"
    class="icon"
    :color="color"
    :size="parseSize"
    :stroke-width="parseSize * .1"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { 
  List, 
  ExternalLink 
} from 'lucide-vue-next';

type Icon = 'link' | 'list'

interface Props {
  name: Icon
  color?: string
  size?: string 
  variant?: 'default' | 'muted' | 'accent' | 'primary'
}

const props = withDefaults(defineProps<Props>(), {
  name: 'link',
  color: 'red',
  size: '20px'
})

const parseSize = computed(() => {
  switch (props.size) {
    case 'lg':
      return 40
    case 'md':
      return 22
    case 'xs':
      return 10
    case 'sm':
    default:
      return 20
  }
})
    
const parseComponent = computed(() => {
  switch (props.name) { 
    case 'list':
      return List
    case 'link':
    default:
      return ExternalLink
    
  }
})
</script>

<style scoped lang="scss">
.icon {
  @include mobile {
    transform: scale(.6);
  }
}
</style>