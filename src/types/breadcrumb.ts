import type { RouteLocationRaw } from 'vue-router'

export interface CrmBreadcrumbItem {
  label: string
  to?: RouteLocationRaw
}
