<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { cn } from '../../lib/cn'

const open = defineModel<boolean>('open')

const props = withDefaults(defineProps<{
  sidebarWidth?: string
  headerHeight?: string
  contentClass?: HTMLAttributes['class']
}>(), {
  sidebarWidth: '16rem',
  headerHeight: '3.5rem',
})
</script>

<template>
  <SidebarProvider
    v-model:open="open"
    :style="{
      '--sidebar-width': sidebarWidth,
      '--header-height': headerHeight,
    }"
    class="admin-shell"
  >
    <slot name="sidebar" />
    <SidebarInset class="min-w-0 bg-background">
      <header class="flex h-[var(--header-height)] shrink-0 items-center gap-2 border-b bg-background px-4 sm:px-6">
        <slot name="header" />
      </header>
      <main class="flex min-w-0 flex-1 flex-col bg-background">
        <div :class="cn('@container/main flex min-w-0 flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6', props.contentClass)">
          <slot />
        </div>
      </main>
    </SidebarInset>
  </SidebarProvider>
</template>

<style>
.admin-shell {
  --lepsios-two: var(--card);
  --color-lepsios-two: var(--card);
}

.admin-shell [data-slot='card'] {
  background-color: var(--card) !important;
  border: 1px solid var(--border) !important;
  box-shadow: none !important;
  border-radius: var(--radius-xl, 0.75rem);
}
</style>
