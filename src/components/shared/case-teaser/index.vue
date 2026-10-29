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
    :class="cn('term-case-teaser', props.class)"
    @click="emit('click', $event)"
  >
    <div v-if="$slots.media" class="term-case-teaser__media min-w-0">
      <slot name="media" />
    </div>
    <div class="min-w-0">
      <div v-if="$slots.kicker" class="term-case-teaser__kicker">
        <slot name="kicker" />
      </div>
      <div v-if="$slots.title" class="term-case-teaser__title">
        <slot name="title" />
      </div>
      <div v-if="$slots.body" class="term-case-teaser__body">
        <slot name="body" />
      </div>
      <div v-if="$slots.cta" class="term-case-teaser__cta">
        <slot name="cta" />
      </div>
      <slot />
    </div>
  </component>
</template>
