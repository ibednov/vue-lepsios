<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Maximize2, Minimize2 } from 'lucide-vue-next'
import { SidebarProvider } from '../ui/sidebar'
import { Button } from '../ui/button'
import { cn } from '../../lib/cn'

const open = defineModel<boolean>('open')
/** Content width: false = constrained (max-w-6xl), true = full bleed. */
const wide = defineModel<boolean>('wide', { default: false })

const props = withDefaults(defineProps<{
  sidebarWidth?: string
  headerHeight?: string
  contentClass?: HTMLAttributes['class']
  /** Show expand/constrain control in the shared header end. */
  showWideToggle?: boolean
  expandLabel?: string
  constrainLabel?: string
  /** When not wide, center main slot at max-w-6xl (Concierge/Wishimi parity). */
  constrainContent?: boolean
}>(), {
  sidebarWidth: '16rem',
  headerHeight: '3.5rem',
  showWideToggle: false,
  expandLabel: 'Expand content',
  constrainLabel: 'Constrain content',
  constrainContent: false,
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
    <div
      class="relative flex min-h-svh min-w-0 flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow"
    >
      <header class="flex h-[var(--header-height)] w-full min-w-0 shrink-0 items-center gap-2 border-b bg-background px-4 sm:px-6">
        <div class="flex min-w-0 flex-1 items-center gap-2">
          <slot name="header" />
        </div>
        <div
          v-if="$slots['header-actions'] || props.showWideToggle"
          class="flex shrink-0 items-center gap-1.5"
        >
          <slot name="header-actions" />
          <Button
            v-if="props.showWideToggle"
            variant="ghost"
            size="icon"
            type="button"
            class="size-9 shrink-0"
            :aria-label="wide ? props.constrainLabel : props.expandLabel"
            :title="wide ? props.constrainLabel : props.expandLabel"
            :aria-pressed="wide"
            @click="wide = !wide"
          >
            <Minimize2
              v-if="wide"
              class="size-4"
              aria-hidden="true"
            />
            <Maximize2
              v-else
              class="size-4"
              aria-hidden="true"
            />
          </Button>
        </div>
      </header>
      <div class="flex min-w-0 flex-1 flex-col bg-background">
        <div
          :class="cn(
            '@container/main flex min-w-0 flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6',
            props.constrainContent && !wide && 'mx-auto w-full max-w-6xl',
            props.contentClass,
          )"
        >
          <slot />
        </div>
      </div>
    </div>
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
