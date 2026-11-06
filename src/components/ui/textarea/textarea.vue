<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  variant?: 'default' | 'wishimi'
}>()

const modelValue = defineModel<string | number | undefined>()
if (modelValue.value === undefined && props.defaultValue !== undefined)
  modelValue.value = props.defaultValue
</script>

<template>
    <textarea
        v-model="modelValue"
        :class="cn(
            'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            props.variant === 'wishimi' ? 'min-h-[96px] rounded-2xl border-0 bg-lepsios-field px-4 py-3 text-[15px] text-foreground shadow-none focus-visible:ring-0 placeholder:text-[var(--wishimi-tertiary,#BBBBBB)]' : '',
            props.class,
        )"
    />
</template>
