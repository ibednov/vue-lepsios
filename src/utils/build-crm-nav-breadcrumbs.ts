import type { RouteLocationRaw } from 'vue-router'
import type { CrmBreadcrumbItem } from '../types/breadcrumb'

/** Nav leaf used for 3-level CRM breadcrumbs (section → module → item). */
export type CrmNavBreadcrumbLink = {
  id: string
  label: string
  to: RouteLocationRaw
}

/** Module (sidebar group) under a section. */
export type CrmNavBreadcrumbGroup = {
  id: string
  label: string
  /** Module hub route when present (preferred over first leaf). */
  to?: RouteLocationRaw
  links: CrmNavBreadcrumbLink[]
}

/** Top sidebar section. */
export type CrmNavBreadcrumbSection = {
  id: string
  label: string
  /** Section hub route when present. */
  to?: RouteLocationRaw
  groups: CrmNavBreadcrumbGroup[]
}

export type BuildCrmNavBreadcrumbsInput = {
  sections: CrmNavBreadcrumbSection[]
  /** Active leaf id, or section/group hub id. */
  activeId?: string | null
  /** Extra current-page label on detail routes (card / id screen). */
  detailLabel?: string | null
}

/**
 * Build section → module → item [→ detail] crumbs.
 * Ancestors always get `to` (hub path if set, else first leaf) so crumbs stay clickable.
 * Current leaf has no `to` (rendered as the page crumb).
 */
export function buildCrmNavBreadcrumbs(input: BuildCrmNavBreadcrumbsInput): CrmBreadcrumbItem[] {
  const { sections, activeId, detailLabel } = input
  if (!sections.length)
    return []

  // Hub page: activeId is a section id
  if (activeId) {
    const hubSection = sections.find(s => s.id === activeId)
    if (hubSection)
      return [{ label: hubSection.label }]

    // Hub page: activeId is a group id
    for (const section of sections) {
      const hubGroup = section.groups.find(g => g.id === activeId)
      if (hubGroup) {
        const sectionTo = section.to ?? section.groups.flatMap(g => g.links)[0]?.to
        const crumbs: CrmBreadcrumbItem[] = []
        if (sectionTo)
          crumbs.push({ label: section.label, to: sectionTo })
        else
          crumbs.push({ label: section.label })
        crumbs.push({ label: hubGroup.label })
        return crumbs
      }
    }
  }

  let section: CrmNavBreadcrumbSection | undefined
  let group: CrmNavBreadcrumbGroup | undefined
  let link: CrmNavBreadcrumbLink | undefined

  if (activeId) {
    outer: for (const candidate of sections) {
      for (const g of candidate.groups) {
        const found = g.links.find(item => item.id === activeId)
        if (found) {
          section = candidate
          group = g
          link = found
          break outer
        }
      }
    }
  }

  if (!section || !group || !link) {
    const fallbackSection = sections[0]
    const fallbackGroup = fallbackSection?.groups[0]
    const fallbackLink = fallbackGroup?.links[0]
    if (!fallbackSection || !fallbackGroup || !fallbackLink)
      return []
    section = fallbackSection
    group = fallbackGroup
    link = fallbackLink
  }

  const sectionTo = section.to ?? section.groups.flatMap(g => g.links)[0]?.to ?? link.to
  const groupTo = group.to ?? group.links[0]?.to ?? link.to
  const crumbs: CrmBreadcrumbItem[] = [
    { label: section.label, to: sectionTo },
    { label: group.label, to: groupTo },
  ]

  if (detailLabel) {
    crumbs.push({ label: link.label, to: link.to })
    crumbs.push({ label: detailLabel })
  }
  else {
    crumbs.push({ label: link.label })
  }

  return crumbs
}
