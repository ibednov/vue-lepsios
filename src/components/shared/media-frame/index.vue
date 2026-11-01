<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'
import BrowserWindow from '../browser-window/index.vue'

export type MediaFrameVariant = 'surface' | 'phone' | 'browser'

type SizeValue = string | number

interface Props {
  /** @deprecated prefer variant="surface"; kept for backward compat */
  surface?: boolean
  variant?: MediaFrameVariant
  /** passed to BrowserWindow when variant="browser" */
  url?: string
  class?: HTMLAttributes['class']
  height?: SizeValue
  width?: SizeValue
  rounded?: SizeValue
  padding?: SizeValue
  img?: string
  alt?: string
  loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<Props>(), {
  surface: true,
  variant: undefined,
  url: '',
  alt: '',
  loading: 'lazy',
})

const CSS_LENGTH_RE = /^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/i

function utilClass(prefix: string, value: SizeValue | undefined): string | undefined {
  if (value === undefined || value === '') return undefined
  const str = String(value).trim()
  if (CSS_LENGTH_RE.test(str)) return `${prefix}-[${str}]`
  return `${prefix}-${str}`
}

const resolvedVariant = computed<MediaFrameVariant>(() => {
  if (props.variant) return props.variant
  return 'surface'
})

const sizeClass = computed(() => cn(
  utilClass('w', props.width),
  utilClass('h', props.height),
  utilClass('rounded', props.rounded),
  utilClass('p', props.padding),
  props.class,
))

const frameClass = computed(() => {
  if (resolvedVariant.value === 'phone') {
    return cn(
      'relative box-border min-h-0 min-w-0 overflow-hidden bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,0.18),inset_0_0_0_2px_#2a2a2a]',
      props.rounded === undefined ? 'rounded-[42px]' : undefined,
      props.padding === undefined ? 'p-[9px]' : undefined,
      sizeClass.value,
    )
  }

  return cn(
    'relative box-border min-h-0 min-w-0 overflow-hidden',
    props.rounded === undefined ? 'rounded-[20px]' : undefined,
    props.surface ? 'bg-lepsios-surface' : '',
    sizeClass.value,
  )
})

const browserClass = computed(() => cn(
  'box-border min-h-0 min-w-0',
  sizeClass.value,
))

const imgClass = 'block h-full w-full object-cover'
</script>

<template>
  <BrowserWindow
    v-if="resolvedVariant === 'browser'"
    variant="term"
    :url="url"
    :class="browserClass"
  >
    <slot>
      <img
        v-if="img"
        :src="img"
        :alt="alt"
        :loading="loading"
        :class="imgClass"
      >
    </slot>
  </BrowserWindow>

  <div
    v-else
    :class="frameClass"
  >
    <slot>
      <img
        v-if="img"
        :src="img"
        :alt="alt"
        :loading="loading"
        :class="imgClass"
      >
    </slot>
  </div>
</template>
