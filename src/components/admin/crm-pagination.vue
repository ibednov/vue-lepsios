<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { PaginationMeta } from '../../types/pagination'

const props = withDefaults(defineProps<{
  meta: PaginationMeta
  /** Show pager when totalCount > this (default 3). */
  minTotal?: number
  prevLabel?: string
  nextLabel?: string
}>(), {
  minTotal: 3,
  prevLabel: 'Previous',
  nextLabel: 'Next',
})

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const visible = computed(() => (props.meta?.totalCount ?? 0) > props.minTotal)
const page = computed(() => props.meta.page || 1)
const totalPages = computed(() => props.meta.totalPages || 0)
const from = computed(() => {
  if (!props.meta.totalCount)
    return 0
  return (page.value - 1) * props.meta.perPage + 1
})
const to = computed(() => Math.min(page.value * props.meta.perPage, props.meta.totalCount))

const canPrev = computed(() => page.value > 1)
const canNext = computed(() => page.value < totalPages.value)

const go = (p: number) => {
  if (p < 1 || p > totalPages.value || p === page.value)
    return
  emit('pageChange', p)
}
</script>

<template>
  <div
    v-if="visible"
    class="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
  >
    <p class="text-muted-foreground">
      {{ from }}–{{ to }} / {{ meta.totalCount }}
    </p>
    <div class="flex items-center gap-2">
      <button
        type="button"
        class="border-border bg-background hover:bg-muted inline-flex items-center justify-center rounded-md border px-2.5 py-1.5 disabled:opacity-40"
        :disabled="!canPrev"
        :aria-label="prevLabel"
        @click="go(page - 1)"
      >
        <Icon
          icon="ph:caret-left"
          class="size-4"
          aria-hidden="true"
        />
      </button>
      <span class="text-muted-foreground tabular-nums">
        {{ page }} / {{ totalPages }}
      </span>
      <button
        type="button"
        class="border-border bg-background hover:bg-muted inline-flex items-center justify-center rounded-md border px-2.5 py-1.5 disabled:opacity-40"
        :disabled="!canNext"
        :aria-label="nextLabel"
        @click="go(page + 1)"
      >
        <Icon
          icon="ph:caret-right"
          class="size-4"
          aria-hidden="true"
        />
      </button>
    </div>
  </div>
</template>
