<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ExternalLink } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '../../lib/cn'

const props = withDefaults(defineProps<{
  /**
   * Caption above the brand (e.g. "Powered by"). Empty + no name/href → hidden.
   * Labels are props only — no i18n in shared.
   */
  label?: string
  /** Brand / platform name under the caption. */
  name?: string
  /** External URL. Required to show the strip. */
  href?: string
  logoSrc?: string
  logoAlt?: string
  class?: HTMLAttributes['class']
}>(), {
  label: '',
  name: '',
  href: '',
  logoSrc: '',
  logoAlt: '',
})

const show = computed(() => Boolean(props.href?.trim() && (props.name?.trim() || props.label?.trim())))
</script>

<template>
  <a
    v-if="show"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :class="cn(
      'flex items-center gap-3 rounded-lg border border-sidebar-border bg-sidebar-accent/40 p-2.5 text-sidebar-foreground transition hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
      'group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2',
      props.class,
    )"
    :title="[label, name].filter(Boolean).join(' ')"
  >
    <img
      v-if="logoSrc"
      :src="logoSrc"
      :alt="logoAlt || name || ''"
      class="size-8 shrink-0 rounded-md"
    >
    <span class="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
      <span
        v-if="label"
        class="block text-[.65rem] text-muted-foreground"
      >{{ label }}</span>
      <span
        v-if="name"
        class="block text-xs font-semibold"
      >{{ name }}</span>
    </span>
    <ExternalLink
      class="size-3.5 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden"
      aria-hidden="true"
    />
  </a>
</template>
