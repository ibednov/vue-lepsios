<script setup lang="ts" generic="TData">
import { computed, ref, useSlots } from 'vue'
import { FlexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useVueTable } from '@tanstack/vue-table'
import type { ColumnDef, PaginationState, SortingState, RowSelectionState, VisibilityState } from '@tanstack/vue-table'
import type { PaginationMeta } from '../../types/pagination'
import type { CrmBulkAction } from './crm-bulk-action'
import Spinner from '../ui/spinner/spinner.vue'
import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import CrmPagination from './crm-pagination.vue'

const props = withDefaults(defineProps<{
  data: TData[]
  columns: ColumnDef<TData, any>[]
  meta?: PaginationMeta | null
  loading?: boolean
  error?: string | null
  empty?: boolean
  emptyText: string
  loadingText: string
  paginateAbove?: number
  previousLabel?: string
  nextLabel?: string
  manualPagination?: boolean
  manualSorting?: boolean
  manualFiltering?: boolean
  sorting?: SortingState
  pageSize?: number
  rowClass?: (row: TData) => string
  selectedIds?: string[]
  bodyId?: string
  getRowId?: (row: TData, index: number) => string
  bulkActions?: CrmBulkAction[]
  bulkActionsLabel?: string
}>(), {
  loading: false,
  error: null,
  empty: undefined,
  paginateAbove: 3,
  previousLabel: 'Previous',
  nextLabel: 'Next',
  meta: null,
  manualPagination: false,
  manualSorting: false,
  manualFiltering: false,
  sorting: undefined,
  pageSize: 10,
  selectedIds: () => [],
  bodyId: undefined,
  bulkActions: () => [],
  bulkActionsLabel: 'Actions',
})

const emit = defineEmits<{
  pageChange: [page: number]
  rowClick: [payload: { event: MouseEvent, row: TData }]
  sortingChange: [sorting: SortingState]
  rowSelectionChange: [selection: RowSelectionState]
  bulkAction: [payload: { key: string, ids: string[] }]
}>()

const slots = useSlots()
const sorting = ref<SortingState>([])
const rowSelection = ref<RowSelectionState>({})
const columnVisibility = ref<VisibilityState>({})
const pagination = computed<PaginationState>(() => ({
  pageIndex: props.meta ? Math.max(0, props.meta.page - 1) : 0,
  pageSize: props.meta?.perPage ?? props.pageSize,
}))
const table = useVueTable<TData>({
  get data() { return props.data },
  get columns() { return props.columns },
  getRowId: (row, index) => props.getRowId?.(row, index) ?? String((row as any).id ?? index),
  state: {
    get sorting() { return props.sorting ?? sorting.value },
    get rowSelection() { return rowSelection.value },
    get columnVisibility() { return columnVisibility.value },
    get pagination() { return pagination.value },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
    emit('sortingChange', sorting.value)
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
    emit('rowSelectionChange', rowSelection.value)
  },
  onColumnVisibilityChange: (updater) => {
    columnVisibility.value = typeof updater === 'function' ? updater(columnVisibility.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  manualPagination: props.manualPagination || !!props.meta,
  manualSorting: props.manualSorting,
  manualFiltering: props.manualFiltering,
  pageCount: props.meta?.totalPages,
  enableRowSelection: true,
})

const showEmpty = computed(() => !props.loading && !props.error && (props.empty ?? table.getRowModel().rows.length === 0))
const showBulk = computed(() => props.selectedIds.length > 0 && props.bulkActions.length > 0)
const showToolbar = computed(() => !!slots.toolbar || showBulk.value)
const pending = ref<CrmBulkAction | null>(null)
const confirmOpen = ref(false)
function requestBulk(action: CrmBulkAction) {
  if (!props.selectedIds.length) return
  if (action.confirmTitle) {
    pending.value = action
    confirmOpen.value = true
    return
  }
  emit('bulkAction', { key: action.key, ids: [...props.selectedIds] })
}
function confirmBulk() {
  const action = pending.value
  confirmOpen.value = false
  pending.value = null
  if (action) emit('bulkAction', { key: action.key, ids: [...props.selectedIds] })
}
</script>

<template>
  <div class="space-y-3">
    <div v-if="showToolbar" class="flex flex-wrap items-center gap-2">
      <div class="flex min-w-0 flex-1 flex-wrap items-center gap-2"><slot name="toolbar" /></div>
      <div v-if="showBulk" class="ml-auto flex shrink-0 items-center gap-2" data-testid="crm-data-table-bulk">
        <span class="text-muted-foreground text-sm tabular-nums">{{ selectedIds.length }}</span>
        <DropdownMenu>
          <DropdownMenuTrigger as-child><Button variant="outline" size="sm" data-testid="crm-data-table-bulk-trigger">{{ bulkActionsLabel }}</Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end"><DropdownMenuItem v-for="action in bulkActions" :key="action.key" :variant="action.variant === 'destructive' ? 'destructive' : undefined" :data-testid="`crm-data-table-bulk-${action.key}`" @click="requestBulk(action)">{{ action.label }}</DropdownMenuItem></DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <div class="overflow-hidden rounded-xl border border-border bg-card">
      <div class="overflow-x-auto">
        <Table>
          <TableHeader class="bg-muted/40">
            <TableRow v-for="group in table.getHeaderGroups()" :key="group.id">
              <TableHead v-for="header in group.headers" :key="header.id">
                <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody :id="bodyId">
            <TableRow v-if="loading"><TableCell :colspan="Math.max(1, table.getVisibleLeafColumns().length)" class="p-0"><div class="text-muted-foreground flex items-center justify-center gap-2 px-4 py-10 text-sm" data-testid="crm-data-table-loading" role="status"><Spinner class="size-4" /><span>{{ loadingText }}</span></div></TableCell></TableRow>
            <TableRow v-else-if="error"><TableCell :colspan="Math.max(1, table.getVisibleLeafColumns().length)" class="p-0"><div class="flex min-h-24 flex-wrap items-center justify-center gap-3 p-4 text-sm text-destructive" data-testid="crm-data-table-error" role="alert"><slot name="error" :error="error"><span>{{ error }}</span></slot></div></TableCell></TableRow>
            <TableRow v-else-if="showEmpty"><TableCell :colspan="Math.max(1, table.getVisibleLeafColumns().length)" class="text-muted-foreground h-24 text-center" data-testid="crm-data-table-empty"><slot name="empty">{{ emptyText }}</slot></TableCell></TableRow>
            <template v-else>
              <TableRow v-for="row in table.getRowModel().rows" :key="row.id" :id="props.getRowId?.(row.original, row.index)" :class="props.rowClass?.(row.original)" :data-state="row.getIsSelected() && 'selected'" @click="emit('rowClick', { event: $event, row: row.original })">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <slot :name="`cell:${cell.column.id}`" :row="row.original" :value="cell.getValue()" :cell="cell" :row-model="row">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                  </slot>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>
    </div>

    <CrmPagination v-if="meta" :meta="meta" :min-total="paginateAbove" :prev-label="previousLabel" :next-label="nextLabel" @page-change="emit('pageChange', $event)" />

    <Dialog :open="confirmOpen" @update:open="(v) => { if (!v) { confirmOpen = false; pending = null } }">
      <DialogContent data-testid="crm-data-table-bulk-confirm"><DialogHeader><DialogTitle>{{ pending?.confirmTitle }}</DialogTitle><DialogDescription v-if="pending?.confirmDescription">{{ pending.confirmDescription }}</DialogDescription></DialogHeader><DialogFooter class="gap-2 sm:justify-end"><Button variant="outline" data-testid="crm-data-table-bulk-cancel" @click="confirmOpen = false; pending = null">{{ pending?.cancelLabel || 'Cancel' }}</Button><Button :variant="pending?.variant === 'destructive' ? 'destructive' : 'default'" data-testid="crm-data-table-bulk-confirm-btn" @click="confirmBulk">{{ pending?.confirmLabel || 'Confirm' }}</Button></DialogFooter></DialogContent>
    </Dialog>
  </div>
</template>
