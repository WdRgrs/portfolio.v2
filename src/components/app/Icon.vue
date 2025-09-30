<template>
  <component 
    :is="parseComponent"
    class="icon"
    :stroke="color"
    :size="+parseSize"
    :stroke-width="3"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  List,
  ExternalLink,
  ChevronDown,
  Lightbulb,
  Sun,
  Moon,
  SunMoon,
  
} from 'lucide-vue-next';

type BtnIcons = 'link' | 'list' | 'lightbulb' | 'chevron-down' | 'moon' | 'sun' | 'sun-moon'
type CompanyIcons = 'github' | 'linkedin' | 'instagram'

export type IconType = BtnIcons | CompanyIcons

interface Props {
  name: IconType
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
    case 'xl':
      return 28
    case 'lg':
      return 22
    case 'md':
      return 18
    case 'xs':
      return 10
    case 'sm':
      return 14
    default:
      return props.size ?? 18
  }
})
    
const parseComponent = computed(() => {
  switch (props.name) { 
    case 'sun-moon':
      return SunMoon
    case 'sun':
      return Sun
    case 'moon':
      return Moon
    case 'list':
      return List
    case 'lightbulb':
      return Lightbulb
    case 'chevron-down':
      return ChevronDown
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