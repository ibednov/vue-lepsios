import { ref } from 'vue'

/** Toggle masking for secrets (e.g. Telegram id behind an eye icon). */
export function useRevealSecret(initial = false) {
  const revealed = ref(initial)
  const show = () => { revealed.value = true }
  const hide = () => { revealed.value = false }
  const toggle = () => { revealed.value = !revealed.value }
  return { revealed, show, hide, toggle }
}
