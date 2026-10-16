import type { toast } from 'vue-sonner'

export interface NotifyOptions {
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  rawOptions?: Parameters<typeof toast>[1]
}

export interface NotifyFromApiErrorOptions {
  /** When the API response body has no message field */
  fallback?: string
  titleWithDescription?: { title: string, description: string }
  statusMessages?: Record<number, string>
  genericMessage?: string
}
