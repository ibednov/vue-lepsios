<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Maximize2, Minimize2 } from 'lucide-vue-next'
import { SidebarProvider } from '../ui/sidebar'
import { Button } from '../ui/button'
import { cn } from '../../lib/cn'

const open = defineModel<boolean>('open')
/** Content width: false = constrained, true = full bleed. */
const wide = defineModel<boolean>('wide', { default: false })

const props = withDefaults(defineProps<{
  sidebarWidth?: string
  headerHeight?: string
  contentClass?: HTMLAttributes['class']
  showWideToggle?: boolean
  expandLabel?: string
  constrainLabel?: string
  /** When not wide, cap main width from the leading edge (no centered island). */
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
    <div class="admin-shell__frame">
      <header class="admin-shell__header">
        <div class="admin-shell__header-start">
          <slot name="header" />
        </div>
        <div
          v-if="$slots['header-actions'] || props.showWideToggle"
          class="admin-shell__header-end"
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
      <div class="admin-shell__body">
        <div
          :class="cn(
            'admin-shell__main',
            props.constrainContent && 'admin-shell__main--constrain',
            wide && 'admin-shell__main--wide',
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
.admin-shell__frame {
  position: relative;
  display: flex;
  min-width: 0;
  min-height: 100svh;
  flex: 1 1 auto;
  flex-direction: column;
  background: var(--background, var(--gp-paper, #fafafa));
}
.admin-shell__header {
  display: flex;
  height: var(--header-height, 3.5rem);
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border, var(--gp-line, #e4e4e0));
  background: var(--background, var(--gp-paper, #fafafa));
  padding-inline: 1rem;
}
@media (min-width: 640px) {
  .admin-shell__header { padding-inline: 1.5rem; }
}
.admin-shell__header-start {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  gap: 0.5rem;
}
.admin-shell__header-end {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 0.375rem;
}
.admin-shell__body {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
  background: var(--background, var(--gp-paper, #fafafa));
}
/* Leading-edge column: max-width caps width, never centers the island. */
.admin-shell__main {
  container-type: inline-size;
  container-name: main;
  display: flex;
  width: 100%;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
  align-items: stretch;
  align-self: stretch;
  gap: 1rem;
  padding: 1rem;
  margin-inline: 0;
}
@media (min-width: 768px) {
  .admin-shell__main {
    gap: 1.5rem;
    padding: 1.5rem;
  }
}
.admin-shell__main--constrain:not(.admin-shell__main--wide) {
  max-width: 72rem;
  width: 100%;
  margin-inline: 0;
  align-self: flex-start;
}
</style>
