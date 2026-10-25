<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '../../../lib/cn'

const props = defineProps<{
  defaultValue?: string | number
  type?: string
  class?: HTMLAttributes['class']
  variant?: 'default' | 'cosy' | 'wishimi' | 'wishimi-search'
}>()

const modelValue = defineModel<string | number | undefined>()
if (modelValue.value === undefined && props.defaultValue !== undefined)
  modelValue.value = props.defaultValue
</script>

<template>
    <input
        v-model="modelValue"
        :type="props.type || 'text'"
        data-slot="input"
        :class="cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            props.variant === 'cosy' ? 'h-11 rounded-xl border-[#eadbd1] bg-[#fffaf7] focus-visible:border-[var(--waify-olive,#646E35)] focus-visible:ring-[var(--waify-olive,#646E35)]/15' : '',
            props.variant === 'wishimi' ? 'h-[52px] rounded-2xl border-0 bg-[var(--wishimi-field,#3B3B3B)] px-4 pt-[10px] pb-3 text-[15px] leading-6 text-[var(--wishimi-tertiary,#BBBBBB)] shadow-none placeholder:text-[var(--wishimi-tertiary,#BBBBBB)]' : '',
            props.variant === 'wishimi-search' ? 'h-[52px] rounded-full border-0 bg-[var(--wishimi-field,#3B3B3B)] py-[10px] pr-4 pl-[46px] text-[15px] leading-6 text-[var(--wishimi-tertiary,#BBBBBB)] shadow-none placeholder:text-[var(--wishimi-tertiary,#BBBBBB)]' : '',
            props.class,
        )"
    >
</template>
