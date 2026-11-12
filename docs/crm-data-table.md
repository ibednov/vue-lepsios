# CRM data table parity and host recipes

`CrmDataTable` is the shared table implementation. Hosts keep API calls, query state, columns, permissions, translations, and domain actions.

## Yarmarka `DataTable` parity

| Capability | Yarmarka `DataTable` | `CrmDataTable` |
| --- | --- | --- |
| Columns and data | `columns`, `data` | `columns`, `data` |
| Server search | `serverSearch`, `v-model:search`, `searchChange` | Host search in `#toolbar`; host request is triggered by input update |
| Multiple filters | `filterData`, `filterValues`, `filterChange` | Host filters in `#toolbar`; host keeps filters and applies/reset behavior |
| Row selection | `selectable`, `rowIdKey`, `v-model:row-selection`, `createSelectColumn` | `v-model:row-selection`, `getRowId`, exported `createSelectColumn` |
| Bulk actions | `bulkActions` callbacks | `bulkActions`, selected IDs, optional shared confirmation, `bulkAction` event |
| Row click | `rowClickable`; skips interactive controls | `rowClick`; skips interactive controls and `[data-no-row-click]` descendants |
| Loading/error/empty/retry | Localized labels and `retry` event | `loadingText`, `error`, `emptyText`, optional `retryLabel` and `retry` event; error remains separate from empty |
| Pagination | Previous/next labels and `hidePagination` | `CrmPagination` labels and summary formatter; `hidePagination` disables internal slicing and hides the pager |

`AdminRowActions` is exported for simple overflow menus. Use `ConfirmDialog` or `useConfirmDialog` for host confirmations outside the table. `CrmDataTable` bulk actions with `confirmTitle` use its built-in confirmation dialog.

## Server search and multi-filter toolbar recipe

Search and filters remain host-owned so URLs, server query parameters, and business semantics stay in the product. Place controls in the shared toolbar slot and use the same controls for loading, reset, and URL synchronization:

```vue
<CrmDataTable
  :columns="columns"
  :data="items"
  :meta="pagination"
  :manual-filtering="true"
  :loading="loading"
  :error="error"
  :empty="!loading && !error && items.length === 0"
  :empty-text="labels.empty"
  :loading-text="labels.loading"
  :retry-label="labels.retry"
  :previous-label="labels.previous"
  :next-label="labels.next"
  :pagination-summary-label="labels.paginationSummary"
  @page-change="setPage"
  @retry="load"
>
  <template #toolbar>
    <Input v-model="search" :placeholder="labels.search" @update:model-value="setSearch" />
    <Select v-model="status">...</Select>
    <Select v-model="category">...</Select>
    <Button variant="ghost" @click="resetFilters">{{ labels.reset }}</Button>
  </template>
</CrmDataTable>
```

`labels.paginationSummary(from, to, total)` is the host's localized range string. When adapting an existing two-argument `showingRows(visible, total)` label, pass `from === 0 ? 0 : to - from + 1` as `visible`.

Use `createSelectColumn({ selectAll, selectRow })` in the host column definition and bind `v-model:row-selection`. `selectRow` may be a localized string or a function of the selected row. Pass the selected IDs to `selectedIds` when the host needs custom selection scope; otherwise bulk actions use the table's current row selection.
