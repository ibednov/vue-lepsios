<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../lib/cn'

const props = defineProps<{
  eyebrow?: string
  title?: string
  description?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <!--
    Title always starts at the content leading edge.
    Avoid items-end on a column flex — it pins the block to the trailing edge.
  -->
  <header :class="cn('flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between', props.class)">
    <div class="flex w-full min-w-0 flex-1 items-start gap-3">
      <div
        v-if="$slots.leading"
        class="shrink-0 pt-1"
      >
        <slot name="leading" />
      </div>
      <div class="min-w-0 flex-1 space-y-1 text-start">
        <p
          v-if="eyebrow || $slots.eyebrow"
          class="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
        >
          <slot name="eyebrow">
            {{ eyebrow }}
          </slot>
        </p>
        <h1 class="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          <slot name="title">
            {{ title }}
          </slot>
        </h1>
        <p
          v-if="description || $slots.description"
          class="max-w-3xl text-sm leading-6 text-muted-foreground"
        >
          <slot name="description">
            {{ description }}
          </slot>
        </p>
      </div>
    </div>
    <div
      v-if="$slots.actions"
      class="flex w-full shrink-0 flex-wrap items-center gap-2 sm:w-auto sm:justify-end"
    >
      <slot name="actions" />
    </div>
  </header>
</template>
