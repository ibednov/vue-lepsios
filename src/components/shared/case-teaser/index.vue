<script setup lang="ts">
import { computed } from 'vue'
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

const props = withDefaults(defineProps<{
  as?: 'a' | 'div' | 'article' | 'button'
  href?: string
  clickable?: boolean
  kicker?: string
  title?: string
  body?: string
  cta?: string
  class?: HTMLAttributes['class']
}>(), {
  as: undefined,
  href: undefined,
  clickable: false,
  kicker: undefined,
  title: undefined,
  body: undefined,
  cta: undefined,
})

const emit = defineEmits<{
  click: [MouseEvent]
}>()

const rootTag = computed(() => {
  if (props.as) return props.as
  if (props.href) return 'a'
  if (props.clickable) return 'button'
  return 'div'
})
</script>

<template>
  <component
    :is="rootTag"
    :href="rootTag === 'a' ? href : undefined"
    :type="rootTag === 'button' ? 'button' : undefined"
    :class="cn(
      'mt-7 flex w-full cursor-pointer flex-col gap-4 border border-foreground/15 bg-foreground/[0.03] p-4 text-left text-inherit no-underline transition hover:-translate-y-0.5 hover:border-[color:var(--lepsios-term-accent,#2f6a14)] md:gap-5 md:p-[22px_26px] dark:bg-[#121212]',
      props.class,
    )"
    @click="emit('click', $event)"
  >
    <div v-if="$slots.media" class="min-w-0 w-full overflow-hidden">
      <slot name="media" />
    </div>
    <div class="min-w-0 w-full">
      <div
        v-if="kicker || $slots.kicker"
        class="text-[11px] uppercase tracking-[0.28em] text-[color:var(--lepsios-term-accent,#2f6a14)]"
      >
        <slot name="kicker">{{ kicker }}</slot>
      </div>
      <div v-if="title || $slots.title" class="my-1.5 text-lg font-semibold tracking-tight">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="body || $slots.body" class="mb-3 text-sm leading-relaxed text-foreground/60">
        <slot name="body">{{ body }}</slot>
      </div>
      <div
        v-if="cta || $slots.cta"
        class="font-semibold text-[color:var(--lepsios-term-accent,#2f6a14)]"
      >
        <slot name="cta">{{ cta }}</slot>
      </div>
      <slot />
    </div>
  </component>
</template>
