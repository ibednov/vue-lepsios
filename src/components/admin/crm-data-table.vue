<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import type { PaginationMeta } from '../../types/pagination'
import type { CrmBulkAction } from './crm-bulk-action'
import Spinner from '../ui/spinner/spinner.vue'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
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
  /** Selected row ids (parent owns checkboxes in #head / rows). */
  selectedIds?: string[]
  /** Bulk actions; shown when selection is non-empty. */
  bulkActions?: CrmBulkAction[]
  /** Label for the bulk dropdown trigger. */
  bulkActionsLabel?: string
}>(), {
  loading: false,
  empty: undefined,
  paginateAbove: 3,
  meta: null,
  bodyId: undefined,
  colSpan: 12,
  selectedIds: () => [],
  bulkActions: () => [],
  bulkActionsLabel: 'Actions',
})

const emit = defineEmits<{
  pageChange: [page: number]
  /** Fired after optional system confirm. */
  bulkAction: [payload: { key: string, ids: string[] }]
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

const showBulk = computed(() =>
  (props.selectedIds?.length ?? 0) > 0 && (props.bulkActions?.length ?? 0) > 0,
)

const showToolbarRow = computed(() => !!slots.toolbar || showBulk.value)

const pending = ref<CrmBulkAction | null>(null)
const confirmOpen = ref(false)

const requestBulk = (action: CrmBulkAction) => {
  const ids = [...(props.selectedIds ?? [])]
  if (!ids.length)
    return
  if (action.confirmTitle) {
    pending.value = action
    confirmOpen.value = true
    return
  }
  emit('bulkAction', { key: action.key, ids })
}

const confirmBulk = () => {
  const action = pending.value
  const ids = [...(props.selectedIds ?? [])]
  confirmOpen.value = false
  pending.value = null
  if (!action || !ids.length)
    return
  emit('bulkAction', { key: action.key, ids })
}

const cancelBulk = () => {
  confirmOpen.value = false
  pending.value = null
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-if="showToolbarRow"
      class="flex flex-wrap items-center gap-2"
    >
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2">
        <slot name="toolbar" />
      </div>
      <div
        v-if="showBulk"
        class="ml-auto flex shrink-0 items-center gap-2"
        data-testid="crm-data-table-bulk"
      >
        <span class="text-muted-foreground text-sm tabular-nums">
          {{ selectedIds.length }}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              variant="outline"
              size="sm"
              data-testid="crm-data-table-bulk-trigger"
            >
              {{ bulkActionsLabel }}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              v-for="action in bulkActions"
              :key="action.key"
              :variant="action.variant === 'destructive' ? 'destructive' : undefined"
              :data-testid="`crm-data-table-bulk-${action.key}`"
              @click="requestBulk(action)"
            >
              {{ action.label }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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

    <Dialog
      :open="confirmOpen"
      @update:open="(v) => { if (!v) cancelBulk() }"
    >
      <DialogContent data-testid="crm-data-table-bulk-confirm">
        <DialogHeader>
          <DialogTitle>
            {{ pending?.confirmTitle }}
          </DialogTitle>
          <DialogDescription v-if="pending?.confirmDescription">
            {{ pending.confirmDescription }}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="gap-2 sm:justify-end">
          <Button
            variant="outline"
            data-testid="crm-data-table-bulk-cancel"
            @click="cancelBulk"
          >
            {{ pending?.cancelLabel || 'Cancel' }}
          </Button>
          <Button
            :variant="pending?.variant === 'destructive' ? 'destructive' : 'default'"
            data-testid="crm-data-table-bulk-confirm-btn"
            @click="confirmBulk"
          >
            {{ pending?.confirmLabel || 'Confirm' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
