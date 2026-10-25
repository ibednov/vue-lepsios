<script setup lang="ts">
import type { Component } from 'vue'
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { Search } from 'lucide-vue-next'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  sidebarMenuButtonVariants,
} from '../ui/sidebar'

export interface CrmSidebarNavigationItem {
  id: string
  label: string
  to?: string
  icon?: string | object | ((...args: any[]) => unknown)
  disabled?: boolean
  soon?: boolean
  section?: boolean
  badge?: string | number
  badgeLabel?: string
  badgeVariant?: 'default' | 'destructive'
}

export interface CrmSidebarNavigationGroup {
  id: string
  label: string
  icon?: string | object | ((...args: any[]) => unknown)
  items: CrmSidebarNavigationItem[]
}

export interface CrmSidebarNavigationSection {
  id: string
  label: string
  items?: CrmSidebarNavigationItem[]
  groups?: CrmSidebarNavigationGroup[]
}

const props = withDefaults(defineProps<{
  sections: CrmSidebarNavigationSection[]
  activeId?: string
  collapsed?: boolean
  mobile?: boolean
  navigationLabel?: string
  searchLabel: string
  searchPlaceholder?: string
  noResultsText?: string
  soonLabel?: string
  storageKey?: string
  defaultOpenGroupIds?: string[]
}>(), {
  activeId: undefined,
  collapsed: false,
  mobile: false,
  navigationLabel: undefined,
  searchPlaceholder: undefined,
  noResultsText: undefined,
  soonLabel: undefined,
  storageKey: undefined,
  defaultOpenGroupIds: () => [],
})
const emit = defineEmits<{
  expand: []
  navigate: []
}>()

const search = ref('')
const readOpenGroups = (): Record<string, boolean> => {
  if (!props.storageKey || typeof localStorage === 'undefined')
    return {}
  try {
    const value: unknown = JSON.parse(localStorage.getItem(props.storageKey) || '{}')
    if (!value || typeof value !== 'object' || Array.isArray(value))
      return {}
    return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, boolean] => typeof entry[1] === 'boolean'))
  }
  catch {
    return {}
  }
}
const openGroups = ref<Record<string, boolean>>(readOpenGroups())
const normalizedSearch = computed(() => search.value.trim().toLocaleLowerCase())
const asComponent = (value: CrmSidebarNavigationItem['icon']) => value as Component | undefined

const matches = (value: string) => value.toLocaleLowerCase().includes(normalizedSearch.value)
const matchingItem = (item: CrmSidebarNavigationItem) => !normalizedSearch.value || matches(item.label)
const visibleSections = computed(() => {
  const query = normalizedSearch.value
  return props.sections.map((section) => {
    const sectionMatches = query && matches(section.label)
    const items = (section.items ?? []).filter(item => sectionMatches || matchingItem(item))
    const groups = (section.groups ?? []).map((group) => {
      const groupMatches = query && (sectionMatches || matches(group.label))
      return { ...group, items: group.items.filter(item => groupMatches || matchingItem(item)) }
    }).filter(group => group.items.length > 0)
    return { ...section, items, groups }
  }).filter(section => section.items.length > 0 || section.groups.length > 0)
})

const isGroupActive = (group: CrmSidebarNavigationGroup) => group.items.some(item => item.id === props.activeId)
const isGroupOpen = (group: CrmSidebarNavigationGroup) => {
  if (normalizedSearch.value)
    return true
  if (Object.hasOwn(openGroups.value, group.id))
    return openGroups.value[group.id]
  return props.defaultOpenGroupIds.includes(group.id) || isGroupActive(group)
}
const menuButtonClass = sidebarMenuButtonVariants({ size: 'default' })
const saveOpenGroups = () => {
  if (!props.storageKey || typeof localStorage === 'undefined')
    return
  try {
    localStorage.setItem(props.storageKey, JSON.stringify(openGroups.value))
  }
  catch { /* Navigation remains usable when browser storage is unavailable. */ }
}
const toggleGroup = (group: CrmSidebarNavigationGroup) => {
  if (props.collapsed && !props.mobile) {
    emit('expand')
    openGroups.value[group.id] = true
  }
  else {
    openGroups.value[group.id] = !isGroupOpen(group)
  }
  saveOpenGroups()
}

const badgeClass = (item: CrmSidebarNavigationItem) => item.badgeVariant === 'destructive'
  ? 'bg-destructive text-destructive-foreground'
  : 'bg-muted text-muted-foreground'
</script>

<template>
  <div class="flex min-h-0 flex-1 flex-col">
    <div class="shrink-0 border-b border-sidebar-border p-3 group-data-[collapsible=icon]:hidden">
      <label class="relative block" :aria-label="searchLabel">
        <Search class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
        <input
          v-model="search"
          type="search"
          class="h-9 w-full rounded-md border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
          :placeholder="searchPlaceholder ?? searchLabel"
          :aria-label="searchLabel"
        >
      </label>
    </div>
    <nav class="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain px-2 py-3" :aria-label="navigationLabel ?? searchLabel">
      <SidebarGroup v-for="section in visibleSections" :key="section.id" class="gap-1 px-0 py-0">
        <SidebarGroupLabel v-if="section.label" class="px-2 text-[11px] font-semibold uppercase tracking-[0.08em]">
          {{ section.label }}
        </SidebarGroupLabel>
        <SidebarMenu v-if="section.items.length" class="gap-0.5">
          <SidebarMenuItem v-for="item in section.items" :key="item.id">
            <RouterLink
              v-if="!item.disabled && item.to"
              :to="item.to"
              :class="menuButtonClass"
              :data-active="item.id === activeId"
              :data-testid="`nav-${item.id}`"
              :aria-current="item.id === activeId ? 'page' : undefined"
              :title="props.collapsed ? item.label : undefined"
              @click="emit('navigate')"
            >
              <Icon v-if="typeof item.icon === 'string'" :icon="item.icon" class="size-4 shrink-0" aria-hidden="true" />
              <component :is="asComponent(item.icon)" v-else-if="item.icon" :class="'size-4 shrink-0'" aria-hidden="true" />
              <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
              <span v-if="item.badge !== undefined && item.badge !== '' && item.badge !== 0" class="ml-auto rounded-full px-1.5 text-[10px] font-medium leading-5" :class="badgeClass(item)" :aria-label="item.badgeLabel">{{ item.badge }}</span>
            </RouterLink>
            <button
              v-else
              type="button"
              disabled
              :title="item.label"
              :class="[menuButtonClass, 'opacity-60']"
            >
              <Icon v-if="typeof item.icon === 'string'" :icon="item.icon" class="size-4 shrink-0" aria-hidden="true" />
              <component :is="item.icon" v-else-if="item.icon" :class="'size-4 shrink-0'" aria-hidden="true" />
              <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
              <span v-if="item.soon && soonLabel" class="rounded bg-primary/80 px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground group-data-[collapsible=icon]:hidden">{{ soonLabel }}</span>
            </button>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu v-if="section.groups.length" class="gap-0.5">
          <SidebarMenuItem v-for="group in section.groups" :key="group.id">
            <button
              type="button"
              :class="menuButtonClass"
              :data-active="isGroupActive(group)"
              :aria-expanded="isGroupOpen(group)"
              :title="props.collapsed ? group.label : undefined"
              @click="toggleGroup(group)"
            >
              <Icon v-if="typeof group.icon === 'string'" :icon="group.icon" class="size-4 shrink-0" aria-hidden="true" />
              <component :is="asComponent(group.icon)" v-else-if="group.icon" :class="'size-4 shrink-0'" aria-hidden="true" />
              <span class="min-w-0 flex-1 truncate">{{ group.label }}</span>
              <Icon icon="lucide:chevron-down" class="size-3.5 shrink-0 transition-transform" :class="isGroupOpen(group) ? '' : '-rotate-90'" aria-hidden="true" />
            </button>
            <SidebarMenuSub v-show="isGroupOpen(group)" class="mx-3.5 border-l border-sidebar-border px-2.5">
              <SidebarMenuSubItem v-for="item in group.items" :key="item.id">
                <div
                  v-if="item.section"
                  class="px-2 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-wide text-sidebar-foreground/60 first:pt-2"
                >
                  {{ item.label }}
                </div>
                <SidebarMenuSubButton
                  v-else-if="!item.disabled && item.to"
                  :as-child="true"
                  :is-active="item.id === activeId"
                  :data-testid="`nav-${item.id}`"
                  :aria-current="item.id === activeId ? 'page' : undefined"
                >
                  <RouterLink :to="item.to" @click="emit('navigate')">
                    <Icon v-if="typeof item.icon === 'string'" :icon="item.icon" class="size-4 shrink-0" aria-hidden="true" />
                    <component :is="asComponent(item.icon)" v-else-if="item.icon" :class="'size-4 shrink-0'" aria-hidden="true" />
                    <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
                    <span v-if="item.badge !== undefined && item.badge !== '' && item.badge !== 0" class="ml-auto rounded-full px-1.5 text-[10px] font-medium leading-5" :class="badgeClass(item)" :aria-label="item.badgeLabel">{{ item.badge }}</span>
                  </RouterLink>
                </SidebarMenuSubButton>
                <SidebarMenuSubButton v-else as="button" disabled :title="item.label" class="opacity-60">
                  <Icon v-if="typeof item.icon === 'string'" :icon="item.icon" class="size-4 shrink-0" aria-hidden="true" />
                  <component :is="asComponent(item.icon)" v-else-if="item.icon" :class="'size-4 shrink-0'" aria-hidden="true" />
                  <span class="min-w-0 flex-1 truncate">{{ item.label }}</span>
                  <span v-if="item.soon && soonLabel" class="rounded bg-primary/80 px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">{{ soonLabel }}</span>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <p v-if="search && !visibleSections.length" class="px-3 py-3 text-sm text-muted-foreground">
        {{ noResultsText }}
      </p>
    </nav>
  </div>
</template>
