import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import { Checkbox } from '../ui/checkbox'

export interface CrmSelectColumnLabels<TData> {
  selectAll: string
  selectRow: string | ((row: TData) => string)
}

/** Create an accessible checkbox column for CrmDataTable row selection. */
export function createSelectColumn<TData>(labels: CrmSelectColumnLabels<TData>): ColumnDef<TData, unknown> {
  return {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    meta: { columnClass: 'w-10' },
    header: ({ table }) => h(Checkbox, {
      modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
      'aria-label': labels.selectAll,
    }),
    cell: ({ row }) => h(Checkbox, {
      modelValue: row.getIsSelected(),
      'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
      'aria-label': typeof labels.selectRow === 'function' ? labels.selectRow(row.original) : labels.selectRow,
    }),
  }
}
