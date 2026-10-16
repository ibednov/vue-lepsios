/** Bulk action shown when CrmDataTable has selected row ids. */
export type CrmBulkAction = {
  /** Stable key emitted on confirm / click. */
  key: string
  label: string
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost'
  /**
   * When set, CrmDataTable shows a system confirm dialog before emitting
   * `bulkAction`. Omit for immediate emit (rare; prefer confirm for bulk).
   */
  confirmTitle?: string
  confirmDescription?: string
  confirmLabel?: string
  cancelLabel?: string
}
