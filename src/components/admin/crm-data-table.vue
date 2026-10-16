<script setup lang="ts">
import { computed, useSlots } from 'vue'
import type { PaginationMeta } from '../../types/pagination'
import Spinner from '../ui/spinner/spinner.vue'
import CrmPagination from './crm-pagination.vue'
import AdminTableFrame from './admin-table-frame.vue'

const props = withDefaults(defineProps<{
  meta?: PaginationMeta | null
  loading?: boolean
  /**
   * When set, drives the empty state. Prefer this over relying on slot presence:
   * a parent `<tr v-for>` still provides a default slot even when the list is empty.
   */
  empty?: boolean
  emptyText: string
  loadingText: string
  /** Colspan for loading/empty placeholder row (default 12). */
  colSpan?: number
  /** When totalCount is above this, show pager (default 3). */
  paginateAbove?: number
  /** Optional id on <tbody> for DnD libs (useSortable). */
  bodyId?: string
}>(), {
  loading: false,
  empty: undefined,
  paginateAbove: 3,
  meta: null,
  bodyId: undefined,
  colSpan: 12,
})

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const slots = useSlots()

const showEmpty = computed(() => {
  if (props.loading)
    return false
  if (typeof props.empty === 'boolean')
    return props.empty
  return !slots.default
})

const showRows = computed(() => !props.loading && !showEmpty.value)
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
          <tr v-if="loading">
            <td
              :colspan="colSpan"
              class="p-0"
            >
              <div
                class="text-muted-foreground flex items-center justify-center gap-2 px-4 py-10 text-sm"
                data-testid="crm-data-table-loading"
                role="status"
              >
                <Spinner class="size-4" />
                <span>{{ loadingText }}</span>
              </div>
            </td>
          </tr>
          <tr v-else-if="showEmpty">
            <td
              :colspan="colSpan"
              class="p-0"
            >
              <div
                class="text-muted-foreground flex items-center justify-center px-4 py-10 text-sm"
                data-testid="crm-data-table-empty"
              >
                {{ emptyText }}
              </div>
            </td>
          </tr>
          <slot v-else-if="showRows" />
        </tbody>
      </AdminTableFrame>
    </div>

    <CrmPagination
      v-if="meta"
      :meta="meta"
      :min-total="paginateAbove"
      @page-change="emit('pageChange', $event)"
    />
  </div>
</template>
