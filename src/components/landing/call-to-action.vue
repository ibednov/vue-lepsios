<script setup lang="ts">
import { Button } from '../ui/button'

export interface LandingCallToActionAction {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

withDefaults(defineProps<{
  title?: string
  description?: string
  actions?: LandingCallToActionAction[]
  id?: string
  tone?: 'light' | 'dark'
}>(), {
  id: 'call-to-action',
  tone: 'light',
  actions: () => [],
})
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="title || $slots.title ? `${id}-title` : undefined"
    class="py-16 sm:py-20"
    :class="tone === 'light' ? 'bg-white' : 'bg-[var(--gp-bg,#141414)]'"
  >
    <div
      class="mx-auto grid w-full max-w-6xl items-center gap-8 overflow-hidden rounded-3xl px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-14"
      :class="tone === 'light' ? 'bg-zinc-100' : 'bg-[var(--gp-surface,#272727)]'"
    >
      <div class="flex flex-col items-start">
        <slot name="eyebrow" />
        <h2
          v-if="title || $slots.title"
          :id="`${id}-title`"
          class="text-3xl font-semibold tracking-tight sm:text-4xl"
          :class="tone === 'light' ? 'text-zinc-950' : 'text-[var(--gp-ink,#f5f5fa)]'"
        >
          <slot name="title">{{ title }}</slot>
        </h2>
        <p
          v-if="description || $slots.description"
          class="mt-4 max-w-xl text-base leading-7 sm:text-lg"
          :class="tone === 'light' ? 'text-zinc-600' : 'text-[var(--gp-muted,#a4a7b9)]'"
        >
          <slot name="description">{{ description }}</slot>
        </p>
        <div v-if="actions.length || $slots.actions" class="mt-7 flex flex-wrap gap-3">
          <slot name="actions">
            <Button
              v-for="(action, index) in actions"
              :key="`${action.href}:${action.label}`"
              as="a"
              :href="action.href"
              :variant="action.variant === 'secondary' || (action.variant === undefined && index > 0) ? 'outline' : 'default'"
              size="lg"
              :class="[
                'min-h-11 rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
                (action.variant === 'secondary' || (action.variant === undefined && index > 0))
                  ? (tone === 'light' ? 'border-0 bg-white text-zinc-900 hover:bg-zinc-200' : 'border-0 bg-[var(--gp-raised,#323232)] text-[var(--gp-ink,#f5f5fa)] hover:bg-[var(--gp-line,#454545)]')
                  : (tone === 'light' ? 'border-0 bg-zinc-950 text-white hover:bg-zinc-800' : 'border-0 bg-white text-zinc-950 hover:bg-zinc-200'),
                tone === 'light' ? 'focus-visible:outline-zinc-950' : 'focus-visible:outline-[var(--gp-accent,#ee8a61)]',
              ]"
            >
              {{ action.label }}
            </Button>
          </slot>
        </div>
        <slot name="note" />
      </div>
      <div v-if="$slots.media" class="min-w-0">
        <slot name="media" />
      </div>
    </div>
  </section>
</template>
