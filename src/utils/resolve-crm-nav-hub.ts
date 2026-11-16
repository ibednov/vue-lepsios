import type { RouteLocationRaw } from 'vue-router'
import type { CrmNavHubItem } from '../components/admin/crm-nav-hub.vue'

export type CrmNavHubLink = {
  id: string
  label: string
  to?: RouteLocationRaw
  icon?: CrmNavHubItem['icon']
  badge?: string | number
  badgeLabel?: string
  disabled?: boolean
  soon?: boolean
  description?: string
}

export type CrmNavHubGroup = {
  id: string
  label: string
  icon?: CrmNavHubItem['icon']
  /** Hub route for this module (optional). */
  to?: RouteLocationRaw
  description?: string
  items: CrmNavHubLink[]
}

export type CrmNavHubSection = {
  id: string
  label: string
  icon?: CrmNavHubItem['icon']
  /** Hub route for this section (optional). */
  to?: RouteLocationRaw
  description?: string
  items?: CrmNavHubLink[]
  groups?: CrmNavHubGroup[]
}

export type ResolveCrmNavHubResult = {
  id: string
  title: string
  description?: string
  /** section | group — for breadcrumbs */
  kind: 'section' | 'group'
  sectionId?: string
  sectionLabel?: string
  sectionTo?: RouteLocationRaw
  items: CrmNavHubItem[]
} | null

/**
 * Resolve a nav hub page from section/group id.
 * Section hub → cards for groups (or top-level items).
 * Group hub → cards for leaf links.
 */
export function resolveCrmNavHub(
  sections: CrmNavHubSection[],
  hubId: string,
): ResolveCrmNavHubResult {
  if (!hubId)
    return null

  for (const section of sections) {
    if (section.id === hubId) {
      const groupCards: CrmNavHubItem[] = (section.groups ?? [])
        .map(group => ({
          id: group.id,
          title: group.label,
          description: group.description,
          to: group.to ?? group.items.find(item => item.to)?.to ?? '',
          icon: group.icon,
          disabled: !group.to && !group.items.some(item => item.to),
        }))
        .filter(card => card.to || card.disabled)

      const itemCards: CrmNavHubItem[] = (section.items ?? [])
        .filter(item => item.to || item.disabled || item.soon)
        .map(item => ({
          id: item.id,
          title: item.label,
          description: item.description,
          to: item.to ?? '',
          icon: item.icon,
          badge: item.badge,
          badgeLabel: item.badgeLabel,
          disabled: item.disabled || !item.to,
          soon: item.soon,
        }))

      return {
        id: section.id,
        title: section.label,
        description: section.description,
        kind: 'section',
        items: [...itemCards, ...groupCards],
      }
    }

    for (const group of section.groups ?? []) {
      if (group.id !== hubId)
        continue
      return {
        id: group.id,
        title: group.label,
        description: group.description,
        kind: 'group',
        sectionId: section.id,
        sectionLabel: section.label,
        sectionTo: section.to,
        items: group.items
          .filter(item => item.to || item.disabled || item.soon)
          .map(item => ({
            id: item.id,
            title: item.label,
            description: item.description,
            to: item.to ?? '',
            icon: item.icon,
            badge: item.badge,
            badgeLabel: item.badgeLabel,
            disabled: item.disabled || !item.to,
            soon: item.soon,
          })),
      }
    }
  }

  return null
}

/**
 * Hub path. Default `/hub/<id>/`.
 * Multi-product hosts pass base, e.g. `{ base: '/wishimi/hub' }` → `/wishimi/hub/<id>/`.
 */
export function crmNavHubPath(id: string, options?: { base?: string }): string {
  const base = (options?.base ?? '/hub').replace(/\/$/, '') || '/hub'
  return `${base}/${id}/`
}
