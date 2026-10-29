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
    :class="cn('term-case-section', props.class)"
  >
    <p v-if="kicker || $slots.kicker" class="term-case-section__kicker">
      <slot name="kicker">{{ kicker }}</slot>
    </p>
    <h2
      v-if="title || $slots.title"
      :id="id ? `${id}-title` : undefined"
      class="term-case-section__title"
    >
      <slot name="title">{{ title }}</slot>
    </h2>
    <slot />
  </section>
</template>
