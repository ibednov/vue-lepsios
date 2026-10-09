<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useRevealSecret } from '../../composables/admin/use-reveal-secret'

const props = defineProps<{
  value: string
  showLabel: string
  hideLabel: string
  /** Characters kept visible at the end when masked. */
  tail?: number
}>()

const { revealed, toggle } = useRevealSecret(false)
const tail = computed(() => props.tail ?? 4)

const display = computed(() => {
  const v = props.value || ''
  if (revealed.value || v.length <= tail.value)
    return v
  return `•••${v.slice(-tail.value)}`
})
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 font-mono text-sm"
    data-no-row-click
    @click.stop
  >
    <span>{{ display }}</span>
    <button
      type="button"
      class="text-muted-foreground hover:text-foreground rounded p-0.5"
      :aria-label="revealed ? hideLabel : showLabel"
      @click.stop="toggle"
    >
      <Icon
        :icon="revealed ? 'ph:eye-slash' : 'ph:eye'"
        class="size-4"
        aria-hidden="true"
      />
    </button>
  </span>
</template>
