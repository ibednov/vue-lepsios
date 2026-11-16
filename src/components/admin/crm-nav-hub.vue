<script setup lang="ts">
import type { Component } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { Icon } from '@iconify/vue'
import { RouterLink } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import AdminPage from './admin-page.vue'
import AdminPageHeader from './admin-page-header.vue'
import AdminMetricGrid from './admin-metric-grid.vue'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export type CrmNavHubItem = {
  id: string
  title: string
  description?: string
  to: RouteLocationRaw
  icon?: string | object | ((...args: any[]) => unknown)
  badge?: string | number
  badgeLabel?: string
  disabled?: boolean
  soon?: boolean
}

/**
 * Section / module landing: grid of child nav cards.
 * Labels props-only — host owns i18n.
 */
defineProps<{
  title: string
  description?: string
  items: CrmNavHubItem[]
  soonLabel?: string
}>()

const asComponent = (value: CrmNavHubItem['icon']) => value as Component | undefined
</script>

<template>
  <AdminPage>
    <AdminPageHeader
      :title="title"
      :description="description"
    />
    <AdminMetricGrid
      :columns="2"
      class="mt-2"
    >
      <template
        v-for="item in items"
        :key="item.id"
      >
        <RouterLink
          v-if="!item.disabled && item.to"
          :to="item.to"
          class="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :data-testid="`nav-hub-${item.id}`"
        >
          <Card class="h-full transition group-hover:border-primary/40 group-hover:bg-muted/40">
            <CardHeader class="flex flex-row items-start gap-3 space-y-0">
              <div
                v-if="item.icon"
                class="grid size-10 shrink-0 place-items-center rounded-lg bg-muted text-foreground"
              >
                <Icon
                  v-if="typeof item.icon === 'string'"
                  :icon="item.icon"
                  class="size-5"
                  aria-hidden="true"
                />
                <component
                  :is="asComponent(item.icon)"
                  v-else
                  class="size-5"
                  aria-hidden="true"
                />
              </div>
              <div class="min-w-0 flex-1">
                <CardTitle class="flex items-center gap-2 text-base">
                  <span class="truncate">{{ item.title }}</span>
                  <span
                    v-if="item.badge !== undefined && item.badge !== '' && item.badge !== 0"
                    class="rounded-full bg-destructive px-1.5 text-[10px] font-medium leading-5 text-destructive-foreground"
                    :aria-label="item.badgeLabel"
                  >{{ item.badge }}</span>
                </CardTitle>
                <CardDescription
                  v-if="item.description"
                  class="mt-1"
                >
                  {{ item.description }}
                </CardDescription>
              </div>
              <ChevronRight
                class="mt-1 size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-foreground"
                aria-hidden="true"
              />
            </CardHeader>
          </Card>
        </RouterLink>
        <Card
          v-else
          class="h-full opacity-60"
        >
          <CardHeader class="flex flex-row items-start gap-3 space-y-0">
            <div class="min-w-0 flex-1">
              <CardTitle class="text-base">
                {{ item.title }}
                <span
                  v-if="item.soon && soonLabel"
                  class="ml-2 rounded bg-primary/80 px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground"
                >{{ soonLabel }}</span>
              </CardTitle>
              <CardDescription
                v-if="item.description"
                class="mt-1"
              >
                {{ item.description }}
              </CardDescription>
            </div>
          </CardHeader>
        </Card>
      </template>
    </AdminMetricGrid>
  </AdminPage>
</template>
