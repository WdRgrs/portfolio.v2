import { computed, type Ref } from 'vue'
import { clipString } from '@/utils/format'

export const useClipString = (text: Ref<string> | string, maxLength: number = 50) => {
  return computed(() => {
    const str = typeof text === 'string' ? text : text.value
    return clipString(str, maxLength)
  })
}