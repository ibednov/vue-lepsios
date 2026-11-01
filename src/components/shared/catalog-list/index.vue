<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'
import { cn } from '../../../lib/cn'

export type CatalogListLayout = 'grid' | 'list'

/** Column counts per breakpoint. Omitted keys inherit the previous step. */
export type CatalogListColumns = number | {
  base?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
}

/** Full class literals so Tailwind can see them at build time. */
const COL: Record<string, Record<number, string>> = {
  base: {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6',
  },
  sm: {
    1: 'sm:grid-cols-1',
    2: 'sm:grid-cols-2',
    3: 'sm:grid-cols-3',
    4: 'sm:grid-cols-4',
    5: 'sm:grid-cols-5',
    6: 'sm:grid-cols-6',
  },
  md: {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
  },
  lg: {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
    5: 'lg:grid-cols-5',
    6: 'lg:grid-cols-6',
  },
  xl: {
    1: 'xl:grid-cols-1',
    2: 'xl:grid-cols-2',
    3: 'xl:grid-cols-3',
    4: 'xl:grid-cols-4',
    5: 'xl:grid-cols-5',
    6: 'xl:grid-cols-6',
  },
  '2xl': {
    1: '2xl:grid-cols-1',
    2: '2xl:grid-cols-2',
    3: '2xl:grid-cols-3',
    4: '2xl:grid-cols-4',
    5: '2xl:grid-cols-5',
    6: '2xl:grid-cols-6',
  },
}

const props = withDefaults(defineProps<{
  /** Optional section heading above the items. */
  title?: string
  /** `grid` (default) or vertical `list`. */
  layout?: CatalogListLayout
  /**
   * Grid columns. Number = same from `md` up (base stays 1).
   * Object = explicit per breakpoint, e.g. `{ base: 1, md: 2, lg: 3 }`.
   */
  columns?: CatalogListColumns
  gap?: string
  class?: HTMLAttributes['class']
  listClass?: HTMLAttributes['class']
  titleClass?: HTMLAttributes['class']
}>(), {
  title: undefined,
  layout: 'grid',
  columns: () => ({ base: 1, md: 2 }),
  gap: 'gap-4',
})

const gridClass = computed(() => {
  if (props.layout === 'list')
    return cn('flex flex-col', props.gap)

  const cols = props.columns
  if (typeof cols === 'number') {
    const n = Math.min(6, Math.max(1, cols))
    return cn('grid', props.gap, COL.base[1], COL.md[n])
  }

  const parts: string[] = ['grid', props.gap]
  const order = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const
  let any = false
  for (const bp of order) {
    const n = cols?.[bp]
    if (n == null)
      continue
    const clamped = Math.min(6, Math.max(1, n))
    const cls = COL[bp]?.[clamped]
    if (cls) {
      parts.push(cls)
      any = true
    }
  }
  if (!any)
    parts.push(COL.base[1], COL.md[2])

  return cn(...parts)
})
</script>

<template>
  <section :class="cn('flex flex-col gap-4', props.class)">
    <h2
      v-if="title || $slots.title"
      :class="cn(
        'text-lg font-bold tracking-tight text-foreground/80',
        props.titleClass,
      )"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </h2>

    <div
      :class="cn(gridClass, props.listClass)"
      :data-layout="layout"
    >
      <slot />
    </div>
  </section>
</template>
