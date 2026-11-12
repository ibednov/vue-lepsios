<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { HTMLAttributes } from 'vue'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'
import type { CrmBreadcrumbItem } from '../../types/breadcrumb'

const props = defineProps<{
  items: CrmBreadcrumbItem[]
  ariaLabel: string
  class?: HTMLAttributes['class']
  separatorIcon?: string
}>()
</script>

<template>
  <Breadcrumb :aria-label="ariaLabel" :class="props.class">
    <BreadcrumbList class="min-w-0 flex-nowrap gap-2">
      <template v-for="(item, index) in items" :key="`${item.label}-${index}`">
        <BreadcrumbItem class="min-w-0">
          <BreadcrumbLink
            v-if="item.to && index < items.length - 1"
            as-child
            class="truncate text-muted-foreground transition-colors hover:text-foreground"
          >
            <RouterLink :to="item.to">
              {{ item.label }}
            </RouterLink>
          </BreadcrumbLink>
          <BreadcrumbPage v-else class="truncate font-medium">
            {{ item.label }}
          </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator v-if="index < items.length - 1" class="shrink-0">
          <Icon :icon="separatorIcon || 'lucide:chevron-right'" />
        </BreadcrumbSeparator>
      </template>
    </BreadcrumbList>
  </Breadcrumb>
</template>
