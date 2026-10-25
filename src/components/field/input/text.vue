<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Label } from '../../ui/label'
import { Input } from '../../ui/input'
import { cn } from '../../../lib/cn'

export type FieldInputTextVariant = 'default' | 'drawer' | 'inline' | 'wishimi' | 'search'

interface Props {
  variant?: FieldInputTextVariant
  label?: string
  ariaLabel?: string
  placeholder?: string
  type?: string
  maxlength?: number
  inputClass?: HTMLAttributes['class']
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'text',
})

const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <div
    v-if="variant === 'drawer'"
    class="flex flex-col gap-2"
  >
    <Label
      v-if="label"
      class="text-sm text-tertiary"
    >
      {{ label }}
    </Label>
    <Input
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      :class="cn('h-12 rounded-2xl border-0 bg-lepsios-field px-4', inputClass)"
    />
  </div>

  <div
    v-else-if="variant === 'search'"
    class="relative w-full"
  >
    <svg
      class="pointer-events-none absolute left-[14px] top-1/2 z-10 size-[22px] -translate-y-1/2 text-[#9D9D9D]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" stroke-width="2" />
      <path d="m15.5 15.5 5 5" stroke="currentColor" stroke-linecap="round" stroke-width="2" />
    </svg>
    <Input
      v-model="modelValue"
      :type="type === 'text' ? 'search' : type"
      :aria-label="ariaLabel || label || placeholder"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      :class="cn('placeholder:text-[#BBBBBB]', inputClass)"
      variant="wishimi-search"
    />
  </div>

  <Input
    v-else
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    :maxlength="maxlength"
    :disabled="disabled"
    :class="cn(
      variant === 'inline'
        ? 'h-12 rounded-full border-0 bg-lepsios-field px-4'
        : undefined,
      variant === 'wishimi' ? 'placeholder:text-[#BBBBBB]' : undefined,
      inputClass,
    )"
    :variant="variant === 'wishimi' ? 'wishimi' : 'default'"
  />
</template>
