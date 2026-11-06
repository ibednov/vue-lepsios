<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed, ref } from 'vue'
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

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'text',
})

const modelValue = defineModel<string>({ required: true })

const isPassword = computed(() => props.type === 'password')
const passwordVisible = ref(false)
const effectiveType = computed(() => {
  if (!isPassword.value) {
    return props.type
  }
  return passwordVisible.value ? 'text' : 'password'
})

const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value
}
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
    <div
      :class="cn('relative w-full', isPassword && 'group/password')"
    >
      <Input
        v-model="modelValue"
        :type="effectiveType"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :disabled="disabled"
        :class="cn(
          'h-12 rounded-2xl border-0 bg-lepsios-field px-4 shadow-none focus-visible:border-0 focus-visible:ring-0',
          isPassword && 'pr-11',
          inputClass,
        )"
      />
      <button
        v-if="isPassword"
        type="button"
        class="absolute top-1/2 right-3 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:text-foreground"
        tabindex="-1"
        :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
        @click="togglePasswordVisible"
      >
        <svg
          v-if="passwordVisible"
          class="size-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3 3l18 18M10.5 10.6a2.5 2.5 0 003.5 3.5M9.9 5.1A10.4 10.4 0 0112 5c5 0 9.3 3.1 11 7.5a11.6 11.6 0 01-4 5.1M6.1 6.1A11.6 11.6 0 001 12.5C2.7 16.9 7 20 12 20c1.7 0 3.3-.4 4.7-1"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else
          class="size-5 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 12.5C3.7 8.1 8 5 12 5s8.3 3.1 10 7.5c-1.7 4.4-6 7.5-10 7.5S3.7 16.9 2 12.5z"
            stroke="currentColor"
            stroke-width="2"
            stroke-linejoin="round"
          />
          <circle
            cx="12"
            cy="12.5"
            r="2.5"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
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

  <div
    v-else-if="isPassword"
    class="relative w-full"
  >
    <Input
      v-model="modelValue"
      :type="effectiveType"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :disabled="disabled"
      :class="cn(
        variant === 'inline'
          ? 'h-12 rounded-full border-0 bg-lepsios-field px-4'
          : undefined,
        variant === 'wishimi' ? 'placeholder:text-[#BBBBBB]' : undefined,
        // Keep reveal control fully inside the field (no right overflow).
        'pr-11',
        inputClass,
      )"
      :variant="variant === 'wishimi' ? 'wishimi' : 'default'"
    />
    <button
      type="button"
      class="absolute top-1/2 right-3 z-10 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-[#9D9D9D] hover:text-foreground"
      tabindex="-1"
      :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
      @click="togglePasswordVisible"
    >
      <svg
        v-if="passwordVisible"
        class="size-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 3l18 18M10.5 10.6a2.5 2.5 0 003.5 3.5M9.9 5.1A10.4 10.4 0 0112 5c5 0 9.3 3.1 11 7.5a11.6 11.6 0 01-4 5.1M6.1 6.1A11.6 11.6 0 001 12.5C2.7 16.9 7 20 12 20c1.7 0 3.3-.4 4.7-1"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <svg
        v-else
        class="size-5 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2 12.5C3.7 8.1 8 5 12 5s8.3 3.1 10 7.5c-1.7 4.4-6 7.5-10 7.5S3.7 16.9 2 12.5z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linejoin="round"
        />
        <circle
          cx="12"
          cy="12.5"
          r="2.5"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
    </button>
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
