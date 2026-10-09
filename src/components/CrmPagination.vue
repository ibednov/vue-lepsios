<script setup lang="ts">
import { computed } from 'vue'
import type { PaginationMeta } from '../types/pagination'

const props = withDefaults(defineProps<{
  meta: PaginationMeta
  /** Show pager when totalCount > this (default 3). */
  minTotal?: number
}>(), {
  minTotal: 3,
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
        class="border-border bg-background hover:bg-muted rounded-md border px-3 py-1.5 disabled:opacity-40"
        :disabled="!canPrev"
        @click="go(page - 1)"
      >
        ←
      </button>
      <span class="text-muted-foreground tabular-nums">
        {{ page }} / {{ totalPages }}
      </span>
      <button
        type="button"
        class="border-border bg-background hover:bg-muted rounded-md border px-3 py-1.5 disabled:opacity-40"
        :disabled="!canNext"
        @click="go(page + 1)"
      >
        →
      </button>
    </div>
  </div>
</template>
