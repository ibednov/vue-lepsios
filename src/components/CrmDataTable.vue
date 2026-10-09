<script setup lang="ts">
import type { PaginationMeta } from '../types/pagination'
import CrmPagination from './CrmPagination.vue'
import AdminTableFrame from './AdminTableFrame.vue'

withDefaults(defineProps<{
  meta?: PaginationMeta | null
  loading?: boolean
  emptyText: string
  loadingText: string
  /** When totalCount is above this, show pager (default 3). */
  paginateAbove?: number
  /** Optional id on <tbody> for DnD libs (useSortable). */
  bodyId?: string
}>(), {
  loading: false,
  paginateAbove: 3,
  meta: null,
  bodyId: undefined,
})

const emit = defineEmits<{
  pageChange: [page: number]
}>()
</script>

<template>
  <div class="space-y-3">
    <div
      v-if="$slots.toolbar"
      class="flex flex-wrap items-center gap-2"
    >
      <slot name="toolbar" />
    </div>

    <div class="overflow-hidden rounded-xl border border-border bg-card">
      <AdminTableFrame class="rounded-none border-0 bg-transparent">
        <thead class="bg-muted/40">
          <slot name="head" />
        </thead>
        <tbody :id="bodyId">
          <slot />
        </tbody>
      </AdminTableFrame>
      <div
        v-if="loading"
        class="text-muted-foreground border-t px-4 py-6 text-center text-sm"
      >
        {{ loadingText }}
      </div>
      <div
        v-else-if="!$slots.default"
        class="text-muted-foreground border-t px-4 py-6 text-center text-sm"
      >
        {{ emptyText }}
      </div>
    </div>

    <CrmPagination
      v-if="meta"
      :meta="meta"
      :min-total="paginateAbove"
      @page-change="emit('pageChange', $event)"
    />
  </div>
</template>
