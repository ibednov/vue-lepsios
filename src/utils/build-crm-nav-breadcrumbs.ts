import type { RouteLocationRaw } from 'vue-router'
import type { CrmBreadcrumbItem } from '../types/breadcrumb'

/** Nav leaf used for CRM breadcrumbs (section → [module] → item). */
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
  /** Flat leaves under the section (no module level). */
  links?: CrmNavBreadcrumbLink[]
}

export type BuildCrmNavBreadcrumbsInput = {
  sections: CrmNavBreadcrumbSection[]
  /** Active leaf id, or section/group hub id. */
  activeId?: string | null
  /** Extra current-page label on detail routes (card / id screen). */
  detailLabel?: string | null
}

function leafCrumbs(
  sectionLabel: string,
  sectionTo: RouteLocationRaw | undefined,
  link: CrmNavBreadcrumbLink,
  detailLabel?: string | null,
  middle?: { label: string, to?: RouteLocationRaw },
): CrmBreadcrumbItem[] {
  const crumbs: CrmBreadcrumbItem[] = []
  if (sectionTo)
    crumbs.push({ label: sectionLabel, to: sectionTo })
  else
    crumbs.push({ label: sectionLabel })
  if (middle) {
    if (middle.to)
      crumbs.push({ label: middle.label, to: middle.to })
    else
      crumbs.push({ label: middle.label })
  }
  if (detailLabel) {
    crumbs.push({ label: link.label, to: link.to })
    crumbs.push({ label: detailLabel })
  }
  else {
    crumbs.push({ label: link.label })
  }
  return crumbs
}

/**
 * Build section → [module] → item [→ detail] crumbs.
 * Ancestors always get `to` (hub path if set, else first leaf) so crumbs stay clickable.
 * Current leaf has no `to` (rendered as the page crumb).
 * Flat `section.links` skip the module level (2 crumbs).
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
        const sectionTo = section.to
          ?? section.links?.[0]?.to
          ?? section.groups.flatMap(g => g.links)[0]?.to
        const crumbs: CrmBreadcrumbItem[] = []
        if (sectionTo)
          crumbs.push({ label: section.label, to: sectionTo })
        else
          crumbs.push({ label: section.label })
        crumbs.push({ label: hubGroup.label })
        return crumbs
      }
    }

    // Flat section leaf
    for (const section of sections) {
      const found = section.links?.find(item => item.id === activeId)
      if (found) {
        const sectionTo = section.to ?? found.to
        return leafCrumbs(section.label, sectionTo, found, detailLabel)
      }
    }

    // Nested group leaf
    for (const candidate of sections) {
      for (const g of candidate.groups) {
        const found = g.links.find(item => item.id === activeId)
        if (found) {
          const sectionTo = candidate.to
            ?? candidate.links?.[0]?.to
            ?? candidate.groups.flatMap(x => x.links)[0]?.to
            ?? found.to
          const groupTo = g.to ?? g.links[0]?.to ?? found.to
          return leafCrumbs(candidate.label, sectionTo, found, detailLabel, { label: g.label, to: groupTo })
        }
      }
    }
  }

  // Fallback: first flat link, else first group link
  const fallbackSection = sections[0]
  const fallbackLink = fallbackSection?.links?.[0]
    ?? fallbackSection?.groups[0]?.links[0]
  if (!fallbackSection || !fallbackLink)
    return []

  if (fallbackSection.links?.[0]?.id === fallbackLink.id) {
    const sectionTo = fallbackSection.to ?? fallbackLink.to
    return leafCrumbs(fallbackSection.label, sectionTo, fallbackLink, detailLabel)
  }

  const fallbackGroup = fallbackSection.groups[0]
  const sectionTo = fallbackSection.to
    ?? fallbackSection.groups.flatMap(g => g.links)[0]?.to
    ?? fallbackLink.to
  const groupTo = fallbackGroup.to ?? fallbackGroup.links[0]?.to ?? fallbackLink.to
  return leafCrumbs(fallbackSection.label, sectionTo, fallbackLink, detailLabel, {
    label: fallbackGroup.label,
    to: groupTo,
  })
}
