<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

const props = withDefaults(defineProps<{
  as?: 'a' | 'div' | 'article' | 'button'
  href?: string
  class?: HTMLAttributes['class']
}>(), {
  as: undefined,
  href: undefined,
})

const emit = defineEmits<{
  click: [MouseEvent]
}>()

const rootTag = computed(() => {
  if (props.as) return props.as
  if (props.href) return 'a'
  return 'div'
})
</script>

<template>
  <component
    :is="rootTag"
    :href="rootTag === 'a' ? href : undefined"
    :type="rootTag === 'button' ? 'button' : undefined"
    :class="cn(
      'mt-7 grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4 border border-foreground/15 bg-foreground/[0.03] p-4 text-inherit no-underline transition hover:-translate-y-0.5 hover:border-[color:var(--lepsios-term-accent,#2f6a14)] md:grid-cols-[150px_minmax(0,1fr)] md:gap-7 md:p-[22px_26px] dark:bg-[#121212]',
      props.class,
    )"
    @click="emit('click', $event)"
  >
    <div v-if="$slots.media" class="min-w-0">
      <slot name="media" />
    </div>
    <div class="min-w-0">
      <div
        v-if="$slots.kicker"
        class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--lepsios-term-accent,#2f6a14)]"
      >
        <slot name="kicker" />
      </div>
      <div v-if="$slots.title" class="my-1.5 text-lg font-semibold tracking-tight">
        <slot name="title" />
      </div>
      <div v-if="$slots.body" class="mb-3 text-sm leading-relaxed text-foreground/60">
        <slot name="body" />
      </div>
      <div
        v-if="$slots.cta"
        class="font-semibold text-[color:var(--lepsios-term-accent,#2f6a14)]"
      >
        <slot name="cta" />
      </div>
      <slot />
    </div>
  </component>
</template>
