<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import BrowserWindow from '../browser-window/index.vue'

export type MediaFrameVariant = 'surface' | 'phone' | 'browser'

interface Props {
  /** @deprecated prefer variant="surface"; kept for backward compat */
  surface?: boolean
  variant?: MediaFrameVariant
  /** passed to BrowserWindow when variant="browser" */
  url?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  surface: true,
  variant: undefined,
  url: '',
})

const resolvedVariant = computed<MediaFrameVariant>(() => {
  if (props.variant) return props.variant
  return props.surface ? 'surface' : 'surface'
})
</script>

<template>
  <BrowserWindow
    v-if="resolvedVariant === 'browser'"
    variant="term"
    :url="url"
    :class="props.class"
  >
    <slot />
  </BrowserWindow>

  <div
    v-else-if="resolvedVariant === 'phone'"
    class="term-phone-frame"
    :class="props.class"
  >
    <div class="term-phone-frame__inner">
      <slot />
    </div>
  </div>

  <div
    v-else
    class="w-full overflow-hidden rounded-[20px]"
    :class="[
      props.surface ? 'bg-lepsios-surface' : '',
      props.class,
    ]"
  >
    <slot />
  </div>
</template>
