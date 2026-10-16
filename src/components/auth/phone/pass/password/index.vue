<script setup lang="ts">
/**
 * AuthPhonePassPassword — password field for phone+password auth.
 * Directory name: AuthPhonePassPassword
 */
import { Label } from '../../../../ui/label'
import { Input } from '../../../../ui/input'
import { cn } from '../../../../../lib/cn'

withDefaults(defineProps<{
  label?: string
  placeholder?: string
  invalid?: boolean
  errorMessage?: string | null
  testId?: string
  autocomplete?: string
  disabled?: boolean
}>(), {
  autocomplete: 'current-password',
})

const modelValue = defineModel<string>({ default: '' })
</script>

<template>
  <div
    class="auth-phone-pass-password flex w-full flex-col gap-2"
    :data-testid="testId"
  >
    <Label
      v-if="label"
      class="text-sm font-medium"
    >
      {{ label }}
    </Label>
    <Input
      v-model="modelValue"
      type="password"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :disabled="disabled"
      :aria-invalid="invalid || Boolean(errorMessage)"
      :class="cn(
        'h-12 rounded-2xl border-0 bg-[var(--lepsios-field,#E8E8E8)] px-4 text-base shadow-none',
        (invalid || errorMessage) && 'ring-1 ring-destructive/50',
      )"
    />
    <p
      v-if="errorMessage"
      class="text-destructive text-sm"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
