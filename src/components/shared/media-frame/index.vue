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
    :class="[
      'relative mx-auto w-full max-w-[300px] rounded-[42px] bg-[#111] p-[9px] shadow-[0_24px_80px_rgba(0,0,0,0.18),inset_0_0_0_2px_#2a2a2a]',
      props.class,
    ]"
  >
    <div class="overflow-hidden rounded-[34px] [&_img]:block [&_img]:w-full [&_img]:rounded-[34px] [&_video]:block [&_video]:w-full [&_video]:rounded-[34px] [&_video]:bg-[#f2f1f6]">
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
