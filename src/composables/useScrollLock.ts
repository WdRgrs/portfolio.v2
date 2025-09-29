import { watch, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export function useScrollLock(isLocked: Ref<boolean>) {
  const originalOverflow = document.body.style.overflow

  watch(isLocked, (locked) => {
    if (locked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalOverflow
    }
  })

  onUnmounted(() => {
    document.body.style.overflow = originalOverflow
  })
}