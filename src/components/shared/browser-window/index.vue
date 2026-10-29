<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { HTMLAttributes } from 'vue'

export type BrowserWindowOs = 'macos' | 'windows'
export type BrowserWindowTone = 'inherit' | 'light'
export type BrowserWindowAspect = 'auto' | '16/9' | '4/3'
export type BrowserWindowVariant = 'brutal' | 'term'

const props = withDefaults(defineProps<{
  os?: BrowserWindowOs
  url?: string
  expanded?: boolean
  /** light = always light chrome (demo), ignore page dark mode */
  tone?: BrowserWindowTone
  /** lock frame height via aspect-ratio (ignored when expanded) */
  aspectRatio?: BrowserWindowAspect
  /** scroll content inside the window body */
  scrollable?: boolean
  /** brutal = offset accent shadow; term = thin term chrome (cases) */
  variant?: BrowserWindowVariant
  controlLabels?: { close?: string, minimize?: string, maximize?: string }
  class?: HTMLAttributes['class']
}>(), {
  os: 'macos',
  url: '',
  expanded: false,
  tone: 'inherit',
  aspectRatio: 'auto',
  scrollable: false,
  variant: 'brutal',
})

const emit = defineEmits<{
  close: []
  minimize: []
  maximize: []
}>()

const isMac = computed(() => props.os === 'macos')
const isLight = computed(() => props.tone === 'light')
const isTerm = computed(() => props.variant === 'term')

const aspectClass = computed(() => {
  if (props.expanded || props.aspectRatio === 'auto') return ''
  if (props.aspectRatio === '16/9') return 'aspect-[16/9]'
  if (props.aspectRatio === '4/3') return 'aspect-[4/3]'
  return ''
})
</script>

<template>
  <div
    class="flex min-h-0 w-full flex-col overflow-hidden"
    :class="[
      isTerm
        ? 'term-browser rounded-[10px] border border-[color:color-mix(in_srgb,var(--lepsios-term-accent)_16%,transparent)] bg-[color:var(--lepsios-term-window,#f4f2ea)] text-[color:var(--foreground)] shadow-[0_24px_80px_rgba(0,0,0,0.18)]'
        : [
            'border',
            isLight
              ? 'border-[#09090b] bg-[#fafafa] text-[#09090b]'
              : 'border-[color:var(--gp-ink,#09090b)] bg-[color:var(--gp-paper,#fafafa)] text-[color:var(--gp-ink,#09090b)]',
            expanded
              ? 'h-full shadow-[0_24px_80px_rgba(0,0,0,0.55)]'
              : isLight
                ? 'shadow-[8px_8px_0_#2563eb] sm:shadow-[12px_12px_0_#2563eb]'
                : 'shadow-[8px_8px_0_var(--gp-accent,#2563eb)] sm:shadow-[12px_12px_0_var(--gp-accent,#2563eb)]',
          ],
      aspectClass,
      props.class,
    ]"
  >
    <div
      class="flex shrink-0 items-center gap-2 border-b"
      :class="[
        isTerm
          ? 'h-8 gap-1.5 px-3 text-[11px] text-[color:color-mix(in_srgb,var(--foreground)_55%,transparent)] border-[color:color-mix(in_srgb,var(--lepsios-term-accent)_16%,transparent)] bg-[color:var(--lepsios-term-chrome,#e7e4db)]'
          : [
              'h-11 px-3',
              isMac ? '' : 'flex-row-reverse',
              isLight ? 'border-[#e4e4e0] bg-[#f0f0ee]' : 'border-[color:var(--gp-line,#e4e4e0)] bg-[color:var(--gp-mist,#f0f0ee)]',
            ],
      ]"
    >
      <div class="flex shrink-0" :class="isTerm ? 'gap-1.5' : ['gap-1.5', isMac ? '' : 'order-3']">
        <template v-if="isTerm">
          <span class="block size-[9px] rounded-full bg-[color:color-mix(in_srgb,var(--foreground)_14%,transparent)]" aria-hidden="true" />
          <span class="block size-[9px] rounded-full bg-[color:color-mix(in_srgb,var(--foreground)_14%,transparent)]" aria-hidden="true" />
          <span class="block size-[9px] rounded-full bg-[color:color-mix(in_srgb,var(--foreground)_14%,transparent)]" aria-hidden="true" />
        </template>
        <template v-else>
          <button type="button" class="size-3 rounded-full bg-[#ff5f57] transition hover:ring-2 hover:ring-[#ff5f57]/40" :aria-label="props.controlLabels?.close" @click="emit('close')" />
          <button type="button" class="size-3 rounded-full bg-[#febc2e] transition hover:ring-2 hover:ring-[#febc2e]/40" :aria-label="props.controlLabels?.minimize" @click="emit('minimize')" />
          <button type="button" class="size-3 rounded-full bg-[#28c840] transition hover:ring-2 hover:ring-[#28c840]/50" :aria-label="props.controlLabels?.maximize" @click="emit('maximize')" />
        </template>
      </div>
      <div
        v-if="isTerm && (url || $slots.url)"
        class="ml-2.5 min-w-0 flex-1 truncate font-mono"
      >
        <slot name="url">{{ url }}</slot>
      </div>
      <div
        v-else-if="!isTerm"
        class="flex min-w-0 flex-1 items-end gap-1 self-stretch pt-2"
        :class="isMac ? '' : 'order-2 justify-end'"
      >
        <slot name="tabs" />
      </div>
    </div>

    <div
      v-if="!isTerm && (url || $slots.url)"
      class="flex h-8 shrink-0 items-center gap-2 border-b px-3 font-mono text-[10px]"
      :class="isLight
        ? 'border-[#e4e4e0] bg-[#fafafa] text-[#52525b]'
        : 'border-[color:var(--gp-line,#e4e4e0)] bg-[color:var(--gp-paper,#fafafa)] text-[color:var(--gp-muted,#52525b)]'"
    >
      <slot name="url">
        <Icon icon="lucide:lock" class="size-3 shrink-0" />
        <span class="truncate">{{ url }}</span>
      </slot>
    </div>

    <div
      class="flex min-h-0 min-w-0 flex-1 flex-col"
      :class="[
        isTerm
          ? 'bg-[color:var(--lepsios-term-window,#f4f2ea)]'
          : isLight ? 'bg-[#fafafa] text-[#09090b]' : 'bg-[color:var(--gp-paper,#fafafa)]',
        scrollable ? 'overflow-auto' : 'overflow-hidden',
      ]"
    >
      <slot />
    </div>
  </div>
</template>
