import { ref } from 'vue'

const maximized = ref(false)
const minimized = ref(false)

/** Module-level window chrome state (Vite-safe replacement for Nuxt useState). */
export const useTermWindow = (opts?: { onClose?: () => void }) => {
  const restore = () => {
    minimized.value = false
  }

  const close = () => {
    minimized.value = false
    maximized.value = false
    opts?.onClose?.()
  }

  const minimize = () => {
    minimized.value = true
  }

  const toggleMax = () => {
    minimized.value = false
    maximized.value = !maximized.value
  }

  return { maximized, minimized, close, minimize, restore, toggleMax }
}
