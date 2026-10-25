<script setup lang="ts">
import type { Component } from 'vue'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { SidebarMenu, SidebarMenuItem, sidebarMenuButtonVariants } from '../ui/sidebar'

export interface CrmServiceOption {
  id: string
  label: string
  description?: string
  icon?: string | Component
}

const props = withDefaults(defineProps<{
  services: CrmServiceOption[]
  activeService: string
  mobile?: boolean
  label?: string
}>(), {
  mobile: false,
  label: 'Переключить сервис',
})

const emit = defineEmits<{
  select: [id: string]
}>()

const active = computed(() => props.services.find(service => service.id === props.activeService))
const triggerClass = sidebarMenuButtonVariants({ size: 'lg' })
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <button
            type="button"
            :class="[triggerClass, 'h-auto min-h-12 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground']"
            :aria-label="label"
            :title="label"
          >
            <Icon v-if="active && typeof active.icon === 'string'" :icon="active.icon" class="size-8 shrink-0" aria-hidden="true" />
            <component :is="active.icon" v-else-if="active?.icon" class="size-8 shrink-0" aria-hidden="true" />
            <span v-else class="flex size-8 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold" aria-hidden="true">CRM</span>
            <span class="grid min-w-0 flex-1 text-left leading-tight">
              <span class="truncate font-semibold">{{ active?.label ?? label }}</span>
              <span v-if="active?.description" class="truncate text-xs text-muted-foreground">{{ active.description }}</span>
            </span>
            <svg class="ml-auto size-4 shrink-0 text-muted-foreground" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 9 6 6 6-6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          :side="mobile ? 'bottom' : 'right'"
          :side-offset="4"
          class="w-56"
        >
          <DropdownMenuItem
            v-for="service in services"
            :key="service.id"
            :aria-current="service.id === activeService ? 'true' : undefined"
            @select="emit('select', service.id)"
          >
            <Icon v-if="typeof service.icon === 'string'" :icon="service.icon" class="size-4 shrink-0" aria-hidden="true" />
            <component :is="service.icon" v-else-if="service.icon" class="size-4 shrink-0" aria-hidden="true" />
            <span class="grid min-w-0 flex-1">
              <span class="truncate">{{ service.label }}</span>
              <span v-if="service.description" class="truncate text-xs text-muted-foreground">{{ service.description }}</span>
            </span>
            <svg v-if="service.id === activeService" class="ml-auto size-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m5 12 4 4L19 6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  </SidebarMenu>
</template>
