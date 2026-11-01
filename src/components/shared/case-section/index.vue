<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

const props = withDefaults(defineProps<{
  kicker?: string
  title?: string
  id?: string
  class?: HTMLAttributes['class']
}>(), {
  kicker: undefined,
  title: undefined,
  id: undefined,
})
</script>

<template>
  <section
    :id="id"
    :aria-labelledby="title || $slots.title ? (id ? `${id}-title` : undefined) : undefined"
    :class="cn(
      'flex flex-col gap-4 border-b border-foreground/15 py-2 last:border-b-0',
      props.class,
    )"
  >
    <p
      v-if="kicker || $slots.kicker"
      class="text-[11px] uppercase tracking-[0.28em] text-foreground/55"
    >
      <slot name="kicker">{{ kicker }}</slot>
    </p>
    <h2
      v-if="title || $slots.title"
      :id="id ? `${id}-title` : undefined"
      class="text-[26px] leading-tight tracking-tight text-[color:var(--lepsios-term-accent,#2f6a14)]"
    >
      <slot name="title">{{ title }}</slot>
    </h2>
    <div class="flex flex-col gap-4">
      <slot />
    </div>
  </section>
</template>
