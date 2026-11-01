<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../../lib/cn'

export type CatalogCardDensity = 'compact' | 'cozy' | 'roomy'

const props = withDefaults(defineProps<{
  title: string
  body?: string
  /** Cover image URL. Omitted = no media unless `media` is forced on. */
  image?: string
  imageAlt?: string
  tags?: string[]
  /** Cap chips shown (default 3). */
  maxTags?: number
  /** Footer meta line (stack, tech, etc.). */
  stack?: string
  /**
   * Media block:
   * - `auto` (default): show when `image` is set
   * - `true`: always reserve media (image or title placeholder)
   * - `false`: never show media
   */
  media?: boolean | 'auto'
  /** Equal-height tiles in a grid — stretch to row. */
  fill?: boolean
  density?: CatalogCardDensity
  clickable?: boolean
  class?: HTMLAttributes['class']
  bodyClass?: HTMLAttributes['class']
  titleClass?: HTMLAttributes['class']
}>(), {
  body: undefined,
  image: undefined,
  imageAlt: undefined,
  tags: () => [],
  maxTags: 3,
  stack: undefined,
  media: 'auto',
  fill: true,
  density: 'cozy',
  clickable: true,
})

const emit = defineEmits<{
  click: []
}>()

const chips = computed(() => (props.tags ?? []).slice(0, props.maxTags))

const showMedia = computed(() => {
  if (props.media === true)
    return true
  if (props.media === false)
    return false
  return Boolean(props.image)
})

const padClass = computed(() => {
  switch (props.density) {
    case 'compact':
      return 'gap-2 p-4'
    case 'roomy':
      return 'gap-3 p-6'
    default:
      return 'gap-3 p-5'
  }
})

const titleSizeClass = computed(() => {
  switch (props.density) {
    case 'compact':
      return 'text-lg'
    case 'roomy':
      return 'text-xl'
    default:
      return 'text-xl'
  }
})

const onActivate = () => {
  if (!props.clickable)
    return
  emit('click')
}
</script>

<template>
  <div
    :role="clickable ? 'link' : undefined"
    :tabindex="clickable ? 0 : undefined"
    :class="cn(
      'group block',
      fill && 'h-full',
      clickable && 'cursor-pointer',
      props.class,
    )"
    @click="onActivate"
    @keydown.enter.prevent="onActivate"
  >
    <article
      :class="cn(
        'flex flex-col rounded-xl border border-foreground/10 transition duration-200',
        fill && 'h-full',
        padClass,
        clickable && 'group-hover:-translate-y-1 group-hover:border-[color:var(--home-accent,var(--lepsios-term-accent,#2f6a14))] group-hover:shadow-[0_24px_60px_-28px_color-mix(in_srgb,var(--home-accent,var(--lepsios-term-accent,#2f6a14))_55%,transparent)]',
      )"
    >
      <div
        v-if="showMedia"
        class="aspect-video overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5"
      >
        <slot name="media">
          <img
            v-if="image"
            :src="image"
            :alt="imageAlt || title"
            class="size-full object-cover object-top transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          >
          <div
            v-else
            class="flex size-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/25"
            aria-hidden="true"
          >
            {{ title }}
          </div>
        </slot>
      </div>

      <div
        v-if="chips.length || $slots.tags"
        class="flex flex-nowrap gap-2 overflow-hidden"
      >
        <slot name="tags">
          <span
            v-for="tag in chips"
            :key="tag"
            class="inline-flex shrink-0 border border-[color:color-mix(in_srgb,var(--home-accent,var(--lepsios-term-accent,#2f6a14))_35%,transparent)] px-2.5 py-0.5 text-[11px] uppercase tracking-[0.12em] text-[color:color-mix(in_srgb,var(--home-accent,var(--lepsios-term-accent,#2f6a14))_85%,white)]"
          >
            {{ tag }}
          </span>
        </slot>
      </div>

      <h3
        :class="cn(
          'line-clamp-1 font-bold tracking-tight',
          titleSizeClass,
          props.titleClass,
        )"
      >
        <slot name="title">
          {{ title }}
        </slot>
      </h3>

      <p
        v-if="body || $slots.body"
        :class="cn(
          'line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/70',
          props.bodyClass,
        )"
      >
        <slot name="body">
          {{ body }}
        </slot>
      </p>

      <p
        v-if="stack || $slots.stack"
        class="mt-auto truncate text-[11px] uppercase tracking-[0.16em] text-[color:var(--home-accent,var(--lepsios-term-accent,#2f6a14))]"
      >
        <slot name="stack">
          {{ stack }}
        </slot>
      </p>

      <slot />
    </article>
  </div>
</template>
