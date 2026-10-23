<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const modelValue = defineModel<string | undefined>()
</script>

<template>
  <select
    v-model="modelValue"
    data-slot="native-select"
    :class="cn(
      'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  >
    <slot />
  </select>
</template>
